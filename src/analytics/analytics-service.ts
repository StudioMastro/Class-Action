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
  private endpoint: string;
  private sessionId: string;
  private isEnabled: boolean | undefined;
  private pluginVersion: string;
  private queue: AnalyticsEvent[] = [];
  private flushInterval: number;
  private maxQueueSize: number;
  private intervalId: number | null = null;
  private debug: boolean;

  constructor(config = ANALYTICS_CONFIG) {
    this.endpoint = config.endpoint;
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
    if (this.isEnabled !== true) return;

    // Filter out any potentially sensitive data
    const sanitizedData = eventData ? this.sanitizeData(eventData) : undefined;

    this.queue.push({
      eventName,
      eventData: sanitizedData,
      timestamp: Date.now(),
      sessionId: this.sessionId,
      pluginVersion: this.pluginVersion,
    });

    if (this.debug) {
      console.log(`[Analytics] Event tracked: ${eventName}`, sanitizedData);
    }

    // Auto flush if queue gets too large
    if (this.queue.length >= this.maxQueueSize) {
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
   * Send collected events to the analytics endpoint
   */
  public async flush(): Promise<void> {
    if (this.isEnabled !== true || this.queue.length === 0) return;

    const events = [...this.queue];
    this.queue = [];

    if (this.debug) {
      console.log(`[Analytics] Flushing ${events.length} events`);
    }

    try {
      const response = await fetch(this.endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ events }),
      });

      if (!response.ok) {
        throw new Error(`Analytics API responded with status: ${response.status}`);
      }

      if (this.debug) {
        console.log(`[Analytics] Flush successful`);
      }
    } catch (error) {
      console.error('[Analytics] Failed to send data:', error);
      // Put events back in the queue
      this.queue = [...events, ...this.queue];
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
}

// Create and export a singleton instance
export const analytics = new AnalyticsService();
