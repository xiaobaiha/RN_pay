import React from 'react';
import {Button} from 'antd-mobile-rn';
import { StyleSheet, Text, View, AsyncStorage, DeviceEventEmitter } from 'react-native';
import axios from 'axios';
export default class AKS extends React.Component {
  state = {
    configList: []
  }
  componentWillMount(){
    DeviceEventEmitter.addListener('reloadConfig2', this.getShopInfo);
  }
  componentDidMount(){
    // AsyncStorgae 获取一键购物配置
    this.getShopInfo();
  }
  getShopInfo = async ()=> {
    let ShopList = await AsyncStorage.getItem('shopList');
    ShopList = JSON.parse(ShopList).shopList;
    //alert(JSON.stringify(ShopList))
    this.setState({configList: ShopList});
  }
  handleClick = (key) => {
    // axios 一键购物
  }
  render() {
    const {configList} = this.state;
    return (
      <View style={styles.container}>
        <View style={styles.btn_group}>
        {configList.map(item => {
          return <Button key={item.id} onClick={()=>this.handleClick(item.id)} style={styles.btn}>{item.name}</Button>
        })}
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
    flexWrap: 'wrap'
  },
  btn_group:{
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
    margin: 20
  },
  btn: {
    marginBottom: 50,
    width: 100,
    height: 100,
    borderRadius: 50
  }
});
