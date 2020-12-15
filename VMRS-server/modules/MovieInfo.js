const db = require("../config/db");
const Sequelize = db.sequelize;
const MovieInfo = Sequelize.import("../schemas/MovieInfo");
// 自动同步表
const fsync = async () => {
	// await MovieInfo.sync({ force: false });
	await MovieInfo.sync({ alter: true });
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
