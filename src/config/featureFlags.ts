/**
 * Feature Flags Configuration
 *
 * This file defines feature flags for different license tiers.
 */

// Maximum number of classes allowed for each tier
export const MAX_CLASSES = {
  FREE: 5,
  PREMIUM: Infinity,
} as const;

// Feature flags for different license tiers
export const FEATURE_FLAGS = {
  FREE: {
    // Basic features available in free tier
    'basic-usage': true,
    'class-management': true,
    search: true,
    export: false,
    import: false,
    'unlimited-classes': false,
    'advanced-search': false,
    'auto-backup': false,
  },
  PREMIUM: {
    // All features available in premium tier
    'basic-usage': true,
    'class-management': true,
    search: true,
    export: true,
    import: true,
    'unlimited-classes': true,
    'advanced-search': true,
    'auto-backup': true,
  },
} as const;

// User messages for license limitations
export const LICENSE_MESSAGES = {
  FREE_LIMIT_REACHED:
    'You have reached the maximum number of classes allowed in the free plan. Upgrade to premium for unlimited classes.',
  PREMIUM_FEATURE:
    'This feature is only available in the premium plan. Upgrade to access all features.',
  UPGRADE_CTA: 'Upgrade to Premium',
} as const;
