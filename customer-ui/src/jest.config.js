module.exports = {
    preset: 'ts-jest',
    transform: {
      '^.+\\.(ts|tsx)?$': 'babel-jest',
      '^.+\\.(js|jsx)?$': 'babel-jest',
    },
    transformIgnorePatterns: [
      '/node_modules/(?!axios|other-es6-module)'
    ],
    moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx'],
    testEnvironment: 'jsdom',
    moduleNameMapper: {
        '^axios$': '<rootDir>/src/__mocks__/axios.js',
        '^./apiUtils/api$': '<rootDir>/src/__mocks__/api.ts',
      },
    testEnvironment: 'jsdom',
  };
  