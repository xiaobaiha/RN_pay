import React from 'react';
import { StyleSheet, Text, View, AsyncStorage } from 'react-native';
import axios from 'axios';
import { preURL } from '../config/axiosConfig';
import { List, Picker, InputItem, Button } from 'antd-mobile-rn';
import { district } from 'antd-mobile-demo-data';

export default class AddAddress extends React.Component {
  state = {
    data: [],
    value: [],
    detailAddress: ''
  }
  saveAddress = () => {
    // asyncstorage 保存地址（设置flag，表示还未提交修改）

  }
  onClick = () => {
    this.setState({
      data: district,
    });
  }
  render() {
    return (
      <View>
        <List>
          <Picker
            data={this.state.data}
            cols={3}
            value={this.state.value}
            onChange={(value)=>this.setState({ value })}
          >
            <List.Item arrow="horizontal" last onClick={this.onClick}>
              选择地区
            </List.Item>
          </Picker>
          <InputItem
            editable={false}
            onErrorPress={() => alert('clicked me')}
            onChange={(value)=>this.setState({ detailAddress: value })}
          >
            详细地址
          </InputItem>
          <Button type='primary' onClick={this.saveAddress}>保存地址</Button>
        </List>
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
