import React from 'react'
import { View } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import FeedStack from '../Stacks/FeedStack'
import { DOCTOR_TAB, FEED_TAB, PROFILE_TAB, SEARCH_TAB } from '../../routes'
import ActiveFeed from "../../assets/img/ACTIVE_FEED.svg"
import InactiveFeed from '../../assets/img/INACTIVE_FEED.svg'
import ActiveDoctor from "../../assets/img/ACTIVE_DOCTOR.svg"
import InActiveDoctor from "../../assets/img/INACTIVE_DOCTOR.svg"
import ActiveSearch from '../../assets/img/ACTIVE_SEARCH.svg'
import InactiveSearch from '../../assets/img/INACTIVE_SEARCH.svg'
import DoctorStack from '../Stacks/DoctorStack'
import SearchStack from '../Stacks/SearchStack'
import ProfileStack from '../Stacks/ProfileStack'


const BottomTabNavigator = () => {

const BottomTab=createBottomTabNavigator()

  return (
   <>
    <BottomTab.Navigator
  
    screenOptions={{


     
        headerShown:false,
    
       
 
    }}
    >
        <BottomTab.Screen
         name={FEED_TAB} 
         component={FeedStack}  
         options={{
            tabBarLabel:'',
           
            tabBarIcon: ({ focused })=>(
       focused?
       
      <View style={{marginTop:9}}><ActiveFeed width={16} height={20} /></View>:
      <View style={{marginTop:9}}><InactiveFeed width={16} height={20} /></View>
            
            )
         }}
         
     
         />

    <BottomTab.Screen
         name={DOCTOR_TAB} 
         component={DoctorStack}  
         options={{
            
            tabBarLabel:'',
            tabBarIcon: ({ focused })=>(
                focused?
                <View style={{marginTop:9}}><ActiveDoctor width={20} height={20} /></View>:
                <View style={{marginTop:9}}><InActiveDoctor width={20} height={20} /></View>
            )
         }}
         
     
         />

<BottomTab.Screen
         name={SEARCH_TAB} 
         component={SearchStack}  
         options={{
            tabBarLabel:'',
            tabBarIcon: ({ focused })=>(
                focused?
                <View style={{marginTop:9}}><ActiveSearch width={20} height={20} /></View>:
                <View style={{marginTop:9}}><InactiveSearch width={20} height={20} /></View>
            
            )
         }}
         
     
         />

<BottomTab.Screen
         name={PROFILE_TAB} 
         component={ProfileStack}  
         options={{
            tabBarLabel:'',
            tabBarIcon: ({ focused })=>(
                focused?
                <View style={{marginTop:9}}><ActiveFeed width={16} height={20} /></View>:
                <View style={{marginTop:9}}><InactiveFeed width={16} height={20} /></View>
            
            )
         }}
         
     
         />
    </BottomTab.Navigator>

   </>
  )
}

export default BottomTabNavigator