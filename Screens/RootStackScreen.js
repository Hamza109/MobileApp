import React,{useState,useEffect,useLayoutEffect} from 'react';
import { View,Image,Text } from 'react-native';
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
import Chat from './Inbox/Chat';
import Svg, { Path, Circle } from 'react-native-svg';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';



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
  const doc=useSelector((state)=>state.info.data)
  const [exist,setExist]=useState(false)
  const [url,setUrl]=useState(`http://all-cures.com:8080/cures_articleimages/doctors/${doc.rowno}.png`)

useEffect(()=>{
  console.log(doc.rowno)
  setUrl(`http://all-cures.com:8080/cures_articleimages/doctors/${doc.rowno}.png`)
  
  checkIfImage(url)
},[doc.rowno])

  const checkIfImage = imageUrl => {
    fetch(imageUrl, {method: 'HEAD', mode: 'no-cors'})
      .then(res => {
        if (res.ok) {
          setExist(true);
        } else {
          setExist(false);
        }
      })
      .catch(err => err);
  };

  function User() {
    return (
      <Svg
        xmlns="http://www.w3.org/2000/svg"
        width={40}
        height={40}
        fill="none"
        viewBox="0 0 43 43">
        <Path
          fill="#e5e5e5"
          d="M37.288 34.616A20.548 20.548 0 10.938 21.5a20.414 20.414 0 004.774 13.116l-.029.025c.103.123.22.23.326.351.132.151.275.294.411.44.412.447.835.876 1.278 1.278.135.124.275.238.411.356.47.405.954.79 1.454 1.148.065.044.124.102.188.147v-.017a20.417 20.417 0 0023.5 0v.017c.065-.045.122-.102.189-.147.499-.36.983-.743 1.454-1.148.136-.118.276-.234.41-.356.444-.404.867-.83 1.279-1.277.136-.147.277-.29.41-.441.105-.122.224-.228.327-.352l-.032-.024zM21.5 9.75a6.61 6.61 0 110 13.22 6.61 6.61 0 010-13.22zM9.76 34.616a7.338 7.338 0 017.334-7.241h8.812a7.338 7.338 0 017.334 7.241 17.537 17.537 0 01-23.48 0z"></Path>
      </Svg>)
  }

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
      
      <Stack.Screen
        name='chat'
        component={Chat}
        
        options={{
          headerTitle:`Dr. ${doc.docname_first} ${doc.docname_last}`,
        headerLeft:()=>(<View style={{flexDirection:'row'}}><IonIcon name="arrow-back-outline" style={{marginLeft:10,marginTop:Platform.OS === 'android'?5:0}} color={'#fff'} size={28} onPress={()=>{navigation.goBack()}}/>{exist?<Image source={{uri:url}} style={{width:40,height:40,borderRadius:25}} />:<User/>}</View>),
        headerStyle:{backgroundColor:'#00415e'},
        headerTintColor:'#fff', 
          }}
        />
    </Stack.Navigator>
  );
};

