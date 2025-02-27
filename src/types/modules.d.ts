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

declare module 'figma' {
  interface PluginAPI {
    readonly clientStorage: ClientStorageAPI;
    readonly root: DocumentNode;
    readonly currentPage: PageNode;
    readonly mixed: symbol;

    closePlugin(message?: string): void;
    notify(message: string, options?: NotificationOptions): NotificationHandler;
    showUI(html: string, options?: ShowUIOptions): void;
    createRectangle(): RectangleNode;
    createLine(): LineNode;
    createEllipse(): EllipseNode;
    createPolygon(): PolygonNode;
    createStar(): StarNode;
    createVector(): VectorNode;
    createText(): TextNode;
    createFrame(): FrameNode;
    createComponent(): ComponentNode;
    createPage(): PageNode;
    createSlice(): SliceNode;
    createNodeFromSvg(svg: string): FrameNode;

    createImage(data: Uint8Array): Image;
    getNodeById(id: string): BaseNode | null;
    getStyleById(id: string): BaseStyle | null;
    currentPage: PageNode;
    on(type: string, callback: (...args: unknown[]) => void): void;
    once(type: string, callback: (...args: unknown[]) => void): void;
    off(type: string, callback: (...args: unknown[]) => void): void;
    offAll(): void;
    setRelaunchData(data: { [command: string]: string }): void;
    getNodeByName(name: string): SceneNode | null;
  }

  interface Console {
    log(message?: unknown, ...optionalParams: unknown[]): void;
    error(message?: unknown, ...optionalParams: unknown[]): void;
  }
}
