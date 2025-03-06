/**
 * LicenseManager
 *
 * Questo servizio gestisce l'attivazione, validazione e disattivazione delle licenze
 * utilizzando l'API LemonSqueezy. Gestisce automaticamente l'instance_id.
 */

import { getEndpoint } from '../config/lemonSqueezyEndpoints';
import {
  DeviceInfo,
  LicenseActivationResult,
  LicenseDeactivationResult,
  LemonSqueezyActivationResponse,
  LemonSqueezyDeactivationResponse,
  LemonSqueezyValidationResponse,
  LicenseStatusType,
  LicenseValidationResult,
  StoredLicenseData,
} from '../types/license';

/**
 * Classe che gestisce le operazioni di licenza
 */
export class LicenseManager {
  private licenseKey: string | null = null;
  private instanceId: string | null = null;
  private licenseStatus: LicenseStatusType = 'inactive';
  private licenseFeatures: string[] = [];
  private storageKey = 'license_data';

  constructor() {
    // Carica i dati della licenza dallo storage all'inizializzazione
    this.loadLicenseData().catch((err) => console.error('Error loading license data:', err));
  }

  /**
   * Attiva una licenza
   * @param licenseKey - Chiave di licenza da attivare
   * @returns Promise con il risultato dell'attivazione
   */
  public async activateLicense(licenseKey: string): Promise<LicenseActivationResult> {
    try {
      const endpoint = getEndpoint('ACTIVATE');
      const data = {
        license_key: licenseKey,
        instance_name: this.getInstanceName(),
      };

      const response = await this.makeRequest<LemonSqueezyActivationResponse>(endpoint, data);

      if (response.activated) {
        // Salva la chiave di licenza e l'instance_id
        this.licenseKey = licenseKey;
        this.instanceId = response.instance?.id || null;
        this.licenseStatus = 'active';
        this.licenseFeatures = this.extractFeatures(response);

        // Salva i dati della licenza
        this.saveLicenseData();

        // Emetti un evento (se hai un sistema di eventi)
        console.log('License activated successfully', {
          licenseKey,
          instanceId: this.instanceId,
          features: this.licenseFeatures,
        });

        return {
          success: true,
          message: 'License activated successfully',
          features: this.licenseFeatures,
        };
      } else {
        return {
          success: false,
          message: response.error || 'Failed to activate license',
          features: [],
        };
      }
    } catch (error) {
      console.error('Error activating license:', error);
      return {
        success: false,
        message: this.getErrorMessage(error),
        features: [],
      };
    }
  }

  /**
   * Valida una licenza precedentemente attivata
   * @returns Promise con il risultato della validazione
   */
  public async validateLicense(): Promise<LicenseValidationResult> {
    try {
      // Se non abbiamo una chiave di licenza o un instance_id, non possiamo validare
      if (!this.licenseKey || !this.instanceId) {
        return {
          valid: false,
          message: 'No active license to validate',
        };
      }

      const endpoint = getEndpoint('VALIDATE');
      const data = {
        license_key: this.licenseKey,
        instance_id: this.instanceId,
      };

      const response = await this.makeRequest<LemonSqueezyValidationResponse>(endpoint, data);

      if (response.valid) {
        this.licenseStatus = 'active';
        this.licenseFeatures = this.extractFeatures(response);

        // Aggiorna i dati della licenza
        this.saveLicenseData();

        // Emetti un evento (se hai un sistema di eventi)
        console.log('License validated successfully', {
          licenseKey: this.licenseKey,
          instanceId: this.instanceId,
          features: this.licenseFeatures,
        });

        return {
          valid: true,
          message: 'License is valid',
          features: this.licenseFeatures,
        };
      } else {
        this.licenseStatus = 'invalid';

        // Aggiorna i dati della licenza
        this.saveLicenseData();

        return {
          valid: false,
          message: response.error || 'License is invalid',
          features: [],
        };
      }
    } catch (error) {
      console.error('Error validating license:', error);
      return {
        valid: false,
        message: this.getErrorMessage(error),
        features: [],
      };
    }
  }

  /**
   * Disattiva una licenza precedentemente attivata
   * @returns Promise con il risultato della disattivazione
   */
  public async deactivateLicense(): Promise<LicenseDeactivationResult> {
    try {
      // Se non abbiamo una chiave di licenza o un instance_id, non possiamo disattivare
      if (!this.licenseKey || !this.instanceId) {
        return {
          success: false,
          message: 'No active license to deactivate',
        };
      }

      const endpoint = getEndpoint('DEACTIVATE');
      const data = {
        license_key: this.licenseKey,
        instance_id: this.instanceId,
      };

      const response = await this.makeRequest<LemonSqueezyDeactivationResponse>(endpoint, data);

      if (response.deactivated) {
        // Resetta i dati della licenza
        this.licenseKey = null;
        this.instanceId = null;
        this.licenseStatus = 'inactive';
        this.licenseFeatures = [];

        // Aggiorna i dati della licenza
        this.saveLicenseData();

        // Emetti un evento (se hai un sistema di eventi)
        console.log('License deactivated successfully');

        return {
          success: true,
          message: 'License deactivated successfully',
        };
      } else {
        return {
          success: false,
          message: response.error || 'Failed to deactivate license',
        };
      }
    } catch (error) {
      console.error('Error deactivating license:', error);
      return {
        success: false,
        message: this.getErrorMessage(error),
      };
    }
  }

  /**
   * Ottiene lo stato attuale della licenza
   * @returns Stato della licenza
   */
  public getLicenseStatus(): LicenseStatusType {
    return this.licenseStatus;
  }

  /**
   * Verifica se una feature è disponibile con la licenza attuale
   * @param feature - Feature da verificare
   * @returns true se la feature è disponibile, false altrimenti
   */
  public hasFeature(feature: string): boolean {
    return this.licenseFeatures.includes(feature);
  }

