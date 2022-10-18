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

import AsyncStorage from '@react-native-async-storage/async-storage';
import Svg, {Path, Circle} from 'react-native-svg';
import {Card, Paragraph} from 'react-native-paper';
import axios from 'axios';
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
import { sub } from '../Redux/Action';
import { useDispatch,useStore } from 'react-redux';
const ProtectedPreview = () => {
  const [items, setItems] = useState([]);
  const [isLoaded, setLoaded] = useState(false);
  const [regId, setRegId] = useState([]);
  const dispatch = useDispatch();
  const user=useStore();
  const [status, setStatus] = useState(user.getState().subStat.subId);
  const [itemStatus, setItemStatus] = useState();
  const navigation = useNavigation();

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
useEffect(()=>{
  getStatus()
})
  function getStatus() {
    axios
      .get(`${backendHost}/subscription/orders/${user.getState().userId.regId}`)
      .then(res => {
       
       if(res.data.length!==0)
       {
        dispatch(sub(res.data[0].status))
       }
        else{
          dispatch(sub(0))
        }
      })
      .catch(err => err);

    // navigation.navigate('Cures',{screen:'My Cures'})
  }
  useEffect(() => {
    console.log('sub',user.getState().subStat.subId);
  });
 

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

  useEffect(() => {

    allPosts();
  }, []);


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
        {user.getState().userId.regId!== 0 ? (
        user.getState().subStat.subId === 1 ? (
            <View>
              <UnlockedPreview />
            </View>
          ) : (
            <View>
              <LockedPreview />
            </View>
          )
        ) : (
          <View>
            <LockedPreview />
          </View>
        )}
      </>
    );
  }
};

export default ProtectedPreview;
