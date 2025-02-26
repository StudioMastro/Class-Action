/**
 * Test diagnostico consolidato per l'integrazione con Lemon Squeezy License API
 * Questo test verifica la comunicazione con l'API di Lemon Squeezy e aiuta a identificare problemi di CORS o di configurazione
 * Basato sulla documentazione ufficiale: https://docs.lemonsqueezy.com/help/licensing/license-api
 */

describe('Lemon Squeezy API Diagnostic', () => {
  // Configurazione per i test
  const apiKey = process.env.LEMONSQUEEZY_API_KEY || '';
  const storeId = process.env.LEMONSQUEEZY_STORE_ID || '';
  const productId = process.env.LEMONSQUEEZY_PRODUCT_ID || '';

  // URL per i test
  const corsProxyUrl = 'https://api-cors-anywhere.lemonsqueezy.com';
  const directApiUrl = 'https://api.lemonsqueezy.com';

  beforeAll(() => {
    // Log delle variabili d'ambiente per debug
    console.log('Test environment:', {
      API_KEY: apiKey ? '***' : 'missing',
      STORE_ID: storeId || 'missing',
      PRODUCT_ID: productId || 'missing',
      NODE_ENV: process.env.NODE_ENV,
    });
  });

  // Helper per convertire una stringa in Uint8Array (necessario per Figma)
  function stringToUint8Array(str: string): Uint8Array {
    const encoder = new TextEncoder();
    return encoder.encode(str);
  }

  // Helper per assicurarsi che l'URL utilizzi il proxy CORS
  function ensureCorsProxyUrl(url: string): string {
    if (url.includes('api-cors-anywhere.lemonsqueezy.com')) {
      return url;
    }

    if (url.includes('api.lemonsqueezy.com')) {
      return url.replace('api.lemonsqueezy.com', 'api-cors-anywhere.lemonsqueezy.com');
    }

    return url;
  }

  // Helper per convertire un oggetto in formato x-www-form-urlencoded
  function objectToFormData(obj: Record<string, string>): string {
    return Object.entries(obj)
      .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
      .join('&');
  }

  describe('Basic connectivity tests', () => {
    it('should be able to connect to the direct API endpoint (expect CORS error in browser)', async () => {
      try {
        const response = await fetch(directApiUrl + '/v1', {
          method: 'GET',
          headers: {
            Accept: 'application/vnd.api+json',
          },
        });

        console.log('Direct API response:', {
          status: response.status,
          statusText: response.statusText,
        });

        // In Node.js, ci aspettiamo 401 (non autorizzato)
        expect(response.status).toBe(401);
      } catch (error) {
        console.log('Direct API error (expected in browser):', (error as Error).message);
        // In un browser, ci aspettiamo un errore CORS
      }
    });

    it('should be able to connect to the CORS proxy endpoint', async () => {
      try {
        const response = await fetch(corsProxyUrl + '/v1', {
          method: 'GET',
          headers: {
            Accept: 'application/vnd.api+json',
          },
        });

        console.log('CORS proxy response:', {
          status: response.status,
          statusText: response.statusText,
        });

        // 401 o 404 sono ok, significa che abbiamo raggiunto il server
        expect([401, 404]).toContain(response.status);
      } catch (error) {
        console.error('CORS proxy error (unexpected):', error);
        throw error; // Questo non dovrebbe fallire
      }
    });

    it('should correctly convert URL to use CORS proxy', () => {
      const originalUrl = 'https://api.lemonsqueezy.com/v1/licenses/validate';
      const proxiedUrl = ensureCorsProxyUrl(originalUrl);

      console.log('URL conversion:', {
        original: originalUrl,
        proxied: proxiedUrl,
      });

      expect(proxiedUrl).toBe('https://api-cors-anywhere.lemonsqueezy.com/v1/licenses/validate');
    });

    it('should correctly convert string body to Uint8Array', () => {
      const testBody = JSON.stringify({ license_key: 'test-key' });
      const convertedBody = stringToUint8Array(testBody);

      console.log('Body conversion:', {
        original: testBody,
        convertedType: typeof convertedBody,
        convertedLength: convertedBody.length,
      });

      expect(convertedBody).toBeInstanceOf(Uint8Array);
      expect(convertedBody.length).toBeGreaterThan(0);
    });
  });

  describe('API authentication tests', () => {
    it('should authenticate with the API using the CORS proxy', async () => {
      if (!apiKey) {
        console.warn('Skipping authentication test: No API key provided');
        return;
      }

      try {
        const response = await fetch(corsProxyUrl + '/v1', {
          method: 'GET',
          headers: {
            Accept: 'application/vnd.api+json',
            Authorization: `Bearer ${apiKey}`,
          },
        });

        console.log('Authenticated API response:', {
          status: response.status,
          statusText: response.statusText,
        });

        // Se siamo autenticati, dovremmo ottenere 200 OK o 404 (endpoint non trovato)
        expect([200, 404]).toContain(response.status);

        const data = await response.json();
        console.log('API response data:', data);
      } catch (error) {
        console.error('Authentication error:', error);
        throw error;
      }
    });
  });

  describe('License API format tests', () => {
    it('should test connection to the License API', async () => {
      try {
        // Secondo la documentazione, l'endpoint corretto è /v1/licenses/validate
        const response = await fetch(`${corsProxyUrl}/v1/licenses/validate`, {
          method: 'GET',
          headers: {
            Accept: 'application/json',
          },
        });

        console.log('License API connection response:', {
          status: response.status,
          statusText: response.statusText,
        });

        // Ci aspettiamo un errore 422 (Unprocessable Entity) perché non abbiamo fornito i parametri richiesti
        // o un 404 se l'endpoint non esiste
        expect([404, 422]).toContain(response.status);

        const data = await response.json();
        console.log('License API response data:', data);
      } catch (error) {
        console.error('License API connection error:', error);
        throw error;
      }
    });

    it('should validate a license key with correct format', async () => {
      if (!apiKey) {
        console.warn('Skipping license validation test: No API key provided');
        return;
      }

      const testLicenseKey = 'test-license-key';
      const instanceId = `test-device-${Date.now()}`;

      try {
        // Preparare i dati nel formato corretto (x-www-form-urlencoded)
        const formData = objectToFormData({
          license_key: testLicenseKey,
          instance_identifier: instanceId,
        });

        // Fare la richiesta con gli header corretti
        const response = await fetch(`${corsProxyUrl}/v1/licenses/validate`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            Accept: 'application/json',
            Authorization: `Bearer ${apiKey}`,
          },
          body: formData,
        });

        console.log('License validation response:', {
          status: response.status,
          statusText: response.statusText,
        });

        const data = await response.json();
        console.log('License validation data:', data);

        // La risposta potrebbe contenere un errore, ma dovrebbe essere in formato JSON
        expect(data).toBeDefined();
      } catch (error) {
        console.error('License validation error:', error);
        throw error;
      }
    });

    it('should try to activate a license key with correct format', async () => {
      if (!apiKey) {
        console.warn('Skipping license activation test: No API key provided');
        return;
      }

      const testLicenseKey = 'test-license-key';
      const instanceId = `test-device-${Date.now()}`;
      const instanceName = 'Test Device';

      try {
        // Preparare i dati nel formato corretto (x-www-form-urlencoded)
        const formData = objectToFormData({
          license_key: testLicenseKey,
          instance_identifier: instanceId,
          instance_name: instanceName,
        });

        // Fare la richiesta con gli header corretti
        const response = await fetch(`${corsProxyUrl}/v1/licenses/activate`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            Accept: 'application/json',
            Authorization: `Bearer ${apiKey}`,
          },
          body: formData,
        });

        console.log('License activation response:', {
          status: response.status,
          statusText: response.statusText,
        });

        const data = await response.json();
        console.log('License activation data:', data);

        // La risposta potrebbe contenere un errore, ma dovrebbe essere in formato JSON
        expect(data).toBeDefined();
      } catch (error) {
        console.error('License activation error:', error);
        throw error;
      }
    });

    it('should try to deactivate a license key with correct format', async () => {
      if (!apiKey) {
        console.warn('Skipping license deactivation test: No API key provided');
        return;
      }

      const testLicenseKey = 'test-license-key';
      const instanceId = `test-device-${Date.now()}`;

      try {
        // Preparare i dati nel formato corretto (x-www-form-urlencoded)
        const formData = objectToFormData({
          license_key: testLicenseKey,
          instance_id: instanceId, // Nota: per deactivate si usa instance_id, non instance_identifier
        });

        // Fare la richiesta con gli header corretti
        const response = await fetch(`${corsProxyUrl}/v1/licenses/deactivate`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            Accept: 'application/json',
            Authorization: `Bearer ${apiKey}`,
          },
          body: formData,
        });

        console.log('License deactivation response:', {
          status: response.status,
          statusText: response.statusText,
        });

        const data = await response.json();
        console.log('License deactivation data:', data);

        // La risposta potrebbe contenere un errore, ma dovrebbe essere in formato JSON
        expect(data).toBeDefined();
      } catch (error) {
        console.error('License deactivation error:', error);
        throw error;
      }
    });
  });
});
