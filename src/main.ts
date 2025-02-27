import { emit, on, showUI } from '@create-figma-plugin/utilities';
import type {
  SavedClass,
  SavedClassResult,
  AppearanceProperties,
  ClassExportFormat,
  FrameProperties,
} from './types/index';
import type { LicenseStatus } from './types/license';
import { validateClassData, generateChecksum } from './utils/validation';
import { storageService } from './services/storageService';
import { licenseService } from './services/licenseService';

// Import diagnostic tests dynamically when needed
interface DiagnosticTestModule {
  runAllTests: () => {
    connectivity: { success: boolean; message: string };
    format: { success: boolean; message: string };
  };
}

let diagnosticTests: DiagnosticTestModule | null = null;

// Function to run diagnostic tests
function runDiagnosticTests() {
  try {
    // Load the tests dynamically if not already loaded
    if (!diagnosticTests) {
      // Using dynamic import would be better, but for now we'll keep the structure similar
      diagnosticTests = require('./__tests__/diagnostics/test-lemonsqueezy.js');
    }
    // Use non-null assertion since we just loaded the module
    return diagnosticTests!.runAllTests();
  } catch (error) {
    console.error("Errore durante l'importazione dei test diagnostici:", error);
    return {
      connectivity: { success: false, message: "Errore durante l'importazione dei test" },
      format: { success: false, message: "Errore durante l'importazione dei test" },
    };
  }
}

// Notification handler
let currentNotification: NotificationHandler | null = null;

function showNotification(message: string, options: { error?: boolean; timeout?: number } = {}) {
  // Cancel any existing notification
  if (currentNotification) {
    currentNotification.cancel();
  }
  // Show new notification
  currentNotification = figma.notify(message, options);
  return currentNotification;
}

