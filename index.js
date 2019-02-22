(function () {
  'use strict'
  const map = {
    'feplanet.jdburl.com': 'wxb94031e4971ddfa7',
    'plg.jdburl.com': 'wxb94031e4971ddfa7',
    'share.jdburl.com': 'wxb94031e4971ddfa7',
    'feplanet.jiedaibao.com.cn': 'wx142281877b9889f4',
    'plg.jiedaibao.com.cn': 'wx142281877b9889f4',
    'share.jiedaibao.com.cn': 'wx142281877b9889f4',
    'www.jiedaibao.com': 'wxc9a3c8c03a7fd87c',
    'investapi.jiedaibao.com.cn': 'wxc9a3c8c03a7fd87c',
  }
  /**
   * 根据URI获取Host
   * @param  {uri} uri 完整的URI
   * @return {String}     返回Host
   */
  function getHost (uri) {
    if (!uri) {
      throw '没有分享链接，无法获取host'
    }
    const arr = uri.split('//')
    return arr[arr.length - 1].split('/')[0]
  }
  /**
   * 根据URL获取微信配置参数
   * @param  {String} url    分享URL
   * @param  {String} method http: or https:
   * @return {Object}        Promise
   */
  function ajax (url, method) {
    const protocol = location.protocol || 'http:'
    const pageUrl = decodeURIComponent(url || location.href)
    const shareUrl = `${protocol}//tongji.jiedaibao.com/weixin/config?current_page_url=${encodeURIComponent(pageUrl)}&app_id=${map[getHost(pageUrl)]}`
    
    try {
      if (!map[getHost(pageUrl)]) {
        throw '非白名单,不支持分享此域名'
      }
    } catch (e) {
      console.error(e)
    }

    let promiseObj = new Promise(function (resolve, reject) {
      const http = new XMLHttpRequest();
      http.open(method || 'POST', shareUrl, true);
      http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
      http.send();

      http.onreadystatechange = function() {
          if( http.readyState == 4 ) {
            if ( http.status == 200 ) {
              resolve(JSON.parse(http.responseText));
            } else {
              reject(http.status)
            }
          }
      }
    })
    return promiseObj;
  }
  
  module.exports = function (conf) {
    if (conf) {
      return ajax(conf.url, conf.method)
    } else {
      return ajax()
    }
  }

})()

