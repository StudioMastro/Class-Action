/** @jsx h */
import { h } from 'preact';
import { useState } from 'preact/hooks';
import { AnalyticsSettings } from '../../analytics';
import { Modal } from './Modal';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialAnalyticsEnabled?: boolean;
}

export const SettingsModal = ({
  isOpen,
  onClose,
  initialAnalyticsEnabled = false,
}: SettingsModalProps) => {
  const [analyticsEnabled, setAnalyticsEnabled] = useState<boolean>(initialAnalyticsEnabled);

  const handleAnalyticsSettingChange = (enabled: boolean) => {
    setAnalyticsEnabled(enabled);
  };

  return (
    <Modal isOpen={isOpen} title="Settings" onClose={onClose} hideFooter>
      <div className="settings-modal p-4">
        <div className="mb-6">
          <h3 className="text-lg font-medium mb-4">Plugin Settings</h3>

          <div className="mb-6">
            <AnalyticsSettings
              initialEnabled={analyticsEnabled}
              onSettingChange={handleAnalyticsSettingChange}
            />
          </div>
        </div>

        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Close
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default SettingsModal;
