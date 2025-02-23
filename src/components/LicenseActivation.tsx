/** @jsx h */
import { h } from 'preact';
import { useState, useEffect } from 'preact/hooks';
import { Text } from './common/Text';
import { Button } from './common/Button';
import { TextInput } from './TextInput';
import { Modal } from './Modal';
import type { LicenseStatus, LicenseError } from '../types/license';

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

  // Combiniamo gli errori da entrambe le fonti
  const activeError = error || currentStatus.error;

  const handleActivate = async () => {
    if (!licenseKey.trim() || isActivating) return;
    setIsActivating(true);
    onActivate(licenseKey.trim());
  };

  const handleDeactivate = async () => {
    if (isDeactivating) return;
    setIsDeactivating(true);
    onDeactivate();
  };

  // Reset dello stato quando il modale viene chiuso
  useEffect(() => {
    if (!isOpen) {
      setLicenseKey('');
      setIsActivating(false);
      setIsDeactivating(false);
    }
  }, [isOpen]);

  // Gestione dei cambiamenti di stato della licenza
  useEffect(() => {
    if (currentStatus.status === 'error') {
      setIsActivating(false);
      setIsDeactivating(false);
    } else if (currentStatus.isValid) {
      setIsActivating(false);
      setIsDeactivating(false);
      onClose();
    }
  }, [currentStatus, onClose]);

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="License Management">
      <div className="flex flex-col gap-4">
        {/* Status Display - sempre visibile */}
        <div className="flex items-center gap-2 p-3 rounded bg-[var(--figma-color-bg-secondary)]">
          <Text size="sm">{currentStatus.isValid ? 'Premium Active' : 'Free Plan'}</Text>
        </div>

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
        ) : (
          <div className="flex flex-col gap-2">
            <TextInput
              value={licenseKey}
              onChange={setLicenseKey}
              placeholder="Enter license key..."
              disabled={isActivating}
            />

            {/* Error Display - sotto l'input */}
            {activeError && (
              <div className="p-3 rounded bg-[var(--figma-color-bg-danger)]">
                <Text size="sm" className="text-[var(--figma-color-text-onbrand)]">
                  {activeError.message}
                </Text>
                {activeError.actions && activeError.actions.length > 0 && (
                  <ul className="mt-2 text-sm list-disc list-inside">
                    {activeError.actions.map((action, index) => (
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
              {isActivating ? 'Processing...' : 'Activate License'}
            </Button>
          </div>
        )}
      </div>
    </Modal>
  );
}
