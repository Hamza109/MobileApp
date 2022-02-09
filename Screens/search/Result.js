import React,{useState,useEffect} from 'react';
import { View, Text, Button, StyleSheet, StatusBar,BackHandler,Alert,TouchableOpacity,Image} from 'react-native';
import { useTheme,Link } from '@react-navigation/native';
import AllPost from './AllPost';
import { Card } from 'react-native-paper';
import BootstrapStyleSheet from 'react-native-bootstrap-styles';
import Autocomplete from '../MainTab/Autocomplete';
import { backendHost } from '../../components/apiConfig';
import { ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import SearchArt from './SearchArticle';
import ArticleHeader from './ArticleHeader';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import StarRating from 'react-native-star-rating';
import {
  HStack,
  Stack,
  Center,
  Heading,
  NativeBaseProvider,
  Container,
  Box,
} from 'native-base';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import CenterWell from '../Disease/CenterWell';


const Result = ({navigation,route}) => {

 
 
  const bootstrapStyleSheet = new BootstrapStyleSheet();
const { s, c } = bootstrapStyleSheet;
  
  const texts = route.params.texts



  const { colors } = useTheme();

  const theme = useTheme();

  const [value, setValue] = useState()
// const [params] = useState(props)
 const [items,setItems]=useState([])
 const [isLoaded,setIsLoaded]=useState(false)
 

const [text,setText]=useState(texts)
function IsJsonValid(str) {
  try {
    JSON.parse(str);
  } catch (e) {
    return [];
  }
  return JSON.parse(str).blocks;
}


 const receivedData=()=>{


fetch(`${backendHost}/article/allkv`)

    .then((res) => res.json())
    .then((json) => {
  setIsLoaded(true)
  setItems(json)
console.log(json)
    })
  }
  
  
  const isearch=()=>{
 
   
    fetch(`${backendHost}/isearch/${text}`)
      
      .then((res) => res.json())
    .then((json) => {

      setItems(json)
      console.log(json)
    })
  
  
  }

  const heading=()=>
{ 

 
  // return(
  // <Text style={styles.h1}>All Blogs</Text>
  // )
  // }
  // else{
return(
  <Text style={styles.h1}>Blog related to "{text}"</Text>
)
  
}
 

useEffect(()=> {
 console.log(text.length)
  if(text.length!=0){
    console.log('Disease Post executed')
    isearch()
   
  } else {
    console.log('All Post executed')
    receivedData()
    
  }
  
}, [])
  

  
    return (
      <>
      <View style={{flex:1}}>
        <ArticleHeader/>
        <View style={{margin:6,flex:1}}>
          <ScrollView
             style={{width: wp('100%'),height:hp('100%')}}

            >
         
         {
                    items.length !== 0?
                    items.filter((i, idx) => idx < 9).map((i) => {
                    var content = []
                    var imgLocation = i.content_location
                    var imageLoc = '';
                    if(i.content){
                        content = IsJsonValid(decodeURIComponent(i.content))
                    }
                    if(imgLocation && imgLocation.includes('cures_articleimages')){
                        imageLoc = 'https://all-cures.com:444/'
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
                            height: hp('25%'),
                            backgroundColor: 'lightgrey',
                            borderRadius: 0,
                           marginBottom:5,
                            justifyContent:'center',
                    
                  
                            paddingHorizontal:5,
                            alignItems:'center'
                          }}>
                            <HStack space={1}>
        <Image source={{uri:imageLoc +imgLocation.replace('json', 'png').split('/webapps/')[1]}} style={{width:wp("42%"),height:hp('25%'),marginTop:0}}/>
                        <View>
                            
                            <AllPost
                             
                             id = {i.article_id}
                             title = {i.title}
                             f_title = {i.friendly_name}
                             w_title = {i.window_title}
                             allPostsContent={() => receivedData()}
                         />
                            <View style={{flex:1}}>
                
            <Box>
                                <Text style={{marginTop:28}}>
                                    {
                                        content?
                                            content.map((j, idx) => idx<1 && (
                                                <CenterWell
                                                    content = {j.data.content}
                                                    type = {j.type}
                                                    text = {j.data.text.substr(0, 300) + '....'}
                                                    title = {j.data.title}
                                                    message = {j.data.message}
                                                    source = {j.data.source}
                                                    embed = {j.data.embed}
                                                    caption = {j.data.caption}
                                                    alignment = {j.data.alignment}
                                                    imageUrl = {j.data.file? j.data.file.url: null}
                                                    url = {j.data.url}
                                                />
                                            ))
                                            : null
                                    }
                                 
                                </Text>
                                </Box>
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
                <Text>We do not have any cures for this condition yet but our editorial team is working on it. In the meantime, if you have a cure, Please Click Here to add the cure to our site.</Text>
            }
         
          </ScrollView>
     
        </View>
       
      </View>
    </>
     
    );
};


export default Result;

const styles = StyleSheet.create({
  // container: {
  //   backgroundColor: '#fff' ,
  //  width:'100%',
  //  height:'100%',
  //   alignItems: 'center', 
  //   justifyContent: 'center',
   
  // },
 

  card:{padding: 5,margin:10,height:hp('20%'),width:wp('95%'),backgroundColor:'aliceblue'},
 
 
 

  text:{
    backgroundColor:'#00415e',
    color:'#fff',
      textAlign:'center',
    
  },
  
  h1:{
    position: 'relative',
    bottom: 450,
    right: 0,
    fontWeight:'bold',
    padding: 0,
    margin:0
}

});
