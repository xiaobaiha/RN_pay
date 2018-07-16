import MainScreen from './Main';
import PayScreen from './src/pages/Pay';
import React from 'react';
import { createStackNavigator } from 'react-navigation'; // Version can be specified in package.json

const RootStack = createStackNavigator(
  {
    Home: ({ navigation }) => (<MainScreen navigation={navigation}/>),
    Details: ({ navigation }) => (<PayScreen navigation={navigation}/>),
  },
  {
    initialRouteName: 'Home',
  }
);

export default class App extends React.Component {
  componentDidMount(){
    // this.props.navigation.navigate('Details');
  }
  render() {
    return <RootStack />;
  }
}