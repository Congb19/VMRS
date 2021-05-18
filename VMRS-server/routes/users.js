const router = require("koa-router")();

const UserController = require("../controllers/User");
const UserProfileController = require("../controllers/UserProfile");

router.prefix("/api/users");

router.get("/", function (ctx, next) {
	ctx.body = "this is a users response!";
});

router.get("/bar", function (ctx, next) {
	ctx.body = "this is a users/bar response";
});
router.post("/signup", async (ctx, next) => {
	const req = ctx.request.body;
	console.log("注册中，", req);
	await UserController.create(ctx);
});
router.post("/signin", async (ctx, next) => {
	const req = ctx.request.body;
	console.log("登录中，", req);
	await UserController.signin(ctx);
});
router.post("/getUserTags", async (ctx, next) => {
	const req = ctx.request.body;
	let username = ctx.request.body.userId;
	// console.log("登录中，", req);
	let res = await UserProfileController.getUserTags(username);
	ctx.body = {
		username,
		res
	}
});

module.exports = router;
