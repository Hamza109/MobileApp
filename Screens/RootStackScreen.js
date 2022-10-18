import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import MainTabScreen from './MainTab/MainTab';
import SignInScreen from './login/SignIn';
import SplashScreen from './MainTab/SplashScreen';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import SearchArt from './search/SearchArticle';
import Result from './search/Result';
import IonIcon from 'react-native-vector-icons/Ionicons';
import SearchBar from './search/SearchBar';
import CreateScreenHome from './MainTab/CreateHome';
import Disease from './Disease/Disease';
import Verify from './login/Verify';
import ProfileScreen from './MainTab/Profile';
import DocTab from './MainTab/DocTab';
import DocResult from './search/DocResult';
import SearchDoc from './search/SearchDoc';

import SearchDocCity from './search/SearchDocCity';
import DocResultCity from './search/DocResultCity';
import DocProfile from './MainTab/DocProfile';
import SignUpScreen from './login/SignUp';
import DrawerMenu from './MainTab/DrawerMenu';

import Subscribe from '../components/Subscribe';
import Feedback from '../components/FeedBack';
import Forgetpass from './login/ForgetPass';
import MyCures from './MainTab/MyCures';
import HomeScreen from './MainTab/Home';
import SubPlan from './Subscription/SubPlan';



const Stack = createStackNavigator();

const SplashStack=()=>{
  const navigation=useNavigation()
return(
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
        name="SubPlan"
        component={SubPlan}
        options={{headerShown: false}}
      />
          <Stack.Screen
        name="Main"
        key={'main'}
        component={DrawerMenu}
        options={{headerShown: false}}
      />
 <Stack.Screen
        name="SignIn"
        component={SignInScreen}
        options={{headerShown: false,gestureEnabled:false}}
      />
      <Stack.Screen
        name="SignUp"
        component={SignUpScreen}
        options={{headerShown: false,gestureEnabled:false}}
      />
      <Stack.Screen
        name="Forgetpass"
        component={Forgetpass}
        options={{headerShown: false}}
      />

     
      <Stack.Screen
        name="CreateScreenHome"
        component={CreateScreenHome}
        options={{headerTitle: 'Create Article',headerLeft:()=>(<IonIcon name="arrow-back-outline" style={{marginLeft:10}} color={'#00415e'} size={28} onPress={()=>{navigation.navigate('Main')}}/>)}}
      />
      <Stack.Screen
        name="Result"
        component={Result}
        options={{headerShown: false, headerLeft: null}}
      />
       
     
      <Stack.Screen
        name="Disease"
        component={Disease}
        options={{headerShown: false, headerLeft: null,gestureEnabled:false}}
      />
         <Stack.Screen
        name="Subscribe"
        component={Subscribe}
      
      />
         <Stack.Screen
        name="Feedback"
        component={Feedback}
      
      />
      <Stack.Screen
        name="searchArt"
        component={SearchArt}
        options={{headerShown: false}}
      />
    
      <Stack.Screen
        name="SearchBar"
        component={SearchBar}
        options={{headerShown: false}}
      />
     
     
      <Stack.Screen
        name="Profile"
        component={ProfileScreen}
        options={{headerShown: true,headerLeft:()=>(<Icon name="arrow-back-outline" style={{marginLeft:10}} color={'#00415e'} size={28} onPress={()=>{navigation.navigate('Main')}}/>)}}
      />
      <Stack.Screen
        name="Verify"
        component={Verify}
        options={{headerShown: false}}
      />
  
      <Stack.Screen
        name="DocProfile"
        component={DocProfile}
        options={{headerTitle: 'Doctor Finder',headerLeft:()=>(<IonIcon name="arrow-back-outline" style={{marginLeft:10}} color={'#00415e'} size={28} onPress={()=>{navigation.navigate('Main')}}/>)}}
      />
     
</Stack.Navigator>

)
}
const HomeStack = () => {
  const navigation = useNavigation();

  return (
    <Stack.Navigator
      initialRouteName="Home"
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
        name="Home"
        component={HomeScreen}
        options={{headerShown: false}}
      />
   
      
      
      
     
    </Stack.Navigator>
  );
};

const DocStack =()=>{
  const navigation=useNavigation()
return(
  <Stack.Navigator
  initialRouteName="DocTab"
  screenOptions={{
    headerStyle: {
      backgroundColor: '#fff',
     height:Platform.OS ==='android'?60:70,

    },
    headerTintColor: '#00415e',
    headerTitleStyle: {
      fontWeight: 'bold', marginTop:Platform.OS === 'android'?0:30
      
    },
  }}>
        <Stack.Screen
        name="DocTab"
        component={DocTab}
        options={{
      headerTitle:'Doctor',
          headerLeft: () => (
  
            <Icon
              name="user-md"
              size={30}
              style={{marginLeft: 20, color: '#00415e', marginTop:Platform.OS === 'android'?0:30}}
              backgroundColor="#fff"></Icon>
          ),
        }}
      />
          <Stack.Screen
        name="Home"
        component={HomeScreen}
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
        name="DocProfile"
        component={DocProfile}
        options={{headerTitle: 'Doctor Finder',headerLeft:()=>(<IonIcon name="arrow-back-outline" style={{marginLeft:10}} color={'#00415e'} size={28} onPress={()=>{navigation.navigate('Main')}}/>)}}
      />
      <Stack.Screen
        name="SearchDoc"
        component={SearchDoc}
        options={{headerShown: false}}
      />
          <Stack.Screen
        name="Disease"
        component={Disease}
        options={{headerShown: false, headerLeft: null}}
      />
     
  
  </Stack.Navigator>
)
}
const CuresStack =()=>{
return(
   
  <Stack.Navigator
      initialRouteName="MyCures"
      screenOptions={{
        headerStyle: {
          backgroundColor: '#fff',
          height:Platform.OS ==='android'?60:70,
     
  
        },
        headerTintColor: '#00415e',
        headerTitleStyle: {
          fontWeight: 'bold', marginTop:Platform.OS === 'android'?0:30
        },
      }}>

       <Stack.Screen
        name="MyCures"
        component={MyCures}
        options={{
        headerTitle:'My Cures',
          headerLeft: () => (
            <Icon
              name="heartbeat"
              size={30}
              style={{marginLeft: 20, color: '#00415e',marginTop:Platform.OS === 'android'?0:30}}
              backgroundColor="#fff"></Icon>
          ),
          
        }}
      />
          <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{headerShown: false}}
      />
        
  
  </Stack.Navigator>
)
}

export {DocStack, SplashStack,CuresStack,HomeStack}
