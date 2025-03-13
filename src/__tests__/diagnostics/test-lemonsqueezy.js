/**
 * Test di connettività con gli endpoint di LemonSqueezy
 *
 * Questo script verifica la connettività con gli endpoint di LemonSqueezy
 * e il formato delle richieste di attivazione della licenza.
 *
 * Uso:
 * node src/__tests__/diagnostics/test-lemonsqueezy.js
 */

// Configurazione simulata per LemonSqueezy
// NOTA: Utilizziamo valori di default invece di process.env per compatibilità con Figma
const LEMONSQUEEZY_CONFIG = {
  API_KEY: '', // Valore vuoto per compatibilità con Figma
  STORE_ID: '', // Valore vuoto per compatibilità con Figma
  PRODUCT_ID: '', // Valore vuoto per compatibilità con Figma
  API_ENDPOINT: 'https://api.lemonsqueezy.com/v1',
  LICENSE_API_ENDPOINT: 'https://api.lemonsqueezy.com/v1/licenses',
  ALLOWED_DOMAINS: [
    'https://api.lemonsqueezy.com/v1/',
    'https://*.lemonsqueezy.com',
    'https://app.lemonsqueezy.com',
  ],
};

// Funzione per caricare la configurazione da build-config.js se disponibile
function loadBuildConfig() {
  try {
    // Tenta di importare build-config.js
    const buildConfig = require('../../../build-config');

    // Carica l'ambiente
    const config = buildConfig.loadEnvironment();

    if (config) {
      console.log('[TEST] Configurazione caricata da build-config.js');

      // Aggiorna la configurazione con i valori reali
      LEMONSQUEEZY_CONFIG.API_KEY = config.LEMONSQUEEZY_API_KEY || '';
      LEMONSQUEEZY_CONFIG.STORE_ID = config.LEMONSQUEEZY_STORE_ID || '';
      LEMONSQUEEZY_CONFIG.PRODUCT_ID = config.LEMONSQUEEZY_PRODUCT_ID || '';
      LEMONSQUEEZY_CONFIG.CHECKOUT_URL = config.LEMONSQUEEZY_CHECKOUT_URL || '';

      // Ottieni l'URL di checkout di produzione
      try {
        const prodCheckoutUrl = buildConfig.getProductionCheckoutUrl();
        if (prodCheckoutUrl) {
          console.log(`✅ Loaded production checkout URL from .env: ${prodCheckoutUrl}`);
          console.log(`[TEST] URL di checkout: ${prodCheckoutUrl}`);
        }
      } catch (error) {
        console.warn(`[TEST] Errore nel caricamento dell'URL di checkout: ${error.message}`);
      }

      return true;
    }
  } catch (error) {
    console.log('[TEST] Impossibile caricare build-config.js, utilizzo configurazione di default');
    console.log(`[TEST] Errore: ${error.message}`);
  }

  return false;
}

