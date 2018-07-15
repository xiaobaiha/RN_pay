import React from 'react';
import { DeviceEventEmitter, StyleSheet, Text, SafeAreaView, View, AsyncStorage, Image, TouchableOpacity, FlatList, Button } from 'react-native';
import { material } from 'react-native-typography';
import { Metrics, Colors } from '../Themes';
import { Entypo, FontAwesome } from '@expo/vector-icons';
import AppConfig from '../Config/AppConfig';
import FeedItem from '../Components/FeedItem'
import styles from './Styles/BookmarkScreen.styles'

export default class BookmarkScreen extends React.Component {

  static navigationOptions = ({ navigation }) => {
    const params = navigation.state.params || {};

    return {
      title: 'Bookmarks',
      tabBarIcon: ({ tintColor }) => (
        <Entypo name="bookmark"
          size={Metrics.icons.medium}
          color={tintColor} />
      ),
    };
  };

  state = {
    bookmarks: [],
    isRefreshing: false,
  }

  componentWillMount() {
    DeviceEventEmitter.addListener('reloadBookmark', this.reloadBookmarks);
  }

  componentDidMount() {
    this.reloadBookmarks();

  }

  getBookmarks = async () => {
    /* Part 5.2 */
	/* implement this function similar to the _getBookmarks() in FeedItem.js */
    try {
      const bookmark = await AsyncStorage.getItem('@bookmark');
      return (bookmark ? JSON.parse(bookmark) : []);
    } catch (error) {
      console.log(error);
    }
    return ([]);
  }

  bookmarkPressed = (item) => {
	/* Part 5.1 */
	/* similar to Part 4 */
	/* pass the item on this function as a parameter to the navigate function*/
  	const {navigate} = this.props.navigation;
    navigate('BookmarkViewerScreen', { content: item });
  }

  reloadBookmarks = async () => {
    this.setState({isRefreshing: true});
    const bookmarks = await this.getBookmarks();
    this.setState({bookmarks: bookmarks, isRefreshing: false});
  }

  _keyExtractor = (item, index) => item.id;

  renderItem = ({item}) => {
    return (
      <TouchableOpacity onPress={() => this.bookmarkPressed(item)} key={item.id}>
      <View style={styles.bookmarkContainer}>
        <Image style={styles.thumbImage} source={{uri: item.urls.thumb}}/>
        <View style={styles.textContainer}>
          <Text style={material.body1}>{item.description || "No Description"}</Text>
          <Text style={material.caption}>By {item.user.name}</Text>
        </View>
      </View>
      </TouchableOpacity>
    );
  }

  render() {

    let emptyList = null;
    if (!this.state.bookmarks[0]) {
      emptyList = (<Text style={{marginTop: Metrics.navBarHeight}}>No bookmarks exist yet!</Text>);
    }

    return (
      <View style={styles.container}>

        {emptyList}

        <FlatList
          data={this.state.bookmarks}
          keyExtractor={this._keyExtractor}
          renderItem={this.renderItem}
          onRefresh={this.reloadBookmarks}
          refreshing={this.state.isRefreshing}
        />

      </View>
    );
  }

}
