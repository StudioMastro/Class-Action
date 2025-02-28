/** @jsx h */
import { h } from 'preact';
import { Text } from '../common/Text';
import { ConfirmDialog } from './ConfirmDialog';

interface LicenseDeactivationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  hasExcessClasses: boolean;
  totalClasses: number;
}

export function LicenseDeactivationModal({
  isOpen,
  onClose,
  onConfirm,
  hasExcessClasses,
  totalClasses,
}: LicenseDeactivationModalProps) {
  return (
    <ConfirmDialog
      isOpen={isOpen}
      onClose={onClose}
      onConfirm={onConfirm}
      title="Deactivate License"
      confirmText="Deactivate"
      variant="danger"
    >
      <div className="flex flex-col gap-3">
        <Text size="sm">
          Are you sure you want to deactivate your license on this device? This will disable all
          premium features.
        </Text>

        {hasExcessClasses && (
          <div className="p-3 rounded bg-[var(--figma-color-bg-warning)]">
            <Text size="sm" weight="bold" className="text-[var(--figma-color-text-warning)]">
              Warning
            </Text>
            <Text size="sm" className="text-[var(--figma-color-text-warning)]">
              You currently have {totalClasses} saved classes. After deactivation, you'll be limited
              to 5 classes on the free plan. Any excess classes will remain saved but won't be
              accessible until you reactivate your license.
            </Text>
          </div>
        )}

        <Text size="sm">
          You can reactivate your license at any time using the same license key.
        </Text>
      </div>
    </ConfirmDialog>
  );
}
