import React from 'react';
import {List, Button} from 'antd-mobile-rn';
import { StyleSheet, Text, View, TouchableHighlight, AsyncStorage } from 'react-native';

const Item = List.Item;
export default class Setting extends React.Component {
  state = {
    name: ''
  }
  componentWillMount(){
    // async 读取用户名
  }
  logout = () => {
    // axios 注销请求，若成功，返回登录页面，清除async储存的信息
    AsyncStorage.clear;
    this.props.navigation.navigate('Login')
  }
  render() {
    return (
      <View style={styles.container}>
        <List renderHeader={() => (this.state.name+',你好！')}>
          <Item arrow="horizontal" onClick={() => this.props.navigation.navigate('Pay')}>
            充值
          </Item>
          <Item arrow="horizontal" onClick={() => this.props.navigation.navigate('Remaining')}>
            余额
          </Item>
          <Item arrow="horizontal" onClick={() => this.props.navigation.navigate('Orders')}>
            订单
          </Item>
          <Item arrow="horizontal" onClick={() => this.props.navigation.navigate('Information')}>
            修改信息
          </Item>
          <Item arrow="horizontal" onClick={() => this.props.navigation.navigate('ChangePassword')}>
            修改密码
          </Item>
          <Button type='warning' onClick={this.logout}>注销</Button>
        </List>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
});
