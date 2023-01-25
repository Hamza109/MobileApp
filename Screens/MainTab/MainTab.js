import React, {useEffect} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/FontAwesome';
import IonIcon from 'react-native-vector-icons/Ionicons';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { HomeStack,DocStack,CuresStack } from '../RootStackScreen';
import {useState} from 'react';
import { SplashStack } from '../RootStackScreen';
import DocTab from './DocTab';
import { Platform } from 'react-native';
import HomeScreen from './Home';
import { useDispatch } from 'react-redux';


const MyCuresStack = createStackNavigator();
const ArticleStack = createStackNavigator();
const Tab = createBottomTabNavigator();


const MainTabScreen = () => {
  const dispatch=useDispatch()
 
  return (
    <Tab.Navigator
      initialRouteName="Home1"
      screenOptions={{
      
        tabBarInactiveTintColor: 'grey',
        tabBarActiveBackgroundColor:'aliceblue',
        tabBarLabelStyle: {fontFamily: 'Raleway-Medium',fontWeight:'bold'},
      }}>
      <Tab.Screen
        name="Home1"
        component={HomeScreen}
        options={{
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


