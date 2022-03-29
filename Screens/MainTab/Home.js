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
  RefreshControl,
} from 'react-native';

import {useIsFocused, useTheme} from '@react-navigation/native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Card, Checkbox, Modal, Portal, Provider} from 'react-native-paper';
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
import Svg, {Path, Circle} from 'react-native-svg';
const HomeScreen = ({navigation, route}) => {
  const userId = route.userId;

  const theme = useTheme();
  const {colors} = useTheme();
  const [regId, setRegId] = useState([]);
  const [regType, setRegType] = useState();
  const [backPressed, setBack] = useState(1);
  const [visible, setVisible] = useState(false);
  const [isloaded, setIsLoaded] = useState(false);

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const containerStyle = {backgroundColor: 'white', padding: 20, height: 400};
  const canGoBack = () => {
    navigation.goBack();
  };
  const remove = async () => {
    try {
      await AsyncStorage.multiRemove([
     
        'mail1'
      ]);
    } catch (error) {
      console.log('113',error);
    }
  };
  const backAction = () => {
    if (navigation.isFocused()) {
      Alert.alert('Hold on!', 'Are you sure you want to Exit?', [
        {
          text: 'Cancel',
          onPress: () => null,
          style: 'cancel',
        },
        {text: 'YES', onPress: () =>{ BackHandler.exitApp(),remove()} },
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

  const getId =  () => {
    try {
      AsyncStorage.getItem('author').then(value1 => {
        if(value1 == null)
    {
       // navigation.navigate('Cures',{screen:'My Cures'})
       navigation.navigate('SignIn')
  
    }
    else{
       navigation.navigate('CreateScreenHome')
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
    } catch (error) {}
  };
  const isFocuss = useIsFocused();
  useEffect(()=>{
  

  })
  useEffect(() => {
  
    if (isFocuss) {
    
      getType();

      BackHandler.addEventListener('hardwareBackPress', backAction);
      return () =>
        BackHandler.removeEventListener('hardwareBackPress', backAction);
    }
  });


  const DATA1 = [
    {name: 'Ayurveda',type:1, source: require('../../assets/img/ayurvedic.jpg')},

    {name: 'Unani',type:2, source: require('../../assets/img/unani.jpg')},
    {name: 'Chinese',type:4, source: require('../../assets/img/chinese.jpg')},
    {name: 'Persian', type:3,source: require('../../assets/img/medicine.jpg')},
    {name: 'Scandavian',type:5, source: require('../../assets/img/herbal.jpg')},
    {name: 'Japanese', type:6, source: require('../../assets/img/homeopathy.jpg')},
  ];
  const [cont, setCont] = useState([]);
  function Create() {
    return (
      <Svg
        xmlns="http://www.w3.org/2000/svg"
        width={wp('11%')}
        height={hp('7%')}
        fill="none"
        viewBox="0 0 42 42">
        <Circle cx="20.563" cy="20.969" r="20.563" fill="#00415E"></Circle>
        <Path
          fill="#fff"
          d="M10.107 32.719a1.289 1.289 0 01-.95-.42 1.275 1.275 0 01-.34-.986l.317-3.475 14.594-14.593 4.56 4.56-14.59 14.593-3.473.316c-.04.003-.079.005-.118.005zM29.2 16.894l-4.56-4.561 2.736-2.736a1.288 1.288 0 011.824 0l2.735 2.736a1.29 1.29 0 010 1.825l-2.733 2.734-.002.002z"></Path>
      </Svg>
    );
  }
  function User() {
    return (
      <Svg
      xmlns="http://www.w3.org/2000/svg"
      width="42"
      height="42"
      fill="none"
      viewBox="0 0 42 42"
    >
      <Circle cx="20.563" cy="20.563" r="20.563" fill="#00415E"></Circle>
      <Path
        stroke="#fff"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="4"
        d="M11.813 14.438h18.374m-18.375 14h18.376-18.375zm0-7h18.376-18.375z"
      ></Path>
    </Svg>
    );
  }
  const [row, setRow] = useState();
  const wait = timeout => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  };
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = () => {
    navigation.push('MainTab');
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  };
  const getRow = () => {
    try {
      AsyncStorage.getItem('rowno').then(value2 => {

        if (value2 != null) {
          setRow(Number(value2));
        }
      });
    } catch (error) {
      console.log('128', error);
    }
  };
  const isFocus = useIsFocused();
  useEffect(() => {
    if (isFocus) {
      getRow();

  
    }
  }, [row]);
  const check=()=>{

    if(regId.length === 0)
    {
       // navigation.navigate('Cures',{screen:'My Cures'})
       navigation.navigate('SignIn')
  
    }
    else{
       navigation.navigate('CreateScreenHome')
    }
}
  function renderItemTrend({item, index}) {
    const {name, source, color,type} = item;
    return (
      <View style={{marginRight: 12}}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => {
            navigation.navigate('Result', {types: `${type}`});
          }}>
          <Card
            style={{
              width: wp('30%'),
              height: 120,
              backgroundColor: '#00415e',

              borderRadius: 20,
              alignItems: 'center',
            }}
            key={index}>
            <ImageBackground
              style={{
                width: wp('30%'),
                height: 120,
                borderRadius: 20,
                overflow: 'hidden',
              }}
              source={source}
            />
          </Card>
        </TouchableOpacity>
        <Text
      
          adjustsFontSizeToFit
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
      </View>
    );
  }

  return (
    <View style={{flex: 1}}>
      <Stack space={3} alignItems="center" bg="white">
        <HStack mt="4" mb="1" space={1} alignItems="center">
          <View style={{position: 'relative', top: 2, right: 0}}>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => {
                navigation.openDrawer();
              }}>
              {<User/>}
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
                adjustsFontSizeToFit
                numberOfLines={1}
                  style={{
                    fontSize: wp('4.5%'),
                    color: '#00415e',
                    fontFamily: 'Raleway-Regular',
                    justifyContent:'center'
                  }}>
                  Search Cures
                </Text>
                <Icon name="search" size={20} style={styles.icon}></Icon>
              </HStack>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => getId()}>
            <Create  />
          </TouchableOpacity>
        </HStack>
      </Stack>
      <ScrollView
        style={{width: wp('100%'), backgroundColor: '#fff'}}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <Stack mt="2" ml="2" space={3}>
          <HStack space={1}>
          <Text
          
            style={{
              fontSize: wp('5%'),
              color: '#00415e',
              fontFamily: 'Raleway-Regular',
            }}>
            Cures By Category
          </Text>
          <Icon style={{marginTop:5}} name='caret-right' color={'#00415e'} size={25} />
          </HStack>
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
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => {
                  navigation.navigate('Result', {texts: 'Arthritis'});
                }}>
                <Card
                  resizeMode="stretch"
                  style={{
                    width: wp('30%'),
                    height: hp('20%'),
                    backgroundColor: '#f5b6ff',
                    borderRadius: 20,
                    marginRight: 10,
                    overflow: 'hidden',
                  }}>
                  <Image
                    style={{
                      alignContent: 'center',
                      width: '90%',
                      height: '80%',
                      position: 'absolute',
                      bottom: 0,
                      left: 5,
                      overflow: 'hidden',
                    }}
                    resizeMode="stretch"
                    resizeMethod="resize"
                    source={require('../../assets/img/arthritis.png')}
                  />

                  <Text
            
                    style={{
                      color: '#fff',
                      fontWeight: 'bold',
                      position: 'absolute',
                      top: 6,
                      left: 6,
                      fontFamily: 'Raleway',
                      fontSize:wp('3%')
                    }}>
                    Arthritis
                  </Text>
                </Card>
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => {
                  navigation.navigate('Result', {texts: 'Thyroid'});
                }}>
                <Card
                  style={{
                    width: wp('30%'),
                    height: hp('20%'),
                    backgroundColor: '#ffc672',
                    borderRadius: 20,
                    marginRight: 10,
                    overflow: 'hidden',
                  }}>
                  <Image
                    style={{
                      alignContent: 'center',
                      width: '90%',
                      height: '50%',
                      position: 'absolute',
                      bottom: 0,
                      left: 5,
                      overflow: 'hidden',
                    }}
                    resizeMode="stretch"
                    resizeMethod="resize"
                    source={require('../../assets/img/thyroid.png')}
                  />

                  <Text
               
                    style={{
                      color: '#fff',
                      fontWeight: 'bold',
                      position: 'absolute',
                      top: 6,
                      left: 6,
                      fontFamily: 'Raleway',
                      fontSize:wp('3%')
                    }}>
                    Thyroid
                  </Text>
                </Card>
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => {
                  navigation.navigate('Result', {texts: 'Diabetes'});
                }}>
                <Card
                  style={{
                    width: wp('30%'),
                    height: hp('20%'),
                    backgroundColor: '#ffa68a',
                    borderRadius: 20,
                    marginRight: 10,
                    overflow: 'hidden',
                  }}>
                  <Image
                    style={{
                      alignContent: 'center',
                      width: '90%',
                      height: '50%',

                      position: 'absolute',
                      bottom: 0,
                      left: 7,
                    }}
                    resizeMode="cover"
                    resizeMethod="resize"
                    source={require('../../assets/img/slider-2.png')}
                  />

                  <Text
            
                    style={{
                      color: '#fff',
                      fontWeight: 'bold',
                      position: 'absolute',
                      top: 6,
                      left: 6,
                      fontFamily: 'Raleway',
                      fontSize:wp('3%')
                    }}>
                    Diabetes
                  </Text>
                </Card>
              </TouchableOpacity>
        
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => {
                  navigation.navigate('Result', {texts: 'Insomnia'});
                }}>
                <Card
                  style={{
                    width: wp('30%'),
                    height: hp('20%'),
                    backgroundColor: '#cca4ff',
                    borderRadius: 20,
                    marginRight: 10,
                    overflow: 'hidden',
                  }}>
                  <Image
                    style={{
                      alignContent: 'center',
                      width: '90%',
                      height: '80%',
                      position: 'absolute',
                      bottom: 0,
                      left: 5,
                      overflow: 'hidden',
                    }}
                    resizeMode="stretch"
                    resizeMethod="auto"
                    source={require('../../assets/img/insomnia.png')}
                  />

                  <Text
          
                    style={{
                      color: '#fff',
                      fontWeight: 'bold',
                      position: 'absolute',
                      top: 6,
                      left: 6,
                      fontFamily: 'Raleway',
                      fontSize:wp('3%')
                    }}>
                    Insomnia
                  </Text>
                </Card>
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => {
                  navigation.navigate('Result', {texts: 'Skin Care'});
                }}>
                <Card
                  style={{
                    width: wp('30%'),
                    height: hp('20%'),
                    backgroundColor: '#ffa68a',
                    borderRadius: 20,
                    marginRight: 10,
                    overflow: 'hidden',
                  }}>
                  <Image
                    style={{
                      alignContent: 'center',
                      width: '100%',
                      height: '80%',
                      position: 'absolute',
                      bottom: 0,
                      left: 5,
                    }}
                    resizeMode="stretch"
                    source={require('../../assets/img/slider-5.png')}
                  />

                  <Text
              
                    style={{
                      color: '#fff',
                      fontWeight: 'bold',
                      position: 'absolute',
                      top: 6,
                      left: 6,
                      fontFamily: 'Raleway',
                      fontSize:wp('3%')
                    }}>
                    Skin Care
                  </Text>
                </Card>
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => {
                  navigation.navigate('Result', {texts: 'Blood Pressure'});
                }}>
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
                      width: '90%',
                      height: '80%',
                      position: 'absolute',
                      bottom: 0,
                      left: 5,
                      overflow: 'hidden',
                    }}
                    resizeMode="stretch"
                    source={require('../../assets/img/bloodpressure.png')}
                  />

                  <Text
                  
                    style={{
                      color: '#fff',
                      fontWeight: 'bold',
                      position: 'absolute',
                      top: 6,
                      left: 6,
                      fontFamily: 'Raleway',
                      fontSize:wp('3%')
                    }}>
                    Hyper Tension
                  </Text>
                </Card>
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => {
                  navigation.navigate('Result', {texts: 'Psorasis'});
                }}>
                <Card
                  style={{
                    width: wp('30%'),
                    height: hp('20%'),
                    backgroundColor: 'lightgreen',
                    borderRadius: 20,
                    marginRight: 15,
                  }}>
                  <Image
                    style={{
                      alignContent: 'center',
                      width: '90%',
                      height: '80%',
                      position: 'absolute',
                      bottom: 0,
                      left: 5,
                    }}
                    resizeMode="center"
                    source={require('../../assets/img/psorasis.png')}
                  />

                  <Text
           
                    style={{
                      color: '#fff',
                      fontWeight: 'bold',
                      position: 'absolute',
                      top: 6,
                      left: 6,
                      fontFamily: 'Raleway',
                      fontSize:wp('3%')
                    }}>
                    Psorasis
                  </Text>
                </Card>
              </TouchableOpacity>
            </ScrollView>
          </View>
          <HStack space={1}>
          <Text
       
            style={{
              fontSize: wp('5%'),
              color: '#00415e',
              fontFamily: 'Raleway-Regular',
            }}>
          System Of Medicine
          </Text>
          <Icon style={{marginTop:5}} name='caret-right' color={'#00415e'} size={25} />
          </HStack>
          <View style={{alignItems: 'center', width: wp('100%')}}>
            <FlatList
              horizontal
              showsHorizontalScrollIndicator={false}
              data={DATA1}
              renderItem={renderItemTrend}
            />
          </View>
<HStack space={1}>
          <Text
       
            style={{
              fontSize: wp('5%'),
              color: '#00415e',
              fontFamily: 'Raleway-Regular',
            }}>
            Recent Cures
          </Text>
          <Icon style={{marginTop:5}} name='caret-right' color={'#00415e'} size={25} />
          </HStack>
          <ArticlePreview />
          <HStack space={1}>
          <Text
        
            style={{
              fontSize: 20,
              color: '#00415e',
              fontFamily: 'Raleway-Regular',
            }}>
            Top Doctors
          </Text>
          <Icon style={{marginTop:5}} name='caret-right' color={'#00415e'} size={25} />
          </HStack>
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
    backgroundColor: 'rgba(0, 65, 94, 0.2)',
    width: wp('72%'),
    height: 55,
    fontSize: 20,
    borderRadius: 15,
    
    justifyContent:'center'
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
    position: 'absolute',
    right: 10,
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
