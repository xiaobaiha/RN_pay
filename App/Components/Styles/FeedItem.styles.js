
import { StyleSheet } from 'react-native';
import { Metrics, Images, Colors } from '../../Themes';

export default StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: Colors.white,
    paddingTop: Metrics.doubleBaseMargin,
    paddingBottom: Metrics.doubleBaseMargin,
  },
  userContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginLeft: Metrics.marginHorizontal,
    marginRight: Metrics.marginHorizontal,
  },
  mainImageContainer: {
    marginTop: Metrics.marginVertical,
  },
  likesContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: Metrics.marginVertical,
    marginLeft: Metrics.marginHorizontal,
    marginRight: Metrics.marginHorizontal,
  },
  descContainer: {
    marginLeft: Metrics.marginHorizontal,
    marginRight: Metrics.marginHorizontal,
  },
  dateContainer: {
    marginLeft: Metrics.marginHorizontal,
    marginRight: Metrics.marginHorizontal,
  },
  profileImage: {
    height: Metrics.icons.medium,
    width: Metrics.icons.medium,
    borderRadius: Metrics.icons.medium * 0.5
  },
  profileName: {
    paddingLeft: Metrics.marginHorizontal,
    paddingRight: Metrics.marginHorizontal,
  },
  mainImage: {
    width: Metrics.screenWidth,
  },
  mainImageLoader: {
    position: 'absolute',
    justifyContent: 'center',
    backgroundColor: Colors.black,
  }
});
