import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  AsyncStorage,
  DeviceEventEmitter
} from "react-native";
import axios from "axios";
import { preURL } from "../config/axiosConfig";
import { List, Modal, Button, Radio, InputItem } from "antd-mobile-rn";

const Item = List.Item;
const RadioItem = Radio.RadioItem;
const Brief = Item.Brief;

export default class ModifyConfig extends React.Component {
  constructor(props) {
    super(props);
    const config = props.navigation.getParam("config", "item default config");
    this.state = {
      productList: [], // 商品列表
      numbers: config.amount, // 商品数量
      address: [], // 地址
      productListVisible: false,
      selectProduct: config.itemId,
      selectAddress: -1,
      selectAddressStr: config.address,
      addressListVisible: false,
      configName: config.name,
      ID: config.id
    };
  }
  componentWillMount() {
    // axios 获取商品列表
    axios({
      method: "GET",
      url: preURL + "/items"
    }).then(response => {
      console.log(response);
      const productList = response.data;
      this.setState({ productList: productList });
    });
    // asyncstorage 获取地址
    this.getArray();
  }
  async getArray() {
    let Address = await AsyncStorage.getItem("addresses");
    let { selectAddressStr } = this.state;
    let index = JSON.parse(Address).addresses.findIndex(
      item => selectAddressStr === item
    );
    this.setState({
      address: JSON.parse(Address).addresses,
      selectAddress: index
    });
  }
  configNameExist = async name => {
    // async 检查配置名称是否存在
    // 若存在 return true, 否则false
    let flag = 0;
    return this.getShopList().then(ShopList => {
      ShopList.filter(item => item.id !== this.state.ID).forEach(item => {
        if (item.name === name) {
          flag = 1;
        }
      });
      if (flag === 1) {
        return new Promise(resolve => resolve(true));
      } else {
        return new Promise(resolve => resolve(false));
      }
    });
  };
  async getShopList() {
    let ShopList = await AsyncStorage.getItem("shopList");
    ShopList = JSON.parse(ShopList).shopList;
    return new Promise(resolve => resolve(ShopList));
  }
  handleModifyConfig = () => {
    const { selectProduct, selectAddress, numbers, configName } = this.state;
    this.configNameExist(this.state.configName).then(value => {
      if (value) {
        Modal.alert("修改配置失败", "配置名称已存在");
      } else if (numbers === 0) {
        Modal.alert("修改配置失败", "购买数量不能为0");
      } else if (numbers > 100) {
        Modal.alert("修改配置失败", "购买数量不得超过100个");
      } else if (configName === "") {
        Modal.alert("修改配置失败", "名称不能为空");
      } else if (configName.length > 10) {
        Modal.alert("修改配置失败", "名称不能超过10个字符");
      } else if (selectAddress === -1) {
        Modal.alert("修改配置失败", "未选择地址");
      } else if (selectProduct === -1) {
        Modal.alert("修改配置失败", "未选择商品");
      } else {
        this.modifyShop();
      }
    });
  };
  modifyShop = async () => {
    // axios 增加购物配置  => axios 修改购物配置
    let UserId = await AsyncStorage.getItem("id");
    UserId = JSON.parse(UserId).id;
    axios({
      method: "PUT",
      url: preURL + "/shop-setting/" + this.state.ID,
      dataType: "json",
      data: {
        address: this.state.address[this.state.selectAddress],
        amount: this.state.numbers,
        intervalTime: 10, //?
        itemId: this.state.selectProduct,
        userId: UserId,
        name: this.state.configName
      },
      headers: {
        "Content-Type": "application/json;charset=UTF-8"
      }
    }).then(response => {
      if (response.status === 200) {
        Modal.alert("提示", "修改成功", [
          {
            text: "确定",
            onPress: () => {
              this.props.navigation.goBack();
            }
          }
        ]);
        this.modifyProductList(UserId, this.state.ID);
      } else {
        Modal.alert("提示", "修改失败");
      }
    });
  };
  async modifyProductList(UserId, Id) {
    let ShopList = await AsyncStorage.getItem("shopList");
    ShopList = JSON.parse(ShopList).shopList;
    let modifyShop = {
      id: Id,
      userId: UserId,
      itemId: this.state.selectProduct,
      amount: this.state.numbers,
      address: this.state.address[this.state.selectAddress],
      intervalTime: 10, //?
      name: this.state.configName
    };
    ShopList.forEach(item => {
      if (item.id === Id) {
        ShopList[ShopList.indexOf(item)] = modifyShop;
      }
    });
    let shopList = { shopList: ShopList };
    await AsyncStorage.setItem("shopList", JSON.stringify(shopList));
    //通知ShoppingConfig更新数据
    DeviceEventEmitter.emit("reloadConfig1", []);
    //通知AKS更新数据
    DeviceEventEmitter.emit("reloadConfig2", []);
  }
  render() {
    const {
      numbers,
      configName,
      productList,
      selectProduct,
      selectAddress,
      address
    } = this.state;
    let selectExtra;
    productList.forEach(item => {
      if (item.id === selectProduct) {
        selectExtra = item.itemName;
      }
    });
    return (
      <View>
        <List renderHeader={() => "修改配置"}>
          <InputItem
            onErrorPress={() => alert("clicked me")}
            onChange={value => {
              this.setState({
                configName: value
              });
            }}
            value={configName}
            type="text"
            placeholder="配置名称"
          >
            配置名称
          </InputItem>
          <Item
            arrow="horizontal"
            extra={selectExtra ? selectExtra : ""}
            onClick={() => this.setState({ productListVisible: true })}
          >
            选择商品
          </Item>
          <InputItem
            onErrorPress={() => alert("clicked me")}
            onChange={value => {
              if (!isNaN(parseInt(value))) {
                this.setState({
                  numbers: parseInt(value)
                });
              } else if (value === "") {
                this.setState({
                  numbers: 0
                });
              }
            }}
            value={"" + numbers}
            type="number"
            placeholder="购买数量"
          >
            购买数量
          </InputItem>
          <Item
            arrow="horizontal"
            extra={selectAddress > -1 ? "已选择" : ""}
            onClick={() => this.setState({ addressListVisible: true })}
          >
            选择地址
          </Item>
          <Button type="primary" onClick={this.handleModifyConfig}>
            确认修改
          </Button>
        </List>
        <Modal
          popup
          visible={this.state.productListVisible}
          animationType="slide-up"
          onClose={() => this.setState({ productListVisible: false })}
        >
          <ScrollView
            contentContainerStyle={{
              paddingVertical: 20,
              paddingHorizontal: 20
            }}
          >
            {productList.map(item => {
              return (
                <RadioItem
                  thumb="../styles/imgs/buy.png"
                  checked={selectProduct === item.id}
                  onChange={event => {
                    if (event.target.checked) {
                      this.setState({ selectProduct: item.id });
                    }
                    this.setState({ productListVisible: false });
                  }}
                  key={item.id}
                >
                  <View style={styles.outer}>
                    <View>
                      <Image
                        style={styles.innerImg}
                        source={{
                          uri: `https://raw.githubusercontent.com/xiaobaiha/RN_pay/master/src/styles/imgs/${
                            item.id
                          }.jpg`
                        }}
                      />
                    </View>
                    <View>
                      <Text>{item.itemName}</Text>
                      <Text>价格:{item.price}</Text>
                      <Text>商品描述:{item.description}</Text>
                    </View>
                  </View>
                </RadioItem>
              );
            })}
          </ScrollView>
          <Button onClick={() => this.setState({ productListVisible: false })}>
            关闭
          </Button>
        </Modal>
        <Modal
          popup
          visible={this.state.addressListVisible}
          animationType="slide-up"
          onClose={() => this.setState({ addressListVisible: false })}
        >
          <ScrollView
            contentContainerStyle={{
              paddingVertical: 20,
              paddingHorizontal: 20
            }}
          >
            {address.map((item, index) => {
              return (
                <RadioItem
                  thumb="../styles/imgs/buy.png"
                  checked={selectAddress === index}
                  onChange={event => {
                    if (event.target.checked) {
                      this.setState({ selectAddress: index });
                    }
                    this.setState({ addressListVisible: false });
                  }}
                  key={index}
                >
                  <View>
                    <Text>{item}</Text>
                  </View>
                </RadioItem>
              );
            })}
          </ScrollView>
          <Button onClick={() => this.setState({ addressListVisible: false })}>
            关闭
          </Button>
        </Modal>
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
  },
  outer: {
    flexDirection: "row"
  },
  innerImg: {
    width: 50,
    height: 50,
    margin: 10
  }
});
