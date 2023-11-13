import {StyleSheet, Text, View, Image} from 'react-native';
import React from 'react';
import {width, height} from '../config/GlobalStyles';
import moment from 'moment/moment';
import Dot from '../assets/img/dot.svg';
import {FontFamily} from '../config/GlobalStyles';
import { Color } from '../config/GlobalStyles';
const cardItemHeight = 136;
const ArticlesCard = ({title, window_title, create_date, image_location,dc_name}) => {
  const createdAt = moment(`${create_date}`, 'YYYYMMDD').fromNow();
  const image = image_location;

  return (
    // Article Card Component

    <View style={styles.cardContainer}>
      <View style={styles.detailsCardContainer}>
        <Text style={styles.article_title}>{window_title} <Text style ={{color:Color.colorDarkgray}}> in </Text> {dc_name}</Text>
        <Text style={styles.title} numberOfLines={2}>
          {title}
        </Text>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Text style={styles.time}>
            10 min ago    <Dot height={5} width={5} />    {createdAt}{' '}
          </Text>
        </View>
      </View>
      <View style={{justifyContent: 'center'}}>
        <Image
          style={styles.image}
          source={{
            uri: image,
          }}
        />
      </View>
    </View>
  );
};

export default ArticlesCard;

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
    width:width*0.5,
    fontSize: 9,
    fontFamily: FontFamily.poppinsRegular,
    color:Color.colorDarkslategray,
    fontWeight:'400',  },
  detailsCardContainer: {justifyContent: 'space-evenly', marginRight: 11},
  image: {width: width * 0.29, height: width * 0.29, borderRadius: 3,
  },
  title: {
    width: width * 0.55,
    fontSize: 15,
    fontFamily: FontFamily.poppinsBold,
    lineHeight: 22.5,
    color:Color.colorDarkslategray,
    fontWeight:'700'
    
  },
  time: {
    fontSize: 8,
    fontFamily: FontFamily.poppinsRegular,
    lineHeight: 12,
    color:Color.colorDarkgray,
    fontWeight:'700'
  },
});
