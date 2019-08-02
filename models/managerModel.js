var basicModel = require('./basicModel.js');

class managerModel extends basicModel {
  constructor(props = "manager") {
    super(props);
  }
}

module.exports = new managerModel();

