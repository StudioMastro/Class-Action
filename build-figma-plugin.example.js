const dotenv = require('dotenv');

// Carica le variabili d'ambiente dal file .env
dotenv.config();

// Default values for development
// Nota: Il plugin ora utilizza gli endpoint diretti di LemonSqueezy invece del proxy CORS
const defaultConfig = {
  NODE_ENV: 'development',
  LEMONSQUEEZY_API_KEY: 'YOUR_API_KEY_HERE',
  LEMONSQUEEZY_STORE_ID: 'YOUR_STORE_ID_HERE',
  LEMONSQUEEZY_PRODUCT_ID: 'YOUR_PRODUCT_ID_HERE',
  LEMONSQUEEZY_CHECKOUT_URL: 'YOUR_CHECKOUT_URL_HERE',
};

// Get environment variables with fallbacks
const config = {
  NODE_ENV: process.env.NODE_ENV || defaultConfig.NODE_ENV,
  LEMONSQUEEZY_API_KEY: process.env.LEMONSQUEEZY_API_KEY || defaultConfig.LEMONSQUEEZY_API_KEY,
  LEMONSQUEEZY_STORE_ID: process.env.LEMONSQUEEZY_STORE_ID || defaultConfig.LEMONSQUEEZY_STORE_ID,
  LEMONSQUEEZY_PRODUCT_ID:
    process.env.LEMONSQUEEZY_PRODUCT_ID || defaultConfig.LEMONSQUEEZY_PRODUCT_ID,
  LEMONSQUEEZY_CHECKOUT_URL:
    process.env.LEMONSQUEEZY_CHECKOUT_URL || defaultConfig.LEMONSQUEEZY_CHECKOUT_URL,
};

// Validate configuration for production builds
function validateConfig() {
  const errors = [];

  if (config.NODE_ENV === 'production') {
    if (config.LEMONSQUEEZY_API_KEY === defaultConfig.LEMONSQUEEZY_API_KEY) {
      errors.push('Missing LEMONSQUEEZY_API_KEY for production build');
    }

    if (config.LEMONSQUEEZY_STORE_ID === defaultConfig.LEMONSQUEEZY_STORE_ID) {
      errors.push('Missing LEMONSQUEEZY_STORE_ID for production build');
    }

    if (config.LEMONSQUEEZY_PRODUCT_ID === defaultConfig.LEMONSQUEEZY_PRODUCT_ID) {
      errors.push('Missing LEMONSQUEEZY_PRODUCT_ID for production build');
    }

    if (config.LEMONSQUEEZY_CHECKOUT_URL === defaultConfig.LEMONSQUEEZY_CHECKOUT_URL) {
      errors.push('Missing LEMONSQUEEZY_CHECKOUT_URL for production build');
    }
  }

  if (errors.length > 0) {
    console.error('Configuration validation failed:');
    errors.forEach((error) => console.error(`- ${error}`));
    process.exit(1);
  }
}

// Validate configuration before build
validateConfig();

// Log delle variabili (solo per debug)
console.log('Build configuration:', {
  NODE_ENV: config.NODE_ENV,
  LEMONSQUEEZY_API_KEY: config.LEMONSQUEEZY_API_KEY ? '***' : 'not set',
  LEMONSQUEEZY_STORE_ID: config.LEMONSQUEEZY_STORE_ID,
  LEMONSQUEEZY_PRODUCT_ID: config.LEMONSQUEEZY_PRODUCT_ID,
  LEMONSQUEEZY_CHECKOUT_URL: config.LEMONSQUEEZY_CHECKOUT_URL,
});

module.exports = function (buildOptions) {
  // Definisci le variabili che verranno sostituite durante la build
  const defines = {
    __NODE_ENV__: JSON.stringify(config.NODE_ENV),
    __LEMONSQUEEZY_API_KEY__: JSON.stringify(config.LEMONSQUEEZY_API_KEY),
    __LEMONSQUEEZY_STORE_ID__: JSON.stringify(config.LEMONSQUEEZY_STORE_ID),
    __LEMONSQUEEZY_PRODUCT_ID__: JSON.stringify(config.LEMONSQUEEZY_PRODUCT_ID),
    __LEMONSQUEEZY_CHECKOUT_URL__: JSON.stringify(config.LEMONSQUEEZY_CHECKOUT_URL),
  };

  // Aggiungi le definizioni alle opzioni di build
  return {
    ...buildOptions,
    define: {
      ...buildOptions.define,
      ...defines,
    },
  };
};
