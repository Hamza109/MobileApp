import React, {useState, useEffect} from 'react';
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
} from 'react-native';
import {
  HStack,
  Stack,
  Center,
  Heading,
  NativeBaseProvider,
  Container,
  VStack,
  Spinner,
} from 'native-base';
import axios from 'axios';
import Home from '../MainTab/Home';
import * as Animatable from 'react-native-animatable';
import {useToast} from 'native-base';
import LottieView from 'lottie-react-native';
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
import analytics from '@react-native-firebase/analytics';
import Icon from 'react-native-vector-icons/Ionicons';
const SignInScreen = ({navigation, props}) => {
  const [status, setStatus] = useState('');
  const [buttonClick, setClicked] = useState('');
  const [isSignedIn, setIsSignedIn] = useState(props);
  const [loginSuccess, setLoginSuccess] = useState(true);
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
  const toast = useToast();
  const updateSecureTextEntry = () => {
    setData({
      ...data,
      secureTextEntry: !data.secureTextEntry,
    });
  };
  const backAction = () => {
    if (navigation.isFocused()) {
      navigation.push('MainTab');
    }
  };
  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', backAction);
    return () =>
      BackHandler.removeEventListener('hardwareBackPress', backAction);
  });

  const loading = () => {
    return (
      <View style={{alignItems: 'center'}}>
        <HStack space={2} justifyContent="center">
          <LottieView
            source={require('../../assets/animation/pulse.json')}
            autoPlay
            loop
            style={{width: 50, height: 50}}
          />
          {/* <Spinner
            accessibilityLabel="Loading posts"
            color="#fff"
            size="lg"
          /> */}
        </HStack>
      </View>
    );
  };

  const loginForm = () => {
    setClicked(1);

    axios
      .post(
        `${backendHost}/login?cmd=login&email=${data.email}&psw=${data.password}&rempwd=on`,
        {
          headers: {
            'Access-Control-Allow-Credentials': true,
          },
        },
      )

      .then(res => {
        if (res.data.registration_id) {
          setTimeout(() => {
            navigation.push('MainTab', {
              params: {
                userId: authid,
              },
            });
            analytics().setUserProperty(
              'Reg_Id',
              JSON.stringify(res.data.registration_id),
            );
            analytics().setUserId(JSON.stringify(res.data.registration_id));
            analytics().logEvent('login', {reg_id: res.data.registration_id});
            setStatus(res.status);
            setId(res.data.registration_id);
            setType(res.data.registration_type);
            setRow(res.data.rowno);
            setClicked(0);
          }, 3000);
        }
      })

      .catch(err => {
        setLoginSuccess(false);
        if (err.response) {
          if (err.response.data.includes('Incorrect email')) {
            setTimeout(() => {
              setClicked(0);
              toast.show({
                title: 'Invalid email address',
                status: 'warning',
                description: 'Please enter a valid email address',
                duration: 2000,

                style: {borderRadius: 20, width: wp('70%'), marginBottom: 20},
              });
            }, 1000);
          } else {
            setTimeout(() => {
              setClicked(0);
              ToastAndroid.showWithGravityAndOffset(
                'Some Error Occured',
                ToastAndroid.LONG,
                ToastAndroid.BOTTOM,
                25,
                50,
              );
            }, 2000);
          }
        } else {
          return;
        }
      });
  };

  const setId = async id => {
    try {
      await AsyncStorage.setItem('author', JSON.stringify(id));
    } catch (error) {
      error;
    }
  };
  const setType = async type => {
    try {
      await AsyncStorage.setItem('rateType', JSON.stringify(type));
    } catch (error) {
      error;
    }
  };

  const setRow = async row => {
    try {
      await AsyncStorage.setItem('rowno', JSON.stringify(row));
    } catch (error) {
      error;
    }
  };

  const setEmail = async email => {
    try {
      await AsyncStorage.setItem('email', email);
    } catch (error) {
      error;
    }
  };
  const [borderWidth, setborderWidth] = useState(1);
  const [pBorderWidth, setPborderWidth] = useState(1);

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
          onPress={() => navigation.push('MainTab')}>
          <Text
            style={{
              color: '#fff',
              position: 'absolute',
              top: Platform.OS === 'android' ? 0 : 50,
              right: Platform.OS === 'android' ? 0 : 45,
              fontSize: 18,
              zIndex: 999,
              fontFamily: 'Raleway-Medium',
            }}>
            Skip
          </Text>
        </TouchableOpacity>
        <View style={{flex: 1, justifyContent: 'center'}}>
          <Stack space={1}>
            <View style={styles.header}>
              <Text style={styles.text_header}>Sign In</Text>
            </View>

            <VStack space={3}>
              <View style={[styles.action, {borderWidth: borderWidth}]}>
                <TextInput
                  placeholder="Enter your email"
                  onFocus={() => setborderWidth(2)}
                  onBlur={() => setborderWidth(1)}
                  placeholderTextColor="#fff"
                  style={[
                    styles.textInput,
                    {
                      color: '#fff',
                    },
                  ]}
                  onfo
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

              <View style={[styles.action, {borderWidth: pBorderWidth}]}>
                <TextInput
                  placeholder="Enter your password"
                  placeholderTextColor="#fff"
                  onFocus={() => setPborderWidth(2)}
                  onBlur={() => setPborderWidth(1)}
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
                      fontFamily: 'Raleway-Bold',
                      color: '#00415e',
                    },
                  ]}>
                  Sign In
                </Text>
              </TouchableOpacity>

              <VStack space={50}>
                <TouchableOpacity>
                  <Text
                    style={{
                      color: '#fff',
                      textAlign: 'center',
                      marginTop: 5,
                      fontFamily: 'Raleway',
                    }}
                    onPress={verify}>
                    Forgot password?
                  </Text>
                </TouchableOpacity>
                {buttonClick ? loading() : null}
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
              </VStack>
            </View>
          </Stack>
        </View>
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
    height: hp('6%'),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: '#fff',
  },
  textSign: {
    fontSize: 18,
    textAlign: 'center',
  },
  image: {
    flex: 1,

    padding: 15,
  },
});
