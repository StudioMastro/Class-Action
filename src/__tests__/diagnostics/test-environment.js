/**
 * Test per verificare la configurazione delle variabili d'ambiente
 *
 * Questo script verifica che le variabili d'ambiente siano configurate correttamente
 * e che il meccanismo di fallback funzioni come previsto.
 *
 * NOTA: Questo test è progettato per essere eseguito in Node.js, non in Figma.
 *
 * Uso:
 * node src/__tests__/diagnostics/test-environment.js
 */

// Importa il modulo dotenv per caricare le variabili d'ambiente
const dotenv = require('dotenv');
const path = require('path');
const fs = require('fs');

// Funzione per caricare le variabili d'ambiente da un file specifico
function loadEnvFile(filename) {
  const envPath = path.resolve(process.cwd(), filename);
  if (fs.existsSync(envPath)) {
    const envConfig = dotenv.parse(fs.readFileSync(envPath));
    return {
      exists: true,
      config: envConfig,
    };
  }
  return {
    exists: false,
    config: {},
  };
}

// Funzione per testare la configurazione di produzione
function testProductionConfig() {
  console.log('\n=== TEST CONFIGURAZIONE DI PRODUZIONE ===');

  // Carica il file .env di produzione
  const prodEnv = loadEnvFile('.env');

  if (!prodEnv.exists) {
    console.error('❌ File .env non trovato');
    return false;
  }

  console.log('✅ File .env trovato');

  // Verifica le variabili richieste
  const requiredVars = [
    'LEMONSQUEEZY_API_KEY',
    'LEMONSQUEEZY_STORE_ID',
    'LEMONSQUEEZY_PRODUCT_ID',
    'LEMONSQUEEZY_CHECKOUT_URL',
  ];

  let allVarsPresent = true;

  for (const varName of requiredVars) {
    if (!prodEnv.config[varName]) {
      console.error(`❌ Variabile ${varName} non trovata in .env`);
      allVarsPresent = false;
    } else {
      console.log(`✅ Variabile ${varName} trovata in .env`);

      // Mostra il valore in modo sicuro (nascondendo l'API key)
      if (varName === 'LEMONSQUEEZY_API_KEY') {
        console.log(`   Valore: ${'*'.repeat(prodEnv.config[varName].length)}`);
      } else {
        console.log(`   Valore: ${prodEnv.config[varName]}`);
      }
    }
  }

  return allVarsPresent;
}

// Funzione per testare la configurazione di sviluppo
function testDevelopmentConfig() {
  console.log('\n=== TEST CONFIGURAZIONE DI SVILUPPO ===');

  // Carica il file .env.development
  const devEnv = loadEnvFile('.env.development');

  if (!devEnv.exists) {
    console.error('❌ File .env.development non trovato');
    return false;
  }

  console.log('✅ File .env.development trovato');

  // Verifica le variabili richieste
  const requiredVars = [
    'LEMONSQUEEZY_API_KEY',
    'LEMONSQUEEZY_STORE_ID',
    'LEMONSQUEEZY_PRODUCT_ID',
    'LEMONSQUEEZY_CHECKOUT_URL',
  ];

  let allVarsPresent = true;

  for (const varName of requiredVars) {
    if (!devEnv.config[varName]) {
      console.error(`❌ Variabile ${varName} non trovata in .env.development`);
      allVarsPresent = false;
    } else {
      console.log(`✅ Variabile ${varName} trovata in .env.development`);

      // Mostra il valore in modo sicuro (nascondendo l'API key)
      if (varName === 'LEMONSQUEEZY_API_KEY') {
        console.log(`   Valore: ${'*'.repeat(devEnv.config[varName].length)}`);
      } else {
        console.log(`   Valore: ${devEnv.config[varName]}`);
      }
    }
  }

  return allVarsPresent;
}

// Funzione per testare la configurazione del plugin ID
function testPluginIdConfig() {
  console.log('\n=== TEST CONFIGURAZIONE PLUGIN ID ===');

  // Carica il file .env.plugin
  const pluginEnv = loadEnvFile('.env.plugin');

  if (!pluginEnv.exists) {
    console.error('❌ File .env.plugin non trovato');
    return false;
  }

  console.log('✅ File .env.plugin trovato');

  // Verifica la variabile FIGMA_PLUGIN_ID
  if (!pluginEnv.config.FIGMA_PLUGIN_ID) {
    console.error('❌ Variabile FIGMA_PLUGIN_ID non trovata in .env.plugin');
    return false;
  }

  console.log(`✅ Variabile FIGMA_PLUGIN_ID trovata in .env.plugin`);
  console.log(`   Valore: ${pluginEnv.config.FIGMA_PLUGIN_ID}`);

  return true;
}

// Funzione per testare il meccanismo di fallback dell'URL di checkout
function testCheckoutUrlFallback() {
  console.log('\n=== TEST MECCANISMO DI FALLBACK URL DI CHECKOUT ===');

  // Importa il modulo build-config
  try {
    const buildConfig = require('../../../build-config');

    // Ottieni l'URL di checkout di produzione
    const checkoutUrl = buildConfig.getProductionCheckoutUrl();

    if (!checkoutUrl) {
      console.error('❌ URL di checkout non trovato');
      return false;
    }

    console.log(`✅ URL di checkout ottenuto: ${checkoutUrl}`);

    // Verifica se è l'URL di fallback
    if (checkoutUrl.includes('1edb7f3c-cf47-4a79-b2c6-c7b5980c1cc3')) {
      console.log("ℹ️ L'URL di checkout è quello di fallback");
    } else if (checkoutUrl.includes('35279b0a-132c-4e10-8408-c6d1409eb28c')) {
      console.log("ℹ️ L'URL di checkout è quello di sviluppo");
    } else {
      console.log("ℹ️ L'URL di checkout è personalizzato");
    }

    return true;
  } catch (error) {
    console.error(`❌ Errore durante il test del fallback: ${error.message}`);
    return false;
  }
}

// Funzione principale che esegue tutti i test
async function runTests() {
  console.log("Inizio test della configurazione delle variabili d'ambiente...\n");

  // Test della configurazione di produzione
  const prodResult = testProductionConfig();

  // Test della configurazione di sviluppo
  const devResult = testDevelopmentConfig();

  // Test della configurazione del plugin ID
  const pluginIdResult = testPluginIdConfig();

  // Test del meccanismo di fallback dell'URL di checkout
  const fallbackResult = testCheckoutUrlFallback();

  // Riepilogo dei test
  console.log('\n=== RIEPILOGO TEST ===');
  console.log(`Configurazione di produzione: ${prodResult ? '✅ SUCCESSO' : '❌ FALLIMENTO'}`);
  console.log(`Configurazione di sviluppo: ${devResult ? '✅ SUCCESSO' : '❌ FALLIMENTO'}`);
  console.log(`Configurazione del plugin ID: ${pluginIdResult ? '✅ SUCCESSO' : '❌ FALLIMENTO'}`);
  console.log(`Meccanismo di fallback URL: ${fallbackResult ? '✅ SUCCESSO' : '❌ FALLIMENTO'}`);

  return {
    production: prodResult,
    development: devResult,
    pluginId: pluginIdResult,
    fallback: fallbackResult,
  };
}

// Esporta le funzioni per l'uso in altri moduli
module.exports = {
  testProductionConfig,
  testDevelopmentConfig,
  testPluginIdConfig,
  testCheckoutUrlFallback,
  runTests,
};

// Esegui i test se questo file viene eseguito direttamente
if (require.main === module) {
  runTests().catch((error) => {
    console.error("Errore durante l'esecuzione dei test:", error);
  });
}
