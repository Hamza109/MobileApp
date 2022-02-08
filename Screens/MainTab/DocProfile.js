import React, {useState, useEffect} from 'react';
import {
  View,
  ScrollView,
  Text,
  Button,
  StyleSheet,
  StatusBar,
  BackHandler,
  Alert,
  TouchableOpacity,
  TouchableHighlight,
  ImageBackground,
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
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import { Dimensions } from 'react-native';
import ProfileTab from '../search/ProfileTab';
import DoctorsCard from './DoctorsCard';
import { backendHost } from '../../components/apiConfig';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';


const DocProfile =({navigation,route})=>{
    const ids = route.params.ids;
    const [id,setId]=useState(ids)
    const [items,setItems]=useState([])
    const getDoc=()=>{
        fetch(`${backendHost}/DoctorsActionController?rowno=${id}&cmd=getProfile`)
        .then((res)=> res.json())
        .then((json)=>{
               setItems(json)
        })
    }
useEffect(()=>{
    getDoc()
    console.log(id)
})
return(
<View >
  
  <View styles={styles.flex}>
 



           
           <Card style={{padding: 5,margin:5,height:hp('17%'),width:wp('96%'),backgroundColor:'lightgrey',padding:9}}> 
              <HStack ml="2" space={2} alignItems="center">
              < Card
                          
                          style={{
                            width: wp('30%'),
                            height: hp('15%'),
                            backgroundColor: '#fff',
                            borderRadius: 200,
                            marginRight:8,
                            justifyContent:'center',
                          
                          
                            paddingHorizontal:5,
                            alignItems:'center'
                          }}>
                         
      <ImageBackground source={{uri:`https://all-cures.com:444/cures_articleimages/doctors/${items.rowno}.png`}} style={{width:wp('30%'),height:hp('15%'),borderRadius:200,overflow:'hidden'}}
       
  />
  
                          
        </Card>
        <View>
        <Text  style={{
            color: '#00415e',
            marginTop: 5,
            fontFamily:'Raleway-Medium',
            fontSize: 14,
            position: 'relative',
            bottom: 0,
         
          }}>Dr. {items.docname_first} {items.docname_last}</Text>
          
          <Text  style={{
            color: '#00415e',
            marginTop: 5,
            fontFamily:'Raleway-Regular',
            fontSize: 12,
            position: 'relative',
            bottom: 0,
         
          }}>{items.primary_spl}</Text>
          <Text style={{
            color: '#00415e',
            marginTop: 5,
            fontFamily:'Raleway-Regular',
            fontSize: 12,
            position: 'relative',
            bottom: 0,
         
          }}>{items.hospital_affliated} </Text>
            <Text style={{
            color: '#00415e',
            marginTop: 5,
            fontFamily:'Raleway-Regular',
            fontSize: 12,
            position: 'relative',
            bottom: 0,
             right: 4
          }}> {items.state} {items.country_code}</Text>
          </View>

              </HStack>
            </Card>
         





    </View>
 
</View>
)
}
 export default DocProfile;

const width=Dimensions.get('screen').width

const styles = StyleSheet.create({
    // container: {
    //     backgroundColor: '#fff',
    //     height: '100%',
    //     width: '100%',
    //   },
card: {
  flexDirection: 'row',
  backgroundColor: 'grey',
  width: wp('85%'),
  height: 50,
  fontSize: 20,
  fontWeight: 'bold',
  borderRadius: 15,
  position: 'relative',

  borderWidth: 1,
  shadowRadius: 35,
  shadowOffset: 50,
  elevation: 10,
  shadowColor: 'grey',
  padding: 10,
  },
  inCard: {
  
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  flex:{
    flex:1,
   
},
header:{
flexDirection:'row',
padding: 0,
marginTop: Platform.OS === 'ios' ? 0 : -7,
marginLeft:0,
borderColor: '#fff',
borderWidth: 0.1,
alignItems: 'center',
width: wp('100%'),
height: 85,
elevation: 3,
},
icon: {
  padding: 3,

  color: '#E5E5E5',
},

})