import React, {useState} from 'react';

import axios from 'axios';

import {backendHost} from '../../components/apiConfig';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {TextInput} from 'react-native';

import BootstrapStyleSheet from 'react-native-bootstrap-styles';
import {TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Octicons'
import {View, Text, StyleSheet} from 'react-native';
import {useEffect} from 'react';
import {Alert} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {Input, useToast} from 'native-base';
import { useStore,useSelector } from 'react-redux';
const Comment = ({article_id,doc_id}) => {
  const bootstrapStyleSheet = new BootstrapStyleSheet();
  const {s, c} = bootstrapStyleSheet;
  const toast = useToast();
  const user= useStore()
  const [cmtText, setCmtText] = useState('');


  const type= useSelector((state)=>state.userType.typeId)



  const goto = () => {
    Alert.alert(
      'Comment Successful',
      'Comment will be displayed once reviewed',
    );

    return true;
  };
  const postComment = e => {
    if (cmtText !== '') {
      axios
        .post(
          `${backendHost}/DoctorRatingActionController?comments=${cmtText}&ratedbyid=${user.getState().userId.regId}&ratedbytype=${type}&targetid=${article_id!==null?article_id:doc_id}&targetTypeid=${article_id!==null?2:1}&cmd=rateAsset`,
        )
        .then(res => {
         
          goto();
          setCmtText('');
        })

        .catch(err => {
          err;
          throw err;
        });
    } else {
      Alert.alert('Enter comment');
    }
  };

  return (
    <View style={{flex: 1}}>
      <View style={{height: 50, width: '100%', padding: 3}}>
    
          <View style={{flexDirection: 'row'}}>
            <View style={{width:'90%',paddingHorizontal:5}}>
            <Input
            width={'100%'}
            backgroundColor='lightgrey'
            rounded={'3xl'}
            placeholder='comment'
            borderColor={'lightgrey'}
            _focus={{borderColor:'grey'}}
            autoFocus
            value={cmtText}
            placeholderTextColor="grey"
            onChangeText={e => {
              setCmtText(e);
            }}
            
            />
            </View>
            {/* <TextInput
              style={[
                styles.textInput,
                {
                  height: hp('7%'),
                  paddingHorizontal: 10,
                  width: wp('80%'),
                  backgroundColor: 'lightgrey',
                  fontSize: 15,
                },
              ]}
              autoFocus
              value={cmtText}
              placeholderTextColor="darkgrey"
              placeholder="comment"
              onChangeText={e => {
                setCmtText(e);
              }}
            /> */}

            <TouchableOpacity
            style={{marginTop:7}}
              onPress={e => postComment(e)}>
            <Icon  name='paper-airplane' size={33}/>
            </TouchableOpacity>
          </View>
        </View>
    </View>
  );
};

export default Comment;

const styles = StyleSheet.create({
  textInput: {
    opacity: 1,

    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#fff',
    color: '#000',
    fontSize: 20,
  },
  button: {height: hp('7%'), width: wp('15%')},

  text: {
    backgroundColor: '#00415e',
    color: '#fff',
    textAlign: 'center',
  },

});
