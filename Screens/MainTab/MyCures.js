import React from 'react';
import {View, Text, Button, StyleSheet, Image} from 'react-native';
import {useState} from 'react';
import {useEffect} from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';
import BootstrapStyleSheet from 'react-native-bootstrap-styles';

import {useIsFocused} from '@react-navigation/native';
import {backendHost} from '../../components/apiConfig';
import {useNavigation} from '@react-navigation/native';

import Published from '../mycures/Publish';

import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import All from '../mycures/All';
import {widthPercentageToDP} from 'react-native-responsive-screen';

const bootstrapStyleSheet = new BootstrapStyleSheet();
const {s, c} = bootstrapStyleSheet;
const Tab = createMaterialTopTabNavigator();
const MyCures = () => {
  return (
    <>
      <Tab.Navigator
        initialRouteName="All"
        screenOptions={{
          tabBarIndicatorStyle: {color: '#00415e'},
          tabBarStyle: {padding: 0, width: widthPercentageToDP('100%')},
          tabBarInactiveTintColor: 'grey',
          tabBarActiveTintColor: '#00415e',
          tabBarLabelStyle: {
            fontFamily: 'Raleway-Bold',
            fontSize: widthPercentageToDP('3%'),
          },
        }}>
        <Tab.Screen
          name="All"
          component={All}
          options={{
            unmountOnBlur: true,
            headerShown: false,
            tabBarIndicatorStyle: {color: '#00415e'},
            tabBarLabel: 'Article',

            tabBarColor: '#fff',
          }}
        />
        <Tab.Screen
          name="Cures"
          component={Published}
          options={{
            unmountOnBlur: true,
            headerShown: false,
            tabBarIndicatorStyle: {color: '#00415e'},
            tabBarLabel: 'Cures',
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
