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

// Dichiarazione delle variabili globali che verranno sostituite durante la build
// Nota: queste variabili sono ora gestite centralmente nel file src/config/lemonSqueezy.ts
// declare const __PRODUCTION_CHECKOUT_URL__: string;
// declare const __LEMONSQUEEZY_CHECKOUT_URL__: string;
// declare const __NODE_ENV__: string;

export default function () {
  // Initialize the UI with fixed dimensions
  showUI({ width: 320, height: 480 });

  let isInitialized = false;
  let isProcessingLicense = false;
  // Flag per tracciare se l'UI è pronta a gestire le richieste API
  // let isUiReadyForApi = false;

  // Register all event handlers
  on('UI_READY', async function () {
    console.log('UI is ready, initializing plugin...');
    if (!isInitialized) {
      try {
        // Inizializza lo stato della licenza in modo sicuro
        try {
          licenseService.initializeState();
        } catch (licenseError) {
          console.error('Error initializing license state:', licenseError);
          // Continua comunque con l'inizializzazione
        }

        // Imposta il flag di inizializzazione
        isInitialized = true;

        // Continua con l'inizializzazione
        try {
          await initialize();
        } catch (initError) {
          console.error('Error during initialization:', initError);
          // Mostra una notifica ma continua comunque
          showNotification('Some features may not be available.', { error: true });
        }
      } catch (error) {
        console.error('Critical error during initialization:', error);
        showNotification('Error initializing plugin. Please try again.', { error: true });
      }
    }
  });

  // Nuovo handler per quando l'UI è pronta a gestire le richieste API
  on('UI_READY_FOR_API', async function () {
    console.log('UI is ready for API requests');
    // Rimuoviamo questa riga che causa l'errore del linter
    // isUiReadyForApi = true;

    // Verifichiamo se c'è una validazione della licenza in sospeso
    try {
      const storedKey = await figma.clientStorage.getAsync('licenseKey');
      if (storedKey) {
        console.log('[UI_READY_FOR_API] Found stored license key, running validation');
        try {
          // Invece di emettere un evento, chiamiamo direttamente la funzione
          const status = await getLicenseStatus();
          console.log('[UI_READY_FOR_API] License status checked:', status);
        } catch (licenseError) {
          console.error('[UI_READY_FOR_API] Error checking license status:', licenseError);
          // Continua comunque
        }
      }
    } catch (error) {
      console.error('[UI_READY_FOR_API] Error accessing client storage:', error);
      // Continua comunque
    }
  });

  // Aggiungiamo gli handler per gli eventi di licenza
  on('ACTIVATION_STARTED', () => {
    console.log('[License] Activation process started');
    // Non emettiamo qui lo stato di processing, lo faremo in ACTIVATE_LICENSE
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
      const activationResult = await licenseService.handleActivate(licenseKey);
      console.log('[License] Activation result:', activationResult);

      // Log the raw activation result for debugging
      console.log('[License] Raw activation result:', JSON.stringify(activationResult, null, 2));

      // Log the activation date specifically for debugging
      console.log('[License] Activation date:', activationResult.activationDate);

      // Save the license key regardless of validity
      // This allows us to validate it again later
      await figma.clientStorage.setAsync('licenseKey', licenseKey);

      // Emit the actual activation result status
      // If there's an error, we want to show it in the modal
      emit('LICENSE_STATUS_CHANGED', activationResult);

      // Show appropriate notification
      if (activationResult.isValid) {
        // Removing this notification since it's already shown in the UI component
        // showNotification('License activated successfully!');

        // Force refresh the UI state after successful activation
        setTimeout(() => {
          // Re-emit the license status to ensure UI is fully updated
          emit('LICENSE_STATUS_CHANGED', {
            ...activationResult,
            status: 'success',
          });
        }, 500);
      } else if (activationResult.status !== 'error') {
        // Only show this if it's not an error (which will be shown in the modal)
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
  async function getLicenseStatus(): Promise<LicenseStatus> {
    try {
      console.log('[GetLicenseStatus] Validating license status...');
      const storedKey = await figma.clientStorage.getAsync('licenseKey');

      if (!storedKey) {
        console.log('[GetLicenseStatus] No stored license key found');
        return {
          tier: 'free',
          isValid: false,
          features: [],
          status: 'idle',
        };
      }

      // Non è più necessario verificare se l'UI è pronta, il meccanismo di retry se ne occuperà
      console.log('[GetLicenseStatus] Found stored key, validating...');
      const status = await licenseService.handleValidate(storedKey);
      console.log('[GetLicenseStatus] Validation result:', status);

      // Log the activation date for debugging
      console.log('[GetLicenseStatus] Activation date:', status.activationDate);

      emit('LICENSE_STATUS_CHANGED', status);
      return status;
    } catch (error) {
      console.error('[GetLicenseStatus] Error:', error);
      const freemiumStatus: LicenseStatus = {
        tier: 'free',
        isValid: false,
        features: [],
        status: 'error',
        error: {
          code: 'API_ERROR',
          message: 'Failed to validate license',
          actions: ['Try again later', 'Contact support'],
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
  on('ANALYZE_APPLY_CLASS_TO_ALL', handleAnalyzeApplyClassToAll);
  on('APPLY_CLASS_TO_ALL', handleApplyClassToAll);
  on('CHECK_SELECTION', checkSelection);
  on('LOAD_CLASSES', loadSavedClasses);
  on('CHECK_LICENSE_STATUS', getLicenseStatus);
  on('SHOW_ERROR', (error: string | { message: string }) => {
    const errorMessage = typeof error === 'string' ? error : error.message;
    showNotification(errorMessage, { error: true });
  });
  on('SHOW_NOTIFICATION', (message: string) => {
    showNotification(message);
  });

  // Check if current selection is a frame
  async function checkSelection() {
    const hasSelectedValidNode = figma.currentPage.selection.some(
      (node) => node.type === 'FRAME' || node.type === 'COMPONENT' || node.type === 'INSTANCE',
    );
    emit('SELECTION_CHANGED', hasSelectedValidNode);
    return hasSelectedValidNode;
  }

  // Load saved classes on startup
  async function loadSavedClasses(): Promise<SavedClass[]> {
    try {
      console.log('Loading saved classes...');
      const savedClasses = await storageService.getSavedClasses();
      console.log('Loaded classes:', savedClasses);

      // Verifica che le classi caricate abbiano la proprietà variableReferences
      if (savedClasses.length > 0) {
        console.log('Verifica delle proprietà variableReferences nelle classi caricate:');
        savedClasses.forEach((cls, index) => {
          if (cls.variableReferences) {
            console.log(
              `Classe ${index} (${cls.name}): ✅ ha variableReferences con ${Object.keys(cls.variableReferences).length} variabili`,
            );
          } else {
            console.warn(`Classe ${index} (${cls.name}): ⚠️ NON ha variableReferences`);
          }
        });
      }

      emit('CLASSES_LOADED', savedClasses);
      return savedClasses;
    } catch (error) {
      console.error('Error loading saved classes:', error);
      showNotification('Failed to load saved classes', { error: true });
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
      showNotification('Failed to save classes', { error: true });
    }
  }

  async function extractFrameProperties(
    node: FrameNode | ComponentNode | InstanceNode,
  ): Promise<FrameProperties> {
    console.log(`Extracting properties from ${node.type}:`, node.name);
    console.log('Node fills:', node.fills);
    console.log('Node strokes:', node.strokes);
    console.log('Node effects:', node.effects);

    // Salviamo i Variable Modes espliciti
    console.log('Node explicit variable modes:', node.explicitVariableModes);

    const properties: FrameProperties = {
      name: node.name,
      width: node.width,
      height: node.height,
      layoutMode: node.layoutMode,
      // Add aspect ratio properties using the new Figma API
      aspectRatio: {
        // Utilizziamo targetAspectRatio se disponibile, altrimenti calcoliamo il rapporto
        value:
          'targetAspectRatio' in node && typeof node.targetAspectRatio === 'number'
            ? node.targetAspectRatio
            : node.width / node.height,
        // Verifichiamo se il rapporto di aspetto è bloccato
        isLocked: 'constrainProportions' in node ? node.constrainProportions : false,
      },
      // Add position properties
      position: {
        rotation: node.rotation,
        constraints: {
          horizontal: node.constraints.horizontal,
          vertical: node.constraints.vertical,
        },
      },
      minWidth: undefined,
      maxWidth: undefined,
      minHeight: undefined,
      maxHeight: undefined,
      // Salviamo i fill, gli stroke e gli effects direttamente
      fills: JSON.parse(JSON.stringify(node.fills)),
      strokes: JSON.parse(JSON.stringify(node.strokes)),
      effects: JSON.parse(JSON.stringify(node.effects)),
      // Salviamo i Variable Modes espliciti
      variableModes:
        Object.keys(node.explicitVariableModes).length > 0
          ? JSON.parse(JSON.stringify(node.explicitVariableModes))
          : undefined,
    };

    // Add auto-layout specific properties
    if (node.layoutMode === 'HORIZONTAL' || node.layoutMode === 'VERTICAL') {
      console.log('Frame has auto-layout, extracting sizing properties');

      // Add min/max constraints only for auto-layout frames
      properties.minWidth = node.minWidth;
      properties.maxWidth = node.maxWidth;
      properties.minHeight = node.minHeight;
      properties.maxHeight = node.maxHeight;

      properties.layoutProperties = {
        // Sizing modes
        primaryAxisSizingMode: node.primaryAxisSizingMode,
        counterAxisSizingMode: node.counterAxisSizingMode,

        // Alignment
        primaryAxisAlignItems: node.primaryAxisAlignItems,
        counterAxisAlignItems: node.counterAxisAlignItems as 'MIN' | 'MAX' | 'CENTER',
        layoutAlign: node.layoutAlign as 'INHERIT' | 'STRETCH' | 'MIN' | 'CENTER' | 'MAX',

        // Wrapping and spacing
        layoutWrap: node.layoutWrap,
        itemSpacing: typeof node.itemSpacing === 'number' ? node.itemSpacing : null,
        counterAxisSpacing:
          typeof node.counterAxisSpacing === 'number' ? node.counterAxisSpacing : null,

        // Growth and shrinking
        layoutGrow: node.layoutGrow || 0,

        // Padding
        padding: {
          top: node.paddingTop,
          right: node.paddingRight,
          bottom: node.paddingBottom,
          left: node.paddingLeft,
        },

        // Positioning and behavior
        layoutPositioning: node.layoutPositioning,
        itemReverseZIndex: node.itemReverseZIndex || false,
        clipsContent: node.clipsContent,
      };

      console.log('Extracted auto-layout properties:', {
        layoutMode: node.layoutMode,
        primaryAxisSizingMode: node.primaryAxisSizingMode,
        counterAxisSizingMode: node.counterAxisSizingMode,
        primaryAxisAlignItems: node.primaryAxisAlignItems,
        counterAxisAlignItems: node.counterAxisAlignItems,
        layoutAlign: node.layoutAlign,
        layoutWrap: node.layoutWrap,
        itemSpacing: node.itemSpacing,
        counterAxisSpacing: node.counterAxisSpacing,
        layoutGrow: node.layoutGrow,
        padding: {
          top: node.paddingTop,
          right: node.paddingRight,
          bottom: node.paddingBottom,
          left: node.paddingLeft,
        },
        layoutPositioning: node.layoutPositioning,
        itemReverseZIndex: node.itemReverseZIndex,
        clipsContent: node.clipsContent,
      });
    } else {
      console.log('Frame has no auto-layout, saving only fixed dimensions');
    }

    // Add appearance properties
    const appearance: AppearanceProperties = {
      opacity: node.opacity,
      blendMode: node.blendMode,
      cornerRadius: node.cornerRadius,
      topLeftRadius: node.topLeftRadius,
      topRightRadius: node.topRightRadius,
      bottomLeftRadius: node.bottomLeftRadius,
      bottomRightRadius: node.bottomRightRadius,
      strokeWeight: node.strokeWeight,
      strokeAlign: node.strokeAlign,
      dashPattern: [...node.dashPattern],
    };
    properties.appearance = appearance;

    // Handle style references first
    const styleReferences: Required<NonNullable<SavedClass['styleReferences']>> = {
      fillStyleId: '',
      strokeStyleId: '',
      effectStyleId: '',
      gridStyleId: '',
    };

    // Aggiungo un oggetto per memorizzare i riferimenti alle variabili
    const variableReferences: Record<string, string> = {};
    let hasVariableReferences = false;

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

    if (node.fillStyleId && typeof node.fillStyleId === 'string') {
      const { id } = await getStyleInfo(node.fillStyleId);
      styleReferences.fillStyleId = id;
      hasStyleReferences = true;
      console.log('Found fill style ID:', id);
    }
    if (node.strokeStyleId && typeof node.strokeStyleId === 'string') {
      const { id } = await getStyleInfo(node.strokeStyleId);
      styleReferences.strokeStyleId = id;
      hasStyleReferences = true;
      console.log('Found stroke style ID:', id);
    }
    if (node.effectStyleId && typeof node.effectStyleId === 'string') {
      const { id } = await getStyleInfo(node.effectStyleId);
      styleReferences.effectStyleId = id;
      hasStyleReferences = true;
      console.log('Found effect style ID:', id);
    }
    if (node.gridStyleId && typeof node.gridStyleId === 'string') {
      const { name } = await getStyleInfo(node.gridStyleId);
      styleReferences.gridStyleId = name;
      hasStyleReferences = true;
    }

    // Controllo se ci sono variabili associate alle proprietà del nodo
    if (node.boundVariables) {
      console.log('Found bound variables:', JSON.stringify(node.boundVariables, null, 2));

      // Salvo i riferimenti alle variabili per ogni proprietà
      for (const [property, variable] of Object.entries(node.boundVariables)) {
        console.log(`Examining variable for property: ${property}`, variable);
        if (variable && 'id' in variable) {
          const variableId = variable.id;
          // Converto l'ID in stringa per evitare errori di tipo
          variableReferences[property] = String(variableId);
          hasVariableReferences = true;
          console.log(`Found variable for ${property}:`, variableId);

          // Ottieni informazioni aggiuntive sulla variabile
          try {
            const variableObj = await figma.variables.getVariableByIdAsync(String(variableId));
            if (variableObj) {
              console.log(`Variable details for ${property}:`, {
                name: variableObj.name,
                resolvedType: variableObj.resolvedType,
                valuesByMode: variableObj.valuesByMode,
              });
            }
          } catch (err) {
            console.error(`Error getting variable details for ${property}:`, err);
          }
        }
      }
    }

    // Controllo se ci sono variabili associate ai fill
    if (node.fills && Array.isArray(node.fills)) {
      console.log('Examining fills for variables:', node.fills);
      console.log('Fill bound variables:', node.boundVariables?.fills);

      for (let i = 0; i < node.fills.length; i++) {
        const fill = node.fills[i];
        console.log(`Examining fill at index ${i}:`, fill);

        if (fill.type === 'SOLID' && node.boundVariables?.fills?.[i]) {
          console.log(`Found bound variable for fill at index ${i}:`, node.boundVariables.fills[i]);
          // Accedo alla proprietà color in modo sicuro
          const fillVariable = node.boundVariables.fills[i];

          // Gestisco sia il caso in cui fillVariable ha una proprietà color, sia il caso in cui è direttamente un VARIABLE_ALIAS
          if (fillVariable && typeof fillVariable === 'object' && fillVariable !== null) {
            // Caso 1: fillVariable ha una proprietà 'color'
            if ('color' in fillVariable) {
              console.log(`Fill variable has color property:`, fillVariable.color);
              const colorVariable = fillVariable.color;
              // Uso un'asserzione di tipo per evitare errori di tipo
              if (colorVariable && typeof colorVariable === 'object' && colorVariable !== null) {
                console.log(`Color variable is an object:`, colorVariable);
                const variableWithId = colorVariable as { id: string };
                if ('id' in variableWithId) {
                  // Converto l'ID in stringa per evitare errori di tipo
                  const variableId = String(variableWithId.id);
                  variableReferences[`fills.${i}.color`] = variableId;
                  hasVariableReferences = true;
                  console.log(`Found variable for fills[${i}].color:`, variableId);

                  // Ottieni informazioni aggiuntive sulla variabile
                  try {
                    const variableObj = await figma.variables.getVariableByIdAsync(variableId);
                    if (variableObj) {
                      console.log(`Variable details for fills[${i}].color:`, {
                        name: variableObj.name,
                        resolvedType: variableObj.resolvedType,
                        valuesByMode: variableObj.valuesByMode,
                      });
                    }
                  } catch (err) {
                    console.error(`Error getting variable details for fills[${i}].color:`, err);
                  }
                }
              }
            }
            // Caso 2: fillVariable è direttamente un VARIABLE_ALIAS
            else if (
              'type' in fillVariable &&
              fillVariable.type === 'VARIABLE_ALIAS' &&
              'id' in fillVariable
            ) {
              console.log(`Fill variable is a VARIABLE_ALIAS with id:`, fillVariable.id);
              const variableId = String(fillVariable.id);
              variableReferences[`fills.${i}`] = variableId;
              hasVariableReferences = true;
              console.log(`Found variable for fills[${i}]:`, variableId);

              // Ottieni informazioni aggiuntive sulla variabile
              try {
                const variableObj = await figma.variables.getVariableByIdAsync(variableId);
                if (variableObj) {
                  console.log(`Variable details for fills[${i}]:`, {
                    name: variableObj.name,
                    resolvedType: variableObj.resolvedType,
                    valuesByMode: variableObj.valuesByMode,
                  });
                }
              } catch (err) {
                console.error(`Error getting variable details for fills[${i}]:`, err);
              }
            }
          }
        }
      }
    }

    // Controllo se ci sono variabili associate agli strokes
    if (node.strokes && Array.isArray(node.strokes)) {
      for (let i = 0; i < node.strokes.length; i++) {
        const stroke = node.strokes[i];
        if (stroke.type === 'SOLID' && node.boundVariables?.strokes?.[i]) {
          // Accedo alla proprietà color in modo sicuro
          const strokeVariable = node.boundVariables.strokes[i];
          if (
            strokeVariable &&
            typeof strokeVariable === 'object' &&
            strokeVariable !== null &&
            'color' in strokeVariable
          ) {
            const colorVariable = strokeVariable.color;
            // Uso un'asserzione di tipo per evitare errori di tipo
            if (colorVariable && typeof colorVariable === 'object' && colorVariable !== null) {
              const variableWithId = colorVariable as { id: string };
              if ('id' in variableWithId) {
                // Converto l'ID in stringa per evitare errori di tipo
                variableReferences[`strokes.${i}.color`] = String(variableWithId.id);
                hasVariableReferences = true;
                console.log(`Found variable for strokes[${i}].color:`, variableWithId.id);
              }
            }
          }
        }
      }
    }

    if (hasStyleReferences) {
      properties.styleReferences = styleReferences;
    }

    // Salvo i riferimenti alle variabili nelle proprietà
    if (hasVariableReferences) {
      properties.variableReferences = variableReferences;
    }

    console.log('Final properties object:', properties);
    return properties;
  }

  async function handleSaveClass(event: { name: string }): Promise<SavedClassResult> {
    try {
      const selectedNode = figma.currentPage.selection[0];
      if (
        !selectedNode ||
        (selectedNode.type !== 'FRAME' &&
          selectedNode.type !== 'COMPONENT' &&
          selectedNode.type !== 'INSTANCE')
      ) {
        throw new Error('No valid node selected. Please select a Frame, Component, or Instance.');
      }

      // Trattiamo il nodo come un FrameNode poiché ComponentNode e InstanceNode ereditano da FrameNode
      const frameProperties = await extractFrameProperties(selectedNode as FrameNode);

      // Aggiungiamo un campo per indicare il tipo di nodo di origine
      const sourceNodeType = selectedNode.type;
      console.log(
        `Extracted properties from ${sourceNodeType}:`,
        JSON.stringify(frameProperties, null, 2),
      );

      // Verifichiamo se ci sono variabili nei fill
      const variableReferences = frameProperties.variableReferences;
      if (variableReferences && Object.keys(variableReferences).length > 0) {
        console.log('Variable references found:', JSON.stringify(variableReferences, null, 2));

        // Verifichiamo se ci sono riferimenti a variabili nei fill
        const fillVariables = Object.keys(variableReferences)
          .filter((key) => key.startsWith('fills.'))
          .map((key) => ({
            key,
            variableId: variableReferences[key],
          }));

        if (fillVariables.length > 0) {
          console.log('Fill variables found:', fillVariables);

          // Per ogni variabile di fill, otteniamo informazioni dettagliate
          for (const { key, variableId } of fillVariables) {
            try {
              const variable = await figma.variables.getVariableByIdAsync(variableId);
              if (variable) {
                console.log(`Variable details for ${key}:`, {
                  id: variable.id,
                  name: variable.name,
                  resolvedType: variable.resolvedType,
                  valuesByMode: variable.valuesByMode,
                });
              } else {
                console.warn(`Variable with ID ${variableId} not found`);
              }
            } catch (err) {
              console.error(`Error getting variable details for ${key}:`, err);
            }
          }
        } else {
          console.log('No fill variables found in the frame');
        }
      } else {
        console.log('No variable references found in the frame');
      }

      // Use node name if the provided name is empty
      const nodeName = selectedNode.name || 'Unnamed';
      const className = event.name.trim() ? event.name.trim() : nodeName;
      console.log('Attempting to save class with name:', className);

      // Check if a class with this name already exists
      const existingClasses = await loadSavedClasses();
      console.log('Existing classes count:', existingClasses.length);

      const existingClass = existingClasses.find(
        (cls) => cls.name.toLowerCase() === className.toLowerCase(),
      );
      if (existingClass) {
        console.log('Found existing class with same name:', existingClass);
        throw new Error('A class with this name already exists (names are case-insensitive)');
      }

      const newClass: SavedClass = {
        ...frameProperties,
        name: className, // Use the determined class name
        createdAt: Date.now(),
        sourceNodeType, // Aggiungiamo il tipo di nodo di origine
      };

      console.log('Saving new class:', JSON.stringify(newClass, null, 2));
      console.log('Variable references in new class:', newClass.variableReferences);

      // Verifica esplicita che variableReferences sia incluso nell'oggetto newClass
      if (newClass.variableReferences) {
        console.log("✅ variableReferences è presente nell'oggetto newClass");
      } else {
        console.warn("⚠️ variableReferences NON è presente nell'oggetto newClass");
      }

      await storageService.addClass(newClass);
      emit('CLASS_SAVED', newClass);
      showNotification('Class saved successfully');
      return { success: true, data: newClass };
    } catch (error) {
      console.error('Error saving class:', error);
      const errorMessage = error instanceof Error ? error.message : 'Failed to save class';
      showNotification(errorMessage, { error: true });
      return { success: false, error: errorMessage };
    }
  }

  async function handleApplyClass(classData: SavedClass, shouldNotify = true) {
    if (!checkSelection()) {
      return false;
    }

    try {
      console.log('Applying class:', JSON.stringify(classData, null, 2));
      console.log('Variable references in class:', classData.variableReferences);
      console.log('Source node type:', classData.sourceNodeType || 'Not specified (legacy class)');

      // Verifica esplicita che variableReferences sia incluso nell'oggetto classData
      if (classData.variableReferences) {
        console.log("✅ variableReferences è presente nell'oggetto classData");
        console.log('Numero di variabili:', Object.keys(classData.variableReferences).length);
      } else {
        console.warn("⚠️ variableReferences NON è presente nell'oggetto classData");

        // Verifica se l'oggetto classData ha altre proprietà attese
        console.log('Proprietà presenti in classData:', Object.keys(classData));
      }

      // Ottieni tutti i nodi selezionati che sono frame, componenti o istanze
      const validNodes = figma.currentPage.selection.filter(
        (node) => node.type === 'FRAME' || node.type === 'COMPONENT' || node.type === 'INSTANCE',
      ) as (FrameNode | ComponentNode | InstanceNode)[];

      if (validNodes.length === 0) {
        throw new Error('No valid nodes selected. Please select a Frame, Component, or Instance.');
      }

      let successCount = 0;

      for (const node of validNodes) {
        console.log(`Setting ${node.type} name to:`, classData.name);
        node.name = classData.name;

        // Apply position properties if present
        if (classData.position) {
          console.log('Applying position properties:', classData.position);

          // Apply rotation
          node.rotation = classData.position.rotation;

          // Apply transform only if explicitly requested (which we're not doing anymore)
          // This code is commentato per riferimento futuro
          /* 
          if (classData.position.relativeTransform) {
            node.relativeTransform = classData.position.relativeTransform as Transform;
          }
          */

          // Apply constraints
          node.constraints = {
            horizontal: classData.position.constraints.horizontal,
            vertical: classData.position.constraints.vertical,
          };

          console.log('Applied position properties:', {
            rotation: node.rotation,
            constraints: node.constraints,
          });
        }

        // Apply aspect ratio settings if present
        if (classData.aspectRatio) {
          console.log('Applying aspect ratio settings:', classData.aspectRatio);
          if (classData.aspectRatio.isLocked) {
            // Utilizziamo il nuovo metodo lockAspectRatio invece di constrainProportions
            try {
              // Definiamo un tipo per accedere ai nuovi metodi di Figma
              type FigmaFrameWithNewAPI = {
                lockAspectRatio?: () => void;
                unlockAspectRatio?: () => void;
                constrainProportions?: boolean;
              };

              // Verifichiamo se il metodo esiste e lo chiamiamo
              const frameAny = node as unknown as FigmaFrameWithNewAPI;

              if (typeof frameAny.lockAspectRatio === 'function') {
                frameAny.lockAspectRatio();
                console.log('Used new lockAspectRatio API');
              } else {
                // Fallback per compatibilità con versioni precedenti di Figma
                frameAny.constrainProportions = true;
                console.log('Used legacy constrainProportions API');
              }
            } catch (error) {
              console.error('Error setting aspect ratio lock:', error);
            }

            // Resize maintaining the aspect ratio
            const currentRatio = node.width / node.height;
            const targetRatio = classData.aspectRatio.value || currentRatio;

            if (currentRatio !== targetRatio) {
              // Adjust dimensions to match the target ratio while keeping the area similar
              const currentArea = node.width * node.height;
              const newWidth = Math.sqrt(currentArea * targetRatio);
              const newHeight = newWidth / targetRatio;
              node.resize(newWidth, newHeight);
            }
          } else {
            // Utilizziamo il nuovo metodo unlockAspectRatio invece di constrainProportions = false
            try {
              // Definiamo un tipo per accedere ai nuovi metodi di Figma
              type FigmaFrameWithNewAPI = {
                lockAspectRatio?: () => void;
                unlockAspectRatio?: () => void;
                constrainProportions?: boolean;
              };

              // Verifichiamo se il metodo esiste e lo chiamiamo
              const frameAny = node as unknown as FigmaFrameWithNewAPI;

              if (typeof frameAny.unlockAspectRatio === 'function') {
                frameAny.unlockAspectRatio();
                console.log('Used new unlockAspectRatio API');
              } else {
                // Fallback per compatibilità con versioni precedenti di Figma
                frameAny.constrainProportions = false;
                console.log('Used legacy constrainProportions API');
              }
            } catch (error) {
              console.error('Error setting aspect ratio unlock:', error);
            }
          }
        }

        // Set layout mode first as it affects how dimensions are applied
        node.layoutMode = classData.layoutMode;
        console.log('Setting layout mode to:', classData.layoutMode);

        // Log delle proprietà del nodo prima di applicare le modifiche
        if (node.parent && node.parent.type === 'FRAME') {
          console.log('Node parent is a frame with layoutMode:', node.parent.layoutMode);
        }

        console.log('Node properties before applying dimensions:', {
          layoutMode: node.layoutMode,
          layoutAlign: node.layoutAlign,
          layoutGrow: node.layoutGrow,
          primaryAxisSizingMode: node.primaryAxisSizingMode,
          counterAxisSizingMode: node.counterAxisSizingMode,
        });

        if (node.layoutMode === 'NONE') {
          // For frames without auto-layout, apply only fixed dimensions
          console.log('Applying fixed dimensions:', {
            width: classData.width,
            height: classData.height,
          });
          node.resize(classData.width, classData.height);
        } else {
          // For auto-layout frames, apply all dimension properties
          node.resize(classData.width, classData.height);

          if (classData.minWidth !== null && classData.minWidth !== undefined) {
            node.minWidth = classData.minWidth;
          }
          if (classData.maxWidth !== null && classData.maxWidth !== undefined) {
            node.maxWidth = classData.maxWidth;
          }
          if (classData.minHeight !== null && classData.minHeight !== undefined) {
            node.minHeight = classData.minHeight;
          }
          if (classData.maxHeight !== null && classData.maxHeight !== undefined) {
            node.maxHeight = classData.maxHeight;
          }

          console.log('Applied auto-layout dimensions:', {
            width: classData.width,
            height: classData.height,
            minWidth: node.minWidth,
            maxWidth: node.maxWidth,
            minHeight: node.minHeight,
            maxHeight: node.maxHeight,
          });

          // Apply layout properties if present
          if (classData.layoutProperties) {
            node.primaryAxisSizingMode = classData.layoutProperties.primaryAxisSizingMode;
            node.counterAxisSizingMode = classData.layoutProperties.counterAxisSizingMode;
            node.primaryAxisAlignItems = classData.layoutProperties.primaryAxisAlignItems;
            node.counterAxisAlignItems = classData.layoutProperties.counterAxisAlignItems;
            node.layoutWrap = classData.layoutProperties.layoutWrap;

            // Applica layoutAlign (importante per il comportamento "fill" nell'asse contro-primario)
            if (classData.layoutProperties.layoutAlign) {
              console.log('Applying layoutAlign:', classData.layoutProperties.layoutAlign);
              node.layoutAlign = classData.layoutProperties.layoutAlign;
            }

            // Applica layoutGrow (importante per il comportamento "fill" nell'asse primario)
            if (typeof classData.layoutProperties.layoutGrow === 'number') {
              console.log('Applying layoutGrow:', classData.layoutProperties.layoutGrow);
              node.layoutGrow = classData.layoutProperties.layoutGrow;
            }

            // Apply spacing only if values are not null and non ci sono variabili
            if (classData.layoutProperties.itemSpacing !== null) {
              // Verifichiamo se c'è una variabile per itemSpacing
              if (
                !classData.variableReferences ||
                !Object.keys(classData.variableReferences).some((key) => key === 'itemSpacing')
              ) {
                node.itemSpacing = classData.layoutProperties.itemSpacing;
              }
            }
            if (classData.layoutProperties.counterAxisSpacing !== null) {
              // Verifichiamo se c'è una variabile per counterAxisSpacing
              if (
                !classData.variableReferences ||
                !Object.keys(classData.variableReferences).some(
                  (key) => key === 'counterAxisSpacing',
                )
              ) {
                node.counterAxisSpacing = classData.layoutProperties.counterAxisSpacing;
              }
            }

            // Apply individual padding values
            // Verifichiamo se ci sono variabili per le proprietà di padding
            if (
              !classData.variableReferences ||
              !Object.keys(classData.variableReferences).some((key) => key.includes('paddingTop'))
            ) {
              node.paddingTop = classData.layoutProperties.padding.top;
            }

            if (
              !classData.variableReferences ||
              !Object.keys(classData.variableReferences).some((key) => key.includes('paddingRight'))
            ) {
              node.paddingRight = classData.layoutProperties.padding.right;
            }

            if (
              !classData.variableReferences ||
              !Object.keys(classData.variableReferences).some((key) =>
                key.includes('paddingBottom'),
              )
            ) {
              node.paddingBottom = classData.layoutProperties.padding.bottom;
            }

            if (
              !classData.variableReferences ||
              !Object.keys(classData.variableReferences).some((key) => key.includes('paddingLeft'))
            ) {
              node.paddingLeft = classData.layoutProperties.padding.left;
            }

            console.log('Applied auto-layout properties:', {
              layoutWrap: node.layoutWrap,
              itemSpacing: node.itemSpacing,
              counterAxisSpacing: node.counterAxisSpacing,
              layoutAlign: node.layoutAlign,
              layoutGrow: node.layoutGrow,
              padding: {
                top: node.paddingTop,
                right: node.paddingRight,
                bottom: node.paddingBottom,
                left: node.paddingLeft,
              },
            });

            node.layoutPositioning = classData.layoutProperties.layoutPositioning;
          }
        }

        // Apply appearance properties
        if (classData.appearance) {
          node.opacity = classData.appearance.opacity;
          node.blendMode = classData.appearance.blendMode;
          node.cornerRadius = classData.appearance.cornerRadius;
          node.topLeftRadius = classData.appearance.topLeftRadius;
          node.topRightRadius = classData.appearance.topRightRadius;
          node.bottomLeftRadius = classData.appearance.bottomLeftRadius;
          node.bottomRightRadius = classData.appearance.bottomRightRadius;
          if (classData.appearance.strokeWeight !== figma.mixed) {
            node.strokeWeight = classData.appearance.strokeWeight;
          }
          node.strokeAlign = classData.appearance.strokeAlign;
          node.dashPattern = [...classData.appearance.dashPattern];
        }

        // Apply style references first
        if (classData.styleReferences) {
          const { fillStyleId, strokeStyleId, effectStyleId, gridStyleId } =
            classData.styleReferences;

          try {
            if (fillStyleId && typeof fillStyleId === 'string') {
              await node.setFillStyleIdAsync(fillStyleId);
              console.log('Applied fill style ID:', fillStyleId);
            }
            if (strokeStyleId && typeof strokeStyleId === 'string') {
              await node.setStrokeStyleIdAsync(strokeStyleId);
              console.log('Applied stroke style ID:', strokeStyleId);
            }
            if (effectStyleId && typeof effectStyleId === 'string') {
              await node.setEffectStyleIdAsync(effectStyleId);
              console.log('Applied effect style ID:', effectStyleId);
            }
            if (gridStyleId && typeof gridStyleId === 'string') {
              await node.setGridStyleIdAsync(gridStyleId);
              console.log('Applied grid style ID:', gridStyleId);
            }
          } catch (error) {
            console.error('Error applying style references:', error);
            // Continue with direct styles if style references fail
          }
        }

        // Applico le variabili se presenti
        if (classData.variableReferences) {
          console.log(
            'Applying variable references:',
            JSON.stringify(classData.variableReferences, null, 2),
          );
          console.log('Current frame fills:', node.fills);
          console.log('Current frame strokes:', node.strokes);

          try {
            for (const [property, variableId] of Object.entries(classData.variableReferences)) {
              console.log(`Attempting to apply variable ${variableId} to property ${property}`);
              try {
                // Carico la variabile dal suo ID
                let variable = await figma.variables.getVariableByIdAsync(variableId);

                if (variable) {
                  console.log(`Found variable for ${property}:`, {
                    id: variable.id,
                    name: variable.name,
                    resolvedType: variable.resolvedType,
                  });
                }

                if (!variable) {
                  console.warn(`Variable with ID ${variableId} not found`);

                  // Tentiamo di trovare una variabile con lo stesso nome
                  try {
                    // Otteniamo tutte le collezioni di variabili
                    const collections = await figma.variables.getLocalVariableCollectionsAsync();
                    console.log(
                      `Searching for alternative variable in ${collections.length} collections`,
                    );
                    let foundVariable = null;

                    // Cerchiamo in tutte le collezioni
                    for (const collection of collections) {
                      console.log(`Searching in collection: ${collection.name}`);
                      const variables = await figma.variables.getLocalVariablesAsync();
                      // Filtriamo le variabili per collezione
                      const collectionVariables = variables.filter(
                        (v) => v.variableCollectionId === collection.id,
                      );
                      console.log(
                        `Found ${collectionVariables.length} variables in collection ${collection.name}`,
                      );

                      // Cerchiamo una variabile che potrebbe corrispondere
                      for (const v of collectionVariables) {
                        console.log(`Checking variable: ${v.name} (${v.id})`);
                        // Se troviamo una variabile con lo stesso nome o che contiene l'ID nel nome
                        if (v.name.includes(variableId.substring(0, 8))) {
                          foundVariable = v;
                          console.log(`Found alternative variable: ${v.name} with ID: ${v.id}`);
                          break;
                        }
                      }
                      if (foundVariable) break;
                    }

                    if (foundVariable) {
                      console.log(
                        `Using alternative variable: ${foundVariable.name} instead of missing variable: ${variableId}`,
                      );
                      // Usiamo la variabile alternativa trovata
                      variable = foundVariable;
                    } else {
                      console.log(`No alternative variable found for ${variableId}, skipping`);
                      continue; // Se non troviamo alternative, passiamo alla prossima variabile
                    }
                  } catch (err) {
                    console.error('Error while trying to find alternative variable:', err);
                    continue;
                  }
                }

                // Gestisco le proprietà di fill e stroke
                if (property.startsWith('fills.')) {
                  console.log(`Processing fill property: ${property}`);
                  const parts = property.split('.');
                  const index = parseInt(parts[1]);
                  const subProperty = parts.length > 2 ? parts[2] : null;

                  // Assicuriamoci che il frame abbia almeno un fill
                  if (!node.fills || !Array.isArray(node.fills) || node.fills.length === 0) {
                    console.log('Frame has no fills, creating default fill');
                    // Se non ci sono fills, creiamo un fill solido di default
                    node.fills = [{ type: 'SOLID', color: { r: 1, g: 1, b: 1 }, opacity: 1 }];
                  }

                  // Usiamo l'indice 0 se l'indice originale è fuori range
                  const targetIndex = node.fills.length > index ? index : 0;
                  console.log(
                    `Using target index ${targetIndex} for fill (original index: ${index})`,
                  );

                  // Caso 1: Variabile per l'intero fill (senza subProperty)
                  if (!subProperty) {
                    console.log(`Applying variable to entire fill at index ${targetIndex}`);
                    try {
                      // Creo una copia dell'array fills per poterlo modificare
                      const fillsCopy = JSON.parse(JSON.stringify(node.fills));

                      // Imposto la variabile direttamente sul fill
                      try {
                        // Uso il metodo setBoundVariableForPaint per impostare la variabile sul fill
                        fillsCopy[targetIndex] = figma.variables.setBoundVariableForPaint(
                          fillsCopy[targetIndex],
                          'color', // Usiamo 'color' come chiave per impostare la variabile sul fill
                          variable,
                        );
                        console.log('Modified fill with variable:', fillsCopy[targetIndex]);

                        // Assegno l'array modificato al frame
                        node.fills = fillsCopy;
                        console.log(`Applied variable to fills[${targetIndex}]:`, variableId);
                      } catch (err: unknown) {
                        const errorMessage = err instanceof Error ? err.message : String(err);
                        console.error(`Error applying variable to fill: ${errorMessage}`);
                      }
                    } catch (err: unknown) {
                      const errorMessage = err instanceof Error ? err.message : String(err);
                      console.error(`Error applying variable to fill: ${errorMessage}`);
                    }
                  }
                  // Caso 2: Variabile per una proprietà specifica del fill (come color)
                  else if (subProperty === 'color') {
                    console.log(`Processing fill color at index ${index}`);

                    // Verifichiamo che il fill sia di tipo SOLID
                    if (node.fills[targetIndex].type === 'SOLID') {
                      console.log(`Fill at index ${targetIndex} is SOLID, applying variable`);
                      // Creo una copia dell'array fills per poterlo modificare
                      const fillsCopy = JSON.parse(JSON.stringify(node.fills));
                      console.log('Original fill:', fillsCopy[targetIndex]);

                      // Uso il metodo helper per impostare la variabile sul fill
                      try {
                        fillsCopy[targetIndex] = figma.variables.setBoundVariableForPaint(
                          fillsCopy[targetIndex],
                          'color',
                          variable,
                        );
                        console.log('Modified fill with variable:', fillsCopy[targetIndex]);

                        // Assegno l'array modificato al frame
                        node.fills = fillsCopy;
                        console.log(`Applied variable to fills[${targetIndex}].color:`, variableId);
                      } catch (err: unknown) {
                        const errorMessage = err instanceof Error ? err.message : String(err);
                        console.error(`Error applying variable to fill color: ${errorMessage}`);
                      }
                    } else {
                      console.warn(
                        `Fill at index ${targetIndex} is not SOLID, cannot apply color variable`,
                      );
                    }
                  }
                }
                // Gestisco le proprietà di padding e altre proprietà numeriche
                else if (
                  // Proprietà di auto-layout
                  property === 'paddingTop' ||
                  property === 'paddingRight' ||
                  property === 'paddingBottom' ||
                  property === 'paddingLeft' ||
                  property === 'itemSpacing' ||
                  property === 'counterAxisSpacing' ||
                  // Proprietà di dimensione
                  property === 'width' ||
                  property === 'height' ||
                  property === 'minWidth' ||
                  property === 'maxWidth' ||
                  property === 'minHeight' ||
                  property === 'maxHeight' ||
                  // Proprietà di bordo
                  property === 'strokeWeight' ||
                  property === 'cornerRadius' ||
                  property === 'topLeftRadius' ||
                  property === 'topRightRadius' ||
                  property === 'bottomLeftRadius' ||
                  property === 'bottomRightRadius' ||
                  // Proprietà di opacità
                  property === 'opacity'
                ) {
                  console.log(`Applying variable to ${property}`);
                  try {
                    // Utilizzo setBoundVariable per impostare la variabile sulla proprietà
                    // Cast esplicito a VariableBindableNodeField per evitare errori di tipo
                    node.setBoundVariable(property as VariableBindableNodeField, variable);
                    console.log(`Applied variable to ${property} successfully`);
                  } catch (err) {
                    console.error(`Error applying variable to ${property}:`, err);
                  }
                }
                // Gestisco altre proprietà direttamente sul nodo
                else {
                  console.log(`Setting bound variable for property ${property}`);
                  // Imposto la variabile sulla proprietà del nodo
                  try {
                    node.setBoundVariable(property as VariableBindableNodeField, variable);
                    console.log(`Applied variable to ${property}:`, variableId);
                  } catch (err: unknown) {
                    const errorMessage = err instanceof Error ? err.message : String(err);
                    console.error(`Error setting bound variable for ${property}: ${errorMessage}`);
                  }
                }
              } catch (err: unknown) {
                const errorMessage = err instanceof Error ? err.message : String(err);
                console.error(`Error processing variable ${variableId}: ${errorMessage}`);
              }
            }
          } catch (err: unknown) {
            const errorMessage = err instanceof Error ? err.message : String(err);
            console.error(`Error applying variables: ${errorMessage}`);
          }
        }

        // Applico i fill e gli stroke diretti se presenti e se non sono stati applicati stili o variabili
        if (
          classData.fills &&
          (!classData.styleReferences?.fillStyleId || classData.styleReferences.fillStyleId === '')
        ) {
          console.log('Applying direct fills:', classData.fills);
          try {
            // Verifichiamo se ci sono variabili nei fill
            const hasVariablesInFills =
              classData.variableReferences &&
              Object.keys(classData.variableReferences).some((key) => key.startsWith('fills.'));

            // Applichiamo i fill diretti solo se non ci sono variabili
            if (!hasVariablesInFills) {
              // Utilizziamo un cast esplicito per evitare errori di tipo
              node.fills = JSON.parse(JSON.stringify(classData.fills)) as Paint[];
              console.log('Applied direct fills successfully');
            } else {
              console.log('Skipping direct fills application because variables are present');
            }
          } catch (err: unknown) {
            const errorMessage = err instanceof Error ? err.message : String(err);
            console.error(`Error applying direct fills: ${errorMessage}`);
          }
        }

        if (
          classData.strokes &&
          (!classData.styleReferences?.strokeStyleId ||
            classData.styleReferences.strokeStyleId === '')
        ) {
          console.log('Applying direct strokes:', classData.strokes);
          try {
            // Verifichiamo se ci sono variabili negli stroke
            const hasVariablesInStrokes =
              classData.variableReferences &&
              Object.keys(classData.variableReferences).some((key) => key.startsWith('strokes.'));

            // Applichiamo gli stroke diretti solo se non ci sono variabili
            if (!hasVariablesInStrokes) {
              // Utilizziamo un cast esplicito per evitare errori di tipo
              node.strokes = JSON.parse(JSON.stringify(classData.strokes)) as Paint[];
              console.log('Applied direct strokes successfully');
            } else {
              console.log('Skipping direct strokes application because variables are present');
            }
          } catch (err: unknown) {
            const errorMessage = err instanceof Error ? err.message : String(err);
            console.error(`Error applying direct strokes: ${errorMessage}`);
          }
        }

        // Applica gli effetti diretti se presenti e se non c'è un effectStyleId
        if (
          classData.effects &&
          (!classData.styleReferences?.effectStyleId ||
            classData.styleReferences.effectStyleId === '')
        ) {
          console.log('Applying direct effects:', JSON.stringify(classData.effects, null, 2));
          console.log(
            'Current node effects before applying:',
            JSON.stringify(node.effects, null, 2),
          );
          try {
            // Verifichiamo se ci sono variabili negli effetti
            const hasVariablesInEffects =
              classData.variableReferences &&
              Object.keys(classData.variableReferences).some((key) => key.startsWith('effects.'));

            console.log('Has variables in effects:', hasVariablesInEffects);
            if (hasVariablesInEffects && classData.variableReferences) {
              console.log(
                'Variables in effects:',
                Object.keys(classData.variableReferences).filter((key) =>
                  key.startsWith('effects.'),
                ),
              );
            }

            // Applichiamo gli effetti diretti solo se non ci sono variabili
            if (!hasVariablesInEffects) {
              try {
                // Verifichiamo che gli effetti siano un array valido
                if (Array.isArray(classData.effects)) {
                  // Cloniamo profondamente gli effetti per evitare problemi di riferimento
                  const effectsClone = JSON.parse(JSON.stringify(classData.effects)) as Effect[];

                  // Verifichiamo che ogni effetto abbia le proprietà necessarie
                  const validEffects = effectsClone.every(
                    (effect) => effect && typeof effect === 'object' && 'type' in effect,
                  );

                  if (validEffects) {
                    // Applichiamo gli effetti
                    node.effects = effectsClone;
                    console.log('Applied direct effects successfully');
                    console.log(
                      'Node effects after applying:',
                      JSON.stringify(node.effects, null, 2),
                    );
                  } else {
                    console.error('Invalid effects structure:', effectsClone);
                  }
                } else {
                  console.error('Effects is not an array:', classData.effects);
                }
              } catch (innerErr) {
                console.error('Error during effects application:', innerErr);
              }
            } else {
              console.log('Skipping direct effects application because variables are present');
            }
          } catch (err: unknown) {
            const errorMessage = err instanceof Error ? err.message : String(err);
            console.error(`Error applying direct effects: ${errorMessage}`);
          }
        }

        // Applica i Variable Modes se presenti
        if (classData.variableModes && Object.keys(classData.variableModes).length > 0) {
          console.log('Applying variable modes:', classData.variableModes);
          try {
            // Per ogni collection ID e mode ID
            for (const [collectionId, modeId] of Object.entries(classData.variableModes)) {
              try {
                // Ottieni la collection dal suo ID
                const collection =
                  await figma.variables.getVariableCollectionByIdAsync(collectionId);
                if (collection) {
                  // Imposta il mode esplicito per questa collection
                  node.setExplicitVariableModeForCollection(collection, modeId);
                  console.log(`Applied variable mode ${modeId} for collection ${collectionId}`);
                } else {
                  console.warn(`Collection with ID ${collectionId} not found`);
                }
              } catch (modeErr: unknown) {
                const modeErrorMessage =
                  modeErr instanceof Error ? modeErr.message : String(modeErr);
                console.error(
                  `Error applying variable mode for collection ${collectionId}: ${modeErrorMessage}`,
                );
              }
            }
            console.log('Applied variable modes successfully');
          } catch (err: unknown) {
            const errorMessage = err instanceof Error ? err.message : String(err);
            console.error(`Error applying variable modes: ${errorMessage}`);
          }
        }

        successCount++;
      }

      if (shouldNotify) {
        const message =
          validNodes.length === 1
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
      const selectedNode = figma.currentPage.selection[0];
      if (
        !selectedNode ||
        (selectedNode.type !== 'FRAME' &&
          selectedNode.type !== 'COMPONENT' &&
          selectedNode.type !== 'INSTANCE')
      ) {
        throw new Error('No valid node selected. Please select a Frame, Component, or Instance.');
      }

      // Cast del nodo selezionato al tipo corretto
      const node = selectedNode as FrameNode | ComponentNode | InstanceNode;

      // Estrai le proprietà dal nodo selezionato
      const frameProperties = await extractFrameProperties(node);
      const updatedClass: SavedClass = {
        ...frameProperties,
        name: classToUpdate.name,
        createdAt: classToUpdate.createdAt,
        // Preserviamo il sourceNodeType originale se presente, altrimenti usiamo il tipo corrente
        sourceNodeType:
          classToUpdate.sourceNodeType || (node.type as 'FRAME' | 'COMPONENT' | 'INSTANCE'),
      };

      // Verifica che width e height siano definiti
      if (typeof updatedClass.width !== 'number' || typeof updatedClass.height !== 'number') {
        console.error('Missing required dimensions:', {
          width: updatedClass.width,
          height: updatedClass.height,
        });
        throw new Error('Failed to extract frame dimensions');
      }

      console.log('Updated class before saving:', updatedClass);
      await storageService.updateClass(updatedClass);

      // Emetto l'evento CLASS_UPDATED con l'intera classe aggiornata
      emit('CLASS_UPDATED', updatedClass);

      showNotification('Class updated successfully');
      return { success: true, data: updatedClass };
    } catch (error) {
      console.error('Error updating class:', error);
      const errorMessage = error instanceof Error ? error.message : 'Failed to update class';
      showNotification(errorMessage, { error: true });
      return { success: false, error: errorMessage };
    }
  }

  async function handleDeleteClass(classData: SavedClass) {
    try {
      await storageService.deleteClass(classData.name);
      emit('CLASS_DELETED', classData);
      showNotification('Class deleted successfully');
      return true;
    } catch (error) {
      console.error('Error deleting class:', error);
      showNotification('Failed to delete class', { error: true });
      return false;
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
        version: '1.2.0', // Aggiornato da 1.1.0 a 1.2.0 per riflettere le modifiche a effetti e autolayout
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

      // Gestione della compatibilità con versioni precedenti
      if (importData.version === '1.0.0' || importData.version === '1.1.0') {
        console.log(`Importing from version ${importData.version} - ensuring compatibility`);

        for (const cls of importData.classes) {
          // Nelle versioni precedenti alla 1.1.0, gli effetti potrebbero non essere presenti
          if (!cls.effects) {
            console.log('Adding empty effects array for compatibility');
            cls.effects = [];
          }

          // Nelle versioni precedenti alla 1.2.0, le proprietà layoutAlign e layoutGrow potrebbero non essere correttamente inizializzate
          if (cls.layoutMode !== 'NONE' && cls.layoutProperties) {
            // Assicuriamoci che layoutAlign sia definito
            if (!cls.layoutProperties.layoutAlign) {
              console.log('Setting default layoutAlign to INHERIT');
              cls.layoutProperties.layoutAlign = 'INHERIT';
            }

            // Assicuriamoci che layoutGrow sia definito
            if (typeof cls.layoutProperties.layoutGrow !== 'number') {
              console.log('Setting default layoutGrow to 0');
              cls.layoutProperties.layoutGrow = 0;
            }
          }

          // Nelle versioni precedenti alla 1.2.0, variableModes potrebbe non essere presente
          if (!cls.variableModes) {
            cls.variableModes = {};
          }
        }
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
          `Apply Global: ${appliedCount} classes applied to frames with matching names${errorCount > 0 ? ` (${errorCount} errors)` : ''}`,
        );
        emit('CLASSES_APPLIED_ALL', { success: true, appliedCount, errorCount });
        return true;
      } else {
        showNotification('No frames with names matching your saved classes were found');
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

  async function handleAnalyzeApplyClassToAll(className: string) {
    try {
      // Trova tutti i frame nella pagina corrente con il nome corrispondente
      const frames = figma.currentPage.findAll(
        (node) => node.type === 'FRAME' && node.name === className,
      ) as FrameNode[];

      // Emetti il risultato dell'analisi
      const result = { className, matchingFrames: frames.length };
      emit('APPLY_CLASS_TO_ALL_ANALYSIS_RESULT', result);

      return result;
    } catch (error) {
      console.error('Error analyzing frames for class application:', error);
      showNotification('Failed to analyze frames', { error: true });
      return { className, matchingFrames: 0 };
    }
  }

  async function handleApplyClassToAll(classData: SavedClass) {
    try {
      // Trova tutti i frame nella pagina corrente con il nome corrispondente
      const frames = figma.currentPage.findAll(
        (node) => node.type === 'FRAME' && node.name === classData.name,
      ) as FrameNode[];

      if (frames.length === 0) {
        showNotification(`No frames found with name "${classData.name}"`);
        return false;
      }

      let appliedCount = 0;
      let errorCount = 0;

      // Applica la classe a ciascun frame
      for (const frame of frames) {
        try {
          // Seleziona temporaneamente il frame per usare handleApplyClass
          figma.currentPage.selection = [frame];
          await handleApplyClass(classData, false);
          appliedCount++;
        } catch (error) {
          console.error(`Error applying class to frame ${frame.name}:`, error);
          errorCount++;
        }
      }

      // Mostra i risultati
      showNotification(
        `Applied "${classData.name}" to ${appliedCount} frames${
          errorCount > 0 ? ` (${errorCount} errors)` : ''
        }`,
      );

      emit('CLASS_APPLIED_TO_ALL', {
        success: true,
        className: classData.name,
        appliedCount,
        errorCount,
      });

      return true;
    } catch (error) {
      console.error('Error applying class to all matching frames:', error);
      showNotification('Failed to apply class to frames', { error: true });
      emit('CLASS_APPLIED_TO_ALL', {
        success: false,
        className: classData.name,
        error: String(error),
      });

      return false;
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
      const status = await licenseService.handleValidate(licenseKey);
      emit('LICENSE_STATUS_CHANGED', status);
    } catch (error) {
      console.error('Error validating license:', error);
      emit('LICENSE_ERROR', error);
    }
  });

  // Aggiungo il gestore per l'evento RESOLVE_STYLE_COLORS
  on('RESOLVE_STYLE_COLORS', async (data: { styleIds: Record<string, string> }) => {
    try {
      console.log('Resolving style colors:', data.styleIds);
      const resolvedColors: Record<string, string> = {};

      // Elabora ogni style ID
      for (const [key, styleId] of Object.entries(data.styleIds)) {
        try {
          // Ottieni lo stile da Figma
          const style = figma.getStyleById(styleId);
          if (style && style.type === 'PAINT') {
            // Estrai il colore dallo stile
            const paint = style.paints[0] as SolidPaint;
            if (paint && paint.type === 'SOLID') {
              const { r, g, b } = paint.color;
              const opacity = paint.opacity ?? 1;
              resolvedColors[key] =
                `rgba(${Math.round(r * 255)}, ${Math.round(g * 255)}, ${Math.round(b * 255)}, ${opacity})`;
            }
          }
        } catch (styleError) {
          console.error(`Error resolving style ${styleId}:`, styleError);
        }
      }

      // Invia i colori risolti all'UI
      console.log('Resolved colors:', resolvedColors);
      emit('RESOLVED_STYLE_COLORS', { resolvedColors });
    } catch (error) {
      console.error('Error resolving style colors:', error);
    }
  });

  // Handler for opening external URLs
  on('OPEN_EXTERNAL_URL', async function (url: string) {
    console.log('Opening external URL:', url);

    try {
      // Verifica che l'URL sia valido
      if (typeof url === 'string' && url.startsWith('https://')) {
        await figma.openExternal(url);
        console.log('External URL opened successfully');
      } else {
        // Se l'URL non è valido, utilizziamo un URL di fallback
        console.error('Invalid URL provided:', url);
        const fallbackUrl = 'https://mastro.lemonsqueezy.com';
        console.log('Attempting to open fallback URL:', fallbackUrl);
        await figma.openExternal(fallbackUrl);
      }
    } catch (error) {
      console.error('Error opening external URL:', error);
      // Notifica l'utente dell'errore
      showNotification('Failed to open external URL. Please try again.', { error: true });
    }
  });
}
