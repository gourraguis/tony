const logger = require("../utils/logger");
const actionWaitTime = require("../utils/actionWaitTime");
const keyWaitTime = require("../utils/keyWaitTime");

const picsToCheck = () => {
  return Math.floor(Math.random() * 4) + 1;
};

const checkPics = async (page) => {
  const picsNumber = picsToCheck()
  for(let i = 0; i < picsNumber; i++) {
    await page.waitForTimeout(actionWaitTime());
    await page.keyboard.press("Space", keyWaitTime());
  }
  logger(`Checked ${picsNumber} match pics`);
};

module.exports = checkPics;
