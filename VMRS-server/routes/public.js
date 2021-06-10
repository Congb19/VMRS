const router = require("koa-router")();

router.prefix("/api/public");

const fs = require('fs');

const { RecommendMoviesService } = require("../core/index");

const UserController = require("../controllers/User");
const MovieInfoController = require("../controllers/MovieInfo");
const UserRateController = require("../controllers/UserRate");

// todo: 
// 构建一张大数据表
// Data, userid（我）, k, movieId（基于的物品） 传入RecommendGoodsService，构建一个推荐实例。
// 实例.start()
// 返回推荐结果
// 根据结果从movieinfo中取详细数据。

// console.log(RecommendGoodsService);
// mock
// let mock = [
// 	{
// 		userId: 1,
// 		movieId: 1,
// 		// grade: 9.9
// 	},
// 	{
// 		userId: 1,
// 		movieId: 2,
// 		// grade: 9.9
// 	},
// 	{
// 		userId: 2,
// 		movieId: 1,
// 		// grade: 9.8
// 	},
// 	{
// 		userId: 2,
// 		movieId: 3,
// 		// grade: 9.7
// 	},
// 	{
// 		userId: 2,
// 		movieId: 4,
// 		// grade: 9.7
// 	},
// 	{
// 		userId: 2,
// 		movieId: 6,
// 		// grade: 9.7
// 	},
// 	{
// 		userId: 3,
// 		movieId: 1,
// 		// grade: 9.9
// 	},
// 	{
// 		userId: 3,
// 		movieId: 3,
// 		// grade: 9.9
// 	},
// 	{
// 		userId: 3,
// 		movieId: 4,
// 		// grade: 9.9
// 	},
// 	{
// 		userId: 3,
// 		movieId: 5,
// 		// grade: 9.9
// 	},
// 	{
// 		userId: 3,
// 		movieId: 6,
// 		// grade: 9.9
// 	},
// 	{
// 		userId: 4,
// 		movieId: 5,
// 		// grade: 9.9
// 	},
// 	{
// 		userId: 4,
// 		movieId: 4,
// 		// grade: 9.9
// 	},
// ]


//公用api

//test
router.get("/getDate", async (ctx, next) => {
	let time = new Date();
	console.log(time);
	let str =
		`${time.getFullYear()} / ${(time.getMonth() + 1)} / ${time.getDate()}`;
	ctx.body = {
		title: `date__${str}`,
		code: 200,
		data: {
			year: time.getFullYear(),
			month: time.getMonth() + 1,
			date: time.getDate(),
			day: time.getDay(),
		},
	};
});

//getRecList

// global.userId = "vinika";
// global.movieId = "7064681";

const start = async (userId) => {
	let likes = await UserRateController.getLike(userId);
	global.modal = [];
	// console.log(likes);
	for (let i = 0; i < 1; i++) {
		initData(userId, likes[i].movieId);
		// initData(userId, "24752302");
	}
}


const initData = async (userId, movieId) => {
	let data = await UserRateController.getData();
	console.log("get data ok");
	let modal = new RecommendMoviesService(data, userId, 10, movieId);
	//go
	await modal.start();
	console.log("modal start ok");
	modal.resultRank = modal.resultRank.slice(0, 50);
	console.log("modal: ", modal.resultRank);

	// for (let j = 0; j < 1; j++) {
	for (let i = 0; i < 50; i++) {
		let data = await MovieInfoController.detail(modal.resultRank[i].movieId);
		modal.resultRank[i].data = data;
	}
	// }

	const jsondata = JSON.stringify(modal.resultRank);
	fs.writeFile(`../4698529.json`, jsondata, (err) => {
		if (err) {
			throw err;
		}
		console.log("JSON data is saved.");
	})
	//to global

	// global.modal.push({ userId, movieId, modal });
	// return modal;
}

// initData("vinika", "7064681");
start("4698529");


global.start = start;

router.post("/signin", async (ctx, next) => {
	const req = ctx.request.body;
	console.log("登录中，", req);
	global.user = req.username;

	const user = global.user;
	await UserController.signin(ctx);
});

router.get("/getRecList", async (ctx, next) => {
	const req = ctx.request;

	const readfile = () => {
		return new Promise((resolve) => {
			fs.readFile(`../${user}.json`, 'utf-8', (err, data) => {
				if (err) {
					throw err;
				}
				const modal = JSON.parse(data.toString());
				global.modal = modal;
				resolve(modal);
			});
		})
	}

	let result = await readfile();
	console.log("结果：", global.modal);
	ctx.body = {
		recList: result
	};
})

//getRecDetail

router.post("/getRecDetail", async (ctx, next) => {
	// const req = ctx.request;
	// console.log(req.body.movieId);

	// await MovieInfoController.detail(ctx);

	let movieID = ctx.request.body.movieId;
	// console.log(movieID)
	if (movieID) {
		try {
			let data = await MovieInfoController.detail(movieID);
			ctx.response.status = 200;
			ctx.body = {
				code: 200,
				msg: "查询成功",
				data,
			};
		} catch (err) {
			ctx.response.status = 412;
			ctx.body = {
				code: 412,
				msg: "查询失败",
			};
		}
	} else {
		ctx.response.status = 416;
		ctx.body = {
			code: 416,
			msg: "ID必须传",
		};
	}




	// ctx.body = {
	// 	movieId: req.body.movieId,
	// 	title: "titanic 20202020",
	// 	time: "120:00",
	// 	cat: ["奇幻", "悬疑"],
	// 	rate: 9.9,//豆瓣评分
	// };
})

module.exports = router;
