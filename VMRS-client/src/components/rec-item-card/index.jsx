import React, { Component } from 'react';
import { View, Text } from '@tarojs/components';
import { AtIcon } from 'taro-ui';
import './index.scss';

import { getRecDetail } from '../../ajax';

export default class RecItemCard extends Component {
	constructor(props) {
		super(props);
		this.state = {
			test: 1,
			data: {
				title: '待加载',
				time: '待加载',
				cat: ['待加载', '待加载'],
				rate: '待加载', //豆瓣评分
			},
		};
	}
	componentWillMount() {}

	async componentDidMount() {
		//todo: 请求详情
		let res;
		console.log('props: ', this.props);

		// (async () => {
		res = await getRecDetail({ goodsId: this.props.data });
		console.log('rqRecDetail', res);
		// })();

		this.setState({
			data: res,
		});
	}

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
							{this.props.data.grade}
						</Text>
						<Text className="card__img__infos__rate">
							<AtIcon value="analytics" size="30" color="#fff"></AtIcon>{' '}
							{this.state.data.rate}
						</Text>
						<Text className="card__img__infos__time">
							{this.state.data.time}
						</Text>
					</View>
				</View>
				<View className="card__title">
					<Text>{this.state.data.title}</Text>
					{/* <br /> */}
					<Text className="card__title__cat">
						{this.state.data.cat.join('，')}
					</Text>
				</View>
			</View>
		);
	}
}
