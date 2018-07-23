import React, { Component } from "react";
import { AppRegistry, StyleSheet, Text, View, Image } from "react-native";

export default class LaunchView extends Component {
  render() {
    return (
      <Image
        source={require("../styles/imgs/launch.jpg")}
        style={styles.launchimageStyle}
      />
    );
  }

  componentDidMount() {
    //设置2秒后跳转到Main界面
    setTimeout(() => {
      this.props.navigation.navigate("Login");
    }, 2000);
  }
}

const styles = StyleSheet.create({
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

module.exports = LaunchView;
