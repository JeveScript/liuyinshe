var lessonModel = require('./../models/lessonModel.js');

const lessonController = {
  update:async function(req, res, next) {
    let id = req.params.id;
    let date = req.body.date;
    let start_time = req.body.start_time;
    let end_time = req.body.end_time;

    if(!date || !start_time || !end_time) {
      res.json({code:0,messsage: '参数缺少'});
      return
    }

    try {
      await lessonModel.update(id, { date, start_time, end_time });
      res.json({code: 200, messsage: '修改成功'})
    } catch (err) {
      res.json({code:0,messsage: '服务器错误'});
    }
  },
}

module.exports = lessonController;