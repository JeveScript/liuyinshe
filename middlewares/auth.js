var authCode = require('./../utils/authCode.js');
var managerModel = require('./../models/managerModel.js');

var authMiddleware = {
  mustManager:async function(req,res,next) {
    let token = req.headers.authorization;
    if(!token) {
      res.json({code:0 , message: '必须登录'})
      return
    }
    let encode = authCode(token, 'DECODE').split('\t');
    let [phone, password, id] = encode;
    if(!phone || !password || !id) {
      res.json({ code: 0, message: '没有权限'});
      return
    }

    try{
      let managers = await managerModel
        .where({ phone, password, id})
        .whereNull('isdeleted');
      let manager = managers[0];

      if(!manager) {
        res.json({ code:0, message: '管理员无效'});
        return
      }
      res.locals.manager_id = manager.id;
      next();
    } catch (err) {
      res.json({ code: 0 , message: '服务器错误'})
    } 
  }
}
module.exports = authMiddleware;
