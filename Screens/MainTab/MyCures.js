import React from "react";
import  AsyncStorage  from "@react-native-async-storage/async-storage";
import { useState,useEffect} from "react";
import { View, Text, Image, ScrollView, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/core';
import { useIsFocused } from "@react-navigation/native";


const MyCures = ()=>{
    const navigation=useNavigation()
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
     const isFocused = useIsFocused();
     const check=()=>{
      console.log('#########: ', regId)
         if(regId.length === 0)
         {
            // navigation.navigate('Cures',{screen:'My Cures'})
            navigation.navigate('SignIn')
       
         }
         else{
            navigation.navigate('Cures',{Screen:'My Cures'})
         }
     }
     useEffect(() => {
         if(isFocused){
       getId()
       
         }
     })
     useEffect(()=> {
      check()
    }, [regId])
    return(
<View>
    <Text>
        HOME
    </Text>
</View>
    )
}
export default MyCures;