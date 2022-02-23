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
import Icon from 'react-native-vector-icons/FontAwesome';
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
const Disease = ({navigation, route}) => {
  const bootstrapStyleSheet = new BootstrapStyleSheet();
  const {s, c} = bootstrapStyleSheet;

  const [commentItems, setCommentItems] = useState([]);
  const [selected, setSelected] = useState(1);
  const ids = route.params.ids;
  const [value, setValue] = useState();
  const [items, setItems] = useState([]);
  const [id, setId] = useState(ids);
  const [visible, setVisible] = useState(false);
  const [data, setData] = useState([]);
  const [formattedValue, setFormattedValue] = useState('');
  const containerStyle = {
    backgroundColor: 'white',
    padding: 20,
    height: hp('100%'),
  };
  const getId = () => {
    try {
      Promise.all(AsyncStorage.getItem('author').then(value1 => {
        console.log(value1);
        if (value1 != null) {
          setModalVisible(!modalVisible);
        }
        else{
          navigation.navigate('SignIn')
        }
      }));
    } catch (error) {
      console.log(error);
    }
  };
  const postSubscription = val => {
    var phoneNumber = val.split('+')[1];
    console.log(phoneNumber);
    console.log(phoneNumber.length);
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
  const onError = e => {
    <Icon name="user-md" color={'#00415e'} size={26} />;
  };
  useEffect(() => {
    if (isFocus) {

      comments();

      fetch(`${backendHost}/article/${id}`)
        // .then(res => JSON.parse(res))
        .then(res => res.json())
        .then(json => {
          console.log(json);
          setIsLoaded(true)
          setData(json);
          setItems(JSON.parse(decodeURIComponent(json.content)).blocks);
          let a = JSON.parse(decodeURIComponent(json.content));
          // a.blocks.forEach(i => {
          //   setArticleContent([...articleContent ,i.data.text])
          //   console.log(i.data.caption)
          // });
        });

      if (data.reg_doc_pat_id !== null) {
        checkIfImageExits(
          `http://all-cures.com:444/cures_articleimages/doctors/${data.reg_doc_pat_id}.png`,
        );
      }
    }
  },[]);

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
        console.log(json);
        setCommentItems(json);
      });
  }
  const [sItems, setSItems] = useState([]);
  const [result, setResult] = useState();
  const getResult = () => {
    fetch(`${backendHost}/isearch/${data.dc_name}`)
      .then(res => res.json())
      .then(json => {
        setIsLoaded(true)
        setSItems(json);
        console.log(json);
      });
  };

  const [modalVisible, setModalVisible] = useState(false);
  const [subModalVisible, setSubModalVisible] = useState(false);
  const [imageExists, setImageExists] = useState(false);
  const [isLoaded,setIsLoaded]=useState(false)
  // useEffect(() => {
  //   console.log('AR: ', items[0].data.file.url)
  // }, [items])
  const b = 'http://all-cures.com/cures/uitest/99.png';
  console.log(data.authors_name);

  if(!isLoaded)
  {
    return(
      <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
    <HStack space={2} justifyContent="center">
        <Spinner accessibilityLabel="Loading posts" color="#00415e" size="lg" />
        <Heading color="#00415e" fontSize="lg">
          Loading
        </Heading>
      </HStack>
      </View>
    );
    
  }

