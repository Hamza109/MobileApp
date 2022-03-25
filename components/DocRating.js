import axios from 'axios';
import React, {useState, useEffect} from 'react';
import {View} from 'react-native';
import {backendHost} from './apiConfig';
import StarRating from 'react-native-star-rating';
import { useToast } from 'native-base';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { widthPercentageToDP,heightPercentageToDP } from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/Ionicons';
// const firstExample = {
//   size: 30,
//   value: 2.5,
//   edit: false
// };

// const secondExample = {
//   size: 50,
//   count: 10,
//   color: "black",
//   activeColor: "red",
//   value: 7.5,
//   a11y: true,
//   isHalf: true,
//   emptyIcon: <i className="far fa-star" />,
//   halfIcon: <i className="fa fa-star-half-alt" />,
//   filledIcon: <i className="fa fa-star" />,
//   onChange: newValue => {
//     console.log(`Example 2: new value is ${newValue}`);
//   }
// };

// const fourthExample = {
//   size: 60,
//   isHalf: true,
//   char: "",
//   value: 3.5,
//   onChange: newValue => {
//     console.log(`Example 4: new value is ${newValue}`);
//   }
// };

export default function DocRatings(props) {
  const [ratingValue, setRatingValue] = useState([]);
  const [showValue, setShowValue] = useState([]);
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
      });
    } catch (error) {
      console.log(error);
    }
  };
  const getType = () => {
    try {
      AsyncStorage.getItem('rateType')
      .then(value2 => {
        if (value2 != null) {
          setRegType(value2);
        }
      });
    } catch (error) {
      console.log(error);
    }
  };
  const rateId=regId.length!=0?(regId):(0)
  const postRating = rating => {
    console.log(regId)
    console.log('rate',rateId)
    axios
      .post(
        `${backendHost}/DoctorRatingActionController?ratingVal=${rating}&ratedbyid=${rateId}&ratedbytype=0&targetid=${props.rowno}&targetTypeid=1&cmd=rateAsset`,
      )
      .then(res => 
        setTimeout(()=>{
            toast.show({
              title: "Doctor Rated Successfully",
              status: "success",
              placement:"bottom",
              duration:2000,
              style:{borderRadius:20,width:widthPercentageToDP('70%'),marginBottom:20}
            })
          },1000))
      .catch(err => console.log(err));
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
