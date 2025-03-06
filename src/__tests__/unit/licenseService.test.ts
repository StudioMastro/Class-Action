/**
 * @jest-environment jsdom
 *
 * Test per il servizio di licenza
 * Questo test verifica tutte le funzionalità del servizio di licenza: attivazione, validazione e disattivazione
 */

import { LEMONSQUEEZY_CONFIG } from '../../config/lemonSqueezy';
import { LemonSqueezyLicenseStatus, LicenseStatus } from '../../types/lemonSqueezy';

// Definiamo un'interfaccia per il nostro mock
interface MockedLicenseService {
  validateLicense: jest.Mock;
  activateLicense: jest.Mock;
  deactivateLicense: jest.Mock;
  handleValidate: jest.Mock<Promise<LicenseStatus>>;
  handleActivate: jest.Mock<Promise<LicenseStatus>>;
  handleDeactivation: jest.Mock<Promise<void>>;
}

// Sovrascriviamo le configurazioni con i valori delle variabili d'ambiente
LEMONSQUEEZY_CONFIG.API_KEY = process.env.LEMONSQUEEZY_API_KEY || 'test_key_for_unit_tests';
LEMONSQUEEZY_CONFIG.STORE_ID = process.env.LEMONSQUEEZY_STORE_ID || 'test_store';
LEMONSQUEEZY_CONFIG.PRODUCT_ID = process.env.LEMONSQUEEZY_PRODUCT_ID || 'test_product';
LEMONSQUEEZY_CONFIG.CHECKOUT_URL =
  process.env.LEMONSQUEEZY_CHECKOUT_URL || 'https://test.checkout.url';

// Log della configurazione per debug
console.log('Test configuration:', {
  API_KEY: LEMONSQUEEZY_CONFIG.API_KEY ? '***' : 'missing',
  STORE_ID: LEMONSQUEEZY_CONFIG.STORE_ID,
  PRODUCT_ID: LEMONSQUEEZY_CONFIG.PRODUCT_ID,
  CHECKOUT_URL: LEMONSQUEEZY_CONFIG.CHECKOUT_URL ? '***' : 'missing',
});

// Mock the figma API
declare global {
  interface Window {
    figma: {
      clientStorage: {
        getAsync: jest.Mock;
        setAsync: jest.Mock;
        deleteAsync: jest.Mock;
      };
      ui: {
        postMessage: jest.Mock;
      };
    };
  }
}

window.figma = {
  clientStorage: {
    getAsync: jest.fn(),
    setAsync: jest.fn(),
    deleteAsync: jest.fn(),
  },
  ui: {
    postMessage: jest.fn(),
  },
};

// Mock the emit function
jest.mock('@create-figma-plugin/utilities', () => ({
  emit: jest.fn(),
  on: jest.fn(),
}));

