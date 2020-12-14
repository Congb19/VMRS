const router = require("koa-router")();

router.prefix("/api/users");

router.get("/", function (ctx, next) {
	ctx.body = "this is a users response!";
});

router.get("/bar", function (ctx, next) {
	ctx.body = "this is a users/bar response";
});

router.post("/signup", function (ctx, next) {
	const req = ctx.request.body;
	console.log(req);
	let res = `signup ok`;
	ctx.body = {
		title: `signup`,
		code: 200,
		data: {
			res,
		},
	};
});

module.exports = router;
