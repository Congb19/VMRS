import React, { Component } from 'react'
import { View, Text } from '@tarojs/components'
// import './index.scss'

export default class Me extends Component {

  componentWillMount () { }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide() { }

  onReady() {
    console.log("onready me");
  }

  render () {
    return (
      <View className='me'>
        <Text>me</Text>
      </View>
    )
  }
}
