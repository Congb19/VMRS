/**
├── modules
    └── test.js
*/

// 引入mysql数据库配置文件
const db = require("../config/db");
// 引入Sequelize对象
const Sequelize = db.sequelize;
// 引入上一步的文章数据表模型文件
const Test = Sequelize.import("../schemas/test");
// 自动同步表
const fsync = async () => {
	await Test.sync({ force: false });
	console.log("表结构同步成功");
};
fsync();
class TestModel {
	/**
	 * 创建文章模型
	 * @param data
	 * @returns {Promise<*>}
	 */
	static async createTest(data) {
		return await Test.create({
			title: data.title, // 文章标题
			author: data.author, // 文章作者
			content: data.content, // 文章内容
			category: data.category, // 文章分类
		});
	}

	/**
	 * 查询取文章详情数据
	 * @param id  文章ID
	 * @returns {Promise<Model>}
	 */
	static async getTestDetail(id) {
		return await Test.findOne({
			where: {
				id,
			},
		});
	}
}

module.exports = TestModel;
