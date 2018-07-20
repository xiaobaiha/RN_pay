import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import axios from 'axios';
import { preURL } from '../config/axiosConfig'

export default class ChangePassword extends React.Component {
  state = {
    currentStep: 0,
  }
  componentWillMount() {
    // axios 修改密码
  }
  render() {
    const { currentStep } = this.state;
    return (
      <View>
        {currentStep === 0? 
        <View>
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
            请输入当前密码
          </InputItem>
        </View>:
        <View>
          <InputItem
            onErrorPress={() => alert('clicked me')}
            value={this.state.value}
            onChange={(value) => {
              this.setState({
                password: value,
              });
            }}
            placeholder="新密码"
          >
            新密码
          </InputItem>
          <InputItem
            onErrorPress={() => alert('clicked me')}
            value={this.state.value}
            onChange={(value) => {
              this.setState({
                password: value,
              });
            }}
            placeholder="新密码"
          >
            请再输入一遍
          </InputItem>
          <Button>修改密码</Button>
        </View>
        }
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
