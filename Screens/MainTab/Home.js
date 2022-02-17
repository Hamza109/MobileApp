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

import {
  HStack,
  Stack,
  Center,
  Spinner,
  Heading,
  NativeBaseProvider,
  Container,
} from 'native-base';
import CenterWell from '../Disease/CenterWell';
import {backendHost} from '../../components/apiConfig';
import ArticlePreview from './ArticlePreview';
import {Paragraph} from 'react-native-paper';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useNavigation} from '@react-navigation/native';
import DocPreview from './DocPreview';
import {Item} from 'react-native-paper/lib/typescript/components/List/List';
const HomeScreen = ({navigation, route}) => {
  const userId = route.userId;

  const theme = useTheme();
  const {colors} = useTheme();
  const [regId, setRegId] = useState([]);
  const [regType, setRegType] = useState();
  const [backPressed, setBack] = useState(1);
  const [visible, setVisible] = useState(false);
  const [isloaded,setIsLoaded]=useState(false)

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const containerStyle = {backgroundColor: 'white', padding: 20, height: 400};
  const canGoBack = () => {
    navigation.goBack();
  };
  const backAction = () => {
    if (navigation.isFocused()) {
      Alert.alert('Hold on!', 'Are you sure you want to Exit?', [
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
  const [isSignedIn, setIsSignedIn] = useState();

  const getId = () => {
    try {
      AsyncStorage.getItem('author').then(value1 => {
        if (value1 != null) {
          setRegId(value1);
        }
      });
    } catch (error) {
      console.log('114', error);
    }
  };

  const getType = () => {
    try {
      AsyncStorage.getItem('rateType').then(value2 => {
        if (value2 != null) {
          setRegType(value2);
        }
      });
    } catch (error) {
      console.log('128', error);
    }
  };
  const isFocuss = useIsFocused();
  useEffect(() => {
    if (isFocuss) {
      getId();
      getType();

      BackHandler.addEventListener('hardwareBackPress', backAction);
      return () =>
        BackHandler.removeEventListener('hardwareBackPress', backAction);
    }
  }, []);
  const [value, setValue] = useState('');
  const [items, setItems] = useState([]);


  const DATA1 = [
    {name: 'Ayurveda', source: require('../../assets/img/ayurvedic.jpg')},

    {name: 'Unani', source: require('../../assets/img/unani.jpg')},
    {name: 'Chinese', source: require('../../assets/img/chinese.jpg')},
    {name: 'Persian', source: require('../../assets/img/medicine.jpg')},
    {name: 'Scandavian', source: require('../../assets/img/herbal.jpg')},
    {name: 'Japanese', source: require('../../assets/img/homeopathy.jpg')},
  ];
  const [cont, setCont] = useState([]);
  function IsJsonValid(str) {
    try {
      JSON.parse(str);
    } catch (e) {
      return [];
    }
    return JSON.parse(str).blocks;
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

            borderRadius: 200,
            alignItems: 'center',
          }}
          key={index}>
          <ImageBackground
            style={{
              width: wp('30%'),
              height: hp('15%'),
              borderRadius: 200,
              overflow: 'hidden',
            }}
            source={source}
          />
        </Card>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Result', {texts: `${name}`});
          }}>
          <Text
            style={{
              color: '#00415e',
              marginTop: 5,
              fontFamily: 'Raleway-Medium',
              fontSize: 13,
              position: 'relative',
              bottom: 0,
              textAlign: 'center',
            }}>
            {name}
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={{flex: 1}}>
      <Stack space={3} alignItems="center">
        <HStack mt="6" mb="2" ml="1" space={1} alignItems="center">
          <View style={{position: 'relative', top: 2, right: 0}}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('Profile');
              }}>
              <Icon name="user-circle" color={'#00415e'} size={45} />
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => {
              navigation.navigate('searchArt');
            }}>
            <View style={styles.card}>
              <HStack ml="2" space={110} alignItems="center">
                <Text
                  style={{
                    fontSize: 18,
                    color: '#00415e',
                    fontFamily: 'Raleway-Regular',
                  }}>
                  Search cures
                </Text>
                <Icon name="search" size={20} style={styles.icon}></Icon>
              </HStack>
            </View>
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
      <ScrollView
        style={{width: wp('100%')}}
        showsVerticalScrollIndicator={false}>
        <Stack mt="5" ml="2" space={2}>
          <Text
            style={{
              fontSize: 20,
              color: '#00415e',
              fontFamily: 'Raleway-Regular',
            }}>
            Choose by Category
          </Text>

          <View
            style={{
              alignItems: 'center',
              marginLeft: 0,
              width: wp('100%'),
              flex: 1,
            }}>
            <ScrollView
              style={{width: wp('100%')}}
              horizontal
              showsHorizontalScrollIndicator={false}>
              <Card
                style={{
                  width: wp('30%'),
                  height: hp('20%'),
                  backgroundColor: 'pink',
                  borderRadius: 20,
                  marginRight: 10,
                }}>
                <Image
                  style={{
                    alignContent: 'center',
                    width: wp('28%'),
                    height: hp('15%'),
                    position: 'absolute',
                    bottom: 0,
                    left: 4,
                  }}
                  source={require('../../assets/img/arthritis.png')}
                />
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate('Result', {texts: 'Arthritis'});
                  }}>
                  <Text
                    style={{
                      color: '#fff',
                      fontWeight: 'bold',
                      position: 'absolute',
                      top: 6,
                      left: 6,
                      fontFamily: 'Raleway',
                    }}>
                    Arthritis
                  </Text>
                </TouchableOpacity>
              </Card>
              <Card
                style={{
                  width: wp('30%'),
                  height: hp('20%'),
                  backgroundColor: 'lightblue',
                  borderRadius: 20,
                  marginRight: 10,
                  overflow: 'hidden',
                }}>
                <Image
                  style={{
                    alignContent: 'center',
                    width: wp('27%'),
                    height: hp('10%'),
                    position: 'absolute',
                    bottom: 0,
                    left: 5,
                  }}
                  source={require('../../assets/img/thyroid.png')}
                />
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate('Result', {texts: 'Thyroid'});
                  }}>
                  <Text
                    style={{
                      color: '#fff',
                      fontWeight: 'bold',
                      position: 'absolute',
                      top: 6,
                      left: 6,
                      fontFamily: 'Raleway',
                    }}>
                    Thyroid
                  </Text>
                </TouchableOpacity>
              </Card>
              <Card
                style={{
                  width: wp('30%'),
                  height: hp('20%'),
                  backgroundColor: 'orange',
                  borderRadius: 20,
                  marginRight: 10,
                  overflow: 'hidden',
                }}>
                <Image
                  style={{
                    alignContent: 'center',
                    width: wp('27%'),
                    height: hp('10%'),

                    position: 'absolute',
                    bottom: 0,
                    left: 7,
                  }}
                  source={require('../../assets/img/slider-2.png')}
                />
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate('Result', {texts: 'Diabetes'});
                  }}>
                  <Text
                    style={{
                      color: '#fff',
                      fontWeight: 'bold',
                      position: 'absolute',
                      top: 6,
                      left: 6,
                      fontFamily: 'Raleway',
                    }}>
                    Diabetes
                  </Text>
                </TouchableOpacity>
              </Card>
              <Card
                style={{
                  width: wp('30%'),
                  height: hp('20%'),
                  backgroundColor: 'purple',
                  borderRadius: 20,
                  marginRight: 10,
                }}>
                <Image
                  style={{
                    alignContent: 'center',
                    width: wp('24%'),
                    height: hp('15%'),
                    position: 'absolute',
                    bottom: 0,
                    left: 11,
                  }}
                  source={require('../../assets/img/insomnia.png')}
                />
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate('Result', {texts: 'Insomnia'});
                  }}>
                  <Text
                    style={{
                      color: '#fff',
                      fontWeight: 'bold',
                      position: 'absolute',
                      top: 6,
                      left: 6,
                      fontFamily: 'Raleway',
                    }}>
                    Insomnia
                  </Text>
                </TouchableOpacity>
              </Card>
              <Card
                style={{
                  width: wp('30%'),
                  height: hp('20%'),
                  backgroundColor: 'pink',
                  borderRadius: 20,
                  marginRight: 10,
                  overflow: 'hidden',
                }}>
                <Image
                  style={{
                    alignContent: 'center',
                    width: wp('28%'),
                    height: hp('15%'),
                    position: 'absolute',
                    bottom: 0,
                    left: 5,
                  }}
                  source={require('../../assets/img/slider-5.png')}
                />
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate('Result', {texts: 'Skin Care'});
                  }}>
                  <Text
                    style={{
                      color: '#fff',
                      fontWeight: 'bold',
                      position: 'absolute',
                      top: 6,
                      left: 6,
                      fontFamily: 'Raleway',
                    }}>
                    Skin Care
                  </Text>
                </TouchableOpacity>
              </Card>
              <Card
                style={{
                  width: wp('30%'),
                  height: hp('20%'),
                  backgroundColor: 'lightblue',
                  borderRadius: 20,
                  marginRight: 15,
                }}>
                <Image
                  style={{
                    alignContent: 'center',
                    width: wp('24%'),
                    height: hp('15%'),
                    position: 'absolute',
                    bottom: 0,
                    left: 11,
                  }}
                  source={require('../../assets/img/bloodpressure.png')}
                />
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate('Result', {texts: 'Blood Pressure'});
                  }}>
                  <Text
                    style={{
                      color: '#fff',
                      fontWeight: 'bold',
                      position: 'absolute',
                      top: 6,
                      left: 6,
                      fontFamily: 'Raleway',
                    }}>
                    Hyper Tension
                  </Text>
                </TouchableOpacity>
              </Card>
            </ScrollView>
            {/* <FlatList
           
              horizontal
              showsHorizontalScrollIndicator={false}
              data={DATA}
              renderItem={renderItem}
            /> */}
          </View>
          <Text
            style={{
              fontSize: 20,
              color: '#00415e',
              fontFamily: 'Raleway-Regular',
            }}>
            Trending Cures
          </Text>
          <View
            style={{alignItems: 'center', marginLeft: 0, width: wp('100%')}}>
            <FlatList
              horizontal
              showsHorizontalScrollIndicator={false}
              data={DATA1}
              renderItem={renderItemTrend}
            />
          </View>
          <Text
            style={{
              fontSize: 20,
              color: '#00415e',
              fontFamily: 'Raleway-Regular',
            }}>
            Recent Cures
          </Text>
          <ArticlePreview />
          <Text
            style={{
              fontSize: 20,
              color: '#00415e',
              fontFamily: 'Raleway-Regular',
            }}>
            Top Doctors
          </Text>
          <DocPreview />
        </Stack>
      </ScrollView>
    </View>
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
    backgroundColor: 'rgba(0, 65, 94, 0.2)',
    width: wp('72%'),
    height: 50,
    fontSize: 20,

    borderRadius: 15,
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

    color: '#00415e',
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
