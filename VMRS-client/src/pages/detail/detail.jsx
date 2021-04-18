import React, { Component } from 'react';
import { View, Text } from '@tarojs/components';
import { getCurrentInstance } from '@tarojs/taro';
import './detail.scss';

export default class Detail extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}
	componentDidMount() {
		this.setState({ movieId: getCurrentInstance().router.params });
		// console.log(getCurrentInstance().router.params);
		//todo: 请求获取推荐详情数据
	}

	onReady() {
		console.log('onready detail');
	}
	render() {
		return (
			<View className="detail page">
				<View className="page__header">VMRS-推荐详情</View>
			</View>
		);
	}
}
