const db = require("../config/db");
const { DataTypes, Model } = require("sequelize");
const moment = require("moment");
const sequelize = db.sequelize;
// const UserProfile = Sequelize.import("../schemas/UserProfile");
const User = require("./User");
class UserProfile extends Model {}
UserProfile.init(
	{
		userid: {
			type: DataTypes.INTEGER,
			allowNull: false,
			references: {
				// 这是对另一个模型的参考
				model: User,
				// 这是引用模型的列名
				key: "userid",
			},
		},
		nickname: {
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
		modelName: "UserProfile",
		tableName: "UserProfile",
	}
);

// 自动同步表
const fsync = async () => {
	await UserProfile.sync({ force: false, alter: true });
	console.log("UserProfile表结构同步成功");
};
fsync();

class UserProfileModel {}

module.exports = UserProfileModel;
