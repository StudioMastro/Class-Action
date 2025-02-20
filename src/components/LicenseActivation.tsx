/** @jsx h */
import { h } from 'preact'
import { useState } from 'preact/hooks'
import { Text } from './common/Text'
import { Button } from './common/Button'
import { TextInput } from './TextInput'
import type { LicenseStatus } from '../types/license'

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
  onClose
}: LicenseActivationProps) {
  const [licenseKey, setLicenseKey] = useState('')
  const [isActivating, setIsActivating] = useState(false)
  const [isDeactivating, setIsDeactivating] = useState(false)

  const handleActivate = async () => {
    if (!licenseKey.trim()) return
    setIsActivating(true)
    try {
      await onActivate(licenseKey.trim())
      setLicenseKey('')
      onClose()
    } catch (error) {
      console.error('License activation error:', error)
    } finally {
      setIsActivating(false)
    }
  }

  const handleDeactivate = async () => {
    setIsDeactivating(true)
    try {
      await onDeactivate()
    } catch (error) {
      console.error('License deactivation error:', error)
    } finally {
      setIsDeactivating(false)
    }
  }

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-[var(--figma-color-bg)] rounded-lg p-6 max-w-md w-full mx-4">
        <div className="flex flex-col gap-4">
          <Text weight="bold">License Management</Text>
          
          {/* Status Display */}
          <div className="flex items-center gap-2 p-2 rounded" style={{ 
            backgroundColor: currentStatus.isValid 
              ? 'var(--figma-color-bg-success)' 
              : 'var(--figma-color-bg-secondary)'
          }}>
            <Text size="sm">
              Status: {currentStatus.isValid ? 'Premium Active' : 'Free Plan'}
              {currentStatus.expiresAt && ` (Expires: ${new Date(currentStatus.expiresAt).toLocaleDateString()})`}
            </Text>
          </div>

          {/* License Key Input */}
          {!currentStatus.isValid && (
            <div className="flex flex-col gap-2">
              <Text size="sm">Enter your license key to activate Premium features:</Text>
              <div className="flex gap-2">
                <TextInput
                  value={licenseKey}
                  onChange={setLicenseKey}
                  placeholder="XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX"
                  className="flex-1"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      handleActivate()
                    }
                  }}
                />
                <Button
                  onClick={handleActivate}
                  disabled={!licenseKey.trim() || isActivating}
                  variant="primary"
                >
                  {isActivating ? 'Activating...' : 'Activate'}
                </Button>
              </div>
            </div>
          )}

          {/* Deactivate Option */}
          {currentStatus.isValid && (
            <div className="flex justify-end">
              <Button
                onClick={handleDeactivate}
                disabled={isDeactivating}
                variant="secondary"
                size="small"
              >
                {isDeactivating ? 'Deactivating...' : 'Deactivate License'}
              </Button>
            </div>
          )}

          {/* Close Button */}
          <div className="flex justify-end mt-4">
            <Button
              onClick={onClose}
              variant="secondary"
              size="small"
            >
              Close
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
} 