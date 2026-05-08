#!/usr/bin/env bash
# exit on error
set -o errexit

# Install standard Node modules
npm install

# Force Puppeteer to download Chrome into the local cache
npx puppeteer browsers install chrome

# Install Linux graphics libraries required by headless Chrome
# This is required for Render's native Node.js environments
apt-get update
apt-get install -y wget gnupg
apt-get install -y fonts-ipafont-gothic fonts-wqy-zenhei fonts-thai-tlwg fonts-kacst fonts-freefont-ttf libxss1 \
  --no-install-recommends