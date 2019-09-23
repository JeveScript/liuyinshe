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
      let user_phone = req.body.userPhone;
      let template_code = req.body.template_code;
      let noteJson = req.body.noteJson;
      console.log(noteJson);
      let content = req.body.content;
      var client = new Core({
        accessKeyId: accessKey,
        accessKeySecret: secretKey,
        endpoint: 'https://dysmsapi.aliyuncs.com',
        apiVersion: '2017-05-25'
      });
      console.log(content,noteJson,template_code)
      var params = {
        "RegionId": "cn-hangzhou",
        "PhoneNumbers": '18529409108,13413981938',
        "SignName": "留音社",
        "TemplateCode": template_code,
        "TemplateParam": JSON.stringify(noteJson)
      }
      var requestOption = {
        method: 'POST'
      };

      client.request('SendSms', params, requestOption).then(async (result) => {
       
        console.log(JSON.stringify(result));
        await noteModel.insert({user_id,content,type,template_code,state:0})
        return res.json({code:200,messsage:'发送成功'})

      },async function( ex) {
        console.log(ex);
        await noteModel.insert({user_id,content,type,template_code,state:1, result:JSON.stringify(ex.data)})
        return res.json({code:0, messsage: ex})
      })
      
    }catch(e){
        await noteModel.insert({user_id,content,type,template_code,state:1, result:JSON.stringify(e.data)})
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

    let datas = await noteModel.pagination(pageSize, currentPage, params, {
        column: filterColumn,
        startAt: startAt,
        endAt: endAt,
      }).leftJoin('user','user.id','note.user_id').column(
        'note.id',
        'note.content',
        'note.type',
        'note.state',
        'user.name',
        'user.phone',
        {'user_id':'user.id'}
      ).orderBy('id', 'desc');

      let total = await noteModel.count(params);
      console.log(total[0].total)
      let notePagination = {
        page_size:pageSize,
        current_page:currentPage,
        total:total[0].total
      }

      res.json({code:200, data:{datas, notePagination},messsage:'获取数据成功'})
    }catch(e){
      res.json({code:0,messsage:'获取数据失败'})
    }
  }
}




module.exports = noteController;