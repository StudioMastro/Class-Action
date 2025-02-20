import { LicenseService } from '../licenseService';
import { LEMONSQUEEZY_CONFIG } from '../../config/lemonSqueezy';

describe('LemonSqueezy Integration', () => {
  it('should have valid configuration', () => {
    expect(LEMONSQUEEZY_CONFIG.API_KEY).toBeDefined();
    expect(LEMONSQUEEZY_CONFIG.API_KEY).not.toBe('your_api_key_here');
    expect(LEMONSQUEEZY_CONFIG.STORE_ID).toBeDefined();
    expect(LEMONSQUEEZY_CONFIG.PRODUCT_ID).toBeDefined();
  });

  it('should be able to instantiate LicenseService', () => {
    const service = LicenseService.getInstance();
    expect(service).toBeDefined();
  });

  // Test con licenza reale di test
  it('should validate a real test license from LemonSqueezy', async () => {
    const service = LicenseService.getInstance();
    // Questa è una licenza di test che genereremo su LemonSqueezy
    const realTestLicenseKey = 'FD1B4D74-4BD9-4358-A57F-F294C726EB53';
    
    const result = await service.validateLicense(realTestLicenseKey);
    expect(result).toBeDefined();
    expect(result.isValid).toBe(true);
    expect(result.tier).toBe('premium');
    expect(result.features).toContain('import-export');
    expect(result.features).toContain('apply-all');
    expect(result.features).toContain('unlimited-classes');
  });

  it('should be able to validate a test license', async () => {
    const service = LicenseService.getInstance();
    const testLicenseKey = 'TEST-LICENSE-KEY'; // Possiamo usare una chiave di test da LemonSqueezy
    
    const result = await service.validateLicense(testLicenseKey);
    expect(result).toBeDefined();
    expect(result).toHaveProperty('isValid');
    expect(result).toHaveProperty('tier');
  });

  it('should handle invalid license keys gracefully', async () => {
    const service = LicenseService.getInstance();
    const invalidKey = 'INVALID-KEY';
    
    const result = await service.validateLicense(invalidKey);
    expect(result).toBeDefined();
    expect(result.isValid).toBe(false);
    expect(result.tier).toBe('free');
  });
}); 