const path = require('path')
const cssMockPath = require.resolve('./test/style-mock.js')

module.exports = {
  testEnvironment: 'jsdom',
  moduleDirectories: [
    'node_modules',
    path.join(__dirname, 'src'),
    'shared',
    path.join(__dirname, 'test'),
  ],
  moduleNameMapper: {
    '\\.module\\.css$': 'identity-obj-proxy',
    '\\.css$': cssMockPath,
  },
  setupFilesAfterEnv: [require.resolve('./test/setup-test.js')],
}
