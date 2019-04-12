module.exports = {
  ...require('./test/jest-common'),
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
  projects: [
    './test/jest.client.js',
    './test/jest.server.js',
    './test/jest.lint.js',
  ],
}
