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
  Image
} from 'react-native';
import {
  HStack,
  Stack,
  Center,
  Heading,
  NativeBaseProvider,
  Container,
  VStack,
} from 'native-base';
import {Card, Checkbox, Modal, Portal, Provider} from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { Dimensions } from 'react-native';
import ProfileTab from '../search/ProfileTab';
import DoctorsCard from './DoctorsCard';
import { backendHost } from '../../components/apiConfig';

import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import AllPost from '../search/AllPost';

const Tab = createMaterialTopTabNavigator();

const DocProfile =({navigation,route})=>{

    const ids = route.params.ids;
    const [id,setId]=useState(ids)
    const [items,setItems]=useState([])
    const [articleItems,setArticleItems]=useState([])
    const [formattedValue, setFormattedValue] = useState('');
    const [regType, setRegType] = useState();
    const getDoc=()=>{
        fetch(`${backendHost}/DoctorsActionController?rowno=${id}&cmd=getProfile`)
        .then((res)=> res.json())
        .then((json)=>{
          console.log(json)
               setItems(json)
        })
    }
    const Tab = createMaterialTopTabNavigator();
    const allpost=()=>{
      fetch(`${backendHost}/article/authallkv/reg_type/1/reg_doc_pat_id/${id}`)
      .then((res) => res.json())
      .then((json) => {
        var temp = []
        json.forEach(i => {
          if (i.pubstatus_id === 3) {
            temp.push(i)
          }
         
        });
        
      setArticleItems(temp)
      })
      .catch(err =>
        {return}
      )
    }
    function IsJsonValid(str) {
      try {
        JSON.parse(str);
      } catch (e) {
        return [];
      }
      return JSON.parse(str).blocks;
    }
    
useEffect(()=>{
 
    getDoc()
   allpost();
   console.log(articleItems)

},[id])
return(
  <>       
           <View style={{flex:1,backgroundColor:'#fff'}}> 
           <Stack space={5}>
            <View >
              <HStack >
              < Card
                          
                          style={{
                            width: wp('30%'),
                            height: hp('15%'),
                            backgroundColor: '#fff',
                            borderRadius: 200,
                            position:'relative',
                            left:20,
                            justifyContent:'center',
                            paddingHorizontal:5,
                            alignItems:'center'
                          }}>
                         
      <ImageBackground source={{uri:`http://all-cures.com:8280/cures_articleimages/doctors/${items.rowno}.png`}} style={{width:wp('30%'),height:hp('15%'),borderRadius:200,overflow:'hidden'}}
       
  />
  
                          
        </Card>
      
        <View style={{position:'relative',left:30}}>
          <VStack space={1}>
        <Text  style={{
            color: '#00415e',
  
            fontFamily:'Raleway-Bold',
            fontSize: 18,
           
          
          }}>Dr. {items.docname_first} {items.docname_last}</Text>
          <HStack space={1}>
          <Icon name="ribbon" size={20}/>
       
          <Text  style={{
            color: '#00415e',
     
            fontFamily:'Raleway-Regular',
            fontSize: 12,
            width:wp('55%')
         
          }}>{items.primary_spl}</Text>
          </HStack>
          <HStack space={1}>
          <Icon name="business" size={20}/>
          <Text style={{
            color: '#00415e',
           
            fontFamily:'Raleway-Regular',
            fontSize: 12,
            position: 'relative',
            bottom: 0,
         
          }}>{items.hospital_affliated} </Text>
          </HStack>
            <Text style={{
            color: '#00415e',
           
            fontFamily:'Raleway-Regular',
            fontSize: 12,
            position: 'relative',
            bottom: 0,
             right: 4
          }}> {items.state} {items.country_code}</Text>
          </VStack>
          
          </View>
          </HStack>
          </View>
          <View>
       
          <VStack ml="2" space={1}>
<Text  style={{color:'#00415e',fontFamily:'Raleway-Bold', fontSize:12}} >About</Text>
<Text style={{fontFamily:'Raleway-Medium',fontSize:12,color:'#00415e'}} >{items.about}</Text>
<Text  style={{color:'#00415e',fontFamily:'Raleway-Bold', fontSize:12}} >Education</Text>
<Text style={{fontFamily:'Raleway-Medium',fontSize:12,color:'#00415e'}} >{items.edu_training}</Text>
<Text  style={{color:'#00415e',fontFamily:'Raleway-Bold', fontSize:12}} >Specialities</Text>

<Text  style={{color:'#00415e',fontFamily:'Raleway-Medium', fontSize:12}} >{items.primary_spl}</Text>
<Text  style={{color:'#00415e',fontFamily:'Raleway-Bold', fontSize:12}} >Cures</Text>

</VStack>
<View style={{margin:6}}>
<ScrollView
     style={{width: wp('100%'),height:hp('100%')}}

        showsVerticalScrollIndicator={false}>
            
         {
                    articleItems.length !== 0?
                    articleItems.filter((i, idx) => idx < 9).map((i) => {
                    var content = []
                    var imgLocation = i.content_location
                    var imageLoc = '';
                    if(i.content){
                        content = IsJsonValid(decodeURIComponent(i.content))
                    }
                    if(imgLocation && imgLocation.includes('cures_articleimages')){
                        imageLoc = 'http://all-cures.com:8080/'
                    } else {
                        imageLoc = 'https://all-cures.com:444/cures_articleimages//299/default.png'
                    }

                    var title = i.title
                    var regex = new RegExp(' ', 'g');

                    //replace via regex
                    title = title.replace(regex, '-');
                    return(
                    <View >
                    <View>
                    <Card
                          
                          style={{
                            width: wp('97%'),
                            height: hp('10.4%'),
                            backgroundColor: 'lightgrey',
                            borderRadius: 0,
                           marginBottom:5,
                            justifyContent:'center',
                    
                  
                            paddingHorizontal:5,
                            alignItems:'center'
                          }}>
                            <HStack space={1}>
        <Image source={{uri:imageLoc +imgLocation.replace('json', 'png').split('/webapps/')[1]}} style={{width:wp("42%"),height:hp('10.4%'),marginTop:0}}/>
                        <View>
                            
                            <AllPost
                             
                             id = {i.article_id}
                             title = {i.title}
                             f_title = {i.friendly_name}
                             w_title = {i.window_title}
                             allPostsContent={() => receivedData()}
                         />
                            <View style={{flex:1}}>
                
                                <Text  style={{
            color: '#00415e',
            position:'absolute',
            bottom:15,
            fontFamily:'Raleway-Bold',
            fontSize: 10,
          
         
          }}>{i.authors_name} </Text>
          <Text style={{
            color: '#00415e',
          
            fontFamily:'Raleway-Bold',
            fontSize: 10,
            position:'absolute',
            bottom:3,
            
          
            
          }}>{i.published_date}</Text>
                            </View>
                        </View>
                        </HStack>
                        </Card>
                    </View>
                </View>
                )}
                
                // : null
                
                ): 
                <View style={{alignItems:'center'}}>
                <Icon name="medical-outline" size={50} style={{opacity:.5}}/>
                <Text style={{textAlign:'center',fontSize:18}}>No cures yet</Text>
                </View>
            }
         
          

  </ScrollView>
</View>
</View>
          </Stack> 
         








  </View>
  
</>
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
    alignItems:'center',
    zIndex:0
   
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