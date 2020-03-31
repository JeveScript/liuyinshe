const  basicModel = require('./basicModel');

class user_planClassModel extends basicModel {
    constructor(props = "user_plan") {
      super(props);
    }
  }
  
  module.exports = new user_planClassModel();