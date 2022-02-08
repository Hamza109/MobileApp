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
import CenterWell from '../Disease/CenterWell';
import Heart from '../../assets/img/heart.png';
import Carousel from 'react-native-snap-carousel';

const ArticlePreview = () => {
  const [items, setItems] = useState([]);
  const [isLoaded, setLoaded] = useState(false);

  function diseasePosts(type) {
    // For specific blogs like "/blogs/diabetes"
    // if(type){
    fetch(`${backendHost}/isearch/${type}`)
      .then(res => res.json())
      .then(json => {
        setLoaded(true);
        setItems(json);
      })
      .catch(err => null);
  }

  function allPosts() {
    // For all available blogs "/blogs"
    fetch(`${backendHost}/article/allkv?limit=15`)
      .then(res => res.json())
      .then(json => {
        var temp = [];

        json.forEach(i => {
          if (i.pubstatus_id === 3 && i.type.includes(2)) {
            temp.push(i);
          }
        });
        setItems(temp);

        setLoaded(true);
      })
      .catch(err => null);
  }

  function IsJsonValid(str) {
    try {
      JSON.parse(str);
    } catch (e) {
      return [];
    }
    return JSON.parse(str).blocks;
  }

  useEffect(() => {
    allPosts();
  }, []);
  function renderItemArt({item, index}) {
    const {friendly_name, source, content} = item;

    return (
      <View>
        <View style={{marginRight: 25,width:wp('100%'),height:hp('20%')}}>
          {/* {items
            .filter((i, idx) => idx < 9)
            .map(
              i => {
                <View><Text>kjasnkjnaks</Text></View>
              },

              // : null
            )} */}
 <View>
                          <Paragraph>
                            <Card
                              style={{
                                width: wp('90%'),
                                height: hp('25%'),
                                backgroundColor: '#00415e',
                                borderRadius: 20,
                                marginRight:5
                              }}>
                            
                            </Card>
                          </Paragraph>
                        </View>
        </View>
      </View>
    );
  }
  function renderItem() {
    const {authors_name, source, color} = items;
    return (
      <View style={{marginRight: 13}}>
        <Card
          style={{
            width: wp('90%'),
            height: hp('25%'),
            backgroundColor: '#00415e',
            borderRadius: 20,
          }}>
          <Image
            style={{
              alignContent: 'center',
              width: wp('24%'),
              height: hp('15%'),
              position: 'relative',
              top: 42,
              left: 11,
            }}
            source={source}
          />
          <Text
            style={{
              color: '#fff',
              fontWeight: '500',
              position: 'relative',
              bottom: 10,
              left: 9,
            }}>
            {authors_name}
          </Text>
        </Card>
      </View>
    );
  }

  return (
    <>
      <View style={{flex:1}}>
        <View style={{flexDirection:'row'}}>
          <ScrollView
             style={{width: wp('100%')}}
             horizontal >
         
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
                    <View style={{marginRight:10}}>
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
        <View>
          <View></View>
        </View>
      </View>
    </>
  );
};

export default ArticlePreview;
