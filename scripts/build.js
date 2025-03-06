const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');

// Carica le variabili d'ambiente appropriate
function loadEnv() {
  const env = process.env.NODE_ENV || 'development';
  const envPath = path.resolve(process.cwd(), '.env');

  if (env === 'development' && fs.existsSync(envPath)) {
    dotenv.config({ path: envPath });
  }

  // Verifica che le variabili necessarie siano presenti
  const requiredVars = [
    'LEMONSQUEEZY_API_KEY',
    'LEMONSQUEEZY_STORE_ID',
    'LEMONSQUEEZY_PRODUCT_ID',
    'LEMONSQUEEZY_CHECKOUT_URL',
  ];

  const missingVars = requiredVars.filter((varName) => !process.env[varName]);

  if (env === 'production' && missingVars.length > 0) {
    throw new Error(`Missing required environment variables: ${missingVars.join(', ')}`);
  }
}

// Leggi i valori di produzione dalle variabili d'ambiente
const PRODUCTION_VALUES = {
  API_KEY: process.env.LEMONSQUEEZY_API_KEY || 'test_key',
  STORE_ID: process.env.LEMONSQUEEZY_STORE_ID || 'test_store',
  PRODUCT_ID: process.env.LEMONSQUEEZY_PRODUCT_ID || 'test_product',
  CHECKOUT_URL: process.env.LEMONSQUEEZY_CHECKOUT_URL || 'https://mastro.lemonsqueezy.com/checkout',
};

try {
  // Carica le variabili d'ambiente
  loadEnv();

  // Percorso del file di configurazione
  const configPath = path.join(__dirname, '../src/config/lemonSqueezy.ts');

  // Leggi il file di configurazione
  let configContent = fs.readFileSync(configPath, 'utf8');

  // Sostituisci i valori solo in produzione
  if (process.env.NODE_ENV === 'production') {
    Object.entries(PRODUCTION_VALUES).forEach(([key, value]) => {
      if (value && value !== 'test_key' && value !== 'test_store' && value !== 'test_product') {
        const regex = new RegExp(`${key}: ['"]test_.*?['"]`, 'g');
        configContent = configContent.replace(regex, `${key}: '${value}'`);
      }
    });

    // Aggiorna anche isDevelopment a false
    configContent = configContent.replace('isDevelopment: true', 'isDevelopment: false');

    // Scrivi il file aggiornato
    fs.writeFileSync(configPath, configContent);
    console.log('✅ Production configuration applied');
  } else {
    console.log('ℹ️ Development configuration maintained');
  }
} catch (error) {
  console.error('❌ Error during build configuration:', error);
  process.exit(1);
}
