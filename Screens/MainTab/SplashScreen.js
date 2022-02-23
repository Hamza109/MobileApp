import React, { useEffect ,useRef, useState} from 'react';
import { 
  Animated,
    View, 
    Text, 
    TouchableOpacity, 
    Dimensions,
    StyleSheet,
    StatusBar,
    ImageBackground,
    Image
} from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from 'react-native-responsive-screen';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useIsFocused, useTheme } from '@react-navigation/native';
import { max } from 'react-native-reanimated';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SplashScreen = ({navigation}) => {
  const scale = useRef(new Animated.Value(1)).current;
  const [regId,setRegId]=useState()
  const getId = () => {
    try {
      Promise.all(AsyncStorage.getItem('author').then(value1 => {
        console.log(value1);
        if (value1 != null) {
           setTimeout(()=>{
             console.log(value1)
            navigation.navigate('MainTab')
        },2000)
        }
        else{
          setTimeout(()=>{
            navigation.navigate('SignIn')
        },2000)
        }
      }));
    } catch (error) {
      console.log(error);
    }
  };

  const pulse = () => {
    Animated.sequence([
      Animated.timing(scale, { toValue: 1.2,useNativeDriver:true }),
      Animated.timing(scale, { toValue: 0.2 ,useNativeDriver:true}),
    ]).start(() => pulse());
  };

  
    const { colors } = useTheme();
    const isFocus=useIsFocused();
    useEffect(()=>{
      if(isFocus)
      {
       getId()
       
      }
    })

    return (
      <View style={styles.container}>
          <StatusBar backgroundColor='#00415e' barStyle="light-content"/>
        <View style={styles.header}>
       
            <Animated.Image 
                animation="bounceIn"
                duraton="1500"
              
            source={require('../../assets/img/whitelogo.png')}
            style={styles.logo}
            resizeMode="stretch"
            />
            <Animatable.Text  duraton="1500" style={styles.head}>All Cures</Animatable.Text>
        </View>
       
      </View>
    );
};

export default SplashScreen;

const {height} = Dimensions.get("screen");
const height_logo = height * 0.1;

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    backgroundColor: '#00415e'
  },
  head:{
   color:'#fff',
   textAlign:'center',
    fontSize: 25,
    fontWeight: 'bold'
  },
  header: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
  },

  logo: {
      width: wp('30%'),
      height: hp('15%'),
      transform:[{scale:1}]
  
  },
 
  
});

