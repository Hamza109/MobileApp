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
import { useNavigation
 } from '@react-navigation/native';
import { scale, verticalScale } from '../../components/Scale';

const ProfileTab = ({rowno, firstName, lastName, primary_spl, hospital_affliated, state, country_code}) => {
   const [imageExists, setImageExists] = useState(false)
   
   const checkIfImageExits = (imageUrl) => {
      fetch(imageUrl, { method: 'HEAD', mode: 'no-cors' })
      .then(res => {
         if (res.ok) {
               setImageExists(true)
         } else {
            setImageExists(false)
         }
      }).catch(err => err);
   }
   const onError = (e) => {
    <Icon name="user-md" color={'#00415e'} size={26} />
 }
 const navigation=useNavigation();

   useEffect(() => {
      checkIfImageExits(`https://all-cures.com:444/cures_articleimages/doctors/${rowno}.png`)
   }, [])
    return(
      
         <View>
             <HStack space={2}>
    <View>
    
   < Card
                          
                          style={{
                            width: scale(120),
                            height: verticalScale(120),
                            backgroundColor: 'lightgrey',
                            borderRadius: 200,
                            marginRight:8,
                            justifyContent:'center',
                            paddingHorizontal:5,
                            alignItems:'center'
                          }}>
                            { 
                             <TouchableOpacity
                             style={{}}
                             onPress={()=>{navigation.push('DocProfile',{ids:`${rowno}`})}}
                             >
      <ImageBackground source={{uri:`http://all-cures.com:8080/cures_articleimages/doctors/${rowno}.png`}} style={{width:scale(120),height:verticalScale(120),borderRadius:200,overflow:'hidden'}}
       
    onError={(e) => onError(e)}  />
    </TouchableOpacity>
  
                            }
        </Card>
    </View>
    <View>
       <View style={{width:scale(200)}}>
         <TouchableOpacity
         style={{}}
         onPress={()=>{navigation.push('DocProfile',{ids:`${rowno}`})}}
         >

     
          <Text  style={{
            color: '#00415e',
            marginTop: 5,
            fontFamily:'Raleway-Bold',
            fontSize: scale(15),
            position: 'relative',
            bottom: 0,
         
          }}>Dr. {firstName} {lastName}</Text>
              </TouchableOpacity>
          <Text  style={{
            color: '#00415e',
            marginTop: 5,
            fontFamily:'Raleway-Medium',
            fontSize: scale(12),
            position: 'relative',
            bottom: 0,
         
          }}>{primary_spl}</Text>
          <Text style={{
            color: '#00415e',
            marginTop: 5,
            fontFamily:'Raleway-Regular',
            fontSize: scale(11),
            position: 'relative',
            bottom: 0,
         
          }}>{hospital_affliated} </Text>
            <Text style={{
            color: '#00415e',
            marginTop: 5,
            fontFamily:'Raleway-Regular',
            fontSize: scale(11),
            position: 'relative',
            bottom: 0,
             right: 4
          }}> {state} {country_code}</Text>
          
       </View>
     
    </View>
    </HStack>
 </View>
   
    )
}

export default ProfileTab;