const  basicModel = require('./basicModel');

class comboClassModel extends basicModel {
    constructor(props = "combo") {
      super(props);
    }
  }
  
  module.exports = new comboClassModel();