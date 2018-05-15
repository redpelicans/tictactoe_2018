const chalk = require('chalk');
const rimraf = require('rimraf');
const os = require('os');
const path = require('path');

const DIR = path.join(os.tmpdir(), 'jest_puppeteer_global_setup');

async function tearDownPuppeteer() {
  console.log(chalk.green('Teardown Puppeteer')); // eslint-disable-line no-console
  await global._BROWSER_.close(); // eslint-disable-line
  rimraf.sync(DIR);
}

module.exports = async function() {
  // await Promise.all([tearDownPuppeteer()]);
};
