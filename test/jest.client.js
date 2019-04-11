module.exports = {
  ...require('./jest-common'),
  displayName: 'dom',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: [require.resolve('./setup-test.js')],
}
