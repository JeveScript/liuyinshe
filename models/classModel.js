var basicModel = require('./basicModel.js');

class classModel extends basicModel {
  constructor(props = "class") {
    super(props);
  }
}

module.exports = new classModel();
