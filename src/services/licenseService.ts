import { LEMONSQUEEZY_CONFIG, ENV_CONFIG } from '../config/lemonSqueezy';
import type {
  LemonSqueezyValidationResponse,
  LemonSqueezyActivationResponse,
  LemonSqueezyError,
  LemonSqueezyResponse,
  LicenseStatus,
  LemonSqueezyDeactivationResponse,
} from '../types/lemonSqueezy';
import { emit, on } from '@create-figma-plugin/utilities';

interface DeviceInfo {
  name: string;
  identifier: string;
  timestamp: string;
  platform: string;
  version: string;
}

const STORAGE_KEYS = {
  DEVICE_ID: 'license_device_id',
  LICENSE_KEY: 'license_key',
} as const;

export class LicenseService {
  private static instance: LicenseService;
  private readonly MAX_ATTEMPTS = 5;
  private readonly ATTEMPT_WINDOW = 3600000; // 1 ora
  private readonly VALIDATION_CACHE_TIME = 300000; // 5 minuti
  private activationAttempts = new Map<string, number>();
  private validationInProgress = false;
  private activationInProgress = false;
  private lastValidationTime = 0;
  private lastValidationResult: LicenseStatus | null = null;
  private connectionTestCache: { timestamp: number; result: boolean } | null = null;

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

