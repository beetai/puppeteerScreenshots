const puppeteer = require('puppeteer');
var args = require('minimist')(process.argv.slice(2));
// var args = process.argv
console.log(args);
// console.log(args['name']);



(async () => {
  const browser = await puppeteer.launch({
//   	headless: false,
//   	slowMo: 250
  });
  const page = await browser.newPage();
//   debugger;
  await page.goto(args['url'], {
    waitUntil: 'networkidle2'
  });
  await page.screenshot({path: 'example.png'});
  await page.on('load', () => {
    debugger;
    console.log("tasukeru");
  });

  await page.on('close', () => {
    debugger;
    console.log("kms");
  });

//   await flipPage(page);
//   await page.click("#next-page-btn");
  for (var i = 0; i < 5; i++) {
//     await Promise.all([
//       page.waitForNavigation({waitUntil: 'networkidle2'}),
//       page.click("#next-page-btn")
//     ]);
//     await flipPage(page);
    await page.click("#next-page-btn");
    await page.screenshot({path: `example${i}.png`});
  }

  // setTimeout(function() { console.log("hello"), 5000})

  await browser.close();
})();

async function flipPage(page) {
//   debugger;
//   console.log("hello it's me");
//   await page.click("#next-page-btn");
//   await page.click("#next-page-btn");
//   await page.click("#next-page-btn");
  await Promise.all([
//     page.waitForNavigation({waitUntil: 'networkidle2'}),
    page.click("#next-page-btn")
  ]);
}