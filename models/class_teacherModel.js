
var basicModel = require('./basicModel.js');

class userClassModel extends basicModel {
  constructor(props = "class_teacher") {
    super(props);
  }
}

module.exports = new userClassModel();