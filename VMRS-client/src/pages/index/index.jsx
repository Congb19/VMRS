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
  
  go() {
    console.log(123);
  }

  render () {
    return (
      <View className='index'>
        <Text>VMRS-client</Text>
        <AtButton type='primary' onClick={this.go}>按钮文案</AtButton>
      </View>
    )
  }
}
