import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { material } from 'react-native-typography';
import { Metrics } from '../Themes';
import { Entypo } from '@expo/vector-icons';
import Feed from '../Components/Feed'

export default class HomeScreen extends React.Component {

  static navigationOptions = ({ navigation }) => {
    const params = navigation.state.params || {};

    return {
      headerTitle: (
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
          <Text style={material.body2}>Unsplash</Text>
          <Text style={[material.caption, {fontSize: 10}]}>Popular</Text>
        </View>
      ),
      tabBarIcon: ({ tintColor }) => (
        <Entypo name="home"
          size={Metrics.icons.medium}
          color={tintColor} />
      ),
    };
  };

  onProfileRequested = (username) => {
    console.log("Requested: " + username);

	/* Part 4 */
    /* you will want to call the navigate function here */
    /* this function will be inside of this.props.navigation */
    /* think of destructing the function "navigate" from inside of your navigation props*/

    /* We can only call the navigate function from here because AppNavigation only explicitly defines this as a screen (under the stack that you created). */
    /* The Feed.js and FeedItem.js are invisible to the app's navigation, therefore they cannot be used to navigate. We must pass everything back to here. */

    /* Navigate to your UserProfileScreen.js file */
    /* Go to AppNavigation.js and see how you declared your UserProfileScreen, then navigate to it by passing it */
    /* as the first parameter of the navigate function */

    /* pass the username on this function as a parameter to the navigate function, below is a prototype*/
    const {navigate} = this.props.navigation;
    console.log("naviagte", navigate);
    navigate('UserProfileScreen', { username: username });
  }

  render() {
    return (
      <View style={styles.container}>
        <Feed onProfileRequested={this.onProfileRequested} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
