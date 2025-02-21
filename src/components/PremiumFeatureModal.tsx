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
          <ul className="list-disc list-inside text-sm space-y-1 ml-2">
            <li>Unlimited saved classes</li>
            <li>Import/Export functionality</li>
            <li>Apply All feature for batch operations</li>
            <li>Priority support</li>
            <li>Early access to new features</li>
          </ul>
          <div
            className="mt-4 p-3 rounded"
            style={{ backgroundColor: 'var(--figma-color-bg-brand-tertiary)' }}
          >
            <Text size="sm" weight="bold">
              Special Launch Offer!
            </Text>
            <Text size="sm">Get Premium for just €29/year (regular price €39/year)</Text>
          </div>
        </div>

        <div className="flex items-center justify-end gap-2">
          <Button onClick={onClose} variant="secondary" size="medium">
            Maybe Later
          </Button>
          <Button onClick={handleUpgradeClick} variant="primary" size="medium">
            Upgrade Now
          </Button>
        </div>
      </div>
    </Modal>
  );
}
