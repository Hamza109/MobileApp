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
import {useIsFocused, useTheme} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LottieView from 'lottie-react-native';
const SplashScreen = ({navigation}) => {
  const scale = useRef(new Animated.Value(1)).current;
  const [regId, setRegId] = useState();
  useEffect(()=>{
    
    setTimeout(() => {
      navigation.push('MainTab');
    },2000);
  })
  // const getId = () => {
  //   try {r
  //     Promise.all(
  //       AsyncStorage.getItem('author').then(value1 => {
  //         if (value1 != null) {
  //          setRegId(regId)
  //         } 
  //       }),
  //     );
  //   } catch (error) {}
  // };

  const pulse = () => {
    Animated.sequence([
      Animated.timing(scale, {toValue: 1.2, useNativeDriver: true}),
      Animated.timing(scale, {toValue: 0.2, useNativeDriver: true}),
    ]).start(() => pulse());
  };

  const {colors} = useTheme();
  const[visible,setVisible]=useState(false)
  const isFocus = useIsFocused();
  
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#00415e" barStyle="light-content" />
      <View style={styles.header}>
      <LottieView source={require('../../assets/animation/heart.json')} autoPlay loop style={{width:400,height:100}} />
        <Animatable.Text duraton="6000" style={styles.head}>
          All Cures
        </Animatable.Text>
      </View>
    </View>
  );
};

export default SplashScreen;

const {height} = Dimensions.get('screen');
const height_logo = height * 0.1;

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
