(function () {
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

	function ajax (url, method) {
		if (window) {
			const getLocalHref = location.host
			const protocol = location.protocol
			const pageUrl = location.href
			const shareUrl = `http://tongji.jiedaibao.com/weixin/config?current_page_url=${pageUrl}&app_id=${map[getLocalHref]}`
		}
		try {
			if (!map[getLocalHref]) {
				throw '非白名单,不支持分享此域名'
			}
		} catch (e) {
			console.error(e)
		}

		let promiseObj = new Promise(function (resolve, rejext) {
			const http = new XMLHttpRequest();
			http.open(method || 'POST', url, true);
			http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
			http.send();

			http.onreadystatechange = function() {
			    if( http.readyState == 4 ) {
			    	if ( http.status == 200 ) {
			    		resolve(JSON.parse(http.responseText));
			    	} else {
			    		reject(xhr.status)
			    	}
			    }
			}
		})
		return promiseObj;
	}

	module.exports = function (configUrl) {
		if (configUrl) {
			return ajax(configUrl)
		} else {
			return ajax(shareUrl)
		}
	}

})()

