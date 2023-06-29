const puppeteer = require("puppeteer-extra");
// const puppeteerRaw = require("puppeteer");
// const iPhone = puppeteerRaw.KnownDevices["iPhone 13 Pro Max"];
const StealthPlugin = require("puppeteer-extra-plugin-stealth");
const AdblockerPlugin = require("puppeteer-extra-plugin-adblocker");
const isGoodMatch = require("./isGoodMatch/isGoodMatch");
const takeBreak = require("./utils/takeBreak");

puppeteer.use(AdblockerPlugin({ blockTrackers: true }));
puppeteer.use(StealthPlugin());

let swipesRight = 0;
let swipesLeft = 0;

puppeteer
  .launch({
    headless: false,
    userDataDir: "./userData",
    // args: ["--auto-open-devtools-for-tabs"],
  })
  .then(async (browser) => {
    try {
      const page = await browser.newPage();
      // await page.emulate(iPhone);
      await page.goto("https://tinder.com");

      while (true) {
        const swipedRight = await isGoodMatch(page);
        swipedRight ? swipesRight++ : swipesLeft++;
        takeBreak(page);

        console.log("------------------------------------");
        console.log(`Swiped right ${swipesRight} times`);
        console.log(`Swiped left ${swipesLeft} times`);
        console.log("------------------------------------");
      }
    } catch (err) {
      console.warn(err);
    }
  });
