import { StatusBar } from 'native-base'
import React, { useState, useEffect } from 'react'
import { View, Text, FlatList, StyleSheet, Pressable } from 'react-native'
import axios from 'axios'
import Svg, {Path, Circle} from 'react-native-svg';
import {backendHost} from '../../components/apiConfig';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { useDispatch,useSelector } from 'react-redux';
import { chatInfo } from '../Redux/Action';


const Inbox = () => {
  const [messages, setMessages] = useState([])
  const [data,setData]=useState([])
  const dispatch=useDispatch()
  const navigation=useNavigation()
  const Info=useSelector((state)=>state.chatUser.chat)
  const user=useSelector((state)=>state.userId.regId) ;
  const row=useSelector((state)=>state.docRow.rowId)
const message=[{"First_name":"Anil","Last_name":"Raina","User":3,"Rowno":null,"Message":"Good..","Time":"2023-01-23T09:03:10.000+00:00"},{"First_name":"Anil","Last_name":"Raina","User":3,"Rowno":null,"Message":"Good..","Time":"2023-01-23T09:03:10.000+00:00"},{"First_name":"Anil","Last_name":"Raina","User":3,"Rowno":null,"Message":"Good..","Time":"2023-01-23T09:03:10.000+00:00"},{"First_name":"Anil","Last_name":"Raina","User":3,"Rowno":null,"Message":"Good..","Time":"2023-01-23T09:03:10.000+00:00"},{"First_name":"Anil","Last_name":"Raina","User":3,"Rowno":null,"Message":"Good..","Time":"2023-01-23T09:03:10.000+00:00"},{"First_name":"Anil","Last_name":"Raina","User":3,"Rowno":null,"Message":"Good..","Time":"2023-01-23T09:03:10.000+00:00"},{"First_name":"Anil","Last_name":"Raina","User":3,"Rowno":null,"Message":"Good..","Time":"2023-01-23T09:03:10.000+00:00"}]

  function User() {
    return (
      <Svg
        xmlns="http://www.w3.org/2000/svg"
        width={55}
        height={55}
        fill="none"
        viewBox="0 0 43 43">
        <Path
          fill="#e5e5e5"
          d="M37.288 34.616A20.548 20.548 0 10.938 21.5a20.414 20.414 0 004.774 13.116l-.029.025c.103.123.22.23.326.351.132.151.275.294.411.44.412.447.835.876 1.278 1.278.135.124.275.238.411.356.47.405.954.79 1.454 1.148.065.044.124.102.188.147v-.017a20.417 20.417 0 0023.5 0v.017c.065-.045.122-.102.189-.147.499-.36.983-.743 1.454-1.148.136-.118.276-.234.41-.356.444-.404.867-.83 1.279-1.277.136-.147.277-.29.41-.441.105-.122.224-.228.327-.352l-.032-.024zM21.5 9.75a6.61 6.61 0 110 13.22 6.61 6.61 0 010-13.22zM9.76 34.616a7.338 7.338 0 017.334-7.241h8.812a7.338 7.338 0 017.334 7.241 17.537 17.537 0 01-23.48 0z"></Path>
      </Svg>)
  }
  const fetchData = async () => {

        fetch(`${backendHost}/chat/list/18`)
        .then (res =>res.json())
        .then(json=>{setData(json)
 
        }
        )

      
       .catch (err => {
        err
        throw err
      })

  
}


  useEffect(() => {
  
    fetchData()
  }, [])

 
  const handlePress = (id) => {
    console.log(`Clicked item with ID ${id}`);
    // Do something with the ID, such as navigate to a detail screen
  };

  
  const renderMessage = ({ item }) => {

    
const initiateChat=(getId,getFirstName,getLastName,rowno)=>{

  dispatch(chatInfo({first_name:getFirstName, last_name:getLastName,rowno:rowno}))
console.log(getId)
  axios.get(`${backendHost}/chat/${row===0?user:getId}/${row===0?getId:user}`)
  .then(res=>{
  console.log(res.status)
    const transformedMessages = res.data.map(message => {
      return {
        _id: Math.random().toString(36).substring(2,9),
        text: message.Message,
        createdAt: new Date(message.Time),
        user: {
          _id: message.From_id,
          name: message.From,
       
        },
      };
    });
  
  navigation.navigate('chat',{messages:transformedMessages.reverse()})
  
    }
  ).catch(err=>err)
  
  
  
  
  
  }
  
    
  
    const timeString = item.Time.slice(11, 16);

  
    function convertTo12HourFormat(timeString) {
      let [hours, minutes] = timeString.split(':');
      let period = hours < 12 ? 'AM' : 'PM';
      hours = hours % 12 || 12;
      return `${hours}:${minutes} ${period}`;
    }
    
    return (
      <View style={{flex:1,backgroundColor:'#fff'}}>
        <Pressable onPress={()=>initiateChat(item.User,item.First_name,item.Last_name,item.Rowno)}  style={styles.messageContainer} >
      {
        item.Rowno==null?
        (
<User/>
        ):(
<View>
  <Image source={{uri:`http://all-cures.com:8280/cures_articleimages/doctors/${item.Rowno}.png?d=${parseInt(Math.random()*1000)}`}}  />
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
        <Text allowFontScaling numberOfLines={1} style={styles.infoText} >my name is hamza hello my name is hamza hello my name is hamza</Text>
        <View style={styles.infoTime}>
<Text allowFontScaling >{convertTo12HourFormat(timeString)}</Text>
        </View>
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
    padding: 10,
    flexDirection:'row',
    marginTop:5,   
    alignItems:'center' 
  },
  info:{
    width:'80%',
  marginLeft:10,
  marginTop:4
  },
  infoHead:{
    fontFamily:'Raleway-Bold',
    fontSize:16,
    color:'rgba(0, 0, 0, 0.8)'
  },
  infoText:{
    width:'85%',
    marginTop:1,
    color:'rgba(0, 0, 0, 0.4)',
    fontSize:12
  },
  infoTime:{
    position:'absolute',
    top:0,
    right:0
  }
})

export default Inbox
