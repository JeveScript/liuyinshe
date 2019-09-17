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
    let site = req.body.site;
    let school = req.body.school;
    let status = req.body.status  || 1;

    if(!name || !phone || !sex || !birthday || !sms_name || !sms_phone) {
      res.json({code:0,messsage: '参数缺少'});
      return
    }
    let judge = await userModel.where({phone});
      console.log(judge,phone);
      if(judge.length >= 1){
        console.log(123)
          return res.json({code:0,messsage:'用户已存在'})
      }
    birthday = new Date(birthday);
    try {
      await userModel.insert({ name, sex, phone, birthday, sms_name, sms_phone, status, school, site});
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
      let payments = await paymentModel.where({ user_id: id }).limit(200).orderBy('id', 'desc');;
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
    let status = req.body.status;
    let site = req.body.site;
    let school = req.body.school;
    if(!name || !phone || !sex || !birthday || !sms_name || !sms_phone || !status) {
      res.json({code:0,messsage: '参数缺少'});
      return
    }

    try {
      birthday = new Date(birthday);
      await userModel.update(id, { name, sex, phone, birthday, sms_name, sms_phone, status, site, school});
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
  },
  userS: async function(req, res, next){
    try{
      console.log(123)
      let userData = await userModel.knex().where('balance', '<',300).select();
      console.log(userData,123)
      res.json({code:200, messsage: '获取成功', data:userData});
    }catch(e){
      console.log(e)
      res.json({code:0,messsage: '服务器错误', });

    }
  }
}

module.exports = userController;