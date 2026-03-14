require('dotenv').config();

// Mirrors VUE_APP_* variables from chg-sf-doc-service client/.env.*
// The Vue app always runs on https://localhost:8081 regardless of environment
// Backend services change based on which npm script is running (serve:local, serve:dev etc)
const environments = {
  local: {
    baseURL:        'https://localhost:8081',         // vue.config.js → port: 8081
    eggURL:         'http://localhost:8180',           // VUE_APP_EGG_URL (.env.local)
    dmsURL:         'http://localhost:8090',           // VUE_APP_DMS_URL (.env.local)
    docSupportURL:  'https://chg-doc-support-service.dev.platform.aws.chgit.com', // .env.local
    oktaURL:        'https://mychg.okta.com',
    oktaIssuer:     'https://chghealthcare.oktapreview.com/oauth2/auskmtjacfEi8ffM60h7',
  },
  feature: {
    baseURL:        'https://localhost:8081',          // still localhost, proxies to feature backend
    eggURL:         'https://chg-sf-doc-service.stage.platform.aws.chgit.com', // .env.feature
    dmsURL:         'https://chg-dms-service.dev.platform.aws.chgit.com',      // .env.feature
    docSupportURL:  'https://chg-doc-support-service.dev.platform.aws.chgit.com',
    oktaURL:        'https://mychg.okta.com',
    oktaIssuer:     'https://chghealthcare.oktapreview.com/oauth2/auskmtjacfEi8ffM60h7',
  },
  dev: {
    baseURL:        process.env.DEV_BASE_URL,
    eggURL:         process.env.DEV_EGG_URL,
    dmsURL:         'https://chg-dms-service.dev.platform.aws.chgit.com',
    docSupportURL:  'https://chg-doc-support-service.dev.platform.aws.chgit.com',
    oktaURL:        'https://mychg.okta.com',
    oktaIssuer:     'https://chghealthcare.oktapreview.com/oauth2/auskmtjacfEi8ffM60h7',
  },
  stage: {
    baseURL:        'https://chg-sf-doc-service.stage.platform.aws.chgit.com', // .env.stage EGG_URL
    eggURL:         'https://chg-sf-doc-service.stage.platform.aws.chgit.com',
    dmsURL:         'https://chg-dms-service.stage.platform.aws.chgit.com',    // .env.stage
    docSupportURL:  'https://chg-doc-support-service.stage.platform.aws.chgit.com',
    oktaURL:        'https://mychg.okta.com',
    oktaIssuer:     'https://chghealthcare.oktapreview.com/oauth2/auskmtjacfEi8ffM60h7',
  },
  prod: {
    baseURL:        process.env.PROD_BASE_URL,
    eggURL:         process.env.PROD_EGG_URL,
    dmsURL:         process.env.PROD_DMS_URL,
    salesforceURL:  'https://chg.my.salesforce.com/',
    oktaURL:        'https://chghealthcare.okta.com',
    oktaIssuer:     'https://chghealthcare.okta.com/oauth2/default',
  },
};

const env = process.env.TEST_ENV || 'local';

if (!environments[env]) {
  throw new Error(`Unknown environment: "${env}". Valid options: ${Object.keys(environments).join(', ')}`);
}

console.log(`🌐 Running tests against: ${env.toUpperCase()} (${environments[env].baseURL})`);

module.exports = environments[env];