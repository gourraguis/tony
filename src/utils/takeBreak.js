const takeBreak = async (page)  => {
  const shouldTakeBreak = Math.random() > 0.9;

  if (shouldTakeBreak) {
    console.log("Taking a break...");
    const shortBreak = Math.floor(Math.random() * 10000) + 5000;
    const longBreak = Math.floor(Math.random() * 30000) + 20000;
    await page.waitForTimeout(Math.random() > 0.6 ? shortBreak : longBreak);
  }
}

module.exports = takeBreak;