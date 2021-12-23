const puppeteer = require('puppeteer');

(async () => {
    // ブラウザ起動
    const browser = await puppeteer.launch({ 
        headless: false,  // 動作確認するためheadlessモードにしない
        slowMo: 500  // 動作確認しやすいようにpuppeteerの操作を遅延させる
    });
    const page = await browser.newPage();
    // ヤフーのページを開く
    await page.goto('https://www.keiostore.co.jp/business/store_list.html');

    // ヤフーページ内でニュースの一覧を取得する Javascript を実行する
    const scrapingNews = await page.evaluate(() => {
        const news = [];
        const nodes = document.querySelectorAll('.storeName >a');
        nodes.forEach(node => {
            news.push(node.href);
        })
        return news;
    });
    console.log(scrapingNews);

    // ブラウザを閉じる
    await browser.close();
})();