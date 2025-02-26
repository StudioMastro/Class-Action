import { emit } from '@create-figma-plugin/utilities';

/**
 * Servizio API per l'UI del plugin
 * Gestisce le richieste API direttamente dall'UI, evitando le limitazioni del sandbox di Figma
 */

interface ApiRequestResult<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  statusCode?: number;
}

/**
 * Esegue una richiesta API direttamente dall'UI del plugin
 * @param url URL completo della richiesta
 * @param options Opzioni della richiesta fetch
 * @returns Risultato della richiesta
 */
export async function makeApiRequest<T = unknown>(
  url: string,
  options: RequestInit = {},
): Promise<ApiRequestResult<T>> {
  try {
    console.log('[UI API] 🚀 Invio richiesta a:', url, {
      method: options.method || 'GET',
      headers: options.headers,
      bodyLength: options.body
        ? typeof options.body === 'string'
          ? options.body.length
          : 'binary data'
        : 'no body',
    });

    // Aggiungi un timeout più breve
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 secondi di timeout

    // Aggiungi il signal alla richiesta
    const fetchOptions = {
      ...options,
      signal: controller.signal,
    };

    // Fai la richiesta
    const response = await fetch(url, fetchOptions);

    // Pulisci il timeout
    clearTimeout(timeoutId);

    // Leggi la risposta
    const text = await response.text();
    let data: unknown;
    try {
      data = JSON.parse(text);
    } catch (e) {
      data = { text };
    }

    const result: ApiRequestResult<T> = {
      success: response.ok,
      data: data as T,
      statusCode: response.status,
    };

    console.log('[UI API] ✅ Risposta ricevuta:', result);

    // Invia la risposta al main thread
    emit('API_RESPONSE', result);

    return result;
  } catch (error) {
    console.error('[UI API] ❌ Errore durante la richiesta:', error);

    const errorResult: ApiRequestResult<T> = {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };

    // Invia l'errore al main thread
    emit('API_RESPONSE', errorResult);

    return errorResult;
  }
}
