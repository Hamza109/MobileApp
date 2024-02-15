import React, {useState, useEffect} from 'react';
import {Dimensions, ImageBackground} from 'react-native';
import {
  View,
  ScrollView,
  Text,
  Button,
  FlatList,
  StyleSheet,
  StatusBar,
  BackHandler,
  Alert,
  TouchableOpacity,
  TouchableHighlight,
  Image,
} from 'react-native';
import ArticleHeader from '../search/ArticleHeader';
import {useRef} from 'react';
import {useIsFocused, useTheme} from '@react-navigation/native';
import axios from 'axios';

import AsyncStorage from '@react-native-async-storage/async-storage';
import {Card, Checkbox, Modal, Portal, Provider} from 'react-native-paper';
import Carousel, {ParallaxImage} from 'react-native-snap-carousel';
import Icon from 'react-native-vector-icons/FontAwesome';

import {
  HStack,
  Stack,
  Center,
  Heading,
  NativeBaseProvider,
  Container,
} from 'native-base';
import CenterWell from '../Disease/CenterWell';
import {backendHost} from '../../components/apiConfig';
import ArticlePreview from './ArticlePreview';
import {Paragraph} from 'react-native-paper';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useNavigation} from '@react-navigation/native';
import DocPreview from './DocPreview';
import {Item} from 'react-native-paper/lib/typescript/components/List/List';
const DocTab = ({navigation, route}) => {
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#00415e" barStyle="light-content" />
      <View>
        <Stack space={3} alignItems="center">
          <ImageBackground
            source={require('../../assets/img/LandingMainImg.jpg')}
            style={{width: wp('100%'), height: hp('40%')}}>
            <Text
              adjustsFontSizeToFit
              numberOfLines={2}
              style={{
                color: '#00415e',
                fontFamily: 'Raleway-Bold',
                fontSize: 20,
                position: 'absolute',
                bottom: 65,
                left: 30,
                width: wp('50%'),
              }}>
              Find a doctor near you
            </Text>
          </ImageBackground>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => {
              navigation.navigate('SearchDoc');
            }}>
            <View style={styles.card}>
              <HStack ml="2" space={110} alignItems="center">
                <Text
                  adjustsFontSizeToFit
                  style={{
                    fontSize: wp('4.5%'),
                    color: '#00415e',
                    fontFamily: 'Raleway-Regular',
                  }}>
                  Search by Name
                </Text>
                <Icon name="search" size={20} style={styles.icon}></Icon>
              </HStack>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => {
              navigation.navigate('SearchDocCity');
            }}>
            <View style={styles.card}>
              <HStack ml="2" space={110} alignItems="center">
                <Text
                  style={{
                    fontSize: wp('4.5%'),
                    color: '#00415e',

                    fontFamily: 'Raleway-Regular',
                  }}>
                  Search by city
                </Text>
                <Icon name="search" size={20} style={styles.icon}></Icon>
              </HStack>
            </View>
          </TouchableOpacity>
        </Stack>
      </View>
    </View>
  );
};

export default DocTab;
const width = Dimensions.get('screen').width;
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
    alignItems: 'center',
  },
  card: {
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 65, 94, 0.2)',
    width: wp('86%'),
    height: 52,
    borderRadius: 25,
  },
  inCard: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  header: {
    padding: 18,
    marginTop: Platform.OS === 'android' ? -7 : 0,
    borderColor: '#fff',

    alignItems: 'center',
    width: wp('100%'),
    height: 150,
  },
  icon: {
    padding: 3,
    position: 'absolute',

    right: 20,
    color: '#00415e',
  },

  text: {
    color: '#00415e',
    textAlign: 'center',
    alignSelf: 'center',
  },

  btn: {
    borderWidth: 2,
    borderRadius: 15,
    borderColor: '#343a40',
    justifyContent: 'center',
    alignItems: 'center',
    width: wp('20%'),
    height: hp('4.5%'),
    backgroundColor: '#343a40',
    color: 'white',
    marginRight: 10,
    marginTop: 12,
  },

  image: {
    padding: 20,
    marginTop: 5,
    height: hp('5%'),
    width: wp('5%'),
  },
});
