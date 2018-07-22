import React from 'react';
import { StyleSheet, Text, View, AsyncStorage } from 'react-native';
import {List, Button, Modal} from 'antd-mobile-rn';
import Axios from 'axios';
import { preURL } from '../config/axiosConfig';
const Item = List.Item;
export default class Orders extends React.Component {
  state = {
    orderList: []
  }
  componentWillMount(){
    // axios 获取订单列表
    this.getOrder();
  }
  async getOrder(){
    let UserId = await AsyncStorage.getItem('id');
    UserId = JSON.parse(UserId).id;
    Axios({
      method: "GET",
      url: preURL + "/shop-history?userId=" + UserId,
    }).then(response => {
      //alert(JSON.stringify(response.data));
      this.setState({orderList: response.data});
      alert(JSON.stringify(this.state.orderList))
    })
  }

  render() {
    const {orderList} = this.state;
    return (
      <View>
        <List>
          {orderList.map(item=>{
            return (<Item>
              {item}
            </Item>)
          })}
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
