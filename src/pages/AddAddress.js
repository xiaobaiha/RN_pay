import React from "react";
import {
  StyleSheet,
  Text,
  View,
  AsyncStorage,
  DeviceEventEmitter
} from "react-native";
import axios from "axios";
import { preURL } from "../config/axiosConfig";
import { List, Picker, InputItem, Button, Modal } from "antd-mobile-rn";
import { district } from "antd-mobile-demo-data";

export default class AddAddress extends React.Component {
  state = {
    data: [],
    value: [],
    detailAddress: ""
  };
  saveAddress = async () => {
    const { value, detailAddress } = this.state;
    if (value.length === 0) {
      Modal.alert("增加地址失败", "请先选择地区");
      return;
    } else if (detailAddress === "") {
      Modal.alert("增加地址失败", "请输入详细地址");
      return;
    } 
    let name = [];
    district.forEach(item1 => {
      if (item1.value === value[0]) {
        name.push(item1.label);
        item1.children.forEach(item2 => {
          if (item2.value === value[1]) {
            name.push(item2.label);
            item2.children.forEach(item3 => {
              if (item3.value === value[2]) {
                name.push(item3.label);
              }
            });
          }
        });
      }
    });
    
    let fullAddress = name.join("") + detailAddress;
    if (fullAddress.length > 100) {
      Modal.alert("增加地址失败", "地址过长");
      return;
    }
    // axios 增加地址
    let Address = await AsyncStorage.getItem("addresses");
    Address = JSON.parse(Address).addresses;
    let UserName = await AsyncStorage.getItem("username");
    let Tel = await AsyncStorage.getItem("tel");
    let Id = await AsyncStorage.getItem("id");
    Id = JSON.parse(Id).id;
    axios({
      method: "POST",
      url: preURL + "/information",
      dataType: "json",
      data: {
        addresses: [...Address, fullAddress],
        id: Id,
        tel: Tel,
        userName: UserName
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
              //this.saveAddress();
              Address = [...Address, fullAddress];
              let Addresses = { addresses: Address };
              AsyncStorage.setItem("addresses", JSON.stringify(Addresses));
              DeviceEventEmitter.emit("reloadInfo", []);
              this.props.navigation.goBack();
            }
          }
        ]);
      } else {
        Modal.alert("提示", response.data);
      }
    });
  };
  onClick = () => {
    this.setState({
      data: district
    });
  };
  render() {
    return (
      <View>
        <List>
          <Picker
            data={this.state.data}
            cols={3}
            value={this.state.value}
            onChange={value => this.setState({ value })}
          >
            <List.Item arrow="horizontal" last onClick={this.onClick}>
              选择地区
            </List.Item>
          </Picker>
          <InputItem
            editable={false}
            onErrorPress={() => alert("clicked me")}
            onChange={value => this.setState({ detailAddress: value })}
          >
            详细地址
          </InputItem>
          <Button type="primary" onClick={this.saveAddress}>
            保存地址
          </Button>
        </List>
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
