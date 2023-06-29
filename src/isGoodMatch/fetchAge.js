const logger = require("../utils/logger");

const fetchAge = async (page) => {
  await page.waitForSelector('span[class="Whs(nw) Typs(display-2-strong)"]');
  const ageRaw = await page.$eval(
    'span[class="Whs(nw) Typs(display-2-strong)"]',
    (el) => el.innerText
  );

  const age = parseInt(ageRaw);
  logger(`Match age is ${age}`);
  return age;
};

module.exports = fetchAge;
