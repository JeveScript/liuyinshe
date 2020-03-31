const  managerModel =  require('./../models/managerModel')
const authCode = require('./../utils/authCode.js');
const auth = {
  mustManager:async function(req, res, next){
    try{
      let token = req.headers.authorization;
      if(!token) {
        res.json({code:0 , message: '尚未登录，请先登陆'})
        return
      }
      let encode = authCode(token, 'DECODE').split('\t');
      let [phone, password, wuye, id] = encode;
      if(!phone || !password || !id) {
        res.json({ code: 0, message: '没有权限'});
        return
      }
      let judge = await managerModel.where({phone,password,id}).whereNull('isdeleted');
      if(judge.length <= 0) return res.json({ code: 0, message: '无此管理员'});
      next()
    }catch(e){
      res.json({ code: 0 , message: '服务器错误'})
    }
  }
}
module.exports = auth