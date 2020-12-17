import React, { Component } from 'react'
import { View, Text } from '@tarojs/components'
import './index.scss'

import { AtButton } from 'taro-ui'

export default class Index extends Component {

  componentWillMount () { }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide() { }

  onReady() {
    console.log("onready");
  }
  
  go() {
    console.log(123);
  }

  render () {
    return (
      <View className='index'>
        <Text>VMRS-client</Text>
        <AtButton type='primary' onClick={this.go}>测试按钮</AtButton>
      </View>
    )
  }
}
