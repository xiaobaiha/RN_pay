import React from "react";
import { StyleSheet, Text, View, AsyncStorage } from "react-native";
import axios from "axios";
import { preURL } from "../config/axiosConfig";
import { List } from "antd-mobile-rn";
const Item = List.Item;
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
      <View>
        <View style={styles.container}>
          <Text style={styles.remainText}>账户余额(元)：</Text>
          <Text style={styles.numberText}>{"" + remains + ".00"}</Text>
        </View>
        <List>
          <Item
            arrow="horizontal"
            onClick={() => this.props.navigation.navigate("Pay")}
          >
            充值
          </Item>
        </List>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#1c81d3"
  },
  remainText: {
    color: "#85ccf7",
    fontSize: 20,
    marginTop: 40,
    marginLeft: 20,
    marginBottom: 20
  },
  numberText: {
    color: "white",
    fontSize: 60,
    margin: 20
  }
});
