import React from "react";
import  AsyncStorage  from "@react-native-async-storage/async-storage";
import { useState,useEffect} from "react";
import { View, Text, Image, ScrollView, TextInput ,StyleSheet, SafeAreaView,FlatList,TouchableOpacity,Alert} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/core';
import { useIsFocused } from "@react-navigation/native";
import { Avatar } from "react-native-paper";
import { Dimensions } from "react-native";
import { Card } from "react-native-paper";
import axios from 'axios';
import analytics from '@react-native-firebase/analytics';
import {backendHost} from '../../components/apiConfig';
import { HStack, Stack, Center, Heading, NativeBaseProvider, Container ,Input} from "native-base"
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { moderateScale,verticalScale,scale,scalledPixel } from '../../components/Scale';
import { useStore } from 'react-redux';

const SearchArt = ()=>{
   const navigation=useNavigation();
   const [dataSource, setDataSource] = useState([]);
 const user=useStore();
  const [colors] = useState(['#84DCC6', '#FEC8C8', '#F7E4CF', '#E8DEF3']);
  const [text, setText] = useState('');
  const isearch = texts => {
    setText(texts);
    Promise.all([
      axios
        .get(`${backendHost}/isearch/combo/${text}`)

        .then(res => res.data),
    ])
      .then(diseaseData => {
        setDataSource(diseaseData);
        setSearching(true)
      })

      .catch(res => {
        console.error(res);
      });
  };


  const [searching, setSearching] = useState(false);
const [uniqueId,setUniqueId]=useState()

 
  const getDeviceInfo = () => {
    try {
      AsyncStorage.getItem('device').then(value2 => {
        if (value2 != null) {
          setUniqueId(value2);
        }
      }).catch(err=>err);;
    } catch (error) {error}
  };

  useEffect(()=>{
    getDeviceInfo()
  })

  const info=()=>{
    axios.post(`${backendHost}/data/create`,{
      'device_id': uniqueId,
      'user_id':user.getState().userId.regId,
      'event_type':'search',
      'event_value':text
    })
  }

  const result = (texts) => {

  
    info();
    
    if (texts) {
  
      analytics().setUserProperty('search_term', text);
      analytics().logEvent('search', {search_term: text});
      analytics().logSearch({search_term: `'${text}'`});

      navigation.navigate('Result', {
        texts: `${texts}`,
      });
      setText(null);
      setSearching(false)
    } else {
      setSearching(false)
      Alert.alert('type something');
    }
  };

  const onSearch = texts => {
    setText(null);
    if (texts) {
      isearch(texts);

      setSearching(true);
    } else {
      setSearching(false)
    }

  };

  const getItem = ([item]) => {
    return (
  
        <View>
          <FlatList
            data={item}
            keyExtractor={(item)=>item}
            renderItem={({item}) => (
              <TouchableOpacity
                onPress={() =>setText(item) & result(item)}>
                  <View>
                <View style={styles.itemView}>
                  <Text style={styles.itemText}>{item}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            )}
          />
        </View>

    );
  };

    return(
<SafeAreaView style={{backgroundColor:'#fff'}}>
  
      {/* <View styles={styles.flex}>
          <Card style={styles.header}>
        <Icon name="arrow-back-outline" style={{marginTop:4,marginLeft:11}}color={'#00415e'} size={35} onPress={()=>{navigation.navigate('MainTab')}}/>
      <View style={{marginTop:20}}>
        

        </View>
        </Card>

        </View> */}

    <View style={styles.header}>

 

<Icon name="arrow-back-outline" style={{alignItems:'center',marginLeft:10,}}color={'#00415e'} size={scale(35)} onPress={()=>{navigation.navigate('Main')}}/>


<Input
          placeholder="search cures"
          placeholderTextColor="#00415e"
          onChangeText={onSearch}
          onSubmitEditing={(() => setText(text)& result(text))}
          value={text}
          width={scale(320)}
          height={verticalScale('52')}
          fontFamily="Raleway-Regular"
          color="#00415e"
          borderRadius="15"
          _focus={{borderColor: 'rgba(0, 65, 94, 0.2)'}}
          backgroundColor="rgba(0, 65, 94, 0.2)"
          py="3"
          px="1"
          fontSize="18"

          InputRightElement={
            <View style={{position: 'absolute', right: 20}}>
              <Icon
                m="2"
                ml="3"
                color="#00415e"
                name="search"
                onPress={(() => setText(text)&result(text))}
                size={scale(20)}
              />
            </View>
          }
        />





</View>

<View>
{searching && (
    <View>
          <View style={{width:'100%',height:'100%',justifyContent:'center',alignItems:'center',backgroundColor:'#fff'}}>
            {dataSource.length ? (
              getItem(dataSource)
            ) : (
              <View style={{width:'100%',height:'100%',justifyContent:'center',alignItems:'center',backgroundColor:'#fff'}}>
                <View>
                  <Text></Text>
                </View>
              </View>
            )}
            </View>
          </View>
    
      )}
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
   

itemView: {
  borderBottomWidth: 0.8,
  borderBottomColor: '#00415e',


  height: verticalScale(80),
  width: scale(380),
  justifyContent: 'center',

  padding: 5,
  zIndex: 999,
},
itemText: {
  color: '#00415e',
  paddingHorizontal: 10,
  fontSize: wp('4%'),
  marginLeft: -5,

 
},
header:{
  paddingTop:Platform.OS === 'ios' ? 0 : 0,
borderColor: '#fff',
borderWidth: 0.1,
justifyContent:'flex-start',

alignItems:'center',
flexDirection:'row',
width: scale(400),
height: verticalScale(80),
elevation: 1,
backgroundColor:'#fff'

}
})