import React from 'react';
import {Button} from 'antd-mobile-rn';
import { StyleSheet, Text, View, AsyncStorage } from 'react-native';
import axios from 'axios';
export default class AKS extends React.Component {
  state = {
    configList: []
  }
  componentWillMount(){
    // AsyncStorgae 获取一键购物配置
    this.getShopInfo();
  }
  async getShopInfo(){
    let ShopList = await AsyncStorage.getItem('shopList');
    ShopList = JSON.parse(ShopList).shopList;
    this.setState({configList: ShopList});
  }
  handleClick = () => {
    console.log("enter handleclick");
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.btn_group}>
          <Button onClick={this.handleClick} style={styles.btn}>购纸</Button>
          <Button style={styles.btn}>购油</Button>
        </View>
        <View style={styles.btn_group}>
          <Button style={styles.btn}>AKS</Button>
          <Button style={styles.btn}>AKS</Button>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  btn_group:{
    flexDirection: 'column',
    justifyContent: 'space-around',
    width: 100
  },
  btn: {
    marginBottom: 50,
    width: 100,
    height: 100,
    borderRadius: 50
  }
});
