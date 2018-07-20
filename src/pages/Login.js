import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button, InputItem, List } from 'antd-mobile-rn';

export default class Login extends React.Component {
  state = {
    name: '',
    password: ''
  }
  handleLogin() {
    // axios 请求登录
  }
  render() {
    return (
      <View>
        <InputItem
            clear
            onErrorPress={() => alert('clicked me')}
            value={this.state.value}
            onChange={(value) => {
              this.setState({
                name: value,
              });
            }}
            placeholder="用户名"
          >
            用户名
          </InputItem>
          <InputItem
            clear
            onErrorPress={() => alert('clicked me')}
            value={this.state.value}
            onChange={(value) => {
              this.setState({
                password: value,
              });
            }}
            placeholder="密码"
          >
            密码
          </InputItem>
          <Button type='primary' onClick={this.handleLogin}>登录</Button>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
