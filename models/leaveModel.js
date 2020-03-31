const  basicModel = require('./basicModel');

class leaveClassModel extends basicModel {
    constructor(props = "leave") {
      super(props);
    }
  }
  
  module.exports = new leaveClassModel();