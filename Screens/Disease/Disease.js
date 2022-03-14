import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  StatusBar,
  BackHandler,
  Alert,
  Pressable,
  TouchableOpacity,
  Image,
  ToastAndroid,
} from 'react-native';

import {Card} from 'react-native-paper';
import AllPost from '../search/AllPost';
import CenterWell1 from './CenterWell1';
import CenterWell from './CenterWell';
import Autocomplete from '../MainTab/Autocomplete';
import {Portal} from 'react-native-paper';
import {backendHost} from '../../components/apiConfig';
import Comment from './comment';
import BootstrapStyleSheet from 'react-native-bootstrap-styles';
import {ScrollView, ImageBackground} from 'react-native';
import {KeyboardAvoidingView} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import ArticleHeader from '../search/ArticleHeader';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Rating from '../../components/StarRating';
import {
  Container,
  Modal,
  Button,
  Input,
  Heading,
  VStack,
  FormControl,
  Center,
  Stack,
  HStack,
  Box,
  Spinner,
  NativeBaseProvider,
} from 'native-base';
import PhoneInput from 'react-native-phone-number-input';
import {useIsFocused} from '@react-navigation/native';
import Svg, {Path, Circle} from 'react-native-svg';
import { block } from 'react-native-reanimated';
const Disease = ({navigation, route}) => {
  const bootstrapStyleSheet = new BootstrapStyleSheet();
  const {s, c} = bootstrapStyleSheet;

  const [commentItems, setCommentItems] = useState([]);
  const [selected, setSelected] = useState(1);
  const ids = route.params.ids;
  const [value, setValue] = useState();
  const [items, setItems] = useState([]);
  const [id, setId] = useState(ids);
  const [regId,setRegId]=useState([])
  const [visible, setVisible] = useState(false);
  const [data, setData] = useState([]);
  const [formattedValue, setFormattedValue] = useState('');
  const containerStyle = {
    backgroundColor: 'white',
    padding: 20,
    height: hp('100%'),
  };
const check=()=>{
  if(regId.length == 0)
  {
    navigation.navigate('SignIn')
  }
  else{
    setModalVisible(!modalVisible)
  }
}

  useEffect(()=>{
    stat();
  getId();
  })
  const getId = () => {
    try {
      Promise.all(
        AsyncStorage.getItem('author').then(value1 => {
          if (value1 != null) {
            setRegId(value1)
           
          } 
          
          
        }),
      );
    } catch (error) {}
  };
  function User() {
    return (
      <Svg
        xmlns="http://www.w3.org/2000/svg"
        width={wp('20%')}
        height={hp('10%')}
        fill="none"
        viewBox="0 0 43 43">
        <Path
          fill="#00415E"
          d="M37.288 34.616A20.548 20.548 0 10.938 21.5a20.414 20.414 0 004.774 13.116l-.029.025c.103.123.22.23.326.351.132.151.275.294.411.44.412.447.835.876 1.278 1.278.135.124.275.238.411.356.47.405.954.79 1.454 1.148.065.044.124.102.188.147v-.017a20.417 20.417 0 0023.5 0v.017c.065-.045.122-.102.189-.147.499-.36.983-.743 1.454-1.148.136-.118.276-.234.41-.356.444-.404.867-.83 1.279-1.277.136-.147.277-.29.41-.441.105-.122.224-.228.327-.352l-.032-.024zM21.5 9.75a6.61 6.61 0 110 13.22 6.61 6.61 0 010-13.22zM9.76 34.616a7.338 7.338 0 017.334-7.241h8.812a7.338 7.338 0 017.334 7.241 17.537 17.537 0 01-23.48 0z"></Path>
      </Svg>
    );
  }
  const postSubscription = val => {
    var phoneNumber = val.split('+')[1];

    var countryCodeLength = phoneNumber.length % 10;
    var countryCode = phoneNumber.slice(0, countryCodeLength);
    var StringValue = phoneNumber.slice(countryCodeLength).replace(/,/g, '');
    if (phoneNumber) {
      axios
        .post(`${backendHost}/users/subscribe/${StringValue}`, {
          nl_subscription_disease_id: '0',
          nl_sub_type: 1,
          nl_subscription_cures_id: '0',
          country_code: `'${countryCode}'`,
        })
        .then(res => {
          if (res.data === 1) {
            Alert.alert('You have successfully subscribed to our Newsletter');
          } else {
            Alert.alert('Some error occured! Please try again later.');
          }
        })
        .catch(err => {
          Alert.alert('Some error occured! Please try again later.');
        });
    } else {
      Alert.alert('Please enter a valid number!');
    }
  };

  const checkIfImageExits = imageUrl => {
    fetch(imageUrl, {method: 'HEAD', mode: 'no-cors'})
      .then(res => {
        if (res.ok) {
          setImageExists(true);
        } else {
          setImageExists(false);
        }
      })
      .catch(err => null);
  };
  const isFocus = useIsFocused();

  useEffect(() => {
    if (isFocus) {
  
      comments();

      fetch(`${backendHost}/article/${id}`)
        .then(res => res.json())
        .then(json => {
          setIsLoaded(true);
          setData(json);
          setItems(JSON.parse(decodeURIComponent(json.content)).blocks);
          let a = JSON.parse(decodeURIComponent(json.content));
        });

      if (data.reg_doc_pat_id !== null) {
        checkIfImageExits(
          `http://all-cures.com:444/cures_articleimages/doctors/${data.reg_doc_pat_id}.png`,
        );
      }
    }
  }, []);

  useEffect(() => {
    if (isFocus) {
      getResult();
    }
  }, [data]);
  function IsJsonValid(str) {
    try {
      JSON.parse(str);
    } catch (e) {
      return [];
    }
    return JSON.parse(str).blocks;
  }

  function comments() {
    // For all available blogs "/blogs"
    fetch(`${backendHost}/rating/target/${id}/targettype/2`)
      .then(res => res.json())
      .then(json => {
        setCommentItems(json);
      });
  }
  const [sItems, setSItems] = useState([]);
  const [result, setResult] = useState();
  const getResult = () => {
    fetch(`${backendHost}/isearch/${data.dc_name}`)
      .then(res => res.json())
      .then(json => {
        setIsLoaded(true);
        setSItems(json);
      });
  };
  const [like, setLike] = useState(1);
  const [modalVisible, setModalVisible] = useState(false);
  const [subModalVisible, setSubModalVisible] = useState(false);
  const [imageExists, setImageExists] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const stat=()=>{
  fetch(`${backendHost}/favourite/userid/${regId}/articleid/${id}/favouritearticle`)
    .then(res=>
      console.log(res))
   
  }

const favorite=()=>{
  setLike(like=== 0?1:0) 
console.log(like)
  if(like){
  axios.post(`${backendHost}/favourite/userid/${regId}/articleid/${id}/status/${like}/create`)
  .then(res=>{
    if(res.data === 1){
      setTimeout(()=>{
      
        ToastAndroid.showWithGravityAndOffset('Added To Favourite',
         ToastAndroid.LONG,
        ToastAndroid.BOTTOM,
        25,
        50)

      },1000)
    }
    
  })
}else{
  axios.post(`${backendHost}/favourite/userid/${regId}/articleid/${id}/status/${like}/create`)
  .then(res=>{
    if(res.data > 0){
      setTimeout(()=>{
      
        ToastAndroid.showWithGravityAndOffset('Remove from Favourite',
         ToastAndroid.LONG,
        ToastAndroid.BOTTOM,
        25,
        50)

      },1000)
    }
    
  })
}
}

  if (!isLoaded) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <HStack space={2} justifyContent="center">
          <Spinner
            accessibilityLabel="Loading posts"
            color="#00415e"
            size="lg"
          />
          <Heading color="#00415e" fontSize="lg">
            Loading
          </Heading>
        </HStack>
      </View>
    );
  } else {
    return (
      <View style={styles.container}>
        <View>
          <View style={{flex: 1}}>
            <View style={styles.HeadCard}>
              <HStack space={2} >
              
               
                <Icon
                  name="close-circle-outline"
                  size={30}
                  color={'#00415e'}
                
                  onPress={() => {
                    navigation.navigate('MainTab', {Screen: 'Home'});
                  }}
                />
                <View style={{width:wp('75%')}}>
                 <Text
                 numberOfLines={2}
              
                  style={{
                    color: '#00415e',

                    fontFamily: 'Raleway-Bold',
                    fontSize: wp('4%'),
                    textAlign: 'left',
                  }}>
                  {data.title}
                </Text>
                </View>
                { 
                regId.length!=0?
                  <Icon
                    name={like === 1 ? 'heart-outline' : 'heart'}
                    size={30}
                    color={like === 1 ? '#00415e' : 'red'}
                     
                    onPress={() => {
                   favorite();
                    }}
                  />: null
                }
              </HStack>
            </View>
            <ScrollView
              style={{
                width: wp('100%'),
                height: hp('100%'),
                marginTop: 5,
                paddingLeft: 10,
                paddingRight: 10,
              }}>
              <VStack space={3}>
                <HStack>
                  <Text
                    style={{
                      color: '#00415e',

                      fontFamily: 'Raleway-Light',
                      fontSize: 16,
                      textAlign: 'left',
                    }}>
                    {data.authors_name} ▪️ {data.published_date}
                  </Text>
                </HStack>
            

                {items.map((i, key) => (
                  <View>
                    <CenterWell1
                      key={key}
                      pageTitle={i.title}
                      content={i.data.content}
                      type={i.type}
                      text={i.data.text}
                      title={i.data.title}
                      message={i.data.message}
                      source={i.data.source}
                      embed={i.data.embed}
                      caption={i.data.caption}
                      alignment={i.data.alignment}
                      imageUrl={i.data.file ? i.data.file.url : null}
                    />
                  </View>
                ))}
              </VStack>
              <View style={{marginTop: 5}}>
                <VStack space={2}>
                  {data.reg_type == 1 ? (
                    <Card
                      style={{
                        width: wp('94%'),
                        height: hp('12%'),
                        backgroundColor: '#E5E5E5',
                        padding: 10,
                        marginTop: 10,
                        marginBottom: 5,
                      }}>
                      <HStack space={2}>
                        <Card
                          style={{
                            width: wp('20%'),
                            height: hp('10%'),
                            borderRadius: 200,
                            backgroundColor: '#fff',
                          }}>
                          <ImageBackground
                            source={{
                              uri: `http://all-cures.com:8080/cures_articleimages/doctors/${data.reg_doc_pat_id}.png`,
                            }}
                            style={{
                              width: wp('20%'),
                              height: hp('10%'),
                              borderRadius: 200,
                              overflow: 'hidden',
                            }}
                          />
                        </Card>
                        <VStack py="5">
                          <Text
                            style={{
                              color: '#00415e',
                              fontFamily: 'Raleway-Medium',
                              fontSize: wp('4%'),
                            }}>
                            AUTHOR
                          </Text>
                          <HStack space={4}>
                            <Text
                              style={{
                                color: '#00415e',
                                fontFamily: 'Raleway-Light',
                                fontSize: wp('3%'),
                              }}>
                              {data.authors_name}
                            </Text>

                            <TouchableOpacity
                              onPress={() => {
                                navigation.push('DocProfile', {
                                  ids: `${data.reg_doc_pat_id}`,
                                });
                              }}>
                              <View
                                style={{
                                  width: wp('15%'),
                                  backgroundColor: '#00415e',
                                  borderRadius: 20,
                                  alignItems: 'center',
                                  flex: 1,
                                  height: hp('2.5%'),
                                }}>
                                <Text
                                  style={{
                                    color: '#fff',
                                    fontFamily: 'Raleway-Light',
                                    fontSize: wp('2%'),
                                    textDecorationLine: 'underline',
                                  }}>
                                  View Profile
                                </Text>
                              </View>
                            </TouchableOpacity>
                          </HStack>
                        </VStack>
                      </HStack>
                    </Card>
                  ) : data.reg_type == 2 || data.reg_type == 3 ? (
                    <VStack>
                      <Card
                        style={{
                          width: wp('94%'),
                          height: hp('12%'),
                          backgroundColor: '#E5E5E5',
                          padding: 10,
                          marginTop: 10,
                          marginBottom: 5,
                        }}>
                        <HStack space={2}>
                          <User />
                          <VStack py="5">
                            <Text
                              adjustsFontSizeToFit
                              numberOfLines={1}
                              style={{
                                color: '#00415e',
                                fontFamily: 'Raleway-Medium',
                                fontSize: wp('4%'),
                              }}>
                              AUTHOR
                            </Text>
                            <Text
                              style={{
                                color: '#00415e',
                                fontFamily: 'Raleway-Light',
                              }}>
                              {data.authors_name}
                            </Text>
                          </VStack>
                        </HStack>
                      </Card>
                    </VStack>
                  ) : null}
                  <View style={{backgroundColor: 'lightgrey', padding: 10}}>
                    <Text
                      style={{fontFamily: 'Raleway-Medium', color: '#00415e'}}>
                      Recommended Articles
                    </Text>
                  </View>

                  {sItems.length !== 0 ? (
                    sItems
                      .filter((i, idx) => idx < 9)
                      .map(
                        i => {
                          var content = [];
                          var imgLocation = i.content_location;
                          var imageLoc = '';
                          if (i.content) {
                            content = IsJsonValid(
                              decodeURIComponent(i.content),
                            );
                          }
                          if (
                            imgLocation &&
                            imgLocation.includes('cures_articleimages')
                          ) {
                            imageLoc = 'http://all-cures.com:8280/';
                          } else {
                            imageLoc =
                              'https://all-cures.com:444/cures_articleimages//299/default.png';
                          }

                          var title = i.title;
                          var regex = new RegExp(' ', 'g');

                          title = title.replace(regex, '-');
                          return (
                            <View>
                              <View>
                                <Card
                                  style={{
                                    width: wp('95%'),
                                    height: 168,
                                    backgroundColor: 'lightgrey',
                                    borderRadius: 0,
                                    marginBottom: 5,
                                    justifyContent: 'center',
                                    borderRadius: 15,

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
                                        position: 'relative',
                                        right: 5,
                                        width: wp('45%'),
                                        height: 168,
                                        borderRadius: 15,
                                        marginTop: 0,
                                      }}
                                    />
                                    </TouchableOpacity>
                                    <View style={{width: wp('50%')}}>
                                      <VStack py="2" space={10}>
                                        <AllPost
                                          id={i.article_id}
                                          title={i.title}
                                          f_title={i.friendly_name}
                                          w_title={i.window_title}
                                          allPostsContent={() => receivedData()}
                                        />
                                        <View style={{width: wp('50%')}}>
                                          <Text
                                            style={{
                                              position: 'absolute',
                                              top: 0,
                                            }}>
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
                                                        alignment={
                                                          j.data.alignment
                                                        }
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
                                        style={{
                                          color: '#00415e',
                                          position: 'absolute',
                                          bottom: 0,
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

                        // : null
                      )
                  ) : (
                    <Image
                      Source={require('../../assets/img/heart.png')}
                      style={{width: wp('10%'), height: hp('10%')}}
                    />
                  )}
                </VStack>
              </View>
            </ScrollView>
          </View>

          <Box bg="#00415e" safeAreaTop width={wp('100%')} alignSelf="center">
            <Center flex={1}></Center>
            <HStack
              bg="#fff"
              alignItems="center"
              safeAreaBottom
              width={wp('100%')}
              height={hp('8.9%')}
              shadow={6}>
              <Center flex={2}>
                <Rating article_id={id} />
                <Text
                  style={{
                    fontFamily: 'Raleway',
                    color: '#00415e',
                    fontSize: wp('3%'),
                  }}>
                  Rate this cure{' '}
                </Text>
              </Center>
              <Pressable
                cursor="pointer"
                py="3"
                flex={1}
                onPress={() => setSelected(0)}>
                <Center>
                  <Icon
                    mb="1"
                    name="chatbubble-ellipses"
                    color="#00415e"
                    size={30}
                    onPress={() => {
                      check();
                    }}
                  />
                  <Text
                    style={{
                      fontFamily: 'Raleway',
                      color: '#00415e',
                      fontSize: wp('3%'),
                    }}>
                    Comment
                  </Text>
                </Center>
              </Pressable>
              <Pressable
                cursor="pointer"
                py="3"
                flex={1}
                onPress={() => setSelected(0)}>
                <Center>
                  <Icon
                    mb="1"
                    name="notifications"
                    color="#00415e"
                    size={30}
                    onPress={() => {

                      setSubModalVisible(!subModalVisible);
                    }}
                  />
                  <Text
                    style={{
                      fontFamily: 'Raleway',
                      color: '#00415e',
                      fontSize: wp('3%'),
                    }}>
                    Subscribe
                  </Text>
                </Center>
              </Pressable>
              <Pressable
                cursor="pointer"
                py="3"
                flex={1}
                onPress={() => setSelected(0)}>
                <Center>
                  <Icon mb="1" name="share-social" color="#00415e" size={30} />
                  <Text
                    style={{
                      fontFamily: 'Raleway',
                      color: '#00415e',
                      fontSize: wp('3%'),
                    }}>
                    Share{' '}
                  </Text>
                </Center>
              </Pressable>
            </HStack>
          </Box>
        </View>

        <Modal
          isOpen={modalVisible}
          onClose={() => setModalVisible(false)}
          avoidKeyboard
          justifyContent="flex-end"
          bottom="0"
          size="full">
          <Modal.Content>
            <Modal.CloseButton />
            <Modal.Header>comments</Modal.Header>
            <Modal.Body>
              <ScrollView>
                {commentItems.reviewd == 1 ? (
                  commentItems.map(i => (
                    <View style={{marginBottom: 10}}>
                      <View
                        style={{
                          padding: 10,
                          marginVertical: 0,
                          marginBottom: 0,
                          Width: wp('80%'),
                          height: hp('10%'),
                          borderBottomWidth: 0.2,
                        }}>
                        <Text>{i.comments}</Text>
                      </View>
                    </View>
                  ))
                ) : (
                  <View
                    style={{
                      flex: 1,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Icon name="chatbubbles" style={{opacity: 0.3}} size={150} />
                    <Text style={{color: 'grey'}}>No comments yet</Text>
                    <Text style={{color: 'grey'}}>
                      Be the first to comment.
                    </Text>
                  </View>
                )}
              </ScrollView>
            </Modal.Body>
            <Modal.Footer>
              <Comment article_id={id} />
            </Modal.Footer>
          </Modal.Content>
        </Modal>

        <Modal
          isOpen={subModalVisible}
          onClose={() => setSubModalVisible(false)}
          avoidKeyboard
          justifyContent="flex-end"
          bottom="50"
          size="full">
          <Modal.Content>
            <Modal.CloseButton />
            <Modal.Header>Subscribe</Modal.Header>
            <Modal.Body>
              <View style={{flex: 1}}>
                <View style={{flexDirection: 'row'}}>
                  <Image
                    source={require('../../assets/img/heart.png')}
                    style={styles.imageModal}></Image>
                  <Text
                    style={{
                      marginTop: 20,
                      marginRight: 15,
                      fontSize: 30,
                      color: '#00415e',
                    }}>
                    All Cures
                  </Text>
                </View>
                <Text style={{marginTop: 20, fontSize: 20}}>
                  Sign up for our free
                  <Text style={{color: '#1e7ca8'}}> All Cures</Text> Daily
                  Newsletter
                </Text>
                <Text style={{marginTop: 20, fontSize: 20}}>
                  Get <Text style={{color: '#1e7ca8'}}>doctor-approved</Text>{' '}
                  health tips, news, and more
                </Text>
                <PhoneInput
                  defaultValue={value}
                  defaultCode="IN"
                  layout="first"
                  onChangeText={text => {
                    setValue(text);
                  }}
                  onChangeFormattedText={text => {
                    setFormattedValue(text);
                  }}
                  withDarkTheme
                  withShadow
                  autoFocus
                />
                <TouchableOpacity
                  style={styles.btn}
                  onPress={() => postSubscription(formattedValue)}>
                  <Text style={{color: 'white', fontWeight: 'bold'}}>
                    Submit
                  </Text>
                </TouchableOpacity>
              </View>
            </Modal.Body>
          </Modal.Content>
        </Modal>
      </View>
    );
  }
};

export default Disease;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',

    alignItems: 'center',
  },
  card: {
    padding: 10,
    margin: 0,
    height: hp('60%'),
    width: wp('100%'),
    position: 'relative',
    bottom: 90,
    borderRadius: 0,
    backgroundColor: '#00415e',
  },
  HeadCard: {
    justifyContent: 'center',
    backgroundColor: '#fff',
    width: wp('100%'),
    height: 60,
    fontSize: 20,
    padding: 10,
  },

  search: {
    position: 'relative',
    bottom: 282,
    backgroundColor: '#fff',
  },

  b1: {
    backgroundColor: '#00415e',
    padding: 40,
  },

  text: {
    backgroundColor: '#00415e',
    color: '#fff',
    textAlign: 'center',
  },
  h1: {
    position: 'relative',
    bottom: 450,
    right: 0,
    fontWeight: 'bold',
    padding: 0,
    margin: 0,
  },
  t2: {
    position: 'relative',
    bottom: 410,

    padding: 10,
    margin: 0,
    zIndex: 9999,
  },
  centeredView: {
    flex: 1,

    marginTop: 25,
  },
  modalView: {
    alignItems: 'center',
  },

  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  image: {
    padding: 20,
    marginTop: 5,
    height: hp('5%'),
    width: wp('5%'),
  },
  imageModal: {
    padding: 20,
    marginTop: 5,
    height: hp('7%'),
    width: wp('16%'),
  },
  btn: {
    borderWidth: 2,
    borderRadius: 15,
    borderColor: '#00415e',
    justifyContent: 'center',
    alignItems: 'center',
    width: wp('35%'),
    height: hp('4.5%'),
    backgroundColor: '#00415e',
    color: 'white',
    marginRight: 10,
    marginTop: 12,
  },
});
