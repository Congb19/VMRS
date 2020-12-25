import React, { Component } from "react";
import Taro from "@tarojs/taro";
import { View, Text } from "@tarojs/components";
import { AtForm, AtInput, AtButton, AtTag, AtMessage } from "taro-ui";
import { connect } from "react-redux";

import { getDate } from "../../ajax";
import { signin, signup } from "../../ajax/authActions";

import "./me.scss";

@connect(
  ({ authActions }) => ({
    authActions,
  }),
  (dispatch) => ({
    signin(data) {
      signin(data).then((res) => dispatch(res));
    },
    signup() {
      signup().then((res) => dispatch(res));
    },
  })
)
class Me extends Component {
  constructor() {
    super(...arguments);
    this.state = {
      isLoggedIn: false,
      username: "",
      password: "",
    };
  }
  
  handleUsernameChange(username) {
    this.setState({
      username,
    });
    console.log(this.state);
  }
  handlePasswordChange(password) {
    this.setState({
      password,
    });
    console.log(this.state);
  }
  handleReset() {}

  onReady() {
    console.log("onready me");
    (async () => {
      let res = await getDate();
      console.log("rqDate", res);
    })();
  }

  signIn = (e) => {
    console.log("登录ing");
    (async () => {
      try {
        let res = await this.props.signin(this.state);
        // let res = await signin(this.state);
        console.log("res: ", res);
        if (res?.code == 200) {
          this.setState({
            isLoggedIn: true,
          });
          Taro.atMessage({
            message: "登录成功",
            type: "success",
          });
        }
      } catch (err) {
        console.log("errrrrr", err);
      }
    })();
  };
  signUp() {
    (async () => {
      let res = await signup(data);
      console.log("注册ing", res);
    })();
  }
  signOut() {}

  UserPage() {
    return (
      <View className="me">
        <AtMessage />
        <View className="me-banner"></View>
        <View className="me-profile">
          <View className="me-profile__avatar"></View>
          <View className="me-profile__nickname">Congb19</View>
          <View className="me-profile__userid">通行证ID：7777</View>
          <View className="me-profile__tags">
            <AtTag active>原神 Lv1</AtTag>
            <AtTag active>崩坏3 Lv1</AtTag>
          </View>
          <View className="me-profile__data">
            <Text className="me-profile__data--followers">{1} 粉丝</Text>
            <Text className="me-profile__data--following">{1} 关注</Text>
            <Text className="me-profile__data--likes">{1} 获赞</Text>
          </View>
          <AtButton onClick={this.onReady}>登录</AtButton>
        </View>
      </View>
    );
  }
  GuestPage() {
    return (
      <View>
        <AtMessage />
        <AtForm
          onSubmit={this.signIn.bind(this)}
          onReset={this.handleReset.bind(this)}
        >
          <AtInput
            name="username"
            title="用户名"
            type="text"
            placeholder="用户名"
            value={this.state.username}
            onChange={this.handleUsernameChange.bind(this)}
          />
          <AtInput
            name="password"
            title="密码"
            type="text"
            placeholder="密码"
            value={this.state.password}
            onChange={this.handlePasswordChange.bind(this)}
          />
          <AtButton formType="submit">登录</AtButton>
          <AtButton formType="reset">重置</AtButton>
        </AtForm>
      </View>
    );
  }

  render() {
    if (this.state.isLoggedIn) return this.UserPage();
    else return this.GuestPage();
  }
}
export default connect(null, { signin })(Me);
