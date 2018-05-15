module.exports = {
  verbose: true,
  collectCoverageFrom: ['src/**/*.js', '!src/**/*.e2e.{js,jsx}'],
  testRegex: 'tests/.*\\.e2e\\.js$',
  globalSetup: './config/jest/setup.js',
  globalTeardown: './config/jest/teardown.js',
  testEnvironment: './config/jest/e2e_environment.js',
};
