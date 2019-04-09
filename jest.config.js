// const path = require('path')
// const cssMockPath = path.resolve(__dirname, './test/style-mock.js')
const cssMockPath = require.resolve('./test/style-mock.js')

module.exports = {
  // testEnvironment: 'jest-environment-node',
  testEnvironment: 'jest-environment-jsdom',
  moduleNameMapper: {
    '\\.css$': cssMockPath,
  },
}
