import { defineConfig } from "cypress";
import { downloadFile } from 'cypress-downloadfile/lib/addPlugin';
import path from 'path';

const fs = require('fs-extra');


const writeBase64File = async (filePath: string, base64Data: string) => {
  return new Promise(async (resolve, reject) => {
    const buffer = Buffer.from(base64Data, 'base64');
    const fullPath = path.join(__dirname, '..', filePath);
    
    await fs.ensureFileSync(fullPath);
    await fs.writeFileSync(fullPath, buffer, (err) => {
      if (err) return reject(err);
      resolve(null);
    });
  });
};


export default defineConfig({
  // viewportWidth: 1280,
  // viewportHeight: 720,
  defaultCommandTimeout: 10000,
  execTimeout: 300000,
  pageLoadTimeout: 60000,
  requestTimeout: 5000,
  responseTimeout: 30000,
  // slowTestThreshold: 10000,
  taskTimeout: 300000,

  includeShadowDom: false,
  // justInTimeCompile: true,

  retries: {
    runMode: 2,
    openMode: 0,
  },
  reporter: "mochawesome",
  reporterOptions: {
    reportDir: "cypress/reports",
    overwrite: false,
    html: true,
    json: true,
  },
  e2e: {
    baseUrl: "https://ultimateqa.com/automation",
    specPattern: "cypress/e2e/**/*.cy.ts",
    fixturesFolder : "cypress/fixtures",
    supportFile: "cypress/support/e2e.ts",
    setupNodeEvents(on, config) {
      // implement node event listeners here
      // on('task', {downloadFile})
      on('task', {
        writeBase64File({ filePath, base64Data }) {
          return writeBase64File(filePath, base64Data);
        },
      });
      return config;
    },
    downloadsFolder: 'cypress/downloads',
  },
  env:{
    apiBaseUrl:'https://reqres.in/'
  }
});
