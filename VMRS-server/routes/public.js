const router = require("koa-router")();

router.prefix("/api/public");

const { RecommendGoodsService } = require("../core/index");

// todo: 
// 构建一张大数据表
// Data, userid（我）, k, goodsid（基于的物品） 传入RecommendGoodsService，构建一个推荐实例。
// 实例.start()
// 返回推荐结果
// 根据结果从movieinfo中取详细数据。

// console.log(RecommendGoodsService);
// mock
let data = [
	{
		userid: 1,
		goodsid: 1,
		grade: 9.9
	},
	{
		userid: 1,
		goodsid: 2,
		grade: 9.8
	},
	{
		userid: 2,
		goodsid: 2,
		grade: 9.7
	},
]
let modal = new RecommendGoodsService(data, 1, 3, 1);

//go
// modal.start();

console.log(modal.result);


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

	ctx.body = {
		data: [1, 2],
	};
})

module.exports = router;
