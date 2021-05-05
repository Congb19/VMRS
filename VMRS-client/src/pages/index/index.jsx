import React, { Component } from 'react';
import Taro, { nextTick } from '@tarojs/taro';
import { View, Text } from '@tarojs/components';
import {
	AtIcon,
	AtButton,
	AtModal,
	AtModalHeader,
	AtModalContent,
	AtModalAction,
	AtMessage,
} from 'taro-ui';

import * as echarts from 'echarts';

import './index.scss';

import RecItemCard from '../../components/rec-item-card/index';

import { getRecList, getRecDetail } from '../../ajax';
import { get } from 'lodash';

export default class Index extends Component {
	constructor(props) {
		super(props);
		this.state = {
			showReason: false,
			recList: [],
		};
	}
	async componentDidMount() {
		//todo: 请求获取推荐列表
		console.log('onready index');
		let res;

		// (async () => {
		res = await getRecList();
		console.log('rqRecList', res);
		// })();

		this.setState({
			recList: res.recList,
		});
		// this.render();
		this.setState({
			chart: echarts.init(document.getElementById('index-chart')),
		});

		console.log('测试', this.state);

		let names = [],
			values = [];
		// const getDetail = async () => {
		// 	for (let i = 0; i < 10; ++i) {
		// 		console.log('in for', this.state.recList[i].movieId);

		// 		let res = await getRecDetail.bind(this, this.state.recList[i].movieId);
		// 		names[i] = res.name;
		// 		values[i] = (this.state.recList[i].grade * 100).toFixed(0);
		// 	}

		// 	console.log('测试2', this.state);
		// };

		// await getDetail();
		for (let i = 0; i < 10; i++) {
			names[i] =
				this.state.recList[i].data.name.length > 4
					? this.state.recList[i].data.name.slice(0, 3) + '...'
					: this.state.recList[i].data.name;
			values[i] = (this.state.recList[i].grade * 100).toFixed(0);
		}
		names.reverse();
		values.reverse();
		this.drawChart(names, values);
	}

	// componentDidShow() {}

	// componentDidHide() {}

	onReady() {
		console.log('onready');
	}
	toShowReason = () => {
		this.setState({ showReason: true });
	};
	toDetail = (id) => {
		//todo: navigate to
		console.log(id);
		Taro.navigateTo({
			url: `/pages/detail/detail?id=${id}`,
		});
	};
	drawChart = async (names, values) => {
		// this.state.recList;
		this.state.chart.setOption({
			title: {
				text: '你可能的感兴趣程度',
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
			xAxis: {
				type: 'value',
				boundaryGap: [0, 0.01],
			},
			yAxis: {
				type: 'category',
				data: names,
			},
			series: [
				{
					// name: '2011年',
					type: 'bar',
					data: values,
				},
			],
		});
	};
	render() {
		// let tmp = 1;
		// let cardList = <RecItemCard data={tmp}></RecItemCard>;
		let cardList,
			shownList = [];
		if (this.state.recList && this.state.recList.length > 0) {
			shownList = this.state.recList.slice(0, 10);
			cardList = shownList.map((el, index) => {
				return (
					<View key={el.movieId} onClick={this.toDetail.bind(this, el.movieId)}>
						<RecItemCard data={el}></RecItemCard>
					</View>
				);
			});
		}
		console.log(this.state.recList, cardList);

		return (
			<View className="index page">
				<AtMessage />
				<View className="page__header index__header">
					<View className="header__title">VMRS</View>
					<AtButton
						className="btn--showReason"
						type="secondary"
						size="small"
						onClick={this.toShowReason}
					>
						查看推荐理由
					</AtButton>
				</View>
				<View className="rec-list-view">{cardList}</View>
				{/* <View className="page__refresh">
					<AtIcon value="reload" size="60" color="#F00"></AtIcon>
				</View> */}
				<AtButton className="page__refresh" type="primary">
					<AtIcon value="reload" size="80" color="#FFF"></AtIcon>
				</AtButton>
				<AtModal
					isOpened={this.state.showReason}
					onClose={this.handleClose}
					onCancel={this.handleCancel}
					onConfirm={this.handleConfirm}
				>
					<AtModalHeader>查看推荐度分析</AtModalHeader>
					<AtModalContent>
						<View>
							<View id="index-chart"></View>
						</View>
					</AtModalContent>
				</AtModal>
			</View>
		);
	}
}
