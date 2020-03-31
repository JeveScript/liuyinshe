const  basicModel = require('./basicModel');

class user_lessonClassModel extends basicModel {
    constructor(props = "user_lesson") {
      super(props);
    }
  }
  
  module.exports = new user_lessonClassModel();