import React from 'react';
import DocInfo from './DocInfo';
import DocCures from './DocCures';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import UserProfile from './UserProfile';
import About from '../../Privacy/about';
import Favourites from './Favourites';

const DocProfileTab = () => {
  const Tab = createMaterialTopTabNavigator();
  return (
    <>
      <Tab.Navigator
        initialRouteName="user"
        screenOptions={{
          tabBarIndicatorStyle: {color: '#00415e'},
          tabBarStyle: {padding: 0, width: '100%'},
          tabBarInactiveTintColor: 'grey',
          tabBarActiveTintColor: '#00415e',
          tabBarLabelStyle: {fontFamily: 'Raleway-Bold', fontSize: 12},
        }}>
        <Tab.Screen
          name="user"
          component={About}
          options={{
            unmountOnBlur: true,
            headerShown: false,
            tabBarIndicatorStyle: {color: '#00415e'},
            tabBarLabel: 'About',

            tabBarColor: '#fff',
          }}
        />
        <Tab.Screen
          name="Cures"
          component={Favourites}
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

export default DocProfileTab;
