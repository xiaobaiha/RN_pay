import React from 'react';
import { StyleSheet, Text, View, AsyncStorage, Alert } from 'react-native';
import axios from 'axios';
import { preURL } from '../config/axiosConfig';
import { Button, InputItem, List, Modal } from 'antd-mobile-rn';

export default class ChangePassword extends React.Component {
  state = {
    currentStep: 0,
    currentPassword: '',
    newPassword: '',
    newPasswordRepeat: ''
  }
  handleNext = () => {
    // axios 检验密码是否正确
    this.checkPassword();
  }
  async checkPassword(){
    let username = await AsyncStorage.getItem('username');
    //alert(this.state.currentPassword);
    axios({
      method: 'POST',
      url: preURL + '/Login',
      dataType: "json",
      data: {
        user_name: username,
        user_password: this.state.currentPassword,
      },
      headers: {
        "Content-Type": "application/json;charset=UTF-8"
      }
    }).then(response => {
      if(response.data.Login_result === "ok"){
        //Alert.alert("提示", "密码正确");
        this.setState({currentStep: 1});
      }
      else{
        Modal.alert("提示", "密码错误");
      }
    })
  }
  handleChangePassword = async () => {
    // axios 修改密码
    let username = await AsyncStorage.getItem('username');
    axios({
      method: 'POST',
      url: preURL + '/Update_password',
      dataType: "json",
      data: {
        new_userpassword: this.state.newPassword,
        user_name: username,
        user_password: this.state.currentPassword, 
      }
    }).then(response => {
      if(response.data.Update_password_result === "ok"){
        Modal.alert("提示", "修改成功",
          [{
            text: "确定", onPress: () => {this.props.navigation.navigate('Home')}
          }]);
      }
      else{
        Modal.alert("提示","修改失败");
      }
    })
  }
  
  render() {
    const { currentStep } = this.state;
        if(currentStep === 0){
          return (<View>
            <InputItem
              onErrorPress={() => alert('clicked me')}
              onChange={(value) => {
                this.setState({
                  currentPassword: value,
                });
              }}
              type='password'
              placeholder="密码"
            >
              当前密码
            </InputItem>
            <Button onClick={this.handleNext}>下一步</Button>
          </View>);
        } else if(currentStep === 1){
          return (<View>
            <InputItem
              onErrorPress={() => alert('clicked me')}
              onChange={(value) => {
                this.setState({
                  newPassword: value,
                });
              }}
              value={this.state.newPassword}
              type='password'
              placeholder="新密码"
            >
              新密码
            </InputItem>
            <InputItem
              onErrorPress={() => alert('clicked me')}
              onChange={(value) => {
                this.setState({
                  newPasswordRepeat: value,
                });
              }}
              type='password'
              placeholder="新密码"
            >
              请再输入一遍
            </InputItem>
            <Button onClick={this.handleChangePassword}>修改密码</Button>
          </View>);
        }
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
