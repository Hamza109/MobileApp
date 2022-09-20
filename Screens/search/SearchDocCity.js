import React from "react";
import  AsyncStorage  from "@react-native-async-storage/async-storage";
import { useState,useEffect} from "react";
import { View, Text, Image, ScrollView, TextInput ,StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/core';
import { useIsFocused } from "@react-navigation/native";
import Autocomplete from "../MainTab/Autocomplete";
import { Avatar } from "react-native-paper";
import { Dimensions } from "react-native";
import { Card } from "react-native-paper";
import { HStack, Stack, Center, Heading, NativeBaseProvider, Container,Input } from "native-base"
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import SearchBar from "./SearchBar";



const SearchDocCity = ()=>{
   const navigation=useNavigation();
    return(
<Container>
  

        <View >
    
     


<SearchBar placeholder='Search by city' doc={0} city={1} />








    </View>
 


   </Container>

    )
}
export default SearchDocCity;
const width=Dimensions.get('screen').width
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
   flex:1,
   
  },
   
flex:{
    flex:1,
   
},
header:{

padding: 0,
marginTop: Platform.OS === 'ios' ? 0 : -7,
marginLeft:0,
borderColor: '#fff',
borderWidth: 0.1,
alignItems: 'center',
width: wp('100%'),
height: 85,
elevation: 5,

}
})