const db = require("../config/db");
const { DataTypes, Model } = require("sequelize");
const moment = require("moment");
const sequelize = db.sequelize;
// const User = sequelize.import("../schemas/User");
const { UserProfile, UserProfileModel } = require("./UserProfile");
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
		token: {
			type: DataTypes.STRING,
			allowNull: true,
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
// User.hasOne(UserProfile);
class UserModel {
	static async createUser(data) {
		//创建一下账户信息、个人信息。
		const res = await User.create({
			username: data.username,
			password: data.password,
		});
		await UserProfile.create({
			userid: res.userid,
			nickname: "旅行者",
		});
		return res;
	}
	//通过id查信息
	static async getUserDetail(userid) {
		console.log("=== getUserDetail");
		return await User.findOne({
			where: {
				userid,
			},
		});
	}
	//setUserToken
	static async setUserToken(userid, token) {
		console.log("=== setUserToken");
		return await User.update(
			{ token },
			{
				where: {
					userid,
				},
			}
		);
	}

	static async signin(data) {
		//核对帐号密码
		const res = await User.findOne({
			where: {
				username: data.username,
				password: data.password,
			},
		});
		return res;
	}
}

module.exports = {
	User,
	UserModel,
};
