var paymentModel = require('./../models/paymentModel.js');
var userModel = require('./../models/userModel.js');
var { formatTime } = require('./../utils/formatDate.js');

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
      await userModel.knex()
        .where({ id: user_id })
        .increment({ balance: total })
      res.json({code:200,messsage: '添加成功'});
    } catch (err) {
      console.log(err)
      res.json({code:0,messsage: '服务器错误'});
    }
  },
  index:async function(req, res, next ) {

    try {
      let payments = await paymentModel.all();
      res.json({code: 200, messsage: '获取成功', data: payments})
    } catch (err) {
      res.json({code:0,messsage: '服务器错误'});
    }
  },
  index: async function(req, res, next ) {
    let status = req.query.status;
    let pageSize = req.query.page_size || 20;
    let currentPage = req.query.current_page || 1;
    let params = {};
    if(status) params.status = status;

    try {
      let payments = await paymentModel
        .pagination(pageSize, currentPage, params)
        // 联表查询，获取用户信息
        .leftJoin('user', 'payment.user_id', 'user.id')
        .column('payment.id', 'payment.total', 'payment.user_id', 'payment.created_at', 'user.name')
        // .whereBetween('created_at',['2019-08-02 00:00', '2019-08-04 23:59'])
        .orderBy('id', 'desc');

      // 格式化时间
      payments.forEach(data => data.created_at = formatTime(data.created_at));
      let paymentsCount = await paymentModel.count(params);
      let total = paymentsCount[0].total;
      res.json({code: 200, messsage: '获取成功', data: {
        total: total,
        current_page: currentPage,
        page_size: pageSize,
        data: payments,
      }})
    } catch (err) {
      res.json({code:0,messsage: '服务器错误'});
    }
  }

}

module.exports = paymentController;