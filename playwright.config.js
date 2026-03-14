// @ts-check
const { devices } = require('@playwright/test');
require('dotenv').config();
const environment = require('./config/environments');

const config = {
  testDir: './tests',
  retries: 1,
  // workers: 1,
  timeout: 30 * 1000,
  expect: {
    timeout: 5000
  },

  globalSetup: require.resolve('./global-setup'), // logs in once, saves session

  reporter: 'html',

  use: {
    baseURL: environment.baseURL,
    storageState: '.auth/session.json',
    ignoreHTTPSErrors: true, // fixes SSL cert error on localhost for all browsers
  },

  projects: [
    {
      name: 'chrome',
      use: {
        browserName: 'chromium',
        headless: false,
        viewport: { width: 720, height: 720 },
        screenshot: 'on',
        video: 'retain-on-failure',
        ignoreHTTPSErrors: true,  // fixed typo: was ignoreHttpError
        permissions: ['geolocation'],
        trace: 'on',
      },
    },
  ],
};

module.exports = config;