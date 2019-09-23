var basicModel = require('./basicModel.js');

class userClassModel extends basicModel {
  constructor(props = "teacher") {
    super(props);
  }
}

module.exports = new userClassModel();