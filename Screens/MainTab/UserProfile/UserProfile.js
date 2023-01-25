import React, { useEffect,useState } from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { useRef } from 'react';
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
} from 'react-native';
import { useToast, Divider } from 'native-base';
import Svg, { Path, Circle } from 'react-native-svg';
import { useNavigation } from '@react-navigation/core';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StackActions } from '@react-navigation/routers';
import Icon from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import LottieView from 'lottie-react-native';
import { useSelector, useDispatch } from 'react-redux';
import { screenName } from '../Redux/Action';
import { backendHost } from '../../../components/apiConfig';



const UserProfile = ({first,last,number,mail}) => {


    const user = useSelector((state) => state.userId.regId);
  function User() {
    return (
      <Svg
        xmlns="http://www.w3.org/2000/svg"
        width={200}
        height={150}
        fill="none"
        viewBox="0 0 43 43">
        <Path
          fill="#00415E"
          d="M37.288 34.616A20.548 20.548 0 10.938 21.5a20.414 20.414 0 004.774 13.116l-.029.025c.103.123.22.23.326.351.132.151.275.294.411.44.412.447.835.876 1.278 1.278.135.124.275.238.411.356.47.405.954.79 1.454 1.148.065.044.124.102.188.147v-.017a20.417 20.417 0 0023.5 0v.017c.065-.045.122-.102.189-.147.499-.36.983-.743 1.454-1.148.136-.118.276-.234.41-.356.444-.404.867-.83 1.279-1.277.136-.147.277-.29.41-.441.105-.122.224-.228.327-.352l-.032-.024zM21.5 9.75a6.61 6.61 0 110 13.22 6.61 6.61 0 010-13.22zM9.76 34.616a7.338 7.338 0 017.334-7.241h8.812a7.338 7.338 0 017.334 7.241 17.537 17.537 0 01-23.48 0z"></Path>
      </Svg>
    );
  }




  return (
    <View>
    <View style={styles.profileHeader}>
      <User
        style={{
          borderRadius: 10,
        }}
      />
      <View>
        <Text style={styles.profileName} >{first} {last}</Text>
      </View>

    </View>
    <Divider />

    <View>
      <View style={styles.headerTitle}>
        <Text style={styles.headerText}>Account Info</Text>
      </View>
      <View style={styles.infoContainer}>
      <View style={styles.info}>

        <View style={styles.infoDetails}>
          <Icon name="mail" size={30} color="#00415e" />

          <Text
            style={styles.infoText}>
            {mail}
          </Text>
        </View>

        <View style={styles.infoDetails}>

          <Icon name="phone-portrait" size={30} color="#00415e" />
          <Text
            style={styles.infoText}>
            {number}
          </Text>

        </View>

      </View>
      </View>

    </View>
    </View>
  )
}

export default UserProfile

const styles=StyleSheet.create({
    profileHeader: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: 20,
      },
    
      profileName: {
        color: '#00415e',
        fontFamily: 'Raleway-Bold',
        fontSize: 25,
        marginTop: 7
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
    paddingHorizontal:7
      },
    info:{
      backgroundColor:'#f0f8ff',
      borderRadius:15,
      height:'100%',
    },
    infoDetails:{
      flexDirection:'row',
      alignItems:'center',
      height:80,
    padding:15,
      borderBottomWidth:.2,
      borderBottomColor:'grey'
    
      
      
    },
      infoText: {
        color: '#00415e',
        fontFamily: 'Raleway-Regular',
        fontSize: 21,
        marginBottom:5,
        marginLeft:10
      },
    
    
})