---
description: Documentation of error messages and user guidance for the licensing system
globs: ["src/services/licenseService.ts", "src/components/License*.tsx"]
alwaysApply: false
---
# License Error Messages and User Guidance

This document provides a comprehensive list of all error messages shown to users during license activation and validation processes, along with the corresponding actions suggested to users.

## Table of Contents

1. [License Not Found (404 Not Found)](#license-not-found-404-not-found)
2. [Authorization Error (401 Unauthorized)](#authorization-error-401-unauthorized)
3. [Rate Limiting (429 Too Many Requests)](#rate-limiting-429-too-many-requests)
4. [Server Errors (500, 502, 503, 504)](#server-errors-500-502-503-504)
5. [Network Connectivity Issues](#network-connectivity-issues)
6. [Connection Timeout](#connection-timeout)
7. [License Already Activated (400 Bad Request)](#license-already-activated-400-bad-request)
8. [Invalid License (400 Bad Request)](#invalid-license-400-bad-request)

## License Not Found (404 Not Found)

```
Message: "The license key you entered does not exist."
Suggested actions:
- "Check if you typed the license key correctly"
- "Make sure you are using a valid license key"
- "Contact support if you need assistance"
```

## Authorization Error (401 Unauthorized)

```
Message: "Authorization failed. The plugin cannot connect to the license server."
Suggested actions:
- "Contact the plugin developer"
- "Try again later"
```

## Rate Limiting (429 Too Many Requests)

```
Message: "Too many license activation attempts. Please try again later."
Suggested actions:
- "Wait a few minutes before trying again"
- "Contact support if the problem persists"
```

## Server Errors (500, 502, 503, 504)

```
Message: "The license server is currently experiencing issues."
Suggested actions:
- "Try again later"
- "Check the service status"
- "Contact support if the problem persists"
```

## Network Connectivity Issues

```
Message: "Unable to connect to the license server. Please check your internet connection."
Suggested actions:
- "Check your internet connection"
- "Try again when you are online"
- "Contact support if you are already online"
```

## Connection Timeout

```
Message: "The connection to the license server timed out."
Suggested actions:
- "Check your internet connection"
- "Try again later"
- "Contact support if the problem persists"
```

## License Already Activated (400 Bad Request)

```
Message: "This license key has already been activated on another device."
Suggested actions:
- "Use a different license key"
- "Deactivate the license on another device"
- "Contact support for assistance"
```

## Invalid License (400 Bad Request)

```
Message: "The license key you entered is invalid or does not exist."
Suggested actions:
- "Check the license key and try again"
- "Contact support if you believe this is an error"
```

## Implementation

These error messages are implemented in the `src/services/licenseService.ts` file, specifically in the `makeRequest` method which handles API requests to the LemonSqueezy license server.

Each error type is handled with specific error codes, messages, and suggested actions to help users resolve the issue.

## References

- [Main Licensing Documentation](.cursor/docs/LICENSING.mdc)
- [LemonSqueezy API Documentation](https://docs.lemonsqueezy.com/api)
- [LemonSqueezy License API](https://docs.lemonsqueezy.com/api/license-api) 