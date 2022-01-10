import React,{useState,useEffect} from 'react';
import { View,Text,StyleSheet } from 'react-native';
import { Paragraph } from 'react-native-paper';
import axios from 'axios';
import { backendHost } from '../../components/apiConfig';
const ProfileTab = ({ setModalShow, rowno, name, pSpl, hospital, state, country, acPerm, url, reload}) => {
  const[showValue,setShowValue]=useState([])
 console.log(rowno)
  const getRating = () => {

    axios.get(`${backendHost}/rating/target/${rowno}/targettype/1/avg`)
  
    .then(res => {
     
      console.log('helo:',res.data)
      setShowValue(res.data.toFixed(1))
    })
    .catch(err => console.log(err))
  }

useEffect(()=>{
  getRating()
},[])  
return(
    <View>
   
            <View>
                  <View >
                  <Text style={styles.t2}>{showValue}</Text>
                  </View>
                  <View >
                  <Text>{name}</Text>
                  <Text>{pSpl}</Text>          
                  <Text>{hospital} {state} {country}</Text>
                   <View><Paragraph style={{fontSize:10}}>“Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc sodales dolor in ante fermentum, vitae varius turpis imperdiet.”</Paragraph></View>
                  </View>
               
                </View>
   
         
    </View>
)
};

export default ProfileTab;
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
