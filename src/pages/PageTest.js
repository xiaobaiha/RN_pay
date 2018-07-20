import React from 'react';
import { PickerView } from 'antd-mobile-rn';

const seasons = [
  [
    {
      label: '春',
      value: '春',
    },
    {
      label: '夏',
      value: '夏',
    },
  ],
];

export default class PickerViewExample extends React.Component {
  state = {
    value: null,
  };
  onChange = (value) => {
    this.setState({
      value,
    });
  }
  render() {
    return (
      <PickerView
        onChange={this.onChange}
        value={this.state.value}
        data={seasons}
        cascade={false}
      />
    );
  }
}