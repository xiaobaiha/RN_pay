import React from 'react';
import { StyleSheet, Text, View, AsyncStorage } from 'react-native';
import axios from 'axios';
import { preURL } from '../config/axiosConfig';
import { List, Picker, InputItem, Button, Modal } from 'antd-mobile-rn';
import { district } from 'antd-mobile-demo-data';

export default class AddAddress extends React.Component {
  state = {
    data: [],
    value: [],
    detailAddress: ''
  }
  saveAddress = () => {
    const {value, detailAddress} = this.state;
    if(value.length === 0){
      Modal.alert('增加地址失败', '请先选择地区');
      return;
    } else if(detailAddress === ''){
      Modal.alert('增加地址失败', '请输入详细地址');
      return;
    }
    let name = [];
    district.forEach(item1=>{
      if(item1.value === value[0]){
        name.push(item1.label);
        item1.children.forEach(item2 => {
          if(item2.value === value[1]){
            name.push(item2.label);
            item2.children.forEach(item3=>{
              if(item3.value === value[2]){
                name.push(item3.label);
              }
            })
          }
        })
      }
    });
    let fullAddress = name.join('') + detailAddress;
    // asyncstorage 暂存修改地址

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
