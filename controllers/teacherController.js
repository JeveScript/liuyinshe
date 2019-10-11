var teacherModel = require('./../models/teacherModel.js');
var classModel = require('./../models/classModel.js');
var { formatTime } = require('./../utils/formatDate.js');
const teacherController = {
    insert: async function( req, res, next){
        try{
            let teacher_name = req.body.teacher_name;
            let teacher_phone = req.body.teacher_phone;
            let teacher_intro = req.body.teacher_intro;
            let imageUrl = req.body.imageUrl;

            if(!teacher_intro || !teacher_name || !teacher_phone || !imageUrl ){
                return res.json({code:0, message: '参数缺少'})
            }
            let judge = await teacherModel.where({teacher_phone});
            if(judge.length >= 1){
                return res.json({code:0,message:'用户已存在'})
            }
            await teacherModel.insert({teacher_name,teacher_phone,teacher_intro,imageUrl})
            res.json({code:200, message:'添加成功'})
        }catch(e){
            res.json({code:0, message:'服务器错误'})

        }
    },
    update:async function(req, res, next) {
        try{
            let teadcher_id = req.params.teacher_id;
            let teacher_name = req.body.teacher_name;
            let teacher_phone = req.body.teacher_phone;
            let teacher_intro = req.body.teacher_intro;
            let imageUrl = req.body.imageUrl;
            if(! teadcher_id || !teacher_intro || !teacher_name || !teacher_phone || !imageUrl){
                return res.json({code:0, message: '参数缺少'})
            }
            await teacherModel.update(teadcher_id,{teacher_name,teacher_phone,teacher_intro,imageUrl})
            res.json({code:200, message:'编辑成功'})

        }catch(e){
            res.json({code:0, message:'服务器错误'})

        }
    },
    show: async function( req, res, next){
        try{    
            let id = req.params.teacher_id;
            let teacherData = await teacherModel.where({id});
            let classData = await classModel.where({teacher_id:id})
            classData.forEach(item => {
                if(item.created_at) item.created_at = formatTime(item.created_at);
                if(item.end_at) item.end_at = formatTime(item.end_at);
                if(item.start_at) item.start_at  = formatTime(item.start_at);
            })
            res.json({code:200, data:{teacherData:teacherData[0],classData}})
        }catch(e){
            res.json({code:0, message:'服务器错误'})

        }
    },
    index: async function(req, res, next){
        try{
            let teacherAll = await teacherModel.all().whereNull('isdeleted').select();
            res.json({code:200, data:teacherAll})
        }catch(e){
            res.json({code:0, message:'服务器错误'})
        }
    }
    
}

module.exports = teacherController;