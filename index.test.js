const nock = require('nock');
const getWechatConfig = require('./index.js')

const testUrl = 'http%3A%2F%2Finvestapi.jiedaibao.com.cn%2Finvest-article%2Fshare'

// 接口返回数据示例
const rst = {
  "appId": "wxc9a3c8c03a7fd87c",
  "nonceStr": "kMpOJSHom80lR1Gu",
  "timestamp": 1550805435,
  "signature": "6513f6e50a15212a02ed7cc4d9a934dbf27c127f"
}

describe('getWechatConfig 的jest 测试', () => {
	it('分享参数对应字段应该有值', () => {
		nock('http://tongji.jiedaibao.com')
			.defaultReplyHeaders({ 'access-control-allow-origin': '*' })
      .get('/weixin/config?current_page_url=http%3A%2F%2Finvestapi.jiedaibao.com.cn%2Finvest-article%2Fshare&app_id=wxc9a3c8c03a7fd87c')
      .reply(200, rst);

		return getWechatConfig({
			url: testUrl,
			method: 'GET'
		}).then(data => {
			expect(data).toBeDefined()
	    expect(data.appId).toEqual('wxc9a3c8c03a7fd87c')
		})
	})
})
