import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Platform,
  StyleSheet,
  StatusBar,
  Alert,
  ImageBackground,
} from 'react-native';
import {
  HStack,
  Stack,
  Center,
  Heading,
  NativeBaseProvider,
  Container,
  VStack,
} from 'native-base';
import axios from 'axios';
import Home from '../MainTab/Home';
import * as Animatable from 'react-native-animatable';

import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import {useTheme} from 'react-native-paper';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {backendHost} from '../../components/apiConfig';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BootstrapStyleSheet from 'react-native-bootstrap-styles';
import Icon from 'react-native-vector-icons/Ionicons';
const SignInScreen = ({navigation,props}) => {
  const [status, setStatus] = useState('');
  const [buttonClick, setClicked] = useState('');
  const [isSignedIn,setIsSignedIn]= useState(props)
  const [loginSuccess, setLoginSuccess] = useState(true)
  const [data, setData] = useState({
    email: '',
    password: '',
    check_textInputChange: false,
    secureTextEntry: true,
  });
  const [authid, setauthid] = useState([]);
  const verify = () => {
    navigation.navigate('Verify');
  };

  const bootstrapStyleSheet = new BootstrapStyleSheet();
  const {s, c} = bootstrapStyleSheet;

  const {colors} = useTheme();

  const updateSecureTextEntry = () => {
    setData({
      ...data,
      secureTextEntry: !data.secureTextEntry,
    });
  };

  const loginForm = () => {
    setClicked(1);
    axios
      .post(
        `${backendHost}/login?cmd=login&email=${data.email}&psw=${data.password}&rempwd=on`,
      )

  
      .then(res=>{
        console.log(res)
        if(res.data.registration_id)
        {
          navigation.navigate('MainTab', {
    
            params: {
              userId: authid,
            },

          });
          setStatus(res.status);
          setId(res.data.registration_id);
          setType(res.data.registration_type);
          setFirst(res.data.first_name);
          setLast(res.data.last_name);
          setEmail(res.data.email_address);
        }
      })

      .catch(err => {
        setLoginSuccess(false)
        if(err.response){
        if(err.response.data.includes('Incorrect email')){
          Alert.alert("Incorrect email or password!")
        } else {
         Alert.alert("Some error occured!")
        }
      }else{
        return
      }
      })
  
  };
  const setCheck = async value =>{
      try{
          await AsyncStorage.setItem('check',JSON.stringify(value))
      }catch(error){
          console.log(error)
      }
  }
  const setId = async id => {
    try {
      console.log(JSON.stringify(id));
      await AsyncStorage.setItem('author', JSON.stringify(id));
    } catch (error) {
      console.log(error);
    }
  };
  const setType = async type => {
    try {
      await AsyncStorage.setItem('rateType', JSON.stringify(type));
    } catch (error) {
      console.log(error);
    }
  };
  const setFirst = async first => {
    try {
      await AsyncStorage.setItem('firstName', first);
    } catch (error) {
      console.log(error);
    }
  };
  const setLast = async last => {
    try {
      await AsyncStorage.setItem('lastName', last);
    } catch (error) {
      console.log(error);
    }
  };
  const setEmail = async email => {
    try {
      await AsyncStorage.setItem('email', email);
    } catch (error) {
      console.log(error);
    }
  };
  

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#00415e" barStyle="light-content" />
      <ImageBackground
        source={require('../../assets/img/backheart.png')}
        resizeMode="cover"
        style={styles.image}>
        <TouchableOpacity
          style={{marginLeft: 20, color: '#fff'}}
          backgroundColor="#fff"
          onPress={() => navigation.navigate('MainTab')}>
          <Text
            style={{
              color: '#fff',
              position: 'absolute',
              bottom: 140,
              left: 300,
              fontSize: 18,
              fontFamily:'Raleway'
            }}>
            Skip
          </Text>
        </TouchableOpacity>
        <Stack space={1}>
          <View style={styles.header}>
            <Text style={styles.text_header}>Sign In</Text>
          </View>

          <VStack space={3}>
            <View style={styles.action}>
              <TextInput
                placeholder="Enter your email"
                placeholderTextColor="#fff"
                style={[
                  styles.textInput,
                  {
                    color: '#fff',
                  },
                ]}
                autoCapitalize="none"
                value={data.email}
                returnKeyType="done"
                onChangeText={e => setData({...data, email: e})}
              />
              {data.check_textInputChange ? (
                <Animatable.View animation="bounceIn">
                  <Feather name="check-circle" color="green" size={20} />
                </Animatable.View>
              ) : null}
            </View>

            <View style={styles.action}>
              <TextInput
                placeholder="Enter your password"
                placeholderTextColor="#fff"
                secureTextEntry={data.secureTextEntry ? true : false}
                style={[
                  styles.textInput,
                  {
                    color: '#fff',
                  },
                ]}
                autoCapitalize="none"
                returnKeyType="go"
                value={data.password}
                onSubmitEditing={loginForm}
                onChangeText={e => setData({...data, password: e})}
              />
              <TouchableOpacity onPress={updateSecureTextEntry}>
                <View style={{position: 'relative', right: 20, top: 10}}>
                  {data.secureTextEntry ? (
                    <Feather name="eye-off" color="grey" size={20} />
                  ) : (
                    <Feather name="eye" color="grey" size={20} />
                  )}
                </View>
              </TouchableOpacity>
            </View>
          </VStack>
          <View style={styles.button}>
  
            <TouchableOpacity style={styles.signIn} onPress={loginForm}>
              <Text
                style={[
                  styles.textSign,
                  {
                    fontFamily:'Raleway-Bold',
                    color: '#00415e',
                  },
                ]}>
                Sign In
              </Text>
            </TouchableOpacity>
            <VStack space={50}>
              <TouchableOpacity>
                <Text
                  style={{color: '#fff', textAlign: 'center', marginTop: 5,  fontFamily:'Raleway'}}
                  onPress={verify}>
                  Forgot password?
                </Text>
              </TouchableOpacity>

              <TouchableOpacity>
                <Text
                  style={{color: '#fff', textAlign: 'center', marginTop: 25,  fontFamily:'Raleway'}}
                  onPress={() => navigation.navigate('SignUp')}>
                  Don't have an account? Sign Up
                </Text>
              </TouchableOpacity>
            </VStack>
          </View>
        </Stack>
      </ImageBackground>
    </View>
  );
};

export default SignInScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#00415e',
  },
  header: {
    paddingHorizontal: 20,
    paddingBottom: 50,
  },

  text_header: {
      fontFamily:'Raleway-Bold',
    color: '#fff',
   
    fontSize: 30,


    textAlign: 'center',
  },
  text_footer: {
    color: '#05375a',
    fontSize: 18,
  },
  action: {
    flexDirection: 'row',

    borderWidth: 1,
    borderRadius: 15,
    borderColor: '#f2f2f2',
    paddingBottom: 5,
  },
  actionError: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#FF0000',
    paddingBottom: 5,
  },
  textInput: {
    flex: 1,
    padding: 6,
    paddingHorizontal: 15,
    color: '#05375a',
    fontFamily:'Raleway'
  },
  errorMsg: {
    color: '#FF0000',
    fontSize: 14,
  },
  button: {
    alignItems: 'center',
    marginTop: 50,
  },
 
  signIn: {
    width: '100%',
    height: hp('6%'),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: '#fff',
  },
  textSign: {
    fontSize: 18,
    textAlign:'center'
   
  },
  image: {
    flex: 1,
    justifyContent: 'center',
    padding: 15,
  },
});
