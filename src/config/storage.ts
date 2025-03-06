/**
 * Storage Keys Configuration
 *
 * This file defines constants for storage keys used throughout the application.
 */

export const STORAGE_KEYS = {
  // Device identifier for license activation
  DEVICE_ID: 'license_device_id',
  // License key storage
  LICENSE_KEY: 'license_key',
  // Last validation time
  LAST_VALIDATION: 'last_validation_time',
  // User preferences
  USER_PREFERENCES: 'user_preferences',
} as const;
