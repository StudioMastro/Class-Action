/**
 * LemonSqueezy API Parameters Configuration
 *
 * This file defines the required and optional parameters for each type of
 * LemonSqueezy API request (activation, validation, deactivation).
 */

// Required parameters for each endpoint type
export const REQUIRED_PARAMS = {
  // Parameters required for license activation
  ACTIVATE: ['license_key', 'instance_name', 'instance_identifier'],

  // Parameters required for license validation
  VALIDATE: ['license_key', 'instance_id'],

  // Parameters required for license deactivation
  DEACTIVATE: ['license_key', 'instance_id'],
};

// Optional parameters for each endpoint type
export const OPTIONAL_PARAMS = {
  // Optional parameters for license activation
  ACTIVATE: ['store_id', 'product_id', 'meta'],

  // Optional parameters for license validation
  VALIDATE: ['store_id', 'product_id', 'meta'],

  // Optional parameters for license deactivation
  DEACTIVATE: ['store_id', 'product_id'],
};

/**
 * Validates that all required parameters are present for a specific request type
 *
 * @param type The type of request (ACTIVATE, VALIDATE, DEACTIVATE)
 * @param params The parameters object to validate
 * @returns An object with validation result and missing parameters if any
 */
export const validateRequiredParams = (
  type: 'ACTIVATE' | 'VALIDATE' | 'DEACTIVATE',
  params: Record<string, string | undefined>,
): { isValid: boolean; missing: string[] } => {
  const requiredParams = REQUIRED_PARAMS[type];
  const missing = requiredParams.filter((param) => !params[param]);

  return {
    isValid: missing.length === 0,
    missing,
  };
};

/**
 * Maps parameter names from our internal format to LemonSqueezy's expected format
 *
 * @param type The type of request (ACTIVATE, VALIDATE, DEACTIVATE)
 * @param params The parameters object to map
 * @returns A new object with mapped parameter names
 */
export const mapParamsToApiFormat = (
  type: 'ACTIVATE' | 'VALIDATE' | 'DEACTIVATE',
  params: Record<string, string | undefined>,
): Record<string, string> => {
  const result: Record<string, string> = {};

  // Map all parameters that have values
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined) {
      // Special case for instance_identifier in activation requests
      if (type === 'ACTIVATE' && key === 'device_id') {
        result['instance_identifier'] = value;
      }
      // Special case for device_name in activation requests
      else if (type === 'ACTIVATE' && key === 'device_name') {
        result['instance_name'] = value;
      }
      // Special case for device_id in validation requests
      else if ((type === 'VALIDATE' || type === 'DEACTIVATE') && key === 'device_id') {
        result['instance_id'] = value;
      }
      // All other parameters are passed through as-is
      else {
        result[key] = value;
      }
    }
  });

  return result;
};
