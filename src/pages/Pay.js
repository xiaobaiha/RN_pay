import React from "react";
import { StyleSheet, Text, View, Image, AsyncStorage } from "react-native";
import { Button, Radio, List, Grid, Modal } from "antd-mobile-rn";
import Alipay from "react-native-yunpeng-alipay";
import axios from "axios";
import { preURL } from "../config/axiosConfig"
const RadioItem = Radio.RadioItem;

export default class Pay extends React.Component {
  state = {
    selectedKey: 10,
    payWay: 0
  };
  async pay(params) {
    // params 为后端提供的参数
    Alipay.pay(params).then(
      function (data) {
        console.log(data);
      },
      function (err) {
        console.log(err);
      }
    );
  }

  handlePay = () => {
    const { payWay, selectedKey } = this.state;
    if (payWay === 0) {
      this.pay(
        "alipay_sdk=alipay-sdk-java-3.3.4.ALL&app_id=2018071960663535&biz_content=%7B%22body%22%3A%22%E6%88%91%E6%98%AF%E6%B5%8B%E8%AF%95%E6%95%B0%E6%8D%AE%22%2C%22out_trade_no%22%3A%221%22%2C%22product_code%22%3A%22QUICK_MSECURITY_PAY%22%2C%22subject%22%3A%22App%E6%94%AF%E4%BB%98%E6%B5%8B%E8%AF%95Java%22%2C%22timeout_express%22%3A%2230m%22%2C%22total_amount%22%3A%220.01%22%7D&charset=utf-8&format=json&method=alipay.trade.app.pay&notify_url=http%3A%2F%2F114.115.143.130%3A8080%2FrechargeAlipay&sign=h%2Bt6lK6eYC8OBnROUyKucjE7DS5ptlYkG9NJIC2tOqmfJRRcND1NUB0wUKfreH2sobNOL5U0DHqwT28Xe2%2B7HzQ2Lzw%2FuyYJxNHEFw%2FQBodqnbvjIBXt0GhjOb7trC6MpdAskgJ%2FjV%2FMr3XV2VrYvdBrv%2F1Zn0t80K66Z04SAQWWtu1EgXex3%2BZWw52FWUr7reGEa3WE3SP0EgMZxSbiRCpJOgUYAAqJ4whEA4Feu%2BL6mEvbPvVN%2FDL9TMrQwg0kDBj6ffxlm7bieZxN0YKcEmH8KmAxfUK%2Bv6eWv84kV9iV4I96aE8JGkBdp6xW6%2Fg%2FPMBao6GjMHa7r5eNXFMoPw%3D%3D&sign_type=RSA2&timestamp=2018-07-20+15%3A19%3A14&version=1.0"
      );
    } else if (payWay === 1) {
      this.handleVirtualPay(selectedKey);
    }
  };

  handleVirtualPay = async (money) => {
    // axios 虚拟银行付款
    let UserId = await AsyncStorage.getItem("id");
    UserId = JSON.parse(UserId).id;
    axios({
      method: "POST",
      url: preURL + "/new-recharge",
      dataType: "json",
      data: {
        id: UserId,
        money: money
      },
      headers: {
        "Content-Type": "application/json;charset=UTF-8"
      }
    }).then(response => {
      if (response.data === "success") {
        Modal.alert("提示", "充值成功");
      }
      else {
        Modal.alert("提示", response.data);
      }
    })
  };

  handleToggle = e => {
    console.log("e:", e, e.target, e.target.get("key"));
  };
  render() {
    let { selectedKey, payWay } = this.state;
    return (
      <View style={styles.container}>
        <View>
          <View style={styles.btn_group}>
            <Button
              type={selectedKey !== 10 ? "ghost" : "primary"}
              onClick={() => this.setState({ selectedKey: 10 })}
              style={styles.btn}
            >
              10元
            </Button>
            <Button
              type={selectedKey !== 50 ? "ghost" : "primary"}
              onClick={() => this.setState({ selectedKey: 50 })}
              style={styles.btn}
            >
              50元
            </Button>
            <Button
              type={selectedKey !== 100 ? "ghost" : "primary"}
              onClick={() => this.setState({ selectedKey: 100 })}
              style={styles.btn}
            >
              100元
            </Button>
          </View>
          <View style={styles.btn_group}>
            <Button
              type={selectedKey !== 200 ? "ghost" : "primary"}
              onClick={() => this.setState({ selectedKey: 200 })}
              style={styles.btn}
            >
              200元
            </Button>
            <Button
              type={selectedKey !== 500 ? "ghost" : "primary"}
              onClick={() => this.setState({ selectedKey: 500 })}
              style={styles.btn}
            >
              500元
            </Button>
            <Button
              type={selectedKey !== 1000 ? "ghost" : "primary"}
              onClick={() => this.setState({ selectedKey: 1000 })}
              style={styles.btn}
            >
              1000元
            </Button>
          </View>
        </View>
        <List style={{ width: 300, height: 200, margin: 15 }}>
          <Text style={{ margin: 12 }}>充值方式</Text>
          <RadioItem
            style={{ margin: 12 }}
            checked={payWay === 0}
            onChange={() => this.setState({ payWay: 0 })}
          >
            <Image
              style={styles.alipay_img}
              source={require("../styles/imgs/alipay_sel.png")}
            />
            <Text style={styles.alipay_text}>支付宝付款</Text>
          </RadioItem>
          <RadioItem
            style={{ margin: 12 }}
            checked={payWay === 1}
            onChange={() => this.setState({ payWay: 1 })}
          >
            <Image
              style={styles.alipay_img}
              source={require("../styles/imgs/union_pay.png")}
            />
            <Text style={styles.alipay_text}>银联付款</Text>
          </RadioItem>
        </List>
        <View>
          <Button
            style={styles.pay_btn}
            type="primary"
            onClick={this.handlePay}
          >
            充值
          </Button>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center"
  },
  btn_group: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center"
    // marginTop: 20,
  },
  btn: {
    margin: 5,
    width: 100,
    height: 50
  },
  alipay_img: {
    // width: 10,
    // height: 10,
  },
  alipay_text: {
    height: 10,
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  pay_btn: {
    // marginBottom: 40
  }
});
