module.exports = {
  verbose: true,
  collectCoverageFrom: ['src/**/*.js', '!src/**/*.test.{js,jsx}'],
  moduleNameMapper: {
    '.*\\.(css|less|styl|scss|sass)$': '<rootDir>/internals/cssModule.js',
    '.*\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/internals/image.js',
  },
  setupTestFrameworkScriptFile: '<rootDir>/jest-setup.js',
  testRegex: 'tests/.*\\.test\\.js$',
};
