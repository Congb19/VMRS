import axios from "axios";
import Taro from "@tarojs/taro";
import jwtDecode from "jwt-decode";
// axios.defaults.withCredentials = true; // 跨域带cookie

// axios.defaults.baseURL = "http://www.congb19.top/vmrs/api";
axios.defaults.baseURL = "http://localhost:8002/api";

export const request = async (url, data = {}, type = "GET") => {
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
      console.log("发生error，：", error);
      Taro.atMessage({
        message: `${error.response.data.code} ${error.response.data.msg}`,
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

