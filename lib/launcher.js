const {ChromeLauncher} = require('lighthouse/lighthouse-cli/chrome-launcher');
const port = 9222;

function chrome(headless = true) {
  const launcher = new ChromeLauncher({
    port: port,
    autoSelectChrome: true,
    additionalFlags: [
      '--disable-gpu',
      '--no-sandbox',
      '--remote-debugging-address=0.0.0.0',
      '--headless']
  });
  return launcher
    .run()
    .then(() => ({launcher, port}))
    .catch(error => {
      launcher.kill();
      console.error('Error at chrome', error);
      throw error;
    });
}

module.exports = {
  chrome: chrome
};

