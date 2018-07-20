import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button, InputItem, List } from 'antd-mobile-rn';
import Item from '../../node_modules/antd-mobile-rn/lib/list/ListItem.native';

export default class Pay extends React.Component {
  state = {
    changeDisabled: true,
    name: 'llx',
    address: ['123123','12321312','1232113'],
    phone: '12312312222',
  }
  componentWillMount(){
    // axios 获取用户信息
  }
  toggleChangeState = () => {
    let {changeDisabled} = this.state;
    // alert(changeDisabled);
    this.setState({changeDisabled: !changeDisabled})
  }
  addAddress = () => {
    
  }
  render() {
    let {name,phone,changeDisabled,address} = this.state;
    return (
      <View>
        <InputItem
          editable={false}
          onErrorPress={() => alert('clicked me')}
          value={name}
          placeholder="用户名"
        >
          用户名
        </InputItem>
        <InputItem
          editable={false}
          type='phone'
          onErrorPress={() => alert('clicked me')}
          value={phone}
          onChange={(value)=>{
            if(!changeDisabled){
              this.setState({phone: value})
            }
          }}
        >
          电话
        </InputItem>
        {address.map((item,index)=>{
          return (<InputItem
            key={'address'+index}
            onErrorPress={() => alert('clicked me')}
            value={item}
            onChange={(value)=>{
              if(!changeDisabled){
                let address = address.splice(index, 1, value);
                this.setState({address: address})
              }
            }}
          >
            <Text>地址{index+1}</Text>
          </InputItem>)
        })}
        
        {changeDisabled?null:<Button onClick={this.addAddress}>增加地址</Button>}
        <Button type='primary' onClick={this.toggleChangeState}>{changeDisabled?'修改信息':'提交修改'}</Button>
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
