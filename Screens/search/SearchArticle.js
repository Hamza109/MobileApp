import React from "react";
import  AsyncStorage  from "@react-native-async-storage/async-storage";
import { useState,useEffect} from "react";
import { View, Text, Image, ScrollView, TextInput ,StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/core';
import { useIsFocused } from "@react-navigation/native";
import Autocomplete from "../MainTab/Autocomplete";


const searchArt = ()=>{
   const navigation=useNavigation();
    return(
<View style={styles.container}>
  
      <View styles={styles.flex}>
          <View style={styles.header}>
        <Icon name="arrow-back-outline" style={{marginTop:4,marginLeft:11}}color={'#00415e'} size={35} onPress={()=>{navigation.navigate('MainTab')}}/>
      <View style={{marginTop:20}}>
        <Autocomplete />
        </View>
        </View>

        </View>


   </View>

    )
}
export default searchArt;
const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        height: '100%',
        width: '100%',
        alignItems: 'center',
    
      },
flex:{
    flex:1
},
header:{
flexDirection:'row',
padding: 0,
marginTop: Platform.OS === 'ios' ? 0 : -5,
borderColor: '#fff',
borderWidth: 0.1,
alignItems: 'center',
width: 400,
height: 85,
elevation: 5,
}
})