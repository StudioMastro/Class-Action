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
  success: true,
  data: {
    license: {
      status: 'active',
      key: 'test-key-123',
      expires_at: null,
      activation_limit: 5,
      activations_count: 1,
      activated: true,
      features: ['all'],
    },
    instance: {
      identifier: 'test-instance-123',
    },
  },
};

export const mockErrorResponse = {
  success: false,
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
