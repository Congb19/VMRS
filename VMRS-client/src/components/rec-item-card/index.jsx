import React, { Component } from 'react';
import { View, Text } from '@tarojs/components';
import { AtIcon } from 'taro-ui';
import './index.scss';

export default class RecItemCard extends Component {
	componentWillMount() {}

	componentDidMount() {}

	componentWillUnmount() {}

	componentDidShow() {}

	componentDidHide() {}

	onReady() {
		console.log('onready');
	}

	go() {
		console.log(123);
	}

	render() {
		return (
			<View className="rec-item-card">
				<View className="card__img">
					<View className="card__img__infos">
						<Text className="card__img__infos__rec">
							<AtIcon value="star" size="30" color="#fff"></AtIcon> 7.9
						</Text>
						<Text className="card__img__infos__rate">
							<AtIcon value="analytics" size="30" color="#fff"></AtIcon> 9.8
						</Text>
						<Text className="card__img__infos__time">120:00</Text>
					</View>
				</View>
				<View className="card__title">
					<Text>电影标题电影标题电影标题电影标题</Text>
					<Text>悬疑，奇幻</Text>
				</View>
			</View>
		);
	}
}
