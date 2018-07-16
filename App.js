import React from 'react';
import {SearchBar ,TabBar} from 'antd-mobile-rn';
import { StyleSheet, Text, View } from 'react-native';
import AKS from './src/pages/AKS';
import Setting from './src/pages/Setting';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTab: 'yellowTab',
    };
  }

  renderContent(pageText) {
    return (
      <View style={{ flex: 1, alignItems: 'center', backgroundColor: 'white' }}>
        <SearchBar placeholder="Search" showCancelButton />
        <Text style={{ margin: 50 }}>{pageText}</Text>
      </View>
    );
  }

  onChangeTab(tabName) {
    this.setState({
      selectedTab: tabName,
    });
  }
  render() {
    return (
        <TabBar
        unselectedTintColor="#949494"
        tintColor="#33A3F4"
        barTintColor="#ccc"
      >
      <TabBar.Item
          icon={require('./src/styles/imgs/busi.png')}
          selectedIcon={require('./src/styles/imgs/busi_sel.png')}
          title='一键购物'
          selected={this.state.selectedTab === 'yellowTab'}
          onPress={() => this.onChangeTab('yellowTab')}
        >
          {/* {this.renderContent('My Tab')} */}
          <AKS />
        </TabBar.Item>
        <TabBar.Item
          icon={require('./src/styles/imgs/friend.png')}
          selectedIcon={require('./src/styles/imgs/friend_sel.png')}
          title="管理"
          selected={this.state.selectedTab === 'greenTab'}
          onPress={() => this.onChangeTab('greenTab')}
        >
          {/* {this.renderContent('Friend Tab')} */}
          <Setting />
        </TabBar.Item>
        
      </TabBar>
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
