import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button, Radio, List, Grid } from 'antd-mobile-rn';
const RadioItem = Radio.RadioItem;

export default class Pay extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.btn_group}>
          <Button style={styles.btn}>10元</Button>
          <Button type='ghost' style={styles.btn}>50元</Button>
          <Button style={styles.btn}>100元</Button>
        </View>
        <View style={styles.btn_group}>
          <Button style={styles.btn}>100元</Button>
          <Button style={styles.btn}>200元</Button>
          <Button style={styles.btn}>500元</Button>
        </View>
        <List style={{ width: 400, height: 400 }}>
          <Text style={{ marginTop: 12, marginLeft: 12 }}>
            充值方式
          </Text>
          <RadioItem
           icon={require('../../src/styles/imgs/busi.png')}
            checked={true}
          >
            <Grid data={[{
                icon: 'https://gw.alipayobjects.com/zos/rmsportal/nywPmnTAvTmLusPxHPSu.png',
                text: `name`,
              }]} 
              />
              {/* <Text>支付宝</Text> */}
          </RadioItem>
          </List>
        <View style={styles.btn_group}>
          <Button type='primary'>充值</Button>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btn_group:{
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  btn: {
    margin: 5,
    width: 100,
    height: 50,
  }
});
