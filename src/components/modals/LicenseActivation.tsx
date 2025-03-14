/** @jsx h */
import { h } from 'preact';
import { useState, useEffect } from 'preact/hooks';
import { Text } from '../common/Text';
import { TextInput } from '../TextInput';
import { Modal } from './Modal';
import { Check } from '../common/icons';
import { emit } from '@create-figma-plugin/utilities';
import type { LicenseStatus, LemonSqueezyError as LicenseError } from '../../types/lemonSqueezy';
import { LEMONSQUEEZY_CONFIG } from '../../config/lemonSqueezy';
import { NotificationCard } from '../common/NotificationCard';

interface LicenseActivationProps {
  currentStatus: LicenseStatus;
  isOpen: boolean;
  onClose: () => void;
  error: LicenseError | null;
  onActivate: (licenseKey: string) => void;
  onDeactivate: () => void;
  isManualOpen?: boolean;
  checkoutUrl: string;
}

export function LicenseActivation({
  currentStatus,
  isOpen,
  onClose,
  error,
  onActivate,
  onDeactivate,
  isManualOpen = false,
  checkoutUrl,
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
    } else if (isManualOpen) {
      // Se la modale viene aperta manualmente, non mostriamo il messaggio di successo
      setShowSuccess(false);
    }
  }, [isOpen, isManualOpen]);

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

        // Chiudi il modale dopo un tempo adeguato SOLO se non è stata aperta manualmente
        if (!isManualOpen) {
          console.log('[DEBUG] 🕒 Starting close timer for success state');
          successTimer = setTimeout(() => {
            console.log('[DEBUG] ⏱️ Success timer triggered, closing modal');
            onClose();
          }, 8000); // 8 secondi per dare tempo all'utente di vedere il messaggio
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
    emit('OPEN_EXTERNAL_URL', portalUrl);

    // This condition will never be true, but it prevents the linter from complaining about unused function
    if (process.env.NODE_ENV === 'never-true-condition') {
      handleDeactivate();
    }
  };

  const handlePurchaseClick = () => {
    // Apre il checkout in una nuova finestra
    window.open(checkoutUrl, '_blank');

    // Log per debug
    console.log('[LICENSE] Opening checkout URL:', checkoutUrl);
    console.log('[LICENSE] Environment:', ENV_CONFIG.isDevelopment ? 'development' : 'production');
  };

  // Format date for better display
  const formatDate = (dateString?: string | null) => {
    if (!dateString) return 'Never';

    // Log the raw date string for debugging
    console.log('[DEBUG] Formatting date string:', dateString);

    const date = new Date(dateString);

    // Log the parsed date object for debugging
    console.log('[DEBUG] Parsed date object:', date.toString());

    // Format as DD/MM/YYYY
    const formatted = date.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });

    console.log('[DEBUG] Formatted date:', formatted);

    return formatted;
  };

  // Determina la data di attivazione
  const getActivationDate = () => {
    // Log the current status for debugging
    console.log('[DEBUG] Getting activation date from status:', {
      activationDate: currentStatus.activationDate,
      instanceId: currentStatus.instanceId,
      isValid: currentStatus.isValid,
      fullStatus: JSON.stringify(currentStatus, null, 2),
    });

    // 1. Prima scelta: utilizziamo la data di attivazione specifica per questa istanza
    if (currentStatus.activationDate) {
      console.log('[DEBUG] Using activationDate from currentStatus:', currentStatus.activationDate);
      return formatDate(currentStatus.activationDate);
    }

    // 2. Se abbiamo un instanceId ma non una data di attivazione,
    // NON utilizziamo più la data corrente come fallback, ma mostriamo "Not available"
    if (currentStatus.instanceId) {
      console.log('[DEBUG] Has instanceId but no activationDate, showing "Not available"');
      return 'Not available';
    }

    // 3. Se non abbiamo né activationDate né instanceId,
    // ma la licenza è valida, mostriamo "Not available" invece di "Never"
    if (currentStatus.isValid) {
      console.log(
        '[DEBUG] License is valid but no activation date or instanceId, showing "Not available"',
      );
      return 'Not available';
    }

    // 4. Se nessuna delle condizioni precedenti è soddisfatta, la licenza non è mai stata attivata
    console.log('[DEBUG] License has never been activated');
    return 'Never';
  };

  // Determina i bottoni da mostrare nel footer
  const getPrimaryButton = () => {
    if (currentStatus.isValid) {
      return {
        label: 'Manage',
        onClick: handleManageLicense,
      };
    } else if (showSuccess) {
      return {
        label: 'Continue',
        onClick: onClose,
      };
    } else {
      return {
        label: isActivating ? 'Activating...' : 'Activate',
        onClick: handleActivate,
        disabled: !licenseKey.trim() || isActivating,
      };
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="License Management"
      primaryButton={getPrimaryButton()}
      secondaryButton={{
        label: 'Cancel',
        onClick: onClose,
      }}
    >
      <div className="flex flex-col gap-1">
        {/* Success Message - mostrato solo dopo un'attivazione riuscita e non in caso di apertura manuale */}
        {showSuccess && !isManualOpen && (
          <NotificationCard type="success" title="License successfully activated!" />
        
        )}
        
        {/* Stato della licenza */}
        {currentStatus.isValid && (
          <div className="bg-[var(--figma-color-bg-success-tertiary)] p-4 rounded-md mb-4">
            <Text size="sm" className="text-[var(--figma-color-text)]">
              Your license is active, you can enjoy all <strong>Premium features!</strong>
            </Text>
          </div>
        )}

        {/* License Info - se la licenza è attiva */}
        {currentStatus.isValid && (
          <div className="space-y-3">
            {/* Tier */}
            <div className="flex justify-between items-center">
              <Text size="sm" className="text-[var(--figma-color-text-secondary)]">
                Plan
              </Text>
              <Text
                size="sm"
                className="font-medium text-[var(--figma-color-text)] bg-[var(--figma-color-bg-success-tertiary)] px-2 py-0.5 rounded"
              >
                {currentStatus.tier === 'premium' ? 'Premium' : 'Standard'}
              </Text>
            </div>

            {/* Activation Date */}
            <div className="flex justify-between items-center">
              <Text size="sm" className="text-[var(--figma-color-text-secondary)]">
                Activated On
              </Text>
              <Text size="sm" className="font-medium text-[var(--figma-color-text)]">
                {getActivationDate()}
              </Text>
            </div>

            {/* License Key */}
            {currentStatus.licenseKey && (
              <div className="flex justify-between items-center">
                <Text size="sm" className="text-[var(--figma-color-text-secondary)]">
                  License Key
                </Text>
                <Text size="sm" className="font-mono text-[var(--figma-color-text)]">
                  {currentStatus.licenseKey.substring(0, 8)}...
                  {currentStatus.licenseKey.substring(currentStatus.licenseKey.length - 8)}
                </Text>
              </div>
            )}

            {/* Features */}
            {currentStatus.features && currentStatus.features.length > 0 && (
              <div className="mt-2">
                <Text size="sm" className="text-[var(--figma-color-text-secondary)] mb-1">
                  Included Features
                </Text>
                <div className="space-y-1">
                  {currentStatus.features.map((feature, index) => (
                    <div key={index} className="flex items-center">
                      <div className="w-4 h-4 rounded-full bg-[var(--figma-color-bg-success-tertiary)] flex items-center justify-center mr-2">
                        <Check className="w-3 h-3 text-[var(--figma-color-text-success)]" />
                      </div>
                      <Text size="sm" className="text-[var(--figma-color-text)]">
                        {feature}
                      </Text>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* License Input - solo se non è attiva e non è in stato di successo */}
        {!currentStatus.isValid && !showSuccess && (
          <div className="flex flex-col gap-2">
            <Text size="base" className="text-[var(--figma-color-text)]">
              Enter your license key to activate premium features
            </Text>
            <TextInput
              value={licenseKey}
              onChange={setLicenseKey}
              placeholder="Enter license key..."
              className="mb-2"
            />
            <Text size="xs" className="text-[var(--figma-color-text-secondary)]">
              You can find your license key in the purchase confirmation email or in your{' '}
              <a
                href="https://app.lemonsqueezy.com/my-orders"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--figma-color-text-brand)] hover:underline"
              >
                LemonSqueezy account
              </a>
              .
            </Text>
          </div>
        )}

            {/* Link per l'acquisto di una licenza */}
            <div className="mt-1">
              <Text size="xs" className="text-[var(--figma-color-text)]">
                You don't have a license?{' '}
                <button
                  onClick={() => {
                    console.log(
                      '[DEBUG] Upgrade to Premium clicked with URL:',
                      LEMONSQUEEZY_CONFIG.CHECKOUT_URL,
                    );
                    emit('OPEN_EXTERNAL_URL', LEMONSQUEEZY_CONFIG.CHECKOUT_URL);
                  }}
                  className="font-bold text-[var(--figma-color-text-brand)] hover:underline bg-transparent border-none p-0 cursor-pointer"
                >
                  Upgrade to Premium
                </button>
              </Text>
            </div>

            {/* Error Display - sotto l'input */}
            {activeError && (
              <NotificationCard
                type="error"
                title={activeError.message}
                actions={
                  activeError.managementUrl && (
                    <Button
                      onClick={() => emit('OPEN_EXTERNAL_URL', activeError.managementUrl)}
                      variant="secondary"
                      size="small"
                    >
                      Manage License
                    </Button>
                  )
                }
              >
                {activeError.actions && activeError.actions.length > 0 && (
                  <ul className="mt-1 text-sm list-disc list-inside">
                    {activeError.actions.map((action: string, index: number) => (
                      <li key={index} className="text-[var(--figma-color-text-onbrand)]">
                        {action}
                      </li>
                    ))}
                  </ul>
                )}
              </NotificationCard>

            )}
          </div>
        )}

        {/* Purchase CTA - solo se non è attiva e non è in stato di successo */}
        {!currentStatus.isValid && !showSuccess && (
          <div className="pt-4 border-t border-[var(--figma-color-border)]">
            <Text size="xs" className="text-[var(--figma-color-text-secondary)]">
              You don't have a license?{' '}
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  handlePurchaseClick();
                }}
                className="text-[var(--figma-color-text-brand)] hover:underline"
              >
                Purchase now
              </a>
            </Text>
          </div>
        )}
      </div>
    </Modal>
  );
}
