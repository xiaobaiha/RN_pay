import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {List, Button} from 'antd-mobile-rn';
const Item = List.Item;
export default class Orders extends React.Component {
  state = {
    orderList: []
  }
  componentWillMount(){
    // axios 获取订单列表
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
