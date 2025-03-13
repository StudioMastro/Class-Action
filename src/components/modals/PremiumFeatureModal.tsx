/** @jsx h */
import { h } from 'preact';
import { Modal } from './Modal';
import { Text } from '../common/Text';
import { emit } from '@create-figma-plugin/utilities';
import { LEMONSQUEEZY_CONFIG } from '../../config/lemonSqueezy';

// Dichiarazione delle variabili globali che verranno sostituite durante la build
declare const __PRODUCTION_CHECKOUT_URL__: string;

interface PremiumFeatureModalProps {
  isOpen: boolean;
  onClose: () => void;
  featureName: string;
}

export function PremiumFeatureModal({ isOpen, onClose, featureName }: PremiumFeatureModalProps) {
  // Utilizziamo direttamente l'URL di checkout da LEMONSQUEEZY_CONFIG
  const checkoutUrl = LEMONSQUEEZY_CONFIG.CHECKOUT_URL;

  // Log del valore di checkoutUrl per debug
  console.log('[DEBUG] PremiumFeatureModal checkoutUrl:', checkoutUrl);
  console.log('[DEBUG] LEMONSQUEEZY_CONFIG:', LEMONSQUEEZY_CONFIG);

  const handleUpgradeClick = () => {
    // Verifica che l'URL sia valido prima di inviarlo
    if (!checkoutUrl || typeof checkoutUrl !== 'string' || !checkoutUrl.startsWith('https://')) {
      console.error('[DEBUG] Invalid checkout URL:', checkoutUrl);
      // Utilizziamo l'URL di produzione come fallback
      const prodUrl =
        typeof __PRODUCTION_CHECKOUT_URL__ !== 'undefined' ? __PRODUCTION_CHECKOUT_URL__ : '';
      if (prodUrl && prodUrl.startsWith('https://')) {
        console.log('[DEBUG] Using production checkout URL as fallback:', prodUrl);
        emit('OPEN_EXTERNAL_URL', prodUrl);
      } else {
        // Fallback hardcoded in caso di problemi
        const fallbackUrl =
          'https://mastro.lemonsqueezy.com/buy/1edb7f3c-cf47-4a79-b2c6-c7b5980c1cc3';
        console.log('[DEBUG] Using hardcoded fallback URL:', fallbackUrl);
        emit('OPEN_EXTERNAL_URL', fallbackUrl);
      }
    } else {
      // Utilizziamo emit per aprire l'URL esterno tramite figma.openExternal
      console.log('[DEBUG] handleUpgradeClick called with URL:', checkoutUrl);
      emit('OPEN_EXTERNAL_URL', checkoutUrl);
    }
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Upgrade to Premium"
      primaryButton={{
        label: 'Upgrade now',
        onClick: handleUpgradeClick,
      }}
      secondaryButton={{
        label: 'Maybe Later',
        onClick: onClose,
      }}
    >
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <Text size="base">
            <strong>{featureName}</strong> {featureName === 'Import and Export' ? 'are' : 'is'} a
            Premium feature. Upgrade now to unlock:
          </Text>
          <div className="mt-2 space-y-2">
            <div className="flex gap-1">
              <div className="flex-shrink-0 w-5 h-5 mt-0.5">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-[var(--figma-color-text-success)]"
                >
                  <path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z" />
                  <path d="m9 12 2 2 4-4" />
                </svg>
              </div>
              <Text weight="bold" className="text-sm leading-5">
                Unlimited saved classes
              </Text>
            </div>
            <div className="flex gap-1">
              <div className="flex-shrink-0 w-5 h-5 mt-0.5">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-[var(--figma-color-text-success)]"
                >
                  <path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z" />
                  <path d="m9 12 2 2 4-4" />
                </svg>
              </div>
              <Text weight="bold" className="text-sm leading-5">
                Import and Export .json files for cross teams
              </Text>
            </div>
            <div className="flex gap-1">
              <div className="flex-shrink-0 w-5 h-5 mt-0.5">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-[var(--figma-color-text-success)]"
                >
                  <path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z" />
                  <path d="m9 12 2 2 4-4" />
                </svg>
              </div>
              <Text weight="bold" className="text-sm leading-5">
                Apply All and Apply Global for batch operations
              </Text>
            </div>
            <div className="flex gap-1">
              <div className="flex-shrink-0 w-5 h-5 mt-0.5">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-[var(--figma-color-text-success)]"
                >
                  <path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z" />
                  <path d="m9 12 2 2 4-4" />
                </svg>
              </div>
              <Text weight="bold" className="text-sm leading-5">
                Priority support and new releases
              </Text>
            </div>
          </div>

          <div
            className="mt-2 px-4 py-3 rounded-md"
            style={{ backgroundColor: 'var(--figma-color-bg-success-tertiary)' }}
          >
            <div className="flex flex-col gap-1">
              <Text size="sm" weight="bold" className="text-[var(--figma-color-text-success)]">
                Special Launch Offer!
              </Text>
              <Text size="sm">
                Get Premium for just <strong>€9/year.</strong>
              </Text>
              <Text size="xs">
                Use code{' '}
                <span className="font-mono font-bold bg-[var(--figma-color-bg)] px-1.5 rounded text-[var(--figma-color-text-success)]">
                  E5MJEZMA
                </span>{' '}
                for <strong>50% off</strong> until <strong>May 31, 2025.</strong>
              </Text>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
}
