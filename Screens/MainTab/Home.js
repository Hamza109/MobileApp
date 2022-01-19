import React, {useState, useEffect} from 'react';
import {Dimensions, ImageBackground} from 'react-native';
import {
  View,
  ScrollView,
  Text,
  Button,
  FlatList,
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
import Carousel, {ParallaxImage} from 'react-native-snap-carousel';
import Icon from 'react-native-vector-icons/FontAwesome';
import PhoneInput from 'react-native-phone-number-input';
import {
  HStack,
  Stack,
  Center,
  Heading,
  NativeBaseProvider,
  Container,
} from 'native-base';
import {backendHost} from '../../components/apiConfig';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {Item} from 'react-native-paper/lib/typescript/components/List/List';
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
    console.log(phoneNumber);
    console.log(phoneNumber.length);
    var countryCodeLength = phoneNumber.length % 10;
    var countryCode = phoneNumber.slice(0, countryCodeLength);
    var StringValue = phoneNumber.slice(countryCodeLength).replace(/,/g, '');
    if (phoneNumber) {
      axios
        .post(`${backendHost}/users/subscribe/${StringValue}`, {
          nl_subscription_disease_id: '0',
          nl_sub_type: 1,
          nl_subscription_cures_id: '0',
          country_code: `'${countryCode}'`,
        })
        .then(res => {
          if (res.data === 1) {
            Alert.alert('You have successfully subscribed to our Newsletter');
          } else {
            Alert.alert('Some error occured! Please try again later.');
          }
        })
        .catch(err => {
          Alert.alert('Some error occured! Please try again later.');
        });
    } else {
      Alert.alert('Please enter a valid number!');
    }
  };

  const getId = () => {
    try {
      AsyncStorage.getItem('author').then(value1 => {
        console.log('home:', value1);
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
  const isFocuss = useIsFocused();
  useEffect(() => {
    if (isFocuss) {
      console.log('hom:', regId);
      getId();
      getType();

      BackHandler.addEventListener('hardwareBackPress', backAction);
      return () =>
        BackHandler.removeEventListener('hardwareBackPress', backAction);
    }
  }, []);
  const [value, setValue] = useState('');
  const [formattedValue, setFormattedValue] = useState('');
  const DATA = [
    {
      name: 'Arthritis',
      source: require('../../assets/img/arthritis.png'),
      color: 'pink',
    },
    {
      name: 'Thyroid',
      source: require('../../assets/img/thyroid.png'),
      color: 'lightblue',
    },
    {
      name: 'Diabetes',
      source: require('../../assets/img/slider-2.png'),
      color: 'orange',
    },
    {
      name: 'Insomnia',
      source: require('../../assets/img/insomnia.png'),
      color: 'purple',
    },
    {
      name: 'Skin Care',
      source: require('../../assets/img/slider-5.png'),
      color: 'pink',
    },
    {
      name: 'Hyper Tension',
      source: require('../../assets/img/bloodpressure.png'),
      color: 'lightblue',
    },
  ];
  const DATA1 = [
    {name: 'Scandavian',source:require('../../assets/img/herbal.jpg')},
    {name: 'Persian',source:require('../../assets/img/medicine.jpg')},
    {name: 'Japanese',source:require('../../assets/img/homeopathy.jpg')},
    {name: 'Chinese',source:require('../../assets/img/chinese.jpg')},
    {name: 'Unani',source:require('../../assets/img/unani.jpg')},
    {name: 'Ayurveda' ,source:require('../../assets/img/ayurvedic.jpg')},
  
  

  
 
  ];
  const carouselRef = React.useRef(null);
  function renderItem({item, index}) {
    const {name, source, color} = item;
    return (
      <View style={{marginRight: 13}}>
        <Card
          style={{
            width: wp('30%'),
            height: hp('20%'),
            backgroundColor: color,
            borderRadius: 20,
          }}
          key={index}>
          <Image
            style={{
              alignContent:'center',
              width: wp('24%'),
              height: hp('15%'),
              position: 'relative',
              top: 42,
              left: 11,
            }}
            source={source}
          />
          <Text
            style={{
              color: '#fff',
              fontWeight: '500',
              position: 'relative',
              bottom: 120,
              left: 9,
            }}>
            {name}
          </Text>
        </Card>
      </View>
    );
  }
  function renderItemTrend({item, index}) {
    const {name, source, color} = item;
    return (
      <View style={{marginRight: 13}}>
        <Card
          style={{
            width: wp('30%'),
            height: hp('15%'),
            backgroundColor: '#00415e',
           
            borderRadius:200
            ,         
                    
            alignItems: 'center',
          }}
          key={index}>
          <ImageBackground
            style={{
              width: wp('30%'),
              height: hp('15%'),
              borderRadius:200,
             overflow:'hidden'
            }}
            source={source}
          />
       
        </Card>
        <Text
            style={{
              color: '#00415e',
              marginTop:5,
              fontWeight: '500',
              fontSize: 13,
              position: 'relative',
              bottom: 0,
              textAlign: 'center',
            }}>
            {name}
          </Text>
      </View>
    );
  }

  return (
    <Container>
      <Stack space={3} alignItems="center">
        <HStack mt="10" ml="1" space={1} alignItems="center">
          <View style={{position: 'relative', top: 2, right: 0}}>
            <Icon name="user-circle" color={'#00415e'} size={45} />
          </View>

          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => {
              navigation.navigate('searchArt');
            }}>
            <Card style={styles.card}>
              <HStack ml="2" space={130} alignItems="center">
                <Text style={{fontSize: 18, color: '#E5E5E5'}}>
                  search cures
                </Text>
                <Icon name="search" size={20} style={styles.icon}></Icon>
              </HStack>
            </Card>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate('CreateScreenHome')}>
            <Card
              style={{
                backgroundColor: '#00415e',
                alignItems: 'center',
                borderRadius: 55,
                padding: 8,
                width: wp('11.8%'),
                height: hp('5.6%'),
                position: 'relative',
                top: 2,
              }}>
              <Icon name="pencil" color={'#fff'} size={27} />
            </Card>
          </TouchableOpacity>
        </HStack>
      </Stack>

      <Stack mt="5" ml="2" space={5}>
        <Text style={{fontSize: 20, color: '#00415e'}}>Choose by Category</Text>

        <View style={{alignItems: 'center', marginLeft: 0, width: wp('100%')}}>
          <FlatList
            inverted
            horizontal
            showsHorizontalScrollIndicator={false}
            data={DATA}
            renderItem={renderItem}
          />
        </View>
        <Text style={{fontSize: 20, color: '#00415e'}}>Trending Cures</Text>
        <View style={{alignItems: 'center', marginLeft: 0, width: wp('100%')}}>
          <FlatList
            inverted
            horizontal
            showsHorizontalScrollIndicator={false}
            data={DATA1}
            renderItem={renderItemTrend}
          />
        </View>
        <Text style={{fontSize: 20, color: '#00415e'}}>Recent Cures</Text>
      </Stack>
      <View style={{flex: 1}}>
        <View style={styles.header}>
          <View style={{flex: 1, justifyContent: 'space-evenly'}}>
            <View style={{flexDirection: 'row'}}>
              {/* <Portal>
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
              </TouchableOpacity> */}
            </View>
          </View>
        </View>
      </View>
      {/* 
      <TouchableOpacity
        style={styles.b2}
        onPress={() => navigation.push('SearchBar')}>
        <Text style={styles.text}>Looking for doctors ?</Text>
      </TouchableOpacity> */}
    </Container>
  );
};

export default HomeScreen;
const width = Dimensions.get('screen').width;
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    flexDirection: 'row',
    backgroundColor: 'grey',
    width: wp('72%'),
    height: 50,
    fontSize: 20,
    fontWeight: 'bold',
    borderRadius: 15,
    position: 'relative',

    borderWidth: 1,
    shadowRadius: 35,
    shadowOffset: 50,
    elevation: 10,
    shadowColor: 'grey',
    padding: 10,
  },
  inCard: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  header: {
    padding: 18,
    marginTop: Platform.OS === 'android' ? -7 : 0,
    borderColor: '#fff',

    alignItems: 'center',
    width: wp('100%'),
    height: 150,
  },
  icon: {
    padding: 3,

    color: '#E5E5E5',
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
