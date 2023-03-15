import React, { useState, useEffect } from 'react';
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
  ToastAndroid,
  BackHandler,
  SafeAreaView,
  Pressable
} from 'react-native';
import {
  HStack,
  Input,
  Stack,
  VStack,
} from 'native-base';
import axios from 'axios';

import * as Animatable from 'react-native-animatable';
import { useToast } from 'native-base';
import LottieView from 'lottie-react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { backendHost } from '../../components/apiConfig';
import AsyncStorage from '@react-native-async-storage/async-storage';
import analytics from '@react-native-firebase/analytics';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { reg, type, row, getEmail, getPass } from '../Redux/Action';
import { useStore } from 'react-redux';
import { screenName } from '../Redux/Action';
import crashlytics from '@react-native-firebase/crashlytics';



const SignInScreen = ({ props, route }) => {
  const [status, setStatus] = useState('');
  const navigation = useNavigation()
  const [buttonClick, setClicked] = useState(false);
  const [loginSuccess, setLoginSuccess] = useState(true);
  const[passwordSecured,setPasswordSecured]=useState(false)
  const routeName = useStore()

  const user = useStore()
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
  const dispatch = useDispatch();


  const toast = useToast();
  const updateSecureTextEntry = () => {
    setData({
      ...data,
      secureTextEntry: !data.secureTextEntry,
    });
  };

  useEffect(() => {
    console.log('screen:', routeName.getState().name.screen)
  })


  const loading = () => {
    return (
      <View style={{ alignItems: 'center' }}>
        <HStack space={2} justifyContent="center">
          <LottieView
            source={require('../../assets/animation/pulse.json')}
            autoPlay
            loop
            style={{ width: 50, height: 50 }}
          />
    
       
        </HStack>
      </View>
    );
  };

  const loginForm = () => {
console.log('email',data.email)
console.log('pass',data.password)
if(data.email!=''&&data.password!=''){
  setClicked(true)
   
      axios.get(`${backendHost}/data/delete/${data.email}`)
      .then((res)=>{
 console.log('delete',res.data)

        if(res.data.includes('deleted')){
          console.log('true')
          setClicked(false)
          toast.show({
            title: 'Invalid email/password',
            status: 'warning',
            description: 'Please enter a valid email/password',
            duration: 2000,

            style: { borderRadius: 20, width: wp('70%'), marginBottom: 20 },
          });

        }
        else{
  
console.log('false')
          axios
      .post(
        `${backendHost}/login?cmd=login&email=${data.email.replace(/\s/g, '')}&psw=${data.password}&rempwd=on`,
        {
          headers: {
            'Access-Control-Allow-Credentials': true,
          },
        },
      )

      .then(res => {
        if (res.data.registration_id) {
         console.log(res.data)
          setTimeout(() => {
           dispatch(getEmail(res.data.email_address))
          dispatch(getPass(data.password))
            dispatch(screenName('MAIN'));
            crashlytics().log(`User has signed in`);
            analytics().setUserProperty(
              'Reg_Id',
              JSON.stringify(res.data.registration_id),
            );
            analytics().setUserId(JSON.stringify(res.data.registration_id));
            analytics().logEvent('login', { reg_id: res.data.registration_id });
            setStatus(res.status);
            user.dispatch(reg(res.data.registration_id))
            user.dispatch(type(res.data.registration_type))
            console.log('r', res.data.rowno)
            user.dispatch(row(res.data.rowno))
            setClicked(false);
          }, 3000);
        }
        return true;
      })

      .catch(err => {
        setLoginSuccess(false);
        if (err.response) {
          if (err.response.data.includes('Incorrect email')) {
            setTimeout(() => {
              setClicked(false);
              toast.show({
                title: 'Invalid email/password',
                status: 'warning',
                description: 'Please enter a valid email/password',
                duration: 2000,

                style: { borderRadius: 20, width: wp('70%'), marginBottom: 20 },
              });
            }, 1000);
          } else {
            setTimeout(() => {
              setClicked(false);
              toast.show({
                title: 'Some Error Occured',
                status: 'warning',
                description: 'Please try again',
                duration: 2000,
    
                style: { borderRadius: 20, width: wp('70%'), marginBottom: 20 },
              });
            }, 2000);
          }
        } else {
          return;
        }
      })
          
        }
      })
    }
    else{
      setClicked(false)
      Alert.alert('enter details')
    }

    
  };





  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#00415e" barStyle="light-content" />

      <ImageBackground
        source={require('../../assets/img/backheart.png')}
        resizeMode="stretch"
        style={styles.image}>

<Pressable onPress={() => dispatch(screenName('MAIN'))}><Text  style={styles.skip}>Skip</Text></Pressable>

        <View style={styles.body}>


          <View style={styles.header}>
            <Text style={styles.headerText}>Sign In</Text>
          </View>

          <View style={{marginBottom:15}}>
            <Input 
            placeholder='enter email' 
            height={12}
            color={'#fff'}
            _focus={{ borderWidth: 2, borderColor: '#fff', color: '#fff', placeholderTextColor: '#fff' }} 
            autoCapitalize="none"
                  value={data.email.replace(/\s/g, '')}
                
                  returnKeyType="done"
                  onChangeText={e => setData({...data, email: e})}
            />
          </View>

          <View style={{marginBottom:15}}>
            <Input 
            placeholder='enter password' 
            height={12}
             color={'#fff'}
            _focus={{ borderWidth: 2, borderColor: '#fff', color: '#fff', placeholderTextColor: '#fff' }}
            secureTextEntry={passwordSecured}
            autoCapitalize="none"
            returnKeyType="go"
            value={data.password}
            onSubmitEditing={loginForm}
            onChangeText={e => setData({...data, password: e})}
            InputRightElement={<View><TouchableOpacity onPress={()=>setPasswordSecured(!passwordSecured)}><Feather name={passwordSecured?'eye-off':'eye'} color="grey" size={20} style={{marginRight:10}} /></TouchableOpacity></View>}
             />
          </View>

          <TouchableOpacity style={styles.signIn} onPress={loginForm}>
                <Text
                  style={[
                    styles.textSign,
                    {
                      fontFamily: 'Raleway-Bold',
                      color: '#00415e',
                    },
                  ]}>
                  Sign In
                </Text>
              </TouchableOpacity>

              <TouchableOpacity>
                  <Text
                    style={{
                      color: '#fff',
                      textAlign: 'center',
                      marginTop: 10,
                      fontFamily: 'Raleway',
                    }}
                    onPress={verify}>
                    Forgot password?
                  </Text>
                </TouchableOpacity>
                {buttonClick == true? loading() : null}
                <TouchableOpacity>
                  <Text
                    style={{
                      color: '#fff',
                      textAlign: 'center',
                      marginTop: 25,
                      fontFamily: 'Raleway',
                    }}
                    onPress={() => navigation.navigate('SignUp')}>
                    Don't have an account? Sign Up
                  </Text>
                </TouchableOpacity>


        </View>





              </ImageBackground>
    </SafeAreaView>
  );
};

export default SignInScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#00415e',
  },
  body: {
    justifyContent: 'center',
    width: '100%',
    height: '90%',
    marginTop:40,

  },
  skip: {
    color: '#fff',
    position: 'absolute',
    top: 20,
    right: 20,
    fontSize: 18,
    fontFamily: 'Raleway-Bold',
  },
  header: {
    width: '100%',
    marginBottom:10
  },

  headerText: {
    fontSize: 25,
    fontFamily: 'Raleway-Bold',
    color: '#fff',
    alignSelf: 'center'

  },

  text_header: {
    fontFamily: 'Raleway-Bold',
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
    height: 48,
    flex: 1,
    padding: 6,
    paddingHorizontal: 15,
    color: '#05375a',
    fontFamily: 'Raleway',
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
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
    backgroundColor: '#fff',
  },
  textSign: {
    fontSize: 18,
    textAlign: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
    padding: 15,
  },
});