import React, {useEffect} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/FontAwesome';
import IonIcon from 'react-native-vector-icons/Ionicons';
import HomeScreen from './Home';
import MyCures from './MyCures';
import SearchArt from '../search/SearchArticle';
import DocProfile from '../MainTab/DocProfile';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { HomeStack,DocStack,CuresStack } from '../RootStackScreen';
import {useState} from 'react';
import { SplashStack } from '../RootStackScreen';
import DocTab from './DocTab';
import { Platform } from 'react-native';


const MyCuresStack = createStackNavigator();
const ArticleStack = createStackNavigator();
const Tab = createBottomTabNavigator();

const MainTabScreen = () => {

  const [regId, setRegId] = useState([]);
  const getId = () => {
    try {
      AsyncStorage.getItem('author').then(value1 => {
        if (value1 != null) {

          setRegId(value1);
        }
      });
    } catch (error) {error}
  };
useEffect(()=>{
  getId();
},[regId])
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarStyle: {padding: 0},
        tabBarInactiveTintColor: 'grey',
        tabBarActiveBackgroundColor:'aliceblue',
        tabBarLabelStyle: {fontFamily: 'Raleway-Medium',fontWeight:'bold'},
      }}>
      <Tab.Screen
        name="Home"
        component={HomeStack}
        options={{
          unmountOnBlur:true,
          headerShown: false,
          tabBarActiveTintColor: '#00415e',
        
         
          tabBarLabel: 'Home',
          tabBarColor: '#fff',
          tabBarIcon: ({focused}) => (
            
            <Icon name="home" color={'#00415e'} size={26} />
           
            
          ),
        }}
      />
      <Tab.Screen
        name="ArticleTab"
        component={DocStack}
        options={{
          unmountOnBlur:true,
          headerShown: false,
          tabBarActiveTintColor: '#00415e',
          tabBarLabel: 'Doctor',
          tabBarColor: '#fff',
          tabBarIcon: ({color}) => (
            <Icon name="user-md" color={'#00415e'} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Cures"
        component={CuresStack}
        options={{
          unmountOnBlur:true,
          headerShown: false,
          tabBarActiveTintColor: '#00415e',
          tabBarLabel: 'My Cures',
          tabBarColor: '#fff',
          tabBarIcon: ({color,focused}) => (
            <Icon name="heartbeat"    color={'#00415e'} size={26} />
          ),
        }}
      />

    </Tab.Navigator>
  );
};

export default MainTabScreen;


