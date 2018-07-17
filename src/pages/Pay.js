import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { List, Radio, WhiteSpace } from 'antd-mobile-rn';
const RadioItem = Radio.RadioItem;

export default class Pay extends React.Component {
  state = {
    part1Value: 1,
    part2Value: 1,
  };
  render() {
    return (
      <View>
        <List style={{ marginTop: 12 }}>
          <Text style={{ marginTop: 12 }}>
            充值金额
          </Text>
          <RadioItem
            checked={this.state.part2Value === 1}
            onChange={(event) => {
              if (event.target.checked) {
                this.setState({ part2Value: 1 });
              }
            }}
          >
            10元
          </RadioItem>
          <RadioItem
            checked={this.state.part2Value === 2}
            onChange={(event) => {
              if (event.target.checked) {
                this.setState({ part2Value: 2 });
              }
            }}
          >
            50元
          </RadioItem>
        </List>
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
