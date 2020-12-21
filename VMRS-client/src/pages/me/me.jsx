import React, { Component } from 'react'
import { View, Text } from '@tarojs/components'
import { AtForm, AtInput,AtButton, AtTag, AtMessage } from 'taro-ui'

import { getDate, signin, signup } from "../../ajax";

import './me.scss'

export default class Me extends Component {
  constructor () {
    super(...arguments);
    this.state = {
      isLoggedIn: true,
      username: '',
      password: ''
    }
  }
  handleUsernameChange (username) {
    this.setState({
      username
    })
    console.log(this.state);
  }
  handlePasswordChange (password) {
    this.setState({
      password
    })
    console.log(this.state);
  }
  handleReset() {

  }

  onReady() {
    console.log("onready me");
    (async () => {
			let res = await getDate();
			console.log("rqDate", res);
    })();
  }

  signIn() {
    console.log("登录ing");
    (async () => {
      try {
        let res = await signin(this.state);
        if (res?.code == 200) {
          this.setState({
            isLoggedIn: true,
          })
        }
      } catch (err) {
			  console.log("errrrrr", err);
      }
    })();
  }
  signUp() {
    let data = {
      username: '测试123',
      password: '测试222'
    };
    (async () => {
			let res = await signup(data);
			console.log("注册ing", res);
    })();
  }
  signOut() {

  }

  UserPage() {
    return <View className='me'>
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
    </View>
  }
  GuestPage() {
    return <View>
      <AtMessage />
      <AtForm
        onSubmit={this.signIn.bind(this)}
        onReset={this.handleReset.bind(this)}
      >
        <AtInput 
          name='username' 
          title='用户名' 
          type='text' 
          placeholder='用户名' 
          value={this.state.username} 
          onChange={this.handleUsernameChange.bind(this)} 
        />
        <AtInput 
          name='password' 
          title='密码' 
          type='text' 
          placeholder='密码' 
          value={this.state.password} 
          onChange={this.handlePasswordChange.bind(this)} 
        />
        <AtButton formType='submit'>登录</AtButton>
        <AtButton formType='reset'>重置</AtButton>
      </AtForm>
      {/* TODO: 一个模态框，注册页面 */}
    </View>
  }


  render() {
    if (this.state.isLoggedIn) return this.UserPage();
    else return this.GuestPage();
  }
}
