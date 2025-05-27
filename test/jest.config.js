module.exports = {
  roots: ['<rootDir>'],
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: [
    '<rootDir>/setupTests.js',
    '<rootDir>/mocks/component-mocks.tsx'
  ],
  moduleNameMapper: {
    '^components/(.*)$': '<rootDir>/../src/components/$1',
    '^pages/(.*)$': '<rootDir>/../src/pages/$1',
    '^redux/(.*)$': '<rootDir>/../src/redux/$1',
    '^@react-icons/all-files/(.*)$': '<rootDir>/../node_modules/@react-icons/all-files/$1',
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy'
  },
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
    '^.+\\.(js|jsx)$': 'babel-jest'
  },
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
};
