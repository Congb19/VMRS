import React, { Component } from 'react';
import { View, Text, ScrollView } from '@tarojs/components';
import './index.scss';

import { getDate } from '../../ajax';
import { AtButton } from 'taro-ui';

import RecItemCard from '../../components/rec-item-card/index';

export default class Index extends Component {
	componentDidMount() {}

	// componentDidShow() {}

	// componentDidHide() {}

	onReady() {
		console.log('onready');
	}
	onScrollToUpper = () => {};
	onScroll = (e) => {
		console.log(e.detail);
	};
	render() {
		const scrollStyle = {
			height: '690px',
		};
		const scrollTop = 0;
		const Threshold = 20;
		return (
			<View className="index">
				<View className="index__header">VMRS</View>
				<View className="rec-list-view">
					<ScrollView
						scrollY
						scrollWithAnimation
						scrollTop={scrollTop}
						style={scrollStyle}
						lowerThreshold={Threshold}
						upperThreshold={Threshold}
						onScrollToUpper={this.onScrollToUpper}
						onScroll={this.onScroll}
					>
						{/* 此处用列表渲染 */}
						<RecItemCard></RecItemCard>
						<RecItemCard></RecItemCard>
						<RecItemCard></RecItemCard>
						<RecItemCard></RecItemCard>
						<RecItemCard></RecItemCard>
						<RecItemCard></RecItemCard>
					</ScrollView>
				</View>
			</View>
		);
	}
}
