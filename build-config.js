/**
 * Configurazione centralizzata per il processo di build
 * Questo file gestisce le configurazioni per gli ambienti di sviluppo e produzione
 */

const dotenv = require('dotenv');
const path = require('path');
const fs = require('fs');

// Variabile per memorizzare la configurazione già caricata
let cachedConfig = null;
// Variabile per memorizzare l'URL di checkout di produzione
let productionCheckoutUrl = null;
// Variabile per memorizzare l'ID del plugin
let pluginId = null;

/**
 * Ottiene l'ID del plugin dal file .env.plugin
 * @returns {string} ID del plugin
 */
function getPluginId() {
  // Se l'ID è già stato caricato, restituiscilo
  if (pluginId) {
    return pluginId;
  }

  // Carica il file .env.plugin
  const pluginEnvPath = path.resolve(process.cwd(), '.env.plugin');
  if (fs.existsSync(pluginEnvPath)) {
    const pluginEnvConfig = dotenv.parse(fs.readFileSync(pluginEnvPath));
    pluginId = pluginEnvConfig.FIGMA_PLUGIN_ID || '';

    if (pluginId) {
      console.log(`✅ Loaded plugin ID from .env.plugin: ${pluginId}`);
    } else {
      console.warn('⚠️ Plugin ID not found in .env.plugin');
      // Fallback all'ID nel package.json
      pluginId = 'class-action';
    }
  } else {
    console.warn('⚠️ Plugin .env.plugin file not found');
    // Fallback all'ID nel package.json
    pluginId = 'class-action';
  }

  return pluginId;
}

/**
 * Ottiene l'URL di checkout di produzione dal file .env
 * @returns {string} URL di checkout di produzione
 */
function getProductionCheckoutUrl() {
  // Se l'URL è già stato caricato, restituiscilo
  if (productionCheckoutUrl) {
    return productionCheckoutUrl;
  }

  // Carica il file .env di produzione
  const envPath = path.resolve(process.cwd(), '.env');
  if (fs.existsSync(envPath)) {
    const envConfig = dotenv.parse(fs.readFileSync(envPath));
    productionCheckoutUrl = envConfig.LEMONSQUEEZY_CHECKOUT_URL || '';

    if (productionCheckoutUrl) {
      console.log(`✅ Loaded production checkout URL from .env: ${productionCheckoutUrl}`);
    } else {
      console.warn('⚠️ Production checkout URL not found in .env');
      // Fallback a un URL hardcoded
      productionCheckoutUrl =
        'https://mastro.lemonsqueezy.com/buy/1edb7f3c-cf47-4a79-b2c6-c7b5980c1cc3';
    }
  } else {
    console.warn('⚠️ Production .env file not found');
    // Fallback a un URL hardcoded
    productionCheckoutUrl =
      'https://mastro.lemonsqueezy.com/buy/1edb7f3c-cf47-4a79-b2c6-c7b5980c1cc3';
  }

  return productionCheckoutUrl;
}

/**
 * Determina l'ambiente corrente e carica le variabili d'ambiente appropriate
 * @returns {Object} Configurazione dell'ambiente
 */
