/** @jsx h */
import { h } from 'preact';
import { useState, useEffect } from 'preact/hooks';

interface AnalyticsSettingsProps {
  initialEnabled?: boolean;
  onSettingChange?: (enabled: boolean) => void;
}

export const AnalyticsSettings = ({
  initialEnabled = false,
  onSettingChange,
}: AnalyticsSettingsProps) => {
  const [isEnabled, setIsEnabled] = useState<boolean>(initialEnabled);

  useEffect(() => {
    // When initialEnabled prop changes, update the state
    setIsEnabled(initialEnabled);
  }, [initialEnabled]);

  const handleToggle = (e: Event) => {
    const target = e.target as HTMLInputElement;
    const newValue = target.checked;
    setIsEnabled(newValue);

    if (onSettingChange) {
      onSettingChange(newValue);
    }

    // Send message to the plugin code
    parent.postMessage(
      {
        pluginMessage: {
          type: 'analytics-consent',
          enabled: newValue,
        },
      },
      '*',
    );
  };

  return (
    <div className="analytics-settings">
      <div className="setting-group">
        <h3 className="text-md font-medium mb-2">Usage Data Collection</h3>

        <div className="flex items-center mb-2">
          <input
            type="checkbox"
            id="analytics-enabled-checkbox"
            checked={isEnabled}
            onChange={handleToggle}
            className="mr-2"
          />
          <label htmlFor="analytics-enabled-checkbox" className="text-sm">
            Allow anonymous usage data collection
          </label>
        </div>

        <p className="text-xs text-gray-500 mb-4">
          This helps us improve the plugin by understanding how it's used. We never collect personal
          information or design content.
        </p>

        <details className="text-xs text-gray-600">
          <summary className="cursor-pointer mb-1">What data is collected?</summary>
          <ul className="list-disc pl-4 mb-2">
            <li>Number of classes saved and applied</li>
            <li>Features used</li>
            <li>Plugin performance metrics</li>
          </ul>
          <p className="mb-2">
            We <strong>never</strong> collect:
          </p>
          <ul className="list-disc pl-4">
            <li>Personal information</li>
            <li>Design content or class details</li>
            <li>Figma file information</li>
          </ul>
        </details>
      </div>
    </div>
  );
};

export default AnalyticsSettings;
