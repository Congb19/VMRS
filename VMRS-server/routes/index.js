const Router = require("koa-router");

const UserController = require("../controllers/User");
const UserProfileController = require("../controllers/UserProfile");
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

// let ctx = {
// 	request: {
// 		body: {
// 			// id: 1,
// 			username: "congb19",
// 			password: "QWER1234",
// 		},
// 	},
// };
// UserController.create(ctx)

module.exports = router;
