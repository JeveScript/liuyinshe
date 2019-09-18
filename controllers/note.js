const Core = require('@alicloud/pop-core');
var config = require('./../config');
var accessKey = config.aliyu.accessKey;
var secretKey = config.aliyu.secretKey
var { formatTime, formatDate } = require('./../utils/formatDate.js');
var noteModel = require('./../models/noteModel.js');

const noteController = {
  send:async function(req, res, next) {
    try{
      let user_id = req.body.user_id;
      let type = req.body.type;
      let user_name = req.body.userName;
      let user_phone = req.body.userPhone;
      let className = req.body.className;
      let date = formatDate(new Date(req.body.date));
      let time = (new Date(req.body.time).getHours() + ':' + new Date(req.body.time).getMinutes());
      let teacherPhone = req.body.teacherPhone;
      let TemplateCode = req.body.TemplateCode;
      let text = `亲爱的${user_name}同学，你的报名的${className}课程于${date}-${time}的课时请假申请已确认，请注意安排补课、调课时间，有问题可直接联系${user_phone}，谢谢。`;
      var client = new Core({
        accessKeyId: accessKey,
        accessKeySecret: secretKey,
        endpoint: 'https://dysmsapi.aliyuncs.com',
        apiVersion: '2017-05-25'
      });
      
      var params = {
        "RegionId": "cn-hangzhou",
        "PhoneNumbers": user_phone,
        "SignName": "留音",
        "TemplateCode": TemplateCode,
        "TemplateParam": JSON.stringify({name: user_name, className: className, date: date, time: time, phone: teacherPhone})
      }
      var requestOption = {
        method: 'POST'
      };

      client.request('SendSms', params, requestOption).then(async (result) => {
       
        console.log(JSON.stringify(result));
        await noteModel.insert({user_id,text,type,TemplateCode,state:0})
        res.json({code:200,messsage:'发送成功'})

      },async function( ex) {
        
        await noteModel.insert({user_id,text,type,TemplateCode,state:1})
        res.json({code:0, messsage: ex})
      })
      
    }catch(e){
        await noteModel.insert({user_id,text,type,TemplateCode,state:1})
        res.json({code:0, messsage: e})
    }
  },
  show:async function(req, res, next) {
    try{
    let pageSize = req.query.page_size || 20;
    let currentPage = req.query.current_page || 1;
    let startAt = req.query.start_at;
    let endAt = req.query.end_at;
    let filterColumn = (startAt && endAt) ? 'payment.created_at' : '';
    let params = {};

    let datas = await noteModel.pagination(pageSize, currentPage, params, {
        column: filterColumn,
        startAt: startAt,
        endAt: endAt,
      }).leftJoin('user','user.id','note.user_id').column(
        'note.id',
        'note.text',
        'note.type',
        'note.state',
        'user.name',
        'user.phone',
        {'user_id':'user.id'}
      ).orderBy('id', 'desc');

      let tabel = await noteModel.count(params);
      let notePagination = {
        page_size:pageSize,
        current_page:currentPage,
        tabel
      }

      res.json({code:200, data:{datas, notePagination},messsage:'获取数据成功'})
    }catch(e){
      res.json({code:0,messsage:'获取数据失败'})
    }
  }
}




module.exports = noteController;