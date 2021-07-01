const LOGIN_URL = 'https://www.depop.com/login/';
const USERNAME = '';
const PASSWORD = '';

const puppeteer = require('puppeteer');

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

(async () => {
  const browser = await puppeteer.launch({
    //headless: false,
    defaultViewport: null,
  });
  const page = await browser.newPage();
  await page.goto(LOGIN_URL);

  const enteredUsername = await page.$eval('input[name="username"]', el => el.value);
  await page.type('input[name="username"]', USERNAME);
  const enteredPassword = await page.$eval('input[name="password"]', el => el.value);
  await page.type('input[name="password"]', PASSWORD);
  await page.screenshot({ path: 'creds.png' });

  await page.click('button[data-testid="login__cta"]');
  await sleep(3000);
  await page.screenshot({ path: 'logged_in.png' });
  await browser.close();
})();
