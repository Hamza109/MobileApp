import React from 'react';
import { View, Text, Button, StyleSheet,Image } from 'react-native';
import { useState } from 'react';
import { useEffect } from 'react';
import AllPost from '../search/AllPost';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BootstrapStyleSheet from 'react-native-bootstrap-styles';
import { Card } from 'react-native-paper';
import { get } from 'js-cookie';
import { ScrollView } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { TouchableHighlight } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {
  HStack,
  Stack,
  Center,
  Heading,
  NativeBaseProvider,
  Container,
  Box,
} from 'native-base';
import CenterWell from '../Disease/CenterWell';
import { useIsFocused } from '@react-navigation/native';
import { backendHost } from '../../components/apiConfig';
import { useNavigation } from '@react-navigation/native';
import Review from '../mycures/Review';
import Published from '../mycures/Publish';
import Overview from '../mycures/Overview';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import All from '../mycures/All';

const bootstrapStyleSheet = new BootstrapStyleSheet();
const { s, c } = bootstrapStyleSheet;
const Tab=createMaterialTopTabNavigator()
const MyCures = () => {
  const navigation=useNavigation();
 
  const [items,setItems]=useState([])
  const [isLoaded,setIsLoaded]=useState(false)
  const [regId, setRegId] = useState([])
  const [regType, setRegType] = useState()
  const [pubStatus, setPubStatus] = useState()
  const getId = () => {
    try {
      Promise.all(AsyncStorage.getItem('author').then(value1 => {
        console.log(value1);
        if (value1 != null) {
           setRegId(value1)
        }
        else{
          navigation.navigate('SignIn')
        }
      }));
    } catch (error) {
      console.log(error);
    }
  };
 const getType= ()=>{
   try{
    AsyncStorage.getItem('rateType')
   
  .then((value2)=>{
   console.log(value2)
      if(value2!=null)
      {
   
        setRegType(value2)
      }
   
 
  
  })
 
  } 
  catch(error)
  {
    console.log(error)
  }
 }
  const receivedData=()=>{


    fetch(`${backendHost}/article/allkv`)
    
        .then((res) => res.json())
        .then((json) => {
        setPubStatus(json.pubstatus_id)
      setIsLoaded(true)
      setItems(json)
  
        })
      }
      const isFocus= useIsFocused();
      const check=()=>{
       console.log('#########: ', regId)
          if(regId.length === 0)
          {
             // navigation.navigate('Cures',{screen:'My Cures'})
             navigation.navigate('SignIn')
        
          }
          else{
             navigation.navigate('CreateScreenHome')
          }
      }
  
  function IsJsonValid(str) {
    try {
      JSON.parse(str);
    } catch (e) {
      return [];
    }
    return JSON.parse(str).blocks;
  }
  
  useEffect(()=> {
    if(isFocus)
{
    // check()

}
  }, [regId])
 
  
    return (
    <>
    <Tab.Navigator

  
initialRouteName="All"
screenOptions={{
tabBarStyle:{padding:0},
tabBarInactiveTintColor:'grey',
tabBarLabelStyle:{fontFamily:'Raleway-Bold',fontSize:10}

}}

>
<Tab.Screen
  name="All"
  component={All}
  options={{
    headerShown:false,
    tabBarActiveTintColor:'#00415e',
    tabBarLabel: 'All',
    tabBarColor: '#fff',
  
   
  }}
/>
<Tab.Screen
  name="Overview"
  component={Overview}
  options={{
    headerShown:false,
    tabBarActiveTintColor:'#00415e',
    activeColor:'red',

    tabBarLabel: 'Overview',
    tabBarColor: '#fff',
    
  }}
/>



 <Tab.Screen
  name="Review"
  component={Review}
  options={{
    headerShown:false,
    tabBarActiveTintColor:'#00415e',
    tabBarLabel: 'Review',
    tabBarColor: '#fff',
  
  }}
/>
<Tab.Screen
  name="Published"
  component={Published}
  options={{
    headerShown:false,
    tabBarActiveTintColor:'#00415e',
    tabBarLabel: 'Published',
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
    backgroundColor:'#fff',
    marginTop:1
    
  },
  work:{
    borderWidth:2,
    borderColor:'#00415e',
    opacity:0.5,
    backgroundColor:'#00415e',
    marginLeft:230,
    padding:2,
    position:'absolute',
    bottom:6,
    right:0,
  },
  review:{
    borderWidth:2,
    borderColor:'red',
    opacity:0.5,
    backgroundColor:'red',
    marginLeft:295,
    padding:2,
    position:'absolute',
    bottom:6,
    right:0,
  },
  publish:{
    borderWidth:2,
    borderColor:'green',
    opacity:0.5,

    backgroundColor:'green',
   position:'absolute',
   bottom:6,
   right:0,
    padding:2,
    opacity:0.4
  },
  opacity:{
    opacity:1
  }
});
