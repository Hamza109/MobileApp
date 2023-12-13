import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Image,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {width, height, Color, FontFamily} from '../config/GlobalStyles';
import Dot from '../assets/img/dot.svg';
import {ViewComponent} from 'react-native';

const cardItemHeight = 136;
const DoctorsCard = ({firstName, secondName, rowno, primarySpl, training}) => {
  return (
    // <View style={styles.cardContainer}>
    //   <View style={styles.detailsCardContainer}>
    //     <Text>
    //       Dr . {firstName} {secondName}
    //     </Text>
    //     <ImageBackground
    //       resizeMode="stretch"
    //       source={{
    //         uri: `https://all-cures.com:444/cures_articleimages/doctors/${rowno}.png`,
    //       }}
    //       style={{
    //         width: 110,
    //         height: 130,
    //         borderRadius: 20,
    //         overflow: 'hidden',
    //       }}
    //     />
    //   </View>
    // </View>
    <View style={styles.cardContainer}>
      <View style={styles.detailsCardContainer}>
        <Text style={styles.article_title}>
          Dr.{firstName} {secondName}
        </Text>
        <Text style={styles.title} numberOfLines={2}>
          {primarySpl}
        </Text>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Text style={styles.time}>
            {training} <Dot height={5} width={5} />
          </Text>
        </View>
      </View>
      <View style={{justifyContent: 'center'}}>
        <View
          style={{width: 100, height: 100, backgroundColor: Color.colorSilver}}>
          <Image
            style={styles.image}
            source={{
              uri: `https://all-cures.com:444/cures_articleimages/doctors/${rowno}.png`,
            }}
          />
        </View>
      </View>
    </View>
  );
};

export default DoctorsCard;

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
});
