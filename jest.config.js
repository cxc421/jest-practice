module.exports = {
  ...require('./test/jest-common'),
  projects: ['./test/jest.client.js', './test/jest.server.js'],
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
  collectCoverageFrom: ['**/src/**/*.js'],
}
