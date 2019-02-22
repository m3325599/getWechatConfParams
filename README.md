[![Build Status](https://travis-ci.org/usherwong/getWechatConfParams.svg?branch=master)](https://travis-ci.org/usherwong/getWechatConfParams)
# 微信分享获取公共参数

## 功能

1. 在微信分享之前要先获取配置信息
2. 拿到配置信息后才能正常使用微信分享
3. 分享功能有白名单域名限制，只有白名单内的域名才可以使用分享功能，否则会抛出异常提示。

## 使用指南

1. 引入此lib,会返回匿名函数，此函数会返回为Promise对象
2. 通过把类库引用赋值给window.getWechatConfig方法，window.getWechatConfig().then(function (rst) { //这里可以获取到的rst就是分享公共参数,之后便可以正常定制分享标题，图片等 }).catch(function (e) { // ** })
3. window.getWechatConfig(params), params可配置，也可为空，如果为空，默认分享链接为当前分享链接

