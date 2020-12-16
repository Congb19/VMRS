const UserModel = require("../modules/User");

class UserController {
	static async create(ctx) {
		let req = ctx.request.body;
		console.log("好的", req);
		if (req.username && req.password) {
			try {
				const ret = await UserModel.createUser(req);
				// const data = await UserModel.getUserDetail(ret.userId);
				const data = { a: "ok" };
				ctx.response.status = 200;
				ctx.body = {
					code: 200,
					msg: "用户注册成功",
					data,
				};
				console.log("注册成功");
			} catch (err) {
				ctx.response.status = 412;
				ctx.body = {
					code: 200,
					msg: "注册失败",
					data: err,
				};
			}
		} else {
			ctx.response.status = 416;
			ctx.body = {
				code: 200,
				msg: "参数不齐全",
			};
		}
	}
}

module.exports = UserController;
