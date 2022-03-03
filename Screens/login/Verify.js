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
import axios from 'axios';

import * as Animatable from 'react-native-animatable';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';

import {useTheme} from 'react-native-paper';

const Verify = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPass] = useState('');
  const [message, setMessage] = useState('');
  const [isError, setError] = useState(false);
  const [status, setStatus] = useState('');
  const [buttonClick, setClicked] = useState('');
  const [data, setData] = useState([]);

  const [submitAlert, setAlert] = useState(false);
  const [notAlert, noAlert] = useState(false);
  const [errAlert, erAlert] = useState(false);

  const [alert, setSubmitAlert] = useState(false);

  const {colors} = useTheme();

  const resetPass = () => {
    navigation.navigate('ResetPass');
  };

  const updateSecureTextEntry = () => {
    setData({
      ...data,
      secureTextEntry: !data.secureTextEntry,
    });
  };

  const submitForm = async e => {
    e.preventDefault();

    setSubmitAlert(true);
    if (email) {
      axios
        .post(`${backendHost}/users/checkemail`, {
          email: email,
        })
        .then(res => {
          if (res.data == 1) {
            return (<Text>Check Your Email!</Text>), resetPass();
          } else {
            noAlert(true);
            setTimeout(() => {
              noAlert(false);
            }, 2000);
          }
        })
        .catch(err => {});
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#00415e" barStyle="light-content" />
      <ImageBackground
        source={require('../../assets/img/backheart.png')}
        resizeMode="cover"
        style={styles.image}>
        <View style={styles.header}>
          <Text style={styles.text_header}>Verify your email</Text>
        </View>

        <View style={styles.action}>
          <TextInput
            placeholder="Enter your email"
            placeholderTextColor="#fff"
            style={[
              styles.textInput,
              {
                color: colors.text,
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
            {submitAlert ? (
              <Text variant="success" className="h6 mx-3">
                Check Your Email!
              </Text>
            ) : null}

            {notAlert ? Alert.alert('Email not found!') : null}
            {errAlert ? Alert.alert('error in resetting') : null}

            <Text
              style={[
                styles.textSign,
                {
                  color: '#00415e',
                },
              ]}>
              Submit
            </Text>
          </TouchableOpacity>
        </View>
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
  header: {
    paddingHorizontal: 20,
    paddingBottom: 50,
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