  /**
   * Ottiene tutte le feature disponibili con la licenza attuale
   * @returns Array di feature disponibili
   */
  public getFeatures(): string[] {
    return [...this.licenseFeatures];
  }

  /**
   * Ottiene l'instance_id corrente
   * @returns Instance ID o null se non disponibile
   */
  public getInstanceId(): string | null {
    return this.instanceId;
  }

  /**
   * Ottiene la chiave di licenza corrente
   * @returns Chiave di licenza o null se non disponibile
   */
  public getLicenseKey(): string | null {
    return this.licenseKey;
  }

  /**
   * Genera un nome per l'istanza basato su informazioni del dispositivo
   * @returns Nome dell'istanza
   */
  private getInstanceName(): string {
    // Genera un nome istanza basato su informazioni del dispositivo
    // Questo è importante per identificare l'istanza nel pannello LemonSqueezy
    const deviceInfo = this.getDeviceInfo();
    return `Figma Plugin - ${deviceInfo.browser} - ${deviceInfo.os} - ${new Date().toISOString()}`;
  }

  /**
   * Ottiene informazioni sul dispositivo
   * @returns Informazioni sul dispositivo
   */
  private getDeviceInfo(): DeviceInfo {
    // Implementazione semplificata per ottenere informazioni sul browser e sistema operativo
    const userAgent = navigator.userAgent;
    let browser = 'Unknown Browser';
    let os = 'Unknown OS';

    // Determina il browser
    if (userAgent.indexOf('Chrome') > -1) {
      browser = 'Chrome';
    } else if (userAgent.indexOf('Safari') > -1) {
      browser = 'Safari';
    } else if (userAgent.indexOf('Firefox') > -1) {
      browser = 'Firefox';
    } else if (userAgent.indexOf('MSIE') > -1 || userAgent.indexOf('Trident') > -1) {
      browser = 'Internet Explorer';
    } else if (userAgent.indexOf('Edge') > -1) {
      browser = 'Edge';
    }

    // Determina il sistema operativo
    if (userAgent.indexOf('Windows') > -1) {
      os = 'Windows';
    } else if (userAgent.indexOf('Mac') > -1) {
      os = 'macOS';
    } else if (userAgent.indexOf('Linux') > -1) {
      os = 'Linux';
    } else if (userAgent.indexOf('Android') > -1) {
      os = 'Android';
    } else if (
      userAgent.indexOf('iOS') > -1 ||
      userAgent.indexOf('iPhone') > -1 ||
      userAgent.indexOf('iPad') > -1
    ) {
      os = 'iOS';
    }

    return { browser, os };
  }

  /**
   * Effettua una richiesta all'API LemonSqueezy
   * @param endpoint - Endpoint da chiamare
   * @param data - Dati da inviare
   * @returns Promise con la risposta
   */
  private async makeRequest<T>(endpoint: string, data: Record<string, string>): Promise<T> {
    // Implementazione della richiesta HTTP
    // Qui dovresti implementare la logica per effettuare la richiesta HTTP
    // Questo è solo un esempio
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Accept: 'application/json',
      },
      body: this.objectToUrlEncoded(data),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return (await response.json()) as T;
  }

  /**
   * Converte un oggetto in una stringa URL-encoded
   * @param obj - Oggetto da convertire
   * @returns Stringa URL-encoded
   */
  private objectToUrlEncoded(obj: Record<string, string>): string {
    return Object.entries(obj)
      .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
      .join('&');
  }

  /**
   * Estrae le feature dalla risposta dell'API
   * @param response - Risposta dell'API
   * @returns Array di feature
   */
  private extractFeatures(
    response: LemonSqueezyActivationResponse | LemonSqueezyValidationResponse,
  ): string[] {
    // Estrai le feature dalla risposta
    // Questo dipende dalla struttura della risposta dell'API
    const features: string[] = [];

    // Esempio: se la licenza è attiva, aggiungi la feature 'premium'
    if (response.license_key && response.license_key.status === 'active') {
      features.push('premium');
    }

    return features;
  }

  /**
   * Ottiene un messaggio di errore leggibile
   * @param error - Errore
   * @returns Messaggio di errore
   */
  private getErrorMessage(error: unknown): string {
    if (error instanceof Error) {
      return error.message;
    }
    return String(error);
  }

  /**
   * Salva i dati della licenza nello storage
   */
  private saveLicenseData(): void {
    try {
      const data: StoredLicenseData = {
        licenseKey: this.licenseKey,
        instanceId: this.instanceId,
        licenseStatus: this.licenseStatus,
        licenseFeatures: this.licenseFeatures,
      };

      // Salva i dati nello storage di Figma
      figma.clientStorage
        .setAsync(this.storageKey, JSON.stringify(data))
        .catch((err) => console.error('Error saving license data:', err));
    } catch (error) {
      console.error('Error saving license data:', error);
    }
  }

  /**
   * Carica i dati della licenza dallo storage
   */
  private async loadLicenseData(): Promise<void> {
    try {
      // Carica i dati dallo storage di Figma
      const dataString = await figma.clientStorage.getAsync(this.storageKey);

      if (dataString) {
        const data = JSON.parse(dataString as string) as StoredLicenseData;
        this.licenseKey = data.licenseKey;
        this.instanceId = data.instanceId;
        this.licenseStatus = data.licenseStatus;
        this.licenseFeatures = data.licenseFeatures;

        // Valida la licenza all'avvio se è presente
        if (this.licenseKey && this.instanceId) {
          this.validateLicense().catch((err) =>
            console.error('Error validating license on startup:', err),
          );
        }
      }
    } catch (error) {
      console.error('Error loading license data:', error);
    }
  }
}
