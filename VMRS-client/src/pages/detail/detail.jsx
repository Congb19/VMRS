import React, { Component } from 'react';
import { View, Text } from '@tarojs/components';
import { getCurrentInstance } from '@tarojs/taro';
import './detail.scss';

import { getRecDetail } from '../../ajax';
import { AtMessage, AtIcon } from 'taro-ui';

import { connect } from 'react-redux';
// import { saveData } from '../../ajax/dataActions';

import * as echarts from 'echarts';
// import configStore from '../../store';

// const store = configStore();

@connect(
	({ data }) => ({
		data,
	}),
	(dispatch) => ({})
)
class Detail extends Component {
	componentWillReceiveProps(nextProps) {
		console.log(this.props, nextProps);
	}
	constructor(props) {
		super(props);
		this.state = {
			movieId: getCurrentInstance().router.params.id,
			grade: getCurrentInstance().router.params.grade,
			data: {
				name: '',
				time: '待加载',
				cat: ['待加载', '待加载'],
				rate: '待加载', //豆瓣评分
				director: '',
				rate: 123,
			},
		};
	}
	async componentDidMount() {
		// this.setState({ movieId: getCurrentInstance().router.params.id });
		// console.log(getCurrentInstance().router.params);
		//todo: 请求获取推荐详情数据
		// console.log(this.state);
		// let res = await getRecDetail({
		// 	movieId: this.state.movieId,
		// });
		// this.setState({ data: res?.data });

		this.setState({
			chart: await echarts.init(document.getElementById('detail-chart')),
		});
		console.log(this.state);

		this.drawChart();

		console.log('测试4', this.props, this.props.data.data);
		// console.log('测试5', this.store);
	}
	drawChart = async () => {
		let names = [],
			values = [];
		let simi = this.props.data.data.simi;
		for (let i = 0; i < simi.length && i < 10; i++) {
			let res = await getRecDetail({
				movieId: simi[i].movieId,
			});
			names[i] =
				res.data.name.length < 8
					? res.data.name
					: res.data.name.slice(0, 6) + '...';
			values[i] = simi[i].similarity / 1;
		}
		names.reverse();
		values.reverse();
		// this.state.recList;
		this.state.chart.setOption({
			title: {
				text: '它与以下您喜欢的电影的相似程度',
				subtext: '数据来自网络',
			},
			tooltip: {
				trigger: 'axis',
				axisPointer: {
					type: 'shadow',
				},
			},
			grid: {
				left: '3%',
				right: '4%',
				bottom: '3%',
				containLabel: true,
			},
			yAxis: {
				type: 'category',
				data: names,
			},
			xAxis: {
				type: 'value',
			},
			series: [
				{
					data: values,
					type: 'line',
				},
			],
		});
	};
	onReady() {
		console.log('onready detail');
	}
	render() {
		let data = this.props.data.data.data;
		return (
			<View className="detail page">
				<AtMessage></AtMessage>
				<View className="page__header">
					<View className="header__title">
						推荐详情：
						{data.name.length < 22 ? data.name : data.name.slice(0, 20) + '...'}
					</View>
				</View>
				<View className="detail__view">
					<View className="detail__view__img"></View>
					<View className="view">
						<View className="view__title">{data.name}</View>
						{/* <View className="view__"></View> */}
						<View className="view__grade">
							<AtIcon
								className="view__grade__icon"
								value="star"
								size="60"
								color="#AAA"
							></AtIcon>{' '}
							{this.state.grade ? (this.state.grade * 100).toFixed(0) : 0}
						</View>
						<View className="view__infos">
							<View className="view__infos__rate">
								{/* <AtIcon value="analytics" size="30" color="#fff"></AtIcon>{' '} */}
								评分：{data.rate}
							</View>
							<View className="view__infos__director">
								导演：{data.director}
							</View>
							<View className="view__infos__director">类型：{data.genre}</View>
							<View className="view__infos__director">
								热度：{data.popular}
							</View>
						</View>
						<br />
						<View className="view__reasons">
							<View>
								我为什么会被推荐这部电影？
								<br />
								{/* 它与以下您喜欢的电影很相似： */}
							</View>
							<View id="detail-chart" className="view__chart"></View>
						</View>
					</View>
				</View>
			</View>
		);
	}
}
export default Detail;
