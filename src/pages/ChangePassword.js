import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import axios from 'axios';
import { preURL } from '../config/axiosConfig';
import { Button, InputItem, List } from 'antd-mobile-rn';

export default class ChangePassword extends React.Component {
  state = {
    currentStep: 0,
    currentPassowrd: '',
    newPassowrd: '',
    newPassowrdRepeat: ''
  }
  handleNext = () => {
    // axios 检验密码是否正确
  }
  handleChangePassword = () => {
    // axios 修改密码
  }
  
  render() {
    const { currentStep } = this.state;
        if(currentStep === 0){
          return (<View>
            <InputItem
              onErrorPress={() => alert('clicked me')}
              onChange={(value) => {
                this.setState({
                  currentPassowrd: value,
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
    // );
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
