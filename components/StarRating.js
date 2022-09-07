import axios from 'axios';
import React, {useState, useEffect} from 'react';
import {View} from 'react-native';
import {backendHost} from './apiConfig';
import StarRating from 'react-native-star-rating';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ToastAndroid } from 'react-native';
import { useToast } from 'native-base';
import Icon from 'react-native-vector-icons/Ionicons';
import { widthPercentageToDP } from 'react-native-responsive-screen';

export default function Ratings({article_id,rowno}) {
  const [ratingValue, setRatingValue] = useState([]);
  const [showValue, setShowValue] = useState();
  const [regId, setRegId] = useState([]);
  const [copyId, setCopyId] = useState([]);
  const [disId, setDisId] = useState([]);
  const [regType, setRegType] = useState();
  const toast=useToast();
  const getId = () => {
    try {
      AsyncStorage.getItem('author').then(value1 => {
        if (value1 != null) {
          setRegId(value1);
        }
      }).catch(err=>err);;
    } catch (error) {
 error
    }
  };
  const getType = () => {
    try {
      AsyncStorage.getItem('rateType')
      .then(value2 => {
        if (value2 != null) {
          setRegType(value2);
        }
      }).catch(err=>err);;
    } catch (error) {
  error
    }
  };
  const rateId=regId.length!=0?(regId):(0)
  const postRating = rating => {

    axios
      .post(
        `${backendHost}/DoctorRatingActionController?ratingVal=${rating}&ratedbyid=${rateId}&ratedbytype=0&targetid=${article_id!==null?article_id:rowno}&targetTypeid=${article_id!==null?2:1}&cmd=rateAsset`,
      )
      .then(res => {
        if(article_id!==null)
        {
        setTimeout(()=>{
          toast.show({
            title: "Article Rated Successfully",
            status: "success",
            placement:"bottom",
            duration:2000,
            style:{borderRadius:20,width:widthPercentageToDP('70%'),marginBottom:20}
          })
        },1000)
      }else{
        setTimeout(()=>{
          toast.show({
            title: "Doctor Rated Successfully",
            status: "success",
            placement:"bottom",
            duration:2000,
            style:{borderRadius:20,width:widthPercentageToDP('70%'),marginBottom:20}
          })
        },1000)
      }
    }
        )
        
      .catch(err => err);
  };

  useEffect(() => {
    getId();
    getType();
  }, []);

  const onStarRatingPress = rating => {
    setShowValue(rating);
    postRating(rating);
  };

  return (
    <View>
      <StarRating
        disabled={false}
        starSize={25}
        maxStars={5}
        rating={showValue}
        emptyStarColor={'#00415e'}
        selectedStar={newValue => onStarRatingPress(newValue)}
        fullStarColor={'orange'}
      />
    </View>
  );
}
