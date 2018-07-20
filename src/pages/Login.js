import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default class Login extends React.Component {
  state = {
    remains: 0
  }
  componentWillMount() {
    // axios 获取余额
  }
  render() {
    const {remains} = this.state;
    return (
      <View style={styles.container}>
        <Text>您可用余额为{remains}元。</Text>
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
