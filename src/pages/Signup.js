import React from 'react';
import {View,Text,StyleSheet} from 'react-native';
import { Button, InputItem } from 'antd-mobile-rn';


export default class Signup extends React.Component {
  state = {
    remains: 0
  }
  componentWillMount() {
    // axios 获取余额
  }
  render() {
    return (
      <View style={styles.container}>
        <View>
          <Text>用户名</Text>

        </View>
        <View>
          <Text>密码</Text>

        </View>
        <View>
          <Text>重复密码</Text>

        </View>
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
