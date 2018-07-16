import React from 'react';
import {List, SwipeAction } from 'antd-mobile-rn';
import { StyleSheet, Text, View, TouchableHighlight } from 'react-native';

const Item = List.Item;
export default class AKS extends React.Component {
  render() {
    const right = [
      {
        text: 'delete',
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
            onOpen={() => console.log('open')}
            onClose={() => console.log('close')}
          >
          <Item disabled arrow="horizontal" onClick={() => {this.props.onBack}}>
            购纸
          </Item>
          </SwipeAction>
          <Item disabled arrow="horizontal" onClick={() => {}}>
            购油
          </Item>
        </List>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 25
  },
});
