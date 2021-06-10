const _ = require('lodash');

const RecommendMoviesService = class RecommendMoviesService {

	constructor(data, userId, k, movieId) {
		this.data = data;
		this.movieId = movieId;
		this.movieId2 = movieId;
		this.userId = userId;
		this.k = k;

		// 总电影列表
		this.moviesList = [];
		// 当前电影的用户列表
		this.users = [];
		// 当前电影相似度列表
		this.simpleList = [];
		// 当前用户喜爱电影列表
		this.userPerferList = [];
		// 当前用户没看过的电影列表
		this.moviesMayPerferList = [];

		// 结果
		this.resultRank = [];
		this.simi = [];
	}
	show() {
		// console.log("this.moviesList", this.moviesList);
		// console.log("this.users", this.users);
		// // console.log("this.simpleList", this.simpleList);
		// console.log("this.userPerferList", this.userPerferList);
		// console.log("this.moviesMayPerferList", this.moviesMayPerferList);
		console.log("this.resultRank", this.resultRank);
	}

	async start() {
		// 获取待计算数据
		this.getInitialData();
		// 开始计算用户对未看过的电影感兴趣程度
		for (let movieId of this.moviesMayPerferList.values()) {
			const res = this.getUserInterest(movieId);
			// res.simi = [];
			for (let i = 0; i < this.simpleList.length; i++) {
				const el = this.simpleList[i];
				if (i > 10) break;
			}
			res.simi = this.simi;
			this.resultRank.push(res);
		}

		// console.log("测试", this.movieId);
		// 逆序排序
		this.resultRank.sort((a, b) => {
			return b.grade - a.grade;
		});
		this.show();
	}

	// 计算用户对该电影的感兴趣程度
	getUserInterest(movieId) {
		// 获取movieId相似的电影列表
		const simple = this.getMoviesGrade(false, movieId);
		let grade = 0;
		this.simi = [];
		for (let [index, obj] of simple.entries()) {
			if (this.userPerferList.includes(obj.movieId) && index < this.k) {
				grade += obj.grade;
				this.simi.push({ movieId: obj.movieId, similarity: obj.grade });
			}
		}
		// console.log("测试", this.movieId2);
		return { movieId, grade };
	}
	//初始化数据
	getInitialData() {
		// 获取当前用户的喜爱记录
		this.userPerferList = this.data.reduce((array, obj) => {
			if (obj.userId === this.userId && !array.includes(obj.movieId)) {
				array.push(obj.movieId);
			}
			return array;
		}, []);
		// 获取当前用户没看过的电影列表
		this.moviesMayPerferList = this.data.reduce((array, obj) => {
			if (
				!array.includes(obj.movieId) &&
				!this.userPerferList.includes(obj.movieId)
			) {
				array.push(obj.movieId);
			}
			return array;
		}, []);
	}
	// 计算与电影movieId相似的 电影列表
	getMoviesGrade(isDelSelf, movieId) {
		this.simpleList = [];
		this.movieId = movieId;
		// 获取待计算电影列表
		this.getMoviesList();
		// 获取当前电影的用户列表
		this.users = this.getMoviesUserNum(this.movieId);
		// 计算相似度
		for (let movieId of this.moviesList.values()) {
			this.getMoviesSimple(movieId);
		}
		// 根据相似度排序
		this.simpleList.sort((a, b) => {
			//倒序
			return b.grade - a.grade;
		});
		// 是否排除掉自身
		if (isDelSelf) {
			this.getNotSelfMovies();
		}
		// 相似度归一化
		this.gradeNormalization();
		// console.log("movieId:", movieId, "this.simplelist:", this.simpleList)
		return this.simpleList;
	}
	/**
	 * 获取目标电影数组
	 */
	getMoviesList() {
		//筛选除了本电影之外的电影数据
		const moviesArray = this.data.reduce((array, obj) => {
			if (obj.movieId !== this.movieId) {
				array.push(obj.movieId);
			}
			return array;
		}, []);
		// 去重
		const movies = [...new Set(moviesArray)];
		// 得到目标电影列表
		this.moviesList = movies;
		// console.log("测试", this.movieId);
	}
	// 去掉已看过的电影
	getNotSelfMovies() {
		// 筛选当前用户看过的电影
		const userMovies = this.data.reduce((array, obj) => {
			if (obj.userId === this.userId) {
				array.push(obj.movieId);
			}
			return array;
		}, []);
		// 删除本用户看过的电影
		for (let [index, obj] of this.simpleList.entries()) {
			if (userMovies.includes(obj.movieId)) {
				this.simpleList.splice(index, 1);
			}
		}
	}
	// 获取电影相似度列表
	getMoviesSimple(movieId) {
		const users = this.getMoviesUserNum(movieId);
		// 计算相似度的分母
		const bottom = Math.sqrt(this.users.length * users.length);
		let count = 0;
		// 计算两个电影的共同用户数，得到相识度的分子
		for (let val of users.values()) {
			if (this.users.includes(val)) {
				// 惩罚活跃用户
				count += this.getSimpleElememt(val);
			}
		}
		// 保存结果对象，包括电影ID和相似度
		const res = {
			movieId,
			grade: count / bottom,
		};
		this.simpleList.push(res);
	}
	/**
	 * 提升算法，惩罚活跃用户，计算相似度分子
	 * @param {*用户ID} userId
	 */
	getSimpleElememt(userId) {
		// 找到用户买过的电影数量
		const moviesNum = this.data.reduce((array, obj) => {
			if (obj.userId === userId) {
				array.push(obj.movieId);
			}
			return array;
		}, []);
		const count = [...new Set(moviesNum)].length;
		const element = 1 / Math.log(1 + count);
		return element;
	}
	// 获取电影的用户列表
	getMoviesUserNum(movieId) {
		//得到电影的用户列表
		const users = this.data.reduce((array, obj) => {
			if (obj.movieId === movieId) {
				array.push(obj.userId);
			}
			return array;
		}, []);
		return [...new Set(users)];
	}
	// 相似度归一化
	gradeNormalization() {
		// console.log("normalizaing……")
		// 取最大值
		const max = this.simpleList[0].grade;
		for (let index of this.simpleList.keys()) {
			this.simpleList[index].grade = this.simpleList[index].grade / max;
		}
	}
};

module.exports = { RecommendMoviesService };
