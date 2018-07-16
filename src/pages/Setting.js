import React from 'react';
import {List} from 'antd-mobile-rn';
import { StyleSheet, Text, View } from 'react-native';

const Item = List.Item;
const Brief = Item.Brief;
export default class AKS extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <List renderHeader={() => '设置'}>
          <Item disabled arrow="horizontal" onClick={() => {}}>
            充值
          </Item>
          <Item disabled arrow="horizontal" onClick={() => {}}>
            余额
          </Item>
          <Item disabled arrow="horizontal" onClick={() => {}}>
            订单
          </Item>
          <Item disabled arrow="horizontal" onClick={() => {}}>
            修改信息
          </Item>
        </List>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 25,
    backgroundColor: '#fff',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
});
