/** @jsx h */
import { h } from 'preact';
import { useState, useEffect, useRef, useCallback } from 'preact/hooks';
import { render } from '@create-figma-plugin/ui';
import { emit, on } from '@create-figma-plugin/utilities';
import '!./output.css';
import {
  ConfirmDialog,
  ClassDetailsModal,
  PremiumFeatureModal,
  LicenseActivation,
  LicenseDeactivationModal,
} from './components/modals';
import { Button, IconButton, Text } from './components/common';
import { DropdownItem } from './components/DropdownItem';
import { SearchInput } from './components/SearchInput';
import { TextInput } from './components/TextInput';
import type { SavedClass, ImportResult } from './types';
import type { LicenseStatus, LemonSqueezyError as LicenseError } from './types/lemonSqueezy';
import { LEMONSQUEEZY_CONFIG } from './config/lemonSqueezy';
import {
  Info,
  Edit as Rename,
  Trash,
  Ellipsis,
  Refresh as Update,
  Loader,
} from './components/common/icons';
import { ClassCounter } from './components/ClassCounter';
import { makeApiRequest } from './ui/services/apiService';

// Definizione dei possibili stati di caricamento
type LoadingState = {
  initialized: boolean;
  licenseChecked: boolean;
  error: string | null;
};

function Plugin() {
  // Stato di caricamento unificato
  const [loadingState, setLoadingState] = useState<LoadingState>({
    initialized: false,
    licenseChecked: false,
    error: null,
  });

  // Stato per tracciare se il plugin è stato appena montato
  // Questo ci aiuta a garantire che l'overlay di caricamento rimanga visibile
  // per un tempo minimo, anche se le verifiche vengono completate rapidamente
  const [mountTime] = useState<number>(Date.now());
  const minLoadingTimeMs = 1500; // Tempo minimo di visualizzazione dell'overlay (1.5 secondi)

  // Stato per controllare la visibilità dell'overlay di caricamento
  // Inizializzato a true per mostrare l'overlay immediatamente
  const [showLoadingOverlay, setShowLoadingOverlay] = useState(true);

  const [savedClasses, setSavedClasses] = useState<SavedClass[]>([]);
  const [selectedClass, setSelectedClass] = useState<SavedClass | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isRenameModalOpen, setIsRenameModalOpen] = useState(false);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [isDeactivationModalOpen, setIsDeactivationModalOpen] = useState(false);
  const [isPremiumFeatureModalOpen, setIsPremiumFeatureModalOpen] = useState(false);
  const [premiumFeatureName, setPremiumFeatureName] = useState('');
  const [showLicenseActivation, setShowLicenseActivation] = useState(false);
  const [isApplyAllModalOpen, setIsApplyAllModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [licenseError, setLicenseError] = useState<LicenseError | null>(null);
  const [licenseStatus, setLicenseStatus] = useState<LicenseStatus>({
    tier: 'free',
    isValid: false,
    features: [],
    status: 'idle',
  });
  const [showSearch, setShowSearch] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [hasSelectedFrame, setHasSelectedFrame] = useState(false);
  const [newClassName, setNewClassName] = useState('');
  const [newName, setNewName] = useState('');
  const [classToUpdate, setClassToUpdate] = useState<SavedClass | null>(null);
  const [classToView, setClassToView] = useState<SavedClass | null>(null);
  const [applyAllAnalysis, setApplyAllAnalysis] = useState<{
    totalFrames: number;
    matchingFrames: number;
  } | null>(null);

  const dropdownRef = useRef<HTMLDivElement>(null);
  const [dropdownPosition, setDropdownPosition] = useState<'bottom' | 'top'>('bottom');

  // Timeout di sicurezza globale
  useEffect(() => {
    console.log('Setting up global safety timeout');

    // Dopo 6 secondi, forziamo il caricamento completo per evitare blocchi
    const safetyTimeout = setTimeout(() => {
      console.log('Global safety timeout triggered');
      setLoadingState((current) => {
        // Solo se non è già completato
        if (!current.initialized || !current.licenseChecked) {
          console.log('Forcing loading completion via safety timeout');
          return {
            ...current,
            initialized: true,
            licenseChecked: true,
          };
        }
        return current;
      });
    }, 6000);

    return () => clearTimeout(safetyTimeout);
  }, []);

  const calculateDropdownPosition = useCallback((buttonElement: HTMLElement) => {
    const buttonRect = buttonElement.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    const spaceBelow = windowHeight - buttonRect.bottom;
    const spaceAbove = buttonRect.top;

    if (spaceBelow < 200 && spaceAbove > spaceBelow) {
      setDropdownPosition('top');
    } else {
      setDropdownPosition('bottom');
    }
  }, []);

  const handleMenuClick = (e: MouseEvent, menuName: string) => {
    e.stopPropagation();
    if (e.currentTarget instanceof HTMLElement) {
      calculateDropdownPosition(e.currentTarget);
    }
    setActiveMenu(activeMenu === menuName ? null : menuName);
  };

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

    console.log('Initializing plugin and checking license status');

    // Blocchiamo immediatamente l'interfaccia impostando gli stati di caricamento a false
    setLoadingState({
      initialized: false,
      licenseChecked: false,
      error: null,
    });

    emit('UI_READY');

    // Gestione del caricamento delle classi
    const unsubscribeClasses = on('CLASSES_LOADED', (classes: SavedClass[]) => {
      if (!mounted) return;
      console.log('Classes loaded:', classes.length);
      setSavedClasses(classes);

      // Segnaliamo che l'inizializzazione è completata
      setLoadingState((current) => ({
        ...current,
        initialized: true,
      }));
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
        setIsUpdateModalOpen(false);
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

    const unsubscribeClassesAppliedAll = on('CLASSES_APPLIED_ALL', () => {});

    const unsubscribeImportResult = on('IMPORT_RESULT', (result: ImportResult) => {
      if (result.success) {
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

    const unsubscribeSaveDialog = on(
      'SHOW_SAVE_DIALOG',
      async (data: { suggestedFileName: string; fileContent: string; totalClasses: number }) => {
        if (!mounted) return;
        try {
          const blob = new Blob([data.fileContent], { type: 'application/json' });
          const downloadLink = document.createElement('a');
          downloadLink.href = URL.createObjectURL(blob);
          downloadLink.download = data.suggestedFileName;
          document.body.appendChild(downloadLink);
          downloadLink.click();
          document.body.removeChild(downloadLink);
          URL.revokeObjectURL(downloadLink.href);
        } catch (error) {
          console.error('Error saving file:', error);
          emit('SHOW_ERROR', 'Failed to save export file');
        }
      },
    );

    const handleLicenseStatusChange = (status: LicenseStatus) => {
      if (!mounted) return;

      console.log('License status changed:', status);

      const prevStatus = licenseStatus;

      setLicenseStatus(status);

      // Segnaliamo che la verifica della licenza è completata
      setLoadingState((current) => ({
        ...current,
        licenseChecked: true,
      }));

      if (isFirstCheck) {
        isFirstCheck = false;
        return;
      }

      if (status.isValid && !prevStatus.isValid) {
        console.log('Transitioning from free to premium plan!');

        setShowLicenseActivation(false);

        setLicenseError(null);

        emit('SHOW_NOTIFICATION', 'License activated successfully! Welcome to Premium!');

        emit('LOAD_CLASSES');
      } else if (!status.isValid && prevStatus.isValid && status.status === 'idle') {
        emit('SHOW_NOTIFICATION', 'License deactivated successfully');

        emit('LOAD_CLASSES');
      }
    };

    const handleLicenseError = (error: LicenseError) => {
      if (!mounted) return;

      console.error('License error:', error);
      setLicenseError(error);

      // Anche in caso di errore, consideriamo la verifica della licenza completata
      setLoadingState((current) => ({
        ...current,
        licenseChecked: true,
        error: error.message,
      }));

      setLicenseStatus((prev) => ({
        ...prev,
        status: 'error',
        error,
      }));
    };

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

    // Avviamo la verifica della licenza
    console.log('Checking license status');
    emit('CHECK_LICENSE_STATUS');

    // Avviamo il caricamento delle classi
    requestAnimationFrame(() => {
      if (mounted) {
        console.log('Loading classes');
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
      unsubscribeSaveDialog();
      removeStatusListener();
      removeErrorListener();
      removeActivationStartedListener();
      removeDeactivationStartedListener();
    };
  }, []);

  useEffect(() => {
    console.log('[UI] 🔌 Inizializzazione del gestore API UI');

    const handleApiRequest = (request: { url: string; options: RequestInit }) => {
      console.log('[UI] 📡 Ricevuta richiesta API dal main thread:', request);
      makeApiRequest(request.url, request.options);
    };

    on('API_REQUEST', handleApiRequest);

    emit('UI_READY_FOR_API');

    return () => {};
  }, []);

  const validateClassName = (name: string): { isValid: boolean; error?: string } => {
    if (!name.trim()) {
      return { isValid: false, error: 'Class name cannot be empty' };
    }

    if (name.includes('.')) {
      return {
        isValid: false,
        error:
          'Class name cannot contain dots (.) - they will be automatically added in CSS notation',
      };
    }

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

    if (licenseStatus.tier === 'free' && savedClasses.length >= 5) {
      emit(
        'SHOW_ERROR',
        'You have reached the maximum number of classes for the free plan. Upgrade to Premium for unlimited classes.',
      );
      return;
    }

    if (savedClasses.some((cls) => cls.name.toLowerCase() === name.trim().toLowerCase())) {
      emit('SHOW_ERROR', 'A class with this name already exists (names are case-insensitive)');
      return;
    }

    await emit('SAVE_CLASS', { name: name.trim() });
    setActiveMenu(null);
  };

  const filteredClasses = savedClasses.filter((cls: SavedClass) =>
    cls.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const handleApplyClass = async (classData: SavedClass) => {
    try {
      const classToApply = {
        ...classData,
        layoutMode: classData.layoutMode || 'NONE',
      };

      await emit('APPLY_CLASS', classToApply);
      setActiveMenu(null);
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
    setIsUpdateModalOpen(true);
  };

  const handleRename = (savedClass: SavedClass) => {
    setActiveMenu(null);
    setSelectedClass(savedClass);
    setNewName(savedClass.name);
    setIsRenameModalOpen(true);
  };

  const handleDeleteClick = (classData: SavedClass) => {
    setSelectedClass(classData);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!selectedClass) return;

    await emit('DELETE_CLASS', selectedClass);
    setIsDeleteModalOpen(false);
    setSelectedClass(null);
  };

  const handleConfirmUpdate = async () => {
    if (!classToUpdate) return;

    await emit('UPDATE_CLASS', classToUpdate);
    setIsUpdateModalOpen(false);
    setClassToUpdate(null);
  };

  const handleConfirmRename = async () => {
    if (!selectedClass) return;

    const trimmedName = newName.trim();
    console.log('Attempting to rename in UI:', selectedClass.name, 'to:', trimmedName);

    const validation = validateClassName(trimmedName);
    if (!validation.isValid) {
      emit('SHOW_ERROR', validation.error);
      return;
    }

    if (trimmedName.length > 20) {
      emit('SHOW_ERROR', 'Class name cannot be longer than 20 characters');
      return;
    }

    const existingClass = savedClasses.find(
      (cls) =>
        cls.name.toLowerCase() === trimmedName.toLowerCase() &&
        cls.name.toLowerCase() !== selectedClass.name.toLowerCase(),
    );

    if (existingClass) {
      console.log('Found duplicate in UI:', existingClass);
      emit('SHOW_ERROR', 'A class with this name already exists (names are case-insensitive)');
      return;
    }

    console.log('Emitting RENAME_CLASS event');
    await emit('RENAME_CLASS', { oldName: selectedClass.name, newName: trimmedName });
    setIsRenameModalOpen(false);
    setSelectedClass(null);
    setNewName('');
  };

  const handleViewDetails = (savedClass: SavedClass) => {
    setActiveMenu(null);
    setClassToView(savedClass);
    setIsDetailsModalOpen(true);
  };

  const handleExportClasses = async () => {
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

  const isFeatureAllowed = (feature: string): boolean => {
    return (
      licenseStatus.isValid ||
      (feature !== 'unlimited-classes' && savedClasses.length < 5) ||
      feature === 'basic'
    );
  };

  const handlePremiumFeatureClick = (featureName: string) => {
    setIsPremiumFeatureModalOpen(true);
    setPremiumFeatureName(featureName);
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

  const handleLicenseActivationClose = () => {
    setShowLicenseActivation(false);
    setLicenseError(null);
    if (licenseStatus.status === 'error') {
      setLicenseStatus((prev) => ({
        ...prev,
        status: 'idle',
        error: undefined,
      }));
    }
  };

  // Nuova funzione per aprire il modale di attivazione della licenza
  const handleLicenseActivationOpen = () => {
    console.log('Opening license activation modal', { licenseError, licenseStatus });
    // Resetta l'errore prima di aprire il modale
    setLicenseError(null);
    setLicenseStatus((prev) => ({
      ...prev,
      status: prev.status === 'error' ? 'idle' : prev.status,
      error: undefined,
    }));
    setShowLicenseActivation(true);
  };

  // Log dello stato di caricamento per debug
  useEffect(() => {
    console.log('Loading state updated:', loadingState);
    console.log('Loading overlay visible:', showLoadingOverlay);

    // Aggiorniamo lo stato dell'overlay in base allo stato di caricamento
    if (loadingState.initialized && loadingState.licenseChecked) {
      // Se entrambi gli stati sono completati, possiamo nascondere l'overlay
      // dopo il tempo minimo di visualizzazione
      const currentTime = Date.now();
      const elapsedTime = currentTime - mountTime;

      if (elapsedTime >= minLoadingTimeMs) {
        // Se è passato abbastanza tempo, nascondiamo subito l'overlay
        setShowLoadingOverlay(false);
        return undefined;
      } else {
        // Altrimenti, impostiamo un timer per nasconderlo dopo il tempo rimanente
        const remainingTime = minLoadingTimeMs - elapsedTime;
        console.log(
          `Caricamento completato troppo velocemente. Mantengo l'overlay per altri ${remainingTime}ms`,
        );

        const minTimeTimeout = setTimeout(() => {
          console.log("Tempo minimo di caricamento raggiunto, nascondendo l'overlay");
          setShowLoadingOverlay(false);
        }, remainingTime);

        return () => clearTimeout(minTimeTimeout);
      }
    }

    // Aggiungiamo un return esplicito quando non ci sono azioni da eseguire
    return undefined;
  }, [loadingState, mountTime, minLoadingTimeMs, showLoadingOverlay]);

  if (showLoadingOverlay) {
    return (
      <div className="flex items-center justify-center h-screen fixed inset-0 bg-[var(--figma-color-bg)] z-50 transition-opacity duration-300 ease-in-out">
        <div className="flex flex-col items-center gap-4">
          <Loader size={32} className="animate-spin text-[var(--figma-color-bg-brand)]" />
          <Text size="base" weight="bold" className="flex">
            <span>Loading...</span>
          </Text>
          {loadingState.error && (
            <Text size="xs" variant="muted" className="text-[var(--figma-color-text-danger)]">
              Error: {loadingState.error}
            </Text>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col p-4 gap-4">
      <div className="flex items-center justify-between">
        <Text size="lg" weight="bold" className="text-lg">
          Class Action
        </Text>
        {licenseStatus.isValid && (
          <Button onClick={handleLicenseActivationOpen} variant="secondary" size="small">
            Manage License
          </Button>
        )}
      </div>

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

        {!licenseStatus.isValid && (
          <ClassCounter
            currentClasses={savedClasses.length}
            maxClasses={5}
            isPremium={licenseStatus.tier === 'premium'}
            onUpgradeClick={() => handlePremiumFeatureClick('Unlimited Classes')}
            onActivateClick={handleLicenseActivationOpen}
          />
        )}
      </div>

      <div className="flex flex-col gap-1">
        <div className="mt-4">
          <div className="flex items-center justify-between mb-2">
            <Text size="base" weight="bold">
              Saved Classes {savedClasses.length > 0 && `(${savedClasses.length})`}
            </Text>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Button
                  onClick={(e) => handleMenuClick(e, 'actions')}
                  variant="secondary"
                  size="small"
                  className={activeMenu === 'actions' ? 'bg-[var(--figma-color-bg-selected)]' : ''}
                >
                  Actions
                </Button>

                {activeMenu === 'actions' && (
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
                        onClick={() => {
                          if (showSearch) {
                            setSearchTerm('');
                          }
                          setShowSearch(!showSearch);
                          setActiveMenu(null);
                        }}
                        icon={
                          <svg
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <circle cx="11" cy="11" r="8"></circle>
                            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                          </svg>
                        }
                      >
                        Search
                      </DropdownItem>

                      <DropdownItem
                        onClick={() => {
                          if (!isFeatureAllowed('import-export')) {
                            handlePremiumFeatureClick('import-export');
                            return;
                          }
                          document.getElementById('file-input')?.click();
                          setActiveMenu(null);
                        }}
                        icon={
                          <svg
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                            <polyline points="17 8 12 3 7 8"></polyline>
                            <line x1="12" y1="3" x2="12" y2="15"></line>
                          </svg>
                        }
                      >
                        Import
                      </DropdownItem>

                      <DropdownItem
                        onClick={() => {
                          if (!isFeatureAllowed('import-export')) {
                            handlePremiumFeatureClick('import-export');
                            return;
                          }
                          handleExportClasses();
                          setActiveMenu(null);
                        }}
                        icon={
                          <svg
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                            <polyline points="7 10 12 15 17 10"></polyline>
                            <line x1="12" y1="15" x2="12" y2="3"></line>
                          </svg>
                        }
                      >
                        Export
                      </DropdownItem>

                      <DropdownItem
                        onClick={() => {
                          if (!isFeatureAllowed('apply-all')) {
                            handlePremiumFeatureClick('apply-all');
                            return;
                          }
                          handleApplyAllClick();
                          setActiveMenu(null);
                        }}
                        icon={
                          <svg
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                            <line x1="9" y1="9" x2="15" y2="9"></line>
                            <line x1="9" y1="15" x2="15" y2="15"></line>
                            <line x1="9" y1="12" x2="15" y2="12"></line>
                          </svg>
                        }
                      >
                        Apply All
                      </DropdownItem>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

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
                  value={searchTerm}
                  onValueInput={setSearchTerm}
                />
              </div>
              <IconButton
                onClick={() => {
                  setSearchTerm('');
                  setShowSearch(false);
                }}
                variant="secondary"
                size="medium"
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path
                    d="M12 4L4 12M4 4l8 8"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </IconButton>
            </div>
          </div>

          {filteredClasses.length > 0 ? (
            filteredClasses.map((savedClass) => (
              <div
                key={savedClass.name}
                className="relative flex flex-col p-2 border rounded-md mb-2"
                style={{ borderColor: 'var(--figma-color-border)' }}
              >
                <div className="flex items-center justify-between">
                  <Text mono size="xs">
                    {savedClass.name}
                  </Text>
                  <div className="flex items-center gap-2">
                    <IconButton
                      onClick={(e) => handleMenuClick(e, savedClass.name)}
                      variant="secondary"
                      size="medium"
                    >
                      <Ellipsis size={16} />
                    </IconButton>
                    <Button
                      onClick={() => handleApplyClass(savedClass)}
                      variant="primary"
                      size="medium"
                    >
                      Apply
                    </Button>
                  </div>
                </div>

                {activeMenu === savedClass.name && (
                  <div
                    ref={dropdownRef}
                    className={`absolute right-10 p-1 rounded-md z-10 overflow-hidden whitespace-nowrap shadow-lg ${
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
      </div>

      <input
        type="file"
        accept=".classaction,application/json"
        onChange={handleFileChange}
        style={{ display: 'none' }}
        id="file-input"
      />

      <ConfirmDialog
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
        title="Delete Class"
        message={`Are you sure you want to delete the class "${selectedClass?.name}"?`}
        confirmText="Delete"
        variant="danger"
      />

      <ConfirmDialog
        isOpen={isUpdateModalOpen}
        onClose={() => setIsUpdateModalOpen(false)}
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
          setSelectedClass(null);
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

      <PremiumFeatureModal
        isOpen={isPremiumFeatureModalOpen}
        onClose={() => setIsPremiumFeatureModalOpen(false)}
        featureName={premiumFeatureName}
        checkoutUrl={
          LEMONSQUEEZY_CONFIG.CHECKOUT_URL || 'https://classaction.lemonsqueezy.com/checkout'
        }
      />

      <LicenseActivation
        isOpen={showLicenseActivation}
        onClose={handleLicenseActivationClose}
        currentStatus={licenseStatus}
        error={licenseError}
        onActivate={handleLicenseActivation}
        onDeactivate={handleDeactivateLicense}
      />

      <LicenseDeactivationModal
        isOpen={isDeactivationModalOpen}
        onClose={() => setIsDeactivationModalOpen(false)}
        onConfirm={handleDeactivateLicense}
        hasExcessClasses={savedClasses.length > 5}
        totalClasses={savedClasses.length}
      />
    </div>
  );
}

export default render(Plugin);
