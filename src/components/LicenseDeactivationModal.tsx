/** @jsx h */
import { h } from 'preact'
import { Modal } from './Modal'
import { Text } from './common/Text'
import { Button } from './common/Button'

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
  totalClasses
}: LicenseDeactivationModalProps) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Deactivate License"
    >
      <div className="flex flex-col gap-4">
        <Text size="base">
          Are you sure you want to deactivate your premium license? This will:
        </Text>
        
        <ul className="list-disc list-inside text-sm space-y-1 ml-2">
          <li>Remove access to premium features</li>
          <li>Limit you to 5 saved classes</li>
          {hasExcessClasses && (
            <li className="text-[var(--figma-color-text-danger)]">
              You currently have {totalClasses} classes. Only your 5 oldest classes will remain accessible.
            </li>
          )}
        </ul>

        <div className="p-3 rounded bg-[var(--figma-color-bg-secondary)]">
          <Text size="sm">
            You can reactivate your license at any time by visiting your{" "}
            <a 
              href="https://app.lemonsqueezy.com/my-orders" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-[var(--figma-color-text-brand)]"
            >
              LemonSqueezy account
            </a>
          </Text>
        </div>

        <div className="flex items-center justify-end gap-2 mt-2">
          <Button
            onClick={onClose}
            variant="secondary"
            size="medium"
          >
            Cancel
          </Button>
          <Button
            onClick={onConfirm}
            variant="danger"
            size="medium"
          >
            Deactivate License
          </Button>
        </div>
      </div>
    </Modal>
  )
} 