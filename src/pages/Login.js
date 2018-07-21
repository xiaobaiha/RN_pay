import React from 'react';
import { StyleSheet, Text, View, Alert, AsyncStorage } from 'react-native';
import { Button, InputItem, List, Modal } from 'antd-mobile-rn';
import axios from 'axios';
import { preURL } from '../config/axiosConfig'

export default class Login extends React.Component {
  state = {
    name: '',
    password: ''
  }
  componentWillMount(){
    // async 获取用户信息 若存在，跳转Home
    this.getUserName();
  }
  async getUserName(){
    let username = await AsyncStorage.getItem('username');
    if(username){
      this.props.navigation.navigate('Home');
    }
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
      //Alert.alert("标题", response.data.money)
      if(response.data.Login_result === "ok"){
        //储存登录用户数据到AsyncStorage，数组与int格式的数据存为json格式再储存
        //AsyncStorage.clear();
        let Addresses = { "addresses" : response.data.addresses };
        AsyncStorage.setItem('addresses', JSON.stringify(Addresses));
        let Id = { "id" : response.data.id };
        AsyncStorage.setItem('id', JSON.stringify(Id));
        AsyncStorage.setItem('tel', response.data.tel);
        AsyncStorage.setItem('username', response.data.username);
        //AsyncStorage.setItem("money",response.data.money);
        this.props.navigation.navigate('Home');
      }
      else{
        Modal.alert("登录错误", response.data.Login_result);
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
