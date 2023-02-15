import React, {useEffect, useRef, useState} from 'react';
import {
  Animated,
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  StatusBar,
  ImageBackground,
  Image,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import * as Animatable from 'react-native-animatable';
import {useIsFocused, useNavigation, useTheme} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LottieView from 'lottie-react-native';
import { useDispatch,useSelector } from 'react-redux';
import { screenName } from '../Redux/Action';


const SplashScreen = () => {
  const dispatch=useDispatch();
  const screen=useSelector((state)=>state.name.screen)

  useEffect(()=>{
    

   const id= setTimeout(() => {
     dispatch(screenName('MAIN'))
    },3000);

    return()=>(
      clearTimeout(id)
    )
  },[])


  
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#00415e" barStyle="light-content" />
      <View style={styles.header}>
        <Animatable.View
        animation='zoomIn'
        >
      <Image source={require('../../assets/img/whitelogo.png')} autoPlay resizeMethod='resize' resizeMode='cover' loop style={{width:80,height:80}} />
      </Animatable.View>
      <Animatable.View
      animation='zoomIn'
      >
      <Text  style={styles.head}>
          All Cures
        </Text>
      </Animatable.View>
        
      </View>
    </View>
  );
};

export default SplashScreen;



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#00415e',
  },
  head: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 25,
    fontWeight: 'bold',
  },
  header: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  logo: {
    width: wp('30%'),
    height: hp('15%'),
    transform: [{scale: 1}],
  },
});
