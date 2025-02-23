import type { SavedClass } from '../types';

const STORAGE_KEY = 'savedClasses';

class StorageService {
  private static instance: StorageService;

  private constructor() {}

  public static getInstance(): StorageService {
    if (!StorageService.instance) {
      StorageService.instance = new StorageService();
    }
    return StorageService.instance;
  }

  private validateSavedClass(cls: unknown): cls is SavedClass {
    if (!cls || typeof cls !== 'object') return false;

    const candidate = cls as Record<string, unknown>;

    return (
      'name' in candidate &&
      typeof candidate.name === 'string' &&
      'width' in candidate &&
      typeof candidate.width === 'number' &&
      'height' in candidate &&
      typeof candidate.height === 'number' &&
      'layoutMode' in candidate &&
      typeof candidate.layoutMode === 'string'
    );
  }

  public async getSavedClasses(): Promise<SavedClass[]> {
    try {
      const savedClasses = await figma.clientStorage.getAsync(STORAGE_KEY);
      console.log('Retrieved data from storage:', savedClasses);

      if (!savedClasses) {
        console.log('No saved classes found, initializing empty array');
        return [];
      }

      // Validate the data structure
      if (!Array.isArray(savedClasses)) {
        console.error('Invalid data structure in storage - not an array:', savedClasses);
        // Reset storage to prevent future errors
        await this.resetStorage();
        return [];
      }

      // Filter out invalid classes
      const validClasses = savedClasses.filter((cls) => {
        const isValid = this.validateSavedClass(cls);
        if (!isValid) {
          console.warn('Invalid class found in storage:', cls);
        }
        return isValid;
      });

      if (validClasses.length !== savedClasses.length) {
        console.warn(
          `Found ${savedClasses.length - validClasses.length} invalid classes that were filtered out`,
        );
        // Save only the valid classes back to storage
        await this.saveClasses(validClasses);
      }

      return validClasses;
    } catch (error) {
      console.error('Error retrieving saved classes:', error);
      return [];
    }
  }

  public async saveClasses(classes: SavedClass[]): Promise<boolean> {
    try {
      await figma.clientStorage.setAsync(STORAGE_KEY, classes);
      return true;
    } catch (error) {
      console.error('Error saving classes:', error);
      return false;
    }
  }

  public async addClass(newClass: SavedClass): Promise<boolean> {
    try {
      const classes = await this.getSavedClasses();
      const exists = classes.some((cls) => cls.name.toLowerCase() === newClass.name.toLowerCase());

      if (exists) {
        throw new Error('A class with this name already exists');
      }

      classes.push(newClass);
      return this.saveClasses(classes);
    } catch (error) {
      console.error('Error adding class:', error);
      return false;
    }
  }

  public async updateClass(updatedClass: SavedClass): Promise<boolean> {
    try {
      const classes = await this.getSavedClasses();
      const index = classes.findIndex((cls) => cls.name === updatedClass.name);

      if (index === -1) {
        throw new Error('Class not found');
      }

      classes[index] = updatedClass;
      return this.saveClasses(classes);
    } catch (error) {
      console.error('Error updating class:', error);
      return false;
    }
  }

  public async deleteClass(className: string): Promise<boolean> {
    try {
      const classes = await this.getSavedClasses();
      const filteredClasses = classes.filter((cls) => cls.name !== className);

      if (filteredClasses.length === classes.length) {
        throw new Error('Class not found');
      }

      return this.saveClasses(filteredClasses);
    } catch (error) {
      console.error('Error deleting class:', error);
      return false;
    }
  }

  public async resetStorage(): Promise<boolean> {
    try {
      await figma.clientStorage.deleteAsync(STORAGE_KEY);
      return true;
    } catch (error) {
      console.error('Error resetting storage:', error);
      return false;
    }
  }

  public async backupClasses(): Promise<string | null> {
    try {
      const classes = await this.getSavedClasses();
      return JSON.stringify(classes);
    } catch (error) {
      console.error('Error creating backup:', error);
      return null;
    }
  }

  public async restoreFromBackup(backup: string): Promise<boolean> {
    try {
      const classes = JSON.parse(backup);
      if (!Array.isArray(classes)) {
        throw new Error('Invalid backup format');
      }
      return this.saveClasses(classes);
    } catch (error) {
      console.error('Error restoring from backup:', error);
      return false;
    }
  }
}

export const storageService = StorageService.getInstance();
