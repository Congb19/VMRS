const router = require("koa-router")();

router.prefix("/api/public");

//公用api

//date
router.get("/getDate", async (ctx, next) => {
	let time = new Date();
	console.log(time);
	let str =
		`${time.getFullYear()} / ${(time.getMonth()+1)} / ${time.getDate()}`;
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

//luckyNumber
router.get("/getLuckyNumber", async (ctx, next) => {
	let luckyNumber = Math.ceil(Math.random() * 100);
	ctx.body = {
		title: `luckyNumber__${luckyNumber}`,
		code: 200,
		data: {
			luckyNumber,
		},
	};
});

//营销号文章生成器
router.post("/createTrashArticle", async (ctx, next) => {
	const req = ctx.request.body;
	console.log(req);
	let res = `${req.main}${req.event}是怎么回事呢?${req.main}相信大家都很熟悉，但是${req.main}${req.event}是怎么回事呢，下面就让小编带大家一起了解吧。
    ${req.main}${req.event}，其实就是${req.anotherEvent}，大家可能会很惊讶${req.main}怎么会${req.event}呢?但事实就是这样，小编也感到非常惊讶。
    这就是关于${req.main}${req.event}的事情了，大家有什么想法呢，欢迎在评论区告诉小编一起讨论哦!`;
	ctx.body = {
		title: `trashArticle__${req.main}${req.event}`,
		code: 200,
		data: {
			res,
		},
	};
});

module.exports = router;
