const  basicModel = require('./basicModel');

class lessonClassModel extends basicModel {
    constructor(props = "lesson") {
      super(props);
    }
  }
  
  module.exports = new lessonClassModel();