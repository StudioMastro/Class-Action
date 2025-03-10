/**
 * Analytics Configuration
 *
 * This file contains configuration settings for the analytics service.
 * Update these values with your actual endpoints and settings.
 */

// Environment-specific configuration
// Utilizziamo una soluzione sicura per verificare l'ambiente
const isProd =
  typeof process !== 'undefined' && process.env && process.env.NODE_ENV === 'production';

// Analytics endpoints
export const ANALYTICS_CONFIG = {
  // Endpoint centralizzato per l'invio dei dati di analytics
  endpoint: isProd
    ? 'https://class-action-analytics.vercel.app/api/test-analytics'
    : 'http://localhost:3000/analytics',

  // API key per l'autenticazione con il backend
  apiKey: 'class-action-analytics-key',

  // How often to automatically flush events (in milliseconds)
  flushInterval: 60000, // 1 minute

  // Maximum number of events to queue before forcing a flush
  maxQueueSize: 10,

  // Whether to enable debug logging
  debug: !isProd,

  // Plugin version (should be updated with each release)
  version: '1.0.5', // This should match your plugin version
};

// Event names for consistent tracking
export const ANALYTICS_EVENTS = {
  // Plugin lifecycle
  PLUGIN_STARTED: 'plugin_started',
  PLUGIN_CLOSED: 'plugin_closed',

  // Class operations
  CLASS_SAVED: 'class_saved',
  CLASS_APPLIED: 'class_applied',
  CLASS_UPDATED: 'class_updated',
  CLASS_DELETED: 'class_deleted',

  // Batch operations
  APPLY_ALL_MATCHING: 'apply_all_matching',
  APPLY_CLASS_TO_ALL: 'apply_class_to_all',

  // Import/Export
  CLASSES_EXPORTED: 'classes_exported',
  CLASSES_IMPORTED: 'classes_imported',

  // License
  LICENSE_ACTIVATED: 'license_activated',
  LICENSE_DEACTIVATED: 'license_deactivated',
  LICENSE_VALIDATION: 'license_validation',

  // Analytics
  ANALYTICS_PREFERENCE_SET: 'analytics_preference_set',

  // Feature usage
  PREMIUM_FEATURE_ACCESSED: 'premium_feature_accessed',
  PREMIUM_FEATURE_BLOCKED: 'premium_feature_blocked',

  // Errors
  ERROR_OCCURRED: 'error_occurred',
};

export default {
  ANALYTICS_CONFIG,
  ANALYTICS_EVENTS,
};
