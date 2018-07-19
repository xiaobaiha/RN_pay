import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default class Pay extends React.Component {
  render() {
    return (
      <View><Text>Remaining</Text></View>
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
