export type LicenseTier = 'free' | 'premium';

export interface LicenseStatus {
  tier: LicenseTier;
  isValid: boolean;
  expiresAt?: string;
  features: string[];
  licenseKey?: string;
}

export interface LicenseEvents {
  'CHECK_LICENSE_STATUS': undefined;
  'LICENSE_STATUS_CHANGED': LicenseStatus;
  'LICENSE_ERROR': string;
}

export type LicenseFeature = 
  | 'import-export'
  | 'apply-all'
  | 'unlimited-classes'
  | 'advanced-search'
  | 'auto-backup'; 