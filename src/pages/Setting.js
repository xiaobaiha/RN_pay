import React from 'react';
import {List} from 'antd-mobile-rn';
import { StyleSheet, Text, View, TouchableHighlight } from 'react-native';

const Item = List.Item;
export default class AKS extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <List renderHeader={() => '设置'}>
          <Item arrow="horizontal" onClick={() => this.props.navigation.navigate('Pay')}>
            充值
          </Item>
          <Item arrow="horizontal" onClick={() => this.props.navigation.navigate('Remaining')}>
            余额
          </Item>
          <Item arrow="horizontal" onClick={() => this.props.navigation.navigate('Orders')}>
            订单
          </Item>
          <Item arrow="horizontal" onClick={() => this.props.navigation.navigate('Information')}>
            修改信息
          </Item>
        </List>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
});
