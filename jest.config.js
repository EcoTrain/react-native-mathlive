// Sync object
/** @type {import('@jest/types').Config.InitialOptions} */

const config = {
  preset: 'react-native',
  moduleFileExtensions: ['js', 'json', 'jsx', 'ts', 'tsx'],
  modulePathIgnorePatterns: ['<rootDir>/example/node_modules', '<rootDir>/lib/'],
  coverageReporters: ['json-summary', 'text', 'lcov'],
  coverageDirectory: '.coverage/',
  coverageThreshold: {
    global: {
      branches: 50,
      functions: 50,
      lines: 50,
      statements: 50,
    },
  },
  verbose: true, // Indicates whether each individual test should be reported during the run.
};

module.exports = config;
