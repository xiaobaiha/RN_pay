import React from 'react';
import {List, SwipeAction, Button} from 'antd-mobile-rn';
import { StyleSheet, Text, View, TouchableHighlight, AsyncStorage} from 'react-native';
import axios from 'axios';
import { preURL } from '../config/axiosConfig';

const Item = List.Item;
export default class ShoppingConfig extends React.Component {
  state = {
    configList: [{
      name: '购纸',
      key: '1'
    }, {
      name: '购油',
      key: '2'
    }]
  }
  componentWillMount(){
    this.loadConfig();
  }
  loadConfig = async () => {
    // axios 获取用户一键购物设置
    let UserId = await AsyncStorage.getItem('id');
    UserId = JSON.parse(UserId).id;
    //alert(UserId);
    axios({
      method: "GET",
      url: preURL + "/shop-setting?userId=" + UserId,
    }).then(response => {
      //alert(response.data)
      let productList = { "productList" : response.data};
      AsyncStorage.setItem('productList', JSON.stringify(productList));
      for(i in response.data){
        //alert(response.data[i].id);
        let newProduct = {
          "name" : "hahaha" + i/*product.name*/,
          "key": response.data[i].id,
        };
        this.setState({
          configList: [...this.state.configList, newProduct]
        });
      }

    })
  }

  render() {
    const right = [
      {
        text: '删除',
        onPress: () => console.log('delete'),
        style: { backgroundColor: 'red', color: 'white' },
      },
    ];
    const {configList} = this.state;

    return (
      <View style={styles.container}>
        <List renderHeader={() => '一键购物配置'}>
          {configList.map(item => {
            return (<SwipeAction
              autoClose
              style={{ backgroundColor: 'transparent' }}
              left={right}
              key={item.key}
            >
            <Item arrow="horizontal" onClick={()=>{}}>
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
