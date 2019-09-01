var leaveModel = require('./../models/leaveModel.js');
var userLessonModel = require('./../models/userLessonModel.js');
var lessonModel = require('./../models/lessonModel.js');
var paymentModel = require('./../models/paymentModel.js');
var userModel = require('./../models/userModel.js');

const leaveController = {
  update: async function(req,res,next) {
    let leave_id = req.params.id;
    let user_id = req.body.user_id;
    let lesson_id = req.body.lesson_id;
    let status = req.body.status;
    try{

      let leaves = await leaveModel.show({ id });
      let leave = leaves[0];

      // 已补课
      if(leave.status === 2) {
        res.json({code:0,messsage: '该课时已补，状态不可修改'});
        return
      } 
      // 修改状态
      await leaveModel.update(id, { status });
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
        await paymentModel.insert({ 
            user_id: user_id, 
            status: 2, 
            total:  total, 
            remark:  '用户上课 lesson_id:' + lesson_id
          })
        await userModel
          .where({ id: user_id })
          .increment({ balance: total })
        res.json({code: 200, messsage: '点名成功'})


      }
    }catch(e) {
      res.json({code:0,messsage: '服务器错误'});
    }
  }
}

module.exports = leaveController;
