/**
 * Configurazione centralizzata per il processo di build
 * Questo file gestisce le configurazioni per gli ambienti di sviluppo e produzione
 */

const dotenv = require('dotenv');
const path = require('path');
const fs = require('fs');

// Variabile per memorizzare la configurazione già caricata
let cachedConfig = null;

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

  // Valori di default per lo sviluppo
  const defaultConfig = {
    NODE_ENV: 'development',
    LEMONSQUEEZY_API_KEY: 'test_key',
    LEMONSQUEEZY_STORE_ID: 'test_store',
    LEMONSQUEEZY_PRODUCT_ID: 'test_product',
    LEMONSQUEEZY_CHECKOUT_URL:
      'https://mastro.lemonsqueezy.com/buy/35279b0a-132c-4e10-8408-c6d1409eb28c',
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
}

// Esporta la configurazione
module.exports = {
  loadEnvironment,
  validateConfig,
  logConfig,
};
