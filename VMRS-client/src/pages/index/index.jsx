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
import { connect } from 'react-redux';
import { saveData } from '../../ajax/dataActions';

import * as echarts from 'echarts';

import './index.scss';

import RecItemCard from '../../components/rec-item-card/index';

import { getRecList, getRecDetail } from '../../ajax';
import { get } from 'lodash';

@connect(
	({ data }) => ({
		data,
	}),
	(dispatch) => ({
		saveData(data) {
			console.log('测试2', data);
			dispatch(saveData(data));
		},
	})
)
class Index extends Component {
	componentWillReceiveProps(nextProps) {
		console.log(this.props, nextProps);
	}
	constructor(props) {
		super(props);
		this.state = {
			showReason: false,
			recList: [],
			shownList: [],
		};
	}
	async componentDidMount() {
		//todo: 请求获取推荐列表
		console.log('onready index');
		let res;

		res = await getRecList();
		console.log('rqRecList', res);

		this.setState({
			recList: res.recList,
		});

		console.log('测试', this.state.recList);
		// this.props.saveData(res.recList);

		this.refresh();

		//draw chart
		this.setState({
			chart: echarts.init(document.getElementById('index-chart')),
		});

		let names = [],
			values = [];
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

	onReady() {
		console.log('onready');
	}
	toShowReason = () => {
		this.setState({ showReason: true });
	};
	toDetail = (id, grade) => {
		//todo: navigate to
		console.log(id);
		//把该电影的数据存入redux
		for (let i = 0; i < this.state.recList.length; i++) {
			if (this.state.recList[i].movieId == id) {
				this.props.saveData(this.state.recList[i]);
				break;
			}
		}
		Taro.navigateTo({
			url: `/pages/detail/detail?id=${id}&grade=${grade}`,
		});
	};
	refresh = async () => {
		// await setTimeout(() => {}, 500);
		let shownList = [];
		for (let i = 0; i < 10 && i < this.state.recList.length / 5; i++) {
			let rand = Math.floor(5 * Math.random());
			shownList.push(this.state.recList[5 * i + rand]);
		}
		this.setState({ shownList });
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
		let cardList,
			shownList = [];
		if (this.state.recList && this.state.recList.length > 0) {
			// shownList = this.state.recList.slice(0, 10);
			shownList = this.state.shownList;
			cardList = shownList.map((el, index) => {
				return (
					<View
						key={el.movieId}
						onClick={this.toDetail.bind(this, el.movieId, el.grade)}
					>
						<RecItemCard data={el}></RecItemCard>
					</View>
				);
			});
		}
		console.log('shownlist', this.state.shownList);

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
				<AtButton
					className="page__refresh"
					type="primary"
					onClick={this.refresh}
				>
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
export default Index;
