var basicModel = require('./basicModel.js');

class userLessonModel extends basicModel {
  constructor(props = "user_lesson") {
    super(props);
  }
}

module.exports = new userLessonModel();
