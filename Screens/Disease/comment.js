import React, { useState } from 'react';
// import CommentBox from 'react-commentbox';
import axios from 'axios';

import { backendHost } from '../../components/apiConfig';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TextInput } from 'react-native';
import BootstrapStyleSheet from 'react-native-bootstrap-styles';
import { TouchableOpacity } from 'react-native';
import { View ,Text,StyleSheet} from 'react-native';
import { useEffect } from 'react';
import { Alert } from 'react-native';

const Comment = (props) => {
   
    const bootstrapStyleSheet = new BootstrapStyleSheet();
    const { s, c } = bootstrapStyleSheet;

    const [cmtText,setCmtText] = useState()
    const [succAlert, setAlert] = useState('')
    const [regId, setRegId] = useState()
    const [regType, setRegType] = useState()
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
     useEffect(()=>{
        getId()
        getType()
    console.log('article',props.article_id)
     },[])

    const postComment = (e) => {
        e.preventDefault()

        if(cmtText != '') {
            axios.post(`${backendHost}/DoctorRatingActionController?comments=${cmtText}&ratedbyid=${regId}&ratedbytype=${regType}&targetid=${props.article_id}&targetTypeid=2&cmd=rateAsset`)
            .then(res => {
              
                Alert.alert('comment Successful')
               setCmtText('')
                // window.location.reload(false);
            })
            
            .then(err => {
                console.log(err);
            })
            
            
        }else {
            Alert.alert('Enter comment')
        }
        
    }

    return (
        <View>
            <View style={{position:'relative',top:650,right:25}}>
              
                    <TextInput 
                      style={[styles.textInput, {
                          height: 50,
                        
                          width:300,
                          backgroundColor:'lightgrey',
                          fontSize: 15
                      }]}
                    value={cmtText}
                    placeholderTextColor='darkgrey'
                    placeholder='comment'
                    onChangeText={(e) => {
                        setCmtText(e)
                    }}
                   
                    
                        />
                        </View>
                    
                    {
                            succAlert?
                            <Text style={[s.alertText,s.alertSuccText]}>comment  successfully!!</Text>
                                : null
                        }
                  
                        <TouchableOpacity style={[s.btnTouchable,s.btn,s.btnSecondary,styles.button]}  onPress={(e) => postComment(e)}>
                 
                            <Text style={[s.btnText,s.btnPrimaryText]}>post</Text>
                      
                        </TouchableOpacity>
                    </View>
     
        
    )
}
 
      
       

export default Comment; 

const styles = StyleSheet.create({
  
 
  
    textInput: {
        
     
         opacity:1,
       
         
      borderWidth:1,
      borderRadius:10,
      borderColor:'#fff',
        color:'#000',
        fontSize:20,
        
      
      
       
    },
  button:{position:'relative',top:600,left:280,height:45,width:50},
  
    text:{
        backgroundColor:'#00415e',
        color:'#fff',
          textAlign:'center',
        
      },
   
  });
