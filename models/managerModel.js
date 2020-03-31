const  basicModel = require('./basicModel');

class managerClassModel extends basicModel {
    constructor(props = "manager") {
      super(props);
    }
  }
  
  module.exports = new managerClassModel();