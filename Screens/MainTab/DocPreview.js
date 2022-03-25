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
import Autocomplete from './Autocomplete';
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

const DocPreview = () => {
  const [items, setItems] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);


  useEffect((lat, lon, city) => {
    fetch(
      `${backendHost}/SearchActionController?cmd=getResults&FeaturedDoctors=871,872,873,874,875,876,877,878,879,880,881,882`,
    )
      .then(res => res.json())
      .then(json => {
        setIsLoaded(true);
        setItems(json.map.DoctorDetails.myArrayList);
      })
      .catch(err => console.log('58:',err));
  }, []);
  
  if (!isLoaded) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <HStack space={2} justifyContent="center">
        <LottieView source={require('../../assets/animation/load.json')} autoPlay loop style={{width:50,height:50}} />
        </HStack>
      </View>
    );
  } else {
    return (
      <>
        <View style={{flex: 1}}>
          <View style={{flexDirection: 'row'}}>
            <ScrollView
              style={{width: wp('100%')}}
              horizontal
              
              showsHorizontalScrollIndicator={false}>
              {items.map((i,j) => (
                <DoctorsCard
               key={j}
                  rowno={i.map.rowno}
                  firstName={i.map.docname_first}
                  lastName={i.map.docname_last}
                  primary_spl={i.map.primary_spl}
                  hospital_affliated={i.map.hospital_affliated}
                  state={i.map.state}
                  country_code={i.map.country_code}
                />
              ))}
            </ScrollView>
          </View>

        </View>
      </>
    );
  }
};

export default DocPreview;
