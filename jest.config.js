// Sync object
/** @type {import('@jest/types').Config.InitialOptions} */

const config = {
  preset: 'react-native',
  moduleFileExtensions: ['js', 'json', 'jsx', 'ts', 'tsx'],
  modulePathIgnorePatterns: ['<rootDir>/example/node_modules', '<rootDir>/lib/'],
  moduleNameMapper: {
    '\\.(svg|png|jpg|jpeg|webp|ttf|woff|woff2|mp4|webm)$': 'jest-transform-stub',
  },
  coverageReporters: ['json-summary', 'lcov', 'text'],
  coverageDirectory: 'coverage/',
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
