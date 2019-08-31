const puppeteer = require('puppeteer');
var assert = require('assert');

it('should confirm that admin was successfully logged in', async () => {
  const browser = await puppeteer.launch({
  	headless: false,
  	slowMo: 25
  });
  const page = await browser.newPage();
  await page.goto('https://demoreader.textbookhub.com', 'networkidle2');

  await page.goto('https://demoreader.textbookhub.com/login', 'networkidle2');
  await page.type('#login', 'admin@evidentpoint.com');
  await page.type('#password', 'password');
  await page.evaluate((selector) => document.querySelector(selector).click(), '#login-btn');
  await page.waitForNavigation({waitUntil: 'networkidle2'});

  var pageTitleElement = await page.$('#page_title');
  var pageTitle = await page.evaluate(element => element.textContent, pageTitleElement);

  assert.equal(pageTitle, 'Dashboard');

  await browser.close();
});


