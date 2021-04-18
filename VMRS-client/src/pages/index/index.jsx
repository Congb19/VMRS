import React, { Component } from 'react';
import Taro from '@tarojs/taro';
import { View, Text } from '@tarojs/components';
import './index.scss';

import RecItemCard from '../../components/rec-item-card/index';

export default class Index extends Component {
	constructor(props) {
		super(props);
		this.state = {
			recList: [
				{
					movieId: 1,
					rate: 9.9,
					rec: 5,
					time: '120:00',
					title: '你好你好2你好你好你好你好你好你好',
					cat: ['奇幻', '悬疑'],
				},
				{
					movieId: 2,
					rate: 8.8,
					rec: 5,
					time: '88:00',
					title: '你好你好你好啊啊啊饿啊 你好',
					cat: ['奇幻', '悬疑'],
				},
				{
					movieId: 3,
					rate: 8.8,
					rec: 5,
					time: '88:00',
					title: '你好啊啊啊饿啊啊啊饿你好你好你好',
					cat: ['奇幻', '悬疑'],
				},
				{
					movieId: 4,
					rate: 8.8,
					rec: 5,
					time: '88:00',
					title: '你好是是你好你好你好啊啊啊饿啊啊啊啊',
					cat: ['奇幻', '悬疑'],
				},
				{
					movieId: 5,
					rate: 8.8,
					rec: 5,
					time: '88:00',
					title: '你好你好你好你a a a好',
					cat: ['奇幻', '悬疑'],
				},
				{
					movieId: 6,
					rate: 8.8,
					rec: 5,
					time: '88:00',
					title: '你好你好你好你a a a好',
					cat: ['奇幻', '悬疑'],
				},
				{
					movieId: 7,
					rate: 8.8,
					rec: 5,
					time: '88:00',
					title: '你好你好你好你a a a好',
					cat: ['奇幻', '悬疑'],
				},
			],
		};
	}
	componentDidMount() {
		//todo: 请求获取推荐列表
	}

	// componentDidShow() {}

	// componentDidHide() {}

	onReady() {
		console.log('onready');
	}
	toDetail = (id) => {
		//todo: navigate to
		console.log(id);
		Taro.navigateTo({
			url: `/pages/detail/detail?id=${id}`,
		});
	};
	render() {
		let cardList = this.state.recList.map((el) => {
			return (
				<View key={el.movieId} onClick={this.toDetail.bind(this, el.movieId)}>
					<RecItemCard data={el}></RecItemCard>
				</View>
			);
		});
		console.log(this.state.recList, cardList);
		return (
			<View className="index page">
				<View className="page__header">VMRS</View>
				<View className="rec-list-view">{cardList}</View>
			</View>
		);
	}
}
