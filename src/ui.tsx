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
import {
  Info,
  Edit as Rename,
  Trash,
  Ellipsis,
  Refresh as Update,
  Loader,
  Upload,
  Download,
} from './components/common/icons';
import { ClassCounter } from './components/ClassCounter';
import { makeApiRequest } from './ui/services/apiService';
import { MAX_CLASSES } from './config/featureFlags';

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

  // Stati per la funzionalità Apply All di una classe specifica
  const [isApplyClassToAllModalOpen, setIsApplyClassToAllModalOpen] = useState(false);
  const [applyClassToAllAnalysis, setApplyClassToAllAnalysis] = useState<{
    className: string;
    matchingFrames: number;
  } | null>(null);

  const dropdownRef = useRef<HTMLDivElement>(null);
  const [dropdownPosition, setDropdownPosition] = useState<'bottom' | 'top'>('bottom');

  // Stato per tracciare se la modale è stata aperta manualmente
  const [isManualOpen, setIsManualOpen] = useState(false);

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

    const unsubscribeClassDeleted = on('CLASS_DELETED', (deletedClass: SavedClass) => {
      if (!mounted) return;
      setSavedClasses((prevClasses) => prevClasses.filter((cls) => cls.name !== deletedClass.name));
    });

    const unsubscribeClassRenamed = on('CLASS_RENAMED', ({ oldName, newName }) => {
      if (!mounted) return;
      console.log('Class renamed from', oldName, 'to', newName);
      // No need to update the state here as CLASSES_LOADED will be emitted after rename
    });

    const unsubscribeClassUpdated = on('CLASS_UPDATED', (updatedClass: SavedClass) => {
      if (!mounted) return;
      console.log('Class updated:', updatedClass);
      setSavedClasses((prevClasses) =>
        prevClasses.map((cls) => (cls.name === updatedClass.name ? updatedClass : cls)),
      );
      setIsUpdateModalOpen(false);
    });

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

    const unsubscribeClassAppliedToAll = on('CLASS_APPLIED_TO_ALL', () => {
      // Chiudiamo la modale se è ancora aperta
      setIsApplyClassToAllModalOpen(false);
      setApplyClassToAllAnalysis(null);
    });

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

    const unsubscribeApplyClassToAllAnalysisResult = on(
      'APPLY_CLASS_TO_ALL_ANALYSIS_RESULT',
      (result: { className: string; matchingFrames: number }) => {
        if (!mounted) return;
        console.log('Received APPLY_CLASS_TO_ALL_ANALYSIS_RESULT:', result);
        setApplyClassToAllAnalysis(result);
        // Non apriamo il modale qui, lo farà la funzione handleApplyClassToAll
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

        // Non chiudiamo immediatamente il modale, lasciamo che sia il timer nel componente a farlo
        // setShowLicenseActivation(false);

        // Assicuriamoci che isManualOpen sia false quando la licenza viene attivata automaticamente
        setIsManualOpen(false);

        setLicenseError(null);

        emit('SHOW_NOTIFICATION', 'License activated successfully! Welcome to Premium!');

        emit('LOAD_CLASSES');
      } else if (status.isValid && prevStatus.isValid && status.status === 'success') {
        // Caso in cui la licenza era già attiva o è stata riattivata
        console.log('License was already active or has been reactivated');

        // Non chiudiamo il modale, lasciamo che sia il timer nel componente a farlo
        setLicenseError(null);

        // Mostriamo comunque una notifica
        emit('SHOW_NOTIFICATION', 'License is already active!');
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
      unsubscribeClassRenamed();
      unsubscribeClassUpdated();
      unsubscribeClassApplied();
      unsubscribeClassesAppliedAll();
      unsubscribeClassAppliedToAll();
      unsubscribeImportResult();
      unsubscribeAnalysisResult();
      unsubscribeApplyClassToAllAnalysisResult();
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
    // Se il nome è vuoto, è comunque valido (useremo il nome del frame)
    if (!name.trim()) {
      return { isValid: true };
    }

    // Rimuoviamo la validazione con regex, permettendo qualsiasi carattere tranne i punti
    if (name.includes('.')) {
      return {
        isValid: false,
        error:
          'Class name cannot contain dots (.) - they will be automatically added in CSS notation',
      };
    }

    // Tutti gli altri nomi sono validi
    return { isValid: true };
  };

  const handleSaveClass = async (name: string) => {
    const validation = validateClassName(name);
    if (!validation.isValid) {
      emit('SHOW_ERROR', validation.error);
      return;
    }

    if (licenseStatus.tier === 'free' && savedClasses.length >= MAX_CLASSES.FREE) {
      emit(
        'SHOW_ERROR',
        'You have reached the maximum number of classes for the free plan. Upgrade to Premium for unlimited classes.',
      );
      return;
    }

    // If name is empty, we'll use the frame name, so we need to check for duplicates differently
    const nameToCheck = name.trim() || ''; // Empty string will be replaced with frame name on the plugin side

    // Only check for duplicates if a custom name is provided
    if (
      nameToCheck &&
      savedClasses.some((cls) => cls.name.toLowerCase() === nameToCheck.toLowerCase())
    ) {
      emit('SHOW_ERROR', 'A class with this name already exists (names are case-insensitive)');
      return;
    }

    emit('SAVE_CLASS', { name: name.trim() });
    setNewClassName('');
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

    // Verifica se c'è un frame selezionato
    if (!hasSelectedFrame) {
      emit('SHOW_ERROR', 'Please select a frame to update this class with');
      return;
    }

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

    // Verifica aggiuntiva che ci sia ancora un frame selezionato
    if (!hasSelectedFrame) {
      emit('SHOW_ERROR', 'No frame selected. Please select a frame to update this class with');
      setIsUpdateModalOpen(false);
      setClassToUpdate(null);
      return;
    }

    await emit('UPDATE_CLASS', classToUpdate);
    setIsUpdateModalOpen(false);
    setClassToUpdate(null);
  };

  const handleConfirmRename = async () => {
    if (!selectedClass) return;

    const trimmedName = newName.trim();
    console.log('Attempting to rename in UI:', selectedClass.name, 'to:', trimmedName);

    // Verifica se il nome è effettivamente cambiato (case-sensitive)
    if (trimmedName === selectedClass.name) {
      setIsRenameModalOpen(false);
      setSelectedClass(null);
      setNewName('');
      return;
    }

    // Verifica se il nome è cambiato solo per maiuscole/minuscole
    if (trimmedName.toLowerCase() === selectedClass.name.toLowerCase()) {
      console.log('Only case changed in name');
      // Continuiamo con la rinomina in questo caso
    }

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

  const handleApplyClassToAll = async (classData: SavedClass) => {
    try {
      // Imposta una variabile per tenere traccia dell'analisi
      setSelectedClass(classData);

      // Crea una promessa che verrà risolta quando l'evento viene ricevuto
      const analysisPromise = new Promise<{ className: string; matchingFrames: number }>(
        (resolve) => {
          // Funzione che gestisce l'evento
          const handleAnalysisResult = (result: { className: string; matchingFrames: number }) => {
            console.log('Received analysis result in handleApplyClassToAll:', result);
            resolve(result);
          };

          // Registra l'event listener temporaneo
          const unsubscribe = on('APPLY_CLASS_TO_ALL_ANALYSIS_RESULT', handleAnalysisResult);

          // Timeout di sicurezza dopo 3 secondi
          setTimeout(() => {
            unsubscribe();
            // Risolviamo con un valore di default in caso di timeout
            resolve({ className: classData.name, matchingFrames: 0 });
          }, 3000);

          // Emetti la richiesta di analisi
          emit('ANALYZE_APPLY_CLASS_TO_ALL', classData.name);
        },
      );

      // Mostra la modale di conferma con stato di caricamento
      setApplyClassToAllAnalysis(null);
      setIsApplyClassToAllModalOpen(true);

      // Attendi il risultato dell'analisi
      const analysis = await analysisPromise;

      // Aggiorna lo stato con il risultato dell'analisi
      setApplyClassToAllAnalysis(analysis);

      // La modale è già aperta, l'utente può confermare o annullare
    } catch (error) {
      console.error('Error in handleApplyClassToAll:', error);
      emit('SHOW_ERROR', 'An error occurred while analyzing frames');
      setIsApplyClassToAllModalOpen(false);
    }
  };

  const handleConfirmApplyClassToAll = async () => {
    try {
      if (!selectedClass) return;

      await emit('APPLY_CLASS_TO_ALL', selectedClass);
      setIsApplyClassToAllModalOpen(false);
      setApplyClassToAllAnalysis(null);
    } catch (error) {
      console.error('Error applying class to all matching frames:', error);
      emit('SHOW_ERROR', 'An error occurred while applying class to frames');
    }
  };

  const isFeatureAllowed = (feature: string): boolean => {
    // Se l'utente ha una licenza valida, tutte le funzionalità sono consentite
    if (licenseStatus.isValid) {
      return true;
    }

    // Per gli utenti freemium, solo le funzionalità base sono consentite
    // e possono salvare fino a 5 classi
    if (feature === 'basic') {
      return true;
    }

    // La funzionalità unlimited-classes è controllata separatamente
    // perché dipende dal numero di classi salvate
    if (feature === 'unlimited-classes') {
      return savedClasses.length < 5;
    }

    // Tutte le altre funzionalità premium sono bloccate per gli utenti freemium
    const premiumFeatures = [
      'import-export',
      'apply-all',
      'batch-operations',
      'advanced-search',
      'auto-backup',
    ];
    return !premiumFeatures.includes(feature);
  };

  const handlePremiumFeatureClick = (featureName: string) => {
    // Format feature names for display
    let displayFeatureName = featureName;

    if (featureName === 'import-export') {
      displayFeatureName = 'Import and Export';
    } else if (featureName === 'apply-all') {
      displayFeatureName = 'Apply Global';
    } else if (featureName === 'batch-operations') {
      displayFeatureName = 'Apply All';
    } else if (featureName === 'Unlimited Classes') {
      displayFeatureName = 'Unlimited classes';
    }

    setIsPremiumFeatureModalOpen(true);
    setPremiumFeatureName(displayFeatureName);
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
    // Resettiamo isManualOpen quando la modale viene chiusa
    setIsManualOpen(false);
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
    // Impostiamo isManualOpen a true quando la modale viene aperta manualmente
    setIsManualOpen(true);
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
    <div
      className="flex flex-col p-4 gap-4 main-scrollbar-compensation"
      style={{ '--padding-x': '16px', '--padding-y': '16px' }}
    >
      <div className="flex items-center justify-between">
        <Text size="lg" weight="bold" className="text-lg">
          Class Action
        </Text>
        {licenseStatus.isValid && (
          <button
            className="flex items-center gap-1.5 px-2 h-7 rounded-md cursor-pointer bg-[var(--figma-color-bg-warning-tertiary)] text-[var(--figma-color-text-warning)] hover:bg-[var(--figma-color-bg-warning-hover)] hover:text-[var(--figma-color-text-onbrand)] transition-colors group"
            onClick={handleLicenseActivationOpen}
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-[var(--figma-color-text-warning)] group-hover:text-[var(--figma-color-text-onbrand)] transition-colors"
            >
              <path d="M11.562 3.266a.5.5 0 0 1 .876 0L15.39 8.87a1 1 0 0 0 1.516.294L21.183 5.5a.5.5 0 0 1 .798.519l-2.834 10.246a1 1 0 0 1-.956.734H5.81a1 1 0 0 1-.957-.734L2.02 6.02a.5.5 0 0 1 .798-.519l4.276 3.664a1 1 0 0 0 1.516-.294z" />
              <path d="M5 21h14" />
            </svg>
            <span className="font-bold group-hover:text-[var(--figma-color-text-onbrand)] cursor-pointer">
              Premium
            </span>
          </button>
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
            maxClasses={MAX_CLASSES.FREE}
            isPremium={licenseStatus.tier === 'premium'}
            onUpgradeClick={() => handlePremiumFeatureClick('Unlimited Classes')}
            onActivateClick={handleLicenseActivationOpen}
          />
        )}
      </div>

      <hr className="border-0 h-px bg-[var(--figma-color-border)]" />

      <div className="flex flex-col gap-1 flex-grow">
        <div>
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
                  Options
                </Button>

                {activeMenu === 'actions' && (
                  <div
                    ref={dropdownRef}
                    className={`absolute right-0 p-1 rounded-md z-50 overflow-hidden whitespace-nowrap shadow-lg ${
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
                        icon={<Upload size={16} />}
                      >
                        {'Import'}
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
                        icon={<Download size={16} />}
                      >
                        {'Export'}
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
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="lucide lucide-sparkles"
                          >
                            <path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z" />
                            <path d="M20 3v4" />
                            <path d="M22 5h-4" />
                            <path d="M4 17v2" />
                            <path d="M5 18H3" />
                          </svg>
                        }
                      >
                        {'Apply Global'}
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

          <div>
            {filteredClasses.length > 0 ? (
              filteredClasses.map((savedClass) => (
                <div
                  key={savedClass.name}
                  className="relative flex flex-col px-3 py-2 border rounded-md mb-2"
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
                        size="small"
                      >
                        <Ellipsis size={16} />
                      </IconButton>
                      <Button
                        onClick={() => handleApplyClass(savedClass)}
                        variant="primary"
                        size="small"
                      >
                        Apply
                      </Button>
                    </div>
                  </div>

                  {activeMenu === savedClass.name && (
                    <div
                      ref={dropdownRef}
                      className={`absolute right-10 p-1 rounded-md z-50 overflow-hidden whitespace-nowrap shadow-lg ${
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
                          onClick={() => {
                            if (isFeatureAllowed('batch-operations')) {
                              handleApplyClassToAll(savedClass);
                            } else {
                              handlePremiumFeatureClick('batch-operations');
                            }
                          }}
                          icon={
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              stroke-width="2"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              class="lucide lucide-sparkle"
                            >
                              <path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z" />
                            </svg>
                          }
                        >
                          {'Apply All'}
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
              <div className="text-center py-4">
                <Text size="sm" variant="muted">
                  {searchTerm ? 'No classes match your search.' : 'No saved classes yet.'}
                </Text>
              </div>
            )}
          </div>
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
        message={
          hasSelectedFrame
            ? `Do you want to update the class "${classToUpdate?.name}" with the current frame dimensions?`
            : 'No frame is currently selected. Please select a frame first.'
        }
        confirmText="Update"
        variant="info"
        confirmDisabled={!hasSelectedFrame}
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
        confirmDisabled={selectedClass ? newName.trim() === selectedClass.name : false}
      >
        <div className="mt-2">
          <TextInput
            value={newName}
            onChange={setNewName}
            className="w-full"
            placeholder="Enter new name"
            onKeyDown={(e) => {
              if (e.key === 'Enter' && selectedClass && newName.trim() !== selectedClass.name) {
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
        title="Apply Global"
        message={
          applyAllAnalysis
            ? `This will apply matching classes to ${applyAllAnalysis.matchingFrames} frames with the same name in the current page. Do you want to continue?`
            : 'Analyzing frames...'
        }
        confirmText="Apply"
        variant="info"
      />

      <ConfirmDialog
        isOpen={isApplyClassToAllModalOpen}
        onClose={() => {
          setIsApplyClassToAllModalOpen(false);
          setApplyClassToAllAnalysis(null);
        }}
        onConfirm={handleConfirmApplyClassToAll}
        title="Apply All"
        message={
          applyClassToAllAnalysis
            ? `This will apply the class "${selectedClass?.name}" to ${applyClassToAllAnalysis.matchingFrames} frame${
                applyClassToAllAnalysis.matchingFrames !== 1 ? 's' : ''
              } with the same name in the current page. Do you want to continue?`
            : 'Analyzing frames...'
        }
        confirmText="Apply"
        variant="info"
        confirmDisabled={!applyClassToAllAnalysis || applyClassToAllAnalysis.matchingFrames === 0}
      />

      <PremiumFeatureModal
        isOpen={isPremiumFeatureModalOpen}
        onClose={() => setIsPremiumFeatureModalOpen(false)}
        featureName={premiumFeatureName}
      />

      <LicenseActivation
        isOpen={showLicenseActivation}
        onClose={handleLicenseActivationClose}
        currentStatus={licenseStatus}
        error={licenseError}
        onActivate={handleLicenseActivation}
        onDeactivate={handleDeactivateLicense}
        isManualOpen={isManualOpen}
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
