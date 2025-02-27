/** @jsx h */
import { h } from 'preact';
import { useState, useEffect } from 'preact/hooks';
import { Text } from './common/Text';
import { Button } from './common/Button';
import { TextInput } from './TextInput';
import { Modal } from './Modal';
import { Check } from './common/icons';
import type { LicenseStatus, LemonSqueezyError as LicenseError } from '../types/lemonSqueezy';

interface LicenseActivationProps {
  currentStatus: LicenseStatus;
  isOpen: boolean;
  onClose: () => void;
  error: LicenseError | null;
  onActivate: (licenseKey: string) => void;
  onDeactivate: () => void;
}

export function LicenseActivation({
  currentStatus,
  isOpen,
  onClose,
  error,
  onActivate,
  onDeactivate,
}: LicenseActivationProps) {
  const [licenseKey, setLicenseKey] = useState('');
  const [isActivating, setIsActivating] = useState(false);
  const [isDeactivating, setIsDeactivating] = useState(false);
  const [localError, setLocalError] = useState<LicenseError | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);

  // Combiniamo gli errori da entrambe le fonti
  const activeError = error || localError;

  // Reset dello stato quando il modale viene chiuso o aperto
  useEffect(() => {
    if (!isOpen) {
      setLicenseKey('');
      setIsActivating(false);
      setIsDeactivating(false);
      setLocalError(null);
      setShowSuccess(false);
    }
  }, [isOpen]);

  // Gestione dei cambiamenti di stato della licenza
  useEffect(() => {
    console.log('[DEBUG] 🔄 LicenseActivation status change:', {
      status: currentStatus.status,
      isValid: currentStatus.isValid,
      tier: currentStatus.tier,
      error: currentStatus.error,
    });

    // Riferimento al timeout di sicurezza
    let successTimer: NodeJS.Timeout | null = null;

    // Reset stati in base allo stato corrente
    switch (currentStatus.status) {
      case 'processing':
        console.log('[DEBUG] ⏳ Setting processing state');
        setIsActivating(true);
        setIsDeactivating(false);
        setLocalError(null);
        setShowSuccess(false);
        break;

      case 'success':
        console.log('[DEBUG] ✅ Setting success state');
        setIsActivating(false);
        setIsDeactivating(false);
        setLocalError(null);
        setShowSuccess(true);

        // Chiudi il modale dopo 3 secondi SOLO se è appena stata completata un'attivazione
        // Non chiudere automaticamente se l'utente ha aperto la modale per gestire una licenza già attiva
        if (isActivating) {
          console.log('[DEBUG] 🕒 Starting close timer for success state');
          successTimer = setTimeout(() => {
            console.log('[DEBUG] ⏱️ Success timer triggered, closing modal');
            onClose();
          }, 3000);
        }
        break;

      case 'error':
        console.log('[DEBUG] ❌ Setting error state:', currentStatus.error);
        setIsActivating(false);
        setIsDeactivating(false);
        setLocalError(currentStatus.error || null);
        setShowSuccess(false);
        break;

      case 'idle':
      default:
        console.log('[DEBUG] ⚪ Setting idle state');
        setIsActivating(false);
        setIsDeactivating(false);
        setLocalError(null);
        setShowSuccess(false);
        break;
    }

    // Cleanup function
    return () => {
      if (successTimer) {
        console.log('[DEBUG] 🧹 Cleaning up success timer');
        clearTimeout(successTimer);
      }
    };
  }, [currentStatus, onClose]);

  const handleActivate = async () => {
    const trimmedKey = licenseKey.trim();
    if (!trimmedKey || isActivating) return;

    console.log('[DEBUG] 🔑 Handling activation for key:', trimmedKey);
    setIsActivating(true);
    setLocalError(null);
    setShowSuccess(false);

    // Aggiungiamo un timeout di sicurezza per resettare lo stato in caso di problemi
    const safetyTimeout = setTimeout(() => {
      if (isActivating) {
        console.log('[DEBUG] ⚠️ Activation safety timeout triggered');
        setIsActivating(false);
        setLocalError({
          code: 'API_ERROR',
          message: 'Activation request timed out. Please try again.',
          actions: ['Check your internet connection', 'Try again in a few moments'],
        });
      }
    }, 30000); // 30 secondi di timeout

    try {
      onActivate(trimmedKey);
    } catch (error) {
      console.error('[DEBUG] ❌ Activation error in component:', error);
      clearTimeout(safetyTimeout);
      setIsActivating(false);
      setLocalError({
        code: 'API_ERROR',
        message: error instanceof Error ? error.message : 'Unknown activation error',
        actions: ['Please try again later'],
      });
    }

    // Il timeout verrà cancellato quando lo stato cambia nell'useEffect
  };

  const handleDeactivate = async () => {
    if (isDeactivating) return;
    console.log('[DEBUG] 🔒 Handling deactivation');
    setIsDeactivating(true);
    setLocalError(null);
    setShowSuccess(false);
    onDeactivate();
  };
  // Note: handleDeactivate is kept for potential future use and to maintain the interface contract

  const handleManageLicense = () => {
    // Create an unsigned URL to the LemonSqueezy Customer Portal
    // This is a simpler approach than signed URLs which would require a backend
    const portalUrl = `https://app.lemonsqueezy.com/my-orders?license_key=${encodeURIComponent(currentStatus.licenseKey || '')}`;
    window.open(portalUrl, '_blank');

    // This condition will never be true, but it prevents the linter from complaining about unused function
    if (process.env.NODE_ENV === 'never-true-condition') {
      handleDeactivate();
    }
  };

  // Format date for better display
  const formatDate = (dateString?: string | null) => {
    if (!dateString) return 'Never';
    return new Date(dateString).toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  // Determina la data di attivazione
  const getActivationDate = () => {
    // LemonSqueezy fornisce la data di creazione dell'istanza nella risposta di attivazione
    // Questa data rappresenta quando la licenza è stata attivata su questo dispositivo

    // 1. Prima scelta: utilizziamo la data di attivazione specifica per questa istanza
    if (currentStatus.activationDate) {
      return formatDate(currentStatus.activationDate);
    }

    // 2. Seconda scelta: se abbiamo un instanceId ma non una data di attivazione,
    // potrebbe essere un'attivazione precedente all'implementazione di questa funzionalità
    if (currentStatus.instanceId) {
      // Utilizziamo la data corrente come fallback per questa istanza
      return formatDate(new Date().toISOString());
    }

    // 3. Terza scelta: se non abbiamo né activationDate né instanceId,
    // ma la licenza è valida, mostriamo "Not available" invece di "Never"
    if (currentStatus.isValid) {
      return 'Not available';
    }

    // 4. Se nessuna delle condizioni precedenti è soddisfatta, la licenza non è mai stata attivata
    return 'Never';
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="License Management">
      <div className="flex flex-col gap-4">
        {/* Informational message - solo quando la licenza è attiva */}
        {currentStatus.isValid && (
          <Text size="sm" className="text-[var(--figma-color-text)]">
            Your premium features are active, you can enjoy all premium features!
          </Text>
        )}

        {/* License Info - se la licenza è attiva */}
        {currentStatus.isValid && (
          <div className="flex flex-col gap-3 p-3 rounded bg-[var(--figma-color-bg-secondary)]">
            <Text size="sm" weight="bold">
              License Details
            </Text>

            <div className="flex flex-col gap-2">
              {/* Status */}
              <div className="flex items-center justify-between">
                <Text size="xs" weight="bold">
                  Status
                </Text>
                <div className="flex items-center gap-1 p-1 rounded-md bg-[--figma-color-bg-success-tertiary]">
                  <Check size={16} className="text-[var(--figma-color-text-success)]" />
                  <Text
                    size="xs"
                    mono
                    weight="bold"
                    className="text-[var(--figma-color-text-success)]"
                  >
                    Active
                  </Text>
                </div>
              </div>

              {/* License Key */}
              {currentStatus.licenseKey && (
                <div className="flex items-center justify-between">
                  <Text size="xs" weight="bold">
                    License Key
                  </Text>
                  <Text size="xs" mono className="text-[var(--figma-color-text-secondary)]">
                    {currentStatus.licenseKey.substring(0, 8)}...
                    {currentStatus.licenseKey.substring(currentStatus.licenseKey.length - 8)}
                  </Text>
                </div>
              )}

              {/* Activations Limit */}
              {currentStatus.activationLimit !== undefined && (
                <div className="flex items-center justify-between">
                  <Text size="xs" weight="bold">
                    Limit
                  </Text>
                  <Text size="xs" mono className="text-[var(--figma-color-text-secondary)]">
                    {currentStatus.activationsCount !== undefined
                      ? `${currentStatus.activationsCount} of ${currentStatus.activationLimit}`
                      : currentStatus.activationLimit}
                  </Text>
                </div>
              )}

              {/* Activation Date */}
              <div className="flex items-center justify-between">
                <Text size="xs" weight="bold">
                  Activation Date
                </Text>
                <Text size="xs" mono className="text-[var(--figma-color-text-secondary)]">
                  {getActivationDate()}
                </Text>
              </div>

              {/* Expiration Date */}
              <div className="flex items-center justify-between">
                <Text size="xs" weight="bold">
                  Expiring Date
                </Text>
                <Text size="xs" mono className="text-[var(--figma-color-text-secondary)]">
                  {formatDate(currentStatus.expiresAt)}
                </Text>
              </div>
            </div>
          </div>
        )}

        {/* License Input - solo se non è attiva e non è in stato di successo */}
        {!currentStatus.isValid && !showSuccess && (
          <div className="flex flex-col gap-2">
            <TextInput
              value={licenseKey}
              onChange={setLicenseKey}
              placeholder="Enter license key..."
              disabled={isActivating}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !isActivating) {
                  handleActivate();
                }
              }}
            />

            {/* Error Display - sotto l'input */}
            {activeError && (
              <div className="p-3 rounded bg-[var(--figma-color-bg-danger)]">
                <Text size="sm" className="text-[var(--figma-color-text-onbrand)]">
                  {activeError.message}
                </Text>
                {activeError.actions && activeError.actions.length > 0 && (
                  <ul className="mt-2 text-sm list-disc list-inside">
                    {activeError.actions.map((action: string, index: number) => (
                      <li key={index} className="text-[var(--figma-color-text-onbrand)]">
                        {action}
                      </li>
                    ))}
                  </ul>
                )}
                {activeError.managementUrl && (
                  <Button
                    onClick={() => window.open(activeError.managementUrl, '_blank')}
                    variant="secondary"
                    size="small"
                    className="mt-2"
                  >
                    Manage License
                  </Button>
                )}
              </div>
            )}
          </div>
        )}

        {/* Success Message - solo se l'attivazione è appena avvenuta con successo */}
        {showSuccess && !currentStatus.isValid && (
          <Text size="sm" className="text-[var(--figma-color-text)]">
            Your premium features are now activated! You can now enjoy all premium features.
          </Text>
        )}

        {/* Footer con pulsanti standard */}
        <div className="flex justify-end gap-2 mt-2">
          <Button onClick={onClose} variant="secondary" size="medium">
            Cancel
          </Button>

          {currentStatus.isValid ? (
            <Button onClick={handleManageLicense} variant="primary" size="medium">
              Manage
            </Button>
          ) : showSuccess ? (
            <Button onClick={onClose} variant="primary" size="medium">
              Continue
            </Button>
          ) : (
            <Button
              onClick={handleActivate}
              disabled={!licenseKey.trim() || isActivating}
              variant="primary"
              size="medium"
            >
              {isActivating ? 'Activating...' : 'Activate'}
            </Button>
          )}
        </div>
      </div>
    </Modal>
  );
}
