import React from "react";
import { List, SwipeAction, Button, Modal } from "antd-mobile-rn";
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  AsyncStorage,
  DeviceEventEmitter
} from "react-native";
import axios from "axios";
import { preURL } from "../config/axiosConfig";

const Item = List.Item;
export default class ShoppingConfig extends React.Component {
  state = {
    configList: [],
    shopList: []
  };
  componentWillMount() {
    DeviceEventEmitter.addListener("reloadConfig1", this.loadConfig);
  }
  componentDidMount() {
    this.loadConfig();
  }
  loadConfig = async () => {
    // axios 获取用户一键购物设置
    let ShopList = await AsyncStorage.getItem("shopList");
    ShopList = JSON.parse(ShopList).shopList;
    this.setState({ shopList: ShopList });
    let newConfigList = [];
    for (i in ShopList) {
      let newShop = {
        name: ShopList[i].name,
        key: ShopList[i].id
      };
      newConfigList.push(newShop);
    }
    this.setState({
      configList: newConfigList
    });
  };
  deleteShop = async key => {
    //axios 删除一个一键购物设置
    let ShopList = await AsyncStorage.getItem("shopList");
    ShopList = JSON.parse(ShopList).shopList;
    axios({
      method: "DELETE",
      url: preURL + "/shop-setting/" + key
    }).then(response => {
      if (response.status === 200) {
        ShopList.forEach(item => {
          if (item.id === key) {
            ShopList.splice(ShopList.indexOf(item), 1);
          }
        });
        let shopList = { shopList: ShopList };
        AsyncStorage.setItem("shopList", JSON.stringify(shopList));
        this.loadConfig();
      } else {
        Modal.alert("提示", "删除失败");
      }
    });
  };

  modifyConfig = key => {
    const { shopList } = this.state;
    const configItem = shopList.find(item => item.id === key);
    this.props.navigation.navigate("ModifyConfig", {
      config: configItem
    });
  };

  render() {
    const { configList } = this.state;
    return (
      <View style={styles.container}>
        <List renderHeader={() => "一键购物配置"}>
          {configList.map(item => {
            return (
              <SwipeAction
                autoClose
                style={{ backgroundColor: "transparent" }}
                left={[
                  {
                    text: "删除",
                    onPress: () => this.deleteShop(item.key),
                    style: { backgroundColor: "red", color: "white" }
                  }
                ]}
                key={item.key}
              >
                <Item
                  arrow="horizontal"
                  onClick={() => this.modifyConfig(item.key)}
                >
                  {item.name}
                </Item>
              </SwipeAction>
            );
          })}
        </List>
        <Button
          onClick={() => this.props.navigation.navigate("AddConfig")}
          type="primary"
        >
          新增
        </Button>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
