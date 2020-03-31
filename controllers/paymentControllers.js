const paymentModel =  require('./../models/paymentModel')
const {newFormatTime,formatTime } = require('./../utils/formaDate.js');
const paymentControllers = {
  all:async function(req, res, next){
    try{
      let status = req.query.status;
      let teacher_id = req.query.teacher_id;
      let user_id = req.query.user_id;
      let pageSize = req.query.pageSize || 20;
      let currentPage = req.query.currentPage || 1;
      let thisYear = (new Date()).getFullYear() ;
      let thisMonth = (new Date()).getMonth() + 1;
      let today = new Date(thisYear,thisMonth,0);
      let todayA = today.getDate().toString();
      let newToday = todayA[1] ? todayA : '0' + todayA
      let start = thisYear + '-' + thisMonth + '-' + '01';
      let end =thisYear + '-' + thisMonth + '-' + newToday;
      let startAt = req.query.start_at || start;
      let endAt = req.query.end_at || end;
      let data = {}
      if(status) data['payment.status'] = status;
      if(teacher_id) data['payment.teacher_id'] = teacher_id;
      if(user_id) data['payment.user_id'] = user_id;
      let offset = (currentPage - 1) * pageSize;
      let paymentArr 
      let total = await paymentModel
      .where(data)
      .count('id as total')
      .whereBetween('payment.created_at',[`${startAt} 00:00`, `${endAt} 23:59`])
      let paymentAll
      if(startAt && endAt){ 
        paymentArr = await paymentModel
        .where(data)
        .offset(offset)
        .limit(pageSize)
        .whereBetween('payment.created_at',[`${startAt} 00:00`, `${endAt} 23:59`])
        .leftJoin('manager','payment.manager_id','manager.id')
        .leftJoin('user','payment.user_id','user.id')
        .leftJoin('teacher','payment.teacher_id','teacher.id')
        .select('payment.*',{'manager_name':'manager.name'},{'user_name':'user.name'},{teacher_name:'teacher.name'},{manager_name:'manager.name'})
        .orderBy('payment.created_at')
        paymentAll = await paymentModel.where(data).whereBetween('payment.created_at',[`${startAt} 00:00`, `${endAt} 23:59`])
      }
      else {
        paymentArr = await paymentModel
        .where(data)
        .offset(offset)
        .limit(pageSize)
        .leftJoin('manager','payment.manager_id','manager.id')
        .leftJoin('user','payment.user_id','user.id')
        .leftJoin('teacher','payment.teacher_id','teacher.id')
        .select('payment.*',{'manager_name':'manager.name'},{'user_name':'user.name'},{teacher_name:'teacher.name'},{manager_name:'manager.name'})
        .orderBy('payment.created_at')
        paymentAll = await paymentModel.where(data)
      }
      let income = 0;
      let expend = 0;
      paymentAll.forEach(item => {
        if(item.status == 1) expend += item.total 
        if(item.status == 2) income += item.total 

      })
      income = income.toFixed(2)
      expend = expend.toFixed(2)
      paymentArr.forEach(item => {
        item.created_at = formatTime(item.created_at)
      })
      res.json({code:200,data:{paymentArr,total:total[0].total,income,expend}})
    }catch(e){
      res.json({code:0,message:'服务器错误'})

    }
  }
}
module.exports = paymentControllers;