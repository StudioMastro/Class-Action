module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended'],
  overrides: [
    {
      files: ['*.js'],
      env: {
        node: true,
      },
      rules: {
        '@typescript-eslint/no-var-requires': 'off',
      },
      parserOptions: {
        sourceType: 'module',
        project: null, // Disable TypeScript checking for .js files
      },
    },
    {
      files: ['jest.config.ts'],
      env: {
        node: true,
      },
      parserOptions: {
        project: null, // Disable TypeScript checking for jest.config.ts
      },
    },
    {
      files: ['*.ts', '*.tsx'],
      parserOptions: {
        project: './tsconfig.json',
      },
    },
  ],
};
