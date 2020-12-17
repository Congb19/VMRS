import React, { Component } from 'react'
import { View, Text } from '@tarojs/components'
import { AtButton, AtTag, AtMessage } from 'taro-ui'

import { getDate, signin, signup } from "../../ajax";

import './me.scss'

export default class Me extends Component {

  componentWillMount () { }

  componentDidMount() {
    (async () => {
			let res = await getDate();
			console.log("rqDate", res);
    })();
  }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide() { }

  onReady() {
    console.log("onready me");
  }
  signin() {

  }
  signup() {
    let data = {
      username: '测试123',
      password: '测试222'
    };
    (async () => {
			let res = await signup(data);
			console.log("注册ing", res);
    })();
  }
  logout() {

  }

  render () {
    return (
      <View className='me'>
        <AtMessage />
        <View className='me-banner'></View>
        <View className='me-profile'>
          <View className='me-profile__avatar'></View>
          <View className='me-profile__nickname'>Congb19</View>
          <View className='me-profile__userid'>通行证ID：7777</View>
          <View className='me-profile__tags'>
            <AtTag active>原神 Lv1</AtTag>
            <AtTag active>崩坏3 Lv1</AtTag>
          </View>
          <View className='me-profile__data'>
            <Text className='me-profile__data--followers'>{ 1 } 粉丝</Text>
            <Text className='me-profile__data--following'>{ 1 } 关注</Text>
            <Text className='me-profile__data--likes'>{ 1 } 获赞</Text>
          </View>
        </View>
        <View>
          <AtButton onClick={this.signup}>注册</AtButton>
          <AtButton onClick={this.signin}>登录</AtButton>
          <AtButton onClick={this.logout}>退出</AtButton>
        </View>
      </View>
    )
  }
}
