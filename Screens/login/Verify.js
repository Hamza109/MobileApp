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
  ToastAndroid
} from 'react-native';
import axios from 'axios';

import LottieView from 'lottie-react-native'
import { backendHost } from '../../components/apiConfig';
import {useTheme} from 'react-native-paper';
import { HStack, Input, Spinner,useToast } from 'native-base';
import { useDispatch } from 'react-redux';
import { screenName } from '../Redux/Action';
const Verify = ({navigation}) => {
  const [email, setEmail] = useState('');
  const dispatch=useDispatch();

  const [buttonClick, setClicked] = useState('');
  const [data, setData] = useState([]);

  const [submitAlert, setAlert] = useState(false);
  const [notAlert, noAlert] = useState(false);
  const [errAlert, erAlert] = useState(false);
  const [validEmail, setValidEmail] = useState(false);
  const [alert, setSubmitAlert] = useState(false);
const toast=useToast()
const [loading,setLoading]=useState(false)


  const resetPass = () => {
    navigation.navigate('ResetPass');
  };

  const updateSecureTextEntry = () => {
    setData({
      ...data,
      secureTextEntry: !data.secureTextEntry,
    });
  };
  
  const validate = text => {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    if (reg.test(text) === false) {
      setEmail(text);
      setValidEmail(true);
      return false;
    } else {
      setEmail(text);
     
    }
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
  }

  const submitForm = async e => {
  setLoading(true)

  if(email != '')
  {
    if (email) {
      axios.post(`${backendHost}/users/checkemail`, {
          email: email,
        })
        .then(res => {
          if (res.data === 1) {
            setLoading(false)
        Alert.alert('Mail Sent','Please check your email!')
           
          } else {
            setLoading(false)
            Alert.alert('Not a valid email!','please enter valid email!')
          }
        })
        .catch(err => {err});
    }
  }
  else {
    setLoading(false)
    Alert.alert('Please enter your email!')
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
          style={{ zIndex: 1 }}
          backgroundColor="#fff"
          onPress={() => dispatch(screenName('MAIN'))}>
          <Text
            style={styles.skip}>
            Skip
          </Text>
        </TouchableOpacity>

        <View style={styles.body}>

        <View style={styles.header}>
            <Text style={styles.headerText}>Verify Your Email</Text>
          </View>

          <View style={{marginBottom:15}}>
          <Input 
            placeholder='enter email' 
                        height={12}
            color={'#fff'}
            _focus={{ borderWidth: 2, borderColor: '#fff', color: '#fff', placeholderTextColor: '#fff' }} 
            autoCapitalize="none"
             value={email}
            returnKeyType="done"
            onChangeText={e => validate(e)}
            />
          </View>

          <View style={styles.button}>
          {buttonClick === 1 ? submitForm() : null}
          <TouchableOpacity style={styles.signIn} onPress={submitForm}>
         

            {notAlert ? Alert.alert('Email not found!') : null}
            {errAlert ? Alert.alert('error in resetting') : null}
<HStack space={2}>
            <Text
              style={[
                styles.textSign,
                {
                  color: '#00415e',
                },
              ]}>
              Submit
            </Text>
            
          </HStack>
          </TouchableOpacity>
        </View>

        {loading?spinner():null}

          </View>
        {/* <View style={styles.header}>
          <Text style={styles.text_header}>Verify your email</Text>
        </View>

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
            value={email}
            onChangeText={e => setEmail(e)}
          />
          {data.check_textInputChange ? (
            <Animatable.View animation="bounceIn">
              <Feather name="check-circle" color="green" size={20} />
            </Animatable.View>
          ) : null}
        </View>

        <View style={styles.button}>
          {buttonClick === 1 ? submitForm() : null}
          <TouchableOpacity style={styles.signIn} onPress={submitForm}>
         

            {notAlert ? Alert.alert('Email not found!') : null}
            {errAlert ? Alert.alert('error in resetting') : null}
<HStack space={2}>
            <Text
              style={[
                styles.textSign,
                {
                  color: '#00415e',
                },
              ]}>
              Submit
            </Text>
            {loading ? (
      <View>
     
     <Spinner
            accessibilityLabel="Loading posts"
            color="#00415e"
            size="lg"
          />
     
      
      </View>
          ) : null}
          </HStack>
          </TouchableOpacity>
        </View> */}
      </ImageBackground>
    </View>
  );
};

export default Verify;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#00415e',
  },
  body: {
    justifyContent: 'center',
    width: '100%',
    height: '90%',
    marginTop:40
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
    color: '#fff',
    fontWeight: 'bold',
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
  },
  errorMsg: {
    color: '#FF0000',
    fontSize: 14,
  },
  button: {
    alignItems: 'center',
    marginTop: 50,
  },
  signUp: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  signIn: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: '#fff',
  },
  textSign: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  image: {
    flex: 1,
    justifyContent: 'center',
    padding: 15,
  },
});
