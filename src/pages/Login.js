import React from "react";
import { StyleSheet, Image, View, Alert, AsyncStorage } from "react-native";
import { Button, InputItem, Toast, Modal } from "antd-mobile-rn";
import axios from "axios";
import { preURL } from "../config/axiosConfig";

export default class Login extends React.Component {
  state = {
    name: "",
    password: "",
    configLoaded: false,
    closeFlag: false
  };
  componentWillMount() {
    // async 获取用户信息 若存在，跳转Home
    this.getUserName();
  }
  componentDidMount() {
    const { closeFlag } = this.state;
    if (!closeFlag) {
      setTimeout(() => {
        this.setState({ closeFlag: true });
      }, 2000);
    }
  }
  async getUserName() {
    let username = await AsyncStorage.getItem("username");
    if (username) {
      setTimeout(() => {
        this.props.navigation.navigate("Home");
      }, 1000);
    }
    this.setState({ configLoaded: true });
  }
  handleLogin = () => {
    // axios 请求登录
    axios({
      method: "POST",
      url: preURL + "/Login",
      dataType: "json",
      data: {
        user_name: this.state.name,
        user_password: this.state.password
      },
      headers: {
        "Content-Type": "application/json;charset=UTF-8"
      }
    }).then(response => {
      console.log(response);
      if (response.data.Login_result === "ok") {
        //储存登录用户数据到AsyncStorage，数组与int格式的数据存为json格式再储存
        let Addresses = { addresses: response.data.addresses };
        AsyncStorage.setItem("addresses", JSON.stringify(Addresses));
        let Id = { id: response.data.id };
        AsyncStorage.setItem("id", JSON.stringify(Id));
        AsyncStorage.setItem("tel", response.data.tel);
        AsyncStorage.setItem("username", response.data.username);
        let TempAddresses = { tempaddresses: [] };
        AsyncStorage.setItem("tempaddresses", JSON.stringify(TempAddresses));

        // axios 获取用户一键购物设置
        let UserId = response.data.id;
        axios({
          method: "GET",
          url: preURL + "/shop-setting?userId=" + UserId
        }).then(response => {
          let shopList = { shopList: response.data };
          this.setShopSet(shopList);
        });
      } else {
        Modal.alert("登录错误", response.data.Login_result);
      }
    });
  };
  setShopSet = async shopList => {
    await AsyncStorage.setItem("shopList", JSON.stringify(shopList));
    Toast.loading("登录中...", 1, () => {
      this.props.navigation.navigate("Home");
    });
  };
  render() {
    const { configLoaded, closeFlag } = this.state;
    if (configLoaded && closeFlag) {
      return (
        <View>
          <InputItem
            onErrorPress={() => alert("clicked me")}
            onChange={value => {
              this.setState({
                name: value
              });
            }}
            placeholder="用户名"
          >
            用户名
          </InputItem>
          <InputItem
            onErrorPress={() => alert("clicked me")}
            onChange={value => {
              this.setState({
                password: value
              });
            }}
            type="password"
            placeholder="密码"
          >
            密码
          </InputItem>
          <Button type="primary" onClick={this.handleLogin}>
            登录
          </Button>
          <Button onClick={() => this.props.navigation.navigate("Signup")}>
            没有账号？去注册吧
          </Button>
        </View>
      );
    } else {
      return (
        <Image
          source={require("../styles/imgs/launch.jpg")}
          style={styles.launchimageStyle}
        />
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  },
  launchimageStyle: {
    // width: deviceWidth, //设备宽(只是一种实现，此处多余)
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    width: null,
    width: null,
    //不加这句，就是按照屏幕高度自适应
    //加上这几，就是按照屏幕自适应
    resizeMode: Image.resizeMode.cover
    //祛除内部元素的白色背景
  }
});
