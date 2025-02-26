export interface LemonSqueezyConfig {
  API_ENDPOINT: string;
  LICENSE_API_ENDPOINT: string;
  LICENSE_API_ENDPOINT_ALT?: string;
  API_KEY: string;
  STORE_ID: string;
  PRODUCT_ID: string;
  CHECKOUT_URL: string;
}

export interface EnvironmentConfig {
  isDevelopment: boolean;
  logLevel: 'debug' | 'info' | 'warn' | 'error';
}

export type LogLevel = EnvironmentConfig['logLevel'];
