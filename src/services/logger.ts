/**
 * Logger Service
 *
 * This service provides centralized logging functionality with different log levels
 * and formatting options. It can be configured to behave differently based on
 * the current environment (development, production).
 */

// Log levels
export enum LogLevel {
  DEBUG = 0,
  INFO = 1,
  WARN = 2,
  ERROR = 3,
}

// Logger configuration
interface LoggerConfig {
  minLevel: LogLevel;
  prefix: string;
  enableTimestamps: boolean;
  enableConsole: boolean;
}

// Default configuration
const DEFAULT_CONFIG: LoggerConfig = {
  minLevel: LogLevel.DEBUG,
  prefix: '[LICENSE]',
  enableTimestamps: true,
  enableConsole: true,
};

/**
 * Logger class for centralized logging
 */
class Logger {
  private config: LoggerConfig;
  private logHistory: Array<{
    level: LogLevel;
    message: string;
    data?: unknown;
    timestamp: Date;
  }> = [];

  constructor(config: Partial<LoggerConfig> = {}) {
    this.config = { ...DEFAULT_CONFIG, ...config };
  }

  /**
   * Log a debug message
   */
  public debug(message: string, data?: unknown): void {
    this.log(LogLevel.DEBUG, message, data);
  }

  /**
   * Log an info message
   */
  public info(message: string, data?: unknown): void {
    this.log(LogLevel.INFO, message, data);
  }

  /**
   * Log a warning message
   */
  public warn(message: string, data?: unknown): void {
    this.log(LogLevel.WARN, message, data);
  }

  /**
   * Log an error message
   */
  public error(message: string, data?: unknown): void {
    this.log(LogLevel.ERROR, message, data);
  }

  /**
   * Get the log history
   */
  public getHistory(): Array<{
    level: LogLevel;
    message: string;
    data?: unknown;
    timestamp: Date;
  }> {
    return [...this.logHistory];
  }

  /**
   * Clear the log history
   */
  public clearHistory(): void {
    this.logHistory = [];
  }

  /**
   * Update logger configuration
   */
  public configure(config: Partial<LoggerConfig>): void {
    this.config = { ...this.config, ...config };
  }

  /**
   * Internal log method
   */
  private log(level: LogLevel, message: string, data?: unknown): void {
    // Skip if below minimum level
    if (level < this.config.minLevel) {
      return;
    }

    const timestamp = new Date();
    const logEntry = {
      level,
      message,
      data,
      timestamp,
    };

    // Add to history
    this.logHistory.push(logEntry);

    // Skip console output if disabled
    if (!this.config.enableConsole) {
      return;
    }

    // Format the log message
    let formattedMessage = '';

    // Add timestamp if enabled
    if (this.config.enableTimestamps) {
      formattedMessage += `[${timestamp.toISOString()}] `;
    }

    // Add prefix
    formattedMessage += `${this.config.prefix} `;

    // Add emoji based on level
    switch (level) {
      case LogLevel.DEBUG:
        formattedMessage += '🔍 ';
        break;
      case LogLevel.INFO:
        formattedMessage += 'ℹ️ ';
        break;
      case LogLevel.WARN:
        formattedMessage += '⚠️ ';
        break;
      case LogLevel.ERROR:
        formattedMessage += '❌ ';
        break;
    }

    // Add message
    formattedMessage += message;

    // Log to console based on level
    switch (level) {
      case LogLevel.DEBUG:
        console.debug(formattedMessage, data);
        break;
      case LogLevel.INFO:
        console.info(formattedMessage, data);
        break;
      case LogLevel.WARN:
        console.warn(formattedMessage, data);
        break;
      case LogLevel.ERROR:
        console.error(formattedMessage, data);
        break;
    }
  }
}

// Export a singleton instance
export const logger = new Logger();
