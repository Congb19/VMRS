import React from "react"
import { Component } from "react";
import { Provider } from "react-redux";

import configStore from "./store";

import setAuthorizationToken from "./utils/setAuthorizationToken"

import "taro-ui/dist/style/index.scss";
import "./app.scss";

const store = configStore();

setAuthorizationToken(localStorage.token);

class App extends Component {
  componentDidMount() {}

  componentDidShow() {}

  componentDidHide() {}

  componentDidCatchError() {}

  // this.props.children 是将要会渲染的页面
  render() {
    return (<Provider store={store}> {this.props.children} </Provider>);
  }
}

export default App;
