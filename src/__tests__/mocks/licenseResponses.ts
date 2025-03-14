import type {
  LemonSqueezyValidationResponse,
  LemonSqueezyActivationResponse,
} from '../../types/lemonSqueezy';

export const mockValidationResponse: LemonSqueezyValidationResponse = {
  valid: true,
  error: null,
  license_key: {
    id: 1,
    status: 'active',
    key: 'test-key-123',
    activation_limit: 5,
    activation_usage: 1,
    created_at: new Date().toISOString(),
    expires_at: null,
    test_mode: true,
  },
  instance: {
    id: 1,
    identifier: 'test-instance-123',
    created_at: new Date().toISOString(),
  },
  meta: {
    store_id: 1,
    order_id: 1,
    order_item_id: 1,
    product_id: 1,
    product_name: 'Test Product',
    variant_id: 1,
    variant_name: 'Test Variant',
    customer_id: 1,
    customer_name: 'Test Customer',
    customer_email: 'test@example.com',
  },
};

export const mockActivationResponse: LemonSqueezyActivationResponse = {
  activated: true,
  error: null,
  license_key: {
    id: 1,
    status: 'active',
    key: 'test-key-123',
    activation_limit: 5,
    activation_usage: 1,
    created_at: new Date().toISOString(),
    expires_at: null,
    test_mode: true,
  },
  instance: {
    id: 'test-instance-123',
    name: 'Test Instance',
    created_at: new Date().toISOString(),
  },
  meta: {
    store_id: 1,
    order_id: 1,
    order_item_id: 1,
    product_id: 1,
    product_name: 'Test Product',
    variant_id: 1,
    variant_name: 'Test Variant',
    customer_id: 1,
    customer_name: 'Test Customer',
    customer_email: 'test@example.com',
  },
};

export const mockErrorResponse = {
  activated: false,
  error: 'Invalid license key',
  code: 'INVALID_LICENSE',
};

export const mockExpiredResponse: LemonSqueezyValidationResponse = {
  valid: false,
  error: 'License expired',
  license_key: {
    id: 2,
    status: 'expired',
    key: 'test-expired-key',
    activation_limit: 5,
    activation_usage: 5,
    created_at: new Date().toISOString(),
    expires_at: new Date(Date.now() - 86400000).toISOString(), // Yesterday
    test_mode: true,
  },
  instance: null,
  meta: {
    store_id: 1,
    order_id: 1,
    order_item_id: 1,
    product_id: 1,
    product_name: 'Test Product',
    variant_id: 1,
    variant_name: 'Test Variant',
    customer_id: 1,
    customer_name: 'Test Customer',
    customer_email: 'test@example.com',
  },
};

// Aggiungiamo un test per verificare che i mock siano corretti
if (typeof describe === 'function') {
  describe('License Response Mocks', () => {
    test('mockValidationResponse should have the correct structure', () => {
      expect(mockValidationResponse).toBeDefined();
      expect(mockValidationResponse.valid).toBe(true);
      expect(mockValidationResponse.error).toBeNull();
      expect(mockValidationResponse.license_key).toBeDefined();
      expect(mockValidationResponse.license_key.status).toBe('active');
      expect(mockValidationResponse.instance).toBeDefined();
      expect(mockValidationResponse.meta).toBeDefined();
    });

    test('mockActivationResponse should have the correct structure', () => {
      expect(mockActivationResponse).toBeDefined();
      expect(mockActivationResponse.activated).toBe(true);
      expect(mockActivationResponse.error).toBeNull();
      expect(mockActivationResponse.license_key).toBeDefined();
      expect(mockActivationResponse.license_key.status).toBe('active');
      expect(mockActivationResponse.instance).toBeDefined();
      expect(mockActivationResponse.instance.id).toBe('test-instance-123');
      expect(mockActivationResponse.meta).toBeDefined();
    });

    test('mockErrorResponse should have the correct structure', () => {
      expect(mockErrorResponse).toBeDefined();
      expect(mockErrorResponse.activated).toBe(false);
      expect(mockErrorResponse.error).toBe('Invalid license key');
      expect(mockErrorResponse.code).toBe('INVALID_LICENSE');
    });

    test('mockExpiredResponse should have the correct structure', () => {
      expect(mockExpiredResponse).toBeDefined();
      expect(mockExpiredResponse.valid).toBe(false);
      expect(mockExpiredResponse.error).toBe('License expired');
      expect(mockExpiredResponse.license_key).toBeDefined();
      expect(mockExpiredResponse.license_key.status).toBe('expired');
      expect(mockExpiredResponse.instance).toBeNull();
      expect(mockExpiredResponse.meta).toBeDefined();
      // Verifica che la data di scadenza sia nel passato
      expect(new Date(mockExpiredResponse.license_key.expires_at as string).getTime()).toBeLessThan(
        Date.now(),
      );
    });
  });
}