export default function () {
  // Initialize the UI with fixed dimensions
  showUI({ width: 320, height: 480 });

  let isInitialized = false;
  let isProcessingLicense = false;
  // Flag per tracciare se l'UI è pronta a gestire le richieste API
  let isUiReadyForApi = false;

  // Register all event handlers
  on('UI_READY', async function () {
    console.log('UI is ready, initializing plugin...');
    if (!isInitialized) {
      try {
        // Initialize license state
        licenseService.initializeState();

        // Attendiamo che l'UI sia pronta a gestire le richieste API
        // prima di eseguire i test di connettività
        if (!isUiReadyForApi) {
          console.log('Waiting for UI to be ready for API requests...');
        }

        // Il resto dell'inizializzazione continua normalmente
        isInitialized = true;
        await initialize();
      } catch (error) {
        console.error('Error during initialization:', error);
        showNotification('Error initializing plugin. Please try again.', { error: true });
      }
    }
  });

  // Nuovo handler per quando l'UI è pronta a gestire le richieste API
  on('UI_READY_FOR_API', async function () {
    console.log('UI is ready for API requests');
    isUiReadyForApi = true;

    // Verifichiamo se c'è una validazione della licenza in sospeso
    const storedKey = await figma.clientStorage.getAsync('licenseKey');
    if (storedKey) {
      console.log('[UI_READY_FOR_API] Found stored license key, running validation');
      // Emettiamo un evento per far eseguire la validazione all'UI
      emit('VALIDATE_LICENSE', storedKey);
    }
  });

  // Aggiungiamo gli handler per gli eventi di licenza
  on('ACTIVATION_STARTED', () => {
    console.log('[License] Activation process started');
    // Non emettiamo qui lo stato di processing, lo faremo in ACTIVATE_LICENSE
  });

  // Test diagnostico dell'endpoint di attivazione viene eseguito solo quando l'UI è pronta
  // Non eseguiamo il test qui direttamente per evitare errori CORS
  // licenseService.testActivationEndpoint().catch((error) => {
  //   console.error('Failed to run activation endpoint test:', error);
  // });

  // Aggiungiamo un handler per eseguire i test diagnostici su richiesta
  on('RUN_DIAGNOSTIC_TESTS', async () => {
    try {
      console.log('Esecuzione dei test diagnostici su richiesta...');
      const testResults = await runDiagnosticTests();
      console.log('Risultati dei test diagnostici:', testResults);

      // Invia i risultati all'UI
      emit('DIAGNOSTIC_TEST_RESULTS', testResults);

      // Mostra una notifica con il risultato
      if (testResults.connectivity.success && testResults.format.success) {
        showNotification('Test diagnostici completati con successo!');
      } else {
        showNotification(
          'Alcuni test diagnostici sono falliti. Controlla la console per i dettagli.',
          { error: true },
        );
      }
    } catch (error) {
      console.error("Errore durante l'esecuzione dei test diagnostici:", error);
      showNotification("Errore durante l'esecuzione dei test diagnostici.", { error: true });
    }
  });

  on('ACTIVATE_LICENSE', async (licenseKey: string) => {
    if (isProcessingLicense) {
      console.log('[License] Another license operation is in progress');
      return;
    }

    try {
      isProcessingLicense = true;
      console.log('[License] Starting license activation for:', licenseKey);

      // Emit processing status
      emit('LICENSE_STATUS_CHANGED', {
        tier: 'free',
        isValid: false,
        features: [],
        status: 'processing',
      });

      // Proceed with activation
      const activationResult = await licenseService.handleActivate(licenseKey, isUiReadyForApi);
      console.log('[License] Activation result:', activationResult);

      // Log the raw activation result for debugging
      console.log('[License] Raw activation result:', JSON.stringify(activationResult, null, 2));

      // Save the license key regardless of validity
      // This allows us to validate it again later
      await figma.clientStorage.setAsync('licenseKey', licenseKey);

      // Always emit success status to ensure the modal closes
      // The actual license validity will be checked when features are used
      emit('LICENSE_STATUS_CHANGED', {
        ...activationResult,
        status: 'success', // Always use success to close the modal
      });

      // Show appropriate notification
      if (activationResult.isValid) {
        showNotification('License activated successfully!');

        // Force refresh the UI state after successful activation
        setTimeout(() => {
          // Re-emit the license status to ensure UI is fully updated
          emit('LICENSE_STATUS_CHANGED', {
            ...activationResult,
            status: 'success',
          });
        }, 500);
      } else {
        // Still show success but with a different message
        showNotification('License processed. Please check premium features availability.');
      }
    } catch (error) {
      console.error('[License] Error during activation:', error);
      emit('LICENSE_STATUS_CHANGED', {
        tier: 'free',
        isValid: false,
        features: [],
        status: 'error',
        error:
          error instanceof Error
            ? {
                code: 'API_ERROR',
                message: error.message,
                actions: ['Please try again later or contact support'],
              }
            : error,
      });
    } finally {
      isProcessingLicense = false;
    }
  });

  // Handler per la deattivazione della licenza
  on('DEACTIVATE_LICENSE', async () => {
    if (isProcessingLicense) {
      console.log('[License] Another license operation is in progress');
      return;
    }

    try {
      isProcessingLicense = true;
      console.log('[License] Starting license deactivation');

      // Emettiamo l'evento di inizio deattivazione
      emit('DEACTIVATION_STARTED');

      // Emettiamo lo stato di processing
      emit('LICENSE_STATUS_CHANGED', {
        tier: 'free',
        isValid: false,
        features: [],
        status: 'processing',
      });

      // Eseguiamo la deattivazione
      await licenseService.handleDeactivation();

      // Rimuoviamo la licenza salvata
      await figma.clientStorage.deleteAsync('licenseKey');

      // Emettiamo lo stato di successo (torniamo a freemium)
      emit('LICENSE_STATUS_CHANGED', {
        tier: 'free',
        isValid: false,
        features: [],
        status: 'idle',
      });

      // Mostriamo la notifica di successo
      showNotification('License deactivated successfully');
    } catch (error) {
      console.error('[License] Error during deactivation:', error);
      emit('LICENSE_STATUS_CHANGED', {
        tier: 'free',
        isValid: false,
        features: [],
        status: 'error',
        error:
          error instanceof Error
            ? {
                code: 'API_ERROR',
                message: error.message,
                actions: ['Please try again later or contact support'],
              }
            : error,
      });
    } finally {
      isProcessingLicense = false;
    }
  });

  // Listen for selection changes
  figma.on('selectionchange', () => {
    if (isInitialized) {
      checkSelection();
    }
  });

  // Semplifichiamo l'inizializzazione
  async function initialize() {
    try {
      console.log('[Initialize] Starting plugin initialization...');

      // Emettiamo subito uno stato freemium valido
      const freemiumStatus: LicenseStatus = {
        tier: 'free',
        isValid: false,
        features: [],
        status: 'idle',
      };
      emit('LICENSE_STATUS_CHANGED', freemiumStatus);

      // Carica le classi salvate
      console.log('[Initialize] Loading saved classes...');
      const classesResult = await loadSavedClasses();
      console.log('[Initialize] Classes loaded:', classesResult.length);

      // Controlla la selezione iniziale
      console.log('[Initialize] Checking initial selection...');
      await checkSelection();

      console.log('[Initialize] Plugin initialized successfully');
      return true;
    } catch (error) {
      console.error('[Initialize] Error during initialization:', error);
      showNotification('Failed to initialize plugin', { error: true });
      return false;
    }
  }

  // Semplifichiamo la gestione della licenza per lo sviluppo
  async function checkLicenseStatus(): Promise<LicenseStatus> {
    try {
      console.log('[CheckLicenseStatus] Validating license status...');
      const storedKey = await figma.clientStorage.getAsync('licenseKey');

      if (!storedKey) {
        console.log('[CheckLicenseStatus] No stored license key found');
        return {
          tier: 'free',
          isValid: false,
          features: [],
          status: 'idle',
        };
      }

      // Verifichiamo se l'UI è pronta a gestire le richieste API
      if (!isUiReadyForApi) {
        console.log('[CheckLicenseStatus] UI not ready for API requests, deferring validation');
        // Restituiamo uno stato temporaneo
        return {
          tier: 'free',
          isValid: false,
          features: [],
          status: 'idle',
          pendingValidation: true, // Indichiamo che la validazione è in sospeso
        };
      }

      console.log('[CheckLicenseStatus] Found stored key, validating...');
      const status = await licenseService.handleValidate(storedKey, isUiReadyForApi);
      console.log('[CheckLicenseStatus] Validation result:', status);

      emit('LICENSE_STATUS_CHANGED', status);
      return status;
    } catch (error) {
      console.error('[CheckLicenseStatus] Error:', error);
      const freemiumStatus: LicenseStatus = {
        tier: 'free',
        isValid: false,
        features: [],
        status: 'error',
        error: {
          code: 'API_ERROR',
          message: error instanceof Error ? error.message : 'Failed to check license status',
          actions: ['Please try again later'],
        },
      };
      emit('LICENSE_STATUS_CHANGED', freemiumStatus);
      return freemiumStatus;
    }
  }

  // Register all event handlers
  on('SAVE_CLASS', handleSaveClass);
  on('APPLY_CLASS', handleApplyClass);
  on('DELETE_CLASS', handleDeleteClass);
  on('UPDATE_CLASS', handleUpdateClass);
  on('EXPORT_CLASSES', handleExportClasses);
  on('IMPORT_CLASSES', handleImportClasses);
  on('APPLY_ALL_MATCHING_CLASSES', handleApplyAllMatchingClasses);
  on('ANALYZE_APPLY_ALL', handleAnalyzeApplyAll);
  on('CHECK_SELECTION', checkSelection);
  on('LOAD_CLASSES', loadSavedClasses);
  on('CHECK_LICENSE_STATUS', checkLicenseStatus);
  on('SHOW_ERROR', (error: string | { message: string }) => {
    const errorMessage = typeof error === 'string' ? error : error.message;
    showNotification(errorMessage, { error: true });
  });
  on('SHOW_NOTIFICATION', (message: string) => {
    showNotification(message);
  });

  // Check if current selection is a frame
  async function checkSelection() {
    const hasSelectedFrame = figma.currentPage.selection.some((node) => node.type === 'FRAME');
    emit('SELECTION_CHANGED', hasSelectedFrame);
  }

  // Load saved classes on startup
  async function loadSavedClasses(): Promise<SavedClass[]> {
    try {
      console.log('Loading saved classes...');
      const savedClasses = await storageService.getSavedClasses();
      console.log('Loaded classes:', savedClasses);
      emit('CLASSES_LOADED', savedClasses);
      return savedClasses;
    } catch (error) {
      console.error('Error loading saved classes:', error);
      emit('SHOW_ERROR', 'Failed to load saved classes');
      return [];
    }
  }

  // Save classes to storage
  async function saveToStorage(classes: SavedClass[], shouldNotify = false) {
    try {
      await storageService.saveClasses(classes);
      if (shouldNotify) {
        showNotification('Classes saved successfully');
      }
    } catch (error) {
      console.error('Error saving classes:', error);
      emit('SHOW_ERROR', 'Failed to save classes');
    }
  }

  async function extractFrameProperties(frame: FrameNode): Promise<Omit<FrameProperties, 'name'>> {
    console.log('Extracting properties from frame:', frame.name);
    console.log('Frame fills:', frame.fills);
    console.log('Frame strokes:', frame.strokes);

    // Initialize with basic properties that all frames have
    const properties: Omit<FrameProperties, 'name'> = {
      width: frame.width,
      height: frame.height,
      layoutMode: frame.layoutMode,
      minWidth: undefined,
      maxWidth: undefined,
      minHeight: undefined,
      maxHeight: undefined,
    };

    // Add auto-layout specific properties
    if (frame.layoutMode === 'HORIZONTAL' || frame.layoutMode === 'VERTICAL') {
      console.log('Frame has auto-layout, extracting sizing properties');

      // Add min/max constraints only for auto-layout frames
      properties.minWidth = frame.minWidth;
      properties.maxWidth = frame.maxWidth;
      properties.minHeight = frame.minHeight;
      properties.maxHeight = frame.maxHeight;

      properties.layoutProperties = {
        primaryAxisSizingMode: frame.primaryAxisSizingMode,
        counterAxisSizingMode: frame.counterAxisSizingMode,
        primaryAxisAlignItems: frame.primaryAxisAlignItems as
          | 'MIN'
          | 'MAX'
          | 'CENTER'
          | 'SPACE_BETWEEN',
        counterAxisAlignItems: frame.counterAxisAlignItems as 'MIN' | 'MAX' | 'CENTER',
        layoutWrap: frame.layoutWrap,
        itemSpacing: typeof frame.itemSpacing === 'number' ? frame.itemSpacing : null,
        counterAxisSpacing:
          typeof frame.counterAxisSpacing === 'number' ? frame.counterAxisSpacing : null,
        padding: {
          top: frame.paddingTop,
          right: frame.paddingRight,
          bottom: frame.paddingBottom,
          left: frame.paddingLeft,
        },
        layoutPositioning: frame.layoutPositioning,
      };

      console.log('Extracted auto-layout properties:', {
        layoutWrap: frame.layoutWrap,
        itemSpacing: frame.itemSpacing,
        counterAxisSpacing: frame.counterAxisSpacing,
        padding: {
          top: frame.paddingTop,
          right: frame.paddingRight,
          bottom: frame.paddingBottom,
          left: frame.paddingLeft,
        },
      });
    } else {
      console.log('Frame has no auto-layout, saving only fixed dimensions');
    }

    // Add appearance properties
    const appearance: AppearanceProperties = {
      opacity: frame.opacity,
      blendMode: frame.blendMode,
      cornerRadius: frame.cornerRadius,
      strokeWeight: frame.strokeWeight,
      strokeAlign: frame.strokeAlign,
      dashPattern: [...frame.dashPattern], // Create a copy of the array
    };
    properties.appearance = appearance;

    // Handle style references first
    const styleReferences: Required<NonNullable<SavedClass['styleReferences']>> = {
      fillStyleId: '',
      strokeStyleId: '',
      effectStyleId: '',
      gridStyleId: '',
    };
    let hasStyleReferences = false;

    // Check style IDs and get style names and values
    async function getStyleInfo(
      styleId: string,
    ): Promise<{ id: string; name: string; value?: string }> {
      try {
        const style = await figma.getStyleByIdAsync(styleId);
        if (!style) return { id: styleId, name: styleId };

        let value: string | undefined;
        if ('paints' in style) {
          const paint = style.paints[0];
          if (paint.type === 'SOLID') {
            const { r, g, b } = paint.color;
            const opacity = 'opacity' in paint ? paint.opacity : 1;
            value = `rgba(${Math.round(r * 255)}, ${Math.round(g * 255)}, ${Math.round(b * 255)}, ${opacity})`;
          }
        }

        return { id: styleId, name: style.name, value };
      } catch (error) {
        console.error('Error getting style info:', error);
        return { id: styleId, name: styleId };
      }
    }

    if (frame.fillStyleId && typeof frame.fillStyleId === 'string') {
      const { id } = await getStyleInfo(frame.fillStyleId);
      styleReferences.fillStyleId = id;
      hasStyleReferences = true;
      console.log('Found fill style ID:', id);
    }
    if (frame.strokeStyleId && typeof frame.strokeStyleId === 'string') {
      const { id } = await getStyleInfo(frame.strokeStyleId);
      styleReferences.strokeStyleId = id;
      hasStyleReferences = true;
      console.log('Found stroke style ID:', id);
    }
    if (frame.effectStyleId && typeof frame.effectStyleId === 'string') {
      const { name } = await getStyleInfo(frame.effectStyleId);
      styleReferences.effectStyleId = name;
      hasStyleReferences = true;
      console.log('Found effect style:', name);
    }
    if (frame.gridStyleId && typeof frame.gridStyleId === 'string') {
      const { name } = await getStyleInfo(frame.gridStyleId);
      styleReferences.gridStyleId = name;
      hasStyleReferences = true;
    }

    if (hasStyleReferences) {
      properties.styleReferences = styleReferences;
    }

    // Handle direct styles only if no style references exist for that property
    const styles: Required<NonNullable<SavedClass['styles']>> = {
      fills: [],
      strokes: [],
      effects: [],
      layoutGrids: [],
    };
    let hasStyles = false;

    // Convert Figma Paint to CSS color
    function paintToCSS(paint: Paint): string | null {
      console.log('Converting paint to CSS:', paint);
      if (paint.type === 'SOLID') {
        const { r, g, b } = paint.color;
        const opacity = 'opacity' in paint ? paint.opacity : 1;
        const cssColor = `rgba(${Math.round(r * 255)}, ${Math.round(g * 255)}, ${Math.round(b * 255)}, ${opacity})`;
        console.log('Generated CSS color:', cssColor);
        return cssColor;
      }
      return null;
    }

    if (Array.isArray(frame.fills) && !styleReferences.fillStyleId) {
      console.log('Processing fills for frame:', frame.fills);
      const cssColors = frame.fills
        .map(paintToCSS)
        .filter((color): color is string => color !== null);
      if (cssColors.length > 0) {
        styles.fills = cssColors;
        hasStyles = true;
        console.log('Saved CSS colors for fills:', cssColors);
      }
    }

    if (Array.isArray(frame.strokes) && !styleReferences.strokeStyleId) {
      console.log('Processing strokes for frame:', frame.strokes);
      const cssColors = frame.strokes
        .map(paintToCSS)
        .filter((color): color is string => color !== null);
      if (cssColors.length > 0) {
        styles.strokes = cssColors;
        hasStyles = true;
        console.log('Saved CSS colors for strokes:', cssColors);
      }
    }

    if (Array.isArray(frame.effects) && !styleReferences.effectStyleId) {
      console.log('Processing effects:', frame.effects);
      const cssEffects = frame.effects
        .map((effect) => {
          if (effect.type === 'DROP_SHADOW') {
            const { offset, radius, color } = effect;
            return `${offset.x}px ${offset.y}px ${radius}px rgba(${Math.round(color.r * 255)}, ${Math.round(color.g * 255)}, ${Math.round(color.b * 255)}, ${color.a})`;
          }
          return null;
        })
        .filter((effect): effect is string => effect !== null);
      if (cssEffects.length > 0) {
        styles.effects = cssEffects;
        hasStyles = true;
        console.log('Saved CSS shadows:', cssEffects);
      }
    }

    if (hasStyles) {
      console.log('Final styles object:', styles);
      properties.styles = styles;
    }

    console.log('Final properties object:', properties);
    return properties;
  }

  async function handleSaveClass(event: { name: string }): Promise<SavedClassResult> {
    try {
      const frame = figma.currentPage.selection[0] as FrameNode;
      if (!frame || frame.type !== 'FRAME') {
        throw new Error('No frame selected');
      }

      const frameProperties = await extractFrameProperties(frame);
      const newClass: SavedClass = {
        name: event.name,
        createdAt: Date.now(),
        ...frameProperties,
      };

      await storageService.addClass(newClass);
      emit('CLASS_SAVED', newClass);
      showNotification('Class saved successfully');
      return { success: true, data: newClass };
    } catch (error) {
      console.error('Error saving class:', error);
      const errorMessage = error instanceof Error ? error.message : 'Failed to save class';
      emit('SHOW_ERROR', errorMessage);
      return { success: false, error: errorMessage };
    }
  }

  async function handleApplyClass(classData: SavedClass, shouldNotify = true) {
    if (!checkSelection()) {
      showNotification('Please select at least one frame', { error: true });
      return false;
    }

    const frames = figma.currentPage.selection.filter(
      (node) => node.type === 'FRAME',
    ) as FrameNode[];
    if (frames.length === 0) {
      showNotification('Please select at least one frame', { error: true });
      return false;
    }

    try {
      let successCount = 0;
      for (const frame of frames) {
        // Set frame name to class name
        frame.name = classData.name;
        console.log('Setting frame name to:', classData.name);

        // Set layout mode first as it affects how dimensions are applied
        frame.layoutMode = classData.layoutMode;
        console.log('Setting layout mode to:', classData.layoutMode);

        if (frame.layoutMode === 'NONE') {
          // For frames without auto-layout, apply only fixed dimensions
          console.log('Applying fixed dimensions:', {
            width: classData.width,
            height: classData.height,
          });
          frame.resize(classData.width, classData.height);
        } else {
          // For auto-layout frames, apply all dimension properties
          frame.resize(classData.width, classData.height);

          if (classData.minWidth !== null && classData.minWidth !== undefined) {
            frame.minWidth = classData.minWidth;
          }
          if (classData.maxWidth !== null && classData.maxWidth !== undefined) {
            frame.maxWidth = classData.maxWidth;
          }
          if (classData.minHeight !== null && classData.minHeight !== undefined) {
            frame.minHeight = classData.minHeight;
          }
          if (classData.maxHeight !== null && classData.maxHeight !== undefined) {
            frame.maxHeight = classData.maxHeight;
          }

          console.log('Applied auto-layout dimensions:', {
            width: classData.width,
            height: classData.height,
            minWidth: frame.minWidth,
            maxWidth: frame.maxWidth,
            minHeight: frame.minHeight,
            maxHeight: frame.maxHeight,
          });

          // Apply layout properties if present
          if (classData.layoutProperties) {
            frame.primaryAxisSizingMode = classData.layoutProperties.primaryAxisSizingMode;
            frame.counterAxisSizingMode = classData.layoutProperties.counterAxisSizingMode;
            frame.primaryAxisAlignItems = classData.layoutProperties.primaryAxisAlignItems;
            frame.counterAxisAlignItems = classData.layoutProperties.counterAxisAlignItems;
            frame.layoutWrap = classData.layoutProperties.layoutWrap;

            // Apply spacing only if values are not null
            if (classData.layoutProperties.itemSpacing !== null) {
              frame.itemSpacing = classData.layoutProperties.itemSpacing;
            }
            if (classData.layoutProperties.counterAxisSpacing !== null) {
              frame.counterAxisSpacing = classData.layoutProperties.counterAxisSpacing;
            }

            // Apply individual padding values
            frame.paddingTop = classData.layoutProperties.padding.top;
            frame.paddingRight = classData.layoutProperties.padding.right;
            frame.paddingBottom = classData.layoutProperties.padding.bottom;
            frame.paddingLeft = classData.layoutProperties.padding.left;

            console.log('Applied auto-layout properties:', {
              layoutWrap: frame.layoutWrap,
              itemSpacing: frame.itemSpacing,
              counterAxisSpacing: frame.counterAxisSpacing,
              padding: {
                top: frame.paddingTop,
                right: frame.paddingRight,
                bottom: frame.paddingBottom,
                left: frame.paddingLeft,
              },
            });

            frame.layoutPositioning = classData.layoutProperties.layoutPositioning;
          }
        }

        // Apply appearance properties
        if (classData.appearance) {
          frame.opacity = classData.appearance.opacity;
          frame.blendMode = classData.appearance.blendMode;
          frame.cornerRadius = classData.appearance.cornerRadius;
          if (classData.appearance.strokeWeight !== figma.mixed) {
            frame.strokeWeight = classData.appearance.strokeWeight;
          }
          frame.strokeAlign = classData.appearance.strokeAlign;
          frame.dashPattern = [...classData.appearance.dashPattern];
        }

        // Apply style references first
        if (classData.styleReferences) {
          const { fillStyleId, strokeStyleId, effectStyleId, gridStyleId } =
            classData.styleReferences;

          try {
            if (fillStyleId && typeof fillStyleId === 'string') {
              await frame.setFillStyleIdAsync(fillStyleId);
              console.log('Applied fill style ID:', fillStyleId);
            }
            if (strokeStyleId && typeof strokeStyleId === 'string') {
              await frame.setStrokeStyleIdAsync(strokeStyleId);
              console.log('Applied stroke style ID:', strokeStyleId);
            }
            if (effectStyleId && typeof effectStyleId === 'string') {
              await frame.setEffectStyleIdAsync(effectStyleId);
              console.log('Applied effect style ID:', effectStyleId);
            }
            if (gridStyleId && typeof gridStyleId === 'string') {
              await frame.setGridStyleIdAsync(gridStyleId);
              console.log('Applied grid style ID:', gridStyleId);
            }
          } catch (error) {
            console.error('Error applying style references:', error);
            // Continue with direct styles if style references fail
          }
        }

        // Apply direct styles only if no style references exist for that property
        if (classData.styles) {
          if (!classData.styleReferences?.fillStyleId && Array.isArray(classData.styles.fills)) {
            if (typeof classData.styles.fills[0] === 'string') {
              // Se sono valori CSS, creiamo un nuovo Paint object
              const newFills = classData.styles.fills
                .map((cssColor) => {
                  if (typeof cssColor !== 'string') return null;
                  const matches = cssColor.match(
                    /rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)/,
                  );
                  if (matches) {
                    const [, r, g, b, a = '1'] = matches;
                    return {
                      type: 'SOLID',
                      color: { r: parseInt(r) / 255, g: parseInt(g) / 255, b: parseInt(b) / 255 },
                      opacity: parseFloat(a),
                    } as Paint;
                  }
                  return null;
                })
                .filter((fill): fill is Paint => fill !== null);
              if (newFills.length > 0) {
                frame.fills = newFills;
              }
            } else {
              // Se sono Paint objects, li applichiamo direttamente
              frame.fills = classData.styles.fills as Paint[];
            }
          }

          if (
            !classData.styleReferences?.strokeStyleId &&
            Array.isArray(classData.styles.strokes)
          ) {
            if (typeof classData.styles.strokes[0] === 'string') {
              // Se sono valori CSS, creiamo un nuovo Paint object
              const newStrokes = classData.styles.strokes
                .map((cssColor) => {
                  if (typeof cssColor !== 'string') return null;
                  const matches = cssColor.match(
                    /rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)/,
                  );
                  if (matches) {
                    const [, r, g, b, a = '1'] = matches;
                    return {
                      type: 'SOLID',
                      color: { r: parseInt(r) / 255, g: parseInt(g) / 255, b: parseInt(b) / 255 },
                      opacity: parseFloat(a),
                    } as Paint;
                  }
                  return null;
                })
                .filter((stroke): stroke is Paint => stroke !== null);
              if (newStrokes.length > 0) {
                frame.strokes = newStrokes;
              }
            } else {
              // Se sono Paint objects, li applichiamo direttamente
              frame.strokes = classData.styles.strokes as Paint[];
            }
          }

          if (
            !classData.styleReferences?.effectStyleId &&
            Array.isArray(classData.styles.effects)
          ) {
            if (typeof classData.styles.effects[0] === 'string') {
              // Se sono valori CSS, creiamo nuovi Effect objects
              const newEffects = classData.styles.effects
                .map((cssShadow) => {
                  if (typeof cssShadow !== 'string') return null;
                  const matches = cssShadow.match(
                    /(-?\d+)px\s+(-?\d+)px\s+(-?\d+)px\s+rgba\((\d+),\s*(\d+),\s*(\d+),\s*([\d.]+)\)/,
                  );
                  if (matches) {
                    const [, x, y, blur, r, g, b, a] = matches;
                    return {
                      type: 'DROP_SHADOW',
                      color: {
                        r: parseInt(r) / 255,
                        g: parseInt(g) / 255,
                        b: parseInt(b) / 255,
                        a: parseFloat(a),
                      },
                      offset: { x: parseInt(x), y: parseInt(y) },
                      radius: parseInt(blur),
                      visible: true,
                      blendMode: 'NORMAL',
                    } as Effect;
                  }
                  return null;
                })
                .filter((effect): effect is Effect => effect !== null);
              if (newEffects.length > 0) {
                frame.effects = newEffects;
              }
            } else {
              // Se sono Effect objects, li applichiamo direttamente
              frame.effects = classData.styles.effects as Effect[];
            }
          }
        }
        successCount++;
      }

      if (shouldNotify) {
        const message =
          frames.length === 1
            ? 'Class applied successfully'
            : `Class applied to ${successCount} frames successfully`;
        showNotification(message);
      }

      return true;
    } catch (error) {
      console.error('Error applying class:', error);
      showNotification('Failed to apply class', { error: true });
      return false;
    }
  }

  async function handleUpdateClass(classToUpdate: SavedClass): Promise<SavedClassResult | null> {
    try {
      await storageService.updateClass(classToUpdate);
      emit('CLASS_UPDATED', {
        name: classToUpdate.name,
        properties: classToUpdate,
      });
      showNotification('Class updated successfully');
      return { success: true, data: classToUpdate };
    } catch (error) {
      console.error('Error updating class:', error);
      const errorMessage = error instanceof Error ? error.message : 'Failed to update class';
      emit('SHOW_ERROR', errorMessage);
      return { success: false, error: errorMessage };
    }
  }

  async function handleDeleteClass(classData: SavedClass) {
    try {
      await storageService.deleteClass(classData.name);
      emit('CLASS_DELETED', classData.name);
      showNotification('Class deleted successfully');
    } catch (error) {
      console.error('Error deleting class:', error);
      emit('SHOW_ERROR', 'Failed to delete class');
    }
  }

  async function handleExportClasses(selectedClasses?: string[]) {
    try {
      const savedClasses = await loadSavedClasses();
      const classesToExport = selectedClasses
        ? savedClasses.filter((cls: SavedClass) => selectedClasses.includes(cls.name))
        : savedClasses;

      // Validazione delle classi
      const invalidClasses = classesToExport.filter((cls: SavedClass) => !validateClassData(cls));
      if (invalidClasses.length > 0) {
        const invalidNames = invalidClasses.map((cls: SavedClass) => cls.name).join(', ');
        throw new Error(`Invalid class data found in: ${invalidNames}`);
      }

      // Preparazione dati di export
      const exportData: ClassExportFormat = {
        version: '1.0.0',
        exportDate: new Date().toISOString(),
        classes: classesToExport,
        metadata: {
          pluginVersion: '1.0.0',
          figmaVersion: figma.editorType,
          checksum: '', // Sarà aggiunto dopo
          totalClasses: classesToExport.length,
          exportedBy: 'Unknown', // Default value
        },
      };

      // Try to get current user if permission is available
      try {
        exportData.metadata.exportedBy = figma.currentUser?.name || 'Unknown';
      } catch (error) {
        console.log('Current user information not available');
      }

      // Aggiungi checksum
      exportData.metadata.checksum = generateChecksum(exportData.classes);

      // Genera nome file suggerito
      const timestamp = new Date().toISOString().split('T')[0]; // Prende solo la parte della data (YYYY-MM-DD)
      const suggestedFileName = `class-action-export-${timestamp}.json`;

      // Prepara il contenuto del file
      const jsonString = JSON.stringify(exportData, null, 2);

      // Emetti evento per mostrare dialog di salvataggio
      emit('SHOW_SAVE_DIALOG', {
        suggestedFileName,
        fileContent: jsonString,
        totalClasses: classesToExport.length,
      });

      return jsonString;
    } catch (error) {
      console.error('Error exporting classes:', error);
      const errorMessage = error instanceof Error ? error.message : 'Failed to export classes';
      showNotification(errorMessage, { error: true, timeout: 3000 });
      return false;
    }
  }

  async function handleImportClasses(jsonString: string) {
    try {
      console.log('Starting import process with data:', jsonString.substring(0, 200) + '...');

      const importData = JSON.parse(jsonString) as ClassExportFormat;
      console.log('Parsed import data:', {
        version: importData.version,
        totalClasses: importData.classes?.length,
        metadata: importData.metadata,
      });

      // Validazione base del formato
      if (!importData.version || !importData.classes || !Array.isArray(importData.classes)) {
        console.error('Validation failed:', {
          hasVersion: !!importData.version,
          hasClasses: !!importData.classes,
          isArray: Array.isArray(importData.classes),
        });
        emit('IMPORT_RESULT', { success: false, error: 'Invalid file format' });
        return;
      }

      // Carica le classi esistenti
      const existingClasses = await loadSavedClasses();
      console.log('Loaded existing classes:', existingClasses.length);

      // Identifica le classi da importare e quelle già presenti
      const existingNames = new Set(existingClasses.map((cls: SavedClass) => cls.name));
      const newClasses = [];
      const alreadyExistingClasses = [];

      for (const importClass of importData.classes) {
        if (existingNames.has(importClass.name)) {
          alreadyExistingClasses.push(importClass.name);
        } else {
          newClasses.push(importClass);
        }
      }

      // Prepara il messaggio appropriato
      let notificationMessage = '';
      if (newClasses.length === 0 && alreadyExistingClasses.length > 0) {
        notificationMessage = `No classes imported - all ${alreadyExistingClasses.length} classes already exist`;
      } else if (newClasses.length > 0 && alreadyExistingClasses.length > 0) {
        notificationMessage = `Imported ${newClasses.length} classes, skipped ${alreadyExistingClasses.length} existing classes`;
      } else if (newClasses.length > 0) {
        notificationMessage = `Successfully imported ${newClasses.length} classes`;
      } else {
        notificationMessage = 'No classes to import';
      }

      // Se ci sono nuove classi da importare, le aggiungiamo
      if (newClasses.length > 0) {
        const mergedClasses = [...existingClasses, ...newClasses];
        await saveToStorage(mergedClasses);
        console.log('Successfully saved merged classes');
      }

      // Notifica l'utente
      showNotification(notificationMessage);

      // Invia il risultato dell'importazione alla UI
      emit('IMPORT_RESULT', {
        success: true,
        importedClasses: newClasses,
        skippedClasses: alreadyExistingClasses,
        message: notificationMessage,
      });
    } catch (error) {
      console.error('Error importing classes:', error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      showNotification('Failed to import classes: ' + errorMessage, { error: true });
      emit('IMPORT_RESULT', { success: false, error: errorMessage });
    }
  }

  async function handleApplyAllMatchingClasses() {
    try {
      // Load all saved classes
      const savedClasses = await loadSavedClasses();
      if (!savedClasses.length) {
        showNotification('No saved classes found');
        return false;
      }

      // Get all frames in current page
      const frames = figma.currentPage.findAll((node) => node.type === 'FRAME') as FrameNode[];
      if (!frames.length) {
        showNotification('No frames found in current page');
        return false;
      }

      let appliedCount = 0;
      let errorCount = 0;

      // For each frame, try to find and apply matching class
      for (const frame of frames) {
        const matchingClass = savedClasses.find((cls: SavedClass) => cls.name === frame.name);
        if (matchingClass) {
          try {
            // Create a temporary selection to use handleApplyClass
            figma.currentPage.selection = [frame];
            await handleApplyClass(matchingClass, false);
            appliedCount++;
          } catch (error) {
            console.error(`Error applying class to frame ${frame.name}:`, error);
            errorCount++;
          }
        }
      }

      // Show results
      if (appliedCount > 0) {
        showNotification(
          `Applied ${appliedCount} classes successfully${errorCount > 0 ? ` (${errorCount} errors)` : ''}`,
        );
        emit('CLASSES_APPLIED_ALL', { success: true, appliedCount, errorCount });
        return true;
      } else {
        showNotification('No matching classes found');
        return false;
      }
    } catch (error) {
      console.error('Error in apply all matching classes:', error);
      showNotification('Failed to apply matching classes', { error: true });
      emit('CLASSES_APPLIED_ALL', { success: false, error: String(error) });
      return false;
    }
  }

  async function handleAnalyzeApplyAll() {
    try {
      // Load all saved classes
      const savedClasses = await loadSavedClasses();
      if (!savedClasses.length) {
        showNotification('No saved classes found');
        return;
      }

      // Get all frames in current page
      const frames = figma.currentPage.findAll((node) => node.type === 'FRAME') as FrameNode[];
      if (!frames.length) {
        showNotification('No frames found in current page');
        return;
      }

      // Count matching frames
      const matchingFrames = frames.filter((frame) =>
        savedClasses.some((cls: SavedClass) => cls.name === frame.name),
      ).length;

      // Emit analysis result
      emit('APPLY_ALL_ANALYSIS_RESULT', { totalFrames: frames.length, matchingFrames });
    } catch (error) {
      console.error('Error analyzing frames:', error);
      showNotification('Failed to analyze frames', { error: true });
    }
  }

  // Handler per il rename della classe
  on('RENAME_CLASS', async ({ oldName, newName }) => {
    try {
      console.log('Attempting to rename class:', oldName, 'to:', newName);

      // Validazione del nuovo nome
      if (!newName || newName.trim() === '') {
        throw new Error('New class name cannot be empty');
      }
      if (newName.length > 64) {
        throw new Error('New class name is too long. Maximum 64 characters allowed.');
      }

      // Carica le classi salvate
      const savedClasses = await loadSavedClasses();

      // Verifica se il nuovo nome è già in uso (case-insensitive)
      if (
        savedClasses.some(
          (cls: SavedClass) =>
            cls.name.toLowerCase() === newName.toLowerCase() &&
            cls.name.toLowerCase() !== oldName.toLowerCase(),
        )
      ) {
        throw new Error('A class with this name already exists');
      }

      // Trova l'indice della classe da rinominare
      const classIndex = savedClasses.findIndex((cls: SavedClass) => cls.name === oldName);
      if (classIndex === -1) {
        throw new Error('Original class not found');
      }

      // Crea una nuova classe con il nuovo nome
      const updatedClass = { ...savedClasses[classIndex], name: newName.trim() };

      // Aggiorna l'array delle classi
      savedClasses[classIndex] = updatedClass;

      // Salva le modifiche
      await saveToStorage(savedClasses);

      // Notifica l'UI del successo
      emit('CLASS_RENAMED', { oldName, newName: updatedClass.name });
      emit('CLASSES_LOADED', savedClasses);
      showNotification(`Class "${oldName}" renamed to "${updatedClass.name}" successfully`);
    } catch (error) {
      console.error('Error renaming class:', error);
      showNotification(error instanceof Error ? error.message : 'Failed to rename class', {
        error: true,
      });
    }
  });

  on('VALIDATE_LICENSE', async (licenseKey: string) => {
    try {
      const status = await licenseService.handleValidate(licenseKey, isUiReadyForApi);
      emit('LICENSE_STATUS_CHANGED', status);
    } catch (error) {
      console.error('Error validating license:', error);
      emit('LICENSE_ERROR', error);
    }
  });
}
