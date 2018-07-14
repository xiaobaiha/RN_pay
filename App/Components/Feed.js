import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, View, Image, FlatList, AsyncStorage, ActivityIndicator } from 'react-native';
import { getPopularPhotos } from '../API/Unsplash.js';
import { material } from 'react-native-typography';
import { Metrics } from '../Themes';
import FeedItem from '../Components/FeedItem';
import { Entypo } from '@expo/vector-icons';
import { SearchBar } from 'antd-mobile';

export default class Feed extends React.Component {

  static defaultProps = { content: null }

  /* Part 1.3 you will need to add a new prop here of type PropTypes.func */
  /* The HomeScreen.js file is in charge of passing this prop */
  /* This prop will be a function that is called when a profile is requested */
  static propTypes = {
    content: PropTypes.array,
    listHeaderComponent: PropTypes.object,
    onProfileRequested: PropTypes.func,
  }

  state = {
    loading: false,
    feedEntries: [],
    origin: []
  }

  componentDidMount() {
    if (this.props.content) {
      this.setState({ 
        feedEntries: this.props.content,
        origin: this.props.content
      });
    } else {
      // Part 1.1
      this.getFeedData();
    }
  }

  getFeedData = () => {
    this.setState({ loading: true });
    getPopularPhotos(json => { //this code will be fetching images from the Unsplash API
      this.setState({ feedEntries: json, origin: json, loading: false });
    });
  }

  onProfilePressed = (username) => {
    /* Part 1.4 */
    /* call the prop that you created in Part 1.3 here!*/
    /* make sure that the prop is not null first by using an if statement*/
    /* when calling the prop function, pass the username to it */
    //sample call to a function inside of props: this.props.myFunction('someParameterString');
    const {onProfileRequested} = this.props;
    if(onProfileRequested){
      onProfileRequested(username);
    }
  }

  //here's a simple key extractor which uses the item's ID as a unique value indicator
  _keyExtractor = (item, index) => item.id;

  renderItem = ({ item }) => {
    /* Part 1.2 */
    /* Render the FeedItem that we made for you, here. */
    /* FeedItem props: content and onProfilePressed */
    /* Important spec: pass the function this.onProfilePressed to the FeedItem prop ^ */
    return (
      <FeedItem content={item} onProfilePressed={this.onProfilePressed}/>
    );
  }

  searchUser = (item) => {
    console.log("search user:", item);
    console.log("feed entry:", this.state.feedEntries);
    let newEntries = this.state.feedEntries.filter((entry)=>{
      return (entry.user.first_name+' '+entry.user.last_name).indexOf(item) !== -1
    });
    this.setState({
      feedEntries: newEntries
    });
    if(item === ''){
      
      const data = this.state.origin;
      console.log("data:", data);
      this.setState({
        feedEntries: data
      });
    }
  }

  searchCancel = () => {
    const data = this.state.origin;
    this.setState({
      feedEntries: data
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <SearchBar onSubmit={this.searchUser} onCancel={this.searchCancel}/>
        {this.getTabContent()}
      </View>
    );
  }

  getTabContent = () => {
    const { loading } = this.state;
    const defaultProps = this.props;

    if (loading) {
      return (
        <ActivityIndicator />
      );
    } else {
      /* Part 1.2 */
      /* You will want to put a FlatList in the return function below! remove the Text tag and replace it with a FlatList */
      /* The data source will come from your state */

      /* Part 1.5 */
      /* Your list should have a header. Research the ListHeaderComponent prop for FlatList */
      /* NOTE: that Feed.js accepts a prop called 'listHeaderComponent', which is what you should render as a header here. */
      // console.log("feedentries:", this.state.feedEntries);
      // console.log("list header:", defaultProps);
      return (

        <FlatList
          data={this.state.feedEntries}
          renderItem={({ item }) => {
              return this.renderItem({ item })
            }
          }
          listHeaderComponent={this.props.listHeaderComponent}
        />

      );
    }

  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
});
