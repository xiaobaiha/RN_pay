import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { Button, InputItem, Modal } from "antd-mobile-rn";
import axios from "axios";
import { preURL } from "../config/axiosConfig";

export default class Signup extends React.Component {
  state = {
    name: "",
    password: ""
  };
  handleSignup = () => {
    // axios handle signup
    axios({
      method: "POST",
      url: preURL + "/Register",
      dataType: "json",
      data: {
        user_name: this.state.name,
        user_password: this.state.password
      },
      headers: {
        "Content-Type": "application/json;charset=UTF-8"
      }
    }).then(response => {
      if (response.data.Register_result === "ok") {
        Modal.alert("提示", "注册成功", [
          {
            text: "确定",
            onPress: () => {
              this.props.navigation.navigate("Login");
            }
          }
        ]);
      } else {
        Modal.alert("注册错误", response.data.Register_result);
      }
    });
  };
  render() {
    return (
      <View>
        <Image source={require("../styles/imgs/cart.png")} />
        <Text style={styles.weshopText}>WeShop</Text>
        <View style={styles.inputContainer}>
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
          <InputItem
            onErrorPress={() => alert("clicked me")}
            onChange={value => {
              this.setState({
                password: value
              });
            }}
            type="password"
            placeholder="请再输入一遍密码"
          >
            重复密码
          </InputItem>
        </View>
        <Button type="primary" onClick={this.handleSignup}>
          注册
        </Button>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#3b4757",
    alignItems: "center",
    justifyContent: "center"
  },
  input: {
    backgroundColor: "white",
    height: 40,
    width: 300,
    borderRadius: 20,
    alignItems: "center"
  },
  inputContainer: {
    height: 130,
    justifyContent: "space-around",
    width: 300
  },
  weshopText: {
    margin: 20,
    color: "#949fb1",
    fontSize: 30
  },
  regText: {
    color: "#949fb1",
    fontSize: 20,
    margin: 10
  },
  loginBtn: {
    height: 40,
    width: 270,
    borderRadius: 20,
    margin: 10
  },
  launchimageStyle: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    width: null,
    width: null,
    resizeMode: Image.resizeMode.cover
  }
});
