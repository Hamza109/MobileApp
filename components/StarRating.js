import axios from "axios";
import React,{useState,useEffect} from 'react';
import {  View } from "react-native";
import { backendHost } from "./apiConfig";
import StarRating from "react-native-star-rating";
import AsyncStorage from "@react-native-async-storage/async-storage";
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

export default function Rating(props) {


  const [ratingValue, setRatingValue] = useState([])
  const [showValue, setShowValue] = useState([])
  const [regId, setRegId] = useState([])
  const [copyId, setCopyId] = useState([])
  const [disId, setDisId] = useState([])
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
  const postRating = (rating) => {

    axios.post(`${backendHost}/DoctorRatingActionController?ratingVal=${rating}&ratedbyid=${regId}&ratedbytype=${regType}&targetid=${props.article_id}&targetTypeid=2&cmd=rateAsset`)
    .then(res => console.log(res.data))
    .catch(err => console.log(err))
  }

  const getRating = () => {

    axios.get(`${backendHost}/rating/target/${props.article_id}/targettype/2/avg`)
    .then(res => {
      console.log('helo:',res.data)
      setShowValue(res.data)
    })
    .catch(err => console.log(err))
  }

  useEffect(() => {
    getRating()
  
    getId()
    getType()
   
  },[])


const onStarRatingPress=(rating)=> {
   setShowValue(rating)
   postRating(rating)
  }


  return (
    <View style={{}}>
      
     
      <StarRating
        disabled={false}
      
        starSize={25}
        maxStars={5}
        rating={showValue}
       emptyStarColor={'#00415e'}
        selectedStar={(newValue) => onStarRatingPress(newValue)}
        fullStarColor={'orange'}
      />
  
    </View>
  );
}