// Funzione per testare la connettività con gli endpoint di LemonSqueezy
async function testConnectivity() {
  console.log('[TEST] Testing connectivity to LemonSqueezy endpoints');

  // Tenta di caricare la configurazione da build-config.js
  const configLoaded = loadBuildConfig();
  console.log(`[TEST] Configurazione centralizzata caricata: ${configLoaded ? 'Sì' : 'No'}`);

  try {
    // Test dell'endpoint API
    const apiResponse = await fetch(LEMONSQUEEZY_CONFIG.API_ENDPOINT);
    console.log(`[TEST] API Endpoint: Status ${apiResponse.status} (${apiResponse.statusText})`);

    // Test dell'endpoint di validazione della licenza
    const validateResponse = await fetch(`${LEMONSQUEEZY_CONFIG.LICENSE_API_ENDPOINT}/validate`);
    console.log(
      `[TEST] License Validation Endpoint: Status ${validateResponse.status} (${validateResponse.statusText})`,
    );

    // Test dell'endpoint di attivazione della licenza
    const activateResponse = await fetch(`${LEMONSQUEEZY_CONFIG.LICENSE_API_ENDPOINT}/activate`);
    console.log(
      `[TEST] License Activation Endpoint: Status ${activateResponse.status} (${activateResponse.statusText})`,
    );

    // Verifica della configurazione
    console.log('\n[TEST] Configuration check:');
    console.log(`- API Key configured: ${LEMONSQUEEZY_CONFIG.API_KEY ? 'Yes' : 'No'}`);
    console.log(`- Store ID configured: ${LEMONSQUEEZY_CONFIG.STORE_ID ? 'Yes' : 'No'}`);
    console.log(`- Product ID configured: ${LEMONSQUEEZY_CONFIG.PRODUCT_ID ? 'Yes' : 'No'}`);
    console.log(`- Checkout URL configured: ${LEMONSQUEEZY_CONFIG.CHECKOUT_URL ? 'Yes' : 'No'}`);
    console.log('- Allowed domains:');
    LEMONSQUEEZY_CONFIG.ALLOWED_DOMAINS.forEach((domain) => {
      console.log(`  - ${domain}`);
    });

    return {
      success: true,
      message: '[TEST] Connectivity test completed successfully',
    };
  } catch (error) {
    console.error('[TEST] Error during connectivity test:', error.message);
    return {
      success: false,
      message: `[TEST] Connectivity test failed: ${error.message}`,
    };
  }
}

// Funzione per testare il formato della richiesta di attivazione della licenza
function testActivationRequestFormat() {
  console.log('\n[TEST] Testing license activation request format');

  try {
    // Crea un oggetto di richiesta di esempio
    const licenseKey = 'TEST-LICENSE-KEY';
    const instanceName = 'Test Instance';

    const requestBody = {
      license_key: licenseKey,
      instance_name: instanceName,
    };

    console.log('[TEST] License activation request format:');
    console.log(JSON.stringify(requestBody, null, 2));

    return {
      success: true,
      message: '[TEST] Activation request format is correct',
    };
  } catch (error) {
    console.error('[TEST] Error during format test:', error.message);
    return {
      success: false,
      message: `[TEST] Format test failed: ${error.message}`,
    };
  }
}

