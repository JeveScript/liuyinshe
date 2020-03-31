const  basicModel = require('./basicModel');

class userClassModel extends basicModel {
    constructor(props = "user") {
      super(props);
    }
  }
  
  module.exports = new userClassModel();