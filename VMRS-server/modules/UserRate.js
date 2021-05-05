const db = require("../config/db");
const { DataTypes, Model } = require("sequelize");
const moment = require("moment");
const sequelize = db.sequelize;

const { Op } = require("sequelize");

class UserRate extends Model { }
UserRate.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    movieID: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    rate: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    // 创建时间
    createdAt: {
      type: DataTypes.DATE,
      get() {
        return moment(this.getDataValue("createdAt")).format(
          "YYYY-MM-DD HH:mm:ss"
        );
      },
    },
    // 更新时间
    updatedAt: {
      type: DataTypes.DATE,
      get() {
        return moment(this.getDataValue("updatedAt")).format(
          "YYYY-MM-DD HH:mm:ss"
        );
      },
    },
  },
  {
    sequelize,
    modelName: "UserRate",
    tableName: "UserRate",
  }
);

class UserRateModel {
  static async getData() {
    const data = await UserRate.findAll({
      where: {
        [Op.and]: [
          { id: { [Op.lt]: 3000, } },
          // { rate: { [Op.gt]: 3, } },
          // { id: { [Op.lt]: 200, } },
        ],
      }
    });
    // console.log("All rates:", JSON.stringify(data, null, 2));
    // console.log("Some rates:", data[0], data[1]);
    let res = [];

    data.map((el) => {
      res.push({
        movieId: el.dataValues.movieID,
        userId: el.dataValues.username,
      })
    })

    // console.log(res[0], res[1], res[2]);
    return res;
  }
}

module.exports = {
  UserRate,
  UserRateModel,
};
