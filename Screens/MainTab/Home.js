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
import Category from '../Category/Category';
import { Header } from '@rneui/themed';
import {useIsFocused, useTheme} from '@react-navigation/native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { moderateScale,verticalScale,scale,scalledPixel } from '../../components/Scale';
import {Card, Checkbox, Modal, Portal, Provider} from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
import IonIcon from 'react-native-vector-icons/Ionicons';
import System from '../Category/System';

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

import Svg, {Path, Circle} from 'react-native-svg';
import { useDispatch,useSelector,useStore } from 'react-redux';
import { reg, screenName } from '../Redux/Action';
import NetInfo from '@react-native-community/netinfo';
import { useToast } from 'native-base';
import * as Animatable from 'react-native-animatable';
import { position } from 'native-base/lib/typescript/theme/styled-system';
import { topDoctors,recentCures } from '../Redux/Action';
import LottieView from 'lottie-react-native';

const HomeScreen = ({navigation, route}) => {

const toast=useToast()
  const user=useSelector((state)=>state.userId.regId) ;
  const screen=useSelector((state)=>state.name.screen)
  const theme = useTheme();
  const  articles=useStore()
  const  topDoc=useSelector((state)=>state.top.Data)
  const [isLoaded, setIsLoaded] = useState(false);
  const [isConnected, setIsConnected] = useState(true);

 const dispatch=useDispatch();

  const [visible, setVisible] = useState(false);

  function Reload(){
  
    return(
      <TouchableOpacity onPress={onRefresh} >
      <Animatable.View  style={{width:'100%',height:55,justifyContent:'center',alignItems:'center',backgroundColor:'#ffedd5'}}  animation='slideInDown' iterationCount={1} >
      <View style={{position:'absolute',left:12}}>
        <IonIcon name='information-circle' size={30} color={'#f27938'} />
        </View>

     <Text style={{color:'black',fontFamily:'Raleway-Medium',fontSize:15}}> Check your connection</Text>
      <Text style={{color:'black',fontFamily:'Raleway-Regular',fontSize:12}}> you are offline</Text>

   
      
    </Animatable.View>
      </TouchableOpacity>
    )
  }


  useEffect(() => {


    console.log('user',user)
  console.log('screen',screen)

  const unsubscribe = NetInfo.addEventListener(state => {
    setIsConnected(state.isConnected);
   
  });
  unsubscribe();
    
 Promise.all([  
    fetch(`${backendHost}/article/allkv?limit=15`)
      .then(res => res.json())
      .catch(err=>err),
    fetch(
      `${backendHost}/SearchActionController?cmd=getResults&FeaturedDoctors=871,872,873,874,875,876,877,878,879,880,881,882`,
    )
      .then(res => res.json())
     
      .catch(err=>err)
    ] ).then(([recentCuresData,topDoctorsData])=>{
      var temp = [];
      recentCuresData.forEach(i => {
        if (i.pubstatus_id === 3 && i.type.includes(2)) {
          temp.push(i);
     
        }
   
      });
      dispatch(recentCures(temp))
      console.log('top',topDoctorsData.map.DoctorDetails.myArrayList)
      dispatch(topDoctors(topDoctorsData.map.DoctorDetails.myArrayList))

    }).then(([])=>{
     
    })
   .then()
    {
       setIsLoaded(true)
       console.log('art',articles.getState().recent.Data)

    }
        
  


 








   
  }, [])

  





  const backAction = () => {
    if (navigation.isFocused()) {
      Alert.alert('Hold on!', 'Are you sure you want to Exit?', [
        {
          text: 'Cancel',
          onPress: () => null,
          style: 'cancel',
        },
        {text: 'YES', onPress: () =>{ BackHandler.exitApp()} },
      ]);
      return true;
    }
  };
  
  const getId =  () => {
  if(user!=0){
    navigation.navigate('CreateScreenHome')
  }
  else{
    dispatch(screenName("LOGIN"))
  
   
  }
  };

  
  
  const isFocuss = useIsFocused();

  useEffect(() => {
  
    if (isFocuss) {
     

    
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
  const wait = timeout => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  };
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = () => {
    navigation.push('Main');
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false)).catch(err=>err)
  }
  
  

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
      <StatusBar backgroundColor="#fff" barStyle="dark-content" />

{
  !isLoaded?
  (
    <View style={styles.loading}>
      <HStack space={2} justifyContent="center">
        <LottieView
          source={require('../../assets/animation/load.json')}
          autoPlay
          loop
          style={{width: 50, height: 50, justifyContent: 'center'}}
        />
      </HStack>
    </View>
  ):null
}
      
      <View style={{flex:1}}>
       
        {
          !isConnected?(
          <Reload/>
          ):null
        }
        <View>

          <View style={styles.headBar}>

            <View>
              <TouchableOpacity
                activeOpacity={0.8}
                style={{zIndex:1}}
                onPress={() => {
                  navigation.openDrawer();
                }}>
                
                  <User />
                  
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              activeOpacity={0.8}
              style={{width:'100%',paddingHorizontal:30}}
              onPress={() => {
                navigation.navigate('searchArt');
              }}>
              <View style={styles.card}>
                <HStack ml="2"  alignItems="center">
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
              justifyContent:'center',
                width: '100%',
                marginLeft:-4,
                paddingHorizontal:5
              
              }}>
                {/* <View
                style={styles.category}
                >

                <Category/>
                </View> */}
              <ScrollView
                style={{width: wp('100%')}}
                horizontal
                showsHorizontalScrollIndicator={false}>
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => {
                    navigation.navigate('Result', {id:1});
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
                      source={require('../../assets/img/1.png')}
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
                    navigation.navigate('Result', {id: 87});
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
                    navigation.navigate('Result', {id:74});
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
                    navigation.navigate('Result', {id:164});
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
                    navigation.navigate('Result', {id:155});
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
                    navigation.navigate('Result', {id:50});
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
                    navigation.navigate('Result', {id:160});
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
            {/* <View
              style={{
              justifyContent:'center',
                width: '100%',
                marginLeft:-4,
                paddingHorizontal:5
              
              }}>
            <View
                style={[styles.category,{paddingVertical:10,height:180}]}
                >

                <System/>
                </View>
                </View> */}
            <View style={{alignItems: 'center', width: wp('100%')}}>
            <FlatList
              horizontal
              keyExtractor={(item)=>item.name}
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
      </View>
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
  category:{
   width:'100%' ,
   backgroundColor:'#f0f8ff',
   borderWidth:1,
   borderColor:'#e6f7ff',
   alignItems:'center',
   height:170,
   justifyContent:'center',
   paddingHorizontal:10,
   borderRadius:15,
   paddingVertical:15,
   
  },
  card: {
    backgroundColor: 'rgba(0, 65, 94, 0.2)',
    width: '100%',
    height: 52,
    fontSize: 20,
    borderRadius: 25,
    
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
headBar:
{
  width:'100%',
  flexDirection:'row',
justifyContent:'space-evenly',
marginTop:12,

paddingHorizontal:30,
marginBottom:10
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