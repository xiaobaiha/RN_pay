import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { Button, InputItem, Modal } from "antd-mobile-rn";
import axios from "axios";
import { preURL } from "../config/axiosConfig";
import InputItemStyle from "antd-mobile-rn/lib/input-item/style/index.native";

let newInputItemStyle = {
  ...InputItemStyle,
  container: {
    ...InputItemStyle.container,
    borderBottomColor: "#3b4757"
  },
  input: {
    ...InputItemStyle.input,
    backgroundColor: "white",
    justifyContent: "center",
    textAlign: "center",
    height: 40,
    width: 300,
    borderRadius: 20
  }
};
export default class Signup extends React.Component {
  state = {
    name: "",
    password: "",
    passwordRepeat: ""
  };
  handleSignup = () => {
    const { name, password, passwordRepeat } = this.state;
    if (name === "") {
      Modal.alert("注册错误", "用户名不能为空");
      return;
    } else if (password !== passwordRepeat) {
      Modal.alert("注册错误", "两次输入的密码不同");
      return;
    } else if (password.length < 6) {
      Modal.alert("注册错误", "密码必须大于等于6位");
      return;
    }
    // axios handle signup
    axios({
      method: "POST",
      url: preURL + "/Register",
      dataType: "json",
      data: {
        user_name: name,
        user_password: password
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
      <View style={styles.container}>
        <Image source={require("../styles/imgs/cart.png")} />
        <Text style={styles.weshopText}>WeShop</Text>
        <View style={styles.inputContainer}>
          <InputItem
            styles={StyleSheet.create(newInputItemStyle)}
            onErrorPress={() => alert("clicked me")}
            onChange={value => {
              this.setState({
                name: value
              });
            }}
            placeholder="用户名"
          />
          <InputItem
            styles={StyleSheet.create(newInputItemStyle)}
            onErrorPress={() => alert("clicked me")}
            onChange={value => {
              this.setState({
                password: value
              });
            }}
            type="password"
            placeholder="密码"
          />
          <InputItem
            styles={StyleSheet.create(newInputItemStyle)}
            onErrorPress={() => alert("clicked me")}
            onChange={value => {
              this.setState({
                passwordRepeat: value
              });
            }}
            type="password"
            placeholder="请再输入一遍密码"
          />
        </View>
        <Button
          style={styles.loginBtn}
          type="primary"
          onClick={this.handleSignup}
        >
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
    height: 180,
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
