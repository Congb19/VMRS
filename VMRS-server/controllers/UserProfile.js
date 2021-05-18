const { UserProfileModel } = require("../modules/UserProfile");
// const jwt = require("jsonwebtoken");
// const config = require("../config/jwt");

class UserProfileController {
  static async getUserTags(username) {
    let data = await UserProfileModel.getUserTags(username);
    return data;
  }
}

module.exports = UserProfileController;