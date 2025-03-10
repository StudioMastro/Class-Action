/**
 * Analytics Service for Class Action Plugin
 *
 * This service handles anonymous usage data collection to help improve the plugin.
 * It respects user privacy by:
 * - Only collecting anonymous data
 * - Requiring explicit user consent
 * - Providing easy opt-out options
 * - Not collecting any personally identifiable information
 */

import { ANALYTICS_CONFIG } from './config';

export interface AnalyticsEvent {
  eventName: string;
  eventData?: Record<string, unknown>;
  timestamp: number;
  sessionId: string;
  pluginVersion: string;
}

export class AnalyticsService {
  private sessionId: string;
  private isEnabled: boolean | undefined;
  private pluginVersion: string;
  private queue: AnalyticsEvent[] = [];
  private flushInterval: number;
  private maxQueueSize: number;
  private intervalId: number | null = null;
  private debug: boolean;

  constructor(config = ANALYTICS_CONFIG) {
    this.pluginVersion = config.version;
    this.flushInterval = config.flushInterval;
    this.maxQueueSize = config.maxQueueSize;
    this.debug = config.debug;
    this.sessionId = this.generateSessionId();

    // Initialize based on stored preference
    this.initializeFromStorage();
  }

  /**
   * Generates a random session ID for this plugin session
   */
  private generateSessionId(): string {
    return Math.random().toString(36).substring(2, 15);
  }

  /**
   * Initialize analytics settings from client storage
   */
  private async initializeFromStorage(): Promise<void> {
    try {
      // Verifica se l'oggetto figma è disponibile
      if (typeof figma === 'undefined' || !figma.clientStorage) {
        console.warn('[Analytics] figma object not available, using default settings');
        this.isEnabled = false;
        return;
      }

      const enabled = await figma.clientStorage.getAsync('analytics_enabled');
      this.isEnabled = enabled === true;

      if (this.debug) {
        console.log(`[Analytics] Initialized with enabled=${this.isEnabled}`);
      }

      // If undefined (first use), prompt for consent
      if (this.isEnabled === undefined) {
        // Don't prompt immediately, wait for user to interact with the plugin
        setTimeout(() => this.promptForConsent(), 10000);
      } else if (this.isEnabled === true) {
        this.startAutoFlush();
      }
    } catch (error) {
      console.error('[Analytics] Failed to initialize settings:', error);
      this.isEnabled = false;
    }
  }

  /**
   * Save user preference for analytics
   */
  private async saveAnalyticsPreference(enabled: boolean): Promise<void> {
    try {
      // Verifica se l'oggetto figma è disponibile
      if (typeof figma === 'undefined' || !figma.clientStorage) {
        console.warn('[Analytics] figma object not available, cannot save preference');
        this.isEnabled = enabled;
        return;
      }

      await figma.clientStorage.setAsync('analytics_enabled', enabled);
      this.isEnabled = enabled;

      if (this.debug) {
        console.log(`[Analytics] Preference saved: enabled=${enabled}`);
      }

      if (enabled && !this.intervalId) {
        this.startAutoFlush();
      } else if (!enabled && this.intervalId) {
        clearInterval(this.intervalId);
        this.intervalId = null;
      }
    } catch (error) {
      console.error('[Analytics] Failed to save preference:', error);
    }
  }

  /**
   * Prompt user for analytics consent
   */
  private promptForConsent(): void {
    // Verifica se l'oggetto figma è disponibile
    if (typeof figma === 'undefined') {
      console.warn('[Analytics] figma object not available, cannot prompt for consent');
      return;
    }

    figma.notify(
      "To improve Class Action, we'd like to collect anonymous usage data. No personal data is collected.",
      {
        timeout: 10000,
        button: {
          text: 'Settings',
          action: () => {
            // Open a UI for the choice
            figma.showUI(__html__, { width: 300, height: 200 });
            figma.ui.postMessage({ type: 'show-analytics-consent' });

            // Handle the response
            figma.ui.onmessage = (msg: { type: string; enabled?: boolean }) => {
              if (msg.type === 'analytics-consent' && typeof msg.enabled === 'boolean') {
                this.saveAnalyticsPreference(msg.enabled);
                figma.notify(
                  msg.enabled
                    ? 'Thank you! This helps us improve the plugin.'
                    : 'Analytics disabled. You can change this in settings anytime.',
                );
              }
            };
          },
        },
      },
    );
  }

  /**
   * Start automatic flush interval
   */
  private startAutoFlush(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }

    this.intervalId = setInterval(() => this.flush(), this.flushInterval) as unknown as number;

