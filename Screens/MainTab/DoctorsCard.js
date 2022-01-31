import React, {useState, useEffect} from 'react';
import {Dimensions, ImageBackground} from 'react-native';
import {
  View,
  ScrollView,
  Text,
  Button,
  FlatList,
  StyleSheet,
  StatusBar,
  BackHandler,
  Alert,
  TouchableOpacity,
  TouchableHighlight,
  Image,
} from 'react-native';
import ArticleHeader from '../search/ArticleHeader';
import {useRef} from 'react';
import {useIsFocused, useTheme} from '@react-navigation/native';
import axios from 'axios';
import Autocomplete from './Autocomplete';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  Card,
  Checkbox,
  Modal,
  Paragraph,
  Portal,
  Provider,
} from 'react-native-paper';
import AllPost from '../search/AllPost';
import Icon from 'react-native-vector-icons/FontAwesome';
import PhoneInput from 'react-native-phone-number-input';
import {
  HStack,
  Stack,
  Center,
  Heading,
  NativeBaseProvider,
  Container,
  Box,
} from 'native-base';
import {backendHost} from '../../components/apiConfig';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const DoctorsCard = ({rowno, firstName, lastName, primary_spl, hospital_affliated, state, country_code}) => {
   const [imageExists, setImageExists] = useState(false)
   
   const checkIfImageExits = (imageUrl) => {
      fetch(imageUrl, { method: 'HEAD', mode: 'no-cors' })
      .then(res => {
         if (res.ok) {
               setImageExists(true)
         } else {
            setImageExists(false)
         }
      }).catch(err => null);
   }
   const onError = (e) => {
    <Icon name="user-md" color={'#00415e'} size={26} />
 }

   useEffect(() => {
      checkIfImageExits(`https://all-cures.com:444/cures_articleimages/doctors/${rowno}.png`)
   }, [])
    return(
      
         <View>
    <View>
   < Card
                          
                          style={{
                            width: wp('30%'),
                            height: hp('15%'),
                            backgroundColor: '#00415e',
                            borderRadius: 200,
                            marginRight:8,
                            justifyContent:'center',
                          
                          
                            paddingHorizontal:5,
                            alignItems:'center'
                          }}>
      <ImageBackground source={{uri:`https://all-cures.com:444/cures_articleimages/doctors/${rowno}.png`}} style={{width:wp('30%'),height:hp('15%'),borderRadius:200,overflow:'hidden'}} 
    onError={(e) => onError(e)}  />
        </Card>
    </View>
    <View>
       <View style={{zIndex:999,width:wp('31%')}}>
          <Text  style={{
            color: '#00415e',
            marginTop: 5,
            fontFamily:'Raleway-Medium',
            fontSize: 13,
            position: 'relative',
            bottom: 0,
            textAlign: 'center',
          }}>Dr. {firstName} {lastName}</Text>
          <Text  style={{
            color: '#00415e',
            marginTop: 5,
            fontFamily:'Raleway-Medium',
            fontSize: 13,
            position: 'relative',
            bottom: 0,
            textAlign: 'center',
          }}>{primary_spl}</Text>
          {/* <Text>{hospital_affliated} {state} {country_code}</Text> */}
       </View>
       {/* <Link to={ `/profile/${rowno}` } className="appointmentBtn allBtn" id="visitDoc">Visit Profile</Link> */}
    </View>
 </View>
   
    )
}

export default DoctorsCard;