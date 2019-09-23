var basicModel = require('./basicModel.js');

class noteModel extends basicModel {
  constructor(props = "note") {
    super(props);
  }
}

module.exports = new noteModel();