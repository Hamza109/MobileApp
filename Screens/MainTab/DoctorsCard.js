import React, {useState, useEffect} from 'react';
import {Dimensions, ImageBackground} from 'react-native';
import {
  View,

  Text,

  TouchableOpacity,

} from 'react-native';

import {

  useIsFocused,

} from '@react-navigation/native';

import Icon from 'react-native-vector-icons/FontAwesome';

import {useNavigation} from '@react-navigation/native';
import Svg, {Path, Circle} from 'react-native-svg';



const DoctorsCard = ({
  rowno,
  firstName,
  lastName,
  primary_spl,
  hospital_affliated,

}) => {
  const [imageExists, setImageExists] = useState(false);
  const [url,setUrl]=useState(`http://all-cures.com:8080/cures_articleimages/doctors/${rowno}.png`)

  const checkIfImageExits = imageUrl => {
    fetch(imageUrl, {method: 'HEAD', mode: 'no-cors'})
      .then(res => {
        if (res.ok) {
          setImageExists(true)
        } else {
          setImageExists(false)
        }
      })
      .catch(err => err);
  };

  function User() {
    return (
      <Svg
        xmlns="http://www.w3.org/2000/svg"
        width={60}
        height={60}
        fill="none"
        viewBox="0 0 43 43">
        <Path
          fill="#e5e5e5"
          d="M37.288 34.616A20.548 20.548 0 10.938 21.5a20.414 20.414 0 004.774 13.116l-.029.025c.103.123.22.23.326.351.132.151.275.294.411.44.412.447.835.876 1.278 1.278.135.124.275.238.411.356.47.405.954.79 1.454 1.148.065.044.124.102.188.147v-.017a20.417 20.417 0 0023.5 0v.017c.065-.045.122-.102.189-.147.499-.36.983-.743 1.454-1.148.136-.118.276-.234.41-.356.444-.404.867-.83 1.279-1.277.136-.147.277-.29.41-.441.105-.122.224-.228.327-.352l-.032-.024zM21.5 9.75a6.61 6.61 0 110 13.22 6.61 6.61 0 010-13.22zM9.76 34.616a7.338 7.338 0 017.334-7.241h8.812a7.338 7.338 0 017.334 7.241 17.537 17.537 0 01-23.48 0z"></Path>
      </Svg>)
  }


  const navigation = useNavigation();

  const isfocus = useIsFocused();
  useEffect(() => {
    setUrl(`http://all-cures.com:8080/cures_articleimages/doctors/${rowno}.png`)
    checkIfImageExits(url)
    
  }, [rowno]);
  return (
    
    <View>
      <View>
      <TouchableOpacity
      activeOpacity={.8}
            onPress={() => {
              navigation.push('DocProfile', {ids: `${rowno}`});
            }}>
        <View
          style={{
            width: 110,
            height: 110,
            backgroundColor: 'grey',
            borderRadius: 100,
            marginRight: 12,
            overflow: 'hidden',
             backgroundColor:'#00415e',
            paddingHorizontal: 5,
            alignItems: 'center',
            justifyContent:'center'
          }}>
          {
            imageExists?
            <ImageBackground
            resizeMode='stretch'
              source={{
                uri: `https://all-cures.com:444/cures_articleimages/doctors/${rowno}.png`,
              }}
              style={{
                width: 110,
                height: 110,
           
           
              }}
            />:  <Icon name="user-md" color={'#fff'} size={86} />
          }
        </View>
        </TouchableOpacity>
      </View>
      <View>
        <View style={{zIndex: 999, width: 100}}>
        
            <Text
              style={{
                color: '#00415e',
                marginTop: 5,
          
                fontFamily: 'Raleway-Medium',
                fontSize: 12,
                position: 'relative',
                bottom: 0,
                textAlign: 'center',
              }}>
              Dr. {firstName} {lastName}
            </Text>
        
          <Text
            style={{
              color: '#00415e',
              marginTop: 5,
              marginBottom:50,
              fontFamily: 'Raleway-Medium',
              fontSize: 9,
              position: 'relative',
              bottom: 0,
              textAlign: 'center',
            }}>
            {primary_spl}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default DoctorsCard;