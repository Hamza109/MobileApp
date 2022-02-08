import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/core';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StackActions } from '@react-navigation/routers';
import Icon from 'react-native-vector-icons/Ionicons';
import { Alert } from 'react-native';
import { Avatar } from 'react-native-paper';
import { useState,useEffect } from 'react';
import { useIsFocused } from '@react-navigation/native';
import { Dimensions } from 'react-native';
import { Card } from 'react-native-paper';
const ProfileScreen = () => {
  const Navigation =useNavigation()
  const [firstName,setFirstName]= useState('')
  const [lastName,setLastName]= useState('')
  const [email,setEmail] =useState('')
  const logout = () => {

    Alert.alert("Hold on!", "Are you sure you want Logout?", [
      {
        text: "Cancel",
        onPress: () => null,
        style: "cancel"
      },
      { text: "YES", onPress: () => Navigation.dispatch(StackActions.popToTop()) }
    ]);
    return true;
  
  
  };
  
  const getFirstName =  () => {
    try {
      AsyncStorage.getItem('firstName').then(value1 => {
        console.log('firstName:',value1);
        if (value1 != null) {
          setFirstName(value1);
        }
        
      });
    } catch (error) {
      console.log(error);
    }
  };
  const getLastName =  () => {
    try {
      AsyncStorage.getItem('lastName').then(value1 => {
        console.log('lastName:',value1);
        if (value1 != null) {
          setLastName(value1);
        }
        
      });
    } catch (error) {
      console.log(error);
    }
  };
  const getEmail =  () => {
    try {
      AsyncStorage.getItem('email').then(value1 => {
        console.log('email:',value1);
        if (value1 != null) {
          setEmail(value1);
        }
        
      });
    } catch (error) {
      console.log(error);
    }
  };
 const remove=async ()=>{
try{
await AsyncStorage.multiRemove(['author','rateType','firstName','lastName','email'])
  .then(()=>{
  logout()
  })
   
}
catch(error){
  console.log(error)
}

 }
 const isFocus=useIsFocused();
 useEffect(() => {
   if(isFocus)
   {
  getFirstName()
 
   }
 }, [firstName])
 useEffect(() => {
  if(isFocus)
  {
getLastName()

  }
}, [lastName])
useEffect(() => {
  if(isFocus)
  {
getEmail()

  }
}, [email])
    return (
      <View style={styles.container}>
      <Card style={styles.header}>
       
        <View style={styles.img}>
      <Avatar.Image size={110} source={require('../../assets/img/avatar.png')} />
      </View>


      <View style={{marginLeft:12}}>

      <View style={styles.flex}>
      <View style={{flexDirection:'row'}}>
       
        <Text style={styles.margin}>{firstName}</Text>
        <Text style={styles.margin}>{lastName}</Text>
        
    
</View>
<View style={{marginLeft:-19}}><Text>{email}</Text></View>
</View>
</View>
      </Card>

       
  

    
  
 
    
   

   
    <View style={{marginLeft:110,marginRight:110,marginTop:400}}>
        <Button
          title="Logout"
          onPress={() => remove()&logout() }
        />
        </View>
      
     
      </View>
    );
};

export default ProfileScreen;
const width =Dimensions.get('screen').width
const styles = StyleSheet.create({
  

  container: {
    backgroundColor: '#fff',
    flex:1,
   
  },
   img:{
     
      marginTop:25,
      marginLeft:30
   
   },
flex:{
    flex:1,
   
},
margin:{
marginTop:7,
marginLeft:5,
fontWeight:'normal',
fontSize:30,
color:'black'
},
header:{

padding: 0,
marginTop: Platform.OS === 'ios' ? 0 : -7,
marginLeft:0,
borderColor: '#fff',
borderWidth: 0.1,
alignItems:'center',
width: '100%',
height: 255,
elevation:5,
}

});
