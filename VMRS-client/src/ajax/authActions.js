import axios from 'axios';
import Taro from '@tarojs/taro';
import jwtDecode from 'jwt-decode';

import { request } from './index';

import setAuthorizationToken from '../utils/setAuthorizationToken';
import { SET_CURRENT_USER } from '../constants';

//action
export const setCurrentUser = (user) => {
	return {
		type: SET_CURRENT_USER,
		user,
	};
};

// 注册
export const signup = async (data) => {
	const res = await request({
		url: `/users/signup`, 
		data,
		method: 'POST'
	});
	console.log('signup, res: ', res);
	if (res) {
		const token = res.data.token;
		localStorage.setItem('token', token);
		//设置一下，本次注册并登录以后，未来就都把token在头部传给服务器
		setAuthorizationToken(token);

		console.log('token decode: ', jwtDecode(token));
	} else {
	}
	return res;
};
// 登录
export const signin = async (data) => {
	return async (dispatch) => {
		const res = await request({
			url: `/users/signin`,
			data,
			method: 'POST'
		});
		const token = res.data.token;
		localStorage.setItem('token', token);
		//设置一下，本次登录以后，未来就都把token在头部传给服务器
		setAuthorizationToken(token);
		// console.log("token decode: ", jwtDecode(token));

		//触发action，更新state
		dispatch(setCurrentUser(jwtDecode(token)));
	};
};
