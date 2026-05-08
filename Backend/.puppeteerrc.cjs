// .puppeteerrc.cjs
const { join } = require('path');

/**
 * @type {import("puppeteer").Configuration}
 */
module.exports = {
  // Changes the cache location for Puppeteer to a local folder
  // This ensures Render bundles the browser with your deployment
  cacheDirectory: join(__dirname, '.cache', 'puppeteer'),
};