// const path = require('path')
// const cssMockPath = path.resolve(__dirname, './test/style-mock.js')
const cssMockPath = require.resolve('./test/style-mock.js')

module.exports = {
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    '\\.module\\.css$': 'identity-obj-proxy',
    '\\.css$': cssMockPath,
  },
}
