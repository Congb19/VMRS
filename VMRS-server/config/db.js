const Sequelize = require("sequelize");

const sequelize = new Sequelize("vmrs", "test", "QWER1234", {
	host: "localhost",
	// host: "159.75.85.197",

	dialect: "mysql",
	// operatorsAliases: false,
	dialectOptions: {
		// 字符集
		charset: "utf8mb4",
		collate: "utf8mb4_unicode_ci",
		supportBigNumbers: true,
		bigNumberStrings: true,
	},
	pool: {
		max: 5,
		min: 0,
		acquire: 30000,
		idle: 10000,
	},
	timezone: "+08:00", //东八时区
});

module.exports = {
	sequelize,
};