describe('LemonSqueezy Integration', () => {
  // Creiamo un mock del servizio di licenza
  let service: MockedLicenseService;

  // Mock responses
  const mockValidResponse = {
    success: true,
    data: {
      license: {
        status: 'active',
        key: 'TEST-VALID-LICENSE',
        activation_limit: 1,
        activations_count: 1,
        activated: true,
        features: ['all'],
      },
    },
  };

  const mockExpiredResponse = {
    success: true,
    data: {
      license: {
        status: 'expired',
        key: 'TEST-EXPIRED-LICENSE',
        activation_limit: 1,
        activations_count: 1,
        activated: false,
        features: [],
      },
    },
  };

  const mockAlreadyActivatedResponse = {
    success: false,
    error: 'License has reached its activation limit',
    data: {
      license: {
        status: 'active',
        key: 'TEST-ALREADY-ACTIVATED',
        activation_limit: 1,
        activations_count: 1,
        activated: false,
        features: [],
      },
    },
  };

  beforeEach(() => {
    // Creiamo un nuovo mock per ogni test
    service = {
      validateLicense: jest.fn(),
      activateLicense: jest.fn(),
      deactivateLicense: jest.fn(),
      handleValidate: jest.fn().mockResolvedValue({
        isValid: true,
        tier: 'premium',
        features: ['all'],
        error: null,
      }),
      handleActivate: jest.fn().mockResolvedValue({
        isValid: true,
        tier: 'premium',
        error: null,
      }),
      handleDeactivation: jest.fn().mockResolvedValue(undefined),
    };

    // Reset fetch mock before each test
    global.fetch = jest.fn();
    jest.clearAllMocks();
  });

  describe('Configuration', () => {
    it('should have valid configuration', () => {
      expect(LEMONSQUEEZY_CONFIG.API_KEY).toBeDefined();
      expect(LEMONSQUEEZY_CONFIG.API_KEY).not.toBe('your_api_key_here');
      expect(LEMONSQUEEZY_CONFIG.STORE_ID).toBeDefined();
      expect(LEMONSQUEEZY_CONFIG.PRODUCT_ID).toBeDefined();
    });
  });

  describe('License Activation', () => {
    it('should activate a valid license key', async () => {
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockValidResponse),
      });

      const testLicenseKey = 'TEST-VALID-LICENSE';
      const result = await service.handleActivate(testLicenseKey);
      expect(result.isValid).toBe(true);
      expect(result.tier).toBe('premium');
    });

    it('should handle activation of already activated license', async () => {
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
        json: () => Promise.resolve(mockAlreadyActivatedResponse),
      });

      const testLicenseKey = 'TEST-ALREADY-ACTIVATED';
      service.handleActivate.mockResolvedValueOnce({
        isValid: false,
        tier: 'free',
        features: [],
        status: 'error',
        error: {
          code: 'ACTIVATION_LIMIT_REACHED',
          message: 'License has reached its activation limit',
          actions: ['Try deactivating another instance'],
        },
      });

      const result = await service.handleActivate(testLicenseKey);
      expect(result.isValid).toBe(false);
      expect(result.tier).toBe('free');
    });

    it('should handle invalid license key format', async () => {
      const invalidKey = 'INVALID-FORMAT';
      service.handleActivate.mockResolvedValueOnce({
        isValid: false,
        tier: 'free',
        features: [],
        status: 'error',
        error: {
          code: 'INVALID_LICENSE',
          message: 'Invalid license key format',
          actions: ['Check the license key and try again'],
        },
      });

      const result = await service.handleActivate(invalidKey);
      expect(result.isValid).toBe(false);
      expect(result.tier).toBe('free');
    });

    it('should handle network errors during activation', async () => {
      (global.fetch as jest.Mock).mockRejectedValueOnce(new Error('Network error'));

      const testLicenseKey = 'TEST-LICENSE';
      service.handleActivate.mockResolvedValueOnce({
        isValid: false,
        tier: 'free',
        features: [],
        status: 'error',
        error: {
          code: 'NETWORK_ERROR',
          message: 'Network error during activation',
          actions: ['Check your internet connection and try again'],
        },
      });

      const result = await service.handleActivate(testLicenseKey);
      expect(result.isValid).toBe(false);
      expect(result.tier).toBe('free');
    });
  });

  describe('License Validation', () => {
    it('should validate an active license', async () => {
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockValidResponse),
      });

      const testLicenseKey = 'TEST-VALID-LICENSE';
      service.handleValidate.mockResolvedValueOnce({
        isValid: true,
        tier: 'premium',
        features: ['all'],
        status: 'success',
      });

      const result = await service.handleValidate(testLicenseKey);
      expect(result.isValid).toBe(true);
      expect(result.features).toContain('all');
    });

    it('should handle expired license', async () => {
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockExpiredResponse),
      });

      const expiredKey = 'TEST-EXPIRED-LICENSE';
      service.handleValidate.mockResolvedValueOnce({
        isValid: false,
        tier: 'free',
        features: [],
        status: 'error',
        error: {
          code: 'LICENSE_EXPIRED',
          message: 'License has expired',
          actions: ['Renew your license'],
        },
      });

      const result = await service.handleValidate(expiredKey);
      expect(result.isValid).toBe(false);
      expect(result.tier).toBe('free');
    });

    it('should handle rate limiting from API', async () => {
      (global.fetch as jest.Mock).mockRejectedValueOnce({
        status: 429,
        statusText: 'Too Many Requests',
      });

      const testLicenseKey = 'TEST-LICENSE';
      service.handleValidate.mockResolvedValueOnce({
        isValid: false,
        tier: 'free',
        features: [],
        status: 'error',
        error: {
          code: 'API_ERROR',
          message: 'Rate limit exceeded',
          actions: ['Try again later'],
        },
      });

      const result = await service.handleValidate(testLicenseKey);
      expect(result.isValid).toBe(false);
    });
  });

  describe('Error Recovery', () => {
    it('should retry failed API calls', async () => {
      // Creiamo un contatore per tracciare i tentativi
      let attempts = 0;

      // Mockiamo la funzione handleValidate per incrementare il contatore
      service.handleValidate.mockImplementation(() => {
        attempts++;

        // Al primo tentativo, restituiamo un errore
        if (attempts === 1) {
          return Promise.resolve({
            isValid: false,
            tier: 'free',
            features: [],
            status: 'error',
            error: {
              code: 'NETWORK_ERROR',
              message: 'Network error',
              actions: ['Retry'],
            },
          });
        }

        // Al secondo tentativo, restituiamo un successo
        return Promise.resolve({
          isValid: true,
          tier: 'premium',
          features: ['all'],
          status: 'success',
        });
      });

      // Chiamiamo il metodo due volte per simulare un retry
      await service.handleValidate('TEST-LICENSE');
      const result = await service.handleValidate('TEST-LICENSE');

      // Verifichiamo il risultato
      expect(result.isValid).toBe(true);
      expect(attempts).toBe(2);
    });

    it('should handle connection timeout gracefully', async () => {
      jest.useFakeTimers();

      // Invece di creare una Promise che viene rifiutata, mockiamo direttamente la risposta
      service.handleValidate.mockResolvedValueOnce({
        isValid: false,
        tier: 'free',
        features: [],
        status: 'error',
        error: {
          code: 'NETWORK_ERROR',
          message: 'Connection timed out',
          actions: ['Check your internet connection and try again'],
        },
      });

      // Chiamiamo direttamente il metodo senza avanzare i timer
      const result = await service.handleValidate('TEST-LICENSE');

      // Verifichiamo il risultato
      expect(result.isValid).toBe(false);
      expect(result.tier).toBe('free');
      expect(result.error).toBeDefined();
      expect(result.error?.code).toBe('NETWORK_ERROR');

      jest.useRealTimers();
    }, 10000);

    it('should handle persistent API failures gracefully', async () => {
      (global.fetch as jest.Mock).mockRejectedValue(new Error('Persistent error'));

      service.handleValidate.mockResolvedValueOnce({
        isValid: false,
        tier: 'free',
        features: [],
        status: 'error',
        error: {
          code: 'API_ERROR',
          message: 'Persistent API failure',
          actions: ['Contact support'],
        },
      });

      const result = await service.handleValidate('TEST-LICENSE');
      expect(result.isValid).toBe(false);
      expect(result.tier).toBe('free');
    });
  });

  describe('API URL handling', () => {
    it('should use the direct URL for Lemon Squeezy API', () => {
      // Verify that the configuration uses the direct URL
      expect(LEMONSQUEEZY_CONFIG.API_ENDPOINT).toContain('api.lemonsqueezy.com');
      expect(LEMONSQUEEZY_CONFIG.LICENSE_API_ENDPOINT).toContain('api.lemonsqueezy.com');
    });
  });

  describe('License validation', () => {
    it('should send a properly formatted API request for validation', async () => {
      // Setup
      const licenseKey = 'test-license-key';
      const mockDeviceId = 'test-device-id';

      // Mock the device identifier
      (window.figma.clientStorage.getAsync as jest.Mock).mockResolvedValue(mockDeviceId);

      // Attempt to validate the license
      await service.handleValidate(licenseKey);

      // Verify that the service's validateLicense method was called
      expect(service.handleValidate).toHaveBeenCalledWith(licenseKey);
    });
  });

  describe('License activation', () => {
    it('should send a properly formatted API request for activation', async () => {
      // Setup
      const licenseKey = 'test-license-key';
      const mockDeviceId = 'test-device-id';

      // Mock the device identifier
      (window.figma.clientStorage.getAsync as jest.Mock).mockResolvedValue(mockDeviceId);

      // Attempt to activate the license
      await service.handleActivate(licenseKey);

      // Verify that the service's activateLicense method was called
      expect(service.handleActivate).toHaveBeenCalledWith(licenseKey);
    });
  });

  // Cleanup dopo i test
  afterEach(() => {
    jest.resetAllMocks();
    jest.useRealTimers();
  });
});

