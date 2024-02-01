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
import Svg, {Path, Circle} from 'react-native-svg';
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
import axios from 'axios';
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

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useNavigation} from '@react-navigation/native';
import {scale, verticalScale} from '../../components/Scale';
import { log } from 'react-native-reanimated';

const ProfileTab = ({
  rowno,
  firstName,
  lastName,
  primary_spl,
  hospital_affliated,
  state,
  country_code,
}) => {
  const [url, setUrl] = useState(
    `http://all-cures.com:8080/cures_articleimages/doctors/${Number(rowno)}.png`,
  );
  console.log("rowno",rowno);

  const onError = e => {
    <Icon name="user-md" color={'#00415e'} size={26} />;
  };
  const [exist, setExist] = useState(false);
  const navigation = useNavigation();

  const checkIfImage = imageUrl => {
    fetch(imageUrl, {method: 'HEAD', mode: 'no-cors'})
      .then(res => {
        if (res.ok) {
          setExist(true);
        } else {
          setExist(false);
        }
      })
      .catch(err => err);
  };

  useEffect(() => {
    checkIfImage(url);
  });

  function User() {
    return (
      <Svg
        xmlns="http://www.w3.org/2000/svg"
        width={scale(120)}
        height={verticalScale(120)}
        fill="none"
        viewBox="0 0 43 43">
        <Path
          fill="#00415e"
          d="M37.288 34.616A20.548 20.548 0 10.938 21.5a20.414 20.414 0 004.774 13.116l-.029.025c.103.123.22.23.326.351.132.151.275.294.411.44.412.447.835.876 1.278 1.278.135.124.275.238.411.356.47.405.954.79 1.454 1.148.065.044.124.102.188.147v-.017a20.417 20.417 0 0023.5 0v.017c.065-.045.122-.102.189-.147.499-.36.983-.743 1.454-1.148.136-.118.276-.234.41-.356.444-.404.867-.83 1.279-1.277.136-.147.277-.29.41-.441.105-.122.224-.228.327-.352l-.032-.024zM21.5 9.75a6.61 6.61 0 110 13.22 6.61 6.61 0 010-13.22zM9.76 34.616a7.338 7.338 0 017.334-7.241h8.812a7.338 7.338 0 017.334 7.241 17.537 17.537 0 01-23.48 0z"></Path>
      </Svg>
    );
  }

  return (
    <View>
      <HStack space={2}>
        <View>
          {exist ? (
            <Card
              style={{
                width: scale(120),
                height: scale(120),
                backgroundColor: 'lightgrey',
                borderRadius: 200,
                marginRight: 8,
                justifyContent: 'center',
                paddingHorizontal: 5,
                alignItems: 'center',
              }}>
              {
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate('DocProfile', {ids: `${rowno}`});
                  }}>
                  <ImageBackground
                    source={{uri: url}}
                    style={{
                      width: scale(120),
                      height: scale(120),
                      borderRadius: 200,
                      overflow: 'hidden',
                    }}
                  />
                </TouchableOpacity>
              }
            </Card>
          ) : (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('DocProfile', {ids: `${rowno}`});
              }}>
              <User />
            </TouchableOpacity>
          )}
        </View>
        <View>
          <View style={{width: scale(200)}}>
            <TouchableOpacity
              style={{}}
              onPress={() => {
                navigation.navigate('DocProfile', {ids: `${rowno}`});
              }}>
              <Text
                style={{
                  color: '#00415e',
                  marginTop: 5,
                  fontFamily: 'Raleway-Bold',
                  fontSize: scale(15),
                  position: 'relative',
                  bottom: 0,
                }}>
                Dr. {firstName} {lastName}
              </Text>
            </TouchableOpacity>
            <Text
              style={{
                color: '#00415e',
                marginTop: 5,
                fontFamily: 'Raleway-Medium',
                fontSize: scale(12),
                position: 'relative',
                bottom: 0,
              }}>
              {primary_spl}
            </Text>
            <Text
              style={{
                color: '#00415e',
                marginTop: 5,
                fontFamily: 'Raleway-Regular',
                fontSize: scale(11),
                position: 'relative',
                bottom: 0,
              }}>
              {hospital_affliated}{' '}
            </Text>
            <Text
              style={{
                color: '#00415e',
                marginTop: 5,
                fontFamily: 'Raleway-Regular',
                fontSize: scale(11),
                position: 'relative',
                bottom: 0,
                right: 4,
              }}>
              {' '}
              {state} {country_code}
            </Text>
          </View>
        </View>
      </HStack>
    </View>
  );
};

export default ProfileTab;
