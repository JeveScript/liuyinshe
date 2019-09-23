const Core = require('@alicloud/pop-core');
var config = require('../config');
var accessKey = config.aliyu.accessKey;
var secretKey = config.aliyu.secretKey
var { formatTime, formatDate } = require('../utils/formatDate.js');
var sms_logModel = require('../models/sms_logModel.js');

const sms_logController = {
  send:async function(req, res, next) {
    try{
      let user_id = req.body.user_id;
      let type = req.body.type;
      let user_phone = req.body.userPhone;
      let template_code = req.body.template_code;
      let sms_logJson = req.body.sms_logJson;
      let content = req.body.content;
      var client = new Core({
        accessKeyId: accessKey,
        accessKeySecret: secretKey,
        endpoint: 'https://dysmsapi.aliyuncs.com',
        apiVersion: '2017-05-25'
      });
      var params = {
        "RegionId": "cn-hangzhou",
        "PhoneNumbers": '18529409108,13413981938',
        "SignName": "留音社",
        "TemplateCode": template_code,
        "TemplateParam": JSON.stringify(sms_logJson)
      }
      var requestOption = {
        method: 'POST'
      };

      client.request('SendSms', params, requestOption).then(async (result) => {
       
        await sms_logModel.insert({user_id,content,type,template_code,state:0})
        return res.json({code:200,messsage:'发送成功'})

      },async function( ex) {
        await sms_logModel.insert({user_id,content,type,template_code,state:1, result:JSON.stringify(ex.data)})
        return res.json({code:0, messsage: ex})
      })
      
    }catch(e){
        await sms_logModel.insert({user_id,content,type,template_code,state:1, result:JSON.stringify(e.data)})
        return res.json({code:0, messsage: e})
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

    let datas = await sms_logModel.pagination(pageSize, currentPage, params, {
        column: filterColumn,
        startAt: startAt,
        endAt: endAt,
      }).leftJoin('user','user.id','sms_log.user_id').column(
        'sms_log.id',
        'sms_log.content',
        'sms_log.type',
        'sms_log.state',
        'user.name',
        'user.phone',
        {'user_id':'user.id'}
      ).orderBy('id', 'desc');

      let total = await sms_logModel.count(params);
      let sms_logPagination = {
        page_size:pageSize,
        current_page:currentPage,
        total:total[0].total
      }

      res.json({code:200, data:{datas, sms_logPagination},messsage:'获取数据成功'})
    }catch(e){
      res.json({code:0,messsage:'获取数据失败'})
    }
  }
}




module.exports = sms_logController;