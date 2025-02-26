/** @jsx h */
import { h } from 'preact';
import { useState, useEffect, useRef, useCallback } from 'preact/hooks';
import { render } from '@create-figma-plugin/ui';
import { emit, on } from '@create-figma-plugin/utilities';
import '!./output.css';
import { ConfirmDialog, ClassDetailsModal } from './components/Modal';
import { Button, IconButton, Text } from './components/common';
import { DropdownItem } from './components/DropdownItem';
import { SearchInput } from './components/SearchInput';
import { TextInput } from './components/TextInput';
import type { SavedClass, ImportResult } from './types';
import type { LicenseStatus, LemonSqueezyError as LicenseError } from './types/lemonSqueezy';
import { LEMONSQUEEZY_CONFIG } from './config/lemonSqueezy';
import {
  Search,
  Download as Export,
  Upload as Import,
  Layers as ApplyAll,
  Info,
  Edit as Rename,
  Trash,
  Ellipsis,
  Refresh as Update,
} from './components/common/icons';
import { ClassCounter } from './components/ClassCounter';
import { PremiumFeatureModal } from './components/PremiumFeatureModal';
import { LicenseActivation } from './components/LicenseActivation';
import { LicenseDeactivationModal } from './components/LicenseDeactivationModal';
import { makeApiRequest } from './ui/services/apiService';

