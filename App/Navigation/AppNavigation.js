import { TabNavigator, StackNavigator } from 'react-navigation'
import React from 'react';
import { Images, Colors, Metrics } from '../Themes'
import { StyleSheet, Image } from 'react-native';

import HomeScreen from '../Screens/HomeScreen'
import BookmarkScreen from '../Screens/BookmarkScreen'
import BookmarkViewerScreen from '../Screens/BookmarkViewerScreen'
import UserProfileScreen from '../Screens/UserProfileScreen'


/* Part 3 */
/* Part 3.1: Create a StackNavigator that contains the HomeScreen, and the UserProfileScreen */
/* initialRouteName should be your HomeScreen. Set headerMode to 'float'  */
const HomeScreenNav = StackNavigator({
	HomeScreen: { screen: HomeScreen},
	UserProfileScreen: { screen: UserProfileScreen},
}, {
	initialRouteName:'HomeScreen',
	headerMode: 'float',
	},
)

/* Part 3.2: Create a StackNavigator that contains the BookmarkScreen, and the BookmarkViewerScreen */
/* initialRouteName should be your BookmarkScreen. Set headerMode to 'float'  */
const BookmarkNav = StackNavigator({
	BookmarkScreen: { screen: BookmarkScreen},
	BookmarkViewerScreen: { screen: BookmarkViewerScreen},
}, {
	initialRouteName:'BookmarkScreen',
	headerMode: 'float',
	},
)
/* Part 3.3: nest both StackNavigators in the TabNavigator below */
/* Your FeedScreen should point to the StackNavigator that you created in Part 3.1 */
/* Your BookmarkScreen should point to the StackNavigator that you created in Part 3.2 */

// Manifest of possible screens
const TabNav = TabNavigator({
  FeedScreen: { screen: HomeScreenNav },
  BookmarkScreen:   { screen: BookmarkNav },
}, {
  // Default config for all screens
  initialRouteName: 'FeedScreen',
  tabBarOptions: {
    activeTintColor: Colors.black,
    showLabel: false,
  },
})

export default TabNav
