const chalk = require('chalk');
const puppeteer = require('puppeteer');
const fs = require('fs');
const mkdirp = require('mkdirp');
const os = require('os');
const path = require('path');
const DIR = path.join(os.tmpdir(), 'jest_puppeteer_global_setup');

async function setupPuppeteer() {
  console.log(chalk.green('Setup Puppeteer'));
  const browser = await puppeteer.launch({
    headless: false, // to browse visual
    args: ['--lang=fr-fr'],
  });
  global._BROWSER_ = browser;
  mkdirp.sync(DIR);
  fs.writeFileSync(path.join(DIR, 'wsEndpoint'), browser.wsEndpoint());
}

module.exports = async function setup() {
  await Promise.all([setupPuppeteer()]);
};
