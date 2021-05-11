const { MovieInfoModel } = require("../modules/MovieInfo");

class MovieInfoController {
	static async detail(id) {
		let data = await MovieInfoModel.getMovieInfoDetail(id);
		return data;
	}
}

module.exports = MovieInfoController;
