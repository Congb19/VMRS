const moment = require("moment");
module.exports = function (sequelize, DataTypes) {
	return sequelize.define(
		"MovieInfo",
		{
			movieID: {
				type: DataTypes.STRING,
				primaryKey: true,
				allowNull: false,
				field: "movieID",
			},
			name: {
				type: DataTypes.STRING,
				allowNull: false,
				field: "name",
			},
			director: {
				type: DataTypes.STRING,
				allowNull: false,
				field: "director",
			},
			actor: {
				type: DataTypes.STRING,
				allowNull: false,
				field: "actor",
			},
			genre: {
				type: DataTypes.STRING,
				allowNull: false,
				field: "genre",
			},
			tag: {
				type: DataTypes.STRING,
				allowNull: false,
				field: "tag",
			},
			summary: {
				type: DataTypes.TEXT,
				allowNull: false,
				field: "summary",
			},
			rate: {
				type: DataTypes.STRING,
				allowNull: false,
				field: "rate",
			},
			popular: {
				type: DataTypes.STRING,
				allowNull: false,
				field: "popular",
			},
		},
		{
			timestamps: false,
			freezeTableName: true,
		}
	);
};
