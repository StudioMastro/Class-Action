/**
 * License Request Utilities
 *
 * This file contains utility functions for building and validating
 * license request parameters for the LemonSqueezy API.
 */

import { validateRequiredParams, mapParamsToApiFormat } from '../config/lemonSqueezyParams';
import { logger } from '../services/logger';

/**
 * Device information interface for license activation and validation
 */
export interface DeviceInfo {
  deviceId: string;
  deviceName: string;
}

/**
 * Builds form data for license API requests
 *
 * @param type The type of request (ACTIVATE, VALIDATE, DEACTIVATE)
 * @param licenseKey The license key
 * @param deviceInfo Device information for the request
 * @param instanceId Instance ID for deactivation requests
 * @param additionalParams Additional parameters to include
 * @returns URL-encoded form data string or null if validation fails
 */
export function buildFormData(
  type: 'ACTIVATE' | 'VALIDATE' | 'DEACTIVATE',
  licenseKey: string,
  deviceInfo?: DeviceInfo,
  instanceId?: string,
  additionalParams?: Record<string, string>,
): string | null {
  // Prepare parameters based on request type
  const params: Record<string, string | undefined> = {
    license_key: licenseKey,
    ...additionalParams,
  };

  // Add device info for activation and validation
  if (type === 'ACTIVATE' && deviceInfo) {
    params.device_id = deviceInfo.deviceId;
    params.device_name = deviceInfo.deviceName;
  } else if (type === 'VALIDATE' && deviceInfo) {
    params.device_id = deviceInfo.deviceId;
  } else if (type === 'DEACTIVATE' && instanceId) {
    params.device_id = instanceId;
  }

  // Map parameters to API format
  const apiParams = mapParamsToApiFormat(type, params);

  // Validate required parameters
  const validation = validateRequiredParams(type, apiParams);
  if (!validation.isValid) {
    logger.error(
      `Missing required parameters for ${type} request: ${validation.missing.join(', ')}`,
    );
    return null;
  }

  // Build form data string
  return Object.entries(apiParams)
    .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
    .join('&');
}

/**
 * Converts a string to a Uint8Array for Figma API usage
 *
 * @param str The string to convert
 * @returns Uint8Array representation of the string
 */
export function stringToUint8Array(str: string): Uint8Array {
  const encoder = new TextEncoder();
  return encoder.encode(str);
}

/**
 * Obscures a license key for logging purposes
 *
 * @param licenseKey The license key to obscure
 * @returns Obscured license key
 */
export function obscureLicenseKey(licenseKey: string): string {
  if (!licenseKey || licenseKey.length < 8) {
    return '***';
  }

  const firstChars = licenseKey.substring(0, 4);
  const lastChars = licenseKey.substring(licenseKey.length - 4);
  return `${firstChars}...${lastChars}`;
}

/**
 * Builds a request payload object for logging
 *
 * @param params The request parameters
 * @returns A safe object for logging
 */
export function buildLogPayload(params: Record<string, string>): Record<string, string> {
  const logPayload: Record<string, string> = { ...params };

  // Obscure sensitive information
  if (logPayload.license_key) {
    logPayload.license_key = obscureLicenseKey(logPayload.license_key);
  }

  if (logPayload.instance_identifier || logPayload.instance_id) {
    const id = logPayload.instance_identifier || logPayload.instance_id;
    if (id) {
      logPayload.instance_id = `${id.substring(0, 4)}...`;
    }
    delete logPayload.instance_identifier;
  }

  return logPayload;
}
