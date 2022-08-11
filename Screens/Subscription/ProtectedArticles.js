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
import Autocomplete from '../MainTab/Autocomplete';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Svg, {Path, Circle} from 'react-native-svg';
import {Card, Paragraph} from 'react-native-paper';

import {HStack} from 'native-base';
import {backendHost} from '../../components/apiConfig';
import LottieView from 'lottie-react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import {useNavigation} from '@react-navigation/native';

import LockedPreview from './LockedArticle';
import UnlockedPreview from './UnlockedArticle';
const ProtectedPreview = props => {
  const [items, setItems] = useState([]);
  const [isLoaded, setLoaded] = useState(false);
  const [regId, setRegId] = useState([]);
  const [status, setStatus] = useState(0);
  const [itemStatus, setItemStatus] = useState();
  const navigation = useNavigation();
  useEffect(() => {
    console.log('prop', regId);
  });
  function Icon() {
    return (
      <Svg
        xmlns="http://www.w3.org/2000/svg"
        width="50"
        height="50"
        fill="none"
        viewBox="0 0 132 116">
        <Path
          fill="#fff"
          d="M15.25 87L.75 7.25 40.625 43.5 66 0l25.375 43.5L131.25 7.25 116.75 87H15.25zm101.5 21.75c0 4.35-2.9 7.25-7.25 7.25h-87c-4.35 0-7.25-2.9-7.25-7.25v-7.25h101.5v7.25z"></Path>
      </Svg>
    );
  }

  function getStatus() {
    try {
      AsyncStorage.getItem('author').then(value1 => {
        if (value1 != null) {
          setRegId(value1);
          axios
            .get(`${backendHost}/subscription/orders/${value1}`)
            .then(res => {
              setItemStatus(res.data);
              console.log(res.data);
            })
            .catch(err => err);
          // navigation.navigate('Cures',{screen:'My Cures'})
        } else {
          null;
        }
      });
    } catch (error) {}
  }

  useEffect(() => {
    getStatus();
  }, []);

  function allPosts() {
    fetch(`${backendHost}/article/allkvprotected?limit=15`)
      .then(res => res.json())
      .then(json => {
        var temp = [];

        json.forEach(i => {
          if (i.pubstatus_id === 3 && i.type.includes(2)) {
            temp.push(i);
          }
        });

        setItems(temp);

        setLoaded(true);
      })
      .catch(err => {
        err;
        throw err;
      });
  }

  function IsJsonValid(str) {
    try {
      JSON.parse(str);
    } catch (e) {
      return [];
    }
    return JSON.parse(str).blocks;
  }

  useEffect(() => {
    allPosts();
  }, []);
  const swipe = () => {
    setTimeout(() => {
      <View style={{alignContent: 'center', width: wp('100%'), height: 50}}>
        <Text style={{color: '#00415e'}}>swipe down to refresh</Text>
      </View>;
    }, 1000);
  };
  function renderItemArt({item, index}) {
    const {friendly_name, source, content} = item;

    return (
      <View>
        <View style={{marginRight: 25, width: wp('100%'), height: hp('20%')}}>
          <View>
            <Paragraph>
              <Card
                style={{
                  width: wp('90%'),
                  height: hp('25%'),
                  backgroundColor: '#00415e',
                  borderRadius: 20,
                  marginRight: 5,
                }}></Card>
            </Paragraph>
          </View>
        </View>
      </View>
    );
  }
  if (!isLoaded) {
    return (
      <View>
        <HStack space={2} justifyContent="center">
          <LottieView
            source={require('../../assets/animation/load.json')}
            autoPlay
            loop
            style={{width: 50, height: 50}}
          />
        </HStack>
      </View>
    );
  } else {
    return (
      <>
        {itemStatus.map(i => {
          return i.subscription_id === 3 ||
            i.subscription_id === 4 ||
            i.subscription_id === 5 && i.status === "paid" ? (
            <View>
              <LockedPreview />
            </View>
          ) : (
            <View>
              <UnlockedPreview />
            </View>
          );
        })}
      </>
    );
  }
};

export default ProtectedPreview;
