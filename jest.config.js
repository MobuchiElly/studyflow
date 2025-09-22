module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  // This line tells Jest to look for test files within any '__tests__' directory
  // that is a subdirectory of 'src'.
  testMatch: ['<rootDir>/src/__tests__/**/*.test.ts'],
  // moduleNameMapper: {
  //   // This helps Jest resolve path aliases like '@/lib/...'
  //   '^@/(.*)$': '<rootDir>/src/$1',
  // },
  moduleNameMapper: {
    '^@/lib/(.*)$': '<rootDir>/src/lib/$1',
    '^@/components/(.*)$': '<rootDir>/src/components/$1',
    '^@/app/(.*)$': '<rootDir>/src/app/$1',
  },
};