import axios from "axios";
import Taro from "@tarojs/taro";
import jwtDecode from "jwt-decode";
// axios.defaults.withCredentials = true; // 跨域带cookie
// axios.defaults.baseURL = "http://www.congb19.top/api";
axios.defaults.baseURL = "http://localhost:8002/api";

export const gainError = (status) => {
  let errMsg = "";
  switch (status) {
    case 400:
      errMsg = "400错误请求";
      break;
    case 401:
      errMsg = "401未授权，请重新登录";
      break;
    case 403:
      errMsg = "403拒绝访问";
      break;
    case 404:
      errMsg = "404请求错误,未找到该资源";
      break;
    case 405:
      errMsg = "405请求方法未允许";
      break;
    case 408:
      errMsg = "408请求超时";
      break;
    case 500:
      errMsg = "500服务器端出错";
      break;
    case 501:
      errMsg = "501网络未实现";
      break;
    case 502:
      errMsg = "502网络错误";
      break;
    case 503:
      errMsg = "503服务不可用";
      break;
    case 504:
      errMsg = "504网络超时";
      break;
    case 505:
      errMsg = "505http版本不支持该请求";
      break;
    default:
      errMsg = `${status}连接错误`;
  }
  return errMsg;
};
const request = async (url, data = {}, type = "GET") => {
  let promise;
  try {
    if (type === "GET") {
      promise = await axios.get(url, { params: data });
    } else {
      promise = await axios.post(url, data);
    }
    return promise.data;
  } catch (error) {
    if (error?.response) {
      // message.error(gainError(error.response.status));
      console.log("发生error，：", error);
      Taro.atMessage({
        message: gainError(error.response.status),
        type: "error",
      });
    } else {
      Taro.atMessage({
        message: "网络错误",
        type: "error",
      });
    }
    if (error?.response && String(error.response.status) === "401") {
      return {
        status: "401",
      };
    }
  }
};

// http://www.congb19.top/api/public/getDate
/**
 * 日期 getDate
 * @param null
 */
export const getDate = async () => {
  const res = await request(`/public/getDate`, {}, "GET");
  let data;
  try {
    if (res.code === 200) {
      data = res["data"];
    }
  } catch (error) {}
  return data;
};

// 注册
export const signup = async (data) => {
  const res = await request(`/users/signup`, data, "POST");
  console.log("signup, res: ", res);
  if (res) {
    const token = res.token;
    localStorage.setItem("token", token);
    console.log(jwtDecode(token));
  } else {
  }
};
// 登录
export const signin = async (data) => {
  const res = await request(`/users/signin`, data, "POST");
  console.log("signin, res: ", res);
  if (res) {
    const token = res.token;
    localStorage.setItem("token", token);
    console.log(jwtDecode(token));
  } else {
  }
};
