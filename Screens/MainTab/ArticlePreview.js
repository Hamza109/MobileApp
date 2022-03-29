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

const ArticlePreview = () => {
  const [items, setItems] = useState([]);
  const [isLoaded, setLoaded] = useState(false);
 const navigation=useNavigation();
  function diseasePosts(type) {
   
    fetch(`${backendHost}/isearch/${type}`)
      .then(res => res.json())
      .then(json => {
        setLoaded(true);
        setItems(json);
      })
      .catch(err => {console.log('69',err)
        throw err
        })
  }

  function allPosts() {
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
      .catch(err => {console.log('89:',err)
        throw err
        })
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
  const swipe=()=>{
    setTimeout(()=>{
      <View style={{alignContent:'center',width:wp('100%'),height:50}}>
      <Text style={{color:'#00415e'}}>swipe down to refresh</Text>
      </View>
    },1000)
  }
  function renderItemArt({item, index}) {
    const {friendly_name, source, content} = item;

    return (
      <View>
        <View style={{marginRight: 25, width: wp('100%'), height: hp('20%')}}>
       
          <View>
            <Paragraph>
              <Card
                style={{
                  width: wp('90%'),
                  height: hp('25%'),
                  backgroundColor: '#00415e',
                  borderRadius: 20,
                  marginRight: 5,
                }}></Card>
            </Paragraph>
          </View>
        </View>
      </View>
    );
  }
    if (!isLoaded) {
   
    return (
      <View>
      <HStack space={2} justifyContent="center">
        <LottieView source={require('../../assets/animation/load.json')} autoPlay loop style={{width:50,height:50}} />
  
      </HStack>
     
      
      </View>
    );
  } else {
    return (
      <>
        <View style={{flex: 1}}>
          <View style={{flexDirection: 'row'}}>
            <ScrollView style={{width: wp('100%')}}  horizontal  showsHorizontalScrollIndicator={false}>
              {items.length !== 0 ? (
                items
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
                          'https://all-cures.com:444/cures_articleimages//299/default.png';
                      }

                      var title = i.title;
                      var regex = new RegExp(' ', 'g');

                      title = title.replace(regex, '-');
                      return (
                        <View >
                          <View style={{marginRight: 10,height:170,width:wp('100%')}} >
                            <Card
                            key={items}
                              style={{
                                width: wp('97%'),
                                height: 168,
                                backgroundColor: '#fff',
                                borderWidth:2,
                                borderColor:'aliceblue',
                                justifyContent: 'center',
                                paddingHorizontal: 5,
                                borderRadius:15,
                                alignItems: 'center',
                              }}>
                              <HStack space={1}>
                                <TouchableOpacity activeOpacity={0.8} onPress={()=>{{ navigation.push(`Disease`, {ids:`${i.article_id}`})}}}>
                                <Image
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
                                    width: wp('44%'),
                                    height: 166,
                                    marginTop: 0,
                                    borderBottomLeftRadius:15,
                                    borderTopLeftRadius:15
                                  }}
                                />
                                </TouchableOpacity>
                                <View style={{width:wp('50%')}}>
                                  <VStack py='2' space={10}>
                                  <AllPost
                                  
                                    id={i.article_id}
                                    title={i.title}
                                    f_title={i.friendly_name}
                                    w_title={i.window_title}
                                    allPostsContent={() => receivedData()}
                                  />
                                  <View style={{width:wp('50%')}}>
                                   
                                      <Text style={{position:'absolute',top:0}}>
                                        {content
                                          ? content.map(
                                              (j, idx) =>
                                                idx < 1 && (
                                                  <CenterWell
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
                               
                                  
                                  </View>
                                    
                               
                                  </VStack>
                                  <Text
                                  adjustsFontSizeToFit
                                  numberOfLines={1}
                                      style={{
                                        color: '#00415e',
                                        position: 'absolute',
                                        bottom:7,
                                        fontFamily: 'Raleway-Medium',
                                        fontSize: wp('2.5%'),
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
          <View>
            <View></View>
          </View>
        </View>
      </>
    );
  }
};

export default ArticlePreview;
