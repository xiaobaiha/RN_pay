import React from 'react';
import {View, Text, StyleSheet, Alert} from 'react-native';
import { Button, InputItem, Modal } from 'antd-mobile-rn';
import axios from 'axios';
import { preURL } from '../config/axiosConfig';


export default class Signup extends React.Component {
  state = {
    name: '',
    password: ''
  }
  handleSignup = () => {
    // axios handle signup
    axios({
      method: "POST",
      url: preURL + "/Register",
      dataType: "json",
      data: {
        user_name: this.state.name,
        user_password: this.state.password,
      },
      headers: {
        "Content-Type": "application/json;charset=UTF-8"
      }
    }).then(response => {
      if(response.data.Register_result === "ok"){
        Modal.alert("提示", "注册成功",
        [{
          text: '确定', onPress: ()=> {this.props.navigation.navigate('Login')}
        }]);
      }
      else {
        Modal.alert("注册错误", response.data.Register_result);
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
