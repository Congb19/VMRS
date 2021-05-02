const { UserRateModel } = require("../modules/UserRate");
// const jwt = require("jsonwebtoken");
// const config = require("../config/jwt");

class UserRateController {
  static async getData() {
    let data = await UserRateModel.getData();
    return data;
  }
}

module.exports = UserRateController;
