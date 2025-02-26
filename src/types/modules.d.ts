// Type declarations for local modules
declare module '../config/storage' {
  export const STORAGE_KEYS: {
    readonly DEVICE_ID: 'license_device_id';
    readonly LICENSE_KEY: 'license_key';
    readonly LAST_VALIDATION: 'last_validation_time';
    readonly USER_PREFERENCES: 'user_preferences';
  };
}

declare module '../config/lemonSqueezy' {
  export const LEMONSQUEEZY_CONFIG: {
    API_KEY: string;
    API_ENDPOINT: string;
    LICENSE_API_ENDPOINT: string;
    LICENSE_API_ENDPOINT_ALT?: string;
    STORE_ID: string;
    PRODUCT_ID: string;
  };

  export const ENV_CONFIG: {
    isDevelopment: boolean;
    logLevel: string;
  };
}

declare module '../config/lemonSqueezyEndpoints' {
  export const BASE_URL: string;

  export const ENDPOINTS: {
    ACTIVATE: string;
    VALIDATE: string;
    DEACTIVATE: string;
  };

  export const HEADERS: {
    POST: Record<string, string>;
    JSON: Record<string, string>;
  };

  export function getEndpoint(type: string): string;
  export function getHeaders(contentType: string, apiKey?: string): Record<string, string>;
}

declare module '../services/logger' {
  export const logger: {
    debug(message: string, ...args: unknown[]): void;
    info(message: string, ...args: unknown[]): void;
    warn(message: string, ...args: unknown[]): void;
    error(message: string, ...args: unknown[]): void;
  };
}

// Dichiarazioni per i file di test JavaScript
declare module './__tests__/diagnostics/test-lemonsqueezy.js' {
  export function testConnectivity(): Promise<{ success: boolean; message: string }>;
  export function testActivationRequestFormat(): { success: boolean; message: string };
  export function runAllTests(): Promise<{
    connectivity: { success: boolean; message: string };
    format: { success: boolean; message: string };
  }>;
}

declare module './__tests__/diagnostics/test-instances.js' {
  export function testActivation(): Promise<string | null>;
  export function testValidation(instanceId: string): Promise<boolean>;
  export function testDeactivation(instanceId: string): Promise<boolean>;
  export function runTests(): Promise<{
    activation: boolean;
    validation: boolean;
    deactivation: boolean;
  }>;
}

declare module './__tests__/diagnostics/test-connectivity.js' {
  export function testEndpoint(url: string): Promise<{
    url: string;
    success: boolean;
    status?: number;
    message?: string;
    error?: string;
  }>;
  export function runTests(): Promise<{
    success: boolean;
    reachableCount: number;
    totalCount: number;
    results: Array<{
      url: string;
      success: boolean;
      status?: number;
      message?: string;
      error?: string;
    }>;
  }>;
}
