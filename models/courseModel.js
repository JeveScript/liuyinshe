const  basicModel = require('./basicModel');

class courseClassModel extends basicModel {
    constructor(props = "course") {
      super(props);
    }
  }
  
  module.exports = new courseClassModel();