var courseModel = require('./../models/courseModel.js');

const courseController = {
  insert: async function(req,res,next) {
    let name = req.body.name;
    let description = req.body.description;
    let course_image = req.body.course_image;
    if(!name || !description || !course_image) {
      res.json({code:0,message: '参数缺少'});
      return
    }

    try {
      await courseModel.insert({ name, description,course_image});
      res.json({code:200,message: '添加成功'});
    } catch (err) {
      res.json({code:0,message: '服务器错误'});
    }
  },
  show: async function(req,res,next) {
      let id = req.params.id;

      try {
        let courses = await courseModel.show({id});
        let data = courses[0];
        res.json({code: 200, message: '获取成功', data: data})
      } catch (err) {
        res.json({code:0,message: '服务器错误'});
      }
  },
  update:async function(req, res, next) {
    let id = req.params.id;
    let name = req.body.name;
    let description = req.body.description;
    let course_image = req.body.course_image;
    if(!id || !name || !description || !course_image) {
      res.json({code:0,message: '参数缺少'});
      return
    }


    try {
      await courseModel.update(id, { name, description, course_image });
      res.json({code: 200, message: '修改成功'})
    } catch (err) {
      res.json({code:0,message: '服务器错误'});
    }
  },
  delete:async function(req, res, next) {
    let id = req.params.id;
    try {
      await courseModel.sortDelete(id);
      res.json({code: 200, message: '删除成功'})
    } catch (err) {
      res.json({code:0,message: '服务器错误'});
    }
  },
  index:async function(req, res, next ) {

    try {
      let courses = await courseModel.sortAll();
      res.json({code: 200, message: '获取成功', data: courses })
    } catch (err) {
      res.json({code:0,message: '服务器错误'});
    }
  }
}

module.exports = courseController;