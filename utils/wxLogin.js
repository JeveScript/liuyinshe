const configs = require('./../config')
const axios = require('axios')
const APPID = configs.wx.AppID;
const SECRET = configs.wx.AppSecret;
const LOGINAPI = function(APPID,SECRET,JSCODE){
  return `https://api.weixin.qq.com/sns/jscode2session?appid=${APPID}&secret=${SECRET}&js_code=${JSCODE}&grant_type=authorization_code`
}
const wxLogin = { 
  getOpenId: function(code){
    let api_url = LOGINAPI(APPID,SECRET,code);
    return axios.get(api_url)
  }
  
}
module.exports = wxLogin;