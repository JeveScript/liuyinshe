var userModel = require('./../models/userModel.js');
var userClassModel = require('./../models/userClassModel.js');
var { formatDate, formatTime } = require('./../utils/formatDate.js');
var paymentModel = require('./../models/paymentModel.js');

const userController = {
  insert: async function(req,res,next) {
    let name = req.body.name;
    let phone = req.body.phone;
    let sex = req.body.sex;
    let birthday = req.body.birthday;
    let sms_name = req.body.sms_name;
    let sms_phone = req.body.sms_phone;
    if(!name || !phone || !sex || !birthday || !sms_name || !sms_phone) {
      res.json({code:0,messsage: '参数缺少'});
      return
    }
    birthday = new Date(birthday);
    try {
      await userModel.insert({ name, sex, phone, birthday, sms_name, sms_phone});
      res.json({code:200,messsage: '添加成功'});
    } catch (err) {
      res.json({code:0,messsage: '服务器错误'});
    }
  },
  show: async function(req,res,next) {
    let id = req.params.id;
    try {
      let users = await userModel.show({id});
      let klass = await userClassModel
        .where({ user_id: id })
        .leftJoin('class', 'user_class.class_id', 'class.id')
        .column('class.id','class.name', 'class.start_at', 'class.end_at')
      let payments = await paymentModel.where({ user_id: id });
      payments.forEach(data => data.created_at = formatTime(data.created_at));

      klass.forEach(data => {
        data.start_at = formatDate(data.start_at)
        data.end_at = formatDate(data.end_at)
      });

      let userInfo = users[0];
      userInfo.birthday = formatDate(userInfo.birthday);
      res.json({code: 200, messsage: '获取成功', data: {
        user: userInfo,
        class: klass,
        payments,
      }})
    } catch (err) {
      console.log(err)
      res.json({code:0,messsage: '服务器错误'});
    }
  },
  update: async function(req, res, next) {
    let id = req.params.id;
    let name = req.body.name;
    let phone = req.body.phone;
    let sex = req.body.sex;
    let birthday = req.body.birthday;
    let sms_name = req.body.sms_name;
    let sms_phone = req.body.sms_phone;
    console.log({ name, sex, phone, birthday, sms_name, sms_phone })
    if(!name || !phone || !sex || !birthday || !sms_name || !sms_phone) {
      res.json({code:0,messsage: '参数缺少'});
      return
    }

    try {
      birthday = new Date(birthday);
      await userModel.update(id, { name, sex, phone, birthday, sms_name, sms_phone });
      res.json({code: 200, messsage: '修改成功'})
    } catch (err) {
      console.log(err)
      res.json({code:0,messsage: '服务器错误'});
    }
  },
  index: async function(req, res, next ) {
    let name = req.query.name;
    let phone = req.query.phone;
    let pageSize = req.query.page_size || 20;
    let currentPage = req.query.current_page || 1;
    let params = {};
    if(name) params.name = name;
    if(phone) params.phone = phone;

    try {
      let users = await userModel
        .pagination(pageSize, currentPage, params)
        .orderBy('id', 'desc');
      let usersCount = await userModel.count(params);

      users.forEach(data => {
        data.birthday = formatDate(data.birthday)
      });

      let total = usersCount[0].total;
      res.json({code: 200, messsage: '获取成功', data: {
        datas: users,
        pagination: {
          total: total,
          current_page: currentPage,
          page_size: pageSize,
        }
      }})
    } catch (err) {
      res.json({code:0,messsage: '服务器错误'});
    }
  }
}

module.exports = userController;