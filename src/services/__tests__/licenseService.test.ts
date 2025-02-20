import { LicenseService } from '../licenseService';
import { LEMONSQUEEZY_CONFIG } from '../../config/lemonSqueezy';

describe('LemonSqueezy Integration', () => {
  let service: LicenseService;

  // Mock responses
  const mockValidResponse = {
    success: true,
    license: {
      status: 'active',
      key: 'TEST-VALID-LICENSE',
      activation_limit: 1,
      activations_count: 1,
    },
  };

  const mockExpiredResponse = {
    success: true,
    license: {
      status: 'expired',
      key: 'TEST-EXPIRED-LICENSE',
      activation_limit: 1,
      activations_count: 1,
    },
  };

  const mockAlreadyActivatedResponse = {
    success: false,
    error: 'License has reached its activation limit',
    license: {
      status: 'active',
      key: 'TEST-ALREADY-ACTIVATED',
      activation_limit: 1,
      activations_count: 1,
    },
  };

  beforeEach(() => {
    service = LicenseService.getInstance();
    // Reset fetch mock before each test
    global.fetch = jest.fn();
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
      const result = await service.activateLicense(testLicenseKey);
      expect(result.isValid).toBe(true);
      expect(result.tier).toBe('premium');
    });

    it('should handle activation of already activated license', async () => {
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
        json: () => Promise.resolve(mockAlreadyActivatedResponse),
      });

      const testLicenseKey = 'TEST-ALREADY-ACTIVATED';
      const result = await service.activateLicense(testLicenseKey);
      expect(result.isValid).toBe(false);
      expect(result.tier).toBe('free');
    });

    it('should handle invalid license key format', async () => {
      const invalidKey = 'INVALID-FORMAT';
      const result = await service.activateLicense(invalidKey);
      expect(result.isValid).toBe(false);
      expect(result.tier).toBe('free');
    });

    it('should handle network errors during activation', async () => {
      (global.fetch as jest.Mock).mockRejectedValueOnce(new Error('Network error'));

      const testLicenseKey = 'TEST-LICENSE';
      const result = await service.activateLicense(testLicenseKey);
      expect(result.isValid).toBe(false);
      expect(result.tier).toBe('free');
    });
  });

  describe('License Validation', () => {
    it('should validate an active license', async () => {
      (global.fetch as jest.Mock)
        .mockResolvedValueOnce({
          ok: true,
          json: () => Promise.resolve(mockValidResponse),
        })
        .mockResolvedValueOnce({
          ok: true,
          json: () => Promise.resolve(mockValidResponse),
        });

      const testLicenseKey = 'TEST-VALID-LICENSE';
      const result = await service.validateLicense(testLicenseKey);
      expect(result.isValid).toBe(true);
      expect(result.features).toContain('import-export');
    });

    it('should handle expired license', async () => {
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockExpiredResponse),
      });

      const expiredKey = 'TEST-EXPIRED-LICENSE';
      const result = await service.validateLicense(expiredKey);
      expect(result.isValid).toBe(false);
      expect(result.tier).toBe('free');
    });

    it('should handle rate limiting from API', async () => {
      (global.fetch as jest.Mock).mockRejectedValueOnce({
        status: 429,
        statusText: 'Too Many Requests',
      });

      const testLicenseKey = 'TEST-LICENSE';
      const result = await service.validateLicense(testLicenseKey);
      expect(result.isValid).toBe(false);
    });
  });

  describe('License Deactivation', () => {
    it('should deactivate an active license', async () => {
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve({ success: true }),
      });

      const testLicenseKey = 'TEST-VALID-LICENSE';
      const result = await service.deactivateLicense(testLicenseKey);
      expect(result).toBe(true);
    });

    it('should handle deactivation of already deactivated license', async () => {
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve({ success: false }),
      });

      const inactiveKey = 'TEST-INACTIVE-LICENSE';
      const result = await service.deactivateLicense(inactiveKey);
      expect(result).toBe(false);
    });

    it('should handle API errors during deactivation', async () => {
      (global.fetch as jest.Mock).mockRejectedValueOnce(new Error('API Error'));

      const testLicenseKey = 'TEST-LICENSE';
      const result = await service.deactivateLicense(testLicenseKey);
      expect(result).toBe(false);
    });
  });

  describe('Error Recovery', () => {
    it('should retry failed API calls', async () => {
      let attempts = 0;
      (global.fetch as jest.Mock).mockImplementation(() => {
        attempts++;
        if (attempts === 1) {
          return Promise.reject(new Error('Network error'));
        }
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve(mockValidResponse),
        });
      });

      const result = await service.validateLicense('TEST-LICENSE');
      expect(result.isValid).toBe(true);
      expect(attempts).toBe(2);
    });

    it('should handle connection timeout gracefully', async () => {
      jest.useFakeTimers();

      const timeoutPromise = new Promise((_, reject) => {
        setTimeout(() => reject(new Error('Connection timed out')), 30000);
      });

      (global.fetch as jest.Mock).mockImplementation(() => timeoutPromise);

      const resultPromise = service.validateLicense('TEST-LICENSE');
      jest.advanceTimersByTime(30000);

      const result = await resultPromise;
      expect(result.isValid).toBe(false);
      expect(result.tier).toBe('free');

      jest.useRealTimers();
    }, 10000); // Aumentiamo il timeout per questo test specifico

    it('should handle persistent API failures gracefully', async () => {
      (global.fetch as jest.Mock).mockRejectedValue(new Error('Persistent error'));

      const result = await service.validateLicense('TEST-LICENSE');
      expect(result.isValid).toBe(false);
      expect(result.tier).toBe('free');
    });
  });

  // Cleanup dopo i test
  afterEach(() => {
    jest.resetAllMocks();
    jest.useRealTimers();
  });
});
