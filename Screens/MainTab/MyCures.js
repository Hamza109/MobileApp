import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
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
import { backendHost } from '../../components/apiConfig';
import { useNavigation } from '@react-navigation/native';
const bootstrapStyleSheet = new BootstrapStyleSheet();
const { s, c } = bootstrapStyleSheet;

const MyCures = () => {
  const navigation=useNavigation();
 
  const [items,setItems]=useState([])
  const [isLoaded,setIsLoaded]=useState(false)
  const [regId, setRegId] = useState()
  const [regType, setRegType] = useState()
  const [pubStatus, setPubStatus] = useState()
  const getId= ()=>{
    try{
     AsyncStorage.getItem('author')
   .then((value1)=>{
 console.log(value1)
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
    console.log(json)
        })
      }
  
  useEffect(()=>
  {
    getId()
    getType()
    console.log('auth: ',regId)
    console.log('auth: ',regType)
    receivedData()
  },[])
  const status=()=>{
 
    if(pubStatus===2)
    {

    }
  }
  
    return (
    
      <View style={styles.container}>
    
    
     <ScrollView>
       
       {items.map((i) => (
        
                  i.pubstatus_id === 3 && i.edited_by == regId?
                  
                  <Card style={{padding: 10,margin:5,backgroundColor:'#b9daf1'}}> 
                  <View style={{flex:1,flexDirection:'row'}}>
                  
                 
                    <TouchableHighlight style={[styles.publish,styles.opacity]}>
                   
                   <Text style={{textAlign:'center',color:'white'}}>Published</Text>
                  
                   </TouchableHighlight>  
                    </View>
                <View style={{position:'relative',top:0,right:0}}>
                  <AllPost
                            
                            id = {i.article_id}
                            title = {i.title}
                        
                            allPostsContent={() => receivedData()}
                        />
                      </View>
                        </Card>
                      
                        :  i.pubstatus_id === 2 && i.edited_by == regId?
                        <Card style={{padding: 10,margin:5,backgroundColor:'#b9daf1'}}> 
                        <View style={{flex:1,flexDirection:'row'}}>
                        
                     
                        <TouchableHighlight style={[styles.review,styles.opacity]}>
                         
                          <Text style={{textAlign:'center',color:'white'}}>Review</Text>
                         
                          </TouchableHighlight>  
                       
                          </View>
                      <View style={{position:'relative',top:0,right:0}}>
                        <AllPost
                                  
                                  id = {i.article_id}
                                  title = {i.title}
                              
                                  allPostsContent={() => receivedData()}
                              />
                            </View>
                              </Card>:  i.pubstatus_id === 1 && i.edited_by == regId?
                        <Card style={{padding: 10,margin:5,backgroundColor:'#b9daf1'}}> 
                        <View style={{flex:1,flexDirection:'row'}}>
                        
                        <TouchableHighlight style={[styles.work,styles.opacity]} >
                         
                         <Text style={{textAlign:'center',color:'white'}}>Work in Progress</Text>
                        
                         </TouchableHighlight>  
                    
                          </View>
                      <View style={{position:'relative',top:0,right:0}}>
                        <AllPost
                                  
                                  id = {i.article_id}
                                  title = {i.title}
                              
                                  allPostsContent={() => receivedData()}
                              />
                            </View>
                              </Card>: null
                  
                  


                    ))}
              
      
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
    backgroundColor:'#fff'
    
  },
  work:{
    borderWidth:2,
    borderColor:'#00415e',
    opacity:0.5,
    backgroundColor:'#00415e',
    marginLeft:230,
    padding:2
  },
  review:{
    borderWidth:2,
    borderColor:'red',
    opacity:0.5,
    backgroundColor:'red',
    marginLeft:295,
    padding:2
  },
  publish:{
    borderWidth:2,
    borderColor:'green',
    opacity:0.5,

    backgroundColor:'green',
    marginLeft:275,
    padding:2,
    opacity:0.4
  },
  opacity:{
    opacity:1
  }
});