function loadEnvironment() {
  // Se la configurazione è già stata caricata, restituiscila
  if (cachedConfig) {
    return cachedConfig;
  }

  // Determina l'ambiente (development o production)
  const isDevelopment = process.env.NODE_ENV !== 'production';
  const environment = isDevelopment ? 'development' : 'production';

  console.log(`🔧 Building for ${environment} environment`);

  // Determina quale file .env caricare
  const envFile = isDevelopment ? '.env.development' : '.env';

  // Verifica se il file esiste
  const envPath = path.resolve(process.cwd(), envFile);
  if (!fs.existsSync(envPath)) {
    console.warn(`⚠️ Environment file ${envFile} not found at ${envPath}`);
    console.warn('⚠️ Using default values for environment variables');
  } else {
    console.log(`✅ Loading environment variables from ${envFile}`);
  }

  // Carica le variabili d'ambiente
  dotenv.config({ path: envPath });

  // Carica l'ID del plugin
  const pluginId = getPluginId();

  // Valori di default per lo sviluppo
  const defaultConfig = {
    NODE_ENV: 'development',
    LEMONSQUEEZY_API_KEY: 'test_key',
    LEMONSQUEEZY_STORE_ID: 'test_store',
    LEMONSQUEEZY_PRODUCT_ID: 'test_product',
    LEMONSQUEEZY_CHECKOUT_URL:
      'https://mastro.lemonsqueezy.com/buy/35279b0a-132c-4e10-8408-c6d1409eb28c',
    FIGMA_PLUGIN_ID: pluginId,
  };

  // Configurazione effettiva con fallback ai valori di default
  cachedConfig = {
    NODE_ENV: process.env.NODE_ENV || defaultConfig.NODE_ENV,
    LEMONSQUEEZY_API_KEY: process.env.LEMONSQUEEZY_API_KEY || defaultConfig.LEMONSQUEEZY_API_KEY,
    LEMONSQUEEZY_STORE_ID: process.env.LEMONSQUEEZY_STORE_ID || defaultConfig.LEMONSQUEEZY_STORE_ID,
    LEMONSQUEEZY_PRODUCT_ID:
      process.env.LEMONSQUEEZY_PRODUCT_ID || defaultConfig.LEMONSQUEEZY_PRODUCT_ID,
    LEMONSQUEEZY_CHECKOUT_URL:
      process.env.LEMONSQUEEZY_CHECKOUT_URL || defaultConfig.LEMONSQUEEZY_CHECKOUT_URL,
    FIGMA_PLUGIN_ID: defaultConfig.FIGMA_PLUGIN_ID,
    isDevelopment,
    environment,
  };

  // Validazione della configurazione
  validateConfig(cachedConfig);

  // Log della configurazione
  logConfig(cachedConfig);

  return cachedConfig;
}

/**
 * Valida la configurazione
 * @param {Object} config Configurazione da validare
 */
function validateConfig(config) {
  const errors = [];

  // In produzione, verifica che tutte le variabili d'ambiente necessarie siano definite
  if (config.NODE_ENV === 'production') {
    if (config.LEMONSQUEEZY_API_KEY === 'test_key') {
      errors.push('Missing LEMONSQUEEZY_API_KEY for production build');
    }

    if (config.LEMONSQUEEZY_STORE_ID === 'test_store') {
      errors.push('Missing LEMONSQUEEZY_STORE_ID for production build');
    }

    if (config.LEMONSQUEEZY_PRODUCT_ID === 'test_product') {
      errors.push('Missing LEMONSQUEEZY_PRODUCT_ID for production build');
    }

    if (config.LEMONSQUEEZY_CHECKOUT_URL.includes('35279b0a-132c-4e10-8408-c6d1409eb28c')) {
      errors.push('Missing LEMONSQUEEZY_CHECKOUT_URL for production build');
    }
  }

  // Se ci sono errori, mostrali e termina il processo
  if (errors.length > 0) {
    console.error('❌ Configuration validation failed:');
    errors.forEach((error) => console.error(`  - ${error}`));

    if (config.NODE_ENV === 'production') {
      console.error('❌ Aborting production build due to configuration errors');
      process.exit(1);
    } else {
      console.warn('⚠️ Continuing with development build despite configuration warnings');
    }
  }
}

/**
 * Mostra la configurazione nel log
 * @param {Object} config Configurazione da mostrare
 */
function logConfig(config) {
  console.log('📋 Build configuration:');
  console.log(`  - Environment: ${config.environment}`);
  console.log(`  - NODE_ENV: ${config.NODE_ENV}`);
  console.log(`  - LEMONSQUEEZY_API_KEY: ${config.LEMONSQUEEZY_API_KEY ? '***' : 'not set'}`);
  console.log(`  - LEMONSQUEEZY_STORE_ID: ${config.LEMONSQUEEZY_STORE_ID}`);
  console.log(`  - LEMONSQUEEZY_PRODUCT_ID: ${config.LEMONSQUEEZY_PRODUCT_ID}`);
  console.log(`  - LEMONSQUEEZY_CHECKOUT_URL: ${config.LEMONSQUEEZY_CHECKOUT_URL}`);
  console.log(`  - FIGMA_PLUGIN_ID: ${config.FIGMA_PLUGIN_ID}`);
}

// Esporta la configurazione
module.exports = {
  loadEnvironment,
  validateConfig,
  logConfig,
  getProductionCheckoutUrl,
  getPluginId,
};