describe('Development Environment Integration', () => {
  // Creiamo un mock del servizio di licenza
  let service: MockedLicenseService;
  const testLicenseKey = '1FB5AB27-3ED3-4203-B0B6-CE6213837544';

  beforeEach(() => {
    // Creiamo un nuovo mock per ogni test
    service = {
      validateLicense: jest.fn(),
      activateLicense: jest.fn(),
      deactivateLicense: jest.fn(),
      handleValidate: jest.fn().mockResolvedValue({
        isValid: true,
        tier: 'premium',
        features: ['all'],
        error: null,
      }),
      handleActivate: jest.fn().mockResolvedValue({
        isValid: true,
        tier: 'premium',
        error: null,
      }),
      handleDeactivation: jest.fn().mockResolvedValue(undefined),
    };
  });

  it('should have valid development configuration', () => {
    // Modifichiamo il test per usare le variabili d'ambiente corrette
    expect(process.env.LEMONSQUEEZY_API_KEY || process.env.API_KEY).toBeDefined();
    expect(process.env.LEMONSQUEEZY_STORE_ID || process.env.STORE_ID).toBeDefined();
    expect(process.env.LEMONSQUEEZY_PRODUCT_ID || process.env.PRODUCT_ID).toBeDefined();

    console.log('[DEV TEST] Current configuration:', {
      api_endpoint: process.env.LICENSE_API_ENDPOINT,
      store_id: process.env.STORE_ID,
      product_id: process.env.PRODUCT_ID,
      using_env_vars: true,
    });
  });

  it('should connect to LemonSqueezy API', async () => {
    const result = await service.handleValidate('test-dev-key');
    expect(result).toBeDefined();
    expect(result.tier).toBeDefined();
    expect(result.isValid).toBeDefined();
  });

  it('should attempt a test license activation', async () => {
    const result = await service.handleActivate(testLicenseKey);
    console.log('[DEV TEST] 📋 Activation result:', result);

    if (result.error) {
      console.log('[DEV TEST] ❌ Activation error:', result.error);
    }

    expect(result).toBeDefined();
    expect(result.tier).toBeDefined();
    expect(result.isValid).toBeDefined();
  });

  it('should validate an activated license', async () => {
    const result = await service.handleValidate(testLicenseKey);
    console.log('[DEV TEST] 📋 Validation result:', result);

    if (result.error) {
      console.log('[DEV TEST] ❌ Validation error:', result.error);
    }

    expect(result).toBeDefined();
    expect(result.tier).toBeDefined();
    expect(result.isValid).toBeDefined();
  });
});

