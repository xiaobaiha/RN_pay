import React from "react";
import { StyleSheet, Text, View, AsyncStorage } from "react-native";
import axios from "axios";
import { preURL } from "../config/axiosConfig";

export default class Pay extends React.Component {
  state = {
    remains: 0
  };
  componentWillMount() {
    // axios 获取余额
    this.getBalance();
  }
  async getBalance() {
    let UserId = await AsyncStorage.getItem("id");
    UserId = JSON.parse(UserId).id;
    axios({
      method: "GET",
      url: preURL + "/balance?userId=" + UserId
    }).then(response => {
      console.log(response);
      this.setState({ remains: response.data });
    });
  }
  render() {
    const { remains } = this.state;
    return (
      <View style={styles.container}>
        <Text>您可用余额为{remains}元。</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});
