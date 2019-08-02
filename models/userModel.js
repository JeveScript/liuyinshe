var basicModel = require('./basicModel.js');

class userModel extends basicModel {
  constructor(props = "user") {
    super(props);
  }
}

module.exports = new userModel();
