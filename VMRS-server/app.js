const Koa = require("koa");
const app = new Koa();
const views = require("koa-views");
const json = require("koa-json");
const onerror = require("koa-onerror");
const bodyparser = require("koa-bodyparser");
const logger = require("koa-logger");
const cors = require("koa2-cors");

const index = require("./routes/index");
const public = require("./routes/public");
const users = require("./routes/users");

// error handler
onerror(app);

// middlewares
app.use(
	bodyparser({
		enableTypes: ["json", "form", "text"],
	})
);

// 使用koa-cors
app.use(cors());

app.use(json());
app.use(logger());
app.use(require("koa-static")(__dirname + "/public"));

app.use(
	views(__dirname + "/views", {
		extension: "pug",
	})
);

// logger
app.use(async (ctx, next) => {
	const start = new Date();
	await next();
	const ms = new Date() - start;
	console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
});

// routes
app.use(index.routes(), index.allowedMethods());
app.use(public.routes(), public.allowedMethods());
app.use(users.routes(), users.allowedMethods());

// error-handling
app.on("error", (err, ctx) => {
	console.error("server error", err, ctx);
});

module.exports = app;
