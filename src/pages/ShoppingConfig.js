import React from 'react';
import { List, SwipeAction, Button } from 'antd-mobile-rn';
import { StyleSheet, Text, View, TouchableHighlight, AsyncStorage, DeviceEventEmitter } from 'react-native';
import axios from 'axios';
import { preURL } from '../config/axiosConfig';

const Item = List.Item;
export default class ShoppingConfig extends React.Component {
  state = {
    configList: []
  }
  componentWillMount(){
    DeviceEventEmitter.addListener('reloadConfig', this.loadConfig);
  }
  componentDidMount() {
    this.loadConfig();
  }
  loadConfig = async () => {
    // axios 获取用户一键购物设置
    let ShopList = await AsyncStorage.getItem('shopList');
    ShopList = JSON.parse(ShopList).shopList;
    this.setState({configList: []})
    for (i in ShopList) {
      //alert(response.data[i].id);
      let newShop = {
        "name": ShopList[i].name,
        "key": ShopList[i].id,
      };
      this.setState({
        configList: [...this.state.configList, newShop]
      });
    }
  }
  deleteShop = async (key) => {
    //axios 删除一个一键购物设置
    alert(key)
  }

  render() {
    const { configList } = this.state;

    return (
      <View style={styles.container}>
        <List renderHeader={() => '一键购物配置'}>
          {configList.map(item => {
            return (<SwipeAction
              autoClose
              style={{ backgroundColor: 'transparent' }}
              left={[
                {
                  text: '删除',
                  onPress: ()=>this.deleteShop(item.key),
                  style: { backgroundColor: 'red', color: 'white' },
                },
              ]}
              key={item.key}
            >
              <Item arrow="horizontal" onClick={() => { }}>
                {item.name}
              </Item>
            </SwipeAction>);
          })}
        </List>
        <Button onClick={() => this.props.navigation.navigate('AddConfig')} type='primary'>新增</Button>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
});
