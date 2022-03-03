import React from 'react';
import {View, Text, Button, StyleSheet, Image} from 'react-native';
import {useState} from 'react';
import {useEffect} from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';
import BootstrapStyleSheet from 'react-native-bootstrap-styles';

import {useIsFocused} from '@react-navigation/native';
import {backendHost} from '../../components/apiConfig';
import {useNavigation} from '@react-navigation/native';
import Review from '../mycures/Review';
import Published from '../mycures/Publish';
import Overview from '../mycures/Overview';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import All from '../mycures/All';
import { widthPercentageToDP } from 'react-native-responsive-screen';

const bootstrapStyleSheet = new BootstrapStyleSheet();
const {s, c} = bootstrapStyleSheet;
const Tab = createMaterialTopTabNavigator();
const MyCures = () => {






  return (
    <>
      <Tab.Navigator
        initialRouteName="All"
        screenOptions={{
          tabBarStyle: {padding: 0,width:widthPercentageToDP('100%')},
          tabBarInactiveTintColor: 'grey',
          tabBarLabelStyle: {fontFamily: 'Raleway-Bold', fontSize: widthPercentageToDP('3%')},
        }}>
        <Tab.Screen
          name="All"
          component={All}
          options={{
            headerShown: false,
            tabBarActiveTintColor: '#00415e',
            tabBarLabel: 'All',

            tabBarColor: '#fff',
          }}
        />
        <Tab.Screen
          name="Overview"
          component={Overview}
          options={{
            headerShown: false,
            tabBarActiveTintColor: '#00415e',
            tabBarLabel: 'In Progress',
            tabBarColor: '#fff',
          }}
        />

        <Tab.Screen
          name="Review"
          component={Review}
          options={{
            headerShown: false,
            tabBarActiveTintColor: '#00415e',
            tabBarLabel: 'Review',
            tabBarColor: '#fff',
          }}
        />
        <Tab.Screen
          name="Publish"
          component={Published}
          options={{
            headerShown: false,
            tabBarActiveTintColor: '#00415e',
            tabBarLabel: 'Publish',
            tabBarColor: '#fff',
          }}
        />
      </Tab.Navigator>
    </>
  );
};

export default MyCures;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    marginTop: 1,
  },
  work: {
    borderWidth: 2,
    borderColor: '#00415e',
    opacity: 0.5,
    backgroundColor: '#00415e',
    marginLeft: 230,
    padding: 2,
    position: 'absolute',
    bottom: 6,
    right: 0,
  },
  review: {
    borderWidth: 2,
    borderColor: 'red',
    opacity: 0.5,
    backgroundColor: 'red',
    marginLeft: 295,
    padding: 2,
    position: 'absolute',
    bottom: 6,
    right: 0,
  },
  publish: {
    borderWidth: 2,
    borderColor: 'green',
    opacity: 0.5,

    backgroundColor: 'green',
    position: 'absolute',
    bottom: 6,
    right: 0,
    padding: 2,
    opacity: 0.4,
  },
  opacity: {
    opacity: 1,
  },
});
