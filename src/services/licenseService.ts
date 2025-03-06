import { emit, on } from '@create-figma-plugin/utilities';

import { LEMONSQUEEZY_CONFIG, ENV_CONFIG } from '../config/lemonSqueezy';
import { getEndpoint, getHeaders } from '../config/lemonSqueezyEndpoints';
import { DeviceInfo } from '../utils/licenseRequestUtils';
import { STORAGE_KEYS } from '../config/storage';
import {
  LemonSqueezyActivationResponse,
  LemonSqueezyDeactivationResponse,
  LemonSqueezyError,
  LemonSqueezyResponse,
  LemonSqueezyValidationResponse,
  LicenseStatus,
  LicenseStatusType,
  StoredLicenseData,
} from '../types/license';

export class LicenseService {
  private static instance: LicenseService;
  private readonly MAX_ATTEMPTS = 5;
  private readonly ATTEMPT_WINDOW = 3600000; // 1 ora
  private activationAttempts = new Map<string, number>();
  private validationInProgress = false;
  private activationInProgress = false;
  private connectionTestCache: { timestamp: number; result: boolean } | null = null;
  private licenseKey: string | null = null;
  private instanceId: string | null = null;
  private licenseStatusType: LicenseStatusType = 'inactive';
  private licenseFeatures: string[] = [];
  private storageKey = 'license_data';
  private activationDate: string | null = null;

  constructor() {
    try {
      // Only check API key if we're not in development mode or if it's explicitly required
      if (!ENV_CONFIG.isDevelopment && !LEMONSQUEEZY_CONFIG.API_KEY) {
        console.warn('[LICENSE] ⚠️ LemonSqueezy API key is not configured');
      }
    } catch (error) {
      // Prevent constructor errors from breaking the plugin
      console.error('[LICENSE] ❌ Error during LicenseService initialization:', error);
    }
    // Carica i dati della licenza dallo storage all'inizializzazione
    this.loadLicenseData();
  }

  public static getInstance(): LicenseService {
    if (!LicenseService.instance) {
      LicenseService.instance = new LicenseService();
    }
    return LicenseService.instance;
  }

  public initializeState(): void {
    try {
      const freemiumStatus: LicenseStatus = {
        tier: 'free',
        isValid: false,
        features: [],
        status: 'idle',
      };

      console.log('[LICENSE] 🔄 Initializing in freemium state:', {
        tier: freemiumStatus.tier,
        features: freemiumStatus.features,
        status: freemiumStatus.status,
      });

      emit('LICENSE_STATUS_CHANGED', freemiumStatus);

      // Registra il listener per gli eventi di validazione della licenza
      on('CHECK_LICENSE_STATUS', async () => {
        try {
          console.log('[LICENSE] 🔄 Checking license status...');
          // Implementa la logica per verificare lo stato della licenza
        } catch (error) {
          console.error('[LICENSE] ❌ Error checking license status:', error);
        }
      });
    } catch (error) {
      console.error('[LICENSE] ❌ Error initializing license state:', error);
    }
  }

  private async getDeviceInfo(): Promise<DeviceInfo> {
    const identifier = await this.generateDeviceIdentifier();
    return {
      deviceId: identifier,
      deviceName: `Figma Plugin - ${Date.now()}`,
    };
  }

  private async generateDeviceIdentifier(): Promise<string> {
    try {
      // Implementazione semplificata per generare un identificatore del dispositivo
      // In un ambiente reale, dovresti utilizzare una combinazione di informazioni sul dispositivo
      return `figma-plugin-${Date.now()}-${Math.random().toString(36).substring(2, 15)}`;
    } catch (error) {
      console.error('[LICENSE] ❌ Error generating device identifier:', error);
      return `figma-plugin-${Date.now()}`;
    }
  }

  private async ensureValidConnection(): Promise<void> {
    try {
      const now = Date.now();
      const cacheTime = 300000; // 5 minuti

      // Se abbiamo un risultato in cache valido, lo utilizziamo
      if (
        this.connectionTestCache &&
        now - this.connectionTestCache.timestamp < cacheTime &&
        this.connectionTestCache.result
      ) {
        console.log('[LICENSE] ✅ Using cached connection test result');
        return;
      }

      // Altrimenti, testiamo la connessione
      const isConnected = await this.testApiConnection();
      this.connectionTestCache = {
        timestamp: now,
        result: isConnected,
      };

      if (!isConnected) {
        throw new Error('No valid connection to LemonSqueezy API');
      }
    } catch (error) {
      console.error('[LICENSE] ❌ Error ensuring valid connection:', error);
      throw {
        code: 'CONNECTION_ERROR',
        message: 'Failed to connect to LemonSqueezy API',
        actions: ['Check your internet connection', 'Try again later'],
      } as LemonSqueezyError;
    }
  }

