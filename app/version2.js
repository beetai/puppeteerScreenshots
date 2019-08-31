const puppeteer = require('puppeteer');
var args = require('minimist')(process.argv.slice(2));
var thumbnailFolderPath = 'images/';
var width = 600;
var height = 900;


/*  What is hardcoded:
 *   - window dimensions (width and height)
 *   - implementation of obtaining idref
 *   - thumbnail folder path
 */

(async () => {
  // Setting up the browser and the page
  const browser = await puppeteer.launch({
  	headless: false,
//   	slowMo: 250
  });
  const page = await browser.newPage();
  await page.setViewport({
    width: width,
    height: height
  });

  // Go to readium instance
  await page.goto(args['url'], {
    waitUntil: 'networkidle2'
  });

  // get cfi index info
  var pageData = await page.evaluate(() => {
    return ReadiumNGViewer.navigator.pub.readingOrder;
  });

  for (var i = 0; i < 5; i++) {
    // getting the idref through hardcoding: removing common substrings in href
    debugger;
    var href = pageData[i].href;
    var idref = href.substring(4, href.length - 6);
    await page.screenshot({path: `${thumbnailFolderPath + idref}.png`});
    await page.evaluate(async () => {
      await ReadiumNGViewer.navigator.nextScreen();
    });
  }

  await browser.close();
})();