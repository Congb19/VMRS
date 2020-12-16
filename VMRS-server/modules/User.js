const db = require("../config/db");
const Sequelize = db.sequelize;
const User = Sequelize.import("../schemas/User");
// 自动同步表
const fsync = async () => {
	await User.sync({ force: false, alter: true });
	console.log("User表结构同步成功");
};
fsync();
class UserModel {
	static async createUser(data) {
		console.log("现在在modules。create");
		return await User.create({
			username: data.username,
			password: data.password,
		});
	}
	static async getUserDetail(userid) {
		console.log("现在在modules。get");
		return await User.findOne({
			where: {
				userid,
			},
		});
	}
}

module.exports = UserModel;
