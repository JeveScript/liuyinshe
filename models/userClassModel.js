var basicModel = require('./basicModel.js');

class userClassModel extends basicModel {
  constructor(props = "user_class") {
    super(props);
  }
}

module.exports = new userClassModel();
