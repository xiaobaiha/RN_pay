import React from 'react';
import { createStackNavigator } from 'react-navigation'; 
import MainScreen from './Main';
import Pay from './src/pages/Pay';
import Orders from './src/pages/Orders';
import Information from './src/pages/Information';
import Remaining from './src/pages/Remaining';
import AddConfig from './src/pages/AddConfig';
import Page from './src/pages/PageTest';
import Login from './src/pages/Login';
import Signup from './src/pages/Signup';
import ChangePassword from './src/pages/ChangePassword';
import AddAddress from './src/pages/AddAddress';

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
    return (<Pay navigation={this.props.navigation}/>);
  }
}

class LoginScreen extends React.Component {
  static navigationOptions = {
    title: '登录',
  };
  render() {
    return (<Login navigation={this.props.navigation} />);
  }
}

class SignupScreen extends React.Component {
  static navigationOptions = {
    title: '注册',
  };
  render() {
    return (<Signup />);
  }
}

class ChangePasswordScreen extends React.Component {
  static navigationOptions = {
    title: '修改密码',
  };
  render() {
    return (<ChangePassword navigation={this.props.navigation} />);
  }
}

class AddAddressScreen extends React.Component {
  static navigationOptions = {
    title: '修改密码',
  };
  render() {
    return (<AddAddress navigation={this.props.navigation} />);
  }
}

class PageScreen extends React.Component {
  static navigationOptions = {
    title: 'demo',
  };
  render() {
    return (
      <Page />
    );
  }
}

class AddConfigScreen extends React.Component {
  static navigationOptions = {
    title: '新增购物配置',
  };
  render() {
    return (
      <AddConfig />
    );
  }
}

class InformationScreen extends React.Component {
  static navigationOptions = {
    title: '修改信息',
  };
  render() {
    return (
      <Information navigation={this.props.navigation} />
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
    AddConfig: AddConfigScreen,
    Page: PageScreen,
    Login: LoginScreen,
    Signup: SignupScreen,
    ChangePassword: ChangePasswordScreen,
    AddAddress: AddAddressScreen
  },
  {
<<<<<<< HEAD
    initialRouteName: 'Home',
    // initialRouteName: 'AddConfig',
=======
    //initialRouteName: 'Home',
    initialRouteName: 'Login',
>>>>>>> d9cec37ce2c4c0411d0be94700111af6851506c5
    // initialRouteName: 'Page',
  }
);

export default class App extends React.Component {
  render() {
    return <RootStack />;
  }
}