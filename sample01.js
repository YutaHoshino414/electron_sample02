const request = require('request')
const { JSDOM } = require('jsdom')
const moment = require('moment')
const fs = require('fs') 
const today = moment().format('YYYY-MM-DD')


const url = 'https://www.keiostore.co.jp/business/store_list.html'

request(url, callback)

function callback(e, response, body) {
  if (e) {
    console.error(e)
  }

  try {
    // 格納する変数
    let text = ''

    // リクエストで返ってきたDOM
    const dom = new JSDOM(body)

    // トピックリストのDOMを取得
    const topicsListItem = dom.window.document.querySelectorAll('.storeName')

    // querySelectorAllの返り値はNodeListなのでforEachで回す
    topicsListItem.forEach(element => {
      const item = element.children[0]
      console.log(item.href)
      text += `${item.text}, https://www.keiostore.co.jp/business/${item.href}\n`
    })
    
    //ファイルに書き込む
    fs.writeFileSync(`./data/${today}_001.txt`, text)
  } catch (e) {
    console.error(e)
  }
}