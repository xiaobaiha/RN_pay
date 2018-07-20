import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import axios from 'axios';
import { preURL } from '../config/axiosConfig'

export default class AddConfig extends React.Component {
  state = {
    productList: [], // 商品列表
    numbers: 0, // 商品数量
    address: [], // 地址
    phone: '', // 联系电话
  }
  componentWillMount() {
    // axios 获取商品列表
    axios({
      method: "GET",
      url: preURL + "/items"
    }).then(response => {
        console.log(response)
        alert(response.data)
        //this.setState({ remains: response.data })
      })
  }
  render() {
    const { remains } = this.state;
    return (
      <View style={styles.container}>
        <Text>您可用余额为{remains}元。</Text>
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
