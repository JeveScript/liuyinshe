const  basicModel = require('./basicModel');

class teacherClassModel extends basicModel {
    constructor(props = "teacher") {
      super(props);
    }
  }
  
  module.exports = new teacherClassModel();