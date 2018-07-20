import React from 'react';
import { StyleSheet, Text, View, AsyncStorage } from 'react-native';
import axios from 'axios';
import { preURL } from '../config/axiosConfig';
import {List, Modal, Button, Radio, InputItem} from 'antd-mobile-rn';

const Item = List.Item;
const RadioItem = Radio.RadioItem;
const Brief = Item.Brief;

export default class AddConfig extends React.Component {
  state = {
    productList: [], // 商品列表
    numbers: 0, // 商品数量
    address: ['13123','123123'], // 地址
    phone: '', // 联系电话
    productListVisible: false,
    selectProduct: -1,
    selectAddress: -1,
    addressListVisible: false,
  }
  componentWillMount() {
    // axios 获取商品列表
    axios({
      method: "GET",
      url: preURL + "/items"
    }).then(response => {
      console.log(response)
      //alert(JSON.stringify(response.data))
      this.setState({ productList: response.data })
    });
    // asyncstorage 获取地址
    this.getArray()
  }
  async getArray(){
    let Address = await AsyncStorage.getItem('addresses');
    this.setState({ address : JSON.parse(Address).addresses });
    //alert(this.state.address);
  }
  handleAddConfig = () => {
    // axios 增加购物配置
  }
  render() {
    const {productList,selectProduct,selectAddress,address} = this.state;
    let selectExtra;
    productList.forEach(item => {
      if(item.id === selectProduct){
        selectExtra = item.itemName;
      }
    });
    return (
      <View>
        <List renderHeader={() => '添加配置'}>
          <Item arrow="horizontal" extra={selectExtra?selectExtra:''} onClick={() => this.setState({productListVisible: true})}>
            选择商品
          </Item>
          <InputItem
              onErrorPress={() => alert('clicked me')}
              onChange={(value) => {
                this.setState({
                  buyAmount: value,
                });
              }}
              type='number'
              placeholder="购买数量"
            >
              购买数量
            </InputItem>
          <Item arrow="horizontal" extra={selectAddress>-1?'已选择':''} onClick={() => this.setState({addressListVisible: true})}>
            选择地址
          </Item>
          <InputItem
              onErrorPress={() => alert('clicked me')}
              onChange={(value) => {
                this.setState({
                  phone: value,
                });
              }}
              type='phone'
              placeholder="电话"
            >
              联系电话
            </InputItem>
          <Button type='primary' onClick={this.handleAddConfig}>增加配置</Button>
        </List>
        <Modal
          popup
          visible={this.state.productListVisible}
          animationType="slide-up"
          onClose={()=>this.setState({productListVisible: false})}
        >
          <View style={{ paddingVertical: 20, paddingHorizontal: 20 }}>
            {productList.map(item=>{
              return (<RadioItem
                thumb='../styles/imgs/buy.png'
                checked={selectProduct === item.id}
                onChange={(event) => {
                  if (event.target.checked) {
                    this.setState({ selectProduct: item.id });
                  }
                  this.setState({productListVisible: false})
                }}
                key={item.id}
              >
                <View>
                  <Text>{item.itemName}</Text>
                  <Text>价格:{item.price}</Text>
                  <Text>商品描述:{item.description}</Text>
                </View>
              </RadioItem>)
            })}
          </View>
          <Button onClick={()=>this.setState({productListVisible: false})}>关闭</Button>
        </Modal>
        <Modal
          popup
          visible={this.state.addressListVisible}
          animationType="slide-up"
          onClose={()=>this.setState({addressListVisible: false})}
        >
          <View style={{ paddingVertical: 20, paddingHorizontal: 20 }}>
            {address.map((item,index)=>{
              return (<RadioItem
                thumb='../styles/imgs/buy.png'
                checked={selectAddress === index}
                onChange={(event) => {
                  if (event.target.checked) {
                    this.setState({ selectAddress: index });
                  }
                  this.setState({addressListVisible: false})
                }}
                key={index}
              >
                <View>
                  <Text>'address'</Text>
                </View>
              </RadioItem>)
            })}
          </View>
          <Button onClick={()=>this.setState({addressListVisible: false})}>关闭</Button>
        </Modal>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
