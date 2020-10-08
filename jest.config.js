/* eslint-disable @typescript-eslint/no-var-requires */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  modulePathIgnorePatterns: ['dist/', 'scripts/'],
  globals: {
    'ts-jest': {
      packageJson: 'package.json',
    },
  },
};
