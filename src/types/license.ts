export type LicenseTier = 'free' | 'premium';

export interface LicenseError {
  code:
    | 'ACTIVATION_LIMIT_REACHED'
    | 'INVALID_LICENSE'
    | 'NETWORK_ERROR'
    | 'API_ERROR'
    | 'DEACTIVATION_FAILED';
  message: string;
  actions?: string[];
  managementUrl?: string;
}

export interface LicenseStatus {
  tier: LicenseTier;
  isValid: boolean;
  expiresAt?: string;
  features: string[];
  licenseKey?: string;
  status: 'idle' | 'processing' | 'error';
  error?: LicenseError;
}

export interface LicenseEvents {
  CHECK_LICENSE_STATUS: undefined;
  LICENSE_STATUS_CHANGED: LicenseStatus;
  LICENSE_ERROR: string;
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
  error: LicenseError | null;
  onActivate: (key: string) => void;
  onDeactivate: () => void;
}
