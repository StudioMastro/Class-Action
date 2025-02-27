/** @jsx h */
import { h } from 'preact';
import { Modal } from './Modal';
import { Text } from './common/Text';
import { Button } from './common/Button';

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
    <Modal isOpen={isOpen} onClose={onClose} title="Upgrade to Premium">
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <Text size="base">{featureName} is a Premium feature. Upgrade now to unlock:</Text>
          <div className="mt-2 space-y-3">
            <div className="flex items-center gap-2">
              <svg
                width="20"
                height="20"
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
              <Text weight="bold" className="text-sm leading-4">
                Unlimited saved classes
              </Text>
            </div>
            <div className="flex items-center gap-2">
              <svg
                width="20"
                height="20"
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
              <Text weight="bold" className="text-sm leading-4">
                Import/Export functionality
              </Text>
            </div>
            <div className="flex items-center gap-2">
              <svg
                width="20"
                height="20"
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
              <Text weight="bold" className="text-sm leading-4">
                "Apply All" feature
              </Text>
            </div>
            <div className="flex items-center gap-2">
              <svg
                width="20"
                height="20"
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
              <Text weight="bold" className="text-sm leading-4">
                Priority support
              </Text>
            </div>
          </div>

          <div
            className="mt-4 p-4 rounded-md"
            style={{ backgroundColor: 'var(--figma-color-bg-success-tertiary)' }}
          >
            <div className="flex flex-col gap-1">
              <Text weight="bold" className="text-[var(--figma-color-text-success)]">
                Special Launch Offer!
              </Text>
              <Text>
                Get Premium for just <strong>€29/year</strong> (regular price <s>€39/year</s>)
              </Text>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-2 mt-2">
          <Button onClick={onClose} variant="secondary" size="medium">
            Maybe Later
          </Button>
          <Button onClick={handleUpgradeClick} variant="primary" size="medium">
            Upgrade now
          </Button>
        </div>
      </div>
    </Modal>
  );
}
