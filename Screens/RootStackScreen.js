import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import MainTabScreen from './MainTab/MainTab';
import SignInScreen from './login/SignIn';
import SplashScreen from './MainTab/SplashScreen';
import {useNavigation} from '@react-navigation/native';

import SearchArt from './search/SearchArticle';
import Result from './search/Result';

import SearchBar from './search/SearchBar';
import CreateScreenHome from './MainTab/CreateHome';
import Disease from './Disease/Disease';
import Verify from './login/Verify';
import ProfileScreen from './MainTab/Profile';
import DocTab from './MainTab/DocTab';
import DocResult from './search/DocResult';
import SearchDoc from './search/SearchDoc';
import SearchBarCity from './search/SearchBarCity';
import SearchDocCity from './search/SearchDocCity';
import DocResultCity from './search/DocResultCity';
import DocProfile from './MainTab/DocProfile';
import SignUpScreen from './login/SignUp';
import DrawerMenu from './MainTab/DrawerMenu';
import Icon from 'react-native-vector-icons/Ionicons';
import Subscribe from '../components/Subscribe';
import Feedback from '../components/FeedBack';
import Forgetpass from './login/ForgetPass';
import MyCures from './MainTab/MyCures';
import SubPlan from './Subscription/SubPlan';

const Stack = createStackNavigator();

const RootStack = () => {
  const navigation = useNavigation();
  const getId = async () => {
    try {
      await AsyncStorage.getItem('author').then(value1 => {
        if (value1 != null) {
          setRegId(value1);
        } else {
          navigation.navigate('SignIn');
        }
      });
    } catch (error) {
      error;
    }
  };
  return (
    <Stack.Navigator
      initialRouteName="SplashScreen"
      screenOptions={{
        headerStyle: {
          backgroundColor: '#fff',
        },
        headerTintColor: '#00415e',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}>
      <Stack.Screen
        name="SplashScreen"
        component={SplashScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Forgetpass"
        component={Forgetpass}
        options={{headerShown: false}}
      />

      <Stack.Screen
        name="CreateScreenHome"
        component={CreateScreenHome}
        options={{headerTitle: 'Create Article'}}
      />
      <Stack.Screen
        name="Result"
        component={Result}
        options={{headerShown: null, headerLeft: null}}
      />
      <Stack.Screen
        name="MainTab"
        component={DrawerMenu}
        options={{headerShown: null, headerLeft: null}}
      />
      <Stack.Screen
        name="MyCures"
        component={MyCures}
        options={{headerTitle: 'MyCures'}}
      />
      <Stack.Screen
        name="Disease"
        component={Disease}
        options={{headerShown: null, headerLeft: null}}
      />
      <Stack.Screen name="Subscribe" component={Subscribe} />
      <Stack.Screen name="Feedback" component={Feedback} />
      <Stack.Screen
        name="searchArt"
        component={SearchArt}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="docResult"
        component={DocResult}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="docResultCity"
        component={DocResultCity}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="SearchBar"
        component={SearchBar}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="SearchDocCity"
        component={SearchDocCity}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="SignIn"
        component={SignInScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="SignUp"
        component={SignUpScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          headerShown: true,
          headerLeft: () => (
            <Icon
              name="arrow-back-outline"
              style={{marginLeft: 10}}
              color={'#00415e'}
              size={28}
              onPress={() => {
                navigation.navigate('MainTab');
              }}
            />
          ),
        }}
      />
      <Stack.Screen
        name="Verify"
        component={Verify}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="DocTab"
        component={DocTab}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="DocProfile"
        component={DocProfile}
        options={{headerTitle: 'Doctor Finder'}}
      />
      <Stack.Screen
        name="SearchDoc"
        component={SearchDoc}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="SubPlan"
        component={SubPlan}
        options={{headerTitle: 'Subscription Plans'}}
      />
    </Stack.Navigator>
  );
};
export default RootStack;
