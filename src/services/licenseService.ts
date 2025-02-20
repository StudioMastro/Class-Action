import { LEMONSQUEEZY_CONFIG, LemonSqueezyResponse } from '../config/lemonSqueezy';
import type { LicenseStatus } from '../types/license';

export class LicenseService {
  private static instance: LicenseService;
  private apiKey: string;

  private constructor() {
    if (!LEMONSQUEEZY_CONFIG.API_KEY) {
      throw new Error('LemonSqueezy API key is not configured');
    }
    this.apiKey = LEMONSQUEEZY_CONFIG.API_KEY;
  }

  public static getInstance(): LicenseService {
    if (!LicenseService.instance) {
      LicenseService.instance = new LicenseService();
    }
    return LicenseService.instance;
  }

  private async makeRequest(endpoint: string, options: RequestInit): Promise<LemonSqueezyResponse> {
    try {
      const response = await fetch(`${LEMONSQUEEZY_CONFIG.LICENSE_API_ENDPOINT}${endpoint}`, {
        ...options,
        headers: {
          Authorization: `Bearer ${this.apiKey}`,
          Accept: 'application/json',
          'Content-Type': 'application/json',
          ...options.headers,
        },
      });

      const data = (await response.json()) as LemonSqueezyResponse;

      if (!response.ok) {
        if (data.error?.includes('activation limit')) {
          // Se la licenza ha raggiunto il limite di attivazioni, restituiamo un errore specifico
          return {
            success: false,
            error: 'License has reached its activation limit',
            license: {
              status: 'inactive',
              key:
                options.body && typeof options.body === 'string'
                  ? JSON.parse(options.body).license_key
                  : '',
              activation_limit: 1,
              activations_count: 1,
            },
          };
        }
        throw new Error(data.error || 'License API request failed');
      }

      return data;
    } catch (error) {
      console.error('License API error:', error);
      throw error;
    }
  }

  public async activateLicense(licenseKey: string): Promise<LicenseStatus> {
    try {
      const response = await this.makeRequest('/activate', {
        method: 'POST',
        body: JSON.stringify({
          license_key: licenseKey,
          instance_name: 'Figma Plugin - Class Action',
          store_id: LEMONSQUEEZY_CONFIG.STORE_ID,
          product_id: LEMONSQUEEZY_CONFIG.PRODUCT_ID,
        }),
      });

      return this.mapResponseToLicenseStatus(response);
    } catch (error) {
      if (error instanceof Error && error.message.includes('activation limit')) {
        // Se la licenza ha raggiunto il limite di attivazioni, la consideriamo NON valida
        return {
          tier: 'free',
          isValid: false,
          features: [],
        };
      }
      console.error('License activation error:', error);
      return this.getDefaultLicenseStatus();
    }
  }

  public async validateLicense(licenseKey: string): Promise<LicenseStatus> {
    try {
      // Prima proviamo ad attivare la licenza
      const activationResult = await this.activateLicense(licenseKey);
      if (activationResult.isValid) {
        return activationResult;
      }

      // Se l'attivazione fallisce, proviamo a validare
      const response = await this.makeRequest('/validate', {
        method: 'POST',
        body: JSON.stringify({
          license_key: licenseKey,
          store_id: LEMONSQUEEZY_CONFIG.STORE_ID,
          product_id: LEMONSQUEEZY_CONFIG.PRODUCT_ID,
        }),
      });

      return this.mapResponseToLicenseStatus(response);
    } catch (error) {
      if (error instanceof Error && error.message.includes('activation limit')) {
        // Se la licenza ha raggiunto il limite di attivazioni, la consideriamo NON valida
        return {
          tier: 'free',
          isValid: false,
          features: [],
        };
      }
      console.error('License validation error:', error);
      return this.getDefaultLicenseStatus();
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
    };
  }
}

export const licenseService = LicenseService.getInstance();
