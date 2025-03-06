import { logger } from './lemonSqueezy';

interface EnvVariable {
  key: string;
  required: boolean;
  default?: string;
  validate?: (value: string) => boolean;
}

const ENV_VARIABLES: EnvVariable[] = [
  {
    key: 'LEMONSQUEEZY_API_KEY',
    required: true,
    validate: (value) => value.length > 32,
  },
  {
    key: 'LEMONSQUEEZY_STORE_ID',
    required: true,
    validate: (value) => !isNaN(Number(value)),
  },
  {
    key: 'LEMONSQUEEZY_PRODUCT_ID',
    required: true,
    validate: (value) => !isNaN(Number(value)),
  },
  {
    key: 'LEMONSQUEEZY_CHECKOUT_URL',
    required: true,
    validate: (value) => value.startsWith('https://'),
  },
  {
    key: 'NODE_ENV',
    required: false,
    default: 'development',
    validate: (value) => ['development', 'production', 'test'].includes(value),
  },
];

function validateEnvVariables(): void {
  const errors: string[] = [];

  ENV_VARIABLES.forEach((variable) => {
    const value = process.env[variable.key] || variable.default;

    if (!value && variable.required) {
      errors.push(`Missing required environment variable: ${variable.key}`);
      return;
    }

    if (value && variable.validate && !variable.validate(value)) {
      errors.push(`Invalid value for environment variable: ${variable.key}`);
    }
  });

  if (errors.length > 0) {
    if (process.env.NODE_ENV === 'development') {
      logger.warn('Environment validation errors:', errors);
    } else {
      throw new Error(`Environment validation failed:\n${errors.join('\n')}`);
    }
  }
}

export function initializeEnv(): void {
  validateEnvVariables();

  if (process.env.NODE_ENV === 'development') {
    logger.debug(
      'Environment initialized with variables:',
      ENV_VARIABLES.reduce(
        (acc, { key }) => ({
          ...acc,
          [key]: key.includes('API_KEY') ? '***' : process.env[key],
        }),
        {},
      ),
    );
  }
}
