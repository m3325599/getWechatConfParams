const path = require('path')
const expect = require('chai').expect;
const getWechatConfig = require('../index.js')

const testUrl = 'http://tongji.jiedaibao.com/weixin/config?current_page_url=http%3A%2F%2Finvestapi.jiedaibao.com.cn%2Finvest-article%2Fshare&app_id=wxc9a3c8c03a7fd87c'

describe('是否可以获取分享参数', function() {
  it('分享参数对应字段应该有值', async () => {
  	console.log( getWechatConfig)
  	const rst = await getWechatConfig(testUrl, true)
  	expect(rst).should.not.be.empty
  	// expect(rst).to.have.property('')
  });
});
