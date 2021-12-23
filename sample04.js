const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({
    headless: false,  // 動作確認するためheadlessモードにしない
    slowMo: 500  // 動作確認しやすいようにpuppeteerの操作を遅延させる
  })
  const page = await browser.newPage()

  await page.goto('https://www.google.com/')
  await page.type('input[name=q]', 'スカイツリー', { delay: 100 })
  await page.click('input[type="submit"]')
  await page.waitForSelector('h3 a')
  await page.screenshot({ path: 'screenshot/sample1.png' })

  await browser.close()
})()