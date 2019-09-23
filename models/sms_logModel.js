var basicModel = require('./basicModel.js');

class sms_logModel extends basicModel {
  constructor(props = "sms_log") {
    super(props);
  }
}

module.exports = new sms_logModel();