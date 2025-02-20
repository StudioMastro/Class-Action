/** @jsx h */
import { h } from 'preact';
import { useState } from 'preact/hooks';
import { Text } from './common/Text';
import { Button } from './common/Button';
import { TextInput } from './TextInput';
import { Modal } from './Modal';
import type { LicenseStatus } from '../types/license';

interface LicenseActivationProps {
  currentStatus: LicenseStatus;
  onActivate: (key: string) => Promise<void>;
  onDeactivate: () => Promise<void>;
  isOpen: boolean;
  onClose: () => void;
}

export function LicenseActivation({
  currentStatus,
  onActivate,
  onDeactivate,
  isOpen,
  onClose,
}: LicenseActivationProps) {
  const [licenseKey, setLicenseKey] = useState('');
  const [isActivating, setIsActivating] = useState(false);
  const [isDeactivating, setIsDeactivating] = useState(false);

  const handleActivate = async () => {
    if (!licenseKey.trim()) return;
    setIsActivating(true);
    try {
      await onActivate(licenseKey.trim());
      setLicenseKey('');
      onClose();
    } catch (error) {
      console.error('License activation error:', error);
    } finally {
      setIsActivating(false);
    }
  };

  const handleDeactivate = async () => {
    setIsDeactivating(true);
    try {
      await onDeactivate();
    } catch (error) {
      console.error('License deactivation error:', error);
    } finally {
      setIsDeactivating(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="License Management">
      <div className="flex flex-col gap-4">
        {/* Status Display */}
        <div
          className="flex items-center gap-2 p-3 rounded"
          style={{
            backgroundColor: currentStatus.isValid
              ? 'var(--figma-color-bg-success)'
              : 'var(--figma-color-bg-secondary)',
          }}
        >
          <Text size="sm">
            Status: {currentStatus.isValid ? 'Premium Active' : 'Free Plan'}
            {currentStatus.expiresAt &&
              ` (Expires: ${new Date(currentStatus.expiresAt).toLocaleDateString()})`}
          </Text>
        </div>

        {/* License Key Input */}
        {!currentStatus.isValid && (
          <div className="flex flex-col gap-3">
            <Text size="sm">Enter your license key to activate Premium features:</Text>
            <TextInput
              value={licenseKey}
              onChange={setLicenseKey}
              placeholder="XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX"
              className="w-full"
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleActivate();
                }
              }}
            />
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex justify-end gap-2 mt-2">
          <Button onClick={onClose} variant="secondary" size="medium">
            Cancel
          </Button>

          {currentStatus.isValid ? (
            <Button
              onClick={handleDeactivate}
              disabled={isDeactivating}
              variant="danger"
              size="medium"
            >
              {isDeactivating ? 'Deactivating...' : 'Deactivate License'}
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
