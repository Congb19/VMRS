//如果有token就带过去
if (token) {
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
  console.log('unbearer ok');
}