// Utility per gestire le variabili d'ambiente in modo sicuro
const getEnvVar = (key: string, defaultValue: string = ''): string => {
  try {
    // @ts-expect-error process.env might not be available in Figma plugin context
    return typeof process !== 'undefined' && process.env ? process.env[key] : defaultValue;
  } catch {
    return defaultValue;
  }
};

// Configurazione base
const BASE_CONFIG = {
  API_ENDPOINT: 'https://api.lemonsqueezy.com/v1',
  LICENSE_API_ENDPOINT: 'https://api.lemonsqueezy.com/v1/licenses',
  // Configurazione checkout
  CHECKOUT_URL: 'https://mastro.lemonsqueezy.com/buy/35279b0a-132c-4e10-8408-c6d1409eb28c',
};

// Configurazione per l'ambiente di sviluppo e produzione
const ENV_CONFIG = {
  API_KEY: getEnvVar('LEMONSQUEEZY_API_KEY', ''),
  STORE_ID: getEnvVar('LEMONSQUEEZY_STORE_ID', ''),
  PRODUCT_ID: getEnvVar('LEMONSQUEEZY_PRODUCT_ID', ''),
  CHECKOUT_URL: BASE_CONFIG.CHECKOUT_URL,
};

// Valori di fallback per lo sviluppo
const DEV_CONFIG = {
  API_KEY: 'test_key',
  STORE_ID: 'test_store',
  PRODUCT_ID: 'test_product',
  CHECKOUT_URL: BASE_CONFIG.CHECKOUT_URL,
};

export const LEMONSQUEEZY_CONFIG = {
  ...BASE_CONFIG,
  ...ENV_CONFIG,
  // Use development values if no env vars are set
  ...(ENV_CONFIG.API_KEY === '' ? DEV_CONFIG : {}),
};

// License status types from LemonSqueezy
export type LemonSqueezyLicenseStatus = 'active' | 'inactive' | 'expired' | 'disabled';

// API Response interfaces
export interface LemonSqueezyResponse {
  success: boolean;
  error?: string;
  license?: {
    status: LemonSqueezyLicenseStatus;
    key: string;
    expires_at?: string;
    activation_limit: number;
    activations_count: number;
  };
  instance?: {
    identifier: string;
    name: string;
    created_at: string;
    updated_at: string;
  };
}
