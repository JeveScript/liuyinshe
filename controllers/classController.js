var classModel = require('./../models/classModel.js');
var lessonModel = require('./../models/lessonModel.js');
var { formatDate, formatTime } = require('./../utils/formatDate.js');
var userClassModel = require('./../models/userClassModel.js');
var userLessonModel = require('./../models/userLessonModel.js');

const classController = {
  insert: async function(req,res,next) {
    let name = req.body.name;
    let description = req.body.description || '';
    let course_id = req.body.course_id;
    let price = req.body.price;
    let lesson_count = Number(req.body.lesson_count);
    let start_at = req.body.start_at;
    let end_at = req.body.end_at;
    let teacher_id = req.body.teacher_id;
    if(!name || !course_id || isNaN(price) || !lesson_count || !start_at || !end_at || !teacher_id) {
      res.json({code:0,message: '参数缺少'});
      return
    }

    try {
      let classIdArr = await classModel.insert({ name, description, course_id, price, lesson_count, start_at, end_at, teacher_id});
      let class_id = classIdArr[0];
      let lessonPrice = price/lesson_count;
      let lessons = new Array(lesson_count).fill({ class_id, price: lessonPrice })
      await lessonModel.insert(lessons);
      res.json({code:200,message: '添加成功', data: { class_id }});
    } catch (err) {
      res.json({code:0,message: '服务器错误'});
    }
  },
  update:async function(req, res, next) {
    let id = req.params.id;
    let name = req.body.name;
    let description = req.body.description || '';
    let course_id = req.body.course_id;
    let start_at = req.body.start_at;
    let end_at = req.body.end_at;
    let status = req.body.status;
    let teacher_id = req.body.teacher_id;
    if(!name || !course_id || !start_at || !end_at || !teacher_id) {
      res.json({code:0,message: '参数缺少'});
      return
    }

    try {
      await classModel.update(id, { name, description, course_id, status, start_at, end_at, teacher_id});
      res.json({code: 200, message: '修改成功'})
    } catch (err) {
      res.json({code:0,message: '服务器错误'});
    }
  },
  index: async function(req, res, next ) {
    let status = req.query.status;
    let name = req.query.name;
    let course_id = req.query.course_id;

    let pageSize = req.query.page_size || 20;
    let currentPage = req.query.current_page || 1;
    let startAt = req.query.start_at;
    let endAt = req.query.end_at;
    let filterColumn = (startAt && endAt) ? 'class.end_at' : '';
    let params = {};
    if(status) params['class.status'] = status;
    if(name) params['class.name'] = name;
    if(course_id) params.course_id = course_id;


    try {
      let classes = await classModel
        .pagination(pageSize, currentPage, params, {
          column: filterColumn,
          startAt: startAt,
          endAt: endAt,
        })
        // 联表查询，获取用户信息
        .leftJoin('course', 'class.course_id', 'course.id')
        .column('class.id', 'class.name', 'class.course_id', 'class.price', 'class.status',
          'class.start_at', 'class.end_at',
          { course_name: 'course.name' })
        .orderBy('id', 'desc');

      // 格式化时间
      classes.forEach(data => {
        data.start_at = formatDate(data.start_at)
        data.end_at = formatDate(data.end_at)
      });
      let classesCount = await classModel.count(params,  {
        column: filterColumn,
        startAt: startAt,
        endAt: endAt,
      });
      let total = classesCount[0].total;
      res.json({code: 200, message: '获取成功', data: {
        datas: classes,
        pagination: {
          total: total,
          current_page: currentPage,
          page_size: pageSize,
        }
      }})
    } catch (err) {
      res.json({code:0,message: '服务器错误'});
    }
  },
  show: async function(req, res, next) {
    let id = req.params.id;

    try {
      let classes = await classModel.show({ 'class.id': id})
        .leftJoin('course', 'class.course_id', 'course.id')
        .leftJoin('teacher', 'teacher.id', 'class.teacher_id',)
        .column('class.id', 'class.name', 'class.course_id', 'class.price', 'class.status', 'class.teacher_id',
          'class.start_at', 'class.end_at', 'class.description',
          { course_name: 'course.name' },{teacher_name:'teacher.teacher_name'},{teacher_phone:'teacher.teacher_phone'});
      let klass = classes[0];
      klass.start_at = formatDate(klass.start_at)
      klass.end_at = formatDate(klass.end_at)

      let class_id = klass.id;
      let lessons = await lessonModel.show({ class_id })
      lessons.forEach(data => {
        data.date = data.date ? formatDate(data.date) : '';
      })
      let users = await userClassModel
        .where({ class_id: id })
        .leftJoin('user', 'user_class.user_id', 'user.id')
        .column('user.id','user.name', 'user.phone', 'user_class.created_at')

      users.forEach(data => data.created_at = formatTime(data.created_at));

      res.json({code: 200, message: '获取成功', data: {
        users: users,
        class: klass,
        lessons: lessons
      }})
    } catch (err) {
      res.json({code:0,message: '服务器错误'});
    }
  },
  addUser: async function(req,res,next) {
      let class_id = req.params.id;
      let user_id = req.body.user_id;
      try {
        let lessons = await lessonModel.where({ class_id });
        let userLessons = lessons.map( data => {
          return {
            lesson_id: data.id,
            class_id: class_id,
            user_id: user_id,
          }
        })

        let userClass = await userClassModel.where({ user_id, class_id });
        let hasAddClass = userClass.length > 0;
        if(hasAddClass) {
          res.json({code:0, message: '用户已加入该班级'});
          return
        }

        await userClassModel.insert({ user_id, class_id });
        await userLessonModel.insert(userLessons);
        res.json({code: 200, message: '加入成功'})
      } catch( err ) {
        res.json({code:0,message: '服务器错误'});
      }
  }
}

module.exports = classController;