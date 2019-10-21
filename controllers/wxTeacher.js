const weixinModel = require('./../models//wexinModel.js');
const authCode = require('./../utils/authCode.js');
const userModel = require('./../models/userModel.js');
const userClassModel = require('./../models/userClassModel.js');
const userLessonModel = require('./../models/userLessonModel.js');
const leaveModel = require('./../models/leaveModel.js');
var { formatDate, formatMin } = require('./../utils/formatDate.js');

const miniController = {
  teacher_log: async function(req, res, next){
      try{
        let code = req.body.code;
        res.json({code:200, data:"获取成功"})
      }catch(e){
        res.json({code:200, data:"失败"})

      }
  }
}

module.exports = miniController;