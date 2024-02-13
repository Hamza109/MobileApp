import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Alert,
  ImageBackground,
  SafeAreaView,
  Pressable,
} from 'react-native';
import {HStack, Input, Stack, VStack} from 'native-base';
import axios from 'axios';

import {useToast} from 'native-base';
import LottieView from 'lottie-react-native';
import Feather from 'react-native-vector-icons/Feather';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {backendHost} from '../../components/apiConfig';
import analytics from '@react-native-firebase/analytics';
import {useNavigation} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import {reg, type, row, getEmail, getPass} from '../Redux/Action';
import {useStore} from 'react-redux';
import {screenName} from '../Redux/Action';
import crashlytics from '@react-native-firebase/crashlytics';
import {fetchSuccessProfile} from '../Redux/Action';
const SignInScreen = ({props, route}) => {
  const [status, setStatus] = useState('');
  const navigation = useNavigation();
  const [buttonClick, setClicked] = useState(false);
  const [loginSuccess, setLoginSuccess] = useState(true);
  const [passwordSecured, setPasswordSecured] = useState(true);
  const routeName = useStore();

  const user = useStore();
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
        </HStack>
      </View>
    );
  };

  // Assuming you have the necessary imports and this function is within a React component or hook

  const loginForm = async () => {
    if (!data.email || !data.password) {
      Alert.alert('Please enter details');
      return; // Early return if email or password is missing
    }

    setClicked(true); // Assuming setClicked controls a loading indicator

    try {
      // Attempt login
      const response = await fetch(
        `${backendHost}/login?cmd=login&email=${data.email}&psw=${data.password}&rempwd=on`,
        {
          method: 'POST',
          credentials: 'include', // Ensures cookies are sent with the request, equivalent to withCredentials in axios
          headers: {
            'Content-Type': 'application/json',
            // 'Access-Control-Allow-Credentials': 'true', might not be necessary for the request, commonly used in responses
          },
        },
      );

      if (!response.ok) {
        // If server response is not okay, handle it accordingly
        const errorText = await response.text(); // Attempt to read server error response
        throw new Error(`Network response was not ok: ${errorText}`);
      }

      const loginData = await response.json();
      // Parse JSON response into JavaScript object
      console.log('Login Response', loginData);
      dispatch(fetchSuccessProfile(loginData));

      const {registration_id, email_address, docID, registration_type} =
        loginData;
      if (registration_id) {
        // Delay the following logic for better UX or remove setTimeout if not needed
        setTimeout(() => {
          // Update app state with login details
          dispatch(getEmail(email_address));
          dispatch(getPass(data.password));
          dispatch(screenName('MAIN'));
          // Log analytics and crashlytics data
          logAnalyticsAndCrashlytics(registration_id, docID, registration_type);
          setClicked(false);
        }, 3000);
      }
    } catch (err) {
      // Handle login error
      handleLoginError(err);
    }
  };

  // Helper function to log analytics and crashlytics data

  // Ensure logAnalyticsAndCrashlytics and handleLoginError are defined in your code to use them here.

  // Helper function to log analytics and crashlytics data
  const logAnalyticsAndCrashlytics = (
    registration_id,
    docID,
    registration_type,
  ) => {
    crashlytics().log(`User has signed in`);
    analytics().setUserProperty('Reg_Id', JSON.stringify(registration_id));
    analytics().setUserId(JSON.stringify(registration_id));
    analytics().logEvent('login', {reg_id: registration_id});
    // Assuming setStatus updates some state
    user.dispatch(reg(registration_id));
    user.dispatch(type(registration_type));
    user.dispatch(row(docID)); // Assuming this dispatches the correct action
  };

  // Helper function to handle login errors
  const handleLoginError = err => {
    console.error(err); // Log the error for debugging
    setClicked(false); // Reset loading indicator
    const message =
      err.response && err.response.data.includes('Incorrect email')
        ? 'Invalid email/password'
        : 'Some Error Occured';
    toast.show({
      title: message,
      status: 'warning',
      description: 'Please try again',
      duration: 2000,
      style: {borderRadius: 20, width: wp('70%'), marginBottom: 20},
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#00415e" barStyle="light-content" />

      <ImageBackground
        source={require('../../assets/img/backheart.png')}
        resizeMode="stretch"
        style={styles.image}>
        <Pressable
          onPress={() => {
            console.log('Pressed'), dispatch(screenName('Home'));
          }}>
          <Text style={styles.skip}>Skip</Text>
        </Pressable>

        <View style={styles.body}>
          <View style={styles.header}>
            <Text style={styles.headerText}>Sign In</Text>
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
              value={data.email.replace(/\s/g, '')}
              returnKeyType="done"
              onChangeText={e => setData({...data, email: e})}
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
              secureTextEntry={passwordSecured}
              autoCapitalize="none"
              returnKeyType="go"
              value={data.password}
              onSubmitEditing={loginForm}
              onChangeText={e => setData({...data, password: e})}
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
          {buttonClick == true ? loading() : null}
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
