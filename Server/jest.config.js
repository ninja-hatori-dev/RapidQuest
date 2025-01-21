/** @type {import('jest').Config} */
module.exports = {
    preset: 'ts-jest', // Use ts-jest for TypeScript support
    testEnvironment: 'node', // Use 'node' environment
    transform: {
      '^.+\\.ts$': 'ts-jest', // Transform TypeScript files using ts-jest
    },
    moduleFileExtensions: ['ts', 'js'], // File extensions Jest should process
    testMatch: ['**/__tests__/**/*.test.ts', '**/?(*.)+(spec|test).ts'], // Test file patterns
    transformIgnorePatterns: ['node_modules/(?!(some-esm-package)/)'], // Adjust for any ESM modules if needed
  };
  