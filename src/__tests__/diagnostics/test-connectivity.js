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

// Funzione principale
async function runTests() {
  console.log('[TEST] Starting LemonSqueezy connectivity tests');

  const results = [];

  // Testiamo tutti gli endpoint
  for (const endpoint of ENDPOINTS) {
    const result = await testEndpoint(endpoint);
    results.push(result);
  }

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
  runTests,
};

// Esegui i test se questo file viene eseguito direttamente
if (require.main === module) {
  runTests().catch((error) => {
    console.error('[TEST] Error running tests:', error);
  });
}
