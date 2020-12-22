import axios from "axios";
import Taro from "@tarojs/taro";
import jwtDecode from "jwt-decode";

import { request } from "./index"

import setAuthorizationToken from "../utils/setAuthorizationToken";

// 注册
export const signup = async (data) => {
  const res = await request(`/users/signup`, data, "POST");
  console.log("signup, res: ", res);
  if (res) {
    const token = res.data.token;
    localStorage.setItem("token", token);
    //设置一下，本次注册并登录以后，未来就都把token在头部传给服务器
    setAuthorizationToken(token);

    console.log("token decode: " ,jwtDecode(token));
  } else {
  }
  return res;
};
// 登录
export const signin = async (data) => {
  const res = await request(`/users/signin`, data, "POST");
  console.log("signin, res: ", res);
  if (res) {
    const token = res.data.token;
    localStorage.setItem("token", token);
    //设置一下，本次登录以后，未来就都把token在头部传给服务器
    setAuthorizationToken(token);

    console.log("token decode: ", jwtDecode(token));
  } else {
  }
  return res;
};