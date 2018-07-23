import React from "react";
import { StyleSheet, Text, ScrollView, AsyncStorage } from "react-native";
import { List, Button, Modal } from "antd-mobile-rn";
import Axios from "axios";
import { preURL } from "../config/axiosConfig";
const Item = List.Item;
export default class Orders extends React.Component {
  state = {
    orderList: []
  };
  componentWillMount() {
    // axios 获取订单列表
    this.getOrder();
  }
  async getOrder() {
    let UserId = await AsyncStorage.getItem("id");
    UserId = JSON.parse(UserId).id;
    Axios({
      method: "GET",
      url: preURL + "/shop-history?userId=" + UserId
    }).then(response => {
      this.setState({ orderList: response.data });
    });
  }

  render() {
    const { orderList } = this.state;
    return (
      <ScrollView>
        <List>
          {orderList.map(item => {
            return <Item key={item.id}>{item.info}</Item>;
          })}
        </List>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    overflow: "visible",
    height: 300
  }
});
