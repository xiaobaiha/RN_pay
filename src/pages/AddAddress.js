import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import axios from 'axios';
import { preURL } from '../config/axiosConfig';
import { List, Picker } from 'antd-mobile-rn';
import { district } from 'antd-mobile-demo-data';

export default class AddAddress extends React.Component {
  render() {
    return (
      <View>
        <List>
          <Picker
            data={this.state.data}
            cols={3}
            value={this.state.value}
            onChange={this.onChange}
          >
            <List.Item arrow="horizontal" last onClick={this.onClick}>
              选择地区
            </List.Item>
          </Picker>
          
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
