var basicModel = require('./basicModel.js');

class userModel extends basicModel {
  constructor(props = "leave") {
    super(props);
  }
}

module.exports = new userModel();