const DocStack =()=>{
  const navigation=useNavigation()
  const doc=useSelector((state)=>state.info.data)
  const [exist,setExist]=useState(false)
  const [url,setUrl]=useState(`http://all-cures.com:8080/cures_articleimages/doctors/${doc.rowno}.png`)

useEffect(()=>{
  console.log(doc.rowno)
  setUrl(`http://all-cures.com:8080/cures_articleimages/doctors/${doc.rowno}.png`)
  
  checkIfImage(url)
},[doc.rowno])

  const checkIfImage = imageUrl => {
    fetch(imageUrl, {method: 'HEAD', mode: 'no-cors'})
      .then(res => {
        if (res.ok) {
          setExist(true);
        } else {
          setExist(false);
        }
      })
      .catch(err => err);
  };

  function User() {
    return (
      <Svg
        xmlns="http://www.w3.org/2000/svg"
        width={40}
        height={40}
        fill="none"
        viewBox="0 0 43 43">
        <Path
          fill="#e5e5e5"
          d="M37.288 34.616A20.548 20.548 0 10.938 21.5a20.414 20.414 0 004.774 13.116l-.029.025c.103.123.22.23.326.351.132.151.275.294.411.44.412.447.835.876 1.278 1.278.135.124.275.238.411.356.47.405.954.79 1.454 1.148.065.044.124.102.188.147v-.017a20.417 20.417 0 0023.5 0v.017c.065-.045.122-.102.189-.147.499-.36.983-.743 1.454-1.148.136-.118.276-.234.41-.356.444-.404.867-.83 1.279-1.277.136-.147.277-.29.41-.441.105-.122.224-.228.327-.352l-.032-.024zM21.5 9.75a6.61 6.61 0 110 13.22 6.61 6.61 0 010-13.22zM9.76 34.616a7.338 7.338 0 017.334-7.241h8.812a7.338 7.338 0 017.334 7.241 17.537 17.537 0 01-23.48 0z"></Path>
      </Svg>)
  }
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
        name='chat'
        component={Chat}
        
        options={{
          headerTitle:`Dr. ${doc.docname_first} ${doc.docname_last}`,
        headerLeft:()=>(<View style={{flexDirection:'row'}}><IonIcon name="arrow-back-outline" style={{marginLeft:10,marginTop:Platform.OS === 'android'?5:0}} color={'#fff'} size={28} onPress={()=>{navigation.goBack()}}/>{exist?<Image source={{uri:url}} style={{width:40,height:40,borderRadius:25}} />:<User/>}</View>),
        headerStyle:{backgroundColor:'#00415e'},
        headerTintColor:'#fff', 
          }}
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
  const doc=useSelector((state)=>state.info.data)
  const row=useSelector((state)=>state.docRow.rowId)
  const chatInfo=useSelector((state)=>state.chatUser.chat)
  const [exist,setExist]=useState(false)
  const [url,setUrl]=useState(`http://all-cures.com:8080/cures_articleimages/doctors/${doc.rowno}.png`)

useEffect(()=>{
  console.log('chat',chatInfo)
  setUrl(`http://all-cures.com:8080/cures_articleimages/doctors/${chatInfo.rowno}.png`)
  
  checkIfImage(url)
},[doc.rowno])

  const checkIfImage = imageUrl => {
    fetch(imageUrl, {method: 'HEAD', mode: 'no-cors'})
      .then(res => {
        if (res.ok) {
          setExist(true);
        } else {
          setExist(false);
        }
      })
      .catch(err => err);
  };

  function User() {
    return (
      <Svg
        xmlns="http://www.w3.org/2000/svg"
        width={40}
        height={40}
        fill="none"
        viewBox="0 0 43 43">
        <Path
          fill="#e5e5e5"
          d="M37.288 34.616A20.548 20.548 0 10.938 21.5a20.414 20.414 0 004.774 13.116l-.029.025c.103.123.22.23.326.351.132.151.275.294.411.44.412.447.835.876 1.278 1.278.135.124.275.238.411.356.47.405.954.79 1.454 1.148.065.044.124.102.188.147v-.017a20.417 20.417 0 0023.5 0v.017c.065-.045.122-.102.189-.147.499-.36.983-.743 1.454-1.148.136-.118.276-.234.41-.356.444-.404.867-.83 1.279-1.277.136-.147.277-.29.41-.441.105-.122.224-.228.327-.352l-.032-.024zM21.5 9.75a6.61 6.61 0 110 13.22 6.61 6.61 0 010-13.22zM9.76 34.616a7.338 7.338 0 017.334-7.241h8.812a7.338 7.338 0 017.334 7.241 17.537 17.537 0 01-23.48 0z"></Path>
      </Svg>)
  }
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
        name='chat'
        component={Chat}
        
        options={{
        headerTitle:()=>(
           row!=0?<Text style={{color:'#fff'}}>Dr {chatInfo.first_name} {chatInfo.last_name}</Text>:<Text style={{color:'#fff',fontWeight:'bold',fontSize:20}}>{chatInfo.first_name} {chatInfo.last_name}</Text>
        ),
        headerLeft:()=>(
          chatInfo.rowno!=null?(
        <View style={{flexDirection:'row'}}>
          <IonIcon name="arrow-back-outline" style={{marginLeft:10,marginTop:Platform.OS === 'android'?5:0}} color={'#fff'} size={28} onPress={()=>{navigation.navigate('inbox')}}/>
          {exist?<Image source={{uri:url}} style={{width:40,height:40,borderRadius:25}} />:<User/>}
          </View>):(
   <View style={{flexDirection:'row'}}>
   <IonIcon name="arrow-back-outline" style={{marginLeft:10,marginTop:Platform.OS === 'android'?5:0}} color={'#fff'} size={28} onPress={()=>{navigation.navigate('inbox')}}/>
<User/>
   </View>)
        ),
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
