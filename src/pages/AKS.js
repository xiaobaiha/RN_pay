import React from 'react';
import {Button} from 'antd-mobile-rn';
import { StyleSheet, Text, View } from 'react-native';
import axios from 'axios';
export default class AKS extends React.Component {
  handleClick = () => {
    console.log("enter handleclick");
    // axios({
    //   method: 'post',
    //   url: 'http://10.180.89.154:5007/test',
    //   data: {
    //     firstName: 'Fred',
    //     lastName: 'Flintstone'
    //   },
    //   headers:{
    //     "Accept": "application/json",
    //     "Content-Type": 'application/json',   
    //     "Connection": "close",   
    //     "type": "getUserData",  
    //   }
    // }).then(response => {
    //   console.log(response);
    // }).catch(err=>{console.log(err)});
    // axios.post('http://192.168.43.114:5007/test', {
    //   firstName: 'Fred',
    //   lastName: 'Flintstone'
    // })
    // .then(function (response) {
    //   console.log(response); 
    // })
    // .catch(function (error) {
    //   console.log(error);
    // });
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.btn_group}>
          <Button onClick={this.handleClick} style={styles.btn}>购纸</Button>
          <Button style={styles.btn}>购油</Button>
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
