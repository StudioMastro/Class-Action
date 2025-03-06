/**
 * This file modifies the manifest.json during the build process
 * to add network access configuration for the Lemon Squeezy API
 */

module.exports = function (manifest) {
  return {
    ...manifest,
    networkAccess: {
      allowedDomains: [
        'https://api.lemonsqueezy.com/v1/',
        'https://*.lemonsqueezy.com',
        'https://app.lemonsqueezy.com',
        'https://mastro.lemonsqueezy.com/buy/35279b0a-132c-4e10-8408-c6d1409eb28c',
      ],
      reasoning:
        'This plugin needs to communicate with the Lemon Squeezy API for license validation and activation.',
      devAllowedDomains: [
        // Server locali per lo sviluppo
        'http://localhost',
        'http://localhost:3000',
        'http://localhost:8080',
        // API di LemonSqueezy per lo sviluppo
        'https://api.lemonsqueezy.com/v1/',
        'https://*.lemonsqueezy.com',
        'https://app.lemonsqueezy.com',
        'https://mastro.lemonsqueezy.com/buy/35279b0a-132c-4e10-8408-c6d1409eb28c',
      ],
    },
  };
};
