import React from 'react';
import {List, SwipeAction, Button } from 'antd-mobile-rn';
import { StyleSheet, Text, View, TouchableHighlight } from 'react-native';

const Item = List.Item;
export default class AKS extends React.Component {
  render() {
    const right = [
      {
        text: '删除',
        onPress: () => console.log('delete'),
        style: { backgroundColor: 'red', color: 'white' },
      },
    ];
    return (
      <View style={styles.container}>
        <List renderHeader={() => '一键购物配置'}>
          <SwipeAction
              autoClose
              style={{ backgroundColor: 'transparent' }}
              left={right}
            >
            <Item arrow="horizontal" onClick={()=>{}}>
              购纸
            </Item>
          </SwipeAction>
          <SwipeAction
              autoClose
              style={{ backgroundColor: 'transparent' }}
              left={right}
            >
            <Item arrow="horizontal" onClick={() => {}}>
              购油
            </Item>
          </SwipeAction>
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
