const db = require("../config/db");
const { DataTypes, Model } = require("sequelize");
const moment = require("moment");
const sequelize = db.sequelize;
// const UserProfile = Sequelize.import("../schemas/UserProfile");
const { User, UserModel } = require("./User");
const { MovieInfoModel } = require("./MovieInfo");
const { UserRateModel } = require("./UserRate");
const { use } = require('../routes');

class UserProfile extends Model { }
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
class UserProfileModel {
	static async getUserTags(username) {
		//获取用户喜欢看的电影的tags
		let movies = await UserRateModel.getLike(username);
		console.log("测试 是 ", movies)
		let tags = [];
		for (let i = 0; i < movies.length; i++) {
			let info = await MovieInfoModel.getMovieInfoDetail(movies[i].movieId);
			// console.log(tag.tag);
			let tag = info.tag.slice(0, info.tag.length - 1).split(",");
			tags.push(...tag);
		}
		// tags.sort();
		let resObj = {};
		let res = [];
		for (let i = 0; i < tags.length; i++) {
			if (!resObj[tags[i]]) resObj[tags[i]] = 1;
			else resObj[tags[i]]++;
		}
		Object.keys(resObj).forEach((el) => {
			let tmp = { name: el, value: resObj[el] };
			res.push(tmp);
		})
		res.sort((a, b) => b.value - a.value);
		console.log("=== getUserTags");
		return res;
	}
}

module.exports = {
	UserProfile,
	UserProfileModel,
};
