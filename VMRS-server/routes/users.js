const router = require("koa-router")();

const UserController = require("../controllers/User");

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

module.exports = router;
