var basicModel = require('./basicModel.js');

class courseModel extends basicModel {
  constructor(props = "course") {
    super(props);
  }
}

module.exports = new courseModel();

