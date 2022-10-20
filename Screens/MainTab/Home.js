import React, {useState, useEffect} from 'react';
import {Dimensions, ImageBackground, Platform} from 'react-native';
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
  SafeAreaView,
  TouchableOpacity,
  TouchableHighlight,
  Image,
  RefreshControl,
} from 'react-native';
import {useIsFocused, useTheme} from '@react-navigation/native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { moderateScale,verticalScale,scale,scalledPixel } from '../../components/Scale';
import {Card, Checkbox, Modal, Portal, Provider} from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';

import MaterialIcons  from 'react-native-vector-icons/MaterialCommunityIcons'

import {
  HStack,
  Stack,
  Center,
  Box,
  Spinner,
  Heading,
  NativeBaseProvider,
  Container,
  Fab
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
import { useDispatch,useSelector } from 'react-redux';
import { screenName } from '../Redux/Action';

const HomeScreen = ({navigation, route}) => {


  const user=useSelector((state)=>state.userId.regId) ;
  const theme = useTheme();
 const dispatch=useDispatch();
  const [regType, setRegType] = useState();
  const [backPressed, setBack] = useState(1);
  const [visible, setVisible] = useState(false);
  const [isloaded, setIsLoaded] = useState(false);

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const containerStyle = {backgroundColor: 'white', padding: 20, height: 400};

  const remove = async () => {
    try {
      await AsyncStorage.multiRemove([
     
        'mail1'
      ]);
    } catch (error) {
   error
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
  
  const getId =  () => {
  if(user!=0){
    navigation.navigate('CreateScreenHome')
  }
  else{
    dispatch(screenName('CreateScreenHome'))
    navigation.navigate('SignIn')
   
  }
  };

  
  const getType = () => {
    try {
      AsyncStorage.getItem('rateType').then(value2 => {
        if (value2 != null) {
          setRegType(value2);
        }
      }).catch(err=>err);;
    } catch (error) {error}
  };
  const isFocuss = useIsFocused();
  useEffect(()=>{
  
    console.log('user',user)
     
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
        width={scale(45)}
        height={scale(45)}
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
      width={scale(45)}
      height={scale(45)}
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
    navigation.push('Main');
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false)).catch(err=>err);;
  };
  const getRow = () => {
    try {
      AsyncStorage.getItem('rowno').then(value2 => {

        if (value2 != null) {
          setRow(Number(value2));
        }
      }).catch(err=>err);;
    } catch (error) {
      error
    }
  };
  const isFocus = useIsFocused();
  useEffect(() => {
    if (isFocus) {
      getRow();

  
    }
  }, [row]);

  function renderItemTrend({item, index}) {
    const {name, source, color, type} = item;
    return (
      <View style={{marginRight: 9,height:verticalScale('165')}}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => {
            navigation.navigate('Result', {types: `${type}`});
          }}>
          <Card
            style={{
              width: scale(110),
              height: verticalScale('130'),
              backgroundColor: '#00415e',
              overflow:'hidden',
              borderRadius: 20,
              alignItems: 'center',
            }}
            key={index}>
            <ImageBackground
            
              style={{
                width: scale(110),
                height: verticalScale('130'),
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
            fontSize: scale(13),
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
    
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
      <SafeAreaView style={{flex:1}}>
        <StatusBar backgroundColor="#00415e" barStyle="light-content" />
        <View
          style={{marginTop: Platform.OS === 'android' ? 0 : -15}}>
          <View style={{flexDirection:'row',justifyContent:'space-evenly',marginTop:12,marginBottom:10}}>
            <View style={{position: 'relative', top: 2, right: 0}}>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => {
                  navigation.openDrawer();
                }}>
                
                  <User />
                  
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
                      fontSize: scale(15),
                      color: '#00415e',
                      fontFamily: 'Raleway-Regular',
                      justifyContent: 'center',
                    }}>
                    Search Cures
                  </Text>
                  <Icon name="search" size={scale(20)} style={styles.icon}></Icon>
                </HStack>
              </View>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.8} onPress={() => getId()}>
              <Create />
            </TouchableOpacity>
          </View>
        </View>
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
                  fontSize: scale(20),
                  color: '#00415e',
                  fontFamily: 'Raleway-Regular',
                }}>
                Cures By Category
              </Text>
              <Icon
                style={{marginTop: Platform.OS === 'android' ? 5 : 1}}
                name="caret-right"
                color={'#00415e'}
                size={scale(25)}
              />
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
                      width: scale(125),
                      height: verticalScale(165),
                      backgroundColor: '#f5b6ff',
                      borderRadius: 20,
                      marginRight: 10,
                      overflow: 'hidden',
                    }}>
                    <Image
                      style={{
                        alignContent: 'center',
                        width: scale(110),
                        height: verticalScale(120),
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
                        fontSize: scale(12),
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
                      width: scale(125),
                      height: verticalScale(165),
                      backgroundColor: '#ffc672',
                      borderRadius: 20,
                      marginRight: 10,
                      overflow: 'hidden',
                    }}>
                    <Image
                      style={{
                        alignContent: 'center',
                        width: scale(110),
                        height: verticalScale(90),
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
                        fontSize: scale(12),
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
                      width: scale(125),
                      height: verticalScale(165),
                      backgroundColor: '#ffa68a',
                      borderRadius: 20,
                      marginRight: 10,
                      overflow: 'hidden',
                    }}>
                    <Image
                      style={{
                        alignContent: 'center',
                        width: scale(110),
                        height: verticalScale(90),

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
                        fontSize: scale(12),
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
                      width: scale(125),
                      height: verticalScale(165),
                      backgroundColor: '#cca4ff',
                      borderRadius: 20,
                      marginRight: 10,
                      overflow: 'hidden',
                    }}>
                    <Image
                      style={{
                        alignContent: 'center',
                        width: scale(110),
                        height: verticalScale(120),
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
                        fontSize: scale(12),
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
                      width: scale(125),
                      height: verticalScale(165),
                      backgroundColor: '#ffa68a',
                      borderRadius: 20,
                      marginRight: 10,
                      overflow: 'hidden',
                    }}>
                    <Image
                      style={{
                        alignContent: 'center',
                        width: scale(110),
                        height: verticalScale(110),
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
                        fontSize: scale(12),
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
                      width: scale(125),
                      height: verticalScale(165),
                      backgroundColor: 'lightblue',
                      borderRadius: 20,
                      marginRight: 10,
                      overflow: 'hidden',
                    }}>
                    <Image
                      style={{
                        alignContent: 'center',
                        width: scale(110),
                        height: verticalScale(120),
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
                        fontSize: scale(12),
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
                      width: scale(125),
                      height: verticalScale(165),
                      backgroundColor: 'lightgreen',
                      borderRadius: 20,
                      marginRight: 15,
                    }}>
                    <Image
                      style={{
                        alignContent: 'center',
                        width: scale(110),
                        height: verticalScale(120),
                        position: 'absolute',
                        bottom: 0,
                        left: 5,
                      }}
                      resizeMode="stretch"
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
                        fontSize: scale(12),
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
                  fontSize: scale(20),
                  color: '#00415e',
                  fontFamily: 'Raleway-Regular',
                }}>
                System Of Medicine
              </Text>
              <Icon
                style={{marginTop: Platform.OS === 'android' ? 5 : 1}}
                name="caret-right"
                color={'#00415e'}
                size={25}
              />
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
                  fontSize: scale(20),
                  color: '#00415e',
                  fontFamily: 'Raleway-Regular',
                }}>
                Recent Cures
              </Text>
              <Icon
                style={{marginTop: Platform.OS === 'android' ? 5 : 1}}
                name="caret-right"
                color={'#00415e'}
                size={scale(25)}
              />
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
          <Icon style={{marginTop:Platform.OS==='android'?5:1}} name='caret-right' color={'#00415e'} size={25} />
          </HStack>
          <DocPreview />
        </Stack>
      </ScrollView>
      </SafeAreaView>
    </SafeAreaView>
  );
};

export default HomeScreen;
const width = Dimensions.get('screen').width;
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',

    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    backgroundColor: 'rgba(0, 65, 94, 0.2)',
    width: scale(255),
    height: verticalScale(52),
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