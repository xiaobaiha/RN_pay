import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button, InputItem, List } from 'antd-mobile-rn';
import axios from 'axios';
import { preURL } from '../config/axiosConfig'

export default class Login extends React.Component {
  state = {
    name: '',
    password: ''
  }
  handleLogin = () => {
    // axios 请求登录
    //alert(this.state.name)
    axios({
      method: 'POST',
      url: preURL + '/Login',
      dataType: "json",
      data: {
        user_name: this.state.name,
        user_password: this.state.password,
      },
      headers: {
        "Content-Type": "application/json;charset=UTF-8"
      }
    }).then(response => {
      console.log(response)
      if(response.status === 200){
        this.props.navigation.navigate('Home');
      }
      else if(response.status === 1001){
        
      }
    })
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
        <Button type='primary' onClick={this.handleLogin}>登录</Button>
        <Button onClick={() => this.props.navigation.navigate('Signup')}>没有账号？去注册吧</Button>
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
