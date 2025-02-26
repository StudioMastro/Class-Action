/**
 * Test di diagnostica per la connettività con LemonSqueezy
 * Questo file contiene funzioni per testare la connettività con l'API di LemonSqueezy
 * e verificare che il proxy CORS funzioni correttamente.
 */

import { LEMONSQUEEZY_CONFIG } from './config/lemonSqueezy';
import { licenseService } from './services/licenseService';

/**
 * Interfaccia per i risultati dei test
 */
interface TestResults {
  connectivityTest: { success: boolean; message: string };
  formatTest: { success: boolean; message: string };
}

/**
 * Testa la connettività con l'API di LemonSqueezy
 * Verifica che sia possibile raggiungere l'endpoint API attraverso il proxy CORS
 */
export async function testLemonSqueezyConnectivity(): Promise<{
  success: boolean;
  results: Array<{ endpoint: string; success: boolean; status?: number; error?: string }>;
}> {
  console.log('[TEST] 🧪 Avvio test di connettività con LemonSqueezy...');

  // Endpoint da testare
  const endpoints = [
    {
      name: 'API Endpoint (CORS Proxy)',
      url: 'https://api-cors-anywhere.lemonsqueezy.com/v1',
    },
    {
      name: 'API Endpoint (Direct)',
      url: 'https://api.lemonsqueezy.com/v1',
    },
    {
      name: 'License Validation Endpoint (CORS Proxy)',
      url: 'https://api-cors-anywhere.lemonsqueezy.com/v1/licenses/validate',
    },
    {
      name: 'License Activation Endpoint (CORS Proxy)',
      url: 'https://api-cors-anywhere.lemonsqueezy.com/v1/licenses/activate',
    },
  ];

  const results: Array<{ endpoint: string; success: boolean; status?: number; error?: string }> =
    [];
  let overallSuccess = false;

  for (const endpoint of endpoints) {
    console.log(`[TEST] 🧪 Testando endpoint: ${endpoint.name} - ${endpoint.url}`);

    try {
      // Facciamo una richiesta HEAD per verificare che l'endpoint sia raggiungibile
      const response = await fetch(endpoint.url, {
        method: 'HEAD',
        headers: {
          Accept: 'application/json',
        },
      });

      console.log(`[TEST] 🧪 Risposta da ${endpoint.name}:`, {
        status: response.status,
        statusText: response.statusText,
      });

      // Consideriamo un successo qualsiasi risposta HTTP (anche 401 o 404)
      // perché significa che abbiamo raggiunto il server
      results.push({
        endpoint: endpoint.name,
        success: true,
        status: response.status,
      });

      // Se almeno un endpoint con CORS proxy funziona, consideriamo il test riuscito
      if (endpoint.url.includes('api-cors-anywhere') && response.status < 500) {
        overallSuccess = true;
      }
    } catch (error) {
      console.error(`[TEST] 🧪 Errore durante il test di ${endpoint.name}:`, error);

      results.push({
        endpoint: endpoint.name,
        success: false,
        error: error instanceof Error ? error.message : 'Errore sconosciuto',
      });
    }
  }

  // Verifica della configurazione
  console.log('[TEST] 🧪 Verifica della configurazione LemonSqueezy:');
  console.log('[TEST] 🧪 API Endpoint:', LEMONSQUEEZY_CONFIG.API_ENDPOINT);
  console.log('[TEST] 🧪 License API Endpoint:', LEMONSQUEEZY_CONFIG.LICENSE_API_ENDPOINT);
  console.log('[TEST] 🧪 Store ID:', LEMONSQUEEZY_CONFIG.STORE_ID);
  console.log('[TEST] 🧪 Product ID:', LEMONSQUEEZY_CONFIG.PRODUCT_ID);
  console.log('[TEST] 🧪 API Key configurata:', !!LEMONSQUEEZY_CONFIG.API_KEY);

  // Verifica del manifest.json
  console.log('[TEST] 🧪 Verifica del manifest.json:');
  console.log('[TEST] 🧪 I domini consentiti dovrebbero includere:');
  console.log('[TEST] 🧪 - https://api.lemonsqueezy.com');
  console.log('[TEST] 🧪 - https://*.lemonsqueezy.com');
  console.log('[TEST] 🧪 - https://api-cors-anywhere.lemonsqueezy.com');
  console.log('[TEST] 🧪 - https://app.lemonsqueezy.com');

  // Riepilogo dei risultati
  console.log('[TEST] 🧪 Riepilogo dei risultati:');
  for (const result of results) {
    console.log(
      `[TEST] 🧪 ${result.endpoint}: ${result.success ? '✅ OK' : '❌ FALLITO'} ${result.status ? `(Status: ${result.status})` : ''} ${result.error ? `(Errore: ${result.error})` : ''}`,
    );
  }

  console.log(
    `[TEST] 🧪 Risultato complessivo: ${overallSuccess ? '✅ SUCCESSO' : '❌ FALLIMENTO'}`,
  );

  return {
    success: overallSuccess,
    results,
  };
}

/**
 * Testa il formato delle richieste di attivazione della licenza
 * Verifica che il formato delle richieste sia corretto
 */
export async function testLicenseActivationFormat(): Promise<{
  success: boolean;
  message: string;
}> {
  console.log('[TEST] 🧪 Avvio test del formato di attivazione della licenza...');

  // Verifica che il formato della richiesta sia corretto
  const testLicenseKey = 'test-license-key';
  const testInstanceId = 'test-instance-id';
  const testInstanceName = 'Test Instance';

  // Crea i dati del form nel formato corretto senza usare URLSearchParams
  // che non è disponibile nell'ambiente Figma
  let formData = '';
  formData += 'license_key=' + encodeURIComponent(testLicenseKey);
  formData += '&instance_identifier=' + encodeURIComponent(testInstanceId);
  formData += '&instance_name=' + encodeURIComponent(testInstanceName);

  // Aggiungi store_id e product_id se disponibili
  if (LEMONSQUEEZY_CONFIG.STORE_ID) {
    formData += '&store_id=' + encodeURIComponent(LEMONSQUEEZY_CONFIG.STORE_ID);
  }
  if (LEMONSQUEEZY_CONFIG.PRODUCT_ID) {
    formData += '&product_id=' + encodeURIComponent(LEMONSQUEEZY_CONFIG.PRODUCT_ID);
  }

  console.log('[TEST] 🧪 Formato della richiesta di attivazione:', formData);

  // Verifica che il formato sia corretto
  const formatCorrect =
    formData.includes('license_key=') &&
    formData.includes('instance_identifier=') &&
    formData.includes('instance_name=');

  console.log('[TEST] 🧪 Formato della richiesta corretto:', formatCorrect);

  return {
    success: formatCorrect,
    message: formatCorrect
      ? 'Il formato della richiesta di attivazione è corretto'
      : 'Il formato della richiesta di attivazione non è corretto',
  };
}

/**
 * Esegue tutti i test di diagnostica
 */
export async function runAllTests(uiReady: boolean = false): Promise<TestResults> {
  const results: TestResults = {
    connectivityTest: { success: false, message: 'Not run' },
    formatTest: { success: false, message: 'Not run' },
  };

  try {
    // Test di connettività
    console.log('Esecuzione test di connettività...');
    await licenseService.testActivationEndpoint(uiReady);
    results.connectivityTest = { success: true, message: 'Connectivity test passed' };
  } catch (error) {
    results.connectivityTest = {
      success: false,
      message: error instanceof Error ? error.message : 'Unknown error',
    };
  }

  try {
    // Test del formato delle richieste
    console.log('Esecuzione test del formato delle richieste...');
    const formatResult = await testLicenseActivationFormat();
    results.formatTest = {
      success: formatResult.success,
      message: formatResult.message,
    };
  } catch (error) {
    results.formatTest = {
      success: false,
      message: error instanceof Error ? error.message : 'Unknown error',
    };
  }

  return results;
}
