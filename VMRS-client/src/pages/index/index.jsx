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
} from 'taro-ui';
import './index.scss';

import RecItemCard from '../../components/rec-item-card/index';

import { getRecList } from '../../ajax';
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
		// let tmp = 1;
		// let cardList = <RecItemCard data={tmp}></RecItemCard>;
		let cardList;
		if (this.state.recList && this.state.recList.length > 0)
			cardList = this.state.recList.map((el) => {
				// console.log('el; ', el);
				return (
					<View key={el.goodsId} onClick={this.toDetail.bind(this, el.goodsId)}>
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
