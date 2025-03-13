export type LemonSqueezyLicenseStatus = 'active' | 'inactive' | 'expired' | 'disabled';

// Base types for license management
export type LicenseTier = 'free' | 'premium';
export type ActivationStatus = 'idle' | 'processing' | 'success' | 'error';

// Error types
export interface LemonSqueezyError {
  code:
    | 'API_ERROR'
    | 'ACTIVATION_LIMIT_REACHED'
    | 'INVALID_LICENSE'
    | 'NETWORK_ERROR'
    | 'DEACTIVATION_FAILED'
    | 'LICENSE_EXPIRED'
    | 'LICENSE_DISABLED'
    | 'CONFIG_ERROR'
    | 'CONNECTION_ERROR';
  message: string;
  actions: string[];
  managementUrl?: string;
}

// API Response types
export interface LemonSqueezyLicenseKey {
  id: number;
  status: LemonSqueezyLicenseStatus;
  key: string;
  activation_limit: number;
  activation_usage: number;
  created_at: string;
  expires_at: string | null;
  test_mode: boolean;
}

export interface LemonSqueezyInstance {
  id: string | number;
  identifier?: string;
  name?: string;
  created_at: string;
}

export interface LemonSqueezyMeta {
  store_id: number;
  order_id: number;
  order_item_id: number;
  product_id: number;
  product_name: string;
  variant_id: number;
  variant_name: string;
  customer_id: number;
  customer_name: string;
  customer_email: string;
}

/**
 * Risposta dell'API LemonSqueezy per la validazione
 *
 * Documentazione ufficiale: https://docs.lemonsqueezy.com/api/license-api/validate-license-key
 */
export interface LemonSqueezyValidationResponse {
  valid: boolean;
  error: string | null;
  license_key: LemonSqueezyLicenseKey;
  instance: LemonSqueezyInstance | null;
  meta: LemonSqueezyMeta;
}

/**
 * Informazioni sulla licenza nella risposta di attivazione
 */
export interface LemonSqueezyLicense {
  status: LemonSqueezyLicenseStatus;
  key: string;
  expires_at: string | null;
  activation_limit: number;
  activations_count: number;
  activated: boolean;
  features: string[];
}

/**
 * Risposta dell'API LemonSqueezy per l'attivazione
 *
 * Documentazione ufficiale: https://docs.lemonsqueezy.com/api/license-api/activate-license-key
 */
export interface LemonSqueezyActivationResponse {
  activated: boolean;
  error: string | null;
  license_key: LemonSqueezyLicenseKey;
  instance: LemonSqueezyInstance;
  meta: LemonSqueezyMeta;
}

/**
 * Risposta dell'API LemonSqueezy per la disattivazione
 *
 * Documentazione ufficiale: https://docs.lemonsqueezy.com/api/license-api/deactivate-license-key
 */
export interface LemonSqueezyDeactivationResponse {
  deactivated: boolean;
  error: string | null;
  license_key: LemonSqueezyLicenseKey;
  instance: LemonSqueezyInstance | null;
  meta: LemonSqueezyMeta;
}

// Plugin-specific types
export interface LicenseStatus {
  tier: LicenseTier;
  isValid: boolean;
  features: string[];
  status: ActivationStatus;
  lemonSqueezyStatus?: LemonSqueezyLicenseStatus;
  error?: LemonSqueezyError;
  activationLimit?: number;
  activationsCount?: number;
  expiresAt?: string | null;
  licenseKey?: string;
  instanceId?: string;
  pendingValidation?: boolean;
  activationDate?: string | null;
  message?: string;
}

export interface LicenseEvents {
  CHECK_LICENSE_STATUS: undefined;
  LICENSE_STATUS_CHANGED: LicenseStatus;
  LICENSE_ERROR: LemonSqueezyError;
}

export type LicenseFeature =
  | 'import-export'
  | 'apply-all'
  | 'unlimited-classes'
  | 'advanced-search'
  | 'auto-backup';

export interface LicenseActivationProps {
  currentStatus: LicenseStatus;
  isOpen: boolean;
  onClose: () => void;
  error: LemonSqueezyError | null;
  onActivate: (key: string) => void;
  onDeactivate: () => void;
  isManualOpen?: boolean;
}

// Generic response type
export type LemonSqueezyResponse =
  | LemonSqueezyValidationResponse
  | LemonSqueezyActivationResponse
  | LemonSqueezyDeactivationResponse;
