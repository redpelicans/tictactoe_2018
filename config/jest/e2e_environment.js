const chalk = require('chalk');
const serve = require('serve');
const NodeEnvironment = require('jest-environment-node');
const puppeteer = require('puppeteer');
const fs = require('fs');
const os = require('os');
const path = require('path');

/* eslint no-useless-constructor : 0 */

const DIR = path.join(os.tmpdir(), 'jest_puppeteer_global_setup');

function launchE2EServer() {
  console.log(chalk.green('Setup E2E servers'));
  const port = 5000;
  const server = serve(path.join(__dirname, '../../build'), { silent: true, local: true, port });
  const url = `http://localhost:${port}`;

  return {
    stop: () => server.stop(),
    url,
  };
}

class E2EEnvironment extends NodeEnvironment {
  constructor(config) {
    super(config);
  }

  async setup() {
    console.log(chalk.yellow('Setup Test Environment.'));
    await super.setup();
    const wsEndpoint = fs.readFileSync(path.join(DIR, 'wsEndpoint'), 'utf8');
    if (!wsEndpoint) {
      throw new Error('wsEndpoint not found');
    }
    this.global._E2ESERVER_ = launchE2EServer();
    this.global._BROWSER_ = await puppeteer.connect({ slowMo: 200, browserWSEndpoint: wsEndpoint });
  }

  async teardown() {
    console.log(chalk.yellow('Teardown Test Environment.'));
    await super.teardown();
    this.global._E2ESERVER_.stop();
  }

  runScript(script) {
    return super.runScript(script);
  }
}

module.exports = E2EEnvironment;
