import { LEMONSQUEEZY_CONFIG, LemonSqueezyResponse } from '../config/lemonSqueezy';
import type { LicenseStatus, LicenseError } from '../types/license';

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
  private activationAttempts = new Map<string, number>();

  private constructor() {
    if (!LEMONSQUEEZY_CONFIG.API_KEY) {
      throw new Error('LemonSqueezy API key is not configured');
    }
  }

  public static getInstance(): LicenseService {
    if (!LicenseService.instance) {
      LicenseService.instance = new LicenseService();
    }
    return LicenseService.instance;
  }

  private async getDeviceInfo(): Promise<DeviceInfo> {
    // Generate a unique identifier for this Figma plugin instance
    const identifier = await this.generateDeviceIdentifier();

    return {
      name: 'Figma Plugin - Class Action',
      identifier,
      timestamp: new Date().toISOString(),
      platform: 'Figma Plugin',
      version: '1.0.0', // TODO: Get this from package.json
    };
  }

  private async generateDeviceIdentifier(): Promise<string> {
    try {
      // Check if we already have a stored device ID
      const storedId = await figma.clientStorage.getAsync(STORAGE_KEYS.DEVICE_ID);
      if (storedId) {
        return storedId;
      }

      // If no stored ID, generate a new one
      const timestamp = Date.now();
      const random = Math.random().toString(36).substring(2, 15);
      const newId = `${timestamp}-${random}`;

      // Store the new ID
      await figma.clientStorage.setAsync(STORAGE_KEYS.DEVICE_ID, newId);
      return newId;
    } catch (error) {
      console.error('Error managing device identifier:', error);
      return `fallback-${Date.now()}`;
    }
  }

  private async checkRateLimit(licenseKey: string): Promise<boolean> {
    const attempts = this.activationAttempts.get(licenseKey) || 0;

    if (attempts >= this.MAX_ATTEMPTS) {
      const error: LicenseError = {
        code: 'API_ERROR',
        message: 'Too many activation attempts. Please try again later.',
        actions: [
          'Wait for an hour before trying again',
          'Contact support if you need immediate assistance',
        ],
      };
      throw error;
    }

    this.activationAttempts.set(licenseKey, attempts + 1);
    setTimeout(() => this.activationAttempts.delete(licenseKey), this.ATTEMPT_WINDOW);

    return true;
  }

  private async logActivationAttempt(
    licenseKey: string,
    result: 'success' | 'failure',
    reason?: string,
  ) {
    try {
      const deviceInfo = await this.getDeviceInfo();
      console.log('Activation attempt:', {
        license_key: licenseKey,
        event: 'activation_attempt',
        result,
        reason,
        device_info: deviceInfo,
        timestamp: new Date().toISOString(),
      });
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error('Failed to log activation attempt:', error.message);
      } else {
        console.error('Failed to log activation attempt:', error);
      }
    }
  }

  private async makeRequest(
    endpoint: string,
    options: RequestInit = {},
  ): Promise<LemonSqueezyResponse> {
    try {
      const url = `${LEMONSQUEEZY_CONFIG.LICENSE_API_ENDPOINT}${endpoint}`;
      console.log(`Making request to ${url}`);

      const response = await fetch(url, {
        ...options,
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: `Bearer ${LEMONSQUEEZY_CONFIG.API_KEY}`,
          ...options.headers,
        },
      });

      if (!response.ok) {
        // Handle HTTP errors
        const errorText = await response.text();
        console.error('API Error Response:', {
          status: response.status,
          statusText: response.statusText,
          body: errorText,
        });

        // Try to parse error response as JSON
        let errorData;
        try {
          errorData = JSON.parse(errorText);
        } catch {
          errorData = { error: errorText };
        }

        // Handle specific error cases
        if (response.status === 500) {
          throw {
            code: 'API_ERROR',
            message: 'The license server is currently unavailable. Please try again later.',
            actions: ['Wait a few minutes and try again', 'Contact support if the issue persists'],
          } as LicenseError;
        }

        if (response.status === 403 || response.status === 401) {
          throw {
            code: 'API_ERROR',
            message: 'Invalid API key or unauthorized access.',
            actions: [
              'Verify your license key is correct',
              'Contact support if the issue persists',
            ],
          } as LicenseError;
        }

        // Check for activation limit error in the response
        const isActivationLimitError =
          errorData.error &&
          typeof errorData.error === 'string' &&
          (errorData.error.toLowerCase().includes('activation limit') ||
            errorData.error.toLowerCase().includes('already active'));

        if (isActivationLimitError) {
          throw {
            code: 'ACTIVATION_LIMIT_REACHED',
            message: 'This license is already active on another device.',
            actions: [
              'Visit your LemonSqueezy dashboard to manage your license activations',
              'You can deactivate the license from other devices',
              'Or purchase an additional license for this device',
            ],
            managementUrl: 'https://app.lemonsqueezy.com/my-orders',
          } as LicenseError;
        }

        // Generic error handling
        throw {
          code: 'API_ERROR',
          message: errorData.error || 'An error occurred while processing your request',
          actions: ['Please try again later or contact support if the issue persists'],
        } as LicenseError;
      }

      const data = (await response.json()) as LemonSqueezyResponse;
      console.log('API Response:', data);
      return data;
    } catch (err) {
      console.error('Request error:', err);

      // If the error is already a LicenseError, propagate it
      if (typeof err === 'object' && err !== null && 'code' in err) {
        throw err;
      }

      // Network or parsing errors
      throw {
        code: 'API_ERROR',
        message: err instanceof Error ? err.message : 'An unknown error occurred',
        actions: [
          'Check your internet connection',
          'Try again later',
          'Contact support if the issue persists',
        ],
      } as LicenseError;
    }
  }

  public async activateLicense(licenseKey: string): Promise<LicenseStatus> {
    try {
      await this.checkRateLimit(licenseKey);
      const deviceInfo = await this.getDeviceInfo();

      // Esegui la validazione e l'attivazione in una singola transazione
      const activationResponse = await this.makeRequest('/activate', {
        method: 'POST',
        body: JSON.stringify({
          license_key: licenseKey,
          instance_name: deviceInfo.name,
          instance_identifier: deviceInfo.identifier,
          store_id: LEMONSQUEEZY_CONFIG.STORE_ID,
          product_id: LEMONSQUEEZY_CONFIG.PRODUCT_ID,
          metadata: deviceInfo,
        }),
      });

      // Se l'attivazione fallisce per limite raggiunto, verifica se è già attiva su questo dispositivo
      if (
        !activationResponse.success &&
        activationResponse.error?.toLowerCase().includes('activation limit')
      ) {
        const validationStatus = await this.validateLicense(licenseKey);
        if (
          validationStatus.isValid &&
          validationStatus.error?.code === 'ACTIVATION_LIMIT_REACHED'
        ) {
          return validationStatus;
        }
        throw {
          code: 'ACTIVATION_LIMIT_REACHED',
          message: 'This license is already active on another device.',
          actions: [
            'Visit your LemonSqueezy dashboard to manage your license activations',
            'You can deactivate the license from other devices',
            'Or purchase an additional license for this device',
          ],
          managementUrl: 'https://app.lemonsqueezy.com/my-orders',
        } as LicenseError;
      }

      await this.logActivationAttempt(licenseKey, 'success');
      return this.mapResponseToLicenseStatus(activationResponse);
    } catch (err) {
      console.error('License activation error:', err);
      await this.logActivationAttempt(
        licenseKey,
        'failure',
        err instanceof Error ? err.message : String(err),
      );

      const error = err as LicenseError;
      return {
        tier: 'free',
        isValid: false,
        features: [],
        error: {
          code: error.code || 'API_ERROR',
          message: error.message || 'Failed to activate license',
          actions: error.actions || ['Please try again later'],
          managementUrl: error.managementUrl,
        },
        status: 'error',
      };
    }
  }

  public async validateLicense(licenseKey: string): Promise<LicenseStatus> {
    try {
      const deviceInfo = await this.getDeviceInfo();

      const validationResponse = await this.makeRequest('/validate', {
        method: 'POST',
        body: JSON.stringify({
          license_key: licenseKey,
          store_id: LEMONSQUEEZY_CONFIG.STORE_ID,
          product_id: LEMONSQUEEZY_CONFIG.PRODUCT_ID,
          instance_identifier: deviceInfo.identifier,
        }),
      });

      // Se la licenza è valida ma già attivata su questo dispositivo
      if (
        validationResponse.success &&
        validationResponse.license?.status === 'active' &&
        validationResponse.instance?.identifier === deviceInfo.identifier
      ) {
        return this.mapResponseToLicenseStatus(validationResponse);
      }

      // Se la licenza è valida ma attivata su un altro dispositivo
      if (
        validationResponse.success &&
        validationResponse.license?.status === 'active' &&
        validationResponse.instance?.identifier !== deviceInfo.identifier
      ) {
        throw {
          code: 'ACTIVATION_LIMIT_REACHED',
          message: 'This license is already active on another device.',
          actions: [
            'Visit your LemonSqueezy dashboard to manage your license activations',
            'You can deactivate the license from other devices',
            'Or purchase an additional license for this device',
          ],
          managementUrl: 'https://app.lemonsqueezy.com/my-orders',
        } as LicenseError;
      }

      return this.mapResponseToLicenseStatus(validationResponse);
    } catch (err) {
      console.error('License validation error:', err);
      const error = err as LicenseError;
      return {
        tier: 'free',
        isValid: false,
        features: [],
        error: {
          code: error.code || 'API_ERROR',
          message: error.message || 'Failed to validate license',
          actions: error.actions || ['Please try again later'],
          managementUrl: error.managementUrl,
        },
        status: 'error',
      };
    }
  }

  public async deactivateLicense(licenseKey: string): Promise<boolean> {
    try {
      const response = await this.makeRequest('/deactivate', {
        method: 'POST',
        body: JSON.stringify({
          license_key: licenseKey,
          store_id: LEMONSQUEEZY_CONFIG.STORE_ID,
          product_id: LEMONSQUEEZY_CONFIG.PRODUCT_ID,
        }),
      });

      return response.success;
    } catch (error) {
      console.error('License deactivation error:', error);
      return false;
    }
  }

  private getDefaultLicenseStatus(): LicenseStatus {
    return {
      tier: 'free',
      isValid: false,
      features: [],
      licenseKey: undefined,
      status: 'idle',
    };
  }

  private mapResponseToLicenseStatus(response: LemonSqueezyResponse): LicenseStatus {
    if (!response.success || !response.license) {
      return this.getDefaultLicenseStatus();
    }

    const premiumFeatures = [
      'import-export',
      'apply-all',
      'unlimited-classes',
      'advanced-search',
      'auto-backup',
    ];

    return {
      tier: response.license.status === 'active' ? 'premium' : 'free',
      isValid: response.license.status === 'active',
      expiresAt: response.license.expires_at,
      features: response.license.status === 'active' ? premiumFeatures : [],
      licenseKey: response.license.key,
      status: 'idle',
    };
  }
}

export const licenseService = LicenseService.getInstance();
