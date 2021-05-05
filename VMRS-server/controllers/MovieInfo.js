const { MovieInfoModel } = require("../modules/MovieInfo");

class MovieInfoController {
	static async detail(id) {
		let data = await MovieInfoModel.getMovieInfoDetail(id);
		return data;
		// let movieID = ctx.request.body.movieId;
		// if (movieID) {
		// 	try {
		// 		let data = await MovieInfoModel.getMovieInfoDetail(movieID);
		// 		ctx.response.status = 200;
		// 		ctx.body = {
		// 			code: 200,
		// 			msg: "查询成功",
		// 			data,
		// 		};
		// 	} catch (err) {
		// 		ctx.response.status = 412;
		// 		ctx.body = {
		// 			code: 412,
		// 			msg: "查询失败",
		// 		};
		// 	}
		// } else {
		// 	ctx.response.status = 416;
		// 	ctx.body = {
		// 		code: 416,
		// 		msg: "ID必须传",
		// 	};
		// }
	}
}

module.exports = MovieInfoController;
