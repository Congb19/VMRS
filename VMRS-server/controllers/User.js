const UserModel = require("../modules/User");
const jwt = require("jsonwebtoken");
const config = require("../config/jwt");

class UserController {
	static async create(ctx) {
		let req = ctx.request.body;
		console.log("好的", req);
		if (req.username && req.password) {
			try {
				const ret = await UserModel.createUser(req);
				const data = await UserModel.getUserDetail(ret.userid);

				const token = jwt.sign(
					{
						userid: data.userid,
						username: data.username,
					},
					config.jwtSecret
				);

				ctx.response.status = 200;
				ctx.body = {
					code: 200,
					msg: "用户注册成功",
					data,
					token,
				};
				console.log("注册成功，data: ", data, "token: ", token);
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
