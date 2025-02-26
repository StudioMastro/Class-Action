import { logger } from '../config/lemonSqueezy';

const STORAGE_PREFIX = 'ca_secure_';

export interface SecureStorageOptions {
  prefix?: string;
  expiresIn?: number; // milliseconds
}

export class SecureStorage {
  private readonly prefix: string;
  private readonly defaultExpiry: number;

  constructor(options: SecureStorageOptions = {}) {
    this.prefix = options.prefix || STORAGE_PREFIX;
    this.defaultExpiry = options.expiresIn || 24 * 60 * 60 * 1000; // 24 hours
  }

  private getKey(key: string): string {
    return `${this.prefix}${key}`;
  }

  async set(key: string, value: string, expiresIn?: number): Promise<void> {
    const storageKey = this.getKey(key);
    const expiryTime = Date.now() + (expiresIn || this.defaultExpiry);

    const data = {
      value,
      expiresAt: expiryTime,
    };

    try {
      await figma.clientStorage.setAsync(storageKey, JSON.stringify(data));
      logger.debug(`Stored secure data for key: ${key}`);
    } catch (error) {
      logger.error(`Failed to store secure data for key: ${key}`, error);
      throw error;
    }
  }

  async get(key: string): Promise<string | null> {
    const storageKey = this.getKey(key);

    try {
      const storedData = await figma.clientStorage.getAsync(storageKey);
      if (!storedData) return null;

      const data = JSON.parse(storedData as string);

      if (Date.now() > data.expiresAt) {
        await this.delete(key);
        return null;
      }

      return data.value;
    } catch (error) {
      logger.error(`Failed to retrieve secure data for key: ${key}`, error);
      return null;
    }
  }

  async delete(key: string): Promise<void> {
    const storageKey = this.getKey(key);
    try {
      await figma.clientStorage.deleteAsync(storageKey);
      logger.debug(`Deleted secure data for key: ${key}`);
    } catch (error) {
      logger.error(`Failed to delete secure data for key: ${key}`, error);
      throw error;
    }
  }

  async clear(): Promise<void> {
    try {
      const keys = await figma.clientStorage.keysAsync();
      const secureKeys = keys.filter((key) => key.startsWith(this.prefix));

      await Promise.all(secureKeys.map((key) => figma.clientStorage.deleteAsync(key)));

      logger.debug('Cleared all secure storage data');
    } catch (error) {
      logger.error('Failed to clear secure storage', error);
      throw error;
    }
  }
}
