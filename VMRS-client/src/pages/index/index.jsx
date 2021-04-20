import React, { Component } from 'react';
import Taro from '@tarojs/taro';
import { View, Text } from '@tarojs/components';
import {
	AtIcon,
	AtButton,
	AtModal,
	AtModalHeader,
	AtModalContent,
	AtModalAction,
} from 'taro-ui';
import './index.scss';

import RecItemCard from '../../components/rec-item-card/index';

export default class Index extends Component {
	constructor(props) {
		super(props);
		this.state = {
			showReason: false,
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
					<AtModalHeader>推荐理由分析</AtModalHeader>
					<AtModalContent>
						<View>123</View>
					</AtModalContent>
				</AtModal>
			</View>
		);
	}
}
