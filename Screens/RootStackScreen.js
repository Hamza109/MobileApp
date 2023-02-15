import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import MainTabScreen from './MainTab/MainTab';
import SignInScreen from './login/SignIn';
import SplashScreen from './MainTab/SplashScreen';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
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
import Settings from './Privacy/settings'
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
import Legal from './Privacy/legal';
import Privacy from './Privacy/privacy';
import Terms from './Privacy/terms';
import About from './Privacy/about';
import Contact from './Privacy/contact';
import EditProfile from './MainTab/UserProfile/EditProfile';
import { useSelector } from 'react-redux';
import Delete from './Privacy/delete';
import Favourites from './MainTab/UserProfile/Favourites';
import All from './mycures/All';
import Inbox from './Inbox/Inbox';
import { Touchable } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';



const Stack = createStackNavigator();
const Login=createStackNavigator();

const LoginStack=()=>{
  return(
  <Login.Navigator
  initialRouteName="SignIn"
  screenOptions={{
   

    headerStyle: {
      backgroundColor: '#fff',
    
      
    },
    
    headerTintColor: '#00415e',
   
  }}>
    <Login.Screen
        name="SignIn"
        component={SignInScreen}
        
        options={{headerShown: false,gestureEnabled:false}}
      />
      <Login.Screen
        name="SignUp"
        component={SignUpScreen}
        options={{headerShown: false,gestureEnabled:false}}
      />
      <Login.Screen
        name="Forgetpass"
        component={Forgetpass}
        options={{headerShown: false}}
      />

<Login.Screen
        name="Verify"
        component={Verify}
        options={{headerShown: false}}
      />

  </Login.Navigator>
  )
}






const SplashStack=()=>{
return(
  <Stack.Navigator
      initialRouteName="SplashScreen">
<Stack.Screen
        name="SplashScreen"
        component={SplashScreen}
        options={{headerShown: false}}
      />
        
     
</Stack.Navigator>

)
}
const SettingStack=()=>{
  return(
  <Stack.Navigator
  initialRouteName="settings"
  screenOptions={{
   headerShown:false
  }}>
<Stack.Screen name='settings' component={Settings}  />
<Stack.Screen name='legal' component={Legal} />
<Stack.Screen name='privacy' component={Privacy}  />
<Stack.Screen name='terms' component={Terms}  />
<Stack.Screen name='about' component={About}  />
<Stack.Screen name='contact' component={Contact}  />
<Stack.Screen name='delete'  component={Delete} options={{presentation:'modal'}} />

  </Stack.Navigator>
  )
}

