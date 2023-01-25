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
import {
  NavigationContainer,
  useIsFocused,
  useTheme,
} from '@react-navigation/native';
import axios from 'axios';

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
} from 'native-base';
import {backendHost} from '../../components/apiConfig';
import {useNavigation} from '@react-navigation/native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { moderateScale,verticalScale,scale,scalledPixel } from '../../components/Scale';

const DoctorsCard = ({
  rowno,
  firstName,
  lastName,
  primary_spl,
  hospital_affliated,
  state,
  country_code,
}) => {
  const [imageExists, setImageExists] = useState(false);

  const checkIfImageExits = imageUrl => {
    fetch(imageUrl, {method: 'HEAD', mode: 'no-cors'})
      .then(res => {
        if (res.ok) {
          setImageExists(true)
        } else {
          setImageExists(false)
        }
      })
      .catch(err => err);
  };

  const navigation = useNavigation();

  const isfocus = useIsFocused();
  useEffect(() => {
    checkIfImageExits(
      `http://all-cures.com:8280/cures_articleimages/doctors/${rowno}.png`,
    )
    
  }, []);
  return (
    <View>
      <View>
      <TouchableOpacity
      activeOpacity={.8}
            onPress={() => {
              navigation.push('DocProfile', {ids: `${rowno}`});
            }}>
        <Card
          style={{
            width: scale(110),
            height: verticalScale('130'),
            backgroundColor: 'grey',
            borderRadius: 20,
            marginRight: 12,
            justifyContent: 'center',

            paddingHorizontal: 5,
            alignItems: 'center',
          }}>
          {
            <ImageBackground
            resizeMode='stretch'
              source={{
                uri: `https://all-cures.com:444/cures_articleimages/doctors/${rowno}.png`,
              }}
              style={{
                width: scale(110),
                height: verticalScale('130'),
                borderRadius: 20,
                overflow: 'hidden',
              }}
            />
          }
        </Card>
        </TouchableOpacity>
      </View>
      <View>
        <View style={{zIndex: 999, width: scale(100)}}>
        
            <Text
              style={{
                color: '#00415e',
                marginTop: 5,
          
                fontFamily: 'Raleway-Medium',
                fontSize: scale(12),
                position: 'relative',
                bottom: 0,
                textAlign: 'center',
              }}>
              Dr. {firstName} {lastName}
            </Text>
        
          <Text
            style={{
              color: '#00415e',
              marginTop: 5,
              marginBottom:50,
              fontFamily: 'Raleway-Medium',
              fontSize: scale(9),
              position: 'relative',
              bottom: 0,
              textAlign: 'center',
            }}>
            {primary_spl}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default DoctorsCard;