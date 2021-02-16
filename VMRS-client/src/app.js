import Taro from '@tarojs/taro';
import React from 'react';
import jwtDecode from 'jwt-decode';
import { Component } from 'react';
import { Provider } from 'react-redux';

import configStore from './store';

import setAuthorizationToken from './utils/setAuthorizationToken';
import { setCurrentUser } from './ajax/authActions';

import 'taro-ui/dist/style/index.scss';
import './app.scss';

const store = configStore();

//刷新or刚进入的时候，检查登录状态。

// 原生local写法
// if (localStorage.token) {
// 	setAuthorizationToken(localStorage.token);
// 	//触发action，更新state
// 	store.dispatch(setCurrentUser(jwtDecode(localStorage.token)));
// }

// taro storage写法
try {
	var value = Taro.getStorageSync('token');
	if (value) {
		setAuthorizationToken(value);
		//触发action，更新state
		store.dispatch(setCurrentUser(jwtDecode(value)));
	}
} catch (e) {
	console.log("取token失败", e);
}

class App extends Component {
	componentDidMount() {}

	componentDidShow() {}

	componentDidHide() {}

	componentDidCatchError() {}

	// this.props.children 是将要会渲染的页面
	render() {
		return <Provider store={store}> {this.props.children} </Provider>;
	}
}

export default App;
