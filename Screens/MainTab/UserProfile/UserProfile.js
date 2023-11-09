import React, { useEffect,useState } from 'react'

import {
  View,
  Text,
  Button,
  StyleSheet,
  Image,
  ImageBackground,
  RefreshControl,
  BackHandler,
  Animated,
  StatusBar,
  Pressable,
  Alert
} from 'react-native';
import { useToast, Divider,HStack } from 'native-base';
import Svg, { Path, Circle } from 'react-native-svg';
import { useNavigation } from '@react-navigation/core';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StackActions } from '@react-navigation/routers';
import Icon from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import axios from 'axios';
import LottieView from 'lottie-react-native';
import { useSelector, useDispatch } from 'react-redux';
import { screenName,reg } from '../../Redux/Action';
import { backendHost } from '../../../components/apiConfig';
import { TouchableOpacity } from 'react-native-gesture-handler';



const UserProfile = ({first,last,number,mail}) => {


    const user = useSelector((state) => state.userId.regId);
    const dispatch=useDispatch()
    const remove = async () => {
      dispatch(reg(0))
    }
    const logout = () => {
      Alert.alert('Hold on!', 'Are you sure you want Logout?', [
        {
          text: 'Cancel',
          onPress: () => null,
          style: 'cancel',
        },
        {
          text: 'YES',
          onPress: () => {
         dispatch(screenName('MAIN')), remove()
          },
        },
      ]);
      return true;
    };

  function User() {
    return (
      <Svg
        xmlns="http://www.w3.org/2000/svg"
        width={90}
        height={90}
        fill="none"
        viewBox="0 0 43 43">
        <Path
          fill="#00415E"
          d="M37.288 34.616A20.548 20.548 0 10.938 21.5a20.414 20.414 0 004.774 13.116l-.029.025c.103.123.22.23.326.351.132.151.275.294.411.44.412.447.835.876 1.278 1.278.135.124.275.238.411.356.47.405.954.79 1.454 1.148.065.044.124.102.188.147v-.017a20.417 20.417 0 0023.5 0v.017c.065-.045.122-.102.189-.147.499-.36.983-.743 1.454-1.148.136-.118.276-.234.41-.356.444-.404.867-.83 1.279-1.277.136-.147.277-.29.41-.441.105-.122.224-.228.327-.352l-.032-.024zM21.5 9.75a6.61 6.61 0 110 13.22 6.61 6.61 0 010-13.22zM9.76 34.616a7.338 7.338 0 017.334-7.241h8.812a7.338 7.338 0 017.334 7.241 17.537 17.537 0 01-23.48 0z"></Path>
      </Svg>
    );
  }

const navigation=useNavigation()


  return (
    <View>
       <StatusBar backgroundColor="#00415e" barStyle="light-content" />
    <View style={styles.profileHeader}>
      <User
        style={{
          borderRadius: 10,
        }}
      />
      <View>
        <Text style={styles.profileName} >{first} {last}</Text>
        <Text
            style={styles.infoText}>
            {mail}
          </Text>

      
      </View>

    </View>
    <Divider />

    
    </View>
  )
}

export default UserProfile

const styles=StyleSheet.create({
    profileHeader: {
      flexDirection:'row',
  
        alignItems: 'center',
        padding:25
      },
    
      profileName: {
        color: '#00415e',
        fontFamily: 'Raleway-Bold',
        fontSize: 25,
        marginLeft:14,
        marginTop: -10
      },
    headerTitle:{
    marginLeft:12,
    padding:10
    },
    
    headerText:{
      color:'#00415e',
      fontFamily:'Raleway-Medium',
     fontSize:25
    }
    ,
    
      infoContainer:{
       padding:10
      },
    info:{
      backgroundColor:'#f0f8ff',
      borderRadius:15,
      justifyContent:'space-between'
    },
    infoDetails:{
      flexDirection:'row',
      alignItems:'center',
      height:80,
    padding:15,
    
      borderBottomColor:'grey'
    
      
      
    },
      infoText: {
        color: '#00415e',
        fontFamily: 'Raleway-Medium',
        fontSize: 14,
        marginBottom:5,
        marginLeft:15,
      },
    icon:{
      backgroundColor:'#00415e',
      width:35,
      height:35,
      justifyContent:'center',
      borderRadius:50,
      alignItems:'center'
    },
    logout:{
      position:'absolute',
      bottom:0,
      width:'100%',


    },
    infoLog:{
      backgroundColor:'aliceblue',
      padding:10
    }
    
})