var paymentModel = require('./../models/paymentModel.js');
var userModel = require('./../models/userModel.js');
var { formatTime, formatDate } = require('./../utils/formatDate.js');

const paymentController = {
  insert: async function(req,res,next) {
    let status = req.body.status;
    let user_id = req.body.user_id;
    let total = req.body.total;
    let remark = req.body.remark || '';

    if(!user_id || !status || isNaN(total)) {
      res.json({code:0,messsage: '参数缺少'});
      return
    }

    try {
      await paymentModel.insert({ user_id, status, total, remark});
      // 更新用户金额
      await userModel
        .where({ id: user_id })
        .increment({ balance: total })
      res.json({code:200,messsage: '添加成功'});
    } catch (err) {
      res.json({code:0,messsage: '服务器错误'});
    }
  },
  index: async function(req, res, next ) {
    let status = req.query.status;
    let pageSize = req.query.page_size || 20;
    let currentPage = req.query.current_page || 1;
    let startAt = req.query.start_at;
    let endAt = req.query.end_at;
    let filterColumn = (startAt && endAt) ? 'payment.created_at' : '';
    let params = {};
    if(status) params.status = status;

    try {
      let payments = await paymentModel
        .pagination(pageSize, currentPage, params, {
          column: filterColumn,
          startAt: startAt,
          endAt: endAt,
        })
        // 联表查询，获取用户信息
        .leftJoin('user', 'payment.user_id', 'user.id')
        .column('payment.id', 'payment.total', 'payment.user_id',
          'payment.status', 'payment.remark', 
          'payment.created_at', 'user.name')
        .orderBy('id', 'desc');

      // 格式化时间
      payments.forEach(data => data.created_at = formatTime(data.created_at));
      let paymentsCount = await paymentModel.count(params,  {
        column: filterColumn,
        startAt: startAt,
        endAt: endAt,
      });
      let total = paymentsCount[0].total;
      res.json({code: 200, messsage: '获取成功', data: {
        datas: payments,
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
  accounts: async function(req, res, next){
    try{
      let newTime = new Date()
      let newDate = formatDate(newTime)
      let startDate = newTime.getFullYear() + '-' + (newTime.getMonth() + 1) + '-' + newTime.getDate()
      let data  =  await paymentModel.knex().whereBetween('payment.created_at',[`${startDate} 00:00`, `${newDate} 23:59`]).select();
      let income = 0;
      let expenditure = 0;
      data.forEach(item => {
        if(item.status == 1){
          income += item.total;
        }else if (item.status == 2){
          expenditure += item.total;
        }
      })
      income = Math.abs(income)
      expenditure = Math.abs(expenditure)
      res.json({code:200,data: {income, expenditure}});

    }catch(err){
      res.json({code:0,messsage: '服务器错误'});
    }
  }

}

module.exports = paymentController;