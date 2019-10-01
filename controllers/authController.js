const managerModel = require('./../models/managerModel.js');
const authCode = require('./../utils/authCode.js');

const authController = {
  login: async function(req,res,next) {
    let phone = req.body.phone;
    let password = req.body.password;
    if(!phone || !password) {
      return res.json({ code: 0 , message: '参数缺少'})
    }
      let manages = await managerModel.where({ phone, password });
      let manage = manages[0];
    if(!manage) {
      res.json({ code: 0 , message: '账号密码错误'})
      return
    } else {
      let user_id = manage.id;
      let user_name = manage.name;
      let user_status = manage.status;
      let str = phone + '\t' + password + '\t' + user_id;
      let token = authCode(str, 'ENCODE');
      // let edcode = authCode(token, 'DECODE').split('\t');

      res.json({ code: 200 , message: '登录成功', data: {
        userInfo: { phone, user_id ,user_name,user_status},
        token: token,
      }})
    }
  }
}

module.exports = authController;