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
import { moderateScale,verticalScale,scale,scalledPixel } from '../../components/Scale';
import Icon from 'react-native-vector-icons/FontAwesome';
import PhoneInput from 'react-native-phone-number-input';
import { useResponsiveFontSize } from 'react-native-responsive-dimensions';
import {
  HStack,
  Stack,
  Center,
  Heading,
  NativeBaseProvider,
  Container,
  Box,
  Spinner,
  VStack,
} from 'native-base';
import {backendHost} from '../../components/apiConfig';
import LottieView from 'lottie-react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import CenterWell from '../Disease/CenterWell';
import Heart from '../../assets/img/heart.png';
import { useNavigation } from '@react-navigation/native';
import Carousel from 'react-native-snap-carousel';
import { useSelector,useStore ,useDispatch} from 'react-redux';
import { getArticleId } from '../Redux/Action';
const ArticlePreview = () => {
  const [items, setItems] = useState([]);
  const [isLoaded, setLoaded] = useState(false);
  const store=useStore()
  const articles=store.getState().recent.Data
  const navigation=useNavigation()
   const dispatch=useDispatch()
 const handlePress= (id,title)=>{
// dispatch(getArticleId({id:id,title:title}))

  navigation.push(`Disease`, {ids:`${id}`,title:title})


    
  }

  function IsJsonValid(str) {
    try {
      JSON.parse(str);
    } catch (e) {
      return [];
    }
    return JSON.parse(str).blocks;
  }

  // useEffect(() => {
  //   allPosts();
  // }, []);
  
 
    return (
      <>
        <View style={{flex: 1,paddingVertical:5}} key={Math.random().toString(36)}>
          <View style={{flexDirection: 'row'}}>
            <ScrollView  key={Math.random().toString(36)}  style={{width: wp('100%')}}  horizontal  showsHorizontalScrollIndicator={false}>
              {articles.length !== 0 ? (
                articles
                  .filter((i, idx) => idx < 9)
                  .map(
                    (i,j) => {
                      var content = [];
                      var imgLocation = i.content_location;
                      var imageLoc = '';
                      if (i.content) {
                        content = IsJsonValid(decodeURIComponent(i.content));
                      }
                      if (
                        imgLocation &&
                        imgLocation.includes('cures_articleimages')
                      ) {
                        imageLoc = 'http://all-cures.com:8080/';
                      } else {
                        imageLoc =
                          'https://all-cures.com:8080/cures_articleimages//299/default.png';
                      }

                      var title = i.title;
                      var regex = new RegExp(' ', 'g');

                      title = title.replace(regex, '-');
                      return (
                        <View     key={Math.random().toString(36)}>
                          <View style={{marginRight: 7,height:170,width:wp('100%'),paddingHorizontal:10,paddingVertical:5}} key={Math.random().toString(36)} >
                            <Card
key={Math.random().toString(36)}
                              style={{
                                width: '100%',
                                height: '100%',
                                overflow:'hidden',
                                backgroundColor: '#f0f8ff',
                                borderWidth:1,
                                elevation:3,
                                marginLeft:-5,
                                position:'relative',
                                                     
                                borderColor:'#e6f7ff',
                               marginBottom:5,
                            
                                borderRadius:15,
                           
                              }}>
                                
                              <HStack space={1}  key={Math.random().toString(36)}>
                                <TouchableOpacity activeOpacity={0.8}  key={Math.random().toString(36)} onPress={()=>{handlePress(i.article_id,i.title)}}>
                                <Image
                                resizeMode='stretch'
                              key={Math.random().toString(36)}
                                  source={{
                                    uri:
                                      imageLoc +
                                      imgLocation
                                        .replace('json', 'png')
                                        .split('/webapps/')[1],
                                  }}
                                  style={{
                                    position:'relative',
                                    right:3,
                                    width: scale(160),
                                    height: '100%',
                                    marginTop: 0,
                                    borderBottomLeftRadius:5,
                                    borderTopLeftRadius:5
                                  }}
                                />
                                </TouchableOpacity>
                                <View style={{flex:1 ,flexDirection:'column',justifyContent:'space-evenly'}}  key={Math.random().toString(36)}>
                               <View style={{width:'90%'}} key={Math.random().toString(36)}>
                               <AllPost
                               key={Math.random().toString(36)}
                                      id={i.article_id}
                                      title={i.title}
                                      f_title={i.friendly_name}
                                      w_title={i.window_title}
                                      allPostsContent={() => receivedData()}
                                    />
                               </View>
                               <Text>
                                        {content
                                          ? content.map(
                                              (j, idx) =>
                                                idx < 1 && (
                                                  <CenterWell
                                                  key={Math.random().toString(36)}
                                                    content={j.data.content}
                                                    type={j.type}
                                                    text={
                                                      j.data.text.substr(
                                                        0,
                                                        150,
                                                      ) + '....'
                                                    }
                                                    title={j.data.title}
                                                    message={j.data.message}
                                                    source={j.data.source}
                                                    embed={j.data.embed}
                                                    caption={j.data.caption}
                                                    alignment={j.data.alignment}
                                                    imageUrl={
                                                      j.data.file
                                                        ? j.data.file.url
                                                        : null
                                                    }
                                                    url={j.data.url}
                                                  />
                                                ),
                                            )
                                          : null}
                                          </Text>
                               <Text
                                  key={Math.random().toString(36)}
                                  adjustsFontSizeToFit
                                  numberOfLines={1}
                                      style={{
                                        color: '#00415e',
                                
                                        fontFamily: 'Raleway-Medium',
                                        fontSize: scale(9),
                                      }}>
                                    {i.authors_name}▪️{i.published_date}
                                    </Text>
                                    </View>
                              </HStack>
                         
                              
                           
                            </Card>
                          </View>
                        </View>
                      );
                    },

                  )
              ) : (
                <Text>
                  We do not have any cures for this condition yet but our
                  editorial team is working on it. In the meantime, if you have
                  a cure, Please Click Here to add the cure to our site.
                </Text>
              )}
            </ScrollView>
          </View>
       
        </View>
      </>
    );
  }


export default ArticlePreview;