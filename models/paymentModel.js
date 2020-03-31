const  basicModel = require('./basicModel');

class paymentClassModel extends basicModel {
    constructor(props = "payment") {
      super(props);
    }
  }
  
  module.exports = new paymentClassModel();