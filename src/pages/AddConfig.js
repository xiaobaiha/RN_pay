import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default class AddConfig extends React.Component {
  state = {
    productList: [], // 商品列表
    numbers: 0, // 商品数量
    address: [], // 地址
    phone: '', // 联系电话
  }
  componentWillMount() {
    // axios 获取商品列表
    // axios 获取地址列表
  }
  render() {
    const {remains} = this.state;
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
