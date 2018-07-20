import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button, Radio, List, Grid } from 'antd-mobile-rn';
import Alipay from 'react-native-yunpeng-alipay';
// import Alipay from '../util/Alipay';
const RadioItem = Radio.RadioItem;

export default class Pay extends React.Component {
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
    Alipay.pay("alipay_sdk=alipay-sdk-java-3.3.4.ALL&app_id=2016091900545639&biz_content=%7B%22body%22%3A%22%E6%88%91%E6%98%AF%E6%B5%8B%E8%AF%95%E6%95%B0%E6%8D%AE%22%2C%22out_trade_no%22%3A%2211111%22%2C%22product_code%22%3A%22QUICK_MSECURITY_PAY%22%2C%22subject%22%3A%22App%E6%94%AF%E4%BB%98%E6%B5%8B%E8%AF%95Java%22%2C%22timeout_express%22%3A%2230m%22%2C%22total_amount%22%3A%220.01%22%7D&charset=utf-8&format=json&method=alipay.trade.app.pay&notify_url=%E5%95%86%E6%88%B7%E5%A4%96%E7%BD%91%E5%8F%AF%E4%BB%A5%E8%AE%BF%E9%97%AE%E7%9A%84%E5%BC%82%E6%AD%A5%E5%9C%B0%E5%9D%80&sign=MYiAP%2Bp5npUgOQ8iK2xk4rlsWtYRJUd4090WuTrt26IMNm4ZP%2BTvvu2nPd26npHk7VGmCKAITg7Dm2%2F9JpchcQXFKXsAFpC6McQcrMdrBw34NaW4VJx8Lfp%2FlE5zs0NhJMGCMCrkgHDgvKboSwyi%2B7tvv%2Fl94%2BnF06RyOzvgJdDlejGdgsQYZRwWsPN4aBF2dZlTF7OEfYDaW4M7XeeYVqFHHspObv8A25Rua87l9axkjvPaXIWh8VOf4SqgzgO7oq8ZVPenfFMLXFtAS340KiUx7rfugnT2JE8U2RTriP19O9orG9GHypA2ux0Zj90pwT%2FBI%2Fu%2FqjDdBVNMecMDFg%3D%3D&sign_type=RSA2&timestamp=2018-07-20+09%3A48%3A02&version=1.0").then(function(data){
      console.log(data);
    }, function (err) {
        console.log(err);
    });
  }

  handlePay = ()=>{
    console.log('enter handlepay')
    this.pay('alipay_sdk=alipay-sdk-java-3.3.4.ALL&app_id=2016091900545639&biz_content=%7B%22body%22%3A%22%E6%88%91%E6%98%AF%E6%B5%8B%E8%AF%95%E6%95%B0%E6%8D%AE%22%2C%22out_trade_no%22%3A%2211111%22%2C%22product_code%22%3A%22QUICK_MSECURITY_PAY%22%2C%22subject%22%3A%22App%E6%94%AF%E4%BB%98%E6%B5%8B%E8%AF%95Java%22%2C%22timeout_express%22%3A%2230m%22%2C%22total_amount%22%3A%220.01%22%7D&charset=utf-8&format=json&method=alipay.trade.app.pay&notify_url=%E5%95%86%E6%88%B7%E5%A4%96%E7%BD%91%E5%8F%AF%E4%BB%A5%E8%AE%BF%E9%97%AE%E7%9A%84%E5%BC%82%E6%AD%A5%E5%9C%B0%E5%9D%80&sign=SbpcV75zjoj9puCQtKBVgKNYdVLPPUIJ4OcQhpFcQ3eB%2Fr%2FxvPDHqn%2Frl6bBlYEVL840REqNhLSE0vhaIK6iaTPepoNrBQHJCg6PeBO%2FdGiWTR1Jd5LKXGFcoZkLh1dyah4rYIGNt0QRQ2u27AD6MHL%2Buli1GKe8lhO1biDNN%2BDh%2Bk7onH3tX1M6Q4M1uipup6%2Bcxb41z8mX%2FDdgZ8BgKUT1T%2B48pixRxtB3RkQ%2BhplLRaQtZ0uTRfDp7eYyQGiSj9Y9th1HBs2SpYpyZ3%2BhMVsyo1a6nGaxArTgn2ZqCVlC5pe64eAjyLoTqKbyeAl0TR4ZW1R%2BSaVNEfEUVIZBCQ%3D%3D&sign_type=RSA2&timestamp=2018-07-18+14%3A36%3A17&version=1.0');
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.btn_group}>
          <Button onClick={this.handlePay} style={styles.btn}>10元</Button>
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
