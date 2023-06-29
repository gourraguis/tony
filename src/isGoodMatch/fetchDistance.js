const logger = require("../utils/logger");

const fetchDistance = async (page) => {
  const distanceArray = await page.evaluate(() =>
    Array.from(
      document.querySelectorAll(
        'div[class="Us(t) Va(m) D(ib) NetWidth(100%,20px) C($c-ds-text-secondary)"]'
      ),
      (element) => element.textContent
    )
  );

  const distance = parseInt(distanceArray[distanceArray.length - 1]);
  logger(`Match distance is ${distance}`);
  return distance;
};

module.exports = fetchDistance;
