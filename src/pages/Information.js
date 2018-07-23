import React from "react";
import {
  StyleSheet,
  Text,
  ScrollView,
  AsyncStorage,
  DeviceEventEmitter
} from "react-native";
import { Button, InputItem, List, Modal } from "antd-mobile-rn";
import Item from "../../node_modules/antd-mobile-rn/lib/list/ListItem.native";
import axios from "axios";
import { preURL } from "../config/axiosConfig";

export default class Information extends React.Component {
  state = {
    changeDisabled: true,
    name: "llx",
    address: ["123123", "12321312", "1232113"],
    phone: "12312312222",
    userId: 0
  };
  componentWillMount() {
    DeviceEventEmitter.addListener("reloadInfo", this.getInfo);
  }
  componentDidMount() {
    // AsyncStorage 获取用户信息
    this.getInfo();
  }
  getInfo = async () => {
    let Name = await AsyncStorage.getItem("username");
    this.setState({ name: Name });
    let Address = await AsyncStorage.getItem("addresses");
    this.setState({ address: JSON.parse(Address).addresses });
    let Phone = await AsyncStorage.getItem("tel");
    this.setState({ phone: Phone });
    let UserId = await AsyncStorage.getItem("id");
    this.setState({ userId: JSON.parse(UserId).id });
  };
  toggleChangeState = async () => {
    let { changeDisabled } = this.state;
    if (changeDisabled) {
      this.setState({ changeDisabled: !changeDisabled });
    } else {
      // axios 修改用户信息
      axios({
        method: "POST",
        url: preURL + "/information",
        dataType: "json",
        data: {
          addresses: this.state.address,
          id: this.state.userId,
          tel: this.state.phone,
          userName: this.state.name
        },
        headers: {
          "Content-type": "application/json;charset=UTF-8"
        }
      }).then(response => {
        if (response.data === "success") {
          Modal.alert("提示", "修改成功", [
            {
              text: "确定",
              onPress: () => {
                let Addresses = { addresses: this.state.address };
                AsyncStorage.setItem("addresses", JSON.stringify(Addresses));
                AsyncStorage.setItem("tel", this.state.phone);
              }
            }
          ]);
        } else {
          Modal.alert("提示", response.data);
        }
      });
    }
  };

  addAddress = () => {
    this.props.navigation.navigate("AddAddress");
  };
  render() {
    let { name, phone, changeDisabled, address } = this.state;
    return (
      <ScrollView>
        <InputItem
          editable={false}
          onErrorPress={() => alert("clicked me")}
          value={name}
          placeholder="用户名"
        >
          用户名
        </InputItem>
        <InputItem
          editable={false}
          type="phone"
          onErrorPress={() => alert("clicked me")}
          value={phone}
          onChange={value => {
            if (!changeDisabled) {
              this.setState({ phone: value });
            }
          }}
        >
          电话
        </InputItem>
        {address.map((item, index) => {
          return (
            <InputItem
              key={"address" + index}
              onErrorPress={() => alert("clicked me")}
              value={address[index]}
              onChange={value => {
                if (!changeDisabled) {
                  address.splice(index, 1, value);
                  this.setState({ address: address });
                }
              }}
            >
              <Text>地址{index + 1}</Text>
            </InputItem>
          );
        })}

        {changeDisabled ? null : (
          <Button onClick={this.addAddress}>增加地址</Button>
        )}
        <Button type="primary" onClick={this.toggleChangeState}>
          {changeDisabled ? "修改信息" : "提交修改"}
        </Button>
      </ScrollView>
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
