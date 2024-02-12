import React, {useState, useEffect} from 'react';
import {Dimensions, ImageBackground} from 'react-native';
import {
  View,
  ScrollView,

} from 'react-native';
import ArticleHeader from '../search/ArticleHeader';
import {useRef} from 'react';
import {useIsFocused, useTheme} from '@react-navigation/native';
import axios from 'axios';

import AsyncStorage from '@react-native-async-storage/async-storage';

import {
  HStack,
  Stack,
  Center,
  Heading,
  NativeBaseProvider,
  Container,
  Box,
  Spinner,
} from 'native-base';
import {backendHost} from '../../components/apiConfig';
import LottieView from 'lottie-react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import CenterWell from '../Disease/CenterWell';
import DoctorsCard from './DoctorsCard';
import {useSelector} from 'react-redux';

const DocPreview = () => {
  const topDoc = useSelector(state => state.top.Data);

  return (
    <>
      <View style={{flex: 1}}>
        <View style={{flexDirection: 'row'}}>
          <ScrollView
            style={{width: wp('100%')}}
            horizontal
            showsHorizontalScrollIndicator={false}>
            {topDoc.map((i, j) => (
              <DoctorsCard
                key={j}
                rowno={i.map.docID}
                firstName={i.map.docname_first}
                lastName={i.map.docname_last}
                primary_spl={i.map.primary_spl}
                hospital_affliated={i.map.hospital_affliated}
              />
            ))}
          </ScrollView>
        </View>
      </View>
    </>
  );
};

export default DocPreview;
