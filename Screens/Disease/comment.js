import React, {useState} from 'react';

import axios from 'axios';

import {backendHost} from '../../components/apiConfig';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {TextInput} from 'react-native';
import BootstrapStyleSheet from 'react-native-bootstrap-styles';
import {TouchableOpacity} from 'react-native';
import {View, Text, StyleSheet} from 'react-native';
import {useEffect} from 'react';
import {Alert} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useToast} from 'native-base';
import {KeyboardAvoidingView} from 'react-native';
import {Card} from 'react-native-paper';
const Comment = ({article_id,doc_id}) => {
  const bootstrapStyleSheet = new BootstrapStyleSheet();
  const {s, c} = bootstrapStyleSheet;
  const toast = useToast();
  const [cmtText, setCmtText] = useState('');
  const [succAlert, setAlert] = useState('');
  const [regId, setRegId] = useState();
  const [regType, setRegType] = useState();
  const getId = () => {
    try {
      AsyncStorage.getItem('author').then(value1 => {
        if (value1 != null) {
          setRegId(value1);
        }
      }).catch(err=>err);;
    } catch (error) {
      error;
    }
  };
  const getType = () => {
    try {
      AsyncStorage.getItem('rateType').then(value2 => {
        if (value2 != null) {
          setRegType(value2);
        }
      }).catch(err=>err);;
    } catch (error) {
      error;
    }
  };
  useEffect(() => {
    getId();
    getType();
  }, []);

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
          `${backendHost}/DoctorRatingActionController?comments=${cmtText}&ratedbyid=${regId}&ratedbytype=${regType}&targetid=${article_id!==null?article_id:doc_id}&targetTypeid=${article_id!==null?2:1}&cmd=rateAsset`,
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
      <View style={{height: hp('8%'), width: wp('100%'), padding: 3}}>
        <View style={{flex: 1}}>
          <View style={{flexDirection: 'row'}}>
            <TextInput
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
            />

            <TouchableOpacity
              style={[s.btnTouchable, s.btn, s.btnSecondary, styles.button]}
              onPress={e => postComment(e)}>
              <Text style={[s.btnText, s.btnPrimaryText]}>post</Text>
            </TouchableOpacity>
          </View>
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
