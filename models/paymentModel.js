var basicModel = require('./basicModel.js');

class paymentModel extends basicModel {
  constructor(props = "payment") {
    super(props);
  }
}

module.exports = new paymentModel();
