import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  AsyncStorage,
  NativeModules
} from "react-native";
import { Button, Radio, List, Grid, Modal } from "antd-mobile-rn";
import axios from "axios";
import { preURL } from "../config/axiosConfig";
const RadioItem = Radio.RadioItem;

export default class Pay extends React.Component {
  state = {
    selectedKey: 10,
    payWay: 0
  };
  async pay(params) {
    NativeModules.MyNativeModule.rnCallNative(params);
  }

  handlePay = async () => {
    const { payWay, selectedKey } = this.state;
    if (payWay === 0) {
      let userId = await AsyncStorage.getItem("id");
      userId = JSON.parse(userId).id;
      axios({
        method: "POST",
        url: preURL + "/recharge",
        dataType: "json",
        data: {
          id: userId,
          money: selectedKey
        },
        headers: {
          "Content-Type": "application/json;charset=UTF-8"
        }
      }).then(response => {
        let orderStr = response.data;
        this.pay(orderStr);
      });
    } else if (payWay === 1) {
      this.handleVirtualPay(selectedKey);
    }
  };

  handleVirtualPay = async money => {
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
      } else {
        Modal.alert("提示", response.data);
      }
    });
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