      // Run a quick check of the configuration
      this.checkConfigurationSafely();
    } catch (error) {
      console.error('[LICENSE] ❌ Error during license state initialization:', error);
      // Ensure we still emit a valid state even if there's an error
      emit('LICENSE_STATUS_CHANGED', {
        tier: 'free',
        isValid: false,
        features: [],
        status: 'error',
        error: {
          code: 'INITIALIZATION_ERROR',
          message: 'Failed to initialize license service',
          actions: ['Try reloading the plugin'],
        },
      });
    }
  }

  private async getDeviceInfo(): Promise<DeviceInfo> {
    const identifier = await this.generateDeviceIdentifier();
    return {
      name: 'Figma Plugin - Class Action',
      identifier,
      timestamp: new Date().toISOString(),
      platform: 'Figma Plugin',
      version: '1.0.0',
    };
  }

  private async generateDeviceIdentifier(): Promise<string> {
    try {
      const storedId = await figma.clientStorage.getAsync(STORAGE_KEYS.DEVICE_ID);
      if (storedId) return storedId;

      const newId = `${Date.now()}-${Math.random().toString(36).substring(2, 15)}`;
      await figma.clientStorage.setAsync(STORAGE_KEYS.DEVICE_ID, newId);
      return newId;
    } catch (error) {
      console.error('Error managing device identifier:', error);
      return `fallback-${Date.now()}`;
    }
  }

  private async validateWithCache(licenseKey: string, uiReady: boolean = false): Promise<boolean> {
    const now = Date.now();
    if (this.lastValidationResult && now - this.lastValidationTime < this.VALIDATION_CACHE_TIME) {
      return this.lastValidationResult.isValid;
    }

    try {
      const validationResponse = await this.validateLicense(licenseKey, uiReady);
      const status = this.mapResponseToLicenseStatus(validationResponse);
      this.lastValidationResult = status;
      this.lastValidationTime = now;
      return status.isValid;
    } catch (error) {
      this.lastValidationResult = null;
      this.lastValidationTime = 0;
      throw error;
    }
  }

  private async ensureValidConnection(uiReady: boolean = false): Promise<void> {
    const now = Date.now();
    if (
      this.connectionTestCache &&
      now - this.connectionTestCache.timestamp < this.VALIDATION_CACHE_TIME &&
      this.connectionTestCache.result
    ) {
      return;
    }

    const isConnected = await this.testApiConnection(uiReady);
    this.connectionTestCache = {
      timestamp: now,
      result: isConnected,
    };

    if (!isConnected) {
      throw {
        code: 'API_ERROR',
        message: 'Unable to connect to LemonSqueezy API',
        actions: ['Check your internet connection', 'Verify API key configuration'],
      } as LemonSqueezyError;
    }
  }

  private async testApiConnection(uiReady: boolean = false): Promise<boolean> {
    try {
      console.log('[LICENSE] 🔍 Testing API connection...');

      if (!uiReady) {
        console.log('[LICENSE] ⚠️ UI is not ready, skipping API connection test');
        return false;
      }

      // Invia una richiesta di test all'UI
      try {
        const testPayload = {
          license_key: 'test-connection',
          instance_identifier: 'test-device',
          store_id: LEMONSQUEEZY_CONFIG.STORE_ID,
          product_id: LEMONSQUEEZY_CONFIG.PRODUCT_ID,
        };

        await this.makeRequest(
          '/validate',
          {
            method: 'POST',
            body: JSON.stringify(testPayload),
          },
          uiReady,
        );

        console.log('[LICENSE] ✅ API connection test successful');
        return true;
      } catch (error) {
        console.error('[LICENSE] ❌ API connection test failed:', error);
        return false;
      }
    } catch (error) {
      console.error('API Connection test failed:', error);
      return false;
    }
  }

  private async makeRequest<T extends LemonSqueezyResponse>(
    endpoint: string,
    options: RequestInit = {},
    uiReady: boolean = false,
  ): Promise<T> {
    try {
      // Verifica se l'UI è pronta
      if (!uiReady) {
        throw new Error('UI is not ready to handle API requests');
      }

      // Determine if this is a license API request
      const isLicenseRequest =
        endpoint.includes('validate') ||
        endpoint.includes('activate') ||
        endpoint.includes('deactivate');

      // Construct the full URL - for license activation, we need to ensure the path is correct
      let url = '';

      // Special handling for license endpoints - Utilizziamo direttamente l'API di LemonSqueezy
      // invece del proxy CORS che non funziona
      if (endpoint === 'activate' || endpoint === '/activate') {
        url = 'https://api.lemonsqueezy.com/v1/licenses/activate';
        console.log('[LICENSE] 🔧 Using direct activation endpoint:', url);
      } else if (endpoint === 'deactivate' || endpoint === '/deactivate') {
        url = 'https://api.lemonsqueezy.com/v1/licenses/deactivate';
        console.log('[LICENSE] 🔧 Using direct deactivation endpoint:', url);
      } else if (endpoint === 'validate' || endpoint === '/validate') {
        url = 'https://api.lemonsqueezy.com/v1/licenses/validate';
        console.log('[LICENSE] 🔧 Using direct validation endpoint:', url);
      } else {
        // For other endpoints, use the standard format
        const formattedEndpoint = endpoint && !endpoint.startsWith('/') ? `/${endpoint}` : endpoint;
        url = `${LEMONSQUEEZY_CONFIG.API_ENDPOINT}${formattedEndpoint}`;
      }

      console.log('[LICENSE] 🌐 API Request to:', url, {
        method: options.method || 'POST', // Usiamo POST come default per le richieste di licenza
        headers: options.headers || {
          'Content-Type': isLicenseRequest
            ? 'application/x-www-form-urlencoded'
            : 'application/vnd.api+json',
          Accept: isLicenseRequest ? 'application/json' : 'application/vnd.api+json',
          Authorization: `Bearer ${LEMONSQUEEZY_CONFIG.API_KEY ? '***' : 'missing'}`,
        },
        body: typeof options.body === 'string' ? options.body.substring(0, 100) : 'object body',
      });

      // Ensure we're using the correct headers for license API requests
      const headers: Record<string, string> = { ...(options.headers as Record<string, string>) };
      if (isLicenseRequest) {
        headers['Content-Type'] = 'application/x-www-form-urlencoded';
        headers['Accept'] = 'application/json';
      } else {
        headers['Content-Type'] = 'application/vnd.api+json';
        headers['Accept'] = 'application/vnd.api+json';
      }

      // Only add Authorization header if API_KEY is configured
      if (LEMONSQUEEZY_CONFIG.API_KEY && LEMONSQUEEZY_CONFIG.API_KEY !== 'test_key') {
        headers['Authorization'] = `Bearer ${LEMONSQUEEZY_CONFIG.API_KEY}`;
      } else {
        console.warn('[LICENSE] ⚠️ No valid API key found, request may fail');
      }

      // Assicuriamoci che il metodo sia corretto per le richieste di licenza
      const method = isLicenseRequest ? 'POST' : options.method || 'GET';

      // Invia la richiesta all'UI thread
      console.log('[LICENSE] 📤 Sending request to UI thread');
      figma.ui.postMessage({
        type: 'API_REQUEST',
        payload: {
          url,
          options: {
            method,
            headers,
            body: options.body,
          },
        },
      });

      // Attendi la risposta dall'UI thread
      const response = await new Promise<T>((resolve, reject) => {
        const timeout = setTimeout(() => {
          reject(new Error('API request timeout'));
        }, 30000);

        const handleResponse = (result: { success: boolean; data?: T; error?: string }) => {
          clearTimeout(timeout);
          console.log('[LICENSE] 📡 Received API response from UI thread:', result);

          if (result.success && result.data) {
            resolve(result.data);
          } else {
            reject(new Error(result.error || 'API request failed'));
          }
        };

        // Registra il gestore per la risposta
        on('API_RESPONSE', handleResponse);
      });

      console.log('[LICENSE] ✅ API Success Response:', response);
      return response;
    } catch (err) {
      console.error('[DEBUG] ❌ Request error:', err);
      throw err;
    }
  }

  private async validateConfiguration(): Promise<void> {
    const missingConfig = [];

    if (!LEMONSQUEEZY_CONFIG.API_KEY || LEMONSQUEEZY_CONFIG.API_KEY === 'test_key') {
      missingConfig.push('API_KEY');
    }
    if (!LEMONSQUEEZY_CONFIG.STORE_ID || LEMONSQUEEZY_CONFIG.STORE_ID === 'test_store') {
      missingConfig.push('STORE_ID');
    }
    if (!LEMONSQUEEZY_CONFIG.PRODUCT_ID || LEMONSQUEEZY_CONFIG.PRODUCT_ID === 'test_product') {
      missingConfig.push('PRODUCT_ID');
    }

    if (missingConfig.length > 0) {
      // In development mode, just log a warning
      if (ENV_CONFIG.isDevelopment) {
        console.warn('[LICENSE] ⚠️ Missing configuration:', missingConfig.join(', '));
      } else {
        // In production, throw an error
        throw new Error(
          `LemonSqueezy configuration is incomplete. Missing: ${missingConfig.join(', ')}`,
        );
      }
    }

    // Log the configuration for debugging
    console.log('[LICENSE] 🔧 Validated configuration:', {
      api_endpoint: LEMONSQUEEZY_CONFIG.API_ENDPOINT,
      license_api_endpoint: LEMONSQUEEZY_CONFIG.LICENSE_API_ENDPOINT,
      store_id: LEMONSQUEEZY_CONFIG.STORE_ID,
      product_id: LEMONSQUEEZY_CONFIG.PRODUCT_ID,
      api_key_configured: !!LEMONSQUEEZY_CONFIG.API_KEY,
      api_key_length: LEMONSQUEEZY_CONFIG.API_KEY ? LEMONSQUEEZY_CONFIG.API_KEY.length : 0,
      isDevelopment: ENV_CONFIG.isDevelopment,
    });
  }

  private async validateLicense(
    licenseKey: string,
    uiReady: boolean = false,
  ): Promise<LemonSqueezyValidationResponse> {
    if (!uiReady) {
      throw new Error('UI is not ready to handle API requests');
    }

    const deviceInfo = await this.getDeviceInfo();

    // Creare il corpo della richiesta in formato x-www-form-urlencoded senza URLSearchParams
    let formData = '';
    formData += 'license_key=' + encodeURIComponent(licenseKey);
    formData += '&instance_identifier=' + encodeURIComponent(deviceInfo.identifier);

    // Aggiungere store_id e product_id se disponibili
    if (LEMONSQUEEZY_CONFIG.STORE_ID) {
      formData += '&store_id=' + encodeURIComponent(LEMONSQUEEZY_CONFIG.STORE_ID);
    }
    if (LEMONSQUEEZY_CONFIG.PRODUCT_ID) {
      formData += '&product_id=' + encodeURIComponent(LEMONSQUEEZY_CONFIG.PRODUCT_ID);
    }

    // Implementazione con fallback tra endpoint standard e alternativo
    let lastError: unknown = null;

    // Prima prova con l'endpoint standard
    try {
      console.log('[LICENSE] 🔄 Trying standard validation endpoint');
      return await this.makeRequest<LemonSqueezyValidationResponse>(
        '/validate',
        {
          method: 'POST',
          body: formData,
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            Accept: 'application/json',
          },
        },
        uiReady,
      );
    } catch (error) {
      console.warn('[LICENSE] ⚠️ Standard validation endpoint failed:', error);
      lastError = error;

      // Se abbiamo un endpoint alternativo configurato, proviamo quello
      if (LEMONSQUEEZY_CONFIG.LICENSE_API_ENDPOINT_ALT) {
        try {
          console.log('[LICENSE] 🔄 Trying alternative validation endpoint');

          // Costruisci l'URL completo per l'endpoint alternativo
          const altEndpoint = `${LEMONSQUEEZY_CONFIG.LICENSE_API_ENDPOINT_ALT}/validate`;

          // Prepara gli header
          const headers: Record<string, string> = {
            'Content-Type': 'application/x-www-form-urlencoded',
            Accept: 'application/json',
          };

          // Aggiungi l'header Authorization solo se API_KEY è definito
          if (LEMONSQUEEZY_CONFIG.API_KEY) {
            headers['Authorization'] = `Bearer ${LEMONSQUEEZY_CONFIG.API_KEY}`;
          }

          // Usa il metodo makeRequest invece di figma.ui.postMessage diretto
          return await this.makeRequest<LemonSqueezyValidationResponse>(
            altEndpoint,
            {
              method: 'POST',
              headers,
              body: formData,
            },
            uiReady,
          );
        } catch (altError) {
          console.error('[LICENSE] ❌ Alternative validation endpoint also failed:', altError);
          // Se anche l'endpoint alternativo fallisce, lanciamo l'errore originale
          throw lastError;
        }
      } else {
        // Se non abbiamo un endpoint alternativo, lanciamo l'errore originale
        throw lastError;
      }
    }
  }

  private async activateLicense(
    licenseKey: string,
    uiReady: boolean = false,
  ): Promise<LemonSqueezyActivationResponse> {
    if (!uiReady) {
      throw new Error('UI is not ready to handle API requests');
    }

    const deviceInfo = await this.getDeviceInfo();

    // Crea i dati del form senza URLSearchParams
    let formData = '';
    formData += 'license_key=' + encodeURIComponent(licenseKey);
    formData += '&instance_identifier=' + encodeURIComponent(deviceInfo.identifier);
    formData += '&instance_name=' + encodeURIComponent(deviceInfo.name);

    // Aggiungi store_id e product_id se disponibili
    if (LEMONSQUEEZY_CONFIG.STORE_ID) {
      formData += '&store_id=' + encodeURIComponent(LEMONSQUEEZY_CONFIG.STORE_ID);
    }
    if (LEMONSQUEEZY_CONFIG.PRODUCT_ID) {
      formData += '&product_id=' + encodeURIComponent(LEMONSQUEEZY_CONFIG.PRODUCT_ID);
    }

    try {
      // Log dei dati di attivazione (oscurati per sicurezza)
      console.log('[LICENSE] 🚀 Preparing activation request with payload:', {
        licenseKey: licenseKey ? `${licenseKey.substring(0, 5)}...` : 'missing',
        instanceName: deviceInfo.name,
        instanceIdentifier: deviceInfo.identifier
          ? `${deviceInfo.identifier.substring(0, 5)}...`
          : 'missing',
        storeId: LEMONSQUEEZY_CONFIG.STORE_ID,
        productId: LEMONSQUEEZY_CONFIG.PRODUCT_ID,
        apiKeyConfigured: !!LEMONSQUEEZY_CONFIG.API_KEY,
      });

      // Implementazione con fallback tra endpoint standard e alternativo
      let lastError: unknown = null;

      // Prima prova con l'endpoint standard
      try {
        console.log('[LICENSE] 🔄 Trying standard activation endpoint');
        return await this.makeRequest<LemonSqueezyActivationResponse>(
          '/activate',
          {
            method: 'POST',
            body: formData,
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
              Accept: 'application/json',
            },
          },
          uiReady,
        );
      } catch (error) {
        console.warn('[LICENSE] ⚠️ Standard endpoint failed:', error);
        lastError = error;

        // Se abbiamo un endpoint alternativo configurato, proviamo quello
        if (LEMONSQUEEZY_CONFIG.LICENSE_API_ENDPOINT_ALT) {
          try {
            console.log('[LICENSE] 🔄 Trying alternative activation endpoint');

            // Costruisci l'URL completo per l'endpoint alternativo
            const altEndpoint = `${LEMONSQUEEZY_CONFIG.LICENSE_API_ENDPOINT_ALT}/activate`;

            // Prepara gli header
            const headers: Record<string, string> = {
              'Content-Type': 'application/x-www-form-urlencoded',
              Accept: 'application/json',
            };

            // Aggiungi l'header Authorization solo se API_KEY è definito
            if (LEMONSQUEEZY_CONFIG.API_KEY) {
              headers['Authorization'] = `Bearer ${LEMONSQUEEZY_CONFIG.API_KEY}`;
            }

            // Usa il metodo makeRequest invece di figma.ui.postMessage diretto
            return await this.makeRequest<LemonSqueezyActivationResponse>(
              altEndpoint,
              {
                method: 'POST',
                headers,
                body: formData,
              },
              uiReady,
            );
          } catch (altError) {
            console.error('[LICENSE] ❌ Alternative endpoint also failed:', altError);
            // Se anche l'endpoint alternativo fallisce, lanciamo l'errore originale
            throw lastError;
          }
        } else {
          // Se non abbiamo un endpoint alternativo, lanciamo l'errore originale
          throw lastError;
        }
      }
    } catch (error) {
      console.error('[LICENSE] ❌ All activation attempts failed:', error);
      throw error;
    }
  }

  /**
   * Deactivate a license
   * @param licenseKey The license key to deactivate
   * @param instanceId The instance ID to deactivate
   * @returns A promise that resolves to the deactivation response
   */
  deactivateLicense(
    licenseKey: string,
    instanceId: string,
  ): Promise<LemonSqueezyDeactivationResponse> {
    // Crea i dati del form senza URLSearchParams
    let formData = '';
    formData += 'license_key=' + encodeURIComponent(licenseKey);
    formData += '&instance_id=' + encodeURIComponent(instanceId);

    // Implementazione con fallback tra endpoint standard e alternativo
    return new Promise((resolve, reject) => {
      let lastError: unknown = null;

      // Prima prova con l'endpoint standard
      this.makeRequest<LemonSqueezyDeactivationResponse>('/deactivate', {
        method: 'POST',
        body: formData,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Accept: 'application/json',
        },
      })
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          console.warn('[LICENSE] ⚠️ Standard deactivation endpoint failed:', error);
          lastError = error;

          // Se abbiamo un endpoint alternativo configurato, proviamo quello
          if (LEMONSQUEEZY_CONFIG.LICENSE_API_ENDPOINT_ALT) {
            // Costruisci l'URL completo per l'endpoint alternativo
            const altEndpoint = `${LEMONSQUEEZY_CONFIG.LICENSE_API_ENDPOINT_ALT}/deactivate`;
            console.log('[LICENSE] 🔄 Trying alternative deactivation endpoint');

            // Usa direttamente l'URL completo invece di passare solo il percorso relativo
            figma.ui.postMessage({
              type: 'API_REQUEST',
              payload: {
                url: altEndpoint,
                options: {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    Accept: 'application/json',
                    Authorization: LEMONSQUEEZY_CONFIG.API_KEY
                      ? `Bearer ${LEMONSQUEEZY_CONFIG.API_KEY}`
                      : undefined,
                  },
                  body: formData,
                },
              },
            });

            const timeout = setTimeout(() => {
              reject(new Error('API request timeout'));
            }, 30000);

            const handleResponse = (result: {
              success: boolean;
              data?: LemonSqueezyDeactivationResponse;
              error?: string;
            }) => {
              clearTimeout(timeout);
              console.log(
                '[DEBUG] 📡 Raw API response from alternative deactivation endpoint:',
                result,
              );

              if (result.success && result.data) {
                console.log('[LICENSE] ✅ Alternative deactivation endpoint succeeded');
                resolve(result.data);
              } else {
                console.error('[LICENSE] ❌ Alternative endpoint failed with error:', result.error);
                reject(new Error(result.error || 'API request failed'));
              }
            };

            on('API_RESPONSE', handleResponse);
          } else {
            // Se non abbiamo un endpoint alternativo, lanciamo l'errore originale
            reject(lastError);
          }
        });
    });
  }

  private isValidationResponse(response: unknown): response is LemonSqueezyValidationResponse {
    return (
      typeof response === 'object' &&
      response !== null &&
      'valid' in response &&
      'license_key' in response &&
      'meta' in response &&
      typeof response.license_key === 'object' &&
      response.license_key !== null &&
      'status' in response.license_key &&
      'key' in response.license_key
    );
  }

  private isActivationResponse(response: unknown): response is LemonSqueezyActivationResponse {
    return (
      typeof response === 'object' &&
      response !== null &&
      'success' in response &&
      'data' in response &&
      typeof response.data === 'object' &&
      response.data !== null &&
      'license' in response.data &&
      typeof response.data.license === 'object' &&
      response.data.license !== null &&
      'status' in response.data.license &&
      'key' in response.data.license
    );
  }

  private mapResponseToLicenseStatus(
    response: LemonSqueezyValidationResponse | LemonSqueezyActivationResponse,
  ): LicenseStatus {
    if (this.isValidationResponse(response)) {
      const licenseData = response.license_key;

      if (!licenseData) {
        return {
          tier: 'free',
          isValid: false,
          features: [],
          status: 'error',
          error: {
            code: 'INVALID_LICENSE',
            message: 'Invalid license key',
            actions: ['Please check your license key and try again'],
          },
        };
      }

      if (licenseData.status === 'active') {
        return {
          tier: 'premium',
          isValid: true,
          features: ['all'],
          status: 'success',
          lemonSqueezyStatus: licenseData.status,
          activationLimit: licenseData.activation_limit,
          activationsCount: licenseData.activation_usage,
          expiresAt: licenseData.expires_at || undefined,
          licenseKey: licenseData.key,
        };
      }

      return {
        tier: 'free',
        isValid: false,
        features: [],
        status: 'error',
        error: {
          code: 'INVALID_LICENSE',
          message: 'Invalid or inactive license',
          actions: ['Please check your license key and try again'],
        },
        lemonSqueezyStatus: licenseData.status,
      };
    }

    if (this.isActivationResponse(response)) {
      const licenseData = response.data.license;

      if (!licenseData || !licenseData.activated) {
        return {
          tier: 'free',
          isValid: false,
          features: [],
          status: 'error',
          error: {
            code: 'INVALID_LICENSE',
            message: 'License activation failed',
            actions: ['Please try again or contact support'],
          },
        };
      }

      return {
        tier: 'premium',
        isValid: true,
        features: licenseData.features || ['all'],
        status: 'success',
        activationLimit: licenseData.activation_limit,
        activationsCount: licenseData.activations_count,
        expiresAt: licenseData.expires_at,
        licenseKey: licenseData.key,
        instanceId: response.data.instance?.identifier,
      };
    }

    return {
      tier: 'free',
      isValid: false,
      features: [],
      status: 'error',
      error: {
        code: 'API_ERROR',
        message: 'Invalid response format from server',
        actions: ['Please try again later or contact support'],
      },
    };
  }

  public async handleValidate(
    licenseKey: string,
    uiReady: boolean = false,
  ): Promise<LicenseStatus> {
    try {
      if (this.validationInProgress) {
        throw {
          code: 'API_ERROR',
          message: 'License validation already in progress',
          actions: ['Please wait for the current validation to complete'],
        } as LemonSqueezyError;
      }

      this.validationInProgress = true;

      await this.validateConfiguration();
      await this.ensureValidConnection(uiReady);

      // Verifica se l'UI è pronta
      if (!uiReady) {
        throw new Error('UI is not ready to handle API requests');
      }

      const isValid = await this.validateWithCache(licenseKey, uiReady);
      if (!isValid) {
        throw {
          code: 'INVALID_LICENSE',
          message: 'License is not valid',
          actions: ['Please check your license key and try again'],
        } as LemonSqueezyError;
      }

      return this.lastValidationResult!;
    } catch (error) {
      console.error('License validation error:', error);
      throw this.handleError(error);
    } finally {
      this.validationInProgress = false;
    }
  }

  public async handleActivate(
    licenseKey: string,
    uiReady: boolean = false,
  ): Promise<LicenseStatus> {
    const activationStart = Date.now();
    console.log('[LICENSE] 🚀 Starting activation process for key:', licenseKey);

    try {
      if (this.activationInProgress) {
        console.log('[LICENSE] ⚠️ Activation already in progress');
        throw {
          code: 'API_ERROR',
          message: 'License activation already in progress',
          actions: ['Please wait for the current activation to complete'],
        } as LemonSqueezyError;
      }

      this.activationInProgress = true;

      // Verifica della configurazione
      try {
        await this.validateConfiguration();
      } catch (configError) {
        console.error('[LICENSE] ❌ Configuration validation failed:', configError);
        throw {
          code: 'CONFIG_ERROR',
          message: 'License service is not properly configured',
          actions: ['Contact support'],
        } as LemonSqueezyError;
      }

      // Verifica della connessione
      try {
        await this.ensureValidConnection(uiReady);
      } catch (connectionError) {
        console.error('[LICENSE] ❌ Connection validation failed:', connectionError);
        throw {
          code: 'CONNECTION_ERROR',
          message: 'Could not connect to license service',
          actions: ['Check your internet connection and try again'],
        } as LemonSqueezyError;
      }

      // Verifica del rate limit
      try {
        await this.checkRateLimit(licenseKey);
      } catch (rateLimitError) {
        console.error('[LICENSE] ❌ Rate limit check failed:', rateLimitError);
        throw rateLimitError;
      }

      // Prima validiamo la licenza
      let validationResult: LicenseStatus | null = null;
      try {
        validationResult = await this.handleValidate(licenseKey, uiReady);
        console.log('[LICENSE] 🔍 Validation result:', validationResult);

        // Se la licenza è già valida e attivata su questo dispositivo, restituiamo lo stato corrente
        if (validationResult.isValid) {
          console.log('[LICENSE] ✅ License is already valid, returning current status');
          return {
            ...validationResult,
            status: 'success',
          };
        }
      } catch (validationError) {
        // Ignoriamo l'errore di validazione e procediamo con l'attivazione
        console.log(
          '[LICENSE] ⚠️ Validation failed, proceeding with activation anyway:',
          validationError,
        );
      }

      // Attivazione della licenza
      console.log('[LICENSE] 🔑 Proceeding with license activation');
      const activationResponse = await this.activateLicense(licenseKey, uiReady);
      console.log('[LICENSE] ✅ Activation response received:', activationResponse);

      const status = this.mapResponseToLicenseStatus(activationResponse);
      console.log('[LICENSE] 📊 Mapped license status:', status);

      if (status.isValid) {
        console.log('[LICENSE] ✅ License activated successfully, saving to storage');
        await figma.clientStorage.setAsync(STORAGE_KEYS.LICENSE_KEY, licenseKey);
        this.lastValidationResult = status;
        this.lastValidationTime = Date.now();
      } else {
        console.log('[LICENSE] ⚠️ License activation did not result in a valid license');
      }

      return {
        ...status,
        status: 'success',
      };
    } catch (error) {
      console.error('[LICENSE] ❌ Activation error:', {
        error,
        licenseKey: licenseKey ? `${licenseKey.substring(0, 5)}...` : 'missing',
        duration: Date.now() - activationStart,
      });

      throw this.handleError(error);
    } finally {
      this.activationInProgress = false;
    }
  }

  private async checkRateLimit(licenseKey: string): Promise<boolean> {
    const attempts = this.activationAttempts.get(licenseKey) || 0;

    if (attempts >= this.MAX_ATTEMPTS) {
      throw {
        code: 'API_ERROR',
        message: 'Too many activation attempts',
        actions: [
          'Wait for an hour before trying again',
          'Contact support if you need immediate assistance',
        ],
      } as LemonSqueezyError;
    }

    this.activationAttempts.set(licenseKey, attempts + 1);
    setTimeout(() => this.activationAttempts.delete(licenseKey), this.ATTEMPT_WINDOW);

    return true;
  }

  private handleError(error: unknown): LemonSqueezyError {
    if (typeof error === 'object' && error !== null && 'code' in error) {
      return error as LemonSqueezyError;
    }

    return {
      code: 'API_ERROR',
      message: error instanceof Error ? error.message : 'Unknown error occurred',
      actions: ['Please try again later or contact support if the issue persists'],
    };
  }

  public async handleDeactivation(): Promise<void> {
    this.lastValidationTime = 0;
    this.lastValidationResult = null;
    this.activationAttempts.clear();
    this.connectionTestCache = null;

    await figma.clientStorage.deleteAsync(STORAGE_KEYS.DEVICE_ID);
    await figma.clientStorage.deleteAsync(STORAGE_KEYS.LICENSE_KEY);
  }

  /**
   * Test the license activation endpoint directly
   * This is a diagnostic method to help troubleshoot activation issues
   */
  public async testActivationEndpoint(uiReady: boolean = false): Promise<void> {
    try {
      console.log('[LICENSE] 🧪 Testing activation endpoint');

      if (!uiReady) {
        console.log('[LICENSE] ⚠️ UI is not ready, skipping activation endpoint test');
        return;
      }

      // Invia una richiesta di test all'UI
      figma.ui.postMessage({
        type: 'API_REQUEST',
        payload: {
          url: 'https://api.lemonsqueezy.com/v1/licenses/activate',
          options: {
            method: 'HEAD',
            headers: {
              Accept: 'application/json',
            },
          },
        },
      });

      console.log('[LICENSE] 🧪 Activation endpoint test request sent to UI');
    } catch (error) {
      console.error('[LICENSE] 🧪 Activation endpoint test failed:', error);
    }
  }

  /**
   * Test the license activation process with different endpoint formats
   * This is a diagnostic method to help troubleshoot activation issues
   * @param licenseKey The license key to test
   * @param uiReady Whether the UI is ready to handle API requests
   */
  public async testLicenseActivation(licenseKey: string, uiReady: boolean = false): Promise<void> {
    try {
      console.log('[LICENSE] 🧪 Testing license activation with different endpoint formats');

      // First, check if we have the required configuration
      if (!licenseKey) {
        console.error('[LICENSE] 🧪 No license key provided for test');
        return;
      }

      if (!LEMONSQUEEZY_CONFIG.API_KEY || LEMONSQUEEZY_CONFIG.API_KEY === 'test_key') {
        console.error('[LICENSE] 🧪 No valid API key configured for test');
        return;
      }

      const deviceInfo = await this.getDeviceInfo();
      console.log('[LICENSE] 🧪 Device info for test:', {
        identifier: deviceInfo.identifier
          ? `${deviceInfo.identifier.substring(0, 5)}...`
          : 'missing',
        name: deviceInfo.name,
      });

      // Create the form data for the activation request without URLSearchParams
      let formData = '';
      formData += 'license_key=' + encodeURIComponent(licenseKey);
      formData += '&instance_identifier=' + encodeURIComponent(deviceInfo.identifier);
      formData += '&instance_name=' + encodeURIComponent(deviceInfo.name);

      // Add store_id and product_id if available
      if (LEMONSQUEEZY_CONFIG.STORE_ID) {
        formData += '&store_id=' + encodeURIComponent(LEMONSQUEEZY_CONFIG.STORE_ID);
      }
      if (LEMONSQUEEZY_CONFIG.PRODUCT_ID) {
        formData += '&product_id=' + encodeURIComponent(LEMONSQUEEZY_CONFIG.PRODUCT_ID);
      }

      const requestBody = formData;
      console.log('[LICENSE] 🧪 Test request body:', requestBody);

      // Test different endpoint formats
      const endpoints = [
        {
          name: 'Direct CORS proxy URL',
          url: 'https://api-cors-anywhere.lemonsqueezy.com/v1/licenses/activate',
        },
        {
          name: 'Direct API URL',
          url: 'https://api.lemonsqueezy.com/v1/licenses/activate',
        },
        {
          name: 'Config LICENSE_API_ENDPOINT with /activate',
          url: `${LEMONSQUEEZY_CONFIG.LICENSE_API_ENDPOINT}/activate`,
        },
        {
          name: 'Config LICENSE_API_ENDPOINT with activate (no slash)',
          url: `${LEMONSQUEEZY_CONFIG.LICENSE_API_ENDPOINT}activate`,
        },
      ];

      let successfulEndpoints = 0;
      let failedEndpoints = 0;

      for (const endpoint of endpoints) {
        console.log(`[LICENSE] 🧪 Testing endpoint: ${endpoint.name} - ${endpoint.url}`);

        try {
          // Make a direct fetch request to test the endpoint
          const response = await fetch(endpoint.url, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
              Accept: 'application/json',
              Authorization: `Bearer ${LEMONSQUEEZY_CONFIG.API_KEY}`,
            },
            body: this.stringToUint8Array(requestBody),
          });

          console.log(`[LICENSE] 🧪 ${endpoint.name} response:`, {
            status: response.status,
            statusText: response.statusText,
          });

          // Try to parse the response
          try {
            const text = await response.text();
            console.log(`[LICENSE] 🧪 ${endpoint.name} response text:`, text);

            try {
              const json = JSON.parse(text);
              console.log(`[LICENSE] 🧪 ${endpoint.name} parsed JSON:`, json);

              // Check if the response indicates success
              if (json.success === true || json.valid === true) {
                console.log(`[LICENSE] 🧪 ${endpoint.name} SUCCESSFUL ACTIVATION!`);
                successfulEndpoints++;
              } else {
                console.log(`[LICENSE] 🧪 ${endpoint.name} activation failed:`, json);
                failedEndpoints++;
              }
            } catch (jsonError) {
              console.log(`[LICENSE] 🧪 ${endpoint.name} is not JSON:`, jsonError);
              failedEndpoints++;
            }
          } catch (textError) {
            console.log(`[LICENSE] 🧪 ${endpoint.name} could not get text:`, textError);
            failedEndpoints++;
          }
        } catch (endpointError) {
          console.error(`[LICENSE] 🧪 ${endpoint.name} test failed:`, endpointError);
          failedEndpoints++;
        }
      }

      console.log('[LICENSE] 🧪 Activation test summary:', {
        successfulEndpoints,
        failedEndpoints,
        totalTested: endpoints.length,
      });

      // Test using our makeRequest method
      console.log('[LICENSE] 🧪 Testing with makeRequest method');
      try {
        const activationResponse = await this.activateLicense(licenseKey, uiReady);
        console.log('[LICENSE] 🧪 makeRequest test succeeded:', activationResponse);

        // If we get here, the activation was successful
        console.log('[LICENSE] 🧪 ACTIVATION SUCCESSFUL with makeRequest method!');
      } catch (makeRequestError) {
        console.error('[LICENSE] 🧪 makeRequest test failed:', makeRequestError);
      }

      console.log('[LICENSE] 🧪 License activation test completed');
    } catch (error) {
      console.error('[LICENSE] 🧪 License activation test failed:', error);
    }
  }

  // Helper function to convert string to Uint8Array for Figma's fetch
  private stringToUint8Array(str: string): Uint8Array {
    const encoder = new TextEncoder();
    return encoder.encode(str);
  }

  /**
   * Check the configuration without throwing errors
   * This is used during initialization to log warnings but not break the plugin
   */
  private checkConfigurationSafely(): void {
    try {
      // Check if the configuration is valid
      if (!LEMONSQUEEZY_CONFIG.API_KEY || LEMONSQUEEZY_CONFIG.API_KEY === 'test_key') {
        console.warn('[LICENSE] ⚠️ LemonSqueezy API key is not properly configured');
      }
      if (!LEMONSQUEEZY_CONFIG.STORE_ID || LEMONSQUEEZY_CONFIG.STORE_ID === 'test_store') {
        console.warn('[LICENSE] ⚠️ LemonSqueezy store ID is not properly configured');
      }
      if (!LEMONSQUEEZY_CONFIG.PRODUCT_ID || LEMONSQUEEZY_CONFIG.PRODUCT_ID === 'test_product') {
        console.warn('[LICENSE] ⚠️ LemonSqueezy product ID is not properly configured');
      }

      // Log the configuration for debugging
      console.log('[LICENSE] 🔧 Current configuration:', {
        api_endpoint: LEMONSQUEEZY_CONFIG.API_ENDPOINT,
        license_api_endpoint: LEMONSQUEEZY_CONFIG.LICENSE_API_ENDPOINT,
        store_id: LEMONSQUEEZY_CONFIG.STORE_ID,
        product_id: LEMONSQUEEZY_CONFIG.PRODUCT_ID,
        api_key_configured: !!LEMONSQUEEZY_CONFIG.API_KEY,
        api_key_length: LEMONSQUEEZY_CONFIG.API_KEY ? LEMONSQUEEZY_CONFIG.API_KEY.length : 0,
        isDevelopment: ENV_CONFIG.isDevelopment,
      });
    } catch (error) {
      console.error('[LICENSE] ❌ Error checking configuration:', error);
    }
  }
}

export const licenseService = LicenseService.getInstance();
