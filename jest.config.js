// Sync object
/** @type {import('@jest/types').Config.InitialOptions} */

const config = {
  preset: 'react-native',
  modulePathIgnorePatterns: ['<rootDir>/example/node_modules', '<rootDir>/lib/'],
  coverageReporters: ['json-summary', 'text', 'lcov'],
};

module.exports = config;
