import React, {useState, useEffect} from 'react';
import {
  View,
  ScrollView,
  Text,
  SafeAreaView,
  Button,
  StyleSheet,
  StatusBar,
  BackHandler,
  Alert,
  TouchableOpacity,
  TouchableHighlight,
  Image,
} from 'react-native';
import {
  HStack,
  Stack,
  Center,
  Heading,
  NativeBaseProvider,
  Container,
} from 'native-base';
import {Card, Checkbox, Modal, Portal, Provider} from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons'
import { useNavigation } from '@react-navigation/native';
import { Dimensions } from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { scale, verticalScale } from '../../components/Scale';

const ArticleHeader =({placeholder,doc,city})=>{
    const navigation=useNavigation();
return(
<SafeAreaView style={styles.container}>
  
  <View styles={styles.flex}>
    <View style={styles.header}>
    <View style={styles.headBar}>
<Icon name="arrow-back-outline" style={{marginTop:7,marginRight:15,marginLeft:-15}}color={'#00415e'} size={35} onPress={()=>{doc===1||city===1?navigation.navigate('DocTab'):navigation.navigate('Main')}}/>
<TouchableOpacity
            activeOpacity={0.8}
            style={{width:'100%',paddingHorizontal:0}}
            onPress={() => {
              if(doc==1)
              {
              navigation.push('SearchDoc');
              }else if(city ==1 )
              {
                navigation.push('SearchDocCity');
              }
              else{
                navigation.navigate('searchArt');
              }
            }}>
              
            <View style={styles.card}>
              <HStack ml='2' >
              {
                    doc?(
               <Text  style={{
                fontSize: wp('4.5%'),
                color: '#00415e',
                fontFamily: 'Raleway-Regular',
              }}> {placeholder}</Text> 
                 )
                 :city?(
                  <Text  style={{
                    fontSize: wp('4.5%'),
                    color: '#00415e',
                    fontFamily: 'Raleway-Regular',
                  }}> {placeholder}</Text> 
                  )
                 :<Text style={{
                  fontSize: wp('4.5%'),
                  color: '#00415e',
                  fontFamily: 'Raleway-Regular',
                }} >search cures</Text>
                  }
               
                <Icon name="search" size={20} style={styles.icon}></Icon>
              </HStack>
            </View>
          </TouchableOpacity>
</View>
</View>



    </View>
 
</SafeAreaView>
)
}
 export default ArticleHeader;

const width=Dimensions.get('screen').width

const styles = StyleSheet.create({
    // container: {
    //     backgroundColor: '#fff',
    //     height: '100%',
    //     width: '100%',
    //   },
card: {

  backgroundColor: 'rgba(0, 65, 94, 0.2)',
  width:'100%',
    height:52,
  fontSize: 20,
  justifyContent:'center',
  borderRadius: 25,
  },
  inCard: {
  
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
//   flex:{
//     flex:1,
   
// },
header:{

marginTop: Platform.OS === 'ios' ? -17 : 0,
borderColor: '#fff',
borderWidth: 0.1,
alignItems: 'center',
width: '100%',

backgroundColor:'#fff'

},
icon: {
  justifyContent:'center',
  position: 'absolute',
  right: 10,
  color: '#00415e',
},
headBar:
{
  width:'100%',
  flexDirection:'row',
justifyContent:'space-evenly',
marginTop:12,
paddingHorizontal:35,
marginBottom:10
},

})