const db = require("../config/db");
const { DataTypes, Model } = require("sequelize");
const moment = require("moment");
const sequelize = db.sequelize;
// const User = sequelize.import("../schemas/User");
class User extends Model {}
User.init(
	{
		userid: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			allowNull: true,
			autoIncrement: true,
		},
		username: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true,
		},
		password: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		// 创建时间
		createdAt: {
			type: DataTypes.DATE,
			get() {
				return moment(this.getDataValue("createdAt")).format(
					"YYYY-MM-DD HH:mm:ss"
				);
			},
		},
		// 更新时间
		updatedAt: {
			type: DataTypes.DATE,
			get() {
				return moment(this.getDataValue("updatedAt")).format(
					"YYYY-MM-DD HH:mm:ss"
				);
			},
		},
	},
	{
		sequelize,
		modelName: "User",
		tableName: "User",
	}
);
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
