/**
 * Created by ganyusheng on 2017/4/9.
 */

var config = require('../config')


exports.contants = function () {
  var env = process.env.NODE_ENV
  if (!env) {
    env = process.env.NODE_ENV = JSON.parse(config.dev.env.NODE_ENV)
  }

  var constant = {
    ACCESS_TOKEN_API: 'https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=APPID&secret=APPSECRET',
    OAUTH_ACCESS_TOKEN_API: 'https://api.weixin.qq.com/sns/oauth2/access_token?appid=APPID&secret=SECRET&code=CODE&grant_type=authorization_code',
    WECHAT_INFO_API: 'https://api.weixin.qq.com/sns/userinfo?access_token=ACCESS_TOKEN&openid=OPENID&lang=zh_CN',
    TOKEN: 'wechatOauth',
    APP_ID: 'wxbe276e2b5a3cf864',
    APP_SECRET: '7ad842735e8055571a6c8db86ea50ab3'
  }

  //生产环境配置
  if (env === 'production') {
    constant.TOKEN = ''
    constant.APP_ID = ''
    constant.APP_SECRET = ''
  }

  return constant
}

