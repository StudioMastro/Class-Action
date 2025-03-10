import type { EnvironmentConfig, LemonSqueezyConfig } from '../types/config';

// Importa la configurazione dal file generato durante la build
// Se il file non esiste (ad esempio durante lo sviluppo), utilizziamo le variabili globali
let importedConfig: {
  ENV_CONFIG: EnvironmentConfig;
  LEMONSQUEEZY_CONFIG: LemonSqueezyConfig;
} | null = null;

try {
  // Importa la configurazione dal file generato
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  importedConfig = require('./env-config');
  console.log('[CONFIG] Loaded configuration from generated file');
} catch (error) {
  console.log('[CONFIG] Using global environment variables');
}

// Definizione delle costanti che verranno sostituite durante la build
// Queste stringhe verranno sostituite con i valori reali dal build process
declare const __NODE_ENV__: string;
declare const __LEMONSQUEEZY_API_KEY__: string;
declare const __LEMONSQUEEZY_STORE_ID__: string;
declare const __LEMONSQUEEZY_PRODUCT_ID__: string;
declare const __LEMONSQUEEZY_CHECKOUT_URL__: string;

// Environment configuration
export const ENV_CONFIG: EnvironmentConfig = importedConfig
  ? importedConfig.ENV_CONFIG
  : ({
      isDevelopment: typeof __NODE_ENV__ === 'undefined' || __NODE_ENV__ !== 'production',
      logLevel:
        typeof __NODE_ENV__ !== 'undefined' && __NODE_ENV__ === 'production' ? 'error' : 'debug',
    } as const);

// LemonSqueezy API configuration - utilizziamo gli endpoint diretti
export const LEMONSQUEEZY_CONFIG: LemonSqueezyConfig = importedConfig
  ? importedConfig.LEMONSQUEEZY_CONFIG
  : {
      // Utilizziamo l'endpoint diretto invece del CORS proxy
      API_ENDPOINT: 'https://api.lemonsqueezy.com/v1',

      // The correct license API endpoint for LemonSqueezy
      // The base URL should NOT include the final slash
      LICENSE_API_ENDPOINT: 'https://api.lemonsqueezy.com/v1/licenses',

      API_KEY: typeof __LEMONSQUEEZY_API_KEY__ !== 'undefined' ? __LEMONSQUEEZY_API_KEY__ : '',
      STORE_ID: typeof __LEMONSQUEEZY_STORE_ID__ !== 'undefined' ? __LEMONSQUEEZY_STORE_ID__ : '',
      PRODUCT_ID:
        typeof __LEMONSQUEEZY_PRODUCT_ID__ !== 'undefined' ? __LEMONSQUEEZY_PRODUCT_ID__ : '',
      CHECKOUT_URL:
        typeof __LEMONSQUEEZY_CHECKOUT_URL__ !== 'undefined' ? __LEMONSQUEEZY_CHECKOUT_URL__ : '',
    };

// Validazione della configurazione
export function validateConfig(): boolean {
  const missingKeys: string[] = [];

  if (!LEMONSQUEEZY_CONFIG.API_KEY) {
    missingKeys.push('API_KEY');
  }

  if (!LEMONSQUEEZY_CONFIG.STORE_ID) {
    missingKeys.push('STORE_ID');
  }

  if (!LEMONSQUEEZY_CONFIG.PRODUCT_ID) {
    missingKeys.push('PRODUCT_ID');
  }

  if (!LEMONSQUEEZY_CONFIG.CHECKOUT_URL) {
    missingKeys.push('CHECKOUT_URL');
  }

  if (missingKeys.length > 0) {
    if (ENV_CONFIG.isDevelopment) {
      logger.warn('Missing configuration keys:', missingKeys);
      return true; // Consenti in development
    } else {
      logger.error('Missing required configuration:', missingKeys);
      return false;
    }
  }

  return true;
}

// Logger utility
export const logger = {
  debug: (message: string, ...args: unknown[]) => {
    if (ENV_CONFIG.logLevel === 'debug') {
      console.log(`[DEBUG] ${message}`, ...args);
    }
  },
  info: (message: string, ...args: unknown[]) => {
    if (['debug', 'info'].includes(ENV_CONFIG.logLevel)) {
      console.log(`[INFO] ${message}`, ...args);
    }
  },
  warn: (message: string, ...args: unknown[]) => {
    if (['debug', 'info', 'warn'].includes(ENV_CONFIG.logLevel)) {
      console.warn(`[WARN] ${message}`, ...args);
    }
  },
  error: (message: string, ...args: unknown[]) => {
    console.error(`[ERROR] ${message}`, ...args);
  },
};

// Development logging
if (ENV_CONFIG.isDevelopment) {
  logger.debug('🔧 LemonSqueezy Configuration:', {
    api_endpoint: LEMONSQUEEZY_CONFIG.API_ENDPOINT,
    license_api_endpoint: LEMONSQUEEZY_CONFIG.LICENSE_API_ENDPOINT,
    store_id: LEMONSQUEEZY_CONFIG.STORE_ID,
    product_id: LEMONSQUEEZY_CONFIG.PRODUCT_ID,
    api_key_configured: !!LEMONSQUEEZY_CONFIG.API_KEY,
  });
}

// License status types from LemonSqueezy
export type LemonSqueezyLicenseStatus = 'active' | 'inactive' | 'expired' | 'disabled';

// API Response interfaces
export interface LemonSqueezyResponse {
  success: boolean;
  error?: string;
  data?: {
    license: {
      status: LemonSqueezyLicenseStatus;
      key: string;
      expires_at?: string;
      activation_limit: number;
      activations_count: number;
      activated?: boolean;
      features?: string[];
    };
    instance?: {
      identifier: string;
      name: string;
      created_at: string;
      updated_at: string;
    };
  };
}