else{
  return (
    <View style={styles.container}>
      <View>
        <View style={{flex: 1, margin: 10}}>
          <ScrollView
            style={{
              width: wp('100%'),
              height: hp('100%'),
              margin: 10,
              paddingLeft: 10,
              paddingRight: 10,
              paddingBottom: 12,
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
                <Icon
                  name="times-circle"
                  size={30}
                  color={'#00415e'}
                  style={{position: 'absolute', right: 10}}
                  onPress={() => {
                    navigation.navigate('MainTab', {Screen: 'Home'});
                  }}
                />
              </HStack>
              <Text
                style={{
                  color: '#00415e',

                  fontFamily: 'Raleway-Medium',
                  fontSize: 22,
                  textAlign: 'left',
                }}>
                {data.title}
              </Text>

              {items.map(i => (
                <View>
                  <CenterWell1
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
                      height: hp('17%'),
                      backgroundColor: '#E5E5E5',
                      padding: 15,
                      marginTop: 10,
                      marginBottom: 5,
                    }}>
                    <Text
                      style={{
                        color: '#00415e',
                        fontFamily: 'Raleway-Medium',
                        position: 'relative',
                        left: 9,
                        bottom: 5,
                      }}>
                      AUTHOR
                    </Text>
                    <HStack>
                      <Card
                        style={{
                          width: wp('20%'),
                          height: hp('10%'),
                          borderRadius: 200,
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
                      <TouchableOpacity
                        onPress={() => {
                          navigation.push('DocProfile', {
                            ids: `${data.reg_doc_pat_id}`,
                          });
                        }}>
                        <Text
                          style={{
                            color: '#00415e',
                            fontFamily: 'Raleway-Regular',
                            position: 'relative',
                            top: 20,
                            left: 15,
                            fontSize: 18,
                          }}>
                          {data.authors_name}
                        </Text>
                      </TouchableOpacity>
                    </HStack>
                  </Card>
                ) : data.reg_type == 2 || data.reg_type == 3 ? (
                  <Card
                    style={{
                      width: wp('94%'),
                      height: hp('17%'),
                      backgroundColor: '#E5E5E5',
                      padding: 15,
                      marginTop: 10,
                      marginBottom: 5,
                    }}>
                    <Text
                      style={{
                        color: '#00415e',
                        fontFamily: 'Raleway-Medium',
                        position: 'relative',
                        left: 9,
                        bottom: 5,
                      }}>
                      AUTHOR
                    </Text>
                    <HStack space={2}>
                      <Card
                        style={{
                          width: wp('20%'),
                          height: hp('10%'),
                          borderRadius: 200,
                          alignItems: 'center',
                        }}>
                        <Icon name="user" size={74} style={{opacity: 0.5}} />
                      </Card>
                      <Text
                        style={{
                          color: '#00415e',
                          fontFamily: 'Raleway-Light',
                          position: 'relative',
                          top: 25,
                        }}>
                        {data.authors_name}
                      </Text>
                    </HStack>
                  </Card>
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
                          content = IsJsonValid(decodeURIComponent(i.content));
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

                        //replace via regex
                        title = title.replace(regex, '-');
                        return (
                          <View>
                            <View>
                              <Card
                                style={{
                                  width: wp('97%'),
                                  height: hp('12.4%'),
                                  backgroundColor: 'lightgrey',
                                  borderRadius: 0,
                                  marginBottom: 2,
                                  justifyContent: 'center',

                                  paddingHorizontal: 5,
                                  alignItems: 'center',
                                }}>
                                <HStack space={1}>
                                  <Image
                                    source={{
                                      uri:
                                        imageLoc +
                                        imgLocation
                                          .replace('json', 'png')
                                          .split('/webapps/')[1],
                                    }}
                                    style={{
                                      width: wp('42%'),
                                      height: 100,
                                      marginTop: 0,
                                    }}
                                  />
                                  <View>
                                    <AllPost
                                      id={i.article_id}
                                      title={i.title}
                                      f_title={i.friendly_name}
                                      w_title={i.window_title}
                                      allPostsContent={() => receivedData()}
                                    />
                                    <View style={{flex: 1}}>
                                      <Box>
                                        <Text style={{marginTop: 28}}>
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
                                                          80,
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
                                      </Box>
                                      <Text
                                        style={{
                                          color: '#00415e',

                                          fontFamily: 'Raleway-Medium',
                                          fontSize: 10,
                                          position: 'absolute',
                                          bottom: 3,
                                        }}>
                                        {i.authors_name} {i.published_date}
                                      </Text>
                                    </View>
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
            height={hp('9%')}
            shadow={6}>
            <Center flex={2}>
              <Rating article_id={id} />
              <Text style={{fontFamily: 'Raleway', color: '#00415e'}}>
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
                  name="comment"
                  color="#00415e"
                  size={30}
                  onPress={() => {
                   getId()
                  }}
                />
                <Text style={{fontFamily: 'Raleway', color: '#00415e'}}>
                  {' '}
                  Comment{' '}
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
                  name="bell"
                  color="#00415e"
                  size={30}
                  onPress={() => {
                    setSubModalVisible(!subModalVisible);
                  }}
                />
                <Text style={{fontFamily: 'Raleway', color: '#00415e'}}>
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
                <Icon mb="1" name="share-alt" color="#00415e" size={30} />
                <Text style={{fontFamily: 'Raleway', color: '#00415e'}}>
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
              {
                commentItems.reviewd==1?(
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
                  
                ):( <View
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Icon name="comments" style={{opacity: 0.3}} size={150} />
                  <Text style={{color: 'grey'}}>No comments yet</Text>
                  <Text style={{color: 'grey'}}>Be the first to comment.</Text>
                </View>)

              }



              
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
                <Text style={{color: 'white', fontWeight: 'bold'}}>Submit</Text>
              </TouchableOpacity>
            </View>
          </Modal.Body>
        </Modal.Content>
      </Modal>

      {/* <Portal>
                <Modal
                  visible={visible}
                  onDismiss={hideModal}
                  contentContainerStyle={containerStyle}>

<View style={styles.centeredView}>
<View style={{position:'relative',top:670,alignItems:'center',zIndex:99}}> 
        <Comment   article_id={id}/>
        </View> 
           <View style={styles.modalView}>
        
           
        <ScrollView >
          <Card style={{height:hp('900%'),backgroundColor:'#fff',width:wp('100%'),flex:1,padding:10}}>
        {
          
          commentItems?
          commentItems.map((i) => (
                <View style={{marginBottom:20}}>
                    <Card style={{backgroundColor:'lightgrey',padding:15,marginVertical:0,marginBottom:0,maxWidth:wp('80%'),height:50}}>
                      <Text>{i.comments}</Text>
                      </Card>
                      </View>
               
              ))
          : null
        }
        </Card>
           </ScrollView>
       
      
        </View>
        </View>
               
                </Modal>
              </Portal> */}
      {/* <Card
        style={{
          width: wp('100%'),
          height: hp('5%'),
          position: 'relative',
          bottom: 88,
          borderWidth: 1,
          borderColor: 'grey',
          backgroundColor: '#00415e',
        }}>
        <View style={{flex: 1}}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <View style={{marginLeft: 30}}>
              <Rating article_id={id} />
            </View>
            <View style={{marginRight: 50, marginTop: 5}}>
              <TouchableOpacity activeOpacity={0.5} style={styles.btn}>
                <Icon
                  name="chatbox"
                  style={{color: 'lightgrey'}}
                  size={25}
                  onPress={() => {
                    setModalVisible(!modalVisible);
                  }}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Card> */}
    </View>
  )}
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
