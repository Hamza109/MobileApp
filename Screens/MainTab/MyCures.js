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
  Box,
} from 'native-base';
import CenterWell from '../Disease/CenterWell';
import { useIsFocused } from '@react-navigation/native';
import { backendHost } from '../../components/apiConfig';
import { useNavigation } from '@react-navigation/native';
const bootstrapStyleSheet = new BootstrapStyleSheet();
const { s, c } = bootstrapStyleSheet;

const MyCures = () => {
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
    if(isFocus)
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
                        imageLoc = 'https://all-cures.com:444/'
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
                            
                            <AllPost
                             
                             id = {i.article_id}
                             title = {i.title}
                             f_title = {i.friendly_name}
                             w_title = {i.window_title}
                             allPostsContent={() => receivedData()}
                         />
                            <View style={{flex:1}}>
                
           <HStack>
                                <Text  style={{
            color: '#00415e',
            position:'absolute',
            bottom:18,
            fontFamily:'Raleway-Bold',
            fontSize: 10,
          
         
          }}>{i.authors_name} </Text>
          <Text style={{
            color: '#00415e',
          
            fontFamily:'Raleway-Bold',
            fontSize: 10,
            position:'absolute',
            bottom:6,
            
          
            
          }}>{i.published_date}</Text>
               <Card style={[styles.publish,styles.opacity]}>
                   
                   <Text style={{textAlign:'center',color:'white',fontSize:10}}>Published</Text>
                  
                   </Card>  
          </HStack>
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
                            
                            <AllPost
                             
                             id = {i.article_id}
                             title = {i.title}
                             f_title = {i.friendly_name}
                             w_title = {i.window_title}
                             allPostsContent={() => receivedData()}
                         />
                            <View style={{flex:1}}>
                
           <HStack>
                                <Text  style={{
            color: '#00415e',
            position:'absolute',
            bottom:18,
            fontFamily:'Raleway-Bold',
            fontSize: 10,
          
         
          }}>{i.authors_name} </Text>
          <Text style={{
            color: '#00415e',
          
            fontFamily:'Raleway-Bold',
            fontSize: 10,
            position:'absolute',
            bottom:6,
            
          
            
          }}>{i.create_date}</Text>
               <Card style={[styles.review,styles.opacity]}>
                   
                   <Text style={{textAlign:'center',color:'white',fontSize:10}}>Review</Text>
                  
                   </Card>  
          </HStack>
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
                            
                            <AllPost
                             
                             id = {i.article_id}
                             title = {i.title}
                             f_title = {i.friendly_name}
                             w_title = {i.window_title}
                             allPostsContent={() => receivedData()}
                         />
                            <View style={{flex:1}}>
                
           <HStack>
                                <Text  style={{
            color: '#00415e',
            position:'absolute',
            bottom:18,
            fontFamily:'Raleway-Bold',
            fontSize: 10,
          
         
          }}>{i.authors_name} </Text>
          <Text style={{
            color: '#00415e',
          
            fontFamily:'Raleway-Bold',
            fontSize: 10,
            position:'absolute',
            bottom:6,
            
          
            
          }}>{i.create_date}</Text>
               <Card style={[styles.work,styles.opacity]}>
                   
                   <Text style={{textAlign:'center',color:'white',fontSize:10}}>Overview</Text>
                  
                   </Card>  
          </HStack>
                            </View>
                        </View>
                        </HStack>
                        </Card>
                    </View>
                </View>:null
                )}
                
                // : null
                
                )
            }

              </ScrollView>  


        
      </View>
    );
};

export default MyCures;

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
    opacity:0.5,
    backgroundColor:'#00415e',
    marginLeft:230,
    padding:2,
    position:'absolute',
    bottom:6,
    right:0,
  },
  review:{
    borderWidth:2,
    borderColor:'red',
    opacity:0.5,
    backgroundColor:'red',
    marginLeft:295,
    padding:2,
    position:'absolute',
    bottom:6,
    right:0,
  },
  publish:{
    borderWidth:2,
    borderColor:'green',
    opacity:0.5,

    backgroundColor:'green',
   position:'absolute',
   bottom:6,
   right:0,
    padding:2,
    opacity:0.4
  },
  opacity:{
    opacity:1
  }
});
