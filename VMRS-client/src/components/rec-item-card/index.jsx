import React, { Component } from 'react';
import { View, Text } from '@tarojs/components';
import { AtIcon } from 'taro-ui';
import './index.scss';

export default class RecItemCard extends Component {
	constructor(props) {
		super(props);
		this.state = {
			test: 1,
		};
		console.log(this.state);
	}
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
							<AtIcon value="star" size="30" color="#fff"></AtIcon>{' '}
							{this.props.data.rec}
						</Text>
						<Text className="card__img__infos__rate">
							<AtIcon value="analytics" size="30" color="#fff"></AtIcon>{' '}
							{this.props.data.rate}
						</Text>
						<Text className="card__img__infos__time">
							{this.props.data.time}
						</Text>
					</View>
				</View>
				<View className="card__title">
					<Text>{this.props.data.title}</Text>
					{/* <br /> */}
					<Text className="card__title__cat">
						{this.props.data.cat.join('，')}
					</Text>
				</View>
			</View>
		);
	}
}
