import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
  SafeAreaView,
  ImageBackground
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {
  HStack,
  Stack,
  Center,
  Heading,
  NativeBaseProvider,
  Container,
  Spinner,
  VStack,
  Divider,
  Pressable,
  Modal,
  Box,
} from 'native-base';
import PhoneInput from 'react-native-phone-number-input';

import axios from 'axios';
import { backendHost } from './apiConfig';

const Subscribe=()=>{

    const [value, setValue] = useState();
    const [formattedValue, setFormattedValue] = useState('');
    const postSubscription = val => {
      var phoneNumber = val.split('+')[1];
  
      var countryCodeLength = phoneNumber.length % 10;
      var countryCode = phoneNumber.slice(0, countryCodeLength);
      var StringValue = phoneNumber.slice(countryCodeLength).replace(/,/g, '');
      if (phoneNumber) {
        axios
          .post(`${backendHost}/users/subscribe/${StringValue}`, {
            nl_subscription_disease_id: '0',
            nl_sub_type: 1,
            nl_subscription_cures_id: '0',
            country_code: `'${countryCode}'`,
          })
          .then(res => {
            if (res.data === 1) {
              Alert.alert('You have successfully subscribed to our Newsletter');
            } else {
              Alert.alert('Some error occured! Please try again later.');
            }
          })
          .catch(err => {
            Alert.alert('Some error occured! Please try again later.');
          });
      } else {
        Alert.alert('Please enter a valid number!');
      }
    };

    return(
        <View style={{flex: 1, alignItems:'center',backgroundColor:'#fff'}}>
            <ImageBackground
            source={require('../assets/img/LandingMainImg.jpg')}
            style={{width: wp('100%'), height: hp('30%')}}>
           
          </ImageBackground>
            <VStack ml='2'mt="5"  space={5}>
          
           
        <View style={{flexDirection: 'row',marginLeft:2}}>
   
          <Image
            source={require('../assets/img/heart.png')}
            style={styles.imageModal}></Image>
          <Text
            style={{
              marginTop: 20,
              marginRight: 15,
              fontSize: 20,
              color: '#00415e',
            }}>
            All Cures
          </Text>
        </View>
        <VStack space={6} ml="2">
        <Text style={{ fontSize: 20}}>
          Sign up for our free
          <Text style={{color: '#1e7ca8'}}> All Cures</Text> Daily
          Newsletter
        </Text>
        <Text style={{ fontSize: 20}}>
          Get <Text style={{color: '#1e7ca8'}}>doctor-approved</Text>{' '}
          health tips, news, and more
        </Text>
        <PhoneInput
          defaultValue={value}
          defaultCode="IN"
          layout="first"
          onChangeText={text => {
            setValue(text);
          }}
          onChangeFormattedText={text => {
            setFormattedValue(text);
          }}
          withDarkTheme
          withShadow
          autoFocus
        />
        <View style={{alignItems:'center'}}>
        <TouchableOpacity
          style={styles.btn}
          onPress={() => postSubscription(formattedValue)}>
          <Text style={{color: 'white', fontWeight: 'bold'}}>
            Submit
          </Text>
        </TouchableOpacity>
        </View>
        </VStack>
        </VStack>
      </View>
    )
  

}

export default Subscribe;
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
  
      alignItems: 'center',
    },
    card: {
      padding: 10,
      margin: 0,
      height: hp('60%'),
      width: wp('100%'),
      position: 'relative',
      bottom: 90,
      borderRadius: 0,
      backgroundColor: '#00415e',
    },
  
    search: {
      position: 'relative',
      bottom: 282,
      backgroundColor: '#fff',
    },
  
    b1: {
      backgroundColor: '#00415e',
      padding: 40,
    },
  
    text: {
      backgroundColor: '#00415e',
      color: '#fff',
      textAlign: 'center',
    },
    h1: {
      position: 'relative',
      bottom: 450,
      right: 0,
      fontWeight: 'bold',
      padding: 0,
      margin: 0,
    },
    t2: {
      position: 'relative',
      bottom: 410,
  
      padding: 10,
      margin: 0,
      zIndex: 9999,
    },
    centeredView: {
      flex: 1,
  
      marginTop: 25,
    },
    modalView: {
      alignItems: 'center',
    },
  
    textStyle: {
      color: 'white',
      fontWeight: 'bold',
      textAlign: 'center',
    },
    modalText: {
      marginBottom: 15,
      textAlign: 'center',
    },
    image: {
      padding: 20,
      marginTop: 5,
      height: hp('5%'),
      width: wp('5%'),
    },
    imageModal: {
      padding: 0,
      marginTop: 0,
      height: hp('7%'),
      width: wp('16%'),
    },
    btn: {
      borderWidth: 1,
      borderRadius: 15,
      borderColor: '#00415e',
      justifyContent: 'center',
      alignItems: 'center',
      width: wp('50%'),
      height: 40,
      backgroundColor: '#00415e',
      color: 'white',
  
      marginTop: 10,
    },
  });
  