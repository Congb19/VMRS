const { UserModel } = require("../modules/User");
const jwt = require("jsonwebtoken");
const config = require("../config/jwt");

class UserController {
	static async create(ctx) {
		let req = ctx.request.body;
		if (req.username && req.password) {
			try {
				const ret = await UserModel.createUser(req);
				const token = jwt.sign(
					{
						userid: ret.userid,
						username: ret.username,
					},
					config.jwtSecret
				);
				//固定该用户的token
				await UserModel.setUserToken(ret.userid, token);
				const data = await UserModel.getUserDetail(ret.userid);

				ctx.response.status = 200;
				ctx.body = {
					code: 200,
					msg: "用户注册成功",
					data,
				};
				console.log("注册成功，data: ", data);
			} catch (err) {
				console.log("=== err, ", err);
				ctx.response.status = 412;
				ctx.body = {
					code: 412,
					msg: "注册失败",
					data: err,
				};
			}
		} else {
			ctx.response.status = 416;
			ctx.body = {
				code: 416,
				msg: "参数不齐全",
			};
		}
	}

	static async signin(ctx) {
		let req = ctx.request.body;
		if (req.username && req.password) {
			try {
				const ret = await UserModel.signin(req);
				const data = await UserModel.getUserDetail(ret.userid);
				//如果没有token，则设置一下，否则从data取就行。
				if (!data.token) {
					const token = jwt.sign(
						{
							userid: ret.userid,
							username: ret.username,
						},
						config.jwtSecret
					);
					await UserModel.setUserToken(ret.userid, token);
				}
				ctx.response.status = 200;
				ctx.body = {
					code: 200,
					msg: "登录成功",
					data,
				};
				console.log("登录成功，data: ", data);
			} catch (err) {
				ctx.response.status = 412;
				ctx.body = {
					code: 412,
					msg: "登录失败",
					data: err,
				};
			}
		} else {
			ctx.response.status = 416;
			ctx.body = {
				code: 416,
				msg: "参数不齐全",
			};
		}
	}
}

module.exports = UserController;
