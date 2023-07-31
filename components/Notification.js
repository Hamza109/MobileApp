import axios from 'axios'
import { Divider, FlatList,HStack,Stack,VStack } from 'native-base'
import React from 'react'
import { useState } from 'react'
import {Text,StyleSheet,View} from 'react-native'
import { backendHost } from './apiConfig'
import Icon from 'react-native-vector-icons/FontAwesome';
import { useEffect } from 'react'
import { scale, verticalScale } from './Scale'
import { useStore,useDispatch,useSelector } from 'react-redux'

import LottieView from 'lottie-react-native';
import MaterialIcons  from 'react-native-vector-icons/MaterialCommunityIcons'
const Notification = () => {
const [data,setData] =useState([])
const dispatch=useDispatch();
const [loading,setLoading]=useState(false)
const store=useStore();

const tips = [
    {"tip_date": "2023-06-22T11:31:49.000+00:00", "tip_id": 3, "tip_status": 0, "tip_title": "A apple a day keeps a doctor awayss", "user_id": 5},
    {"tip_date": "2022-05-24T11:32:25.000+00:00", "tip_id": 4, "tip_status": 1, "tip_title": "diksha is testing tip functionality in uat ", "user_id": 5},
    {"tip_date": "2022-10-20T11:37:23.000+00:00", "tip_id": 5, "tip_status": 1, "tip_title": "Hi I Am Diksha Pandita. I am working the tip functionality in mobile app for both android and i phone . All- Cures is a good product and i am enjoying working on it ", "user_id": 3},
    {"tip_date": "2022-05-24T11:37:23.000+00:00", "tip_id": 7, "tip_status": 1, "tip_title": "hi arnav is good boy", "user_id": 4},
    {"tip_date": "2022-05-24T04:37:23.000+00:00", "tip_id": 8, "tip_status": 0, "tip_title": "diksha hamza", "user_id": 6}
  ];

const getTip=async ()=>
 {


   await axios.get(`${backendHost}/tip/get`)
    
   .then(res => {

   setData(res.data)
   setLoading(true)

   })
   .catch(error=>{
     console.log(error)
   })
}
   
    

// const DATA=[{name:'#tip1', info:'apple a day keeps doc away',id:1},
// {name:'#tip2', info:'apple a day keeps doc away',id:1},
// {name:'#tip3', info:'apple a day keeps doc away',id:1}
// ]


const today = new Date().toISOString().split('T')[0]; 

useEffect(()=> {
   getTip()
 console.log(today)

  },[data])




const renderTipItem=({item})=> {
    console.log(item.tip_date.split('T')[0])
    return (
        <View style={[styles.tipView,{backgroundColor:item.tip_date.startsWith(today)?'aliceblue':'white'}]}>
            <HStack space={6} ml='7'>
                <View style={styles.tipIcon}>
<MaterialIcons name="book" style={{display:item.tip_date.startsWith(today)?'flex':'none'}} size={scale(22)} color="#00415e"  />
</View>

<View style={styles.tipBody}>
<Text  style={styles.tipTitle}>
    {item.tip_title}
</Text>
<Text style={styles.tipDate}>
    {item.tip_date.split('T')[0]}
</Text>
</View>

</HStack>

        </View>
    )
}

// if(!loading){
// return(
//     <View style={styles.loading}>
//     <HStack space={2} justifyContent="center">
//       <LottieView
//         source={require('../assets/animation/load.json')}
//         autoPlay
//         loop
//         style={{width: 50, height: 50, justifyContent: 'center'}}
//       />
//     </HStack>
//   </View>
// )
// }


  return (
    <View>
        <View>
            <FlatList 
            inverted 
                data={data.reverse()}       
               renderItem={renderTipItem}
            />
        </View>
    
    </View>
    
  )

}

export default Notification
const styles=StyleSheet.create(
    {
        tipView:{
      
            height:verticalScale(130),
            width:scale(400),
            alignItems:'center',
            flexDirection:"row" ,
            borderBottomWidth:.3
        },
        tipTitle:{
            fontFamily:"Raleway-Medium",
            fontSize:scale(14),
            maxWidth:scale(280)

        },
        tipDate:{
            fontFamily:"Raleway-Light"
        },
        tipBody:{
         
            flexDirection:'column',
            height:verticalScale(110),
            justifyContent:'space-evenly'
    
        }
        ,
        tipIcon:{
           justifyContent:'center',
           height:verticalScale(100)
            
        },
        loading: {
            justifyContent: 'center',
            backgroundColor: '#e5e5e5',
            position: 'absolute',
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
            zIndex: 999,
            alignItems: 'center',
          },

    }
)