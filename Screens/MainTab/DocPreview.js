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
  Card,
  Checkbox,
  Modal,
  Paragraph,
  Portal,
  Provider,
} from 'react-native-paper';
import AllPost from '../search/AllPost';
import Icon from 'react-native-vector-icons/FontAwesome';
import PhoneInput from 'react-native-phone-number-input';
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
      `${backendHost}/SearchActionController?cmd=getResults&city=jammu&doctors=manoj&Latitude=32.7266&Longitude=74.8570`,
    )
      .then(res => res.json())
      .then(json => {
        setIsLoaded(true);
        setItems(json.map.DoctorDetails.myArrayList);
      })
      .catch(err => null);
  }, []);
  
  if (!isLoaded) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <HStack space={2} justifyContent="center">
          <Spinner
            accessibilityLabel="Loading posts"
            color="#00415e"
            size="lg"
          />
          <Heading color="#00415e" fontSize="lg">
            Loading
          </Heading>
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
              {items.map(i => (
                <DoctorsCard
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
          <View>
            <View></View>
          </View>
        </View>
      </>
    );
  }
};

export default DocPreview;
