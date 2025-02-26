/**
 * Esempio di utilizzo del LicenseManager
 *
 * Questo file mostra come utilizzare il LicenseManager per gestire le licenze
 * nel plugin Figma.
 */

import { LicenseManager } from '../services/licenseManager';

// Crea un'istanza del LicenseManager
const licenseManager = new LicenseManager();

/**
 * Attiva una licenza
 * @param licenseKey - Chiave di licenza da attivare
 */
export async function activateLicense(licenseKey: string): Promise<void> {
  console.log('Attivazione licenza...');

  const result = await licenseManager.activateLicense(licenseKey);

  if (result.success) {
    console.log('Licenza attivata con successo!');
    console.log('Features disponibili:', result.features);

    // L'instance_id è stato automaticamente salvato dal LicenseManager
    // Non è necessario gestirlo manualmente
    console.log('Instance ID:', licenseManager.getInstanceId());
  } else {
    console.error("Errore durante l'attivazione della licenza:", result.message);
  }
}

/**
 * Valida una licenza precedentemente attivata
 */
export async function validateLicense(): Promise<void> {
  console.log('Validazione licenza...');

  const result = await licenseManager.validateLicense();

  if (result.valid) {
    console.log('Licenza valida!');
    console.log('Features disponibili:', result.features);
  } else {
    console.error('Licenza non valida:', result.message);
  }
}

/**
 * Disattiva una licenza precedentemente attivata
 */
export async function deactivateLicense(): Promise<void> {
  console.log('Disattivazione licenza...');

  const result = await licenseManager.deactivateLicense();

  if (result.success) {
    console.log('Licenza disattivata con successo!');
  } else {
    console.error('Errore durante la disattivazione della licenza:', result.message);
  }
}

/**
 * Verifica se una feature è disponibile
 * @param feature - Feature da verificare
 */
export function hasFeature(feature: string): boolean {
  return licenseManager.hasFeature(feature);
}

/**
 * Esempio di utilizzo completo
 */
export async function runLicenseExample(): Promise<void> {
  // 1. Attiva una licenza
  await activateLicense('F2AF6EB5-A0E3-4C05-95B2-CC23766511E0');

  // 2. Verifica se una feature è disponibile
  if (hasFeature('premium')) {
    console.log('La feature premium è disponibile!');
  } else {
    console.log('La feature premium non è disponibile.');
  }

  // 3. Valida la licenza
  await validateLicense();

  // 4. Disattiva la licenza
  // Nota: Disattiva la licenza solo quando l'utente lo richiede esplicitamente
  // await deactivateLicense();
}
