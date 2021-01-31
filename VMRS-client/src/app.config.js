export default {
	pages: ['pages/index/index', 'pages/me/me'],
	tabBar: {
		list: [
			{
				iconPath: 'resource/hot.png',
				selectedIconPath: 'resource/hot_on.png',
				pagePath: 'pages/index/index',
				text: '首页',
			},
			{
				iconPath: 'resource/hot.png',
				selectedIconPath: 'resource/test.gif',
				pagePath: 'pages/me/me',
				text: '我的',
			},
		],
		color: '#000',
		selectedColor: '#56abe4',
		backgroundColor: '#fff',
		borderStyle: 'black',
	},
	window: {
		backgroundTextStyle: 'light',
		navigationBarBackgroundColor: '#fff',
		navigationBarTitleText: 'WeChat',
		navigationBarTextStyle: 'black',
	},
};
