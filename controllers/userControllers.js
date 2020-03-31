const  userModel =  require('./../models/userModel')
const  managerModel =  require('./../models/managerModel')
const  paymentModel =  require('./../models/paymentModel')
const  leaveModel =  require('./../models/leaveModel')
const  wx = require('./../utils/wxLogin')


const {newFormatTime,formatDate,formatTime} = require('./../utils/formaDate.js');

const userControllers = {
  add:async function(req, res, next){
    try{
      let name = req.body.name;
      let phone = req.body.phone;
      let sex = req.body.sex;
      let birthday = req.body.birthday;
      let sms_name = req.body.sms_name;
      let sms_phone = req.body.sms_phone;
      let status = 1;
      let site = req.body.site;
      let school = req.body.school;
      if(!name || !phone || !sex || !birthday || !sms_name || !sms_phone){
        return res.json({code:0,message:'数据不足，请重新填写'})
      }
      let judge = await userModel.where({phone, name, sex});
      if(judge.length > 0){
        return res.json({code:0, message:'用户已存在，请重新输入'})
      }
      await userModel.insert({name,phone,sex,birthday,sms_name,sms_phone,status,site,school,created_at:newFormatTime(),integral:0,balance:0})
      res.json({code:200,message:'欢迎你，' + name + '同学'})
    }catch(e){
      return res.json({code:0,message:'服务器错误'})
    }
  },
  all:async function(req, res, next) {
    try{
      let pageSize = req.query.pageSize || 20;
      let currentPage = req.query.currentPage || 1;
      let phone = req.query.phone;
      let seek = {
      };
      if(phone) seek.phone = phone
      let offset = (currentPage - 1) * pageSize;
      let data;
      data = await userModel.knex().where(seek)
      .offset(offset)
      .limit(pageSize)
      .select('id','name','phone','sex','birthday','balance','sms_name','sms_phone','status')
      let total = await userModel.knex().where(seek)
      .count('id as total');
      data.forEach(item => item.birthday = formatDate(item.birthday))
      res.json({code:200,data:{data,total}})
    }catch(e){
      res.json({code:0,message:'服务器错误'})
    }
  },
  paymentUserAll: async function(req, res, next) {
    try{
      let data = await userModel.all().select('id','name','phone')
      res.json({code:200, data})
    }catch(e){
      res.json({code:0,message:'服务器错误'})
    }
  },
  show:async function(req, res, next){
    try{
      let id = req.params.id;
      let user = await userModel.where({id}).select();
      let data = user[0]
      if(data.birthday)  data.birthday = formatDate(data.birthday)
      if(data.created_at)data.created_at = formatTime(data.created_at)
      let paymentArr = await paymentModel.where({user_id:id}).limit(20).orderBy('id', 'desc')
      paymentArr.forEach(item => {
        item.created_at = formatTime(item.created_at)
      })
      res.json({code:200,data:{data, paymentArr}})
    }catch(e){
      return res.json({code:0,message:'服务器错误'})
    }
  },
  update:async function(req, res, next){
    try{;
      let id = req.body.id;
      let name = req.body.name;
      let phone = req.body.phone;
      let sex = req.body.sex;
      let birthday = req.body.birthday;
      let sms_name = req.body.sms_name;
      let sms_phone = req.body.sms_phone;
      let status = 1;
      let site = req.body.site;
      let school = req.body.school;
      if(!name || !phone || !sex || !birthday || !sms_name || !sms_phone){
        return res.json({code:0,message:'数据不足，请重新填写'})
      }
      await userModel.update(id,{name,phone,sex,birthday,sms_name,sms_phone,status,site,school})
      res.json({code:200,message:'更新成功'})
    }catch(e){
      return res.json({code:0,message:'服务器错误'})
    }
  },
  vacation:async function(req, res, next){
    try{
      let id = req.params.id;
      let status = req.query.status;
      if(!id){
        return res.json({code:0,message:'数据不足，请重新选择'})
      }
      let user = await userModel.where({id});
      if(user.length <= 0){
        return res.json({code:0,message:'无此用户，请重新选择'})
      }
      await userModel.update(id,{status})
      res.json({code:200,message: '申请成功'})
    }catch(e){
      res.json({code:0,message:'服务器错误'})
    }
  },
  recharge:async function(req, res, next){
    try{
      let id = req.body.id;
      let total = req.body.total;
      let managerId = req.body.managerId;
      let description = req.body.description;
      if(!id || isNaN(total) || !managerId || !description){
        return res.json({code:0,message:'数据不足，请重新填写'})
      }
      let user = await userModel.where({id});
      let manager = await managerModel.where({id:managerId});
      if(user.length <= 0 || manager.length <= 0){
        return res.json({code:0,message:'数据出错，请重新登陆'})
      }
      await userModel.where({id}).increment('balance',total)
      await paymentModel.insert({user_id:id,total,description,created_at:newFormatTime(),manager_id:managerId, status:2})
      res.json({code:200,message:'充值成功'})
    }catch(e){
      res.json({code:0,message:'服务器错误'})
    }
  },
  expense:async function(req, res, next){
    try{
      let id = req.body.id;
      let total = req.body.total;
      let managerId = req.body.managerId;
      let description = req.body.description;
      if(!id || isNaN(total) || !managerId || !description){
        return res.json({code:0,message:'数据不足，请重新填写'})
      }
      let user = await userModel.where({id});
      let manager = await managerModel.where({id:managerId});
      if(user.length <= 0 || manager.length <= 0){
        return res.json({code:0,message:'数据出错，请重新登陆'})
      }
      await userModel.where({id}).decrement('balance',total)
      await paymentModel.insert({user_id:id,total,description,created_at:newFormatTime(),manager_id:managerId, status:1})
      res.json({code:200,message:'消费成功'})
    }catch(e){
      res.json({code:0,message:'服务器错误'})
    }
  },
  integralAdd:async function(req, res, next){
    try{
      let id = req.body.id;
      let index = req.body.index;
      if(!id || isNaN(index)){
        return res.json({code:0,message:'数据不足，请重新填写'})
      }
      await userModel.where({id}).increment('integral',index)
      res.json({code:200,message:'积分添加成功'})
    }catch(e){
      res.json({code:0,message:'服务器错误'})
    }
  },
  integralReduce:async function(req, res, next){
    try{
      let id = req.body.id;
      let index = req.body.index;
      if(!id || isNaN(index)){
        return res.json({code:0,message:'数据不足，请重新填写'})
      }
      await userModel.where({id}).decrement('integral',index)
      res.json({code:200,message:'积分减少成功'})
    }catch(e){
      res.json({code:0,message:'服务器错误'})
    }
  },
  leave:async function(req, res, next){
    try{
      let user_id = req.body.user_id;
      let lesson_id = req.body.lesson_id;
      if(!user_id || !lesson_id){
        return res.json({code:0,message:'数据不足，请重新选择'})
      }
      await leaveModel.insert({user_id,lesson_id});
      res.json({code:200,message:'申请已提交'})
    }catch(e){
      res.json({code:0,message:'服务器错误'})
    }
  },
  wxLogin: async function(req, res, next) {
    try{
      const phone = req.body.phone;
      const name = req.body.name;
      const code = req.body.code;
      if(!phone || !name || !code) {
        return res.json({code:0,message:'数据不足，请重新选择'})
      }
      let userData = await userModel.where({phone, name})
      let open_idData = await wx.getOpenId(code);
      const open_id = open_idData.data.openid
      if(userData.length <= 0) return res.json({code:0,message:'无此用户,请重新填写'})
      if(userData[0].open_id){
        if(userData[0].open_id != open_id)return res.json({code:0,message:'用户登陆错误,请重新登陆'})
        res.json({code:200,message: "登陆成功", data: {user_id:userData[0].id, user_name:userData[0].name}})
      }else{
        await userModel.update(userData[0].id, {open_id})
        res.json({code:200,message: "初次登陆成功", data: {user_id:userData[0].id, user_name:userData[0].name}})
      }
    }catch(e){
      res.json({code:0,message:'服务器错误'})
    }
  },
  wxQuit: async function(req, res, next){
    try{
      const code = req.body.code;
      const user_id = req.body.user_id;
      if(!code || !user_id)  return res.json({code:0,message:'数据不足，请重新选择'})
      const open_idData = await wx.getOpenId(code);
      const open_id = open_idData.data.openid
      const userData = await userModel.where({id:user_id,open_id})
      if(userData.length <= 0) return res.json({code:0,message:'无此用户，请重新操作'})
      await userModel.where({id:user_id,open_id}).update({open_id: null})
      res.json({code:200,message:'退出成功'})
    }catch(e){
      res.json({code:0,message:'服务器错误'})
    }
  }
}
module.exports = userControllers;