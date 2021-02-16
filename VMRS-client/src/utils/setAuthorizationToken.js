import Taro from '@tarojs/taro';
// import axios from 'axios';

const setAuthorizationToken = (token) => {
	//如果有token就带过去
	if (token) {
		// axios写法
		// axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
		// taro拦截器写法
		const interceptor = (chain) => {
			let requestParams = chain.requestParams;
			requestParams.header = {
				Authorization: `Bearer ${token}`,
			};
			return chain.proceed(requestParams).then((res) => {
				return res;
			});
		};
		Taro.addInterceptor(interceptor);
		console.log('bearer ok');
	} else {
		// axios写法
		// delete axios.defaults.headers.common['Authorization'];
		// taro拦截器 好像不用删除

		console.log('unbearer ok');
	}
};

export default setAuthorizationToken;
