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
if (localStorage.token) {
	setAuthorizationToken(localStorage.token);
	//触发action，更新state
	store.dispatch(setCurrentUser(jwtDecode(localStorage.token)));
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
