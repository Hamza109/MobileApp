import React, {useEffect} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/FontAwesome';
import IonIcon from 'react-native-vector-icons/Ionicons';
import {View, StyleSheet, StatusBar} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  HomeStack,
  DocStack,
  CuresStack,
  ProfileStack,
} from '../RootStackScreen';
import {useState} from 'react';
import {SplashStack} from '../RootStackScreen';
import DocTab from './DocTab';
import {Platform} from 'react-native';
import HomeScreen from './Home';
import {useDispatch} from 'react-redux';

import {getFocusedRouteNameFromRoute} from '@react-navigation/native';

const Tab = createBottomTabNavigator();

const MainTabScreen = () => {
  return (
    <Tab.Navigator
      initialRouteName="drawer"
      screenOptions={({route}) => {
        return {
          headerShown: false,
          headerStyle: {
            height: Platform.OS === 'android' ? 60 : 90,
          },
          tabBarStyle: {
            justifyContent: 'center',
            alignItems: 'center',
            height: Platform.OS === 'android' ? 55 : 85,
            display:
              getFocusedRouteNameFromRoute(route) === 'chat' ||
              getFocusedRouteNameFromRoute(route) === 'searchArt' ||
              getFocusedRouteNameFromRoute(route) === 'Disease' ||
              getFocusedRouteNameFromRoute(route) === 'Result' ||
              getFocusedRouteNameFromRoute(route) === 'Forgetpass'||
              getFocusedRouteNameFromRoute(route) === 'videoCall'
                ? 'none'
                : 'flex',
          },
          tabBarInactiveTintColor: 'grey',
          tabBarActiveBackgroundColor: 'aliceblue',
          tabBarLabelStyle: {fontFamily: 'Raleway-Medium'},
        };
      }}>
      <Tab.Screen
        name="drawer"
        component={HomeStack}
        options={{
          tabBarActiveTintColor: '#00415e',
          tabBarLabel: 'Home',
          tabBarColor: '#fff',
          tabBarIcon: ({focused}) => (
            <View
              style={[
                styles.tab,
                {backgroundColor: focused ? '#00415e' : null},
              ]}>
              <Icon
                name="home"
                color={focused ? '#fff' : '#00415e'}
                size={26}
              />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Doctor"
        component={DocStack}
        options={{
          headerStyle: {
            backgroundColor: '#00415e',
            height: Platform.OS === 'android' ? 60 : 90,
          },
          headerTintColor: '#fff',
          headerLeft: () => (
            <Icon
              name="user-md"
              size={30}
              style={{
                marginLeft: 20,
                color: '#fff',
                marginTop: Platform.OS === 'android' ? 0 : 45,
              }}
              backgroundColor="#fff"></Icon>
          ),

          tabBarActiveTintColor: '#00415e',
          tabBarLabel: 'Doctor',
          tabBarColor: '#fff',
          tabBarIcon: ({color, focused}) => (
            <View
              style={[
                styles.tab,
                {backgroundColor: focused ? '#00415e' : null},
              ]}>
              <Icon
                name="user-md"
                color={focused ? '#fff' : '#00415e'}
                size={26}
              />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="ProfileTab"
        component={ProfileStack}
        options={{
          headerStyle: {
            backgroundColor: '#00415e',
            height: Platform.OS === 'android' ? 60 : 90,
          },
          headerTintColor: '#fff',
          headerLeft: () => (
            <Icon
              style={{
                marginLeft: 20,
                marginTop: Platform.OS === 'android' ? 0 : 0,
              }}
              name="heartbeat"
              color={'#fff'}
              size={26}
            />
          ),
          tabBarActiveTintColor: '#00415e',
          tabBarLabel: 'Profile',

          tabBarColor: '#fff',
          tabBarIcon: ({color, focused}) => (
            <View
              style={[
                styles.tab,
                {backgroundColor: focused ? '#00415e' : null},
              ]}>
              <Icon
                name="heartbeat"
                color={focused ? '#fff' : '#00415e'}
                size={25}
              />
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default MainTabScreen;

const styles = StyleSheet.create({
  tab: {
    borderRadius: 25,
    marginTop: 10,
    justifyContent: 'center',
    width: 35,
    height: 35,
    alignItems: 'center',
  },
});
