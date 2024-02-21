import React, {useEffect, useState} from 'react';
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
  SafeAreaView,
  ToastAndroid,
  Pressable,
} from 'react-native';
import {HStack, Input, useToast, Spinner, Checkbox} from 'native-base';
import axios from 'axios';
import {type} from '../Redux/Action';
import * as Animatable from 'react-native-animatable';
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
import Icon from 'react-native-vector-icons/Ionicons';
import {usePasswordValidation} from '../../components/usePasswordValidation';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useStore} from 'react-redux';
import {reg} from '../Redux/Action';
import {screenName} from '../Redux/Action';
import {row} from '../Redux/Action';
import {fetchSuccessProfile} from '../Redux/Action';

const SignUpScreen = ({props}) => {
  const [emails, setEmails] = useState('');
  const navigation = useNavigation();
  const [passwordSecured, setPasswordSecured] = useState(false);
  const [password, setPassword] = useState({
    firstPassword: '',
    secondPassword: '',
  });
  const user = useStore();
  const dispatch = useDispatch();
  const routeName = useStore();
  const [firstName, setFname] = useState('');
  const [lastName, setLname] = useState('');
  const [userType, setUserType] = useState('other');

  const [message, setMessage] = useState('');
  const [isError, setError] = useState(false);
  const [status, setStatus] = useState('');

  const [number, setMname] = useState('');
  const toast = useToast();
  const [emailExists, setExists] = useState(false);
  const [promo, setPromo] = useState(null);
  const [validEmail, setValidEmail] = useState(false);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
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

  const spinner = () => {
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

  
  const SignUpForm = async () => {
    setLoading(true);

    // Check if all validation passed
    if (validEmail && upperCase && lowerCase && match) {
      try {
        const response = await axios.post(
          `${backendHost}/registration/add/new`,
          {
            firstname: firstName,
          
            lastname: lastName,
            email: emails,
            psw: password.firstPassword,
            'psw-repeat': password.secondPassword,
            rempwd: '1',
            doc_patient: userType,
            acceptTnc: '1',
            number: number,
            Age: null, // Assuming you intentionally set this to null
          },
          {
            withCredentials: true, // This should be in the second argument as part of the config object
            headers: {'Access-Control-Allow-Credentials': true},
          },
        );

        console.log('Doc Res', response.data);

        // Successful registration
        if (response.data.registration_id) {
          setTimeout(() => {
            dispatch(screenName('MAIN'));
            user.dispatch(reg(response.data.registration_id));
            console.log('docID', response.data.docID);
            user.dispatch(fetchSuccessProfile(response.data));

            toast.show({
              title: 'Signup Successful',
              description: 'Welcome To All Cures',
              status: 'success',
              placement: 'bottom',
              style: {borderRadius: 20, width: wp('80%'), marginBottom: 20},
            });

            user.dispatch(type(response.data.registration_type));
            user.dispatch(row(response.data.docID));
            setEmail(response.data.email_address);
          }, 3000);
        } else if (
          response.data === 'Email Address already Exists in the System'
        ) {
          toast.show({
            title: 'Email already exists!',
            description: 'Try with another email',
            status: 'warning',
            placement: 'bottom',
            style: {borderRadius: 20, width: wp('80%'), marginBottom: 20},
          });
        }
      } catch (error) {
        console.error(error);
        // Handle error here, for example:
        toast.show({
          title: 'Registration failed',
          description: 'An unexpected error occurred. Please try again later.',
          status: 'error',
          placement: 'bottom',
          style: {borderRadius: 20, width: wp('80%'), marginBottom: 20},
        });
      } finally {
        setLoading(false);
      }
    } else {
      // If validation fails, immediately stop loading
      setTimeout(() => {
        setLoading(false);
      }, 2000);
    }
  };

  const updateSecureTextEntry = () => {
    setData({
      ...data,
      secureTextEntry: !data.secureTextEntry,
    });
  };

  useEffect(() => {
    console.log('userType', userType);
  });

  const validate = text => {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    if (reg.test(text) === false) {
      setEmails(text);
      setValidEmail(true);
      return false;
    } else {
      setEmails(text);
    }
  };

  const setEmail = async email => {
    try {
      await AsyncStorage.setItem('email', email);
    } catch (error) {
      error;
    }
  };

  const afterSignUp = () => {
    if (emailExists === true) {
      return Alert.alert('Email already exist');
    } else if (success === true) {
      if (promo) {
        return navigation.navigate('Main');
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
        <Pressable onPress={() => dispatch(screenName('MAIN'))}>
          <Text style={styles.skip}>Skip</Text>
        </Pressable>

        {/* <TouchableOpacity
          style={{ zIndex: 1 }}
          backgroundColor="#fff"
          onPress={() => dispatch(screenName('MAIN'))}>
          <Text
            style={styles.skip}>
            Skip
          </Text>
        </TouchableOpacity> */}

        <View style={styles.body}>
          <View style={styles.header}>
            <Text style={styles.headerText}>Sign Up</Text>
          </View>

          <View style={{marginBottom: 15}}>
            <Input
              placeholder="enter first name"
              height={12}
              color={'#fff'}
              _focus={{
                borderWidth: 2,
                borderColor: '#fff',
                color: '#fff',
                placeholderTextColor: '#fff',
              }}
              autoCapitalize="none"
              value={firstName}
              returnKeyType="done"
              onChangeText={e => setFname(e)}
            />
          </View>

          <View style={{marginBottom: 15}}>
            <Input
              placeholder="enter last name"
              height={12}
              color={'#fff'}
              _focus={{
                borderWidth: 2,
                borderColor: '#fff',
                color: '#fff',
                placeholderTextColor: '#fff',
              }}
              autoCapitalize="none"
              value={lastName}
              returnKeyType="done"
              onChangeText={e => setLname(e)}
            />
          </View>
          <View style={{marginBottom: 15}}>
            <Input
              placeholder="enter mobile number"
              height={12}
              color={'#fff'}
              _focus={{
                borderWidth: 2,
                borderColor: '#fff',
                color: '#fff',
                placeholderTextColor: '#fff',
              }}
              value={number}
              returnKeyType="done"
              keyboardType="numeric"
              onChangeText={e => setMname(e)}
            />
          </View>

          <View style={{marginBottom: 15}}>
            <Input
              placeholder="enter email"
              height={12}
              color={'#fff'}
              _focus={{
                borderWidth: 2,
                borderColor: '#fff',
                color: '#fff',
                placeholderTextColor: '#fff',
              }}
              autoCapitalize="none"
              value={emails}
              returnKeyType="done"
              onChangeText={e => validate(e)}
            />
          </View>

          <View style={{marginBottom: 15}}>
            <Input
              placeholder="enter password"
              height={12}
              color={'#fff'}
              _focus={{
                borderWidth: 2,
                borderColor: '#fff',
                color: '#fff',
                placeholderTextColor: '#fff',
              }}
              autoCapitalize="none"
              returnKeyType="go"
              secureTextEntry={passwordSecured}
              value={password}
              onChangeText={e => setFirstP(e)}
            />
          </View>

          <View style={{marginBottom: 15}}>
            <Input
              placeholder="confirm password"
              height={12}
              color={'#fff'}
              _focus={{
                borderWidth: 2,
                borderColor: '#fff',
                color: '#fff',
                placeholderTextColor: '#fff',
              }}
              autoCapitalize="none"
              secureTextEntry={passwordSecured}
              returnKeyType="go"
              value={password}
              onChangeText={e => setSecond(e)}
              InputRightElement={
                <View>
                  <TouchableOpacity
                    onPress={() => setPasswordSecured(!passwordSecured)}>
                    <Feather
                      name={passwordSecured ? 'eye-off' : 'eye'}
                      color="grey"
                      size={20}
                      style={{marginRight: 10}}
                    />
                  </TouchableOpacity>
                </View>
              }
            />
          </View>

          <HStack space={2}>
            <Checkbox
              value={userType}
              onChange={() => setUserType('Doctor')}></Checkbox>
            <Text style={{fontFamily: 'Raleway', color: '#fff'}}>
              Select , If you are Doctor.
            </Text>
          </HStack>

          <TouchableOpacity
            style={styles.signIn}
            onPress={
              (() => {
                handleEmail(emails);
              },
              SignUpForm)
            }>
            <HStack space={2}>
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
            </HStack>
          </TouchableOpacity>

          {loading ? spinner() : null}

          {loading ? (
            <View>
              {!validEmail && Alert.alert('Enter Valid Email')}
              {!validLength &&
                Alert.alert('Password should contain at least 8 characters!')}
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
        </View>
        {/* <TouchableOpacity
          style={{marginLeft: 20,   zIndex: 999,color: '#fff'}}
          backgroundColor="#fff"
          onPress={() => dispatch(screenName('Main'))& navigation.replace('Main')}>
          <Text
            style={{
              color: '#fff',
              position: 'relative',
              top: Platform.OS === 'android' ? 0 : 0,
              left: Platform.OS === 'android' ? 265 : 255,
              fontSize: 18,
              zIndex: 999,
              fontFamily: 'Raleway-Medium',
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

              {loading ? (
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
                <View  style={{position: 'absolute', right: 10, bottom: 85,zIndex:999}}>
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
              <HStack space={2}>
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
                
              </HStack>
            </TouchableOpacity>
            {loading?spinner():null}
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
        </Stack> */}
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
  body: {
    justifyContent: 'center',
    width: '100%',
    height: '90%',
    marginTop: 40,
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
    marginBottom: 10,
  },

  headerText: {
    fontSize: 25,
    fontFamily: 'Raleway-Bold',
    color: '#fff',
    alignSelf: 'center',
    marginBottom: 5,
    marginTop: -10,
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
    padding: Platform.OS == 'ios' ? 10 : 0,
    borderWidth: 1,
    borderRadius: Platform.OS == 'android' ? 15 : 12,
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
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
    backgroundColor: '#fff',
    marginTop: 10,
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
