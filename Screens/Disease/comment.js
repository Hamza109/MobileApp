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
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { KeyboardAvoidingView } from 'react-native';
import { Card } from 'react-native-paper';
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
      <View style={{flex:1}}>
      <View style={{height:hp('8%'),width:wp('100%'),padding:3}}> 
        <View style={{flex:1}}>
            <View style={{flexDirection:'row'}}>
  
                    <TextInput 
                      style={[styles.textInput, {
                          height: hp('7%'),
                         paddingHorizontal:10,
                          width:wp('80%'),
                          backgroundColor:'lightgrey',
                          fontSize: 15
                      }]}
                    autoFocus
                    value={cmtText}
                    placeholderTextColor='darkgrey'
                    placeholder='comment'
                    onChangeText={(e) => {
                        setCmtText(e)
                    }}
                   
                    
                        />
                     
                      
                    
                    {
                            succAlert?
                            <Text style={[s.alertText,s.alertSuccText]}>comment  successfully!!</Text>
                                : null
                        }
                  
                        <TouchableOpacity style={[s.btnTouchable,s.btn,s.btnSecondary,styles.button]}  onPress={(e) => postComment(e)}>
                 
                            <Text style={[s.btnText,s.btnPrimaryText]}>post</Text>
                      
                        </TouchableOpacity>
                        </View>
                    </View>
                    </View>
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
  button:{height:hp('7%'),width:wp('15%')},
  
    text:{
        backgroundColor:'#00415e',
        color:'#fff',
          textAlign:'center',
        
      },
   
  });
