import React from "react";
import { Button, Modal } from "antd-mobile-rn";
import {
  StyleSheet,
  ScrollView,
  AsyncStorage,
  Text,
  View,
  Image,
  DeviceEventEmitter,
  ImageBackground,
  TouchableHighlight
} from "react-native";
import axios from "axios";
import { preURL } from "../config/axiosConfig";
// import ButtonStyle from "antd-mobile-rn/lib/button/style/index.native";

// let newButtonStyle = {
//   ...ButtonStyle,
//   container: {
//     ...ButtonStyle.container,
//     flexDirection: "column"
//   }
// };

export default class AKS extends React.Component {
  state = {
    configList: []
  };
  componentWillMount() {
    DeviceEventEmitter.addListener("reloadConfig2", this.getShopInfo);
  }
  componentDidMount() {
    // AsyncStorgae 获取一键购物配置
    this.getShopInfo();
  }
  getShopInfo = async () => {
    let ShopList = await AsyncStorage.getItem("shopList");
    ShopList = JSON.parse(ShopList).shopList;
    this.setState({ configList: ShopList });
  };
  handleClick = key => {
    // axios 一键购物
    let ShopItem = this.state.configList.filter(item => {
      return item.id == key;
    });
    axios({
      method: "POST",
      url: preURL + "/shop",
      dataType: "json",
      data: ShopItem[0],
      headers: {
        "Content-Type": "application/json;charset=UTF-8"
      }
    }).then(response => {
      if (response.data === "success") {
        Modal.alert("提示", "购买成功");
      } else {
        Modal.alert("购买失败", response.data);
      }
    });
  };
  render() {
    const { configList } = this.state;
    return (
      <ScrollView>
        <ImageBackground
          source={require("../styles/imgs/index_bg.jpg")}
          style={styles.outer}
        >
          <Text style={styles.weshopText}>WeShop</Text>
          <Text style={styles.extraText}>一键购物</Text>
          <View style={styles.btn_group}>
            {configList.map(item => {
              let tempStr =
                "https://raw.githubusercontent.com/xiaobaiha/RN_pay/master/src/styles/imgs/" +
                item.itemId +
                ".jpg";
              return (
                <TouchableHighlight
                  key={item.id}
                  onPress={() => this.handleClick(item.id)}
                  style={styles.btn}
                  underlayColor="white"
                >
                  <View>
                    <Image
                      style={styles.innerImg}
                      source={{
                        uri: tempStr
                      }}
                    />
                    <Text style={styles.btnText}>{item.name}</Text>
                  </View>
                </TouchableHighlight>
              );
            })}
            {configList.length === 0 ? (
              <View style={styles.noConfig}>
                <Text>您还没有进行配置(┬＿┬)</Text>
                <Text>请先增加购物配置</Text>
              </View>
            ) : null}
          </View>
        </ImageBackground>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    flexWrap: "wrap"
  },
  outer: {
    flex: 1,
    flexDirection: "column"
  },
  btn_group: {
    flex: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    flexWrap: "wrap",
    width: "100%",
    height: "100%"
  },
  btn: {
    width: 170,
    height: 200,
    margin: 10,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    backgroundColor: "white",
    borderColor: "grey",
    borderRadius: 10
  },
  noConfig: {
    width: 300,
    height: 200,
    marginLeft: 100,
    marginTop: 250,
    flexDirection: "column"
  },
  innerImg: {
    width: 150,
    height: 150
  },
  weshopText: {
    flex: 3,
    fontSize: 40,
    marginTop: 40,
    marginLeft: 20,
    color: "white"
  },
  extraText: {
    flex: 2,
    fontSize: 30,
    marginLeft: 20,
    color: "white"
  }
});