const HomeStack = () => {
  const navigation = useNavigation();

  return (
    <Stack.Navigator
      initialRouteName="Main"
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
        name="Main"
        component={MainTabScreen}
        options={{headerShown: false}}
      />
 {/* <Stack.Screen
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
      /> */}

     
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
        options={{headerShown: false,}}
      />
    
      <Stack.Screen
        name="SearchBar"
        component={SearchBar}
        options={{headerShown: false}}
      />
     
     
    
   
  
      <Stack.Screen
        name="DocProfile"
        component={DocProfile}
        options={{headerTitle: 'Doctor Finder',headerLeft:()=>(<IonIcon name="arrow-back-outline" style={{marginLeft:10}} color={'#00415e'} size={28} onPress={()=>{navigation.goBack()}}/>)}}
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
     height:Platform.OS ==='android'?60:90,

    },
    headerTintColor: '#00415e',
    headerTitleStyle: {
       marginTop:Platform.OS === 'android'?0:0
      
    },
  }}>
        <Stack.Screen
        name="DocTab"
        component={DocTab}
        options={{
          headerStyle:{backgroundColor:'#00415e'},
      headerTitle:'Doctor',
      headerTintColor:'#fff',
          headerLeft: () => (
        
            <Icon
              name="user-md"
              size={30}
              style={{marginLeft: 20, color: '#fff', marginTop:Platform.OS === 'android'?0:0}}
              backgroundColor="#fff"></Icon>
          ),
        }}
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
        options={{headerShown: true,
          headerTitle:'Doctor Finder',
    
          headerLeft: () => (
  
            <Icon
              name="user-md"
              size={30}
              style={{marginLeft: 20, color: '#00415e', marginTop:Platform.OS === 'android'?0:0}}
              backgroundColor="#fff"></Icon>
          ),
        }}
      />
      <Stack.Screen
        name="DocProfile"
        component={DocProfile}
        options={{headerTitle: 'Doctor Finder',headerLeft:()=>(<IonIcon name="arrow-back-outline" style={{marginLeft:10,marginTop:Platform.OS === 'android'?0:0}} color={'#00415e'} size={28} onPress={()=>{navigation.goBack()}}/>)}}
      />
      <Stack.Screen
        name="SearchDoc"
        component={SearchDoc}
        options={{headerShown: true,
          headerTitle:'Doctor Finder',
          headerLeft: () => (
  
            <Icon
              name="user-md"
              size={30}
              style={{marginLeft: 20, color: '#00415e', marginTop:Platform.OS === 'android'?0:0}}
              backgroundColor="#fff"></Icon>
          ),
        }}
      />
          <Stack.Screen
        name="Disease"
        component={Disease}
        options={{headerShown: false, headerLeft: null}}
      />
     
  
  </Stack.Navigator>
)
}


const ProfileStack=()=>{
  const navigation=useNavigation()
  return(
  <Stack.Navigator
      initialRouteName="profile"
      
      screenOptions={{
     
        headerStyle: {
          backgroundColor: '#fff',
          height:Platform.OS ==='android'?60:90,
        
     
  
        },
        headerTintColor: '#00415e',
        headerTitleStyle: {
          fontWeight: 'bold', marginTop:Platform.OS === 'android'?0:0
        },
      }}>
<Stack.Screen
        name='profile'
        component={ProfileScreen}
       
        options={{
          headerStyle:{backgroundColor:'#00415e'},
          headerTintColor:'#fff',
          headerTitle:'Profile',
          headerLeft:()=> 
          (
          <Icon  
          style={{marginLeft: 20, marginTop:Platform.OS === 'android'?0:0}}
           name="heartbeat"    
           color={'#fff'} 
           size={26} />
          )}}
        />
        <Stack.Screen
        name='favourite'
        component={Favourites}
        options={{title:'Favourite Articles'}}
        />
         <Stack.Screen
        name='cures'
        component={All}
        options={{title:'My Cures',      headerLeftLabelVisible:false,}}
        />
          <Stack.Screen
        name='inbox'
        component={Inbox}
        options={{title:'Inbox',
        headerStyle:{backgroundColor:'#00415e'},
        headerTintColor:'#fff', 
          }}
        />
        <Stack.Screen
        name='editprofile'
        component={EditProfile}
        
        options={{
          headerTitle: 'Edit Profile',
          headerLeft:()=>(  
          <  IonIcon name="arrow-back-outline" style={{marginLeft:10,marginTop:Platform.OS === 'android'?0:30}} color={'#00415e'} size={28} 
          onPress={()=>{navigation.push('profile')}}/>),
          presentation:'modal',
          
          
        }}
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
          height:Platform.OS ==='android'?60:80,
     
  
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
              backgroundColor="#fff"/>
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


const Navigator = () => {
  const navigation = useSelector((state) => state.name.screen);
  switch (navigation) {
      case 'LOGIN':
          return <LoginStack />
      case 'MAIN':
          return <HomeStack/>
      case 'SPLASH':
          return <SplashStack />
      default:
          return <SplashStack />
  }
}

export {DocStack,SplashStack,CuresStack,SettingStack,ProfileStack,LoginStack,Navigator,HomeStack}
