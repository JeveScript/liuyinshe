var leaveModel = require('./../models/leaveModel.js');
var userLessonModel = require('./../models/userLessonModel.js');
var lessonModel = require('./../models/lessonModel.js');
var paymentModel = require('./../models/paymentModel.js');
var userModel = require('./../models/userModel.js');
var { formatDate, formatMin } = require('./../utils/formatDate.js');

const leaveController = {
  index: async function(req, res, next) {
    let status = req.query.status;
    let pageSize = req.query.page_size || 20;
    let currentPage = req.query.current_page || 1;
    let params = {};
    if(status) params['leave.status'] = status;
    if(status === 0) params['leave.status'] = 0;

    try{
      let leaves = await leaveModel
        .pagination(pageSize, currentPage, params)
        .leftJoin('user', 'leave.user_id', 'user.id')
        .leftJoin('lesson', 'leave.lesson_id', 'lesson.id')
        .leftJoin('class', 'leave.class_id', 'class.id')
        .column('leave.id', 'leave.lesson_id', 'leave.class_id', 'leave.user_id', 'leave.status',
          'lesson.date', 'lesson.start_time', 'lesson.end_time', 'class.name', 
          {'user_name': 'user.name'}).orderBy('id', 'desc');

      // 格式化时间
      leaves.forEach(data => {
        data.date = data.date ? formatDate(data.date) : '-';
        data.start_time = data.start_time ? formatMin(data.start_time) : '-';
        data.end_time = data.end_time ? formatMin(data.end_time) : '-';
      });

      let leaveCount = await leaveModel.count(params);
      let total = leaveCount[0].total;
      res.json({code: 200, messsage: '获取成功', data: {
        datas: leaves,
        pagination: {
          total: total,
          current_page: currentPage,
          page_size: pageSize,
        }
      }})
    }catch(e) {
      console.log(e);
      res.json({code:0,messsage: '服务器错误'});
    }
  },
  update: async function(req,res,next) {
    let id = req.params.id;
    let status = req.body.status;
    let user_id = req.body.user_id;
    let lesson_id = req.body.lesson_id;
    try{

      let leaves = await leaveModel.show({ id });
      let leave = leaves[0];

      // 已补课
      if(leave.status === 2) {
        res.json({code:0,messsage: '该课时已补，状态不可修改'});
        return
      } 
      
      // 点名
      if(status === 2) {

        let userLessons = await userLessonModel.show({ user_id, lesson_id });
        let userLesson = userLessons[0];
        if(!userLesson) {
          res.json({code:0,messsage: '没匹配到课时'});
          return
        }

        if(userLesson.status === 1) {
          res.json({code:0,messsage: '该课时以上课，无法修改状态'});
          return
        }


        let lessons = await lessonModel.where({id: lesson_id})
        let lessonInfo = lessons[0];
        let total = - lessonInfo.price;
        await userLessonModel.update(userLesson.id, { status: 1, finish_at: new Date()});

        let payment = await paymentModel.insert({ 
            user_id: user_id, 
            status: 2, 
            total:  total, 
            remark:  '用户上课 lesson_id:' + lesson_id
          })

        await userModel
          .where({ id: user_id })
          .increment({ balance: total });
        // 修改状态
        await leaveModel.update(id, { status });
        res.json({code: 200, messsage: '点名成功'});
        return
      }else{
        // 修改状态
        await leaveModel.update(id, { status });
        res.json({code:200,messsage: '状态修改成功'});
      }
    }catch(e) {
      console.log(e)
      res.json({code:0,messsage: '服务器错误'});
    }
  }
}

module.exports = leaveController;
