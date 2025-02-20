import { h } from 'preact'
import { useState } from 'preact/hooks'

// Define possible license status values
export type LicenseStatus = 'idle' | 'pending' | 'valid' | 'invalid'
export type LicenseTier = 'freemium' | 'premium' | 'enterprise'

interface LicenseInfo {
  status: LicenseStatus
  tier: LicenseTier
  expirationDate?: string
}

const LicenseManager = () => {
  const [licenseKey, setLicenseKey] = useState('')
  const [licenseStatus, setLicenseStatus] = useState<LicenseStatus>('idle')
  const [message, setMessage] = useState('')
  const [licenseInfo, setLicenseInfo] = useState<LicenseInfo | null>(null)

  const handleLicenseValidation = () => {
    setLicenseStatus('pending')
    setMessage('Validating license...')

    // Simulate license validation (replace with real validation later)
    setTimeout(() => {
      if (licenseKey === 'TEST-VALID-LICENSE') {
        setLicenseStatus('valid')
        setLicenseInfo({
          status: 'valid',
          tier: 'premium',
          expirationDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString() // 30 days from now
        })
        setMessage('License is valid! Premium features activated.')
      } else {
        setLicenseStatus('invalid')
        setLicenseInfo(null)
        setMessage('Invalid license key. Please try again.')
      }
    }, 1500)
  }

  return (
    <div className="p-4 max-w-md mx-auto bg-white shadow rounded">
      <h2 className="text-xl font-semibold mb-4">License Activation</h2>
      
      <div className="mb-4">
        <input
          type="text"
          value={licenseKey}
          onInput={(e) => setLicenseKey((e.target as HTMLInputElement).value)}
          placeholder="Enter your license key"
          className="w-full p-2 border border-gray-300 rounded"
        />
      </div>

      <button
        onClick={handleLicenseValidation}
        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        disabled={licenseStatus === 'pending'}
      >
        {licenseStatus === 'pending' ? 'Validating...' : 'Validate License'}
      </button>

      {message && (
        <div className={`mt-4 p-2 rounded ${
          licenseStatus === 'valid' ? 'bg-green-100 text-green-800' : 
          licenseStatus === 'invalid' ? 'bg-red-100 text-red-800' : 
          'bg-gray-100 text-gray-800'
        }`}>
          <p>{message}</p>
        </div>
      )}

      {licenseInfo && (
        <div className="mt-4 p-2 bg-gray-50 rounded">
          <h3 className="font-semibold">License Information</h3>
          <p>Tier: {licenseInfo.tier}</p>
          {licenseInfo.expirationDate && (
            <p>Expires: {new Date(licenseInfo.expirationDate).toLocaleDateString()}</p>
          )}
        </div>
      )}
    </div>
  )
}

export default LicenseManager 