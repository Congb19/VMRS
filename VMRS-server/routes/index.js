const Router = require("koa-router");

const TestController = require("../controllers/test");
const MovieInfoController = require("../controllers/MovieInfo");

const router = new Router({
	prefix: "/api",
});

//测试api

router.get("/", async (ctx, next) => {
	await ctx.render("index", {
		title: "Hello Koa 2!",
	});
});
router.get("/string", async (ctx, next) => {
	ctx.body = "koa2 string";
});
router.get("/json", async (ctx, next) => {
	ctx.body = {
		title: "koa2 json",
		data: "data!",
	};
});
router.get("/test2", async (ctx, next) => {
	// let ctx2 = {
	// 	request: {
	// 		body: {
	// 			movieID: "10001411",
	// 		},
	// 	},
	// };
	ctx.request.body.movieID = 24751851;
	await MovieInfoController.detail(ctx);
	// ctx = ctx2;
});

// 测试数据库

// let ctx = {
// 	request: {
// 		body: {
// 			// id: 1,
// 			title: "teesttt",
// 			author: "Congb19",
// 			content: "asdasd",
// 			category: "ghssss",
// 		},
// 	},
// };
// TestController.create(ctx);

console.log("okokokok");

module.exports = router;
