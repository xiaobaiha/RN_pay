import React from 'react';
import {View,Text,StyleSheet} from 'react-native';
import { Button, InputItem } from 'antd-mobile-rn';


export default class Signup extends React.Component {
  state = {
    remains: 0
  }
  handleSignup = () => {
    // axios handle signup
  }
  render() {
    return (
      <View>
        <InputItem
            onErrorPress={() => alert('clicked me')}
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
            onErrorPress={() => alert('clicked me')}
            onChange={(value) => {
              this.setState({
                password: value,
              });
            }}
            type='password'
            placeholder="密码"
          >
            密码
          </InputItem>
          <InputItem
            onErrorPress={() => alert('clicked me')}
            onChange={(value) => {
              this.setState({
                password: value,
              });
            }}
            type='password'
            placeholder="请再输入一遍密码"
          >
            重复密码
          </InputItem>
          <Button type='primary' onClick={this.handleSignup}>注册</Button>
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