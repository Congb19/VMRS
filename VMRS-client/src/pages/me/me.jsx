import React, { Component } from 'react';
import Taro from '@tarojs/taro';
import { View, Text } from '@tarojs/components';
import { AtForm, AtInput, AtButton, AtTag, AtMessage } from 'taro-ui';
import { connect } from 'react-redux';

import { getDate, getUserTags } from '../../ajax';
import { signin, signup } from '../../ajax/authActions';

import * as echarts from 'echarts';

import './me.scss';

@connect(
	({ authActions }) => ({
		authActions,
	}),
	(dispatch) => ({
		signin(data) {
			signin(data).then((res) => {
				console.log('dispatch ok, res: ', res);
				return dispatch(res);
			});
		},
		signup() {
			signup().then((res) => dispatch(res));
		},
	})
)
class Me extends Component {
	constructor() {
		super(...arguments);
		this.state = {
			isLoggedIn: false,
			username: '',
			password: '',
		};
	}

	async componentDidMount() {
		console.log('onready me');
		// (async () => {
		let res = await getDate();
		console.log('rqDate', res);
		// })();
		const { isAuthenticated, user } = this.props.auth;
		if (isAuthenticated) {
			let res = await getUserTags({ userId: user.username });
			let tags = res.res;
			//draw chart
			this.setState({
				chart: echarts.init(document.getElementById('me-chart')),
			});
			let maxes = [],
				names = [],
				values = [];
			for (let i = 0; i < 6; i++) {
				names.push(tags[i].name);
				values.push(tags[i].value);
				maxes.push({ name: tags[i].name, max: tags[0].value });
			}
			this.drawChart(maxes, names, values);
		}
	}
	drawChart = async (maxes, names, values) => {
		this.state.chart.setOption({
			title: {
				text: '我的观影标签~',
			},
			legend: {
				data: ['我的标签'],
			},
			radar: {
				// shape: 'circle',
				// indicator: [
				// 	{ name: '销售（Sales）', max: 6500 },
				// 	{ name: '管理（Administration）', max: 16000 },
				// 	{ name: '信息技术（Information Technology）', max: 30000 },
				// 	{ name: '客服（Customer Support）', max: 38000 },
				// 	{ name: '研发（Development）', max: 52000 },
				// 	{ name: '市场（Marketing）', max: 25000 },
				// ],
				indicator: maxes,
			},
			series: [
				{
					name: '预算 vs 开销（Budget vs spending）',
					type: 'radar',
					data: [
						{
							value: values,
							name: '喜爱次数',
						},
					],
				},
			],
		});
	};
	handleUsernameChange(username) {
		this.setState({
			username,
		});
		console.log(this.state);
	}
	handlePasswordChange(password) {
		this.setState({
			password,
		});
		console.log(this.state);
	}
	handleReset() {}

	signIn = (e) => {
		console.log('登录ing');
		(async () => {
			try {
				let res = await this.props.signin(this.state);
				// let res = await signin(this.state);
				console.log('res: ', res);
				if (res?.code == 200) {
					this.setState({
						isLoggedIn: true,
					});
					Taro.atMessage({
						message: '登录成功',
						type: 'success',
					});
				}
			} catch (err) {
				console.log('errrrrr', err);
			}
		})();
	};
	signUp() {
		(async () => {
			let res = await signup(data);
			console.log('注册ing', res);
		})();
	}
	signOut() {}

	render() {
		const { isAuthenticated, user } = this.props.auth;
		const UserPage = (
			<View className="me">
				<AtMessage />
				<View className="me-banner"></View>
				<View className="me-profile">
					<View className="me-profile__avatar"></View>
					<View className="me-profile__nickname">{user.username}</View>
					<View className="me-profile__userid">通行证ID：{user.userid}</View>
					<View className="me-profile__tags">
						<AtTag active>原神 Lv1</AtTag>
						<AtTag active>崩坏3 Lv1</AtTag>
					</View>
					<View className="me-profile__data">
						<Text className="me-profile__data--followers">{1} 粉丝</Text>
						<Text className="me-profile__data--following">{1} 关注</Text>
						<Text className="me-profile__data--likes">{1} 获赞</Text>
					</View>

					<View id="me-chart" className="view__chart"></View>
					<AtButton onClick={this.onReady}>退出登录</AtButton>
				</View>
			</View>
		);
		const GuestPage = (
			<View>
				<AtMessage />
				<AtForm
					onSubmit={this.signIn.bind(this)}
					onReset={this.handleReset.bind(this)}
				>
					<AtInput
						name="username"
						title="用户名"
						type="text"
						placeholder="用户名"
						value={this.state.username}
						onChange={this.handleUsernameChange.bind(this)}
					/>
					<AtInput
						name="password"
						title="密码"
						type="text"
						placeholder="密码"
						value={this.state.password}
						onChange={this.handlePasswordChange.bind(this)}
					/>
					<AtButton formType="submit">登录</AtButton>
					<AtButton formType="reset">重置</AtButton>
				</AtForm>
			</View>
		);
		if (isAuthenticated) return UserPage;
		// if (this.state.isLoggedIn) return UserPage;
		else return GuestPage;
	}
}

const mapStateToProps = (state) => {
	return {
		auth: state.auth,
		user: state.user,
	};
};

export default connect(mapStateToProps, { signin })(Me);
