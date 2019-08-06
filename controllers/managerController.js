var managerModel = require('./../models/managerModel.js');

const managerController = {
  insert: async function(req,res,next) {
    let name = req.body.name;
    let password = req.body.password;
    let phone = req.body.phone;
    if(!name || !password || !phone) {
      res.json({code:0,messsage: '参数缺少'});
      return
    }

    try {
      await managerModel.insert({ name, password, phone});
      res.json({code:200,messsage: '添加成功'});
    } catch (err) {
      res.json({code:0,messsage: '服务器错误'});
    }
  },
  show: async function(req,res,next) {
    let id = req.params.id;

    try {
      let manages = await managerModel.show({id});
      let data = manages[0];
      res.json({code: 200, messsage: '获取成功', data: data})
    } catch (err) {
      res.json({code:0,messsage: '服务器错误'});
    }
  },
  update:async function(req, res, next) {
    let id = req.params.id;
    let name = req.body.name;
    let password = req.body.password;
    let phone = req.body.phone;
    if(!name || !password || !phone) {
      res.json({code:0,messsage: '参数缺少'});
      return
    }


    try {
      await managerModel.update(id, { name, password, phone});
      res.json({code: 200, messsage: '修改成功'})
    } catch (err) {
      res.json({code:0,messsage: '服务器错误'});
    }
  },
  delete:async function(req, res, next) {
    let id = req.params.id;
    try {
      await managerModel.sortDelete(id);
      res.json({code: 200, messsage: '删除成功'})
    } catch (err) {
      res.json({code:0,messsage: '服务器错误'});
    }
  },
  index:async function(req, res, next ) {

    try {
      let manages = await managerModel.sortAll();
      res.json({code: 200, messsage: '获取成功', data: manages})
    } catch (err) {
      console.log(err)
      res.json({code:0,messsage: '服务器错误'});
    }
  }
}

module.exports = managerController;