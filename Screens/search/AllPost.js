import React,{useState,useEffect} from 'react';
import { View, Text, Button, StyleSheet, StatusBar,BackHandler,Alert,TouchableOpacity,Linking} from 'react-native';
import {Link, NavigationContainer } from '@react-navigation/native';
import { backendHost } from '../../components/apiConfig';
import { useNavigation } from '@react-navigation/core';
import BootstrapStyleSheet from 'react-native-bootstrap-styles';
import axios from 'axios';

const bootstrapStyleSheet = new BootstrapStyleSheet();
const { s, c } = bootstrapStyleSheet;


const AllPost = ({ id, title, f_title, w_title}) => {
  const[showValue,setShowValue]=useState([])
  console.log(id)
  const getRating = () => {

    axios.get(`${backendHost}/rating/target/${id}/targettype/2/avg`)
  
    .then(res => {
     
      console.log('helo:',res.data)
      setShowValue(res.data.toFixed(1))
    })
    .catch(err => console.log(err))
  }

useEffect(()=>{
  getRating()
},[])  

 const navigation=useNavigation()
        return (
          <View style={styles.contain}>
            <View>
           <Text onPress={()=> navigation.navigate(`Disease`, {ids:`${id}`})} style={[styles.title]}>{title}</Text>
            </View>

            <View>
                   <Text style={styles.t1}>{w_title}</Text>
                         </View>
                         <View>
                   <Text style={styles.t2}>{showValue}</Text>
                         </View>


              </View>
               )    
  
  }
  export default AllPost



 
 
  const styles = StyleSheet.create({
    
    contain:{
      padding:0,
      margin:0,
     

 
      
    },
    title: {
     fontSize:13,
     fontWeight:'bold',

      position: 'relative',
      bottom: 3,
     left: 0,
      zIndex:999,
      // color: 'blue',
      padding : 5,
      margin: 0
    },
    t1:{
      fontSize:10,
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
