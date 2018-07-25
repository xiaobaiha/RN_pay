import React from "react";
import { StyleSheet, Text, View, AsyncStorage, Alert } from "react-native";
import axios from "axios";
import { preURL } from "../config/axiosConfig";
import { Button, InputItem, List, Modal } from "antd-mobile-rn";
import InputItemStyle from "antd-mobile-rn/lib/input-item/style/index.native";

let newInputItemStyle = {
  ...InputItemStyle,
  container: {
    ...InputItemStyle.container,
    borderBottomColor: "#3b4757",
    width: "85%",
    marginBottom: 20
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
export default class ChangePassword extends React.Component {
  state = {
    currentStep: 0,
    currentPassword: "",
    newPassword: "",
    newPasswordRepeat: ""
  };
  handleNext = () => {
    // axios 检验密码是否正确
    this.checkPassword();
  };
  async checkPassword() {
    let username = await AsyncStorage.getItem("username");
    axios({
      method: "POST",
      url: preURL + "/Login",
      dataType: "json",
      data: {
        user_name: username,
        user_password: this.state.currentPassword
      },
      headers: {
        "Content-Type": "application/json;charset=UTF-8"
      }
    }).then(response => {
      if (response.data.Login_result === "ok") {
        this.setState({ currentStep: 1 });
      } else {
        Modal.alert("提示", "密码错误");
      }
    });
  }
  handleChangePassword = async () => {
    const { currentPassword, newPassword, newPasswordRepeat } = this.state;
    if (currentPassword === newPassword) {
      Modal.alert("修改失败", "新密码与原密码相同");
      return;
    } else if (newPassword !== newPasswordRepeat) {
      Modal.alert("修改失败", "两次输入的密码不同");
      return;
    } else if (newPassword.length < 6) {
      Modal.alert("修改失败", "密码必须大于等于6位");
      return;
    }
    // axios 修改密码
    let username = await AsyncStorage.getItem("username");
    axios({
      method: "POST",
      url: preURL + "/Update_password",
      dataType: "json",
      data: {
        new_userpassword: this.state.newPassword,
        user_name: username,
        user_password: this.state.currentPassword
      }
    }).then(response => {
      if (response.data.Update_password_result === "ok") {
        Modal.alert("提示", "修改成功", [
          {
            text: "确定",
            onPress: () => {
              this.props.navigation.navigate("Home");
            }
          }
        ]);
      } else {
        Modal.alert("提示", "修改失败");
      }
    });
  };

  render() {
    const { currentStep } = this.state;
    if (currentStep === 0) {
      return (
        <View style={styles.container}>
          <InputItem
            styles={StyleSheet.create(newInputItemStyle)}
            onErrorPress={() => alert("clicked me")}
            onChange={value => {
              this.setState({
                currentPassword: value
              });
            }}
            type="password"
            placeholder="当前密码"
          />
          <Button style={styles.btn} onClick={this.handleNext}>
            下一步
          </Button>
        </View>
      );
    } else if (currentStep === 1) {
      return (
        <View style={styles.container}>
          <InputItem
            styles={StyleSheet.create(newInputItemStyle)}
            onErrorPress={() => alert("clicked me")}
            onChange={value => {
              this.setState({
                newPassword: value
              });
            }}
            value={this.state.newPassword}
            type="password"
            placeholder="新密码"
          />
          <InputItem
            styles={StyleSheet.create(newInputItemStyle)}
            onErrorPress={() => alert("clicked me")}
            onChange={value => {
              this.setState({
                newPasswordRepeat: value
              });
            }}
            type="password"
            placeholder="请再输入一遍新密码"
          />
          <Button
            type="primary"
            style={styles.btn}
            onClick={this.handleChangePassword}
          >
            修改密码
          </Button>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#3b4757",
    justifyContent: "center",
    alignItems: "center"
  },
  btn: {
    width: "80%"
  }
});
