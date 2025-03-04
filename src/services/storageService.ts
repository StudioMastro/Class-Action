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

    // Verifica le proprietà obbligatorie
    const hasRequiredProps =
      'name' in candidate &&
      typeof candidate.name === 'string' &&
      'width' in candidate &&
      typeof candidate.width === 'number' &&
      'height' in candidate &&
      typeof candidate.height === 'number' &&
      'layoutMode' in candidate &&
      typeof candidate.layoutMode === 'string';

    if (!hasRequiredProps) return false;

    // Verifica che variableReferences, se presente, sia un oggetto
    if ('variableReferences' in candidate) {
      const variableRefs = candidate.variableReferences;
      if (
        variableRefs !== undefined &&
        (typeof variableRefs !== 'object' || variableRefs === null)
      ) {
        console.warn('StorageService: Invalid variableReferences format:', variableRefs);
        return false;
      }
    }

    return true;
  }

  public async getSavedClasses(): Promise<SavedClass[]> {
    try {
      console.log('StorageService: Retrieving saved classes from storage key:', STORAGE_KEY);
      const savedClasses = await figma.clientStorage.getAsync(STORAGE_KEY);
      console.log('StorageService: Raw data retrieved from storage:', savedClasses);

      if (!savedClasses) {
        console.log('StorageService: No saved classes found, initializing empty array');
        return [];
      }

      // Validate the data structure
      if (!Array.isArray(savedClasses)) {
        console.error(
          'StorageService: Invalid data structure in storage - not an array:',
          savedClasses,
        );
        // Reset storage to prevent future errors
        console.log('StorageService: Resetting storage due to invalid data structure');
        await this.resetStorage();
        return [];
      }

      console.log('StorageService: Retrieved array of length:', savedClasses.length);

      // Filter out invalid classes
      const validClasses = savedClasses.filter((cls) => {
        const isValid = this.validateSavedClass(cls);
        if (!isValid) {
          console.warn('StorageService: Invalid class found in storage:', cls);
        }
        return isValid;
      });

      console.log('StorageService: Valid classes count:', validClasses.length);

      if (validClasses.length !== savedClasses.length) {
        console.warn(
          `StorageService: Found ${savedClasses.length - validClasses.length} invalid classes that were filtered out`,
        );
        // Save only the valid classes back to storage
        console.log('StorageService: Saving only valid classes back to storage');
        await this.saveClasses(validClasses);
      }

      return validClasses;
    } catch (error) {
      console.error('StorageService: Error retrieving saved classes:', error);
      return [];
    }
  }

  public async saveClasses(classes: SavedClass[]): Promise<boolean> {
    try {
      console.log('StorageService: Saving classes to storage, count:', classes.length);
      await figma.clientStorage.setAsync(STORAGE_KEY, classes);
      console.log('StorageService: Classes saved successfully');
      return true;
    } catch (error) {
      console.error('StorageService: Error saving classes:', error);
      return false;
    }
  }

  public async addClass(newClass: SavedClass): Promise<boolean> {
    try {
      console.log('StorageService: Adding new class:', newClass.name);
      const classes = await this.getSavedClasses();
      console.log('StorageService: Retrieved existing classes, count:', classes.length);

      const exists = classes.some((cls) => cls.name.toLowerCase() === newClass.name.toLowerCase());
      console.log('StorageService: Class already exists?', exists);

      if (exists) {
        throw new Error('A class with this name already exists');
      }

      classes.push(newClass);
      console.log('StorageService: Added new class, new count:', classes.length);
      return this.saveClasses(classes);
    } catch (error) {
      console.error('StorageService: Error adding class:', error);
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
