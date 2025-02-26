/**
 * LemonSqueezy API Endpoints Configuration
 *
 * This file contains all the endpoint configurations for the LemonSqueezy API.
 * It centralizes URL construction and provides fallback options for different environments.
 */

// Base URL for LemonSqueezy API
export const BASE_URL = 'https://api.lemonsqueezy.com/v1/licenses';

// Endpoints for license operations
export const ENDPOINTS = {
  ACTIVATE: `${BASE_URL}/activate`,
  VALIDATE: `${BASE_URL}/validate`,
  DEACTIVATE: `${BASE_URL}/deactivate`,
};

// Headers for API requests
export const HEADERS = {
  POST: {
    'Content-Type': 'application/x-www-form-urlencoded',
    Accept: 'application/json',
  },
  JSON: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
};

// Helper functions to identify request types
export const isActivateRequest = (endpoint: string): boolean => {
  return endpoint.includes('/activate');
};

export const isValidateRequest = (endpoint: string): boolean => {
  return endpoint.includes('/validate');
};

export const isDeactivateRequest = (endpoint: string): boolean => {
  return endpoint.includes('/deactivate');
};

// Get the appropriate endpoint based on request type
export const getEndpoint = (type: 'ACTIVATE' | 'VALIDATE' | 'DEACTIVATE'): string => {
  return ENDPOINTS[type];
};

// Get the appropriate headers based on content type
export const getHeaders = (
  contentType: 'POST' | 'JSON' = 'POST',
  apiKey?: string,
): Record<string, string> => {
  const headers: Record<string, string> = { ...HEADERS[contentType] };

  if (apiKey) {
    headers['Authorization'] = `Bearer ${apiKey}`;
  }

  return headers;
};
