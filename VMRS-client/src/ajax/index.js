
import Taro from '@tarojs/taro';
import jwtDecode from 'jwt-decode';

const baseUrl = 'http://localhost:8002/api';

export const request = async (params) => {
	params.url = baseUrl + params.url;
	//taro
	try {
		let res = await Taro.request(params);
		console.log('正常返回：', res);
		return res.data;
	} catch (error) {
		console.log('发生error，：', error);
		Taro.atMessage({
			message: `发生错误`,
			type: 'error',
		});
	}
};

// http://www.congb19.top/api/public/getDate
/**
 * 日期 getDate
 * @param null
 */
export const getDate = async () => {
	const res = await request({
		url: `/public/getDate`,
		method: `GET`,
	});
	return res;
};