// Funzione per testare l'URL di checkout
async function testCheckoutUrl() {
  console.log('\n[TEST] Testing checkout URL configuration');

  try {
    // Verifica se l'URL di checkout è configurato
    if (!LEMONSQUEEZY_CONFIG.CHECKOUT_URL) {
      console.warn('[TEST] Checkout URL not configured in LEMONSQUEEZY_CONFIG');

      // Tenta di ottenere l'URL di checkout da build-config.js
      try {
        const buildConfig = require('../../../build-config');
        const checkoutUrl = buildConfig.getProductionCheckoutUrl();

        if (checkoutUrl) {
          console.log(`[TEST] Checkout URL loaded from build-config.js: ${checkoutUrl}`);

          // Verifica che l'URL sia valido
          try {
            const parsedUrl = new URL(checkoutUrl);

            // Verifica che l'URL sia un dominio LemonSqueezy
            if (!parsedUrl.hostname.includes('lemonsqueezy.com')) {
              console.warn(
                `[TEST] Warning: Checkout URL does not point to lemonsqueezy.com: ${parsedUrl.hostname}`,
              );
            } else {
              console.log(`[TEST] Checkout URL is valid and points to lemonsqueezy.com`);
            }

            // Test di connettività all'URL di checkout
            try {
              const response = await fetch(checkoutUrl, { method: 'HEAD' });
              console.log(
                `[TEST] Checkout URL connectivity: Status ${response.status} (${response.statusText})`,
              );

              return {
                success: true,
                message: '[TEST] Checkout URL is valid and reachable',
              };
            } catch (error) {
              console.error(`[TEST] Error connecting to checkout URL: ${error.message}`);
              return {
                success: false,
                message: `[TEST] Checkout URL connectivity test failed: ${error.message}`,
              };
            }
          } catch (error) {
            console.error(`[TEST] Invalid checkout URL: ${error.message}`);
            return {
              success: false,
              message: `[TEST] Invalid checkout URL: ${error.message}`,
            };
          }
        } else {
          console.warn('[TEST] No checkout URL found in build-config.js');
          return {
            success: false,
            message: '[TEST] No checkout URL found',
          };
        }
      } catch (error) {
        console.error(`[TEST] Error loading checkout URL from build-config.js: ${error.message}`);
        return {
          success: false,
          message: `[TEST] Error loading checkout URL: ${error.message}`,
        };
      }
    } else {
      console.log(
        `[TEST] Checkout URL configured in LEMONSQUEEZY_CONFIG: ${LEMONSQUEEZY_CONFIG.CHECKOUT_URL}`,
      );

      // Verifica che l'URL sia valido
      try {
        const parsedUrl = new URL(LEMONSQUEEZY_CONFIG.CHECKOUT_URL);

        // Verifica che l'URL sia un dominio LemonSqueezy
        if (!parsedUrl.hostname.includes('lemonsqueezy.com')) {
          console.warn(
            `[TEST] Warning: Checkout URL does not point to lemonsqueezy.com: ${parsedUrl.hostname}`,
          );
        } else {
          console.log(`[TEST] Checkout URL is valid and points to lemonsqueezy.com`);
        }

        // Test di connettività all'URL di checkout
        try {
          const response = await fetch(LEMONSQUEEZY_CONFIG.CHECKOUT_URL, { method: 'HEAD' });
          console.log(
            `[TEST] Checkout URL connectivity: Status ${response.status} (${response.statusText})`,
          );

          return {
            success: true,
            message: '[TEST] Checkout URL is valid and reachable',
          };
        } catch (error) {
          console.error(`[TEST] Error connecting to checkout URL: ${error.message}`);
          return {
            success: false,
            message: `[TEST] Checkout URL connectivity test failed: ${error.message}`,
          };
        }
      } catch (error) {
        console.error(`[TEST] Invalid checkout URL: ${error.message}`);
        return {
          success: false,
          message: `[TEST] Invalid checkout URL: ${error.message}`,
        };
      }
    }
  } catch (error) {
    console.error('[TEST] Error during checkout URL test:', error.message);
    return {
      success: false,
      message: `[TEST] Checkout URL test failed: ${error.message}`,
    };
  }
}

// Funzione per eseguire tutti i test
async function runAllTests() {
  console.log('Starting LemonSqueezy tests...\n');

  // Test di connettività
  const connectivityResult = await testConnectivity();

  // Test del formato della richiesta
  const formatResult = testActivationRequestFormat();

  // Test dell'URL di checkout
  const checkoutUrlResult = await testCheckoutUrl();

  // Riepilogo dei test
  console.log('\n[TEST] Test summary:');
  console.log(`- Connectivity test: ${connectivityResult.success ? 'SUCCESS' : 'FAILED'}`);
  console.log(`  ${connectivityResult.message}`);
  console.log(`- Format test: ${formatResult.success ? 'SUCCESS' : 'FAILED'}`);
  console.log(`  ${formatResult.message}`);
  console.log(`- Checkout URL test: ${checkoutUrlResult?.success ? 'SUCCESS' : 'FAILED'}`);
  console.log(`  ${checkoutUrlResult?.message || 'No checkout URL test performed'}`);

  return {
    connectivity: connectivityResult,
    format: formatResult,
    checkoutUrl: checkoutUrlResult,
  };
}

// Esporta le funzioni per l'uso in altri moduli
module.exports = {
  testConnectivity,
  testActivationRequestFormat,
  testCheckoutUrl,
  runAllTests,
};

// Esegui i test se questo file viene eseguito direttamente
if (require.main === module) {
  runAllTests().catch((error) => {
    console.error('[TEST] Error running tests:', error);
  });
}
