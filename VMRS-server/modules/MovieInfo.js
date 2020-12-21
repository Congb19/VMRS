const db = require("../config/db");
const { DataTypes, Model } = require("sequelize");
const sequelize = db.sequelize;
// const MovieInfo = Sequelize.import("../schemas/MovieInfo");
class MovieInfo extends Model {}
MovieInfo.init(
	{
		movieID: {
			type: DataTypes.STRING,
			primaryKey: true,
			allowNull: false,
			field: "movieID",
		},
		name: {
			type: DataTypes.STRING,
			allowNull: false,
			field: "name",
		},
		director: {
			type: DataTypes.STRING,
			allowNull: false,
			field: "director",
		},
		actor: {
			type: DataTypes.STRING,
			allowNull: false,
			field: "actor",
		},
		genre: {
			type: DataTypes.STRING,
			allowNull: false,
			field: "genre",
		},
		tag: {
			type: DataTypes.STRING,
			allowNull: false,
			field: "tag",
		},
		summary: {
			type: DataTypes.TEXT,
			allowNull: false,
			field: "summary",
		},
		rate: {
			type: DataTypes.STRING,
			allowNull: false,
			field: "rate",
		},
		popular: {
			type: DataTypes.STRING,
			allowNull: false,
			field: "popular",
		},
	},
	{
		sequelize,
		timestamps: false,
		modelName: "MovieInfo",
		tableName: "MovieInfo",
	}
);
// 自动同步表
const fsync = async () => {
	// await MovieInfo.sync({ force: false });
	await MovieInfo.sync({ force: false, alter: true });
	console.log("Info表结构同步成功");
};
fsync();
class MovieInfoModel {
	static async getMovieInfoDetail(movieID) {
		return await MovieInfo.findOne({
			where: {
				movieID: movieID,
			},
		});
	}
}

module.exports = MovieInfoModel;
