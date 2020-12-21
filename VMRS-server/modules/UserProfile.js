const db = require("../config/db");
const { DataTypes, Model } = require("sequelize");
const moment = require("moment");
const sequelize = db.sequelize;
// const UserProfile = Sequelize.import("../schemas/UserProfile");
const { User, UserModel } = require("./User");
class UserProfile extends Model {}
UserProfile.init(
	{
		userid: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			allowNull: false,
			// references: {
			// 	model: "User",
			// 	key: "userid",
			// },
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
// UserProfile.belongsTo(User);
class UserProfileModel {}

module.exports = {
	UserProfile,
	UserProfileModel,
};
