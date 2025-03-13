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
  private connectionTestCache: { timestamp: number; result: boolean } | null = null;
  private licenseKey: string | null = null;
  private instanceId: string | null = null;
  private licenseStatusType: LicenseStatusType = 'inactive';
  private licenseFeatures: string[] = [];
  private storageKey = 'license_data';
  private activationDate: string | null = null;
  private freemiumStatus: LicenseStatus;

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
    // Inizializza freemiumStatus nel costruttore
    this.freemiumStatus = {
      tier: 'free',
      isValid: false,
      features: [],
      status: 'idle',
    };
  }

  public static getInstance(): LicenseService {
    if (!LicenseService.instance) {
      LicenseService.instance = new LicenseService();
    }
    return LicenseService.instance;
  }

  public initializeState(): void {
    try {
      console.log('Initializing freemium state...');

      // Reimposta lo stato iniziale
      this.freemiumStatus = {
        tier: 'free',
        isValid: false,
        features: [],
        status: 'idle',
      };

      // Emetti l'evento di cambio stato
      emit('LICENSE_STATUS_CHANGED', this.freemiumStatus);

      console.log('Freemium state initialized:', this.freemiumStatus);
    } catch (error) {
      console.error('Error initializing license state:', error);
      // Imposta comunque uno stato predefinito in caso di errore
      this.freemiumStatus = {
        tier: 'free',
        isValid: false,
        features: [],
        status: 'error',
      };
      // Tenta di emettere l'evento anche in caso di errore
      try {
        emit('LICENSE_STATUS_CHANGED', this.freemiumStatus);
      } catch (emitError) {
        console.error('Failed to emit LICENSE_STATUS_CHANGED event:', emitError);
      }
    }

    // Registra il listener per il controllo della licenza
    try {
      on('CHECK_LICENSE_STATUS', async () => {
        try {
          console.log('Checking license status...');
          // Utilizziamo un metodo esistente invece di checkLicenseStatus
          await this.getLicenseStatus();
        } catch (error) {
          console.error('Error checking license status:', error);
        }
      });
    } catch (error) {
      console.error('Failed to register CHECK_LICENSE_STATUS listener:', error);
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
        console.warn('[LICENSE] ⚠️ UI is not ready to handle API requests, deferring request');
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

      // Log della richiesta per debug
      console.log('[LICENSE] 🔍 Making API request to:', url);
      console.log('[LICENSE] 🔍 Request data:', {
        method: 'POST',
        headers: { ...headers, Authorization: headers.Authorization ? '***' : undefined },
        body: requestBody.substring(0, 100) + (requestBody.length > 100 ? '...' : ''),
      });

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
        if (response.status === 400 || response.status === 404) {
          try {
            // Tentiamo di leggere il corpo della risposta per ottenere dettagli sull'errore
            const errorText = await response.text();
            console.log('[LICENSE] 🔍 Raw error response text:', errorText);

            let errorData;

            try {
              errorData = JSON.parse(errorText);
              // Log completo della risposta di errore per diagnostica
              console.log('[LICENSE] 🔍 Full error response data (parsed):', errorData);
            } catch (e) {
              errorData = { error: errorText };
              // Log del testo di errore non-JSON
              console.log('[LICENSE] 🔍 Non-JSON error text:', errorText);
            }

            // Log per debug
            console.error('[LICENSE] ❌ Error response data:', JSON.stringify(errorData, null, 2));
            console.error('[LICENSE] ❌ Error status:', response.status, response.statusText);

            // Verifica se la risposta contiene informazioni sullo stato della licenza
            if (errorData && typeof errorData === 'object') {
              // Controlla se c'è un campo status o state nella risposta
              if ('status' in errorData) {
                console.log('[LICENSE] 🔍 License status in error response:', errorData.status);

                // Gestisci i diversi stati della licenza
                if (errorData.status === 'disabled') {
                  throw new Error(`License key is disabled: ${JSON.stringify(errorData)}`);
                } else if (errorData.status === 'expired') {
                  throw new Error(`License key has expired: ${JSON.stringify(errorData)}`);
                } else if (errorData.status === 'inactive') {
                  throw new Error(`License key is inactive: ${JSON.stringify(errorData)}`);
                }
              }

              // Controlla se c'è un messaggio che contiene informazioni sullo stato
              if ('message' in errorData && typeof errorData.message === 'string') {
                const message = errorData.message.toLowerCase();
                console.log('[LICENSE] 🔍 Checking message for status info:', message);

                if (message.includes('disabled')) {
                  throw new Error(`License key is disabled: ${JSON.stringify(errorData)}`);
                } else if (message.includes('expired')) {
                  throw new Error(`License key has expired: ${JSON.stringify(errorData)}`);
                } else if (message.includes('inactive')) {
                  throw new Error(`License key is inactive: ${JSON.stringify(errorData)}`);
                }
              }

              // Controlla se c'è un campo error che contiene informazioni sullo stato
              if ('error' in errorData && typeof errorData.error === 'string') {
                const errorMsg = errorData.error.toLowerCase();
                console.log('[LICENSE] 🔍 Checking error field for status info:', errorMsg);

                if (errorMsg.includes('disabled')) {
                  throw new Error(`License key is disabled: ${JSON.stringify(errorData)}`);
                } else if (errorMsg.includes('expired')) {
                  throw new Error(`License key has expired: ${JSON.stringify(errorData)}`);
                } else if (errorMsg.includes('inactive')) {
                  throw new Error(`License key is inactive: ${JSON.stringify(errorData)}`);
                }
              }
            }

            if (response.status === 404) {
              throw new Error(
                `API endpoint not found: ${url}. Please check your API configuration.`,
              );
            }

            throw new Error(
              errorData.error ||
                errorData.message ||
                `API error: ${response.status} ${response.statusText}`,
            );
          } catch (parseError) {
            console.error('[LICENSE] ❌ Error parsing error response:', parseError);
            throw new Error(`API error: ${response.status} ${response.statusText}`);
          }
        }

        throw new Error(`API error: ${response.status} ${response.statusText}`);
      }

      // Leggi la risposta
      const responseText = await response.text();
      let responseData: T;

      try {
        responseData = JSON.parse(responseText) as T;
      } catch (error) {
        console.error('[LICENSE] ❌ Error parsing response:', error);
        throw new Error('Invalid JSON response from API');
      }

      // Log della risposta per debug
      console.log('[LICENSE] ✅ API response:', JSON.stringify(responseData, null, 2));

      return responseData;
    } catch (error) {
      console.error('[LICENSE] ❌ Error making API request:', error);
      throw error;
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
                message: 'The license key you entered is invalid or has expired.',
                actions: [
                  'Check the license key and try again',
                  'Contact support if you believe this is an error',
                ],
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
                message: 'The license key you entered is invalid or has expired.',
                actions: [
                  'Check the license key and try again',
                  'Contact support if you believe this is an error',
                ],
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
              message: 'We encountered an issue while processing your license information.',
              actions: ['Try again later', 'Contact support if the problem persists'],
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
                message: 'We encountered an issue while processing your license activation.',
                actions: ['Try again later', 'Contact support if the problem persists'],
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
                message: 'The license key you entered is invalid or has expired.',
                actions: [
                  'Check the license key and try again',
                  'Contact support if you believe this is an error',
                ],
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
              message: 'We encountered an issue while processing your license activation.',
              actions: ['Try again later', 'Contact support if the problem persists'],
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
          message: 'We received an unexpected response from the license server.',
          actions: ['Try again later', 'Contact support if the problem persists'],
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
          message: 'We encountered an issue while processing your license information.',
          actions: ['Try again later', 'Contact support if the problem persists'],
        },
      };
    }
  }

  public async handleValidate(licenseKey: string): Promise<LicenseStatus> {
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

      // Valida la licenza usando il meccanismo di retry
      const deviceInfo = await this.getDeviceInfo();
      const validationResponse = await this.makeRequestWithRetry<LemonSqueezyValidationResponse>(
        'validate',
        {
          license_key: licenseKey,
          instance_identifier: deviceInfo.deviceId,
        },
      );

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

  /**
   * Effettua una richiesta API con meccanismo di retry
   * Utile quando l'UI potrebbe non essere ancora pronta
   */
  private async makeRequestWithRetry<T extends LemonSqueezyResponse>(
    endpoint: string,
    requestData: Record<string, string>,
    maxRetries = 3,
    retryDelay = 1000,
  ): Promise<T> {
    let lastError: Error | null = null;

    for (let attempt = 0; attempt < maxRetries; attempt++) {
      try {
        // Tentiamo di fare la richiesta
        return await this.makeRequest<T>(endpoint, requestData, true);
      } catch (error) {
        lastError = error instanceof Error ? error : new Error(String(error));

        // Se l'errore è dovuto all'UI non pronta e non siamo all'ultimo tentativo
        if (lastError.message.includes('UI is not ready') && attempt < maxRetries - 1) {
          console.log(
            `[LICENSE] 🔄 Retry attempt ${attempt + 1}/${maxRetries} after ${retryDelay}ms`,
          );
          // Attendiamo prima di riprovare
          await new Promise((resolve) => setTimeout(resolve, retryDelay * (attempt + 1)));
          continue;
        }

        // Per altri tipi di errori o se siamo all'ultimo tentativo, rilanciamo l'errore
        throw lastError;
      }
    }

    // Se arriviamo qui, significa che abbiamo esaurito i tentativi
    throw lastError || new Error('Failed to make API request after multiple attempts');
  }

  public async handleActivate(licenseKey: string): Promise<LicenseStatus> {
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
            message: 'Please enter a license key to activate premium features.',
            actions: ['Enter your license key', "Purchase a license if you don't have one"],
          },
        };
      }

      // Verifica se la licenza è già valida
      let validationResult: LicenseStatus | null = null;
      try {
        if (this.licenseKey === licenseKey && this.instanceId) {
          validationResult = await this.handleValidate(licenseKey);
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

      console.log('[LICENSE] 🔄 Proceeding with license activation for key:', licenseKey);

      // Attiva la licenza usando il meccanismo di retry
      let activationResponse: LemonSqueezyActivationResponse;
      try {
        activationResponse = await this.makeRequestWithRetry<LemonSqueezyActivationResponse>(
          'activate',
          {
            license_key: licenseKey,
            instance_name: (await this.getDeviceInfo()).deviceName,
            instance_identifier: (await this.getDeviceInfo()).deviceId,
            store_id: LEMONSQUEEZY_CONFIG.STORE_ID,
            product_id: LEMONSQUEEZY_CONFIG.PRODUCT_ID,
          },
        );

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
          } else {
            // La licenza esiste ma non è attiva
            console.log(
              '[LICENSE] ⚠️ License exists but status is not active:',
              licenseData?.status,
            );
            return {
              tier: 'free',
              isValid: false,
              features: [],
              status: 'error',
              error: {
                code: 'INVALID_LICENSE',
                message: `This license key is not active (status: ${licenseData?.status || 'unknown'}).`,
                actions: ['Contact support for assistance', 'Purchase a new license if needed'],
              },
            };
          }
        } else if (activationResponse.error) {
          // Errore specifico restituito dall'API
          console.log('[LICENSE] ❌ API returned an error:', activationResponse.error);

          // Controlla se l'errore contiene informazioni sullo stato della licenza
          const errorLower = activationResponse.error.toLowerCase();
          if (errorLower.includes('disabled')) {
            return {
              tier: 'free',
              isValid: false,
              features: [],
              status: 'error',
              error: {
                code: 'LICENSE_DISABLED',
                message: 'This license key has been disabled or revoked.',
                actions: [
                  'Contact the store where you purchased the license',
                  'Purchase a new license if needed',
                ],
              },
            };
          } else if (errorLower.includes('expired')) {
            return {
              tier: 'free',
              isValid: false,
              features: [],
              status: 'error',
              error: {
                code: 'LICENSE_EXPIRED',
                message: 'This license key has expired.',
                actions: ['Renew your license if possible', 'Purchase a new license if needed'],
              },
            };
          } else if (errorLower.includes('inactive')) {
            return {
              tier: 'free',
              isValid: false,
              features: [],
              status: 'error',
              error: {
                code: 'INVALID_LICENSE',
                message: 'This license key is inactive and needs to be activated.',
                actions: [
                  'Make sure you are using the correct license key',
                  'Contact support if you need assistance with activation',
                ],
              },
            };
          }
        }
      } catch (activationError) {
        console.error('[LICENSE] ❌ Error during activation request:', activationError);

        // Log dettagliato dell'errore
        if (activationError instanceof Error) {
          console.log('[LICENSE] 🔍 Activation error message:', activationError.message);
          console.log('[LICENSE] 🔍 Activation error stack:', activationError.stack);

          // Controlla se l'errore contiene informazioni sullo stato della licenza
          const errorMsg = activationError.message.toLowerCase();
          console.log('[LICENSE] 🔍 Checking activation error for status info:', errorMsg);

          if (errorMsg.includes('disabled') || errorMsg.includes('revoked')) {
            console.log('[LICENSE] 🔍 Detected disabled license in activation error');
            return {
              tier: 'free',
              isValid: false,
              features: [],
              status: 'error',
              error: {
                code: 'LICENSE_DISABLED',
                message: 'This license key has been disabled or revoked.',
                actions: [
                  'Contact the store where you purchased the license',
                  'Purchase a new license if needed',
                ],
              },
            };
          } else if (errorMsg.includes('expired')) {
            console.log('[LICENSE] 🔍 Detected expired license in activation error');
            return {
              tier: 'free',
              isValid: false,
              features: [],
              status: 'error',
              error: {
                code: 'LICENSE_EXPIRED',
                message: 'This license key has expired.',
                actions: ['Renew your license if possible', 'Purchase a new license if needed'],
              },
            };
          } else if (errorMsg.includes('inactive')) {
            console.log('[LICENSE] 🔍 Detected inactive license in activation error');
            return {
              tier: 'free',
              isValid: false,
              features: [],
              status: 'error',
              error: {
                code: 'INVALID_LICENSE',
                message: 'This license key is inactive and needs to be activated.',
                actions: [
                  'Make sure you are using the correct license key',
                  'Contact support if you need assistance with activation',
                ],
              },
            };
          }
        }

        // Gestisci l'errore di attivazione
        return {
          tier: 'free',
          isValid: false,
          features: [],
          status: 'error',
          error: this.handleError(activationError),
        };
      }

      // Verifica se l'errore è dovuto a una licenza già attivata su un altro dispositivo
      if (
        activationResponse &&
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
              'Contact support for assistance',
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
          message:
            "We couldn't activate your license. Please check your license key and try again.",
          actions: [
            'Verify your license key is correct',
            'Contact support if the problem persists',
          ],
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

  private handleError(error: unknown): LemonSqueezyError {
    if (error && typeof error === 'object' && 'code' in error) {
      console.log('[LICENSE] 🔍 Error object with code detected:', error);
      return error as LemonSqueezyError;
    }

    // Determina il tipo di errore in base al messaggio
    const errorMessage = error instanceof Error ? error.message : String(error);

    // Log completo del messaggio di errore per diagnostica
    console.log('[LICENSE] 🔍 Full error message for diagnosis:', errorMessage);
    console.log('[LICENSE] 🔍 Error type:', typeof error);
    if (error instanceof Error) {
      console.log('[LICENSE] 🔍 Error stack:', error.stack);
    }
    if (typeof error === 'object' && error !== null) {
      console.log('[LICENSE] 🔍 Error object keys:', Object.keys(error));
      try {
        console.log('[LICENSE] 🔍 Error object stringified:', JSON.stringify(error));
      } catch (e) {
        console.log('[LICENSE] 🔍 Error object cannot be stringified');
      }
    }

    // Test di tutti i possibili pattern per licenze disabilitate
    const disabledPatterns = [
      'disabled',
      'license key is disabled',
      '"status":"disabled"',
      '"status": "disabled"',
      'status.*disabled',
      'license.*disabled',
      'revoked',
    ];

    console.log('[LICENSE] 🔍 Testing disabled patterns:');
    for (const pattern of disabledPatterns) {
      const regex = new RegExp(pattern, 'i');
      const matches = regex.test(errorMessage);
      console.log(`[LICENSE] 🔍 Pattern "${pattern}": ${matches ? 'MATCH' : 'no match'}`);
    }

    // Errore specifico per licenze disabilitate - condizione ampliata
    if (
      errorMessage.includes('disabled') ||
      errorMessage.includes('license key is disabled') ||
      errorMessage.includes('"status":"disabled"') ||
      errorMessage.includes('"status": "disabled"') ||
      (errorMessage.includes('status') && errorMessage.includes('disabled')) ||
      errorMessage.includes('revoked') ||
      /status.*disabled/i.test(errorMessage) ||
      /license.*disabled/i.test(errorMessage) ||
      /disabled.*license/i.test(errorMessage)
    ) {
      console.log('[LICENSE] 🔍 Detected disabled license from error message');
      return {
        code: 'LICENSE_DISABLED',
        message: 'This license key has been disabled or revoked.',
        actions: [
          'Contact the store where you purchased the license',
          'Purchase a new license if needed',
        ],
      };
    }

    // Errore specifico per licenze scadute
    if (
      errorMessage.includes('expired') ||
      errorMessage.includes('"status":"expired"') ||
      errorMessage.includes('"status": "expired"') ||
      (errorMessage.includes('status') && errorMessage.includes('expired'))
    ) {
      console.log('[LICENSE] 🔍 Detected expired license from error message');
      return {
        code: 'LICENSE_EXPIRED',
        message: 'This license key has expired.',
        actions: ['Renew your license if possible', 'Purchase a new license if needed'],
      };
    }

    // Errore specifico per licenze inattive
    if (
      errorMessage.includes('inactive') ||
      errorMessage.includes('"status":"inactive"') ||
      errorMessage.includes('"status": "inactive"') ||
      (errorMessage.includes('status') && errorMessage.includes('inactive'))
    ) {
      console.log('[LICENSE] 🔍 Detected inactive license from error message');
      return {
        code: 'INVALID_LICENSE',
        message: 'This license key is inactive and needs to be activated.',
        actions: [
          'Make sure you are using the correct license key',
          'Contact support if you need assistance with activation',
        ],
      };
    }

    // Errore di connessione o rete
    if (
      errorMessage.includes('network') ||
      errorMessage.includes('fetch') ||
      errorMessage.includes('connect')
    ) {
      return {
        code: 'NETWORK_ERROR',
        message: 'Unable to connect to the license server. Please check your internet connection.',
        actions: [
          'Check your internet connection',
          'Try again when you are online',
          'Contact support if you are already online',
        ],
      };
    }

    // Errore di timeout
    if (errorMessage.includes('timeout')) {
      return {
        code: 'CONNECTION_ERROR',
        message: 'The connection to the license server timed out.',
        actions: [
          'Check your internet connection',
          'Try again later',
          'Contact support if the problem persists',
        ],
      };
    }

    // Errore 404 (licenza non trovata)
    if (errorMessage.includes('404') || errorMessage.includes('not found')) {
      return {
        code: 'INVALID_LICENSE',
        message: 'The license key you entered does not exist.',
        actions: [
          'Check if you typed the license key correctly',
          'Make sure you are using a valid license key',
          'Contact support if you need assistance',
        ],
      };
    }

    // Errore 401 (non autorizzato)
    if (errorMessage.includes('401') || errorMessage.includes('unauthorized')) {
      return {
        code: 'API_ERROR',
        message: 'Authorization failed. The plugin cannot connect to the license server.',
        actions: ['Contact the plugin developer', 'Try again later'],
      };
    }

    // Errore 429 (troppe richieste)
    if (errorMessage.includes('429') || errorMessage.includes('too many requests')) {
      return {
        code: 'API_ERROR',
        message: 'Too many license activation attempts. Please try again later.',
        actions: [
          'Wait a few minutes before trying again',
          'Contact support if the problem persists',
        ],
      };
    }

    // Errori server (500, 502, 503, 504)
    if (
      errorMessage.includes('500') ||
      errorMessage.includes('502') ||
      errorMessage.includes('503') ||
      errorMessage.includes('504') ||
      errorMessage.includes('server error')
    ) {
      return {
        code: 'API_ERROR',
        message: 'The license server is currently experiencing issues.',
        actions: [
          'Try again later',
          'Check the service status',
          'Contact support if the problem persists',
        ],
      };
    }

    // Errore generico
    console.log('[LICENSE] ⚠️ No specific error pattern matched, returning generic error');
    return {
      code: 'API_ERROR',
      message:
        'There was a problem with your license activation. The license may be invalid, disabled, or there might be a connection issue.',
      actions: [
        'Verify your license key is correct and active',
        'Check your internet connection',
        'Contact support if the problem persists',
      ],
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
