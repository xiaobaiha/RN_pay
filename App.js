import MainScreen from './Main';
import Pay from './src/pages/Pay';
import Orders from './src/pages/Orders';
import Information from './src/pages/Information';
import Remaining from './src/pages/Remaining';
// import Test from './src/pages/test';
import React from 'react';
import { createStackNavigator } from 'react-navigation'; 

class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'WeShop',
  };
  render() {
    return (
      <MainScreen navigation={this.props.navigation}/>
    );
  }
}

class PayScreen extends React.Component {
  static navigationOptions = {
    title: '充值',
  };
  render() {
    return (
      <Pay />
    );
  }
}

class InformationScreen extends React.Component {
  static navigationOptions = {
    title: '修改信息',
  };
  render() {
    return (
      <Information />
    );
  }
}

class OrdersScreen extends React.Component {
  static navigationOptions = {
    title: '订单',
  };
  render() {
    return (
      <Orders />
    );
  }
}

class RemainingScreen extends React.Component {
  static navigationOptions = {
    title: '余额',
  };
  render() {
    return (
      <Remaining />
    );
  }
}

const RootStack = createStackNavigator(
  {
    Home: HomeScreen,
    Pay: PayScreen,
    Information: InformationScreen,
    Orders: OrdersScreen,
    Remaining: RemainingScreen,
  },
  {
    initialRouteName: 'Home',
  }
);

export default class App extends React.Component {
  render() {
    return <RootStack />;
  }
}