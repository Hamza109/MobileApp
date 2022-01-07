import React,{useEffect} from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/Ionicons';
import HomeScreen from './Home';
import MyCures from './MyCures';
import CreateScreen from './Create';
import Profile from './Profile';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Autocomplete from './Autocomplete';
import { useState } from 'react';

const HomeStack = createStackNavigator();
const MyCuresStack = createStackNavigator();
const ArticleStack=createStackNavigator()
const Tab = createMaterialBottomTabNavigator();


const MainTabScreen = () => 
{
  const [regId, setRegId] = useState([]);
    const getId= ()=>{
        try{
         AsyncStorage.getItem('author')
       .then((value1)=>{
     console.log('hello',value1)
           if(value1!=null)
           {
             setRegId(value1)
         
           }
     
         
     
       
       })
      
       } 
       catch(error)
       {
         console.log(error)
       }
     }

     const check=(navigation)=>{
         getId()
         if(regId==null)
         {
            // navigation.navigate('Cures',{screen:'My Cures'})
            navigation.navigate('SignIn')
       
         }
         else{
            navigation.navigate('SignIn')
         }
     }
     return(
    <Tab.Navigator
   
      initialRouteName="Home"
      activeColor="#00415e"
    >
      <Tab.Screen
        name="HomeTab"
        component={HomeStackScreen}
        options={{
          tabBarLabel: 'Home',
          tabBarColor: '#fff',
          tabBarIcon: ({ color }) => (
            <Icon name="home" color={'#00415e'} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Cures"
        component={MyCuresStackScreen}
        options={{
          tabBarLabel: 'My Cures',
          tabBarColor: '#fff',
          tabBarIcon: ({ color }) => (
            <Icon name="book" color={'#00415e'} size={26} onPress={()=>check} />
          ),
        }}
      />
     
      <Tab.Screen
        name="ArticleTab"
        component={ArticleStackScreen}
        options={{
          tabBarLabel: 'Article',
          tabBarColor: '#fff',
          tabBarIcon: ({ color }) => (
            <Icon name="create" color={'#00415e'} size={26} />
          ),
        }}
      />
       <Tab.Screen
        name="ProfileTab"
        component={Profile}
        options={{
          tabBarLabel: 'Profile',
          tabBarColor: '#fff',
          tabBarIcon: ({ color }) => (
            <Icon name="ios-person" color={'#00415e'} size={26} />
          ),
        }}
      />

    </Tab.Navigator>
  

     )
      }
    
      

export default MainTabScreen;




const HomeStackScreen = () =>(
<HomeStack.Navigator screenOptions={{
        headerStyle: {
        backgroundColor: '#fff',
      
        },
  headerShown:false,
        headerTintColor: '#00415e',
        headerTitle:'All Cures',
        headerTitleStyle: {
        fontWeight: 'bold'
        }
    }}>
        <HomeStack.Screen name="Home" component={HomeScreen} options={{ headerLeft: null
       
        }} />
         <HomeStack.Screen name="Create Article" component={CreateScreen} options={{
       
      }} />
</HomeStack.Navigator>
)
      ;

const MyCuresStackScreen = () => (
  
    
  

<MyCuresStack.Navigator screenOptions={{
        headerStyle: {
        backgroundColor: '#fff',
        },
        headerTintColor: '#00415e',
        headerTitleStyle: {
        fontWeight: 'bold'
        }
    }}>
      
        <MyCuresStack.Screen name="My Cures" component={MyCures} options={{
          
        
        headerLeft: () => (
            <Icon name="ios-book" size={30}  style={{marginLeft:20,color:'#00415e'}} backgroundColor="#fff" ></Icon>
         )
        }} />
</MyCuresStack.Navigator>
  
);

const ArticleStackScreen = ({navigation}) =>(
  
  <ArticleStack.Navigator screenOptions={{
          headerStyle: {
          backgroundColor: '#fff',
          },
          headerTintColor: '#00415e',
          headerTitleStyle: {
          fontWeight: 'bold'
          }
      }}>
          <ArticleStack.Screen name="Create Article" component={CreateScreen} options={{
          headerLeft: () => (
            <Icon.Button name="ios-create" size={30} iconStyle={{color:'#00415e',marginHorizontal:10}} backgroundColor="#fff" ></Icon.Button>
         )
          }} />
  </ArticleStack.Navigator>
)
