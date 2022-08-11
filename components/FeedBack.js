import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Platform,
  StyleSheet,
  ScrollView,
  StatusBar,
  Alert,
} from 'react-native';
import axios from 'axios';
import {Button} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import Feather from 'react-native-vector-icons/Feather';
import {useIsFocused} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LottieView from 'lottie-react-native';
import {backendHost} from './apiConfig';

import {VStack, Stack, Container, HStack, Checkbox} from 'native-base';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {Spinner, useToast} from 'native-base';
const FeedBack = () => {
  const navigation = useNavigation();
  const toast = useToast();

  const [data, setData] = useState([]);

  const [title, setTitle] = useState('');
  const [article, setArticle] = useState('');
  const [lastName, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [num, setNum] = useState('');

  const [regId, setRegId] = useState([]);
  const [regType, setRegType] = useState();
  const getId = () => {
    try {
      AsyncStorage.getItem('author').then(value1 => {
        if (value1 != null) {
          setRegId(value1);
        }
      });
    } catch (error) {}
  };
  const getType = () => {
    try {
      AsyncStorage.getItem('rateType').then(value2 => {
        if (value2 != null) {
          setRegType(value2);
        }
      });
    } catch (error) {
      error;
    }
  };
  const isFocus = useIsFocused();

  useEffect(() => {
    if (isFocus) {
      getType();
    }

    getId();
  }, [regId]);

  const [loading, setLoading] = useState(false);
  const submitFeedbackForm = e => {
    if (article != '') {
      setLoading(true);
      axios.defaults.withCredentials = true;
      axios
        .post(`${backendHost}/admin/create/feedback  `, {
          firstname: title,
          lastname: lastName,
          email: email,
          phonenumber: num,
          feedback: article,
        })
        .then(res => {
          if (res.data === 1) {
            setLoading(false);
            toast.show({
              title: 'Feedback submitted successfully!',
              description: 'Thankyou for your feedback.',
              status: 'success',
              placement: 'bottom',
              style: {borderRadius: 20, width: wp('80%'), marginBottom: 20},
            });
          } else {
            setLoading(false);
            toast.show({
              title: 'Some error occured',
              description: 'Try again',
              status: 'warning',
              placement: 'bottom',
              style: {borderRadius: 20, width: wp('80%'), marginBottom: 20},
            });
          }
        })
        .catch(err => {
          err;
          throw err;
        });
    } else {
      setLoading(false);
      Alert.alert('Enter feedback');
    }
  };

  const titleValue = () => {
    return (
      <View style={styles.action}>
        <TextInput
          placeholder="Enter first name"
          placeholderTextColor="#00415e"
          style={[styles.textInputTitle, {color: '#00415e', padding: 10}]}
          autoCapitalize="none"
          value={title}
          returnKeyType="done"
          onChangeText={e => setTitle(e)}
        />

        {data.check_textInputChange ? (
          <View animation="bounceIn">
            <Feather name="check-circle" color="green" size={20} />
          </View>
        ) : null}
      </View>
    );
  };
  const remarks = () => {
    return (
      <View style={styles.action}>
        <TextInput
          placeholder="Enter email"
          placeholderTextColor="#00415e"
          secureTextEntry={data.secureTextEntry ? true : false}
          style={[
            styles.textInput,
            {
              color: '#00415e',
              padding: 10,
            },
          ]}
          autoCapitalize="none"
          returnKeyType="go"
          value={email}
          onChangeText={e => setEmail(e)}
        />
      </View>
    );
  };

  const articles = () => {
    return (
      <View style={styles.article}>
        <TextInput
          placeholder="Enter your feedback"
          placeholderTextColor="#00415e"
          secureTextEntry={data.secureTextEntry ? true : false}
          style={[
            styles.textInputArticle,
            {
              color: '#00415e',
              height: 120,
              fontSize: 15,
            },
          ]}
          autoCapitalize="none"
          returnKeyType="go"
          value={article}
          onChangeText={e => setArticle(e)}
          multiline={true}
        />
      </View>
    );
  };

  return (
    <View style={{flex: 1, backgroundColor: '#fff', padding: 15}}>
      <ScrollView style={{flex:1}}>
        {loading ? (
          <View style={styles.loading}>
            <LottieView
              source={require('../assets/animation/load.json')}
              autoPlay
              loop
              style={{width: 50, height: 50}}
            />
          </View>
        ) : null}
        <Stack space={4}>
          <VStack space={2}>
            <Text
              style={{
                position: 'relative',
                left: 15,
                fontSize: 16,
                fontFamily: 'Raleway-Regular',
                color: '#00415e',
              }}>
              Enter first name (optional)
            </Text>
            {titleValue()}
          </VStack>
          <VStack space={2}>
            <Text
              style={{
                position: 'relative',
                left: 15,
                fontSize: 16,
                fontFamily: 'Raleway-Regular',
                color: '#00415e',
              }}>
              Enter last name (optional)
            </Text>
            <View style={styles.action}>
              <TextInput
                placeholder="Enter last name"
                placeholderTextColor="#00415e"
                style={[
                  styles.textInputTitle,
                  {
                    color: '#00415e',
                    padding: 10,
                  },
                ]}
                autoCapitalize="none"
                value={lastName}
                returnKeyType="done"
                onChangeText={e => setLastname(e)}
              />
            </View>
          </VStack>
          <VStack space={2}>
            <Text
              style={{
                position: 'relative',
                left: 15,
                fontSize: 16,
                fontFamily: 'Raleway-Regular',
                color: '#00415e',
              }}>
              Enter email (optional)
            </Text>
            {remarks()}
          </VStack>
          <VStack space={2}>
            <Text
              style={{
                position: 'relative',
                left: 15,
                fontSize: 16,
                fontFamily: 'Raleway-Regular',
                color: '#00415e',
              }}>
              Enter phone number (optional)
            </Text>
            <View style={styles.action}>
              <TextInput
                placeholder="Enter phone number"
                placeholderTextColor="#00415e"
                style={[
                  styles.textInputTitle,
                  {
                    color: '#00415e',
                    padding: 10,
                  },
                ]}
                autoCapitalize="none"
                value={num}
                returnKeyType="done"
                keyboardType="numeric"
                onChangeText={e => setNum(e)}
              />
            </View>
          </VStack>
          <VStack space={0}>
            <Text
              style={{
                position: 'relative',
                left: 15,
                fontSize: 16,
                fontFamily: 'Raleway-Regular',
                color: '#00415e',
              }}>
              Enter your feedback
            </Text>
            {articles()}
          </VStack>

          <View style={{alignItems: 'center'}}>
            <Button
              mode="contained"
              labelStyle={{
                color: '#00415e',

                width: wp('50%'),
              }}
              style={styles.btn}
              onPress={e => submitFeedbackForm(e)}>
              Submit
            </Button>
          </View>
        </Stack>
      </ScrollView>
    </View>
  );
};

export default FeedBack;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 40,
    margin: 0,
    backgroundColor: '#8cd4eb',

    alignItems: 'center',
  },
  body: {
    borderWidth: 1,
    backgroundColor: '#fff',
    Color: 'lightgrey',
    borderColor: 'lightgrey',
    marginTop: Platform.OS === 'ios' ? 0 : -35,
    width: 380,
  },
  textBody: {
    padding: 5,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  box: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: 'lightgrey',
  },
  card: {
    borderWidth: 1,
    Color: 'lightgrey',
    borderColor: 'lightgrey',
    position: 'relative',
    left: 10,
    width: 358,
  },
  textCard: {
    padding: 10,
    fontSize: 18,
    fontWeight: 'bold',
  },
  header: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
    paddingBottom: 50,
  },

  text_footer: {
    fontWeight: 'bold',
    color: '#05375a',
    fontSize: 18,
    padding: 0,
  },
  action: {
    flexDirection: 'row',
    margin: 7,

    paddingBottom: 5,
  },
  article: {
    flexDirection: 'row',
    margin: 7,
    padding: 0,
  },
  actionError: {
    flexDirection: 'row',
    marginTop: 0,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#FF0000',
    paddingBottom: 5,
  },
  textInput: {
    borderRadius: 15,
    flex: 1,

    marginTop: Platform.OS === 'ios' ? 0 : -10,
    fontFamily: 'Raleway-Regular',
    borderWidth: 1,
    borderColor: 'lightgrey',
    color: 'grey',
    fontSize: 16,
    marginBottom: 10,
    marginVertical: 0,

    backgroundColor: 'rgba(0, 65, 94, 0.2)',
  },
  textInputTitle: {
    borderRadius: 15,
    flex: 1,

    marginTop: Platform.OS === 'ios' ? 0 : -10,
    fontFamily: 'Raleway-Regular',
    borderWidth: 1,
    borderColor: 'lightgrey',
    color: 'grey',
    backgroundColor: 'rgba(0, 65, 94, 0.2)',
    fontSize: 16,
    marginBottom: -10,
    marginVertical: 0,
  },
  textInputArticle: {
    flex: 1,
    borderRadius: 15,
    color: 'grey',
    fontSize: 20,
    textAlignVertical: 'top',
    paddingHorizontal: 10,
    fontFamily: 'Raleway-Regular',
    backgroundColor: 'rgba(0, 65, 94, 0.2)',
  },
  errorMsg: {
    color: '#FF0000',
    fontSize: 14,
  },
  button: {
    alignItems: 'center',
    marginTop: 50,
  },

  text: {
    color: 'grey',
    fontWeight: 'bold',
    fontSize: 18,
    position: 'relative',
    left: 15,
    marginBottom: 8,
  },
  textBtn: {
    color: '#00415e',
    textAlign: 'center',
    fontSize: 20,
  },

  btn: {
    borderWidth: 1,
    borderRadius: 20,
    borderColor: 'rgba(0, 65, 94, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    width: wp('50%'),
    height: 40,
    backgroundColor: 'rgba(0, 65, 90, 0.2)',
    color: 'white',

    marginTop: 5,
    marginBottom: 5,
  },
  loading: {
    justifyContent: 'center',
    backgroundColor: '#F5FCFF88',
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    zIndex: 999,
    alignItems: 'center',
  },
});
