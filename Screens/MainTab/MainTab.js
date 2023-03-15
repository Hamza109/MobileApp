import React, {useEffect} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/FontAwesome';
import IonIcon from 'react-native-vector-icons/Ionicons';
import { View,StyleSheet,StatusBar} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { HomeStack,DocStack,CuresStack, ProfileStack } from '../RootStackScreen';
import {useState} from 'react';
import { SplashStack } from '../RootStackScreen';
import DocTab from './DocTab';
import { Platform } from 'react-native';
import HomeScreen from './Home';
import { useDispatch } from 'react-redux';
import DrawerMenu from './DrawerMenu';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';

const MyCuresStack = createStackNavigator();
const ArticleStack = createStackNavigator();
const Tab = createBottomTabNavigator();


const MainTabScreen = () => {
  const dispatch=useDispatch()
 
  return (
    <Tab.Navigator
      initialRouteName="drawer"
      screenOptions={({route})=>{
        console.log(route)
        return {
        tabBarStyle:{
          justifyContent:'center',
          alignItems:'center',
          height:Platform.OS==='android'?55:85,
          display:
          getFocusedRouteNameFromRoute(route) === "chat"
            ? "none"
            : "flex",
        }
        ,
        tabBarInactiveTintColor: 'grey',
       tabBarActiveBackgroundColor:'aliceblue',
        tabBarLabelStyle: {fontFamily: 'Raleway-Medium'},
        }
        
      }}>
   
      <Tab.Screen
        name="drawer"
        component={DrawerMenu}
        options={{
          headerShown: false,
          tabBarActiveTintColor: '#00415e',
        
         
          tabBarLabel: 'Home',
          tabBarColor: '#fff',
          tabBarIcon: ({focused}) => (
            <View style={[styles.tab,{backgroundColor:focused?'#00415e':null}]}>
            <Icon name="home" color={focused?'#fff':'#00415e'} size={26} />
            </View>
           
            
          ),
        }}
      />
      <Tab.Screen
        name="DoctorTab"
        component={DocStack}
        options={{
  
          headerShown: false,
          tabBarActiveTintColor: '#00415e',
          tabBarLabel: 'Doctor',
          tabBarColor: '#fff',
          tabBarIcon: ({color,focused}) => (
            <View style={[styles.tab,{backgroundColor:focused?'#00415e':null}]}>
            <Icon name="user-md" color={focused?'#fff':'#00415e'} size={26} />
            </View>
           
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileStack}
        
        options={{
          headerShown: false,
          tabBarActiveTintColor: '#00415e',
          tabBarLabel: 'Profile',
          
          tabBarColor: '#fff',
          tabBarIcon: ({color,focused}) => (
           <View style={[styles.tab,{backgroundColor:focused?'#00415e':null}]}>
            <Icon name="heartbeat" color={focused?'#fff':'#00415e'} size={25} />
            </View>
          ),
        }}
      />

    </Tab.Navigator>
  );
};

export default MainTabScreen;

const styles=StyleSheet.create({
tab:{
  borderRadius:25,
  marginTop:10,
  justifyContent:'center',
  width:35,
  height:35,
  alignItems:'center'
}
})


