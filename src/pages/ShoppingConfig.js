import React from 'react';
import {List, SwipeAction, Button } from 'antd-mobile-rn';
import { StyleSheet, Text, View, TouchableHighlight } from 'react-native';

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
  loadConfig = () => {
    // axios 获取用户一键购物设置
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
