module.exports = {
  ...require('./jest-common'),
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: [require.resolve('./setup-test.js')],
  coverageThreshold: {
    global: {
      statements: 17,
      branches: 4,
      lines: 17,
      functions: 20,
    },
    './src/shared/utils.js': {
      statements: 100,
      branches: 80,
      lines: 100,
      functions: 100,
    },
  },
}
