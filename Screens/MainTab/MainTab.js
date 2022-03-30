import React, {useEffect} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/FontAwesome';
import HomeScreen from './Home';
import MyCures from './MyCures';

import AsyncStorage from '@react-native-async-storage/async-storage';
import Autocomplete from './Autocomplete';
import {useState} from 'react';

import DocTab from './DocTab';
import { Platform } from 'react-native';

const HomeStack = createStackNavigator();
const MyCuresStack = createStackNavigator();
const ArticleStack = createStackNavigator();
const Tab = createBottomTabNavigator();

const MainTabScreen = () => {
  const [regId, setRegId] = useState([]);
  const getId = () => {
    try {
      AsyncStorage.getItem('author').then(value1 => {
        if (value1 != null) {
          console.log('value:',value1)
          setRegId(value1);
        }
      });
    } catch (error) {}
  };
useEffect(()=>{
  getId();
},[regId])
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarStyle: {padding: 5},
        tabBarInactiveTintColor: 'grey',
        tabBarLabelStyle: {fontFamily: 'Raleway-Medium'},
      }}>
      <Tab.Screen
        name="HomeTab"
        component={HomeStackScreen}
        options={{
          unmountOnBlur:true,
          headerShown: false,
          tabBarActiveTintColor: '#00415e',
          activeColor: 'red',

          tabBarLabel: 'Home',
          tabBarColor: '#fff',
          tabBarIcon: ({color}) => (
            <Icon name="home" color={'#00415e'} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="ArticleTab"
        component={ArticleStackScreen}
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
        component={MyCuresStackScreen}
        options={{
          unmountOnBlur:true,
          headerShown: false,
          tabBarActiveTintColor: '#00415e',
          tabBarLabel: 'My Cures',
          tabBarColor: '#fff',
          tabBarIcon: ({color}) => (
            <Icon name="heartbeat" color={'#00415e'} size={26} />
          ),
        }}
      />

      {/* <Tab.Screen
        name="ProfileTab"
        component={Profile}
        options={{
          tabBarLabel: 'Profile',
          tabBarColor: '#fff',
          tabBarIcon: ({ color }) => (
            <Icon name="ios-person" color={'#00415e'} size={26} />
          ),
        }}
      /> */}
    </Tab.Navigator>
  );
};

export default MainTabScreen;

const HomeStackScreen = () => (
  <HomeStack.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: '#fff',
      },

      headerTintColor: '#00415e',
      headerTitle: 'All Cures',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    }}>
    <HomeStack.Screen
      name="Home"
      component={HomeScreen}
      options={{headerLeft: null, headerShown: false}}
    />
  </HomeStack.Navigator>
);
const MyCuresStackScreen = () => (
  <MyCuresStack.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: '#fff',
        height:Platform.OS ==='android'?60:70
      },
      headerTintColor: '#00415e',
      headerTitleStyle: {
        fontWeight: 'bold', marginTop:Platform.OS === 'android'?0:30
      },
    }}>
    <MyCuresStack.Screen
      name="MyCures"
      component={MyCures}
      options={{
        
        headerLeft: () => (
          <Icon
            name="heartbeat"
            size={30}
            style={{marginLeft: 20, color: '#00415e',marginTop:Platform.OS === 'android'?0:30}}
            backgroundColor="#fff"></Icon>
        ),
        
      }}
    />
  </MyCuresStack.Navigator>
);

const ArticleStackScreen = ({navigation}) => (
  <ArticleStack.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: '#fff',
       height:Platform.OS ==='android'?60:70
      },
      headerTintColor: '#00415e',
      headerTitleStyle: {
        fontWeight: 'bold', marginTop:Platform.OS === 'android'?0:30
        
      },
    }}>
    <ArticleStack.Screen
      name="Doctor"
      component={DocTab}
      options={{
      
        headerLeft: () => (

          <Icon
            name="user-md"
            size={30}
            style={{marginLeft: 20, color: '#00415e', marginTop:Platform.OS === 'android'?0:30}}
            backgroundColor="#fff"></Icon>
        ),
      }}
    />
  </ArticleStack.Navigator>
);
