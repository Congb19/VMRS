const router = require("koa-router")();

router.prefix("/api/public");

const { RecommendGoodsService } = require("../core/index");

// todo: 
// 构建一张大数据表
// Data, userid（我）, k, movieId（基于的物品） 传入RecommendGoodsService，构建一个推荐实例。
// 实例.start()
// 返回推荐结果
// 根据结果从movieinfo中取详细数据。

// console.log(RecommendGoodsService);
// mock
let mock = [
	{
		userId: 1,
		movieId: 1,
		// grade: 9.9
	},
	{
		userId: 1,
		movieId: 2,
		// grade: 9.9
	},
	{
		userId: 2,
		movieId: 1,
		// grade: 9.8
	},
	{
		userId: 2,
		movieId: 3,
		// grade: 9.7
	},
	{
		userId: 2,
		movieId: 4,
		// grade: 9.7
	},
	{
		userId: 2,
		movieId: 6,
		// grade: 9.7
	},
	{
		userId: 3,
		movieId: 1,
		// grade: 9.9
	},
	{
		userId: 3,
		movieId: 3,
		// grade: 9.9
	},
	{
		userId: 3,
		movieId: 4,
		// grade: 9.9
	},
	{
		userId: 3,
		movieId: 5,
		// grade: 9.9
	},
	{
		userId: 3,
		movieId: 6,
		// grade: 9.9
	},
	{
		userId: 4,
		movieId: 5,
		// grade: 9.9
	},
	{
		userId: 4,
		movieId: 4,
		// grade: 9.9
	},
]


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

router.get("/getRecList", async (ctx, next) => {
	const req = ctx.request;
	console.log(ctx, req);

	let modal = new RecommendGoodsService(mock, 1, 4, 1);
	//go
	modal.start();
	console.log(modal.result);

	ctx.body = {
		movieId: 1, //根据哪一部推送的
		recList: modal.resultRank,
	};
})

//getRecDetail

router.post("/getRecDetail", async (ctx, next) => {
	const req = ctx.request;
	console.log(req.body.movieId);

	ctx.body = {
		movieId: req.body.movieId,
		title: "titanic 20202020",
		time: "120:00",
		cat: ["奇幻", "悬疑"],
		rate: 9.9,//豆瓣评分
	};
})

module.exports = router;
