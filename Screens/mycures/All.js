import React from 'react';
import { View, Text, Button, StyleSheet,Image } from 'react-native';
import { useState } from 'react';
import { useEffect } from 'react';
import AllPost from '../search/AllPost';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BootstrapStyleSheet from 'react-native-bootstrap-styles';
import { Card } from 'react-native-paper';
import { get } from 'js-cookie';
import { ScrollView } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { TouchableHighlight } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {
  HStack,
  Stack,
  Center,
  Heading,
  NativeBaseProvider,
  Container,
  Spinner,
  Box,
} from 'native-base';
import CenterWell from '../Disease/CenterWell';
import { useIsFocused } from '@react-navigation/native';
import { backendHost } from '../../components/apiConfig';
import { useNavigation } from '@react-navigation/native';
import Review from '../mycures/Review';
import Published from '../mycures/Publish';
import Overview from '../mycures/Overview';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import AllStat from '../search/AllStat';

const bootstrapStyleSheet = new BootstrapStyleSheet();
const { s, c } = bootstrapStyleSheet;
const Tab=createMaterialTopTabNavigator()
const All = () => {
  const navigation=useNavigation();
 
  const [items,setItems]=useState([])
  const [isLoaded,setIsLoaded]=useState(false)
  const [regId, setRegId] = useState([])
  const [regType, setRegType] = useState()
  const [pubStatus, setPubStatus] = useState()
  const getId = () => {
    try {
      Promise.all(AsyncStorage.getItem('author').then(value1 => {
        console.log(value1);
        if (value1 != null) {
           setRegId(value1)
        }
        else{
          navigation.navigate('SignIn')
        }
      }));
    } catch (error) {
      console.log(error);
    }
  };

 const getType= ()=>{
   try{
    AsyncStorage.getItem('rateType')
   
  .then((value2)=>{
   console.log(value2)
      if(value2!=null)
      {
   
        setRegType(value2)
      }
   
 
  
  })
 
  } 
  catch(error)
  {
    console.log(error)
  }
 }
  const receivedData=()=>{


    fetch(`${backendHost}/article/allkv`)
    
        .then((res) => res.json())
        .then((json) => {
        setPubStatus(json.pubstatus_id)
      setIsLoaded(true)
      setItems(json)
  
        })
      }
      const isFocus= useIsFocused();
      const check=()=>{
       console.log('#########: ', regId)
          if(regId.length === 0)
          {
             // navigation.navigate('Cures',{screen:'My Cures'})
             navigation.navigate('SignIn')
        
          }
          else{
             navigation.navigate('CreateScreenHome')
          }
      }
  useEffect(()=>
  {
    if(navigation.isFocused())
    {
    getId()
    getType()
  
    receivedData()
    }
  
  },[items])
  function IsJsonValid(str) {
    try {
      JSON.parse(str);
    } catch (e) {
      return [];
    }
    return JSON.parse(str).blocks;
  }
  
  useEffect(()=> {
    if(isFocus)
{
    // check()

}
  }, [regId])

  if(!isLoaded)
  {
    return(
      <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
    <HStack space={2} justifyContent="center">
        <Spinner accessibilityLabel="Loading posts" color="#00415e" size="lg" />
        <Heading color="#00415e" fontSize="lg">
          Loading
        </Heading>
      </HStack>
      </View>
    );
    
  }
  else{
    return (
 

      <View style={styles.container}>

    
     <ScrollView style={{flex:1,marginTop:5}}>
       
     {
                    items.map((i) => {
                    var content = []
                    var imgLocation = i.content_location
                    var imageLoc = '';
                    if(i.content){
                        content = IsJsonValid(decodeURIComponent(i.content))
                    }
                    if(imgLocation && imgLocation.includes('cures_articleimages')){
                        imageLoc = 'http://all-cures.com:8080/'
                    } else {
                        imageLoc = 'https://all-cures.com:444/cures_articleimages//299/default.png'
                    }

                    var title = i.title
                    var regex = new RegExp(' ', 'g');

                    //replace via regex
                    title = title.replace(regex, '-');
                    
                    return(
                     
                      i.pubstatus_id === 3 && i.edited_by ==  regId ?
                    <View >
                    <View>
                    <Card
                          
                          style={{
                            width: wp('97%'),
                            height: hp('10.4%'),
                            backgroundColor: 'lightgrey',
                            borderRadius: 0,
                           marginBottom:5,
                            justifyContent:'center',
                    
                  
                            paddingHorizontal:5,
                            alignItems:'center'
                          }}>
                            <HStack space={1}>
        <Image source={{uri:imageLoc +imgLocation.replace('json', 'png').split('/webapps/')[1]}} style={{width:wp("42%"),height:hp('10.4%'),marginTop:0}}/>
                        <View>
                            
                            <AllStat
                             
                             id = {i.article_id}
                             title = {i.title}
                             f_title = {i.friendly_name}
                             w_title = {i.window_title}
                             allPostsContent={() => receivedData()}
                         />
                            <View style={{flex:1}}>
                
    
                            <Text  style={{
            color: '#00415e',
           
            fontFamily:'Raleway-Medium',
            fontSize: 10,
            position:'absolute',
            bottom:3,
            
          
            
          }}>{i.authors_name}   {i.published_date}</Text>
            
   
          <Card style={[styles.publish,styles.opacity]}>
                   
                   <Text style={{textAlign:'center',color:'white',fontSize:10}}>Published</Text>
                  
                   </Card>  
                            </View>
                        </View>
                        </HStack>
                        </Card>
                    </View>
                </View>: i.pubstatus_id === 2 && i.edited_by ==  regId ?
                    <View >
                    <View>
                    <Card
                          
                          style={{
                            width: wp('97%'),
                            height: hp('12.4%'),
                            backgroundColor: 'lightgrey',
                            borderRadius: 0,
                           marginBottom:5,
                            justifyContent:'center',
                    
                  
                            paddingHorizontal:5,
                            alignItems:'center'
                          }}>
                            <HStack space={1}>
        <Image source={{uri:imageLoc +imgLocation.replace('json', 'png').split('/webapps/')[1]}} style={{width:wp("42%"),height:100,marginTop:0}}/>
                        <View>
                            
                            <AllStat
                             
                             id = {i.article_id}
                             title = {i.title}
                             f_title = {i.friendly_name}
                             w_title = {i.window_title}
                             allPostsContent={() => receivedData()}
                         />
                            <View style={{flex:1}}>
                
                            <Text  style={{
            color: '#00415e',
           
            fontFamily:'Raleway-Medium',
            fontSize: 10,
            position:'absolute',
            bottom:3,
            
          
            
          }}>{i.authors_name}   {i.create_date}</Text>
             
   
          <Card style={[styles.review,styles.opacity]}>
                   
                   <Text style={{textAlign:'center',color:'white',fontSize:10}}>Review</Text>
                  
                   </Card>  
                            </View>
                        </View>
                        </HStack>
                        </Card>
                    </View>
                </View>: i.pubstatus_id === 1 && i.edited_by ==  regId ?
                    <View >
                    <View>
                    <Card
                          
                          style={{
                            width: wp('97%'),
                            height: hp('12.4%'),
                            backgroundColor: 'lightgrey',
                            borderRadius: 0,
                           marginBottom:5,
                            justifyContent:'center',
                    
                  
                            paddingHorizontal:5,
                            alignItems:'center'
                          }}>
                            <HStack space={1}>
        <Image source={{uri:imageLoc +imgLocation.replace('json', 'png').split('/webapps/')[1]}} style={{width:wp("42%"),height:100,marginTop:0}}/>
                        <View>
                            
                            <AllStat
                             
                             id = {i.article_id}
                             title = {i.title}
                             f_title = {i.friendly_name}
                             w_title = {i.window_title}
                             allPostsContent={() => receivedData()}
                         />
                            <View style={{flex:1}}>
                
                            <Text  style={{
            color: '#00415e',
           
            fontFamily:'Raleway-Medium',
            fontSize: 10,
            position:'absolute',
            bottom:3,
            
          
            
          }}>{i.authors_name}   {i.create_date}</Text>
             
     
          <Card style={[styles.work,styles.opacity]}>
                   
                   <Text style={{textAlign:'center',color:'white',fontSize:10}}>Overview</Text>
                  
                   </Card>  
                            </View>
                        </View>
                        </HStack>
                        </Card>
                    </View>
                </View>:null
                )}
                
               
                
                )
            }

              </ScrollView>  


        
      </View>
  
    )}
};

export default All;

const styles = StyleSheet.create({
  
  container: {
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center',
    backgroundColor:'#fff',
    marginTop:1
    
  },
  work:{
    borderWidth:2,
    borderColor:'#00415e',
    backgroundColor:'#00415e',
    padding:2,
    width:wp('15%'),
    position:'relative',
    left:120

 
  },
  review:{
    borderWidth:2,
    borderColor:'red',
    width:wp('15%'),
    backgroundColor:'red',
    padding:2,
    position:'relative',
    left:120

  },
  publish:{
    borderWidth:2,
    width:wp('15%'),
    borderColor:'green',
    backgroundColor:'green',
    padding:2,
    position:'relative',
    left:120
  
  },
  opacity:{
    opacity:1
  }
});