  private async testApiConnection(): Promise<boolean> {
    try {
      // Implementazione semplificata per testare la connessione all'API
      // In un ambiente reale, dovresti effettuare una richiesta di test all'API
      return true;
    } catch (error) {
      console.error('[LICENSE] ❌ Error testing API connection:', error);
      return false;
    }
  }

  private async makeRequest<T extends LemonSqueezyResponse>(
    endpoint: string,
    requestData: Record<string, string>,
    uiReady: boolean = false,
  ): Promise<T> {
    try {
      // Verifica se l'UI è pronta
      if (!uiReady) {
        throw new Error('UI is not ready to handle API requests');
      }

      // Se l'endpoint è già un URL completo, lo utilizziamo direttamente
      let url = endpoint;

      // Se l'endpoint non è un URL completo, lo costruiamo in base al tipo di richiesta
      if (!endpoint.startsWith('http')) {
        // Determine if this is a license API request and which type
        const isActivate = endpoint.includes('/activate') || endpoint === 'activate';
        const isValidate = endpoint.includes('/validate') || endpoint === 'validate';
        const isDeactivate = endpoint.includes('/deactivate') || endpoint === 'deactivate';

        if (isActivate) {
          url = getEndpoint('ACTIVATE'); // Utilizziamo l'endpoint diretto
          console.log('[LICENSE] 🔧 Using activation endpoint:', url);
        } else if (isDeactivate) {
          url = getEndpoint('DEACTIVATE'); // Utilizziamo l'endpoint diretto
          console.log('[LICENSE] 🔧 Using deactivation endpoint:', url);
        } else if (isValidate) {
          url = getEndpoint('VALIDATE'); // Utilizziamo l'endpoint diretto
          console.log('[LICENSE] 🔧 Using validation endpoint:', url);
        } else {
          // For other endpoints, use the standard format
          const formattedEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
          url = `${LEMONSQUEEZY_CONFIG.API_ENDPOINT}${formattedEndpoint}`;
        }
      }

      // Get appropriate headers based on request type
      const contentType =
        endpoint.includes('/activate') ||
        endpoint.includes('/validate') ||
        endpoint.includes('/deactivate') ||
        endpoint === 'activate' ||
        endpoint === 'validate' ||
        endpoint === 'deactivate'
          ? 'POST'
          : 'JSON';

      const headers = getHeaders(contentType, LEMONSQUEEZY_CONFIG.API_KEY);

      // Prepara i dati della richiesta
      const requestBody = Object.entries(requestData)
        .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
        .join('&');

      // Opzioni della richiesta
      const options: RequestInit = {
        method: 'POST',
        headers,
        body: requestBody,
      };

      // Effettua la richiesta
      const response = await fetch(url, options);

      // Verifica se la risposta è valida
      if (!response.ok) {
        // Per gli errori 400 Bad Request, proviamo a ottenere maggiori dettagli
        if (response.status === 400) {
          try {
            // Tentiamo di leggere il corpo della risposta per ottenere dettagli sull'errore
            const errorData = await response.json();

            // Log per debug
            console.log('[LICENSE] 🔍 Error response data:', JSON.stringify(errorData, null, 2));

            // Verifichiamo se è un errore di licenza già attivata
            if (errorData && errorData.error) {
              const errorMessage = errorData.error.toLowerCase();

              if (
                errorMessage.includes('already activated') ||
                errorMessage.includes('activation limit') ||
                errorMessage.includes('license has been activated')
              ) {
                throw {
                  code: 'ACTIVATION_LIMIT_REACHED',
                  message: 'This license key has already been activated on another device.',
                  actions: [
                    'Use a different license key',
                    'Deactivate the license on another device',
                    'Contact support for assistance',
                  ],
                };
              }

              // Altri errori specifici possono essere gestiti qui
              if (errorMessage.includes('invalid') || errorMessage.includes('not found')) {
                throw {
                  code: 'INVALID_LICENSE',
                  message: 'The license key you entered is invalid or does not exist.',
                  actions: [
                    'Check the license key and try again',
                    'Contact support if you believe this is an error',
                  ],
                };
              }

              // Se abbiamo un messaggio di errore ma non è uno dei casi specifici
              throw {
                code: 'API_ERROR',
                message: errorData.error || `Error from LemonSqueezy: ${response.status}`,
                actions: ['Try again later', 'Contact support'],
              };
            }
          } catch (parseError: unknown) {
            // Se l'errore non è un JSON valido o non ha la struttura prevista,
            // continuiamo con l'errore generico
            if (parseError && typeof parseError === 'object' && 'code' in parseError) {
              throw parseError; // Rilanciamo l'errore specifico che abbiamo creato
            }
          }
        }

        // Gestione specifica per errore 404 (Not Found)
        if (response.status === 404) {
          console.log('[LICENSE] ⚠️ License key not found (404)');
          throw {
            code: 'INVALID_LICENSE',
            message: 'The license key you entered does not exist.',
            actions: [
              'Check if you typed the license key correctly',
              'Make sure you are using a valid license key',
              'Contact support if you need assistance',
            ],
          };
        }

        // Gestione specifica per errore 401 (Unauthorized)
        if (response.status === 401) {
          console.log('[LICENSE] ⚠️ Authorization error (401)');
          throw {
            code: 'CONFIG_ERROR',
            message: 'Authorization failed. The plugin cannot connect to the license server.',
            actions: ['Contact the plugin developer', 'Try again later'],
          };
        }

        // Gestione specifica per errore 429 (Too Many Requests)
        if (response.status === 429) {
          console.log('[LICENSE] ⚠️ Rate limit exceeded (429)');
          throw {
            code: 'ACTIVATION_LIMIT_REACHED',
            message: 'Too many license activation attempts. Please try again later.',
            actions: [
              'Wait a few minutes before trying again',
              'Contact support if the problem persists',
            ],
          };
        }

        // Gestione specifica per errori server (500, 502, 503, 504)
        if (response.status >= 500) {
          console.log(`[LICENSE] ⚠️ Server error (${response.status})`);
          throw {
            code: 'API_ERROR',
            message: 'The license server is currently experiencing issues.',
            actions: [
              'Try again later',
              'Check the service status',
              'Contact support if the problem persists',
            ],
          };
        }

        // Errore generico per altri codici di stato
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // Parsa la risposta come JSON
      const data = await response.json();

      return data as T;
    } catch (error) {
      console.error('[LICENSE] ❌ Error making request:', error);

      // Gestione specifica per errori di rete
      if (error instanceof Error) {
        if (
          error.message.includes('NetworkError') ||
          error.message.includes('network') ||
          error.message.includes('Failed to fetch')
        ) {
          throw {
            code: 'NETWORK_ERROR',
            message:
              'Unable to connect to the license server. Please check your internet connection.',
            actions: [
              'Check your internet connection',
              'Try again when you are online',
              'Contact support if you are already online',
            ],
          };
        }

        // Gestione specifica per errori di timeout
        if (error.message.includes('timeout') || error.message.includes('timed out')) {
          throw {
            code: 'NETWORK_ERROR',
            message: 'The connection to the license server timed out.',
            actions: [
              'Check your internet connection',
              'Try again later',
              'Contact support if the problem persists',
            ],
          };
        }
      }

      throw this.handleError(error);
    }
  }

  private async validateConfiguration(): Promise<void> {
    try {
      // Verifica se la configurazione è valida
      if (!LEMONSQUEEZY_CONFIG.API_KEY) {
        throw new Error('LemonSqueezy API key is not configured');
      }

      if (!LEMONSQUEEZY_CONFIG.API_ENDPOINT) {
        throw new Error('LemonSqueezy API endpoint is not configured');
      }

      if (!LEMONSQUEEZY_CONFIG.STORE_ID) {
        throw new Error('LemonSqueezy store ID is not configured');
      }

      if (!LEMONSQUEEZY_CONFIG.PRODUCT_ID) {
        throw new Error('LemonSqueezy product ID is not configured');
      }
    } catch (error) {
      console.error('[LICENSE] ❌ Error validating configuration:', error);
      throw {
        code: 'CONFIG_ERROR',
        message: 'Invalid LemonSqueezy configuration',
        actions: ['Check your configuration settings'],
      } as LemonSqueezyError;
    }
  }

  private async validateLicense(
    licenseKey: string,
    uiReady: boolean = false,
  ): Promise<LemonSqueezyValidationResponse> {
    try {
      await this.validateConfiguration();
      await this.ensureValidConnection();

      if (this.validationInProgress) {
        throw new Error('License validation already in progress');
      }

      this.validationInProgress = true;

      // Only include instance_id if it's a non-empty string
      const data = {
        license_key: licenseKey,
        // Only include instance_id if it exists and is not empty
        ...(this.instanceId ? { instance_id: this.instanceId } : {}),
        // Aggiungiamo esplicitamente store_id e product_id, anche se sono vuoti
        // Questo è necessario per l'API di LemonSqueezy
        store_id: LEMONSQUEEZY_CONFIG.STORE_ID || '155794', // Valore di fallback
        product_id: LEMONSQUEEZY_CONFIG.PRODUCT_ID || '453124', // Valore di fallback
      };

      console.log('[LICENSE] 🔍 Validation data:', {
        license_key: licenseKey ? '***' : 'missing',
        instance_id: this.instanceId ? `${this.instanceId.substring(0, 4)}...` : 'missing',
        store_id: data.store_id,
        product_id: data.product_id,
      });

      const response = await this.makeRequest<LemonSqueezyValidationResponse>(
        'validate',
        data,
        uiReady,
      );

      this.validationInProgress = false;

      // Log the response to help with debugging
      console.log(
        '[LICENSE] 🔍 Validation response:',
        JSON.stringify(
          {
            valid: response.valid,
            hasLicenseKey: !!response.license_key,
            hasInstance: !!response.instance,
            instanceId:
              response.instance && response.instance.id
                ? `${response.instance.id.substring(0, 4)}...`
                : 'missing',
            activationDate:
              response.instance && response.instance.created_at
                ? response.instance.created_at
                : 'missing',
          },
          null,
          2,
        ),
      );

      // If the response doesn't include the license key, add it
      if (response.valid && response.license_key && !response.license_key.key) {
        response.license_key.key = licenseKey;
      }

      // If we have an instance in the response with a created_at date, update our stored activation date
      if (response.instance && response.instance.created_at) {
        this.activationDate = response.instance.created_at as string;
        console.log(
          '[LICENSE] ✅ Updated activation date from validation response:',
          this.activationDate,
        );
        // Save the updated license data
        this.saveLicenseData();
      }

      return response;
    } catch (error) {
      this.validationInProgress = false;
      console.error('[LICENSE] ❌ Error validating license:', error);
      throw this.handleError(error);
    }
  }

  private async activateLicense(
    licenseKey: string,
    uiReady: boolean = false,
  ): Promise<LemonSqueezyActivationResponse> {
    try {
      await this.validateConfiguration();
      await this.ensureValidConnection();

      if (this.activationInProgress) {
        throw new Error('License activation already in progress');
      }

      this.activationInProgress = true;

      // Verifica se abbiamo raggiunto il limite di tentativi di attivazione
      const canActivate = await this.checkRateLimit(licenseKey);
      if (!canActivate) {
        throw new Error('Activation limit reached');
      }

      // Ottieni le informazioni sul dispositivo
      const deviceInfo = await this.getDeviceInfo();

      // Prepara i dati per l'attivazione
      const data = {
        license_key: licenseKey,
        instance_name: deviceInfo.deviceName,
        instance_identifier: deviceInfo.deviceId,
        // Aggiungiamo esplicitamente store_id e product_id, anche se sono vuoti
        // Questo è necessario per l'API di LemonSqueezy
        store_id: LEMONSQUEEZY_CONFIG.STORE_ID || '155794', // Valore di fallback
        product_id: LEMONSQUEEZY_CONFIG.PRODUCT_ID || '453124', // Valore di fallback
      };

      console.log('[LICENSE] 🔑 Activation data:', {
        license_key: licenseKey ? '***' : 'missing',
        instance_name: deviceInfo.deviceName,
        instance_identifier: `${deviceInfo.deviceId.substring(0, 4)}...`,
        store_id: data.store_id,
        product_id: data.product_id,
      });

      // Effettua la richiesta di attivazione
      const response = await this.makeRequest<LemonSqueezyActivationResponse>(
        'activate',
        data,
        uiReady,
      );

      this.activationInProgress = false;

      return response;
    } catch (error) {
      this.activationInProgress = false;
      console.error('[LICENSE] ❌ Error activating license:', error);
      throw this.handleError(error);
    }
  }

  /**
   * Disattiva una licenza
   * @param licenseKey Chiave di licenza da disattivare
   * @param instanceId ID dell'istanza da disattivare
   * @returns A promise that resolves to the deactivation response
   */
  public async deactivateLicense(
    licenseKey: string,
    instanceId: string,
  ): Promise<LemonSqueezyDeactivationResponse> {
    try {
      await this.validateConfiguration();
      await this.ensureValidConnection();

      // Prepara i dati per la disattivazione
      const data = {
        license_key: licenseKey,
        instance_id: instanceId,
      };

      // Effettua la richiesta di disattivazione
      const response = await this.makeRequest<LemonSqueezyDeactivationResponse>(
        'deactivate',
        data,
        true,
      );

      return response;
    } catch (error) {
      console.error('[LICENSE] ❌ Error deactivating license:', error);
      throw this.handleError(error);
    }
  }

  private isValidationResponse(response: unknown): response is LemonSqueezyValidationResponse {
    if (typeof response !== 'object' || response === null) {
      return false;
    }

    const validationResponse = response as Partial<LemonSqueezyValidationResponse>;
    return 'valid' in validationResponse;
  }

  private isActivationResponse(response: unknown): response is LemonSqueezyActivationResponse {
    if (typeof response !== 'object' || response === null) {
      return false;
    }

    const activationResponse = response as Partial<LemonSqueezyActivationResponse>;
    // Check for the correct structure: activated property
    return 'activated' in activationResponse;
  }

  private mapResponseToLicenseStatus(response: LemonSqueezyResponse): LicenseStatus {
    try {
      // Log the raw response structure for debugging
      console.log('[LICENSE] 🔍 Raw response structure:', JSON.stringify(response, null, 2));

      if (this.isValidationResponse(response)) {
        try {
          // Log the raw validation response structure for debugging
          console.log(
            '[LICENSE] 🔍 Raw validation response structure:',
            JSON.stringify(response, null, 2),
          );

          // Check if the license is valid based on the 'valid' property
          if (response.valid !== true) {
            return {
              tier: 'free',
              isValid: false,
              features: [],
              status: 'error',
              error: {
                code: 'INVALID_LICENSE',
                message: response.error || 'Invalid license',
                actions: ['Check your license key', 'Contact support'],
              },
            };
          }

          // Extract license data directly from the response
          const licenseData = response.license_key;

          // Log the extracted data for debugging
          console.log('[LICENSE] 🔍 Extracted license data:', {
            hasLicenseData: !!licenseData,
            status: licenseData?.status,
            key: licenseData?.key ? '***' : 'missing',
            hasInstance: !!response.instance,
            instanceId: response.instance?.id
              ? `${response.instance.id.substring(0, 4)}...`
              : 'missing',
            activationDate: response.instance?.created_at || this.activationDate || 'missing',
          });

          if (!licenseData || licenseData.status !== 'active') {
            return {
              tier: 'free',
              isValid: false,
              features: [],
              status: 'error',
              error: {
                code: 'INVALID_LICENSE',
                message: 'License is not active',
                actions: ['Check your license key', 'Contact support'],
              },
            };
          }

          // If we have an instance in the response with a created_at date, update our stored activation date
          if (response.instance?.created_at) {
            this.activationDate = response.instance.created_at as string;
            console.log(
              '[LICENSE] ✅ Updated activation date from validation instance:',
              this.activationDate,
            );
          }

          // Prepare the response object
          const responseStatus: LicenseStatus = {
            tier: 'premium',
            isValid: true,
            features: ['all'], // LemonSqueezy doesn't provide features in the response, so we use 'all'
            status: 'success',
          };

          // Add license key if available
          if (licenseData.key) {
            responseStatus.licenseKey = licenseData.key as string;
          }

          // Add activation date if available
          if (response.instance?.created_at) {
            responseStatus.activationDate = response.instance.created_at as string;
          } else if (typeof this.activationDate === 'string') {
            responseStatus.activationDate = this.activationDate;
          } else {
            responseStatus.activationDate = null;
          }

          // Add activation limit and usage if available
          if (licenseData.activation_limit !== undefined) {
            responseStatus.activationLimit = licenseData.activation_limit as number;
          }
          if (licenseData.activation_usage !== undefined) {
            responseStatus.activationsCount = licenseData.activation_usage as number;
          }

          // Add instance ID if available
          if (this.instanceId) {
            responseStatus.instanceId = this.instanceId;
          }

          return responseStatus;
        } catch (error) {
          console.error('[LICENSE] ❌ Error processing validation response:', error);
          return {
            tier: 'free',
            isValid: false,
            features: [],
            status: 'error',
            error: {
              code: 'API_ERROR',
              message: 'Error processing validation response',
              actions: ['Try again later', 'Contact support'],
            },
          };
        }
      }

      if (this.isActivationResponse(response)) {
        try {
          // Log the raw response structure for debugging
          console.log(
            '[LICENSE] 🔍 Raw activation response structure:',
            JSON.stringify(response, null, 2),
          );

          // Check if the activation was successful based on the 'activated' property
          if (response.activated !== true) {
            return {
              tier: 'free',
              isValid: false,
              features: [],
              status: 'error',
              error: {
                code: 'API_ERROR',
                message: response.error || 'Failed to activate license',
                actions: ['Check your license key', 'Contact support'],
              },
            };
          }

          // Extract license and instance data directly from the response
          const licenseData = response.license_key;
          const instanceData = response.instance;

          // Log the extracted data for debugging
          console.log('[LICENSE] 🔍 Extracted license data:', {
            hasLicenseData: !!licenseData,
            status: licenseData?.status,
            key: licenseData?.key ? '***' : 'missing',
            hasInstanceData: !!instanceData,
            instanceId: instanceData?.id ? `${instanceData.id.substring(0, 4)}...` : 'missing',
            activationDate: instanceData?.created_at || 'missing',
          });

          if (!licenseData || licenseData.status !== 'active') {
            return {
              tier: 'free',
              isValid: false,
              features: [],
              status: 'error',
              error: {
                code: 'INVALID_LICENSE',
                message: 'Failed to activate license',
                actions: ['Check your license key', 'Contact support'],
              },
            };
          }

          // Store the activation date for future use
          if (instanceData?.created_at) {
            this.activationDate = instanceData.created_at as string;
          }

          // Prepare the response object
          const responseStatus: LicenseStatus = {
            tier: 'premium',
            isValid: true,
            features: ['all'], // LemonSqueezy doesn't provide features in the response, so we use 'all'
            status: 'success',
            activationLimit: licenseData.activation_limit as number,
            activationsCount: licenseData.activation_usage as number,
            expiresAt: licenseData.expires_at as string | null,
            licenseKey: licenseData.key as string,
            instanceId: instanceData?.id as string,
          };

          // Add activation date if available
          if (typeof this.activationDate === 'string') {
            responseStatus.activationDate = this.activationDate;
          } else {
            responseStatus.activationDate = null;
          }

          return responseStatus;
        } catch (error) {
          console.error('[LICENSE] ❌ Error processing activation response:', error);
          return {
            tier: 'free',
            isValid: false,
            features: [],
            status: 'error',
            error: {
              code: 'API_ERROR',
              message: 'Error processing activation response',
              actions: ['Try again later', 'Contact support'],
            },
          };
        }
      }

      return {
        tier: 'free',
        isValid: false,
        features: [],
        status: 'error',
        error: {
          code: 'API_ERROR',
          message: 'Invalid response from LemonSqueezy API',
          actions: ['Try again later', 'Contact support'],
        },
      };
    } catch (error) {
      console.error('[LICENSE] ❌ Error mapping response to license status:', error);
      return {
        tier: 'free',
        isValid: false,
        features: [],
        status: 'error',
        error: {
          code: 'API_ERROR',
          message: 'Error mapping response to license status',
          actions: ['Try again later', 'Contact support'],
        },
      };
    }
  }

  public async handleValidate(
    licenseKey: string,
    uiReady: boolean = false,
  ): Promise<LicenseStatus> {
    try {
      // Se non abbiamo una chiave di licenza, restituiamo lo stato freemium
      if (!licenseKey) {
        return {
          tier: 'free',
          isValid: false,
          features: [],
          status: 'error',
          error: {
            code: 'INVALID_LICENSE',
            message: 'No license key provided',
            actions: ['Enter a license key', 'Contact support'],
          },
        };
      }

      console.log(
        '[LICENSE] 🔍 handleValidate - Current activation date before validation:',
        this.activationDate,
      );

      // Valida la licenza
      const validationResponse = await this.validateLicense(licenseKey, uiReady);
      const status = this.mapResponseToLicenseStatus(validationResponse);

      console.log(
        '[LICENSE] 🔍 handleValidate - Activation date after mapping response:',
        this.activationDate,
      );

      // Aggiorna lo stato della licenza
      this.licenseKey = licenseKey;
      this.licenseStatusType = status.isValid ? 'active' : 'invalid';
      this.licenseFeatures = status.features;

      // Salva i dati della licenza
      this.saveLicenseData();

      // Create the response status object
      const responseStatus: LicenseStatus = {
        ...status,
        licenseKey: licenseKey, // Always include the license key
      };

      // Add activation date if available
      if (typeof this.activationDate === 'string') {
        console.log(
          '[LICENSE] 🔍 handleValidate - Using this.activationDate:',
          this.activationDate,
        );
        responseStatus.activationDate = this.activationDate;
      } else if (status.activationDate) {
        console.log(
          '[LICENSE] 🔍 handleValidate - Using status.activationDate:',
          status.activationDate,
        );
        responseStatus.activationDate = status.activationDate;
      } else {
        console.log('[LICENSE] 🔍 handleValidate - No activation date available, setting to null');
        responseStatus.activationDate = null;
      }

      // If we have an instance ID, include it
      if (this.instanceId) {
        responseStatus.instanceId = this.instanceId;
      }

      // Include activation limits if available in the validation response
      if (validationResponse.license_key) {
        // Try to extract activation limit and usage from the validation response
        // These might not be available in all validation responses
        const licenseData = validationResponse.license_key;
        if (licenseData.activation_limit !== undefined) {
          responseStatus.activationLimit = licenseData.activation_limit as number;
        }
        if (licenseData.activation_usage !== undefined) {
          responseStatus.activationsCount = licenseData.activation_usage as number;
        }
      }

      console.log(
        '[LICENSE] 🔍 handleValidate - Final response status:',
        JSON.stringify(
          {
            tier: responseStatus.tier,
            isValid: responseStatus.isValid,
            status: responseStatus.status,
            activationDate: responseStatus.activationDate,
            licenseKey: responseStatus.licenseKey ? '***' : 'missing',
            instanceId: responseStatus.instanceId
              ? `${responseStatus.instanceId.substring(0, 4)}...`
              : 'missing',
            activationLimit: responseStatus.activationLimit,
            activationsCount: responseStatus.activationsCount,
          },
          null,
          2,
        ),
      );

      return responseStatus;
    } catch (error) {
      console.error('[LICENSE] ❌ Error handling license validation:', error);
      return {
        tier: 'free',
        isValid: false,
        features: [],
        status: 'error',
        error: this.handleError(error),
      };
    }
  }

  public async handleActivate(
    licenseKey: string,
    uiReady: boolean = false,
  ): Promise<LicenseStatus> {
    try {
      // Se non abbiamo una chiave di licenza, restituiamo lo stato freemium
      if (!licenseKey) {
        return {
          tier: 'free',
          isValid: false,
          features: [],
          status: 'error',
          error: {
            code: 'INVALID_LICENSE',
            message: 'No license key provided',
            actions: ['Enter a license key', 'Contact support'],
          },
        };
      }

      // Verifica se la licenza è già valida
      let validationResult: LicenseStatus | null = null;
      try {
        if (this.licenseKey === licenseKey && this.instanceId) {
          validationResult = await this.handleValidate(licenseKey, uiReady);
        }
      } catch (error) {
        console.warn('[LICENSE] ⚠️ Error validating existing license:', error);
      }

      // Se la licenza è già valida e attivata su questo dispositivo, restituiamo lo stato corrente
      if (validationResult && validationResult.isValid) {
        console.log('[LICENSE] ✅ License is already valid, returning current status');
        return {
          ...validationResult,
          status: 'success',
        };
      }

      // Attiva la licenza
      const activationResponse = await this.activateLicense(licenseKey, uiReady);

      // Log the raw response for debugging
      console.log(
        '[LICENSE] 🔍 Raw activation response:',
        JSON.stringify(activationResponse, null, 2),
      );

      // Check if the activation was successful
      if (activationResponse.activated === true && activationResponse.license_key) {
        const licenseData = activationResponse.license_key;
        const instanceData = activationResponse.instance;

        console.log('[LICENSE] ✅ Valid activation response detected');

        if (licenseData && licenseData.status === 'active') {
          console.log('[LICENSE] ✅ License activated successfully, saving to storage');
          await figma.clientStorage.setAsync(STORAGE_KEYS.LICENSE_KEY, licenseKey);
          this.licenseKey = licenseKey;
          this.instanceId = instanceData?.id || null;
          this.licenseStatusType = 'active';
          this.licenseFeatures = ['all']; // LemonSqueezy doesn't provide features in the response
          this.activationDate = (instanceData?.created_at as string) || null;
          this.saveLicenseData();

          // Return success status
          return {
            tier: 'premium',
            isValid: true,
            features: this.licenseFeatures,
            status: 'success',
            activationLimit: licenseData.activation_limit as number,
            activationsCount: licenseData.activation_usage as number,
            expiresAt: licenseData.expires_at as string | null,
            licenseKey: licenseData.key as string,
            instanceId: this.instanceId as string | undefined,
            activationDate: this.activationDate,
          };
        }
      }

      // Verifica se l'errore è dovuto a una licenza già attivata su un altro dispositivo
      if (
        activationResponse.error &&
        (activationResponse.error.includes('already activated') ||
          activationResponse.error.includes('activation limit'))
      ) {
        console.log('[LICENSE] ⚠️ License already activated on another device');
        return {
          tier: 'free',
          isValid: false,
          features: [],
          status: 'error',
          error: {
            code: 'ACTIVATION_LIMIT_REACHED',
            message: 'This license key has already been activated on another device.',
            actions: [
              'Use a different license key',
              'Deactivate the license on another device',
              'Contact support',
            ],
          },
        };
      }

      // If we get here, something went wrong with the activation
      console.log('[LICENSE] ❌ Invalid activation response structure or license not activated');
      return {
        tier: 'free',
        isValid: false,
        features: [],
        status: 'error',
        error: {
          code: 'API_ERROR',
          message: 'Failed to activate license. Invalid response from server.',
          actions: ['Check your license key', 'Contact support'],
        },
      };
    } catch (error) {
      console.error('[LICENSE] ❌ Error handling license activation:', error);
      return {
        tier: 'free',
        isValid: false,
        features: [],
        status: 'error',
        error: this.handleError(error),
      };
    }
  }

  private async checkRateLimit(licenseKey: string): Promise<boolean> {
    try {
      const attempts = this.activationAttempts.get(licenseKey) || 0;

      if (attempts >= this.MAX_ATTEMPTS) {
        return false;
      }

      this.activationAttempts.set(licenseKey, attempts + 1);

      // Reset attempts after the window
      setTimeout(() => {
        this.activationAttempts.set(licenseKey, 0);
      }, this.ATTEMPT_WINDOW);

      return true;
    } catch (error) {
      console.error('[LICENSE] ❌ Error checking rate limit:', error);
      return false;
    }
  }

  private handleError(error: unknown): LemonSqueezyError {
    if (error && typeof error === 'object' && 'code' in error) {
      return error as LemonSqueezyError;
    }

    return {
      code: 'API_ERROR',
      message: error instanceof Error ? error.message : String(error),
      actions: ['Try again later', 'Contact support'],
    };
  }

  public async handleDeactivation(): Promise<void> {
    try {
      if (!this.licenseKey || !this.instanceId) {
        console.warn('[LICENSE] ⚠️ No active license to deactivate');
        return;
      }

      const response = await this.deactivateLicense(this.licenseKey, this.instanceId);

      if (response.deactivated) {
        console.log('[LICENSE] ✅ License deactivated successfully');
        this.licenseKey = null;
        this.instanceId = null;
        this.licenseStatusType = 'inactive';
        this.licenseFeatures = [];
        this.activationDate = null;
        this.saveLicenseData();
        await figma.clientStorage.deleteAsync(STORAGE_KEYS.LICENSE_KEY);
      } else {
        console.error('[LICENSE] ❌ Failed to deactivate license:', response.error);
      }
    } catch (error) {
      console.error('[LICENSE] ❌ Error handling license deactivation:', error);
    }
  }

  /**
   * Ottiene lo stato attuale della licenza
   * @returns Stato della licenza
   */
  public getLicenseStatus(): LicenseStatusType {
    return this.licenseStatusType;
  }

  /**
   * Verifica se una feature è disponibile con la licenza attuale
   * @param feature - Feature da verificare
   * @returns true se la feature è disponibile, false altrimenti
   */
  public hasFeature(feature: string): boolean {
    return this.licenseFeatures.includes(feature);
  }

  /**
   * Ottiene tutte le feature disponibili con la licenza attuale
   * @returns Array di feature disponibili
   */
  public getFeatures(): string[] {
    return [...this.licenseFeatures];
  }

  /**
   * Ottiene l'instance_id corrente
   * @returns Instance ID o null se non disponibile
   */
  public getInstanceId(): string | null {
    return this.instanceId;
  }

  /**
   * Ottiene la chiave di licenza corrente
   * @returns Chiave di licenza o null se non disponibile
   */
  public getLicenseKey(): string | null {
    return this.licenseKey;
  }

  /**
   * Salva i dati della licenza nello storage
   */
  private saveLicenseData(): void {
    try {
      const data: StoredLicenseData = {
        licenseKey: this.licenseKey,
        instanceId: this.instanceId,
        licenseStatus: this.licenseStatusType,
        licenseFeatures: this.licenseFeatures,
        activationDate: typeof this.activationDate === 'string' ? this.activationDate : null,
      };

      // Salva i dati nello storage di Figma
      figma.clientStorage
        .setAsync(this.storageKey, JSON.stringify(data))
        .catch((err) => console.error('Error saving license data:', err));
    } catch (error) {
      console.error('Error saving license data:', error);
    }
  }

  /**
   * Carica i dati della licenza dallo storage
   */
  private async loadLicenseData(): Promise<void> {
    try {
      // Carica i dati dallo storage di Figma
      const dataString = await figma.clientStorage.getAsync(this.storageKey);

      if (dataString) {
        const data = JSON.parse(dataString as string) as StoredLicenseData;
        this.licenseKey = data.licenseKey;
        this.instanceId = data.instanceId;
        this.licenseStatusType = data.licenseStatus;
        this.licenseFeatures = data.licenseFeatures;
        this.activationDate = data.activationDate || null;
      }
    } catch (error) {
      console.error('Error loading license data:', error);
    }
  }
}

export const licenseService = LicenseService.getInstance();
