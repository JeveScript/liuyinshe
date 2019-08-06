var basicModel = require('./basicModel.js');

class lessonModel extends basicModel {
  constructor(props = "lesson") {
    super(props);
  }
}

module.exports = new lessonModel();

