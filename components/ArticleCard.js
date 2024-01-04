import {
  StyleSheet,
  Text,
  View,
  Image,
  ImageBackground,
  Pressable,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Share
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {width, height} from '../config/GlobalStyles';
import moment from 'moment/moment';
import Dot from '../assets/img/dot.svg';
import {FontFamily} from '../config/GlobalStyles';
import {Color} from '../config/GlobalStyles';
import DotOption from '../assets/img/dotOption.svg';
import ShareButt from '../assets/img/share.svg';
import Heart from '../assets/img/heart.svg';
import Line from '../assets/img/Line.svg';
import {ARTICLES_READ} from '../routes';
import {useNavigation} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import {option} from '../Redux/Slice/OptionSlice';
import {useSelector} from 'react-redux';
const cardItemHeight = 136;
const ArticleCard = ({
  title,
  window_title,
  create_date,
  image_location,
  dc_name,
  articleId,
}) => {
  const createdAt = moment(`${create_date}`, 'YYYYMMDD').fromNow();
  const image = image_location;
  const [showOptions, setShowOptions] = useState(false);
  const optionData = useSelector(state => state.option.option);
  const navigation = useNavigation();

  const dispatch = useDispatch();
  const handleOptionPress = () => {
    setShowOptions(!showOptions), console.log('Touched', showOptions);
    dispatch(option( articleId));  
  };

  const onShare = async () => {
    try {
      const result = await Share.share({
        message: `https://all-cures.com/cure/${articleId}-${title}`,
      });

      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    // Article Card Component

    <View style={styles.cardContainer}>
      <Pressable
        activeOpacity={0.7}
        style={styles.detailsCardContainer}
        onPressIn={() => setShowOptions(false)}
        onPress={() => {
          dispatch(option(-85)),
          navigation.navigate(ARTICLES_READ, {
            articleId: articleId,
            title: title,
            image: image_location,
          });
        }}>
        <Text style={styles.article_title}>
          {window_title}{' '}
          {dc_name !== undefined && (
            <Text style={{color: Color.colorDarkgray}}> in </Text>
          )}{' '}
          {dc_name}
        </Text>
        <Text style={styles.title} numberOfLines={2}>
          {title}
        </Text>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Text style={styles.time}>
            10 min ago <Dot height={5} width={5} /> {createdAt}{' '}
          </Text>
        </View>
      </Pressable>
      <View style={{justifyContent: 'center'}}>
        <View
          style={{width: 100, height: 100, backgroundColor: Color.colorSilver}}>
          <ImageBackground
            style={styles.image}
            source={{
              uri: image,
            }}>
            <Pressable
              onPress={handleOptionPress}
              style={styles.optionsBtn}
              hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}>
              <DotOption />
            </Pressable>
            {((optionData ==articleId) && showOptions)  && (
              <View style={styles.options}>
                <TouchableOpacity style={{}}>
                  <Heart width={'11.74'} height={'15'} />
                </TouchableOpacity>
                <TouchableOpacity>
                  <Line width={'11.74'} height={'15'} />
                </TouchableOpacity>
                <TouchableOpacity style={{}} onPress={onShare}>
                  <ShareButt width={'11.74'} height={'15'} />
                </TouchableOpacity>
              </View>
            )}
          </ImageBackground>
        </View>
      </View>
    </View>
  );
};

export default ArticleCard;

const styles = StyleSheet.create({
  cardContainer: {
    flexDirection: 'row',

    width: width,
    backgroundColor: '#fff',
    height: cardItemHeight,
    paddingHorizontal: 26,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#E3E3E3',
  },
  article_title: {
    width: width * 0.5,
    fontSize: 9,
    fontFamily: FontFamily.poppinsRegular,
    color: Color.colorDarkslategray,
    fontWeight: '400',
  },
  detailsCardContainer: {justifyContent: 'space-evenly', marginRight: 11},
  image: {width: 100, height: 100, borderRadius: 3},
  title: {
    width: width * 0.55,
    fontSize: 15,
    fontFamily: FontFamily.poppinsBold,
    lineHeight: 22.5,
    color: Color.colorDarkslategray,
    fontWeight: '700',
  },
  time: {
    fontSize: 8,
    fontFamily: FontFamily.poppinsRegular,
    lineHeight: 12,
    color: Color.colorDarkgray,
    fontWeight: '700',
  },
  optionsBtn: {
    widht: 50,
    height: 20,
    position: 'absolute',
    right: 8,
    top: 8,
  },
  options: {
    flexDirection: 'row',
    width: 65,
    ehight: 27,
    justifyContent: 'space-evenly',
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 6,
    position: 'absolute',
    right: 8,
    top: 20,
  },
});
