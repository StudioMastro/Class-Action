import * as React from 'react';
import { useState, useEffect } from 'react';

interface AnalyticsConsentProps {
  onClose: () => void;
}

export const AnalyticsConsent: React.FC<AnalyticsConsentProps> = ({ onClose }) => {
  const [isEnabled, setIsEnabled] = useState<boolean>(true);

  const handleSave = () => {
    // Send message to the plugin code
    parent.postMessage(
      {
        pluginMessage: {
          type: 'analytics-consent',
          enabled: isEnabled,
        },
      },
      '*',
    );
    onClose();
  };

  const handleCancel = () => {
    onClose();
  };

  return (
    <div className="analytics-consent">
      <h2 className="text-lg font-medium mb-4">Usage Data Collection</h2>

      <p className="mb-4">
        To improve Class Action, we'd like to collect anonymous usage data such as:
      </p>

      <ul className="list-disc pl-5 mb-4">
        <li>Number of classes saved and applied</li>
        <li>Features used</li>
        <li>Plugin performance metrics</li>
      </ul>

      <p className="mb-4">
        We <strong>never</strong> collect:
      </p>

      <ul className="list-disc pl-5 mb-4">
        <li>Personal information</li>
        <li>Design content or class details</li>
        <li>Figma file information</li>
      </ul>

      <div className="flex items-center mb-6">
        <input
          type="checkbox"
          id="analytics-consent-checkbox"
          checked={isEnabled}
          onChange={(e) => setIsEnabled(e.target.checked)}
          className="mr-2"
        />
        <label htmlFor="analytics-consent-checkbox">I allow anonymous usage data collection</label>
      </div>

      <div className="flex justify-end space-x-2">
        <button className="px-4 py-2 border border-gray-300 rounded" onClick={handleCancel}>
          Cancel
        </button>
        <button className="px-4 py-2 bg-blue-500 text-white rounded" onClick={handleSave}>
          Save Preference
        </button>
      </div>

      <p className="text-xs text-gray-500 mt-4">
        You can change this setting anytime in the plugin settings.
      </p>
    </div>
  );
};

export default AnalyticsConsent;
