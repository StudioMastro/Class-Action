const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');

// Carica le variabili d'ambiente da .env.development
const envPath = path.resolve(__dirname, '.env.development');
if (fs.existsSync(envPath)) {
  const envConfig = dotenv.parse(fs.readFileSync(envPath));
  for (const k in envConfig) {
    process.env[k] = envConfig[k];
  }
}

// Log delle variabili d'ambiente caricate (solo per debug)
console.log('Loaded environment variables:', {
  API_KEY: process.env.LEMONSQUEEZY_API_KEY ? '***' : undefined,
  STORE_ID: process.env.LEMONSQUEEZY_STORE_ID,
  PRODUCT_ID: process.env.LEMONSQUEEZY_PRODUCT_ID,
});
