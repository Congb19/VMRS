const Router = require("koa-router");

const UserController = require("../controllers/User");
const UserProfileController = require("../controllers/UserProfile");
const MovieInfoController = require("../controllers/MovieInfo");

// const mysql = require("mysql");
// var connection = mysql.createConnection({
// 	host: 'localhost',
// 	user: 'test',
// 	password: 'QWER1234',
// 	database: 'vmrs'
// });
// connection.connect();

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
	// ctx.body = {
	// 	test: 1,
	// 	test2: 2,
	// }
});
router.get("/json", async (ctx, next) => {
	ctx.body = {
		title: "koa2 json",
		data: "data!",
		arr: [1, 2]
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

// router.get("/test", async (ctx, next) => {
// 	const select = async (sql) => {
// 		return new Promise((resolve, reject) => {
// 			connection.query(sql, function (err, results) {
// 				resolve(results);
// 			});
// 		})
// 	}
// 	let res = await select("select * from User");
// 	ctx.body = {
// 		data: res,
// 	}
// });

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
// 			username: "4698529",
// 			password: "QWER1234",
// 		},
// 	},
// };
// UserController.create(ctx)

module.exports = router;