function Plugin() {
  const [isInitialized, setIsInitialized] = useState(false);
  const [savedClasses, setSavedClasses] = useState<SavedClass[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [hasSelectedFrame, setHasSelectedFrame] = useState(false);
  const [newClassName, setNewClassName] = useState('');
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [classToDelete, setClassToDelete] = useState<SavedClass | null>(null);
  const [isUpdateModalOpen, setUpdateModalOpen] = useState(false);
  const [isRenameModalOpen, setIsRenameModalOpen] = useState(false);
  const [classToRename, setClassToRename] = useState<SavedClass | null>(null);
  const [newName, setNewName] = useState('');
  const [classToUpdate, setClassToUpdate] = useState<SavedClass | null>(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [classToView, setClassToView] = useState<SavedClass | null>(null);
  const [isApplyAllModalOpen, setIsApplyAllModalOpen] = useState(false);
  const [applyAllAnalysis, setApplyAllAnalysis] = useState<{
    totalFrames: number;
    matchingFrames: number;
  } | null>(null);
  const [showSearch, setShowSearch] = useState(false);
  const [licenseStatus, setLicenseStatus] = useState<LicenseStatus>({
    tier: 'free',
    isValid: false,
    features: [],
    status: 'idle',
  });
  const [isPremiumModalOpen, setIsPremiumModalOpen] = useState(false);
  const [currentPremiumFeature, setCurrentPremiumFeature] = useState('');
  const [isDeactivationModalOpen, setIsDeactivationModalOpen] = useState(false);
  const [showLicenseActivation, setShowLicenseActivation] = useState(false);
  const [licenseError, setLicenseError] = useState<LicenseError | null>(null);
  // Stato per i risultati dei test diagnostici
  const [diagnosticResults, setDiagnosticResults] = useState<{
    connectivityTest: { success: boolean; message: string };
    formatTest: { success: boolean; message: string };
  } | null>(null);

  // Aggiungiamo un ref per il dropdown
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Aggiungiamo uno state per la posizione del dropdown
  const [dropdownPosition, setDropdownPosition] = useState<'bottom' | 'top'>('bottom');

  // Funzione per calcolare la posizione del dropdown
  const calculateDropdownPosition = useCallback((buttonElement: HTMLElement) => {
    const buttonRect = buttonElement.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    const spaceBelow = windowHeight - buttonRect.bottom;
    const spaceAbove = buttonRect.top;

    // Se lo spazio sotto è minore di 200px (altezza stimata del dropdown) e c'è più spazio sopra
    if (spaceBelow < 200 && spaceAbove > spaceBelow) {
      setDropdownPosition('top');
    } else {
      setDropdownPosition('bottom');
    }
  }, []);

  // Modifichiamo il gestore del click per il menu delle azioni
  const handleMenuClick = (e: MouseEvent, menuName: string) => {
    e.stopPropagation();
    if (e.currentTarget instanceof HTMLElement) {
      calculateDropdownPosition(e.currentTarget);
    }
    setActiveMenu(activeMenu === menuName ? null : menuName);
  };

  // Gestore click fuori dal dropdown
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setActiveMenu(null);
      }
    }

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  useEffect(() => {
    let mounted = true;
    let isFirstCheck = true;

    // Initialize API service
    // initializeApiService();

    // Signal that UI is ready
    emit('UI_READY');

    // Register handlers
    const unsubscribeClasses = on('CLASSES_LOADED', (classes: SavedClass[]) => {
      if (!mounted) return;
      setSavedClasses(classes);
      setIsInitialized(true);
    });

    const unsubscribeSelection = on('SELECTION_CHANGED', (hasFrame: boolean) => {
      if (!mounted) return;
      setHasSelectedFrame(hasFrame);
    });

    const unsubscribeClassSaved = on('CLASS_SAVED', (data: SavedClass) => {
      if (!mounted) return;
      setSavedClasses((prevClasses) => [...prevClasses, data]);
      setNewClassName('');
    });

    const unsubscribeClassDeleted = on('CLASS_DELETED', (deletedClassName: string) => {
      if (!mounted) return;
      setSavedClasses((prevClasses) => prevClasses.filter((cls) => cls.name !== deletedClassName));
    });

    const unsubscribeClassUpdated = on(
      'CLASS_UPDATED',
      (data: { name: string; properties: Omit<SavedClass, 'name'> }) => {
        if (!mounted) return;
        setSavedClasses((prevClasses) =>
          prevClasses.map((cls) =>
            cls.name === data.name ? { ...data.properties, name: data.name } : cls,
          ),
        );
        setUpdateModalOpen(false);
      },
    );

    const unsubscribeClassApplied = on(
      'CLASS_APPLIED',
      (result: { success: boolean; error?: string }) => {
        if (result.success) {
          setActiveMenu(null);
        } else if (result.error) {
          console.error('Error applying class:', result.error);
        }
      },
    );

    const unsubscribeClassesAppliedAll = on('CLASSES_APPLIED_ALL', () => {
      // Non facciamo nulla qui, le notifiche vengono gestite da main.ts
    });

    const unsubscribeImportResult = on('IMPORT_RESULT', (result: ImportResult) => {
      if (result.success) {
        // Non mostriamo più una notifica qui perché viene già mostrata dal plugin
        emit('LOAD_CLASSES');
      } else {
        emit('SHOW_ERROR', result.error || 'Failed to import classes');
      }
    });

    const unsubscribeAnalysisResult = on(
      'APPLY_ALL_ANALYSIS_RESULT',
      (result: { totalFrames: number; matchingFrames: number }) => {
        if (!mounted) return;
        setApplyAllAnalysis(result);
        setIsApplyAllModalOpen(true);
      },
    );

    // Aggiungiamo il gestore per i risultati dei test diagnostici
    const unsubscribeDiagnosticResults = on('DIAGNOSTIC_TEST_RESULTS', (results) => {
      if (!mounted) return;
      console.log('Risultati dei test diagnostici ricevuti:', results);
      setDiagnosticResults(results);

      // Mostra una notifica con i risultati
      if (results.connectivityTest.success && results.formatTest.success) {
        emit('SHOW_NOTIFICATION', 'Test diagnostici completati con successo!');
      } else {
        const failedTests = [];
        if (!results.connectivityTest.success) {
          failedTests.push(`Connettività: ${results.connectivityTest.message}`);
        }
        if (!results.formatTest.success) {
          failedTests.push(`Formato: ${results.formatTest.message}`);
        }
        emit('SHOW_ERROR', `Test diagnostici falliti: ${failedTests.join(', ')}`);
      }
    });

    // Aggiungiamo l'event listener per SHOW_SAVE_DIALOG qui
    const unsubscribeSaveDialog = on(
      'SHOW_SAVE_DIALOG',
      async (data: { suggestedFileName: string; fileContent: string; totalClasses: number }) => {
        if (!mounted) return;
        try {
          // Crea un Blob con il contenuto JSON
          const blob = new Blob([data.fileContent], { type: 'application/json' });

          // Crea un elemento <a> per il download
          const downloadLink = document.createElement('a');
          downloadLink.href = URL.createObjectURL(blob);
          downloadLink.download = data.suggestedFileName;

          // Simula il click per far partire il download
          document.body.appendChild(downloadLink);
          downloadLink.click();
          document.body.removeChild(downloadLink);

          // Pulisci l'URL object
          URL.revokeObjectURL(downloadLink.href);
        } catch (error) {
          console.error('Error saving file:', error);
          emit('SHOW_ERROR', 'Failed to save export file');
        }
      },
    );

    // Gestore unificato per gli eventi di licenza
    const handleLicenseStatusChange = (status: LicenseStatus) => {
      if (!mounted) return;

      console.log('License status changed:', status);

      // Mantieni lo stato precedente per confronto
      const prevStatus = licenseStatus;

      // Aggiorna lo stato
      setLicenseStatus(status);

      // Non mostrare notifiche durante il primo check (inizializzazione)
      if (isFirstCheck) {
        isFirstCheck = false;
        return;
      }

      // Gestione notifiche per attivazione/deattivazione
      if (status.isValid && !prevStatus.isValid) {
        setShowLicenseActivation(false);
        setLicenseError(null);
        emit('SHOW_NOTIFICATION', 'License activated successfully!');
      } else if (!status.isValid && prevStatus.isValid && status.status === 'idle') {
        // Notifica deattivazione solo se era precedentemente valida
        emit('SHOW_NOTIFICATION', 'License deactivated successfully');
      }
    };

    const handleLicenseError = (error: LicenseError) => {
      if (!mounted) return;

      console.error('License error:', error);
      setLicenseError(error);

      // Aggiorna lo stato della licenza con l'errore
      setLicenseStatus((prev) => ({
        ...prev,
        status: 'error',
        error,
      }));

      // Tutti gli errori vengono gestiti nel modale, non come notifiche
    };

    // Registra i listener
    const removeStatusListener = on('LICENSE_STATUS_CHANGED', handleLicenseStatusChange);
    const removeErrorListener = on('LICENSE_ERROR', handleLicenseError);
    const removeActivationStartedListener = on('ACTIVATION_STARTED', () => {
      if (!mounted) return;
      setLicenseStatus((prev) => ({
        ...prev,
        status: 'processing',
        error: undefined,
      }));
    });
    const removeDeactivationStartedListener = on('DEACTIVATION_STARTED', () => {
      if (!mounted) return;
      setLicenseStatus((prev) => ({
        ...prev,
        status: 'processing',
        error: undefined,
      }));
    });

    // Verifica iniziale della licenza
    emit('CHECK_LICENSE_STATUS');

    // Carica i dati iniziali dopo aver registrato gli handlers
    requestAnimationFrame(() => {
      if (mounted) {
        emit('LOAD_CLASSES');
        emit('CHECK_SELECTION');
      }
    });

    return () => {
      mounted = false;
      unsubscribeClasses();
      unsubscribeSelection();
      unsubscribeClassSaved();
      unsubscribeClassDeleted();
      unsubscribeClassUpdated();
      unsubscribeClassApplied();
      unsubscribeClassesAppliedAll();
      unsubscribeImportResult();
      unsubscribeAnalysisResult();
      unsubscribeSaveDialog(); // Aggiungiamo la pulizia del listener
      removeStatusListener();
      removeErrorListener();
      removeActivationStartedListener();
      removeDeactivationStartedListener();
      unsubscribeDiagnosticResults(); // Aggiungiamo la pulizia del listener per i test diagnostici
    };
  }, []);

  // Inizializza il gestore delle richieste API
  useEffect(() => {
    console.log('[UI] 🔌 Inizializzazione del gestore API UI');

    // Gestisce le richieste API inviate dal main thread
    const handleApiRequest = (request: { url: string; options: RequestInit }) => {
      console.log('[UI] 📡 Ricevuta richiesta API dal main thread:', request);
      makeApiRequest(request.url, request.options);
      // La risposta viene già inviata al main thread dal servizio API
    };

    // Registra il gestore per le richieste API
    on('API_REQUEST', handleApiRequest);

    // Notifica il main thread che l'UI è pronta a gestire le richieste API
    emit('UI_READY_FOR_API');

    return () => {
      // Cleanup
    };
  }, []);

  // Funzione di utilità per la validazione del nome della classe
  const validateClassName = (name: string): { isValid: boolean; error?: string } => {
    // Validazione base per nome vuoto
    if (!name.trim()) {
      return { isValid: false, error: 'Class name cannot be empty' };
    }

    // Validazione per il punto
    if (name.includes('.')) {
      return {
        isValid: false,
        error:
          'Class name cannot contain dots (.) - they will be automatically added in CSS notation',
      };
    }

    // Validazione caratteri speciali
    const validNameRegex = /^[a-zA-Z0-9-_]+$/;
    if (!validNameRegex.test(name.trim())) {
      return {
        isValid: false,
        error: 'Class name can only contain letters, numbers, hyphens (-) and underscores (_)',
      };
    }

    return { isValid: true };
  };

  const handleSaveClass = async (name: string) => {
    const validation = validateClassName(name);
    if (!validation.isValid) {
      emit('SHOW_ERROR', validation.error);
      return;
    }

    // Verifica il limite delle classi per gli utenti free
    if (licenseStatus.tier === 'free' && savedClasses.length >= 5) {
      emit(
        'SHOW_ERROR',
        'You have reached the maximum number of classes for the free plan. Upgrade to Premium for unlimited classes.',
      );
      return;
    }

    // Verifica case-insensitive per i nomi delle classi
    if (savedClasses.some((cls) => cls.name.toLowerCase() === name.trim().toLowerCase())) {
      emit('SHOW_ERROR', 'A class with this name already exists (names are case-insensitive)');
      return;
    }

    await emit('SAVE_CLASS', { name: name.trim() });
    setActiveMenu(null);
  };

  // Ricerca case-insensitive
  const filteredClasses = savedClasses.filter((cls: SavedClass) =>
    cls.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const handleApplyClass = async (classData: SavedClass) => {
    try {
      // Assicuriamoci che layoutMode sia definito prima di inviare i dati
      const classToApply = {
        ...classData,
        layoutMode: classData.layoutMode || 'NONE', // Valore di default se non definito
      };

      await emit('APPLY_CLASS', classToApply);
      setActiveMenu(null); // Chiude il dropdown dopo l'applicazione
      return true;
    } catch (error) {
      console.error('Error applying class:', error);
      emit('SHOW_ERROR', 'An error occurred while applying the class');
      return false;
    }
  };

  const handleUpdate = (savedClass: SavedClass) => {
    setActiveMenu(null);
    setClassToUpdate(savedClass);
    setUpdateModalOpen(true);
  };

  const handleRename = (savedClass: SavedClass) => {
    setActiveMenu(null);
    setClassToRename(savedClass);
    setNewName(savedClass.name);
    setIsRenameModalOpen(true);
  };

  const handleDeleteClick = (classData: SavedClass) => {
    setClassToDelete(classData);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!classToDelete) return;

    await emit('DELETE_CLASS', classToDelete);
    setIsDeleteModalOpen(false);
    setClassToDelete(null);
  };

  const handleConfirmUpdate = async () => {
    if (!classToUpdate) return;

    await emit('UPDATE_CLASS', classToUpdate);
    setUpdateModalOpen(false);
    setClassToUpdate(null);
  };

  const handleConfirmRename = async () => {
    if (!classToRename) return;

    const trimmedName = newName.trim();
    console.log('Attempting to rename in UI:', classToRename.name, 'to:', trimmedName);

    // Validazione del nuovo nome
    const validation = validateClassName(trimmedName);
    if (!validation.isValid) {
      emit('SHOW_ERROR', validation.error);
      return;
    }

    // Validazione lunghezza massima
    if (trimmedName.length > 20) {
      emit('SHOW_ERROR', 'Class name cannot be longer than 20 characters');
      return;
    }

    // Verifica case-insensitive se il nuovo nome è già utilizzato (escludendo il nome attuale)
    const existingClass = savedClasses.find(
      (cls) =>
        cls.name.toLowerCase() === trimmedName.toLowerCase() &&
        cls.name.toLowerCase() !== classToRename.name.toLowerCase(),
    );

    if (existingClass) {
      console.log('Found duplicate in UI:', existingClass);
      emit('SHOW_ERROR', 'A class with this name already exists (names are case-insensitive)');
      return;
    }

    console.log('Emitting RENAME_CLASS event');
    await emit('RENAME_CLASS', { oldName: classToRename.name, newName: trimmedName });
    setIsRenameModalOpen(false);
    setClassToRename(null);
    setNewName('');
  };

  const handleViewDetails = (savedClass: SavedClass) => {
    setActiveMenu(null);
    setClassToView(savedClass);
    setIsDetailsModalOpen(true);
  };

  const handleExportClasses = async () => {
    // Emettiamo solo l'evento di export e lasciamo che main.ts gestisca tutto
    await emit('EXPORT_CLASSES');
  };

  const handleFileChange = (event: { currentTarget: HTMLInputElement }) => {
    void (async () => {
      const input = event.currentTarget;
      if (!input.files || input.files.length === 0) return;

      const file = input.files[0];
      const reader = new FileReader();

      reader.onload = (e) => {
        if (!(e.target instanceof FileReader) || !e.target.result) return;
        const jsonString = e.target.result as string;
        emit('IMPORT_CLASSES', jsonString);
        // Reset the input value so the same file can be imported again
        input.value = '';
      };

      reader.readAsText(file);
    })();
  };

  const handleApplyAllClick = async () => {
    try {
      await emit('ANALYZE_APPLY_ALL');
    } catch (error) {
      console.error('Error analyzing frames:', error);
      emit('SHOW_ERROR', 'An error occurred while analyzing frames');
    }
  };

  const handleConfirmApplyAll = async () => {
    try {
      await emit('APPLY_ALL_MATCHING_CLASSES');
      setIsApplyAllModalOpen(false);
      setApplyAllAnalysis(null);
    } catch (error) {
      console.error('Error applying all matching classes:', error);
      emit('SHOW_ERROR', 'An error occurred while applying classes');
    }
  };

  // Aggiorniamo la gestione delle feature premium
  const isFeatureAllowed = (feature: string): boolean => {
    return licenseStatus.tier === 'premium' || licenseStatus.features.includes(feature);
  };

  // Funzione per gestire il click su feature premium
  const handlePremiumFeatureClick = (featureName: string) => {
    setCurrentPremiumFeature(featureName);
    setIsPremiumModalOpen(true);
  };

  const handleDeactivateLicense = () => {
    setLicenseError(null);
    setLicenseStatus((prev) => ({
      ...prev,
      status: 'processing',
      error: undefined,
    }));
    emit('DEACTIVATE_LICENSE');
    setIsDeactivationModalOpen(false);
  };

  const handleLicenseActivation = (key: string) => {
    setLicenseError(null);
    setLicenseStatus((prev) => ({
      ...prev,
      status: 'processing',
      error: undefined,
    }));
    emit('ACTIVATE_LICENSE', key);
  };

  // Aggiungiamo un handler per la chiusura della modale di attivazione
  const handleLicenseActivationClose = () => {
    setShowLicenseActivation(false);
    setLicenseError(null);
    // Reset anche lo stato della licenza se c'è un errore
    if (licenseStatus.status === 'error') {
      setLicenseStatus((prev) => ({
        ...prev,
        status: 'idle',
        error: undefined,
      }));
    }
  };

  if (!isInitialized) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="flex flex-col items-center gap-2">
          <Text size="base">Initializing plugin...</Text>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col p-4 gap-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <Text size="lg" weight="bold" className="text-lg">
          Class Action
        </Text>
        {licenseStatus.isValid && (
          <Button onClick={() => setShowLicenseActivation(true)} variant="secondary" size="small">
            Manage License
          </Button>
        )}
      </div>

      {/* Save Class Section */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <div className="flex-1">
            <TextInput
              placeholder="Enter class name..."
              value={newClassName}
              onChange={setNewClassName}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && hasSelectedFrame) {
                  handleSaveClass(newClassName);
                }
              }}
              className="w-full"
            />
          </div>
          <Button
            onClick={() => handleSaveClass(newClassName)}
            disabled={!hasSelectedFrame}
            variant="primary"
            size="medium"
          >
            Save class
          </Button>
        </div>

        {/* Show ClassCounter only when license is not valid */}
        {!licenseStatus.isValid && (
          <ClassCounter
            currentClasses={savedClasses.length}
            maxClasses={5}
            isPremium={licenseStatus.tier === 'premium'}
            onUpgradeClick={() => handlePremiumFeatureClick('Unlimited Classes')}
            onActivateClick={() => setShowLicenseActivation(true)}
          />
        )}

        {/* Show Premium Status when license is valid */}
        {licenseStatus.isValid && (
          <div className="flex items-center gap-2 mt-2 px-3 py-2 bg-[var(--figma-color-bg-success)] rounded">
            <Text size="xs" className="text-[var(--figma-color-text-onbrand)]">
              Premium Active - Unlimited Classes
            </Text>
          </div>
        )}
      </div>

      {/* Saved Classes Section */}
      <div className="flex flex-col gap-1">
        <div className="flex items-center justify-between">
          <Text size="base" weight="bold">
            Saved Classes
          </Text>
          <div className="flex items-center gap-2">
            <IconButton
              onClick={(e) => {
                e.stopPropagation();
                setActiveMenu(activeMenu === 'actions' ? null : 'actions');
              }}
              variant="secondary"
              size="medium"
            >
              <Ellipsis size={16} />
            </IconButton>

            {/* Actions Dropdown */}
            {activeMenu === 'actions' && (
              <div
                ref={dropdownRef}
                className="absolute right-4 mt-24 p-1 rounded-md z-10 overflow-hidden whitespace-nowrap shadow-lg"
                style={{
                  backgroundColor: 'var(--figma-color-bg)',
                  border: '1px solid var(--figma-color-border)',
                }}
              >
                <div className="flex flex-col gap-1">
                  <DropdownItem
                    onClick={() => {
                      if (showSearch) {
                        setSearchQuery('');
                      }
                      setShowSearch(!showSearch);
                      setActiveMenu(null);
                    }}
                    icon={<Search size={16} />}
                  >
                    Search
                  </DropdownItem>

                  <DropdownItem
                    onClick={() => {
                      if (!isFeatureAllowed('import-export')) {
                        handlePremiumFeatureClick('Import/Export');
                        return;
                      }
                      document.getElementById('import-input')?.click();
                      setActiveMenu(null);
                    }}
                    icon={<Import size={16} />}
                  >
                    Import
                  </DropdownItem>

                  <DropdownItem
                    onClick={() => {
                      if (!isFeatureAllowed('import-export')) {
                        handlePremiumFeatureClick('Import/Export');
                        return;
                      }
                      handleExportClasses();
                      setActiveMenu(null);
                    }}
                    icon={<Export size={16} />}
                  >
                    Export
                  </DropdownItem>

                  <DropdownItem
                    onClick={() => {
                      if (!isFeatureAllowed('apply-all')) {
                        handlePremiumFeatureClick('Apply All');
                        return;
                      }
                      handleApplyAllClick();
                      setActiveMenu(null);
                    }}
                    icon={<ApplyAll size={16} />}
                  >
                    Apply All
                  </DropdownItem>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Search Input */}
        <div
          className={`
          transform transition-all duration-300 ease-in-out
          ${
            showSearch
              ? 'translate-y-0 opacity-100 h-10'
              : '-translate-y-2 opacity-0 h-0 overflow-hidden'
          }
        `}
        >
          <div className="flex items-center gap-2 mb-2">
            <div className="flex-1">
              <SearchInput
                placeholder="Search classes..."
                value={searchQuery}
                onValueInput={setSearchQuery}
              />
            </div>
            <IconButton
              onClick={() => {
                setSearchQuery(''); // Reset search query
                setShowSearch(false);
              }}
              variant="secondary"
              size="medium"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path
                  d="M12 4L4 12M4 4l8 8"
                  stroke="currentColor"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </IconButton>
          </div>
        </div>

        {/* Classes List */}
        {filteredClasses.length > 0 ? (
          filteredClasses.map((savedClass) => (
            <div
              key={savedClass.name}
              className="relative flex flex-col p-2 border rounded-md"
              style={{ borderColor: 'var(--figma-color-border)' }}
            >
              <div className="flex items-center justify-between">
                <Text mono size="xs">
                  {savedClass.name}
                </Text>
                <div className="flex items-center gap-2">
                  <Button
                    onClick={() => handleApplyClass(savedClass)}
                    variant="primary"
                    size="medium"
                  >
                    Apply
                  </Button>
                  <IconButton
                    onClick={(e) => handleMenuClick(e, savedClass.name)}
                    variant="secondary"
                    size="medium"
                  >
                    <Ellipsis size={16} />
                  </IconButton>
                </div>
              </div>

              {/* Class Actions Dropdown */}
              {activeMenu === savedClass.name && (
                <div
                  ref={dropdownRef}
                  className={`absolute right-0 p-1 rounded-md z-10 overflow-hidden whitespace-nowrap shadow-lg ${
                    dropdownPosition === 'top' ? 'bottom-full mb-1' : 'top-full mt-1'
                  }`}
                  style={{
                    backgroundColor: 'var(--figma-color-bg)',
                    border: '1px solid var(--figma-color-border)',
                  }}
                >
                  <div className="flex flex-col gap-1">
                    <DropdownItem
                      onClick={() => handleViewDetails(savedClass)}
                      icon={<Info size={16} />}
                    >
                      Info
                    </DropdownItem>

                    <DropdownItem
                      onClick={() => handleRename(savedClass)}
                      icon={<Rename size={16} />}
                    >
                      Rename
                    </DropdownItem>

                    <DropdownItem
                      onClick={() => handleUpdate(savedClass)}
                      icon={<Update size={16} />}
                    >
                      Update
                    </DropdownItem>

                    <DropdownItem
                      onClick={() => handleDeleteClick(savedClass)}
                      icon={<Trash size={16} />}
                      variant="danger"
                    >
                      Delete
                    </DropdownItem>
                  </div>
                </div>
              )}
            </div>
          ))
        ) : (
          <Text variant="muted">No classes found</Text>
        )}
      </div>

      {/* Hidden file input for import */}
      <input
        type="file"
        accept=".classaction,application/json"
        onChange={handleFileChange}
        style={{ display: 'none' }}
        id="import-input"
      />

      {/* Modals */}
      <ConfirmDialog
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
        title="Delete Class"
        message={`Are you sure you want to delete the class "${classToDelete?.name}"?`}
        confirmText="Delete"
        variant="danger"
      />

      <ConfirmDialog
        isOpen={isUpdateModalOpen}
        onClose={() => setUpdateModalOpen(false)}
        onConfirm={handleConfirmUpdate}
        title="Update Class"
        message="Do you want to update this class with the current frame dimensions?"
        confirmText="Update"
        variant="info"
      />

      <ConfirmDialog
        isOpen={isRenameModalOpen}
        onClose={() => {
          setIsRenameModalOpen(false);
          setClassToRename(null);
          setNewName('');
        }}
        onConfirm={handleConfirmRename}
        title="Rename Class"
        variant="info"
        message="Enter new name for the selected class:"
        confirmText="Rename"
      >
        <div className="mt-2">
          <TextInput
            value={newName}
            onChange={setNewName}
            className="w-full"
            placeholder="Enter new name"
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleConfirmRename();
              }
            }}
          />
        </div>
      </ConfirmDialog>

      <ClassDetailsModal
        isOpen={isDetailsModalOpen}
        onClose={() => {
          setIsDetailsModalOpen(false);
          setClassToView(null);
        }}
        classData={classToView}
      />

      <ConfirmDialog
        isOpen={isApplyAllModalOpen}
        onClose={() => {
          setIsApplyAllModalOpen(false);
          setApplyAllAnalysis(null);
        }}
        onConfirm={handleConfirmApplyAll}
        title="Apply All Classes"
        message={
          applyAllAnalysis
            ? `This will apply matching classes to ${applyAllAnalysis.matchingFrames} out of ${applyAllAnalysis.totalFrames} frames in the current page. Continue?`
            : 'Analyzing frames...'
        }
        confirmText="Apply"
        variant="info"
      />

      {/* Premium Feature Modal */}
      <PremiumFeatureModal
        isOpen={isPremiumModalOpen}
        onClose={() => setIsPremiumModalOpen(false)}
        featureName={currentPremiumFeature}
        checkoutUrl={
          LEMONSQUEEZY_CONFIG.CHECKOUT_URL || 'https://classaction.lemonsqueezy.com/checkout'
        }
      />

      {/* License Management Section */}
      <LicenseActivation
        isOpen={showLicenseActivation}
        onClose={handleLicenseActivationClose}
        currentStatus={licenseStatus}
        error={licenseError}
        onActivate={handleLicenseActivation}
        onDeactivate={handleDeactivateLicense}
      />

      {/* License Deactivation Modal */}
      <LicenseDeactivationModal
        isOpen={isDeactivationModalOpen}
        onClose={() => setIsDeactivationModalOpen(false)}
        onConfirm={handleDeactivateLicense}
        hasExcessClasses={savedClasses.length > 5}
        totalClasses={savedClasses.length}
      />

      <button
        onClick={async () => {
          // Invia un messaggio al plugin per eseguire i test diagnostici
          emit('RUN_DIAGNOSTIC_TESTS');
        }}
        className="diagnostic-button"
      >
        Esegui Test Diagnostici
      </button>

      {/* Visualizzazione dei risultati dei test diagnostici */}
      {diagnosticResults && (
        <div
          className="mt-4 p-3 border rounded-md"
          style={{ borderColor: 'var(--figma-color-border)' }}
        >
          <Text size="sm" weight="bold">
            Risultati dei test diagnostici:
          </Text>
          <div className="mt-2">
            <div className="flex items-center">
              <span
                className={
                  diagnosticResults.connectivityTest.success ? 'text-green-500' : 'text-red-500'
                }
              >
                {diagnosticResults.connectivityTest.success ? '✅' : '❌'}
              </span>
              <Text size="xs" className="ml-2">
                Test di connettività: {diagnosticResults.connectivityTest.message}
              </Text>
            </div>
            <div className="flex items-center mt-1">
              <span
                className={diagnosticResults.formatTest.success ? 'text-green-500' : 'text-red-500'}
              >
                {diagnosticResults.formatTest.success ? '✅' : '❌'}
              </span>
              <Text size="xs" className="ml-2">
                Test del formato: {diagnosticResults.formatTest.message}
              </Text>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default render(Plugin);
