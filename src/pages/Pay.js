import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { Button, Radio, List, Grid } from 'antd-mobile-rn';
import Alipay from 'react-native-yunpeng-alipay';
// import Alipay from '../util/Alipay';
const RadioItem = Radio.RadioItem;

export default class Pay extends React.Component {
  state = {
    selectedKey: 10,
  }
  async pay(params){ // params 为后端提供的参数
    console.log('enter pay');
    
    // const privateKey = 'MIICeAIBADANBgkqhkiG9w0BAQEFAASCAmIwggJeAgEAAoGBAN0yqPkLXlnhM+2H/57aHsYHaHXazr9pFQun907TMvmbR04wHChVsKVgGUF1hC0FN9hfeYT5v2SXg1WJSg2tSgk7F29SpsF0I36oSLCIszxdu7ClO7c22mxEVuCjmYpJdqb6XweAZzv4Is661jXP4PdrCTHRdVTU5zR9xUByiLSVAgMBAAECgYEAhznORRonHylm9oKaygEsqQGkYdBXbnsOS6busLi6xA+iovEUdbAVIrTCG9t854z2HAgaISoRUKyztJoOtJfI1wJaQU+XL+U3JIh4jmNx/k5UzJijfvfpT7Cv3ueMtqyAGBJrkLvXjiS7O5ylaCGuB0Qz711bWGkRrVoosPM3N6ECQQD8hVQUgnHEVHZYtvFqfcoq2g/onPbSqyjdrRu35a7PvgDAZx69Mr/XggGNTgT3jJn7+2XmiGkHM1fd1Ob/3uAdAkEA4D7aE3ZgXG/PQqlm3VbE/+4MvNl8xhjqOkByBOY2ZFfWKhlRziLEPSSAh16xEJ79WgY9iti+guLRAMravGrs2QJBAOmKWYeaWKNNxiIoF7/4VDgrcpkcSf3uRB44UjFSn8kLnWBUPo6WV+x1FQBdjqRviZ4NFGIP+KqrJnFHzNgJhVUCQFzCAukMDV4PLfeQJSmna8PFz2UKva8fvTutTryyEYu+PauaX5laDjyQbc4RIEMU0Q29CRX3BA8WDYg7YPGRdTkCQQCG+pjU2FB17ZLuKRlKEdtXNV6zQFTmFc1TKhlsDTtCkWs/xwkoCfZKstuV3Uc5J4BNJDkQOGm38pDRPcUDUh2/';
    // const data = {
    //   privateKey,
    //   partner: '2088302277569230',
    //   seller: '12312341234',
    //   outTradeNO: '1231231231231', //订单ID（由商家自行制定）
    //   subject: '测试商品标题', //商品标题
    //   body: '测试产品描述', //商品描述
    //   totalFee: '1', //商品价格
    //   notifyURL: 'http://www.baidu.com"', //回调URL
    //   service: 'mobile.securitypay.pay',
    //   paymentType: '1',
    //   inputCharset: 'utf-8',
    //   itBPay: '30m',
    //   showURL: 'm.alipay.com',
    //   appSchemeIOS: 'testapp20', //应用注册scheme,在AlixPayDemo-Info.plist定义URL types
    // };
    // Alipay.pay(data).then((msg) => {
    //   console.log(msg);
    // }, (e) => {
    //   console.log(e);
    // });
    Alipay.pay(params).then(function(data){
      console.log(data);
    }, function (err) {
        console.log(err);
    });
  }

  handlePay = ()=>{
    console.log('enter handlepay')
    this.pay('alipay_sdk=alipay-sdk-java-3.3.4.ALL&app_id=2016091900545639&biz_content=%7B%22body%22%3A%22%E6%88%91%E6%98%AF%E6%B5%8B%E8%AF%95%E6%95%B0%E6%8D%AE%22%2C%22out_trade_no%22%3A%221%22%2C%22product_code%22%3A%22QUICK_MSECURITY_PAY%22%2C%22subject%22%3A%22App%E6%94%AF%E4%BB%98%E6%B5%8B%E8%AF%95Java%22%2C%22timeout_express%22%3A%2230m%22%2C%22total_amount%22%3A%220.01%22%7D&charset=utf-8&format=json&method=alipay.trade.app.pay&notify_url=%E5%95%86%E6%88%B7%E5%A4%96%E7%BD%91%E5%8F%AF%E4%BB%A5%E8%AE%BF%E9%97%AE%E7%9A%84%E5%BC%82%E6%AD%A5%E5%9C%B0%E5%9D%80&sign=FPU8WfFrL5G0HF8tfcehhfjmHjjnhMLI9hN1isJactqp1dUrDpTxKYSOGIDaqZtCuo%2BWghtGGvDhBhHsrbhNaTOpeig8iioiYKy7d%2FrC4Vn2iP87nJcMJTMt2%2Bluuc9CTq7rh8tdN%2B0%2Bw%2BOtwqFAus3hKWcgYL6Vt6xtjj4zViDi70l0qtdxLuBw9Tno6gnY2uxkq0s6GFKJoPzJRFzC6p7D5k0adX7zJ7qYB%2Fc7aZFrUcRwB9N6WDv3USfALrZgV2uSrstHvfrkekn9vtaoVRCeyGUWZkAqRW0ZTdgwHHpC5QDJ2PpH4QXQuaKaSxh9Iq3EJfrKuksWhinhoWsCBA%3D%3D&sign_type=RSA2&timestamp=2018-07-20+14%3A43%3A55&version=1.0');
  }

  handleToggle = (e) => {
    console.log("e:", e, e.target, e.target.get('key'));
  }
  render() {
    let {selectedKey} = this.state;
    return (
      <View style={styles.container}>
      <View>
      <View style={styles.btn_group}>
          <Button type={selectedKey!==10?'ghost':'primary'} onClick={()=>this.setState({selectedKey: 10})} style={styles.btn}>10元</Button>
          <Button type={selectedKey!==50?'ghost':'primary'} onClick={()=>this.setState({selectedKey: 50})} style={styles.btn}>50元</Button>
          <Button type={selectedKey!==100?'ghost':'primary'} onClick={()=>this.setState({selectedKey: 100})} style={styles.btn}>100元</Button>
        </View>
        <View style={styles.btn_group}>
          <Button type={selectedKey!==200?'ghost':'primary'} onClick={()=>this.setState({selectedKey: 200})} style={styles.btn}>200元</Button>
          <Button type={selectedKey!==500?'ghost':'primary'} onClick={()=>this.setState({selectedKey: 500})} style={styles.btn}>500元</Button>
          <Button type={selectedKey!==1000?'ghost':'primary'} onClick={()=>this.setState({selectedKey: 1000})} style={styles.btn}>1000元</Button>
        </View>
      </View>
        <List style={{ width: 300, height: 200, margin: 15 }}>
          <Text style={{ margin: 12 }}>
            充值方式
          </Text>
          <RadioItem
            style={{ margin: 12 }}
            checked={true}
          >
              <Image style={styles.alipay_img} source={require('../styles/imgs/alipay_sel.png')} />
              <Text style={styles.alipay_text}>支付宝</Text>
          </RadioItem>
          </List>
        <View>
          <Button style={styles.pay_btn} type='primary' onClick={this.handlePay}>充值</Button>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  btn_group:{
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    // marginTop: 20,
  },
  btn: {
    margin: 5,
    width: 100,
    height: 50,
  },
  alipay_img: {
    // width: 10,
    // height: 10,
  },
  alipay_text: {
    height: 10,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  pay_btn:{
    // marginBottom: 40
  }
});
