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
  Checkbox,
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
import {usePasswordValidation} from '../../components/usePasswordValidation';
const SignUpScreen = ({navigation, props}) => {
  const [emails, setEmails] = useState('');

  const [password, setPassword] = useState({
    firstPassword: '',
    secondPassword: '',
  });

  const [firstName, setFname] = useState('');
  const [lastName, setLname] = useState('');
  const [userType, setUserType] = useState('other');
  const [terms, setTerms] = useState('');
  const [policy, setPolicy] = useState('');
  const [rempwd, setRempwd] = useState('');

  const [message, setMessage] = useState('');
  const [isError, setError] = useState(false);
  const [status, setStatus] = useState('');

  const [buttonClick, setClicked] = useState('');

  const [number, setMname] = useState('');

  const [emailExists, setExists] = useState(false);
  const [promo, setPromo] = useState(null);
  const [validEmail, setValidEmail] = useState();
  const [success, setSuccess] = useState(false);

  const [validLength, hasNumber, upperCase, lowerCase, match, specialChar] =
    usePasswordValidation({
      firstPassword: password.firstPassword,
      secondPassword: password.secondPassword,
    });
  const [data, setData] = useState({
    check_textInputChange: false,
    secureTextEntry: true,
  });
  const setFirstP = event => {
    setPassword({...password, firstPassword: event});
  };
  const setSecond = event => {
    setPassword({...password, secondPassword: event});
  };
  const SignUpForm = () => {
    setClicked(1);
    setTimeout(() => {
      setClicked(0);
    }, 3000);
    var res;

    if (validEmail && upperCase && lowerCase && match) {
      axios.defaults.withCredentials = true;
      axios
        .post(
          `${backendHost}/RegistrationActionController?firstname=${firstName}&lastname=${lastName}&email=${emails}&psw=${password.firstPassword}&psw-repeat=${password.secondPassword}&rempwd=on&doc_patient=${userType}&acceptTnc=${terms}&number=${number}`,
          {headers: {'Access-Control-Allow-Credentials': true}},
        )
        .then(response => {
          if (response.data == 'Email Address already Exists in the System') {
            Alert.alert('Email already exists');
          } else if (response.data.registration_id) {
            Alert.alert('Signup Successful');
            setTimeout(() => {
              navigation.navigate('MainTab', {}),
                setId(response.data.registration_id),
                setType(response.data.registration_type),
                setFirst(response.data.first_name),
                setLast(response.data.last_name),
                setEmail(response.data.email_address);
            }, 1000);
          }
        })
        .catch(res => {
          Alert.alert('some error occured');
        });
    } else {
      return;
    }
  };

  const updateSecureTextEntry = () => {
    setData({
      ...data,
      secureTextEntry: !data.secureTextEntry,
    });
  };

  const handleChange = event => {
    setUserType(event);
  };

  const validate = text => {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    if (reg.test(text) === false) {
      setEmails(text);
      setValidEmail(false);
      return false;
    } else {
      setEmails(text);
      setValidEmail(true);
    }
  };

  const setCheck = async value => {
    try {
      await AsyncStorage.setItem('check', JSON.stringify(value));
    } catch (error) {}
  };
  const setId = async id => {
    try {
      await AsyncStorage.setItem('author', JSON.stringify(id));
    } catch (error) {}
  };
  const setType = async type => {
    try {
      await AsyncStorage.setItem('rateType', JSON.stringify(type));
    } catch (error) {}
  };
  const setFirst = async first => {
    try {
      await AsyncStorage.setItem('firstName', first);
    } catch (error) {}
  };
  const setLast = async last => {
    try {
      await AsyncStorage.setItem('lastName', last);
    } catch (error) {}
  };
  const setEmail = async email => {
    try {
      await AsyncStorage.setItem('email', email);
    } catch (error) {}
  };

  const afterSignUp = () => {
    if (emailExists === true) {
      return Alert.alert('Email already exist');
    } else if (success === true) {
      if (promo) {
        return navigation.navigate('MainTab', {
          params: {
            userId: authid,
          },
        });
      } else {
        setTimeout(() => {
          window.location.reload();
        }, 1000);
        return (
          <Redirect
            to={{
              pathname: '#',
            }}
          />
        );
      }
    } else if (isError === true) {
      return Alert.alert('Some error occured');
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
              fontFamily: 'Raleway',
            }}>
            Skip
          </Text>
        </TouchableOpacity>
        <Stack space={1}>
          <View style={styles.header}>
            <Text style={styles.text_header}>Sign Up</Text>
          </View>

          <VStack space={3}>
            <View style={styles.action}>
              <TextInput
                placeholder="Enter first name"
                placeholderTextColor="#fff"
                style={[
                  styles.textInput,
                  {
                    color: '#fff',
                  },
                ]}
                autoCapitalize="none"
                value={firstName}
                returnKeyType="done"
                onChangeText={e => setFname(e)}
              />
            </View>
            <View style={styles.action}>
              <TextInput
                placeholder="Enter last name"
                placeholderTextColor="#fff"
                style={[
                  styles.textInput,
                  {
                    color: '#fff',
                  },
                ]}
                autoCapitalize="none"
                value={lastName}
                returnKeyType="done"
                onChangeText={e => setLname(e)}
              />
            </View>
            <View style={styles.action}>
              <TextInput
                placeholder="Enter your email"
                placeholderTextColor="#fff"
                value={emails}
                style={[
                  styles.textInput,
                  {
                    color: '#fff',
                  },
                ]}
                autoCapitalize="none"
                returnKeyType="done"
                onChangeText={e => validate(e)}
              />
            </View>
            <View style={styles.action}>
              <TextInput
                placeholder="Enter mobile number"
                placeholderTextColor="#fff"
                style={[
                  styles.textInput,
                  {
                    color: '#fff',
                  },
                ]}
                autoCapitalize="none"
                value={number}
                returnKeyType="done"
                keyboardType="numeric"
                onChangeText={e => setMname(e)}
              />
            </View>
            <View>
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
                value={password}
                onChangeText={e => setFirstP(e)}
              />

              {buttonClick === 1 ? (
                <View>
                  {!validEmail && Alert.alert('Enter Valid Email')}
                  {!validLength &&
                    Alert.alert(
                      'Password should contain at least 8 characters!',
                    )}
                  {!upperCase &&
                    Alert.alert(
                      ' Password should contain at least 1 uppercase character!',
                    )}
                  {!lowerCase &&
                    Alert.alert(
                      'Password should contain at least 1 lowercase character!',
                    )}
                  {!match && Alert.alert("Passwords don't match!")}
                </View>
              ) : null}
            </View>
            <View style={styles.action}>
              <TextInput
                placeholder="Confirm password"
                placeholderTextColor="#fff"
                secureTextEntry={true}
                style={[
                  styles.textInput,
                  {
                    color: '#fff',
                  },
                ]}
                autoCapitalize="none"
                returnKeyType="go"
                value={password}
                onChangeText={e => setSecond(e)}
              />
            </View>
            <View>
              <TouchableOpacity onPress={updateSecureTextEntry}>
                <View style={{position: 'absolute', right: 10, bottom: 85}}>
                  {data.secureTextEntry ? (
                    <Feather name="eye-off" color="grey" size={20} />
                  ) : (
                    <Feather name="eye" color="grey" size={20} />
                  )}
                </View>
              </TouchableOpacity>
              <HStack space={2}>
                <Checkbox
                  value={userType}
                  onChange={() => setUserType('Doctor')}></Checkbox>
                <Text style={{fontFamily: 'Raleway', color: '#fff'}}>
                  Select , If you are Doctor.
                </Text>
              </HStack>
            </View>
          </VStack>
          <View style={styles.button}>
            <TouchableOpacity
              style={styles.signIn}
              onPress={
                (() => {
                  handleEmail(emails);
                },
                SignUpForm)
              }>
              <Text
                style={[
                  styles.textSign,
                  {
                    fontFamily: 'Raleway-Bold',
                    color: '#00415e',
                  },
                ]}>
                Sign Up
              </Text>
            </TouchableOpacity>
            <VStack space={50}>
              <TouchableOpacity>
                <Text
                  style={{
                    color: '#fff',
                    textAlign: 'center',
                    marginTop: 25,
                    fontFamily: 'Raleway',
                  }}
                  onPress={() => navigation.navigate('SignIn')}>
                  Already have an account? Sign In
                </Text>
              </TouchableOpacity>
            </VStack>
          </View>
        </Stack>
      </ImageBackground>
    </View>
  );
};

export default SignUpScreen;

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
    justifyContent: 'center',
    padding: 15,
  },
});
