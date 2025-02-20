const fs = require('fs');
const path = require('path');

// Leggi i valori di produzione da un file sicuro o da variabili CI
const PRODUCTION_VALUES = {
  API_KEY: process.env.PROD_LEMONSQUEEZY_API_KEY,
  STORE_ID: process.env.PROD_LEMONSQUEEZY_STORE_ID,
  PRODUCT_ID: process.env.PROD_LEMONSQUEEZY_PRODUCT_ID
};

// Percorso del file di configurazione
const configPath = path.join(__dirname, '../src/config/lemonSqueezy.ts');

// Leggi il file di configurazione
let configContent = fs.readFileSync(configPath, 'utf8');

// Sostituisci i placeholder con i valori di produzione
Object.entries(PRODUCTION_VALUES).forEach(([key, value]) => {
  configContent = configContent.replace(`__PRODUCTION_${key}__`, value);
});

// Scrivi il file aggiornato
fs.writeFileSync(configPath, configContent); 