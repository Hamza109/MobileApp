import React from "react";
import  AsyncStorage  from "@react-native-async-storage/async-storage";
import { useState,useEffect} from "react";
import { View, Text, Image, ScrollView, TextInput ,StyleSheet, SafeAreaView} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/core';
import { useIsFocused } from "@react-navigation/native";
import Autocomplete from "../MainTab/Autocomplete";
import { Avatar } from "react-native-paper";
import { Dimensions } from "react-native";
import { Card } from "react-native-paper";
import { HStack, Stack, Center, Heading, NativeBaseProvider, Container } from "native-base"
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

const SearchArt = ()=>{
   const navigation=useNavigation();
    return(
<SafeAreaView style={{backgroundColor:'#fff'}}>
  
      {/* <View styles={styles.flex}>
          <Card style={styles.header}>
        <Icon name="arrow-back-outline" style={{marginTop:4,marginLeft:11}}color={'#00415e'} size={35} onPress={()=>{navigation.navigate('MainTab')}}/>
      <View style={{marginTop:20}}>
        
        <Autocomplete />
        </View>
        </Card>

        </View> */}
        <View styles={styles.flex}>
    <Card elevation={0} style={styles.header}>

      <HStack mt="0" ml="10" space={3}alignItems="center">

<Icon name="arrow-back-outline" style={{position:'relative',left:10,alignItems:'center'}}color={'#00415e'} size={35} onPress={()=>{navigation.navigate('Main')}}/>

<Autocomplete/>




</HStack>
</Card>



    </View>
 


   </SafeAreaView>

    )
}
export default SearchArt;
const width=Dimensions.get('screen').width
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
   flex:1,
   
  },
   
flex:{
    flex:1,
   backgroundColor:'#fff'
},
header:{
  paddingTop:Platform.OS === 'ios' ? 6 : 0,
marginTop: Platform.OS === 'ios' ? 0 : 10,
marginLeft:0,
borderColor: '#fff',
borderWidth: 0.1,
alignItems: 'center',
justifyContent:'center',
width: wp('100%'),
height: 85,
elevation: 0,
backgroundColor:'#fff'

}
})