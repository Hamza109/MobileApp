import React, {useState, useEffect,useRef} from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
  SafeAreaView,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {
  HStack,
  Divider,
  Box,
} from 'native-base';
import PhoneInput from 'react-native-phone-number-input';
import {StackActions,DrawerActions} from '@react-navigation/routers';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import IonIcons from 'react-native-vector-icons/Ionicons';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,

  DrawerItem,
} from '@react-navigation/drawer';
import MainTabScreen from './MainTab';
import ProfileScreen from './Profile';
import Subscribe from '../../components/Subscribe';
import Feedback from '../../components/FeedBack';
import { useStore ,useDispatch} from 'react-redux';
import { reg } from '../Redux/Action';
import { screenName } from '../Redux/Action';


const Drawer = createDrawerNavigator();

const DrawerMenu = () => {

  const user=useStore();
const dispatch=useDispatch();
  const Navigation = useNavigation();
 

  

  
  useEffect(() => {
   console.log('drawer',user.getState().userId.regId)
  },[]);
  const remove = async () => {
    dispatch(reg(0))
  };
  const logout = () => {
    Alert.alert('Hold on!', 'Are you sure you want Logout?', [
      {
        text: 'Cancel',
        onPress: () => null,
        style: 'cancel',
      },
      {
        text: 'YES',
        onPress: () => {
          Navigation.dispatch(StackActions.popToTop()), remove();
        },
      },
    ]);
    return true;
  };
  function CustomDrawerContent(props) {
    return (
      <DrawerContentScrollView
        contentContainerStyle={{
          flex: 1,
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
        {...props}>
        <SafeAreaView forceInset={{top: 'always', horizontal: 'never'}}>
   
        <View style={{backgroundColor:'#fff'}}>
        <HStack ml='3' mb='3' mt='3' bg='#fff' space={1}>
          <Image
          resizeMode='stretch'
            source={require('../../assets/img/heart.png')}
            style={styles.imageModal}></Image>
          <Text
            style={{
              marginTop: 22,
              marginRight: 15,
              fontSize: 20,
              color: '#00415e',
            }}>
            All Cures
          </Text>
          </HStack>
        </View>
        <View>
          <Divider style={{marginBottom:20}}/>
        </View>
        <DrawerItemList {...props} />
      
        </SafeAreaView>
        {login()}
        
      </DrawerContentScrollView>
    );
  }
  const login = () => {

    if (user.getState().userId.regId != 0) {
      dispatch(screenName('Main'))
      return (
        <View>

<Divider/>      
        <View
          style={{
            width: wp('100%'),
            height: hp('7%'),
            padding: 10,
            backgroundColor: '#fff',
          }}>
          <TouchableOpacity onPress={() => logout()}>
            <HStack ml='3' space={4}>
              <IonIcons name="log-in-outline" size={28} color="#00415e" />
              <Text
                style={{
                  color: '#00415e',
                  fontFamily: 'Raleway-Medium',
                  fontSize: wp('4.5%'),
                }}>
                Logout
              </Text>
            </HStack>
          </TouchableOpacity>
        </View>
        </View>
      );
    } else {
      return (
        <View>
          <Divider/>
        <View
          style={{
            width: wp('100%'),
            height: hp('7%'),
            padding: 10,
            backgroundColor: '#fff',
          }}>
          <TouchableOpacity onPress={() => Navigation.navigate('SignIn',{screen:`Main`})}>
            <HStack ml='3' space={4}>
              <IonIcons name="log-in" size={28} color="#00415e" />
              <Text
                style={{
                  color: '#00415e',
                  fontFamily: 'Raleway-Medium',
                  fontSize: wp('4.5%'),
                }}>
                Login
              </Text>
            </HStack>
          </TouchableOpacity>
        </View>
        </View>
      );
    }
  };

  return (
    <Box flex={1}>
      <Drawer.Navigator
        drawerContent={props => <CustomDrawerContent {...props} />}>
        <Drawer.Screen
          name="Home"
          component={MainTabScreen}
      
          options={{
            headerShown: null,

            drawerLabel: 'Home',
            drawerLabelStyle: {color: '#00415e',fontFamily:'Raleway-Medium',position:'relative',right:5},
            drawerIcon: () => (
              <Icon name="home" color={'#00415e'} size={22} />
            ),
          }}
        />

        <Drawer.Screen
          name="Profile"
          component={ProfileScreen}
          options={{  headerStyle: {
            backgroundColor: '#fff',
            height:Platform.OS ==='android'?60:90
          },
          headerTintColor: '#00415e',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        headerLeft:()=>(  <TouchableOpacity  onPress={() => Navigation.dispatch(DrawerActions.openDrawer())}>
        <Icon name="bars" size={25}  color="#00415e" style={{marginTop:Platform.OS === 'android'?0:0,marginLeft:10}} />
      </TouchableOpacity>),
            drawerLabel: 'Profile',
            drawerLabelStyle: {color: '#00415e',fontFamily:'Raleway-Medium'},
            drawerIcon: ({focused, size}) => (
              <Icon name="user" color={'#00415e'} size={22} />
            ),
          }}
        />
          <Drawer.Screen
          name="Subscribe"
          component={Subscribe}
          options={{
            headerStyle: {
              backgroundColor: '#fff',
              height:Platform.OS ==='android'?60:90,
      
            },
            headerTintColor: '#00415e',
            headerTitleStyle: {
              fontWeight: 'bold', 
            },
            drawerLabel: 'Subscribe',
            drawerLabelStyle: {color: '#00415e',fontFamily:'Raleway-Medium',position:'relative',right:4},
            headerLeft:()=>(  <TouchableOpacity  onPress={() => Navigation.dispatch(DrawerActions.openDrawer())}>
            <Icon name="bars" size={25}  color="#00415e" style={{marginTop:Platform.OS === 'android'?0:0,marginLeft:10}} />
          </TouchableOpacity>),
            drawerIcon: ({focused, size}) => (
              <Icon name="bell" color={'#00415e'} size={22} style={{marginLeft:-2}} />
            ),
          }}
        />
           <Drawer.Screen
          name="Feedback"
          component={Feedback}
          options={{
            headerStyle: {
              backgroundColor: '#fff',
              height:Platform.OS ==='android'?60:90
            },
            headerTintColor: '#00415e',
            headerTitleStyle: {
              fontWeight: 'bold', 
            },
            drawerLabel: 'Feedback',
            drawerLabelStyle: {color: '#00415e',fontFamily:'Raleway-Medium',position:'relative',right:4},
            headerLeft:()=>(  <TouchableOpacity  onPress={() => Navigation.dispatch(DrawerActions.openDrawer())}>
            <Icon name="bars" size={25}  color="#00415e" style={{marginTop:Platform.OS === 'android'?0:0,marginLeft:10}} />
          </TouchableOpacity>),
            drawerIcon: ({focused, size}) => (
              <Icon name="paper-plane" color={'#00415e'} size={22} style={{marginLeft:-2}} />
            ),
          }}
        />
      </Drawer.Navigator>
      
    </Box>
  );
};

export default DrawerMenu;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',

    alignItems: 'center',
  },
  card: {
    padding: 10,
    margin: 0,
    height: hp('60%'),
    width: wp('100%'),
    position: 'relative',
    bottom: 90,
    borderRadius: 0,
    backgroundColor: '#00415e',
  },

  search: {
    position: 'relative',
    bottom: 282,
    backgroundColor: '#fff',
  },

  b1: {
    backgroundColor: '#00415e',
    padding: 40,
  },

  text: {
    backgroundColor: '#00415e',
    color: '#fff',
    textAlign: 'center',
  },
  h1: {
    position: 'relative',
    bottom: 450,
    right: 0,
    fontWeight: 'bold',
    padding: 0,
    margin: 0,
  },
  t2: {
    position: 'relative',
    bottom: 410,

    padding: 10,
    margin: 0,
    zIndex: 9999,
  },
  centeredView: {
    flex: 1,

    marginTop: 25,
  },
  modalView: {
    alignItems: 'center',
  },

  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  image: {
    padding: 20,
    marginTop: 5,
    height: hp('5%'),
    width: wp('5%'),
  },
  imageModal: {
    padding: 20,
    height: 60,
    width: wp('15%'),
  },
  btn: {
    borderWidth: 2,
    borderRadius: 15,
    borderColor: '#00415e',
    justifyContent: 'center',
    alignItems: 'center',
    width: wp('35%'),
    height: hp('4.5%'),
    backgroundColor: '#00415e',
    color: 'white',
    marginRight: 10,
    marginTop: 12,
  },
});