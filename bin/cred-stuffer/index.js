/* eslint-disable */

const fs = require('fs');
const util = require('util');
const path = require('path');
const puppeteer = require('puppeteer');

const writeFile = util.promisify(fs.writeFile);

const userList = require('./user_list.json');
const badPasswords = require('./bad_passwords.json');

const results = {
  success: [],
  failure: 0
};

const LOGIN_URL = 'http://localhost:8080/login';

async function testLogin (email, password) {
  try {
    console.log(`Testing Password: ${password}`);
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    // Navigate to the login page
    console.log('Navigating to login...');
    await page.goto('http://localhost:8080/login');

    // Handle filling out the form & submitting
    console.log('Filling out form...');
    await page.type('#email', email);
    await page.type('#password', password);
    console.log('Submitting...');
    await page.click('[type="submit"]');

    // Validate success
    await page.waitFor(1000);
    if (page.url() === LOGIN_URL) {
      throw new Error('Failed to login');
    }

    results.success.push({
      email,
      password
    });
    console.log('Succeed!\n\n');
    await browser.close();
  } catch (err) {
    console.error(err);
    console.log('Failed :(\n\n');
    results.failure++;
  }
}

(async () => {
  for (const email of userList) {
    // loop through bad passwords for each email
    for (const password of badPasswords) {
      console.log(`Testing Email: ${email}`);
      await testLogin(email, password);
    }
  }

  console.log(`Success: ${results.success.length}`);
  console.log(`Failed: ${results.failure}`);
  await writeFile(path.join(__dirname, 'results.json'), JSON.stringify(results.success));
})();
