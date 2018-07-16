import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default class Pay extends React.Component {
  constructor(props){
    super(props);
    console.log("cons2 props:", props.navigation);
  }
  render() {
    return (
      <View><Text>Pay</Text></View>
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