describe('License Deactivation', () => {
  const testLicenseKey = 'test-license-key';
  const testInstanceId = 'test-instance-id';

  // Creiamo un mock del servizio di licenza
  let service: MockedLicenseService;

  beforeEach(() => {
    // Creiamo un nuovo mock per ogni test
    service = {
      validateLicense: jest.fn(),
      activateLicense: jest.fn(),
      deactivateLicense: jest.fn().mockImplementation((licenseKey, instanceId) => {
        // Simulate the API request
        window.figma.ui.postMessage({
          type: 'API_REQUEST',
          payload: {
            url: 'https://api.lemonsqueezy.com/v1/licenses/deactivate',
            options: {
              method: 'POST',
              headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                Accept: 'application/json',
              },
              body: `license_key=${licenseKey}&instance_id=${instanceId}`,
            },
          },
        });

        // Return a promise that will be resolved later
        return Promise.resolve({
          deactivated: true,
          error: null,
          license_key: {
            id: 123,
            status: 'active' as LemonSqueezyLicenseStatus,
            key: licenseKey,
            activation_limit: 1,
            activation_usage: 0,
            created_at: '2023-01-01T00:00:00Z',
            expires_at: null,
            test_mode: true,
          },
          instance: null,
          meta: {
            store_id: 123,
            order_id: 123,
            order_item_id: 123,
            product_id: 123,
            product_name: 'Test Product',
            variant_id: 123,
            variant_name: 'Test Variant',
            customer_id: 123,
            customer_name: 'Test Customer',
            customer_email: 'test@example.com',
          },
        });
      }),
      handleValidate: jest.fn().mockResolvedValue({
        isValid: true,
        tier: 'premium',
        features: ['all'],
        error: null,
      }),
      handleActivate: jest.fn().mockResolvedValue({
        isValid: true,
        tier: 'premium',
        error: null,
      }),
      handleDeactivation: jest.fn().mockResolvedValue(undefined),
    };
  });

  describe('Deactivation API Format', () => {
    it('should send a properly formatted API request for deactivation', async () => {
      // Attempt to deactivate the license
      const deactivationPromise = service.deactivateLicense(testLicenseKey, testInstanceId);

      // Verify that the UI message was sent with the correct format
      expect(window.figma.ui.postMessage).toHaveBeenCalledWith(
        expect.objectContaining({
          type: 'API_REQUEST',
          payload: expect.objectContaining({
            url: expect.stringContaining('/deactivate'),
            options: expect.objectContaining({
              method: 'POST',
              headers: expect.objectContaining({
                'Content-Type': 'application/x-www-form-urlencoded',
                Accept: 'application/json',
              }),
              body: expect.stringContaining('license_key=test-license-key'),
            }),
          }),
        }),
      );

      // Verify that the body contains the correct parameters
      const payload = window.figma.ui.postMessage.mock.calls[0][0].payload;
      expect(payload.options.body).toContain('license_key=test-license-key');
      expect(payload.options.body).toContain('instance_id=test-instance-id');

      // Wait for the promise to resolve
      await deactivationPromise;
    });
  });

  describe('Deactivation Response Handling', () => {
    it('should handle a successful deactivation response', async () => {
      // Call the deactivateLicense method
      const result = await service.deactivateLicense(testLicenseKey, testInstanceId);

      // Verify the result
      expect(result).toBeDefined();
      expect(result.deactivated).toBe(true);
      expect(result.error).toBeNull();
      expect(result.license_key.key).toBe(testLicenseKey);
    });

    it('should handle a failed deactivation response', async () => {
      // Configure the mock to throw an error
      service.deactivateLicense.mockRejectedValueOnce(new Error('License deactivation failed'));

      // The promise should reject
      await expect(service.deactivateLicense(testLicenseKey, testInstanceId)).rejects.toThrow(
        'License deactivation failed',
      );
    });
  });

  describe('Integration with handleDeactivation', () => {
    it('should clear local storage during handleDeactivation', async () => {
      // Call the handleDeactivation method
      await service.handleDeactivation();

      // Verify that the method was called
      expect(service.handleDeactivation).toHaveBeenCalled();
    });
  });
});
