import React, {useState, useEffect} from 'react';
import { Dimensions } from 'react-native';
import {
  View,
  ScrollView,
  Text,
  Button,
  StyleSheet,
  StatusBar,
  BackHandler,
  Alert,
  TouchableOpacity,
  TouchableHighlight,
  Image,
} from 'react-native';
import ArticleHeader from '../search/ArticleHeader';
import {useRef} from 'react';
import {useIsFocused, useTheme} from '@react-navigation/native';
import axios from 'axios';
import Autocomplete from './Autocomplete';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Card, Checkbox, Modal, Portal, Provider} from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';
import PhoneInput from 'react-native-phone-number-input';
import {
  Container,
  Heading,
  Center,
  NativeBaseProvider,
} from "native-base"
import { backendHost } from '../../components/apiConfig';
import searchArt from '../search/SearchArticle';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
const HomeScreen = ({navigation, route}) => {
  const userId = route.userId;

  const theme = useTheme();
  const {colors} = useTheme();
  const [regId, setRegId] = useState([]);
  const [regType, setRegType] = useState();
  const [backPressed, setBack] = React.useState(1);
  const [visible, setVisible] = React.useState(false);

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const containerStyle = {backgroundColor: 'white', padding: 20, height: 400};

  const backAction = () => {
    if (backPressed > 0) {
      Alert.alert('Hold on!', 'Are you sure you want to go back?', [
        {
          text: 'Cancel',
          onPress: () => null,
          style: 'cancel',
        },
        {text: 'YES', onPress: () => BackHandler.exitApp()},
      ]);
      return true;
    }
  };
  const postSubscription = val => {
    var phoneNumber = val.split('+')[1];
    console.log(phoneNumber)
    console.log(phoneNumber.length)
    var countryCodeLength = phoneNumber.length % 10
    var countryCode = phoneNumber.slice(0, countryCodeLength)
    var StringValue = phoneNumber.slice(countryCodeLength).replace(/,/g, '')
     if(phoneNumber){
    
      axios.post(`${backendHost}/users/subscribe/${StringValue}`, {
      "nl_subscription_disease_id": '0',
      "nl_sub_type":1,
      "nl_subscription_cures_id":'0',
      "country_code": `'${countryCode}'`,
      })
        .then(res => {
       
         if(res.data === 1){
            Alert.alert('You have successfully subscribed to our Newsletter')
         }
         else {
            Alert.alert('Some error occured! Please try again later.')
         }
        })
        .catch(err => {
        
        Alert.alert('Some error occured! Please try again later.')
         
   
      })
     } else {
        Alert.alert('Please enter a valid number!')
     }
  };

  const getId =  () => {
    try {
      AsyncStorage.getItem('author').then(value1 => {
        console.log('home:',value1);
        if (value1 != null) {
          setRegId(value1);
        }
        
      });
    } catch (error) {
      console.log(error);
    }
  };
  const getType = () => {
    try {
      AsyncStorage.getItem('rateType').then(value2 => {
        console.log(value2);
        if (value2 != null) {
          setRegType(value2);
        }
      });
    } catch (error) {
      console.log(error);
    }
  };
const isFocuss=useIsFocused();
  useEffect(() => {
    if(isFocuss){
      console.log('hom:',regId)
    getId();
    getType();
    

    BackHandler.addEventListener('hardwareBackPress', backAction);
    return () =>
      BackHandler.removeEventListener('hardwareBackPress', backAction);
   }

  }, []);
  const [value, setValue] = useState('');
  const [formattedValue, setFormattedValue] = useState('');

  return (
    <View style={styles.container}>
      <View style={{flex: 1}}>
        <Card style={styles.header}>
          <View style={{flex: 1, justifyContent: 'space-evenly'}}>
            <View style={{flexDirection: 'row'}}>
              <Image
                source={require('../../assets/img/heart.png')}
                style={styles.image}></Image>
              <Text
                style={{
                  marginRight: 140,
                  marginTop: 20,
                  fontWeight: 'bold',
                  fontSize: 15,
                  color: '#00415e',
                }}>
                All Cures
              </Text>
              <TouchableOpacity
                style={{marginRight: 0, marginTop: 10}}
                onPress={() => navigation.navigate('CreateScreenHome')}>
                <Icon name="create" color={'#00415e'} size={37} />
              </TouchableOpacity>
              <Portal>
                <Modal
                  visible={visible}
                  onDismiss={hideModal}
                  contentContainerStyle={containerStyle}>
                  <View style={{flex: 1}}>
                    <View style={{flexDirection: 'row'}}>
                      <Image
                        source={require('../../assets/img/heart.png')}
                        style={styles.imageModal}></Image>
                      <Text
                        style={{
                          marginTop: 20,
                          marginRight: 15,
                          fontSize: 30,
                          color: '#00415e',
                        }}>
                        All Cures
                      </Text>
                    </View>
                    <Text style={{marginTop: 20, fontSize: 20}}>
                      Sign up for our free
                      <Text style={{color: '#1e7ca8'}}> All Cures</Text> Daily
                      Newsletter
                    </Text>
                    <Text style={{marginTop: 20, fontSize: 20}}>
                      Get{' '}
                      <Text style={{color: '#1e7ca8'}}>doctor-approved</Text>{' '}
                      health tips, news, and more
                    </Text>
                    <PhoneInput
                      defaultValue={value}
                      defaultCode="IN"
                      layout="first"
                      onChangeText={text => {
                        setValue(text);
                      }}
                      onChangeFormattedText={text => {
                        setFormattedValue(text);
                      }}
                      withDarkTheme
                      withShadow
                      autoFocus
                    />
                    <TouchableOpacity
                      style={styles.btn}
                      onPress={()=>postSubscription(formattedValue)}>
                      <Text style={{color: 'white', fontWeight: 'bold'}}>
                        Submit
                      </Text>
                    </TouchableOpacity>
                  </View>
                </Modal>
              </Portal>
              <TouchableOpacity activeOpacity={0.5} style={styles.btn}>
                <Text
                  style={{color: '#fff', fontWeight: 'bold'}}
                  onPress={showModal}>
                  Subscribe
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <TouchableOpacity activeOpacity={0.8} onPress={()=>{navigation.navigate('searchArt')}}>
            <Card style={styles.card}>
              <View style={styles.inCard}>
                <Icon name="search-sharp" size={20} style={styles.icon}></Icon>
                <Text style={{fontSize: 18, marginRight: 130, color: 'grey'}}>
                  Search for articles
                </Text>
              </View>
            </Card>
          </TouchableOpacity>
        </Card>
      </View>

      <TouchableOpacity
        style={styles.b2}
        onPress={() => navigation.push('SearchBar')}>
        <Text style={styles.text}>Looking for doctors ?</Text>
      </TouchableOpacity>
    

    
    </View>
  );
};

export default HomeScreen;
 const width=Dimensions.get('screen').width
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
   flex:1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    flexDirection: 'row',
    backgroundColor: 'lightgrey',
    width: wp('90%'),
    marginLeft:5,
    height: 50,
    fontSize: 20,
    fontWeight: 'bold',
    borderRadius:5,
    marginTop: 0,
    borderWidth: 1,
    shadowRadius: 35,
    shadowOffset: 50,
    elevation: 10,
    shadowColor: 'grey',
  },
  inCard: {
    padding: 12,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  header: {
    padding: 18,
    marginTop: Platform.OS === 'android' ? -7 : 0,
    borderColor: '#fff',
    borderWidth: 0.1,
    alignItems: 'center',
    width:wp('100%'),
    height: 150,
    elevation: 5,
  },
  icon: {
    padding: 3,

    color: 'grey',
  },
  
  b2: {
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: '#00415e',
    backgroundColor: '#fff',
    padding: 10,
    width: wp('90%'),
    height: hp('6%'),
    position: 'relative',
    bottom: 440,
  },
  text: {
    color: '#00415e',
    fontWeight: 'bold',
    textAlign: 'center',
    alignSelf: 'center',
  },

  btn: {
    borderWidth: 2,
    borderRadius: 15,
    borderColor: '#343a40',
    justifyContent: 'center',
    alignItems: 'center',
    width: wp('20%'),
    height: hp('4.5%'),
    backgroundColor: '#343a40',
    color: 'white',
    marginRight: 10,
    marginTop: 12,
  },

  image: {
    padding: 20,
    marginTop: 5,
    height: hp('5%'),
    width: wp('5%'),
  },
  imageModal: {
    padding: 20,
    marginTop: 5,
    height: hp('7%'),
    width: wp('16%'),
  },
});
