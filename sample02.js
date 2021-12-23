const axios = require('axios')
const { JSDOM } = require('jsdom')


axios.get('https://www.keiostore.co.jp/business/store_list.html')
  .then(function(response){
    console.log(response.status);
    const dom = new JSDOM(response.data)
    dom.window.document.querySelectorAll('.storeName').forEach(element =>{
      const a_tag = element.children[0]
      const links = {
          name: a_tag.text,
          url: `https://www.keiostore.co.jp/business/${a_tag.href}`
      }
      console.log(links);
    })
  })
  .catch(function(error){
      console.log(error);
  })