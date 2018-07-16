import React from 'react';
import {Button} from 'antd-mobile-rn';
import { StyleSheet, Text, View } from 'react-native';

export default class AKS extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.btn_group}>
          <Button style={styles.btn}>AKS</Button>
          <Button style={styles.btn}>AKS</Button>
        </View>
        <View style={styles.btn_group}>
          <Button style={styles.btn}>AKS</Button>
          <Button style={styles.btn}>AKS</Button>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  btn_group:{
    // flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-around',
    width: 100
  },
  btn: {
    marginBottom: 50,
    width: 100,
    height: 100,
    borderRadius: 50
  }
});
