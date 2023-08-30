import { StatusBar } from 'native-base'
import React, { useState, useEffect,useLayoutEffect } from 'react'
import { View, Text, FlatList, StyleSheet, Pressable,Image,BackHandler } from 'react-native'
import axios from 'axios'
import Svg, {Path, Circle} from 'react-native-svg';
import {backendHost} from '../../components/apiConfig';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { useDispatch,useSelector } from 'react-redux';
import { chatInfo } from '../Redux/Action';
import moment from 'moment';
import { StackActions } from '@react-navigation/native';


const Inbox = () => {
  const [messages, setMessages] = useState([])
  const [data,setData]=useState([])
  const isFocused=useIsFocused()
  const [exist,setExist]=useState(false)
  const dispatch=useDispatch()
  const navigation=useNavigation()
  const Info=useSelector((state)=>state.chatUser.chat)
  const user=useSelector((state)=>state.userId.regId) ;
  const row=useSelector((state)=>state.docRow.rowId)


  function User() {
    return (
      <Svg
        xmlns="http://www.w3.org/2000/svg"
        width={60}
        height={60}
        fill="none"
        viewBox="0 0 43 43">
        <Path
          fill="#e5e5e5"
          d="M37.288 34.616A20.548 20.548 0 10.938 21.5a20.414 20.414 0 004.774 13.116l-.029.025c.103.123.22.23.326.351.132.151.275.294.411.44.412.447.835.876 1.278 1.278.135.124.275.238.411.356.47.405.954.79 1.454 1.148.065.044.124.102.188.147v-.017a20.417 20.417 0 0023.5 0v.017c.065-.045.122-.102.189-.147.499-.36.983-.743 1.454-1.148.136-.118.276-.234.41-.356.444-.404.867-.83 1.279-1.277.136-.147.277-.29.41-.441.105-.122.224-.228.327-.352l-.032-.024zM21.5 9.75a6.61 6.61 0 110 13.22 6.61 6.61 0 010-13.22zM9.76 34.616a7.338 7.338 0 017.334-7.241h8.812a7.338 7.338 0 017.334 7.241 17.537 17.537 0 01-23.48 0z"></Path>
      </Svg>)
  }


const checkIfImage = imageUrl => {
  fetch(imageUrl, {method: 'HEAD', mode: 'no-cors'})
    .then(res => {
      if (res.ok) {
        setExist(true);
      } else {
        setExist(false);
      }
    })
    .catch(err => err);
};



const initiateChat=(getId,getFirstName,getLastName,rowno)=>{

  dispatch(chatInfo({first_name:getFirstName, last_name:getLastName,rowno:rowno}))
const data= new Promise((resolve,reject)=>{
  
 fetch(`${backendHost}/chat/${row===0?user:getId}/${row===0?getId:user}`)
  .then(res=>{

   
   resolve(res.json())
  
    }
  ).catch(err=>err)
  
})
data.then((responseData)=>{
 
const transformedMessages = responseData.map(message => {

  return {
    _id: Math.random().toString(36).substring(2,9),
    text: message.Message,
    createdAt: new Date(message.Time),
    user: {
      _id: message.From_id,     
    },
  };
});



navigation.push('chat',{messages:responseData.length!==1?transformedMessages.reverse():[],chatId:responseData[0].Chat_id,id:getId,first_name:getFirstName,last_name:getLastName})})

 
  
  
  
  
  }
  
  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
    
        navigation.dispatch(StackActions.replace('Profile'));

      return true;
    });

    return () => backHandler.remove();
  }, [navigation]);


  useLayoutEffect(() => {

    
    const fetchData = async () => {

      fetch(`${backendHost}/chat/list/${user}`)
      .then (res =>res.json())
      
      .then(json=>{
        setData(json)

      }
      )

    
     .catch (err => {
      err
      throw err
    })


}
  if(isFocused){
    fetchData()
  }

  }, [isFocused])



  
  const renderMessage = ({ item }) => {


    const now = moment();
    const messageTime = moment(item.Time);
    const diffInDays = now.diff(messageTime, 'days');
    const nowDate = now.format('DD/MM/YYYY');
    const messageDate = messageTime.format('DD/MM/YYYY');
    const yesterday = moment().subtract(1, 'days').format('DD/MM/YYYY');
  
    let displayTime;
    if (nowDate === messageDate) {
      // Show time if it's on the current day
      displayTime = messageTime.format('h:mm A');
    } else if (messageDate===yesterday) {
      // Show "Yesterday" if it's on the previous day
      displayTime = 'Yesterday';
    } else {
      // Show date in DD/MM/YYYY format if it's beyond the previous day
      displayTime = messageTime.format('DD/MM/YYYY');
    }
  
   
  const url = `http://all-cures.com:8280/cures_articleimages/doctors/${item.Rowno}.png?d=${parseInt(Math.random()*1000)}`
  checkIfImage(url)


    
  

    
    return (
      <View style={{flex:1,backgroundColor:'#fff'}}>

        <Pressable onPress={()=>initiateChat(item.User,item.First_name,item.Last_name,item.Rowno)}  style={styles.messageContainer} >
          <View style={styles.leftContainer}>
      {
        item.Rowno==null?
        (
<User/>
        ):(
<View>
  {exist?(
  <Image source={{uri:url}}  />):(
    <View>
    <User />
    </View>
  )
  }
  </View>
        )
      }


      <View style={styles.info}>
           {
            item.Rowno==null?(
        <Text allowFontScaling style={styles.infoHead} >{item.First_name} {item.Last_name}</Text>
           ):(
            <Text allowFontScaling style={styles.infoHead}>Dr. {item.First_name} {item.Last_name}</Text>
           )
           }
        <Text allowFontScaling numberOfLines={1} style={styles.infoText} >{item.Message}</Text>
        </View>
     

        </View>

        <View style={styles.infoTime}>
<Text allowFontScaling style={{   
    fontSize:13,marginRight:10,marginTop:5}} >{displayTime}</Text>
        </View>
        </Pressable>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#00415e" barStyle="light-content" />
      <FlatList
        data={data}
        style={{width:'100%'}}
        renderItem={renderMessage}
        key={Math.random()*1000}
      
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
 flex:1,
    backgroundColor: '#fff',

  },
  messageContainer: {
    padding: 8,
    width:'100%',
    flexDirection:'row',
   justifyContent:'space-between',

  },
  info:{

justifyContent:'space-around',
marginLeft:10

  },
  infoHead:{
    fontFamily:'Raleway-Bold',
    fontSize:18,
    color:'rgba(0, 0, 0, 0.8)'
  },
  infoText:{
    fontFamily:'Raleway-Medium',
    fontSize:13,
    color:'rgba(0, 0, 0, 0.4)',
    marginBottom:6
    
  },
  infoTime:{

   
  },
  leftContainer:{
    flexDirection:'row',
    width:'70%',
  }
})

export default Inbox