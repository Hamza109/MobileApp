import React,{useState,useEffect} from 'react';
import { View, Text, Button, StyleSheet, StatusBar,BackHandler,Alert,TouchableOpacity,Linking} from 'react-native';
import {Link, NavigationContainer } from '@react-navigation/native';
import { backendHost } from '../../components/apiConfig';
import { useNavigation } from '@react-navigation/core';
import BootstrapStyleSheet from 'react-native-bootstrap-styles';
import axios from 'axios';
import { widthPercentageToDP } from 'react-native-responsive-screen';
import { useIsFocused } from '@react-navigation/native';
const bootstrapStyleSheet = new BootstrapStyleSheet();
const { s, c } = bootstrapStyleSheet;


const AllPost = ({ id, title, f_title, w_title}) => {
  const[showValue,setShowValue]=useState([])

  const getRating = () => {

    axios.get(`${backendHost}/rating/target/${id}/targettype/2/avg`)
  
    .then(res => {
     

      setShowValue(res.data.toFixed(1))
    })
    .catch(err => err)
  }

useEffect(()=>{



  getRating()

},[])  
const isFocus=useIsFocused()
 const navigation=useNavigation()
        return (
          <View style={styles.contain}>
            <View>
           <Text  numberOfLines={2} onPress={()=>{{ navigation.push(`Disease`, {ids:`${id}`})}}} style={[styles.title]}>{title}</Text>
            </View>

            <View>
            
                         </View>
                         <View>
           
                         </View>


              </View>
               )    
  
  }
  export default AllPost



 
 
  const styles = StyleSheet.create({
    
    contain:{
     
     zIndex:999

 
      
    },
    title: {
     
        color: '#00415e',
        position:'absolute',
        top:0,
        fontFamily:'Raleway-Bold',
        fontSize: widthPercentageToDP('4%'),
     
      
        

    },
    t1:{
   
        position: 'relative',
        bottom: 10,
        right:5,
        padding : 10,
        margin: 0,
        zIndex:999
      
    
    },
    t2:{
      fontSize:12,
      fontWeight:'bold',
        position: 'relative',
        bottom: 8,
        left:18,
        padding : 10,
        margin: 0,
        zIndex:999
      
    
    }

})
