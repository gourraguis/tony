const logger = require("../utils/logger");
const actionWaitTime = require("../utils/actionWaitTime");
const keyWaitTime = require("../utils/keyWaitTime");
const checkPics = require("./checkPics");
const fetchAge = require("./fetchAge");
const fetchDistance = require("./fetchDistance");

const ageLimit = 30;
const distanceLimit = 20;

const swipeOnMatch = async (page) => {
  logger("Starting new match");
  await page.waitForSelector('span[itemprop="age"]');

  // open detailed profile
  await page.waitForTimeout(actionWaitTime());
  await page.keyboard.press("ArrowUp", keyWaitTime());

  const age = await fetchAge(page);
  const distance = await fetchDistance(page);
  await checkPics(page);

  const isGoodMatch = age <= ageLimit && distance <= distanceLimit;
  await page.waitForTimeout(actionWaitTime());
  await page.keyboard.press(
    isGoodMatch ? "ArrowRight" : "ArrowLeft",
    keyWaitTime()
  );
  logger(`Swiped ${isGoodMatch ? "right" : "left"}`);

  // dismiss superlike popup
  await page.waitForTimeout(3000);
  const [dismissButton] = await page.$x("//button[contains(., 'No Thanks')]");
  if (dismissButton) {
    await dismissButton.click();
  }
  
  return isGoodMatch;
};

module.exports = swipeOnMatch;
