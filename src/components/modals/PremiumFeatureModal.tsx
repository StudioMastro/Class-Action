/** @jsx h */
import { h } from 'preact';
import { Modal } from './Modal';
import { Text } from '../common/Text';

interface PremiumFeatureModalProps {
  isOpen: boolean;
  onClose: () => void;
  featureName: string;
  checkoutUrl: string;
}

export function PremiumFeatureModal({
  isOpen,
  onClose,
  featureName,
  checkoutUrl,
}: PremiumFeatureModalProps) {
  const handleUpgradeClick = () => {
    // Apre il checkout in una nuova finestra
    window.open(checkoutUrl, '_blank');
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
                Get Premium for just <strong>€29/year</strong> (regular price <s>€39/year</s>)
              </Text>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
}
