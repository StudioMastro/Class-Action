/**
 * Test per verificare la gestione dell'instance_id
 *
 * Questo script simula il ciclo di vita completo di una licenza:
 * 1. Attivazione - Ottiene l'instance_id
 * 2. Validazione - Utilizza l'instance_id
 * 3. Disattivazione - Utilizza l'instance_id
 *
 * Nota: Questo è un test simulato che non dipende direttamente dal modulo licenseService
 * ed è compatibile con l'ambiente Figma (non utilizza process.env)
 */

// Simulazione del licenseService
const licenseService = {
  licenseKey: null,
  instanceId: null,
  licenseStatusType: 'inactive',

  getInstanceId() {
    return this.instanceId;
  },
};

// Funzione per simulare l'attivazione di una licenza
async function testActivation() {
  console.log('=== TEST ATTIVAZIONE LICENZA ===');

  // Utilizziamo una chiave di licenza di esempio
  const licenseKey = 'TEST-LICENSE-KEY';

  try {
    // Simuliamo l'attivazione della licenza
    console.log(`Attivazione licenza: ${licenseKey}`);

    // In un caso reale, questo chiamerebbe l'API di LemonSqueezy
    // e riceverebbe l'instance_id nella risposta
    // Qui simuliamo il comportamento

    // Normalmente questo verrebbe fatto da handleActivate
    licenseService.licenseKey = licenseKey;
    licenseService.instanceId = `test-instance-${Date.now()}`;
    licenseService.licenseStatusType = 'active';

    console.log(`Licenza attivata con successo!`);
    console.log(`Instance ID generato: ${licenseService.getInstanceId()}`);

    return licenseService.getInstanceId();
  } catch (error) {
    console.error("Errore durante l'attivazione:", error);
    return null;
  }
}

// Funzione per simulare la validazione di una licenza
async function testValidation(instanceId) {
  console.log('\n=== TEST VALIDAZIONE LICENZA ===');

  if (!instanceId) {
    console.error('Instance ID non disponibile, impossibile validare');
    return false;
  }

  try {
    // In un caso reale, questo invierebbe l'instance_id all'API di LemonSqueezy
    console.log(`Validazione licenza con Instance ID: ${instanceId}`);

    // Simuliamo una risposta positiva
    console.log('Licenza validata con successo!');
    return true;
  } catch (error) {
    console.error('Errore durante la validazione:', error);
    return false;
  }
}

// Funzione per simulare la disattivazione di una licenza
async function testDeactivation(instanceId) {
  console.log('\n=== TEST DISATTIVAZIONE LICENZA ===');

  if (!instanceId) {
    console.error('Instance ID non disponibile, impossibile disattivare');
    return false;
  }

  try {
    // In un caso reale, questo invierebbe l'instance_id all'API di LemonSqueezy
    console.log(`Disattivazione licenza con Instance ID: ${instanceId}`);

    // Simuliamo una risposta positiva
    licenseService.licenseKey = null;
    licenseService.instanceId = null;
    licenseService.licenseStatusType = 'inactive';

    console.log('Licenza disattivata con successo!');
    console.log(`Instance ID dopo disattivazione: ${licenseService.getInstanceId()}`);

    return true;
  } catch (error) {
    console.error('Errore durante la disattivazione:', error);
    return false;
  }
}

// Funzione principale che esegue tutti i test
async function runTests() {
  console.log('Inizio test del ciclo di vita della licenza...\n');

  // Test di attivazione
  const instanceId = await testActivation();

  // Test di validazione
  const validationResult = await testValidation(instanceId);

  // Test di disattivazione
  const deactivationResult = await testDeactivation(instanceId);

  console.log('\n=== RIEPILOGO TEST ===');
  console.log(`Attivazione: ${instanceId ? 'SUCCESSO' : 'FALLIMENTO'}`);
  console.log(`Validazione: ${validationResult ? 'SUCCESSO' : 'FALLIMENTO'}`);
  console.log(`Disattivazione: ${deactivationResult ? 'SUCCESSO' : 'FALLIMENTO'}`);

  return {
    activation: !!instanceId,
    validation: validationResult,
    deactivation: deactivationResult,
  };
}

// Esporta le funzioni per l'uso in altri moduli
module.exports = {
  testActivation,
  testValidation,
  testDeactivation,
  runTests,
};

// Esegui i test se questo file viene eseguito direttamente
if (require.main === module) {
  runTests().catch((error) => {
    console.error("Errore durante l'esecuzione dei test:", error);
  });
}
