/** @jsx h */
import { h } from 'preact';
import { useState, useEffect } from 'preact/hooks';
import { Text } from './common/Text';
import { Button } from './common/Button';
import { TextInput } from './TextInput';
import { Modal } from './Modal';
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

        // Chiudi il modale dopo 3 secondi in caso di successo, indipendentemente dalla validità
        console.log('[DEBUG] 🕒 Starting close timer for success state');
        successTimer = setTimeout(() => {
          console.log('[DEBUG] ⏱️ Success timer triggered, closing modal');
          onClose();
        }, 3000);
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

  const getStatusDisplay = () => {
    if (currentStatus.status === 'processing') {
      return {
        text: 'Activating...',
        bgColor: 'bg-[var(--figma-color-bg-warning)]',
      };
    }
    if (showSuccess) {
      return {
        text: 'License Activated Successfully!',
        bgColor: 'bg-[var(--figma-color-bg-success)]',
      };
    }
    if (currentStatus.isValid) {
      return {
        text: 'Premium Active',
        bgColor: 'bg-[var(--figma-color-bg-success)]',
      };
    }
    return {
      text: 'Free Plan',
      bgColor: 'bg-[var(--figma-color-bg-secondary)]',
    };
  };

  const status = getStatusDisplay();

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="License Management">
      <div className="flex flex-col gap-4">
        {/* Status Display - sempre visibile */}
        <div className={`flex items-center gap-2 p-3 rounded ${status.bgColor}`}>
          <Text size="sm">{status.text}</Text>
          {currentStatus.expiresAt && (
            <Text size="xs" className="ml-2">
              Expires: {new Date(currentStatus.expiresAt).toLocaleDateString()}
            </Text>
          )}
        </div>

        {/* License Info - se la licenza è attiva */}
        {currentStatus.isValid && currentStatus.activationLimit && (
          <div className="p-3 rounded bg-[var(--figma-color-bg-secondary)]">
            <Text size="xs">
              Activations: {currentStatus.activationsCount} of {currentStatus.activationLimit}
            </Text>
          </div>
        )}

        {/* License Input e Actions */}
        {currentStatus.isValid ? (
          <Button
            onClick={handleDeactivate}
            disabled={isDeactivating}
            variant="danger"
            size="medium"
          >
            {isDeactivating ? 'Deactivating...' : 'Deactivate License'}
          </Button>
        ) : showSuccess ? (
          <div className="flex flex-col gap-2">
            <div className="p-3 rounded bg-[var(--figma-color-bg-success)]">
              <Text size="sm" className="text-[var(--figma-color-text-onbrand)]">
                Your premium features are now activated! You can now enjoy all premium features.
              </Text>
            </div>
            <Button onClick={onClose} variant="primary" size="medium">
              Continue to Premium
            </Button>
          </div>
        ) : (
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

            <Button
              onClick={handleActivate}
              disabled={!licenseKey.trim() || isActivating}
              variant="primary"
              size="medium"
            >
              {isActivating ? 'Activating...' : 'Activate License'}
            </Button>
          </div>
        )}
      </div>
    </Modal>
  );
}
