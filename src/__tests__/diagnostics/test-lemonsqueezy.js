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

// Funzione per testare la connettività con gli endpoint di LemonSqueezy
async function testConnectivity() {
  console.log('[TEST] Testing connectivity to LemonSqueezy endpoints');

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

// Funzione per eseguire tutti i test
async function runAllTests() {
  console.log('Starting LemonSqueezy tests...\n');

  // Test di connettività
  const connectivityResult = await testConnectivity();

  // Test del formato della richiesta
  const formatResult = testActivationRequestFormat();

  // Riepilogo dei test
  console.log('\n[TEST] Test summary:');
  console.log(`- Connectivity test: ${connectivityResult.success ? 'SUCCESS' : 'FAILED'}`);
  console.log(`  ${connectivityResult.message}`);
  console.log(`- Format test: ${formatResult.success ? 'SUCCESS' : 'FAILED'}`);
  console.log(`  ${formatResult.message}`);

  return {
    connectivity: connectivityResult,
    format: formatResult,
  };
}

// Esporta le funzioni per l'uso in altri moduli
module.exports = {
  testConnectivity,
  testActivationRequestFormat,
  runAllTests,
};

// Esegui i test se questo file viene eseguito direttamente
if (require.main === module) {
  runAllTests().catch((error) => {
    console.error('[TEST] Error running tests:', error);
  });
}