    if (this.debug) {
      console.log(`[Analytics] Auto-flush started with interval ${this.flushInterval}ms`);
    }
  }

  /**
   * Track an event
   */
  public trackEvent(eventName: string, eventData?: Record<string, unknown>): void {
    console.log(`[Analytics Debug] Attempting to track event: ${eventName}`, eventData);

    if (this.isEnabled !== true) {
      console.log(`[Analytics Debug] Event tracking skipped - analytics not enabled`);
      return;
    }

    // Filter out any potentially sensitive data
    const sanitizedData = eventData ? this.sanitizeData(eventData) : undefined;

    this.queue.push({
      eventName,
      eventData: sanitizedData,
      timestamp: Date.now(),
      sessionId: this.sessionId,
      pluginVersion: this.pluginVersion,
    });

    console.log(`[Analytics Debug] Event added to queue. Queue size: ${this.queue.length}`);

    if (this.debug) {
      console.log(`[Analytics] Event tracked: ${eventName}`, sanitizedData);
    }

    // Auto flush if queue gets too large
    if (this.queue.length >= this.maxQueueSize) {
      console.log(`[Analytics Debug] Queue size threshold reached. Triggering flush.`);
      this.flush();
    }
  }

  /**
   * Remove any potentially sensitive data
   */
  private sanitizeData(data: Record<string, unknown>): Record<string, unknown> {
    const result = { ...data };

    // Remove any keys that might contain sensitive information
    const sensitiveKeys = ['email', 'name', 'user', 'password', 'token', 'key', 'secret'];

    Object.keys(result).forEach((key) => {
      if (sensitiveKeys.some((sk) => key.toLowerCase().includes(sk))) {
        delete result[key];
      } else if (typeof result[key] === 'object' && result[key] !== null) {
        result[key] = this.sanitizeData(result[key] as Record<string, unknown>);
      }
    });

    return result;
  }

  /**
   * Flush events to the server and local storage
   *
   * This method sends the queued events to the analytics server
   * and also stores them in the local storage for backup.
   */
  public async flush(): Promise<void> {
    console.log(
      `[Analytics Debug] Flush called. Queue size: ${this.queue.length}, Enabled: ${this.isEnabled}`,
    );

    if (this.isEnabled !== true || this.queue.length === 0) {
      console.log(`[Analytics Debug] Flush skipped - analytics not enabled or queue empty`);
      return;
    }

    try {
      // Clone the queue for sending
      const eventsToSend = [...this.queue];

      console.log(
        `[Analytics Debug] Preparing to send ${eventsToSend.length} events to endpoint: ${ANALYTICS_CONFIG.endpoint}`,
      );

      if (this.debug) {
        console.log(
          `[Analytics] Flushing ${eventsToSend.length} events to server and local storage`,
        );
      }

      // 1. Send to server endpoint
      try {
        console.log(`[Analytics Debug] Sending request to: ${ANALYTICS_CONFIG.endpoint}`);

        const response = await fetch(ANALYTICS_CONFIG.endpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-API-Key': ANALYTICS_CONFIG.apiKey,
          },
          body: JSON.stringify(eventsToSend),
        });

        console.log(`[Analytics Debug] Response status: ${response.status}`);

        if (!response.ok) {
          console.error(`[Analytics] Server responded with status: ${response.status}`);
        } else if (this.debug) {
          console.log('[Analytics] Successfully sent events to server');
        }
      } catch (error) {
        console.error('[Analytics] Failed to send events to server:', error);
        // Continue with local storage even if server send fails
      }

      // 2. Store in local storage (as backup and for user transparency)
      try {
        // Verifica se l'oggetto figma è disponibile
        if (typeof figma === 'undefined' || !figma.clientStorage) {
          console.warn(
            '[Analytics] figma object not available, cannot store events in local storage',
          );
          // Clear the queue anyway to prevent it from growing indefinitely
          this.queue = [];
          return;
        }

        // Get existing events
        const existingEvents: AnalyticsEvent[] =
          (await figma.clientStorage.getAsync('analytics_events')) || [];

        // Add new events
        const updatedEvents = [...existingEvents, ...eventsToSend];

        // Store back to client storage
        await figma.clientStorage.setAsync('analytics_events', updatedEvents);

        if (this.debug) {
          console.log(
            `[Analytics] Stored ${eventsToSend.length} events in local storage. Total: ${updatedEvents.length}`,
          );
        }

        // Clear the queue after successful storage
        this.queue = [];
      } catch (storageError) {
        console.error('[Analytics] Failed to store events in local storage:', storageError);
      }
    } catch (error) {
      console.error('[Analytics] Error during flush operation:', error);
    }
  }

  /**
   * Enable or disable analytics
   */
  public setEnabled(enabled: boolean): void {
    this.saveAnalyticsPreference(enabled);

    if (!enabled) {
      // Clear the queue if disabled
      this.queue = [];
    }
  }

  /**
   * Get current analytics enabled state
   */
  public isAnalyticsEnabled(): boolean {
    return this.isEnabled === true;
  }

  /**
   * Export collected analytics data
   *
   * This function exports all analytics data stored in the client storage.
   * It can be used for debugging or to manually send the data to a backend service.
   */
  public async exportAnalyticsData(): Promise<AnalyticsEvent[]> {
    try {
      // Flush any pending events
      await this.flush();

      // Get all stored events
      const events = (await figma.clientStorage.getAsync('analytics_events')) || [];

      if (this.debug) {
        console.log(`[Analytics] Exported ${events.length} events`);
      }

      return events;
    } catch (error) {
      console.error('[Analytics] Failed to export analytics data:', error);
      return [];
    }
  }

  /**
   * Clear all stored analytics data
   *
   * This function clears all analytics data stored in the client storage.
   * It can be used to free up storage space or to reset the analytics data.
   */
  public async clearAnalyticsData(): Promise<void> {
    try {
      await figma.clientStorage.setAsync('analytics_events', []);

      if (this.debug) {
        console.log('[Analytics] Cleared all analytics data');
      }
    } catch (error) {
      console.error('[Analytics] Failed to clear analytics data:', error);
    }
  }
}

// Create and export a singleton instance
export const analytics = new AnalyticsService();
