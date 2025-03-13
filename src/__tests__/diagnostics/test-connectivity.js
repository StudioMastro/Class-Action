/**
 * Test di connettività con gli endpoint di LemonSqueezy
 *
 * Questo script verifica la connettività con gli endpoint di LemonSqueezy
 * utilizzando gli endpoint diretti.
 *
 * Nota: Questo test è compatibile con l'ambiente Figma (non utilizza process.env)
 *
 * Uso:
 * node src/__tests__/diagnostics/test-connectivity.js
 */

const https = require('https');
const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');

// Endpoint da testare
const ENDPOINTS = [
  'https://api.lemonsqueezy.com/v1/licenses/activate',
  'https://api.lemonsqueezy.com/v1/licenses/validate',
  'https://api.lemonsqueezy.com/v1/licenses/deactivate',
];

// Funzione per testare un endpoint
function testEndpoint(url) {
  return new Promise((resolve) => {
    console.log(`[TEST] Testing connectivity to: ${url}`);

    const req = https.request(url, { method: 'HEAD' }, (res) => {
      console.log(`[TEST] Response status: ${res.statusCode} ${res.statusMessage}`);

      // Consideriamo un successo qualsiasi risposta (anche 404) perché significa che l'endpoint è raggiungibile
      resolve({
        url,
        success: true,
        status: res.statusCode,
        message: res.statusMessage,
      });
    });

    req.on('error', (error) => {
      console.error(`[TEST] Error connecting to ${url}: ${error.message}`);
      resolve({
        url,
        success: false,
        error: error.message,
      });
    });

    req.end();
  });
}

// Funzione per testare l'URL di checkout
function testCheckoutUrl(checkoutUrl) {
  if (!checkoutUrl) {
    console.log('[TEST] No checkout URL provided, skipping test');
    return Promise.resolve({
      url: 'N/A',
      success: false,
      error: 'No checkout URL provided',
    });
  }

  console.log(`[TEST] Testing checkout URL: ${checkoutUrl}`);

  // Verifica che l'URL sia valido
  try {
    const parsedUrl = new URL(checkoutUrl);

    // Verifica che l'URL sia un dominio LemonSqueezy
    if (!parsedUrl.hostname.includes('lemonsqueezy.com')) {
      console.warn(
        `[TEST] Warning: Checkout URL does not point to lemonsqueezy.com: ${parsedUrl.hostname}`,
      );
    }

    // Procedi con il test di connettività
    return testEndpoint(checkoutUrl);
  } catch (error) {
    console.error(`[TEST] Invalid checkout URL: ${error.message}`);
    return Promise.resolve({
      url: checkoutUrl,
      success: false,
      error: `Invalid URL: ${error.message}`,
    });
  }
}

// Funzione per caricare l'URL di checkout direttamente dal file .env
function loadCheckoutUrlFromEnv() {
  try {
    // Carica il file .env di produzione
    const envPath = path.resolve(process.cwd(), '.env');
    if (fs.existsSync(envPath)) {
      const envConfig = dotenv.parse(fs.readFileSync(envPath));
      const checkoutUrl = envConfig.LEMONSQUEEZY_CHECKOUT_URL;

      if (checkoutUrl) {
        console.log(`✅ Loaded production checkout URL from .env: ${checkoutUrl}`);
        return checkoutUrl;
      }
    }
  } catch (error) {
    console.log('[TEST] Unable to load checkout URL from .env file');
    console.log(`[TEST] Error: ${error.message}`);
  }

  return null;
}

// Funzione per caricare l'URL di checkout da build-config.js se disponibile
function loadCheckoutUrl() {
  // Prima tenta di caricare direttamente dal file .env
  const envCheckoutUrl = loadCheckoutUrlFromEnv();
  if (envCheckoutUrl) {
    return envCheckoutUrl;
  }

  try {
    // Tenta di importare build-config.js
    const buildConfig = require('../../../build-config');

    // Ottieni l'URL di checkout di produzione
    const checkoutUrl = buildConfig.getProductionCheckoutUrl();

    if (checkoutUrl) {
      console.log(`[TEST] Checkout URL loaded from build-config.js: ${checkoutUrl}`);
      return checkoutUrl;
    }
  } catch (error) {
    console.log('[TEST] Unable to load checkout URL from build-config.js');
    console.log(`[TEST] Error: ${error.message}`);
  }

  // URL di fallback
  console.log('[TEST] Using fallback checkout URL');
  return 'https://mastro.lemonsqueezy.com/buy/1edb7f3c-cf47-4a79-b2c6-c7b5980c1cc3';
}

// Funzione principale
async function runTests() {
  console.log('[TEST] Starting LemonSqueezy connectivity tests');

  const results = [];

  // Testiamo tutti gli endpoint
  for (const endpoint of ENDPOINTS) {
    const result = await testEndpoint(endpoint);
    results.push(result);
  }

  // Test dell'URL di checkout
  const checkoutUrl = loadCheckoutUrl();
  const checkoutResult = await testCheckoutUrl(checkoutUrl);
  results.push(checkoutResult);

  // Riepilogo dei test
  console.log('\n[TEST] Connectivity test summary:');

  let successCount = 0;
  for (const result of results) {
    const status = result.success ? `SUCCESS (${result.status})` : `FAILED (${result.error})`;

    if (result.success) successCount++;
    console.log(`- ${result.url}: ${status}`);
  }

  console.log(`\n[TEST] ${successCount}/${results.length} endpoints are reachable`);

  if (successCount === results.length) {
    console.log('\n[TEST] ✅ All endpoints are reachable. The network configuration is correct.');
  } else {
    console.log('\n[TEST] ❌ Some endpoints are not reachable. Check your network configuration.');
  }

  return {
    success: successCount === results.length,
    reachableCount: successCount,
    totalCount: results.length,
    results: results,
  };
}

// Esporta le funzioni per l'uso in altri moduli
module.exports = {
  testEndpoint,
  testCheckoutUrl,
  loadCheckoutUrl,
  loadCheckoutUrlFromEnv,
  runTests,
};

// Esegui i test se questo file viene eseguito direttamente
if (require.main === module) {
  runTests().catch((error) => {
    console.error('[TEST] Error running tests:', error);
  });
}
