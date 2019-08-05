var courseModel = require('./../models/courseModel.js');

const courseController = {
  insert: async function(req,res,next) {
    let name = req.body.name;
    let description = req.body.description;
    let teacher = req.body.teacher;
    let teacher_phone = req.body.teacher_phone;
    if(!name || !description || !teacher || !teacher_phone) {
      res.json({code:0,messsage: '参数缺少'});
      return
    }

    try {
      await courseModel.insert({ name, description, teacher, teacher_phone });
      res.json({code:200,messsage: '添加成功'});
    } catch (err) {
      res.json({code:0,messsage: '服务器错误'});
    }
  },
  show: async function(req,res,next) {
      let id = req.params.id;

      try {
        let courses = await courseModel.show({id});
        let data = courses[0];
        res.json({code: 200, messsage: '获取成功', data: data})
      } catch (err) {
        res.json({code:0,messsage: '服务器错误'});
      }
  },
  update:async function(req, res, next) {
    let id = req.params.id;
    let name = req.body.name;
    let description = req.body.description;
    let teacher = req.body.teacher;
    let teacher_phone = req.body.teacher_phone;

    if(!name || !description || !teacher || !teacher_phone) {
      res.json({code:0,messsage: '参数缺少'});
      return
    }


    try {
      await courseModel.update(id, { name, description, teacher, teacher_phone });
      res.json({code: 200, messsage: '修改成功'})
    } catch (err) {
      res.json({code:0,messsage: '服务器错误'});
    }
  },
  delete:async function(req, res, next) {
    let id = req.params.id;
    try {
      await courseModel.sortDelete(id);
      res.json({code: 200, messsage: '删除成功'})
    } catch (err) {
      res.json({code:0,messsage: '服务器错误'});
    }
  },
  index:async function(req, res, next ) {

    try {
      let courses = await courseModel.sortAll();
      res.json({code: 200, messsage: '获取成功', data: courses })
    } catch (err) {
      console.log(err)
      res.json({code:0,messsage: '服务器错误'});
    }
  }
}

module.exports = courseController;