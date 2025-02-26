/**
 * Tipi per il sistema di licenze
 */

/**
 * Stato della licenza
 */
export type LicenseStatusType = 'active' | 'inactive' | 'invalid' | 'expired';

/**
 * Informazioni sul dispositivo
 */
export interface DeviceInfo {
  browser: string;
  os: string;
}

/**
 * Risultato dell'attivazione della licenza
 */
export interface LicenseActivationResult {
  success: boolean;
  message: string;
  features: string[];
}

/**
 * Risultato della validazione della licenza
 */
export interface LicenseValidationResult {
  valid: boolean;
  message: string;
  features?: string[];
}

/**
 * Risultato della disattivazione della licenza
 */
export interface LicenseDeactivationResult {
  success: boolean;
  message: string;
}

/**
 * Errore dell'API LemonSqueezy
 */
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

/**
 * Risposta generica dell'API LemonSqueezy
 */
export type LemonSqueezyResponse =
  | LemonSqueezyActivationResponse
  | LemonSqueezyValidationResponse
  | LemonSqueezyDeactivationResponse;

/**
 * Risposta dell'API LemonSqueezy per l'attivazione
 */
export interface LemonSqueezyActivationResponse {
  activated: boolean;
  error?: string;
  instance?: {
    id: string;
    [key: string]: unknown;
  };
  license_key?: {
    id: number;
    status: string;
    [key: string]: unknown;
  };
  [key: string]: unknown;
}

/**
 * Risposta dell'API LemonSqueezy per la validazione
 */
export interface LemonSqueezyValidationResponse {
  valid: boolean;
  error?: string;
  license_key?: {
    id: number;
    status: string;
    [key: string]: unknown;
  };
  [key: string]: unknown;
}

/**
 * Risposta dell'API LemonSqueezy per la disattivazione
 */
export interface LemonSqueezyDeactivationResponse {
  deactivated: boolean;
  error?: string;
  [key: string]: unknown;
}

/**
 * Stato completo della licenza
 */
export interface LicenseStatus {
  tier: 'free' | 'premium';
  isValid: boolean;
  features: string[];
  status: string;
  lemonSqueezyStatus?: string;
  error?: LemonSqueezyError;
  activationLimit?: number;
  activationsCount?: number;
  expiresAt?: string | null;
  licenseKey?: string;
  instanceId?: string;
  pendingValidation?: boolean;
}

/**
 * Dati della licenza salvati nello storage
 */
export interface StoredLicenseData {
  licenseKey: string | null;
  instanceId: string | null;
  licenseStatus: LicenseStatusType;
  licenseFeatures: string[];
}

/**
 * Eventi del sistema di licenze
 */
export type LicenseEvent =
  | {
      type: 'license:activated';
      payload: { licenseKey: string; instanceId: string; features: string[] };
    }
  | {
      type: 'license:validated';
      payload: { licenseKey: string; instanceId: string; features: string[] };
    }
  | { type: 'license:deactivated'; payload: Record<string, never> };
