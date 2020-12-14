// 引入mysql数据库配置文件
const db = require("./config/db");
// 引入Sequelize对象
const Sequelize = db.sequelize;

const Test = Sequelize.import("schemas/test");

// const sequelize = new Sequelize("test", "test", "QWER1234", {
// 	host: "localhost",
// 	dialect: "mysql" /* 选择 'mysql' | 'mariadb' | 'postgres' | 'mssql' 其一 */,
// });

// const test = async () => {
// 	try {
// 		await sequelize.authenticate();
// 		console.log("Connection has been established successfully.");
// 	} catch (error) {
// 		console.error("Unable to connect to the database:", error);
// 	}
// };

// test();

const bb = async () => {
	const p1 = await Test.create({
		id: 1,
		title: "123",
		author: "Congb19",
		content: "123123",
		category: "ghs",
	});
	console.log("p1", p1.toJSON());
	Test.create();
};

bb();
