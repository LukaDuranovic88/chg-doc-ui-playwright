// @ts-check
require('dotenv').config();

const config = {
  testDir: './api',
  retries: 1,
  timeout: 30 * 1000,
  expect: {
    timeout: 5000,
  },

  reporter: 'html',

  projects: [
    {
      name: 'api',
      use: {},
    },
  ],
};

module.exports = config;