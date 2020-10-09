/* eslint-disable @typescript-eslint/no-var-requires */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['<rootDir>/src'],
  globals: {
    'ts-jest': {
      packageJson: 'package.json',
    },
  },
};
