import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  BackHandler,
  TouchableOpacity,
  ImageBackground,
  Image,
  Alert,
  SafeAreaView,
} from 'react-native';
import {
  HStack,
  Stack,
  Center,
  Heading,
  NativeBaseProvider,
  Modal,
  Container,
  Box,
  Pressable,
  Divider,
  VStack,
} from 'native-base';
import Svg, {Path, Circle} from 'react-native-svg';
import RBSheet from 'react-native-raw-bottom-sheet';

import LottieView from 'lottie-react-native';
import axios from 'axios';
import {Card, Checkbox, Portal, Provider} from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import {Dimensions} from 'react-native';
import {backendHost, imageHost} from '../../components/apiConfig';

import Ratings from '../../components/StarRating';
import StarRating from 'react-native-star-rating';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

import AllPost from '../search/AllPost';
import Comment from '../Disease/comment';
import {useSelector, useDispatch, useStore} from 'react-redux';
import {scale, verticalScale} from '../../components/Scale';
import {
  fetchRequest,
  fetchFailure,
  fetchSuccess,
  screenName,
} from '../Redux/Action';
import DocInfo from './DocProfile/DocInfo';
import DocCures from './DocProfile/DocCures';
import DocProfileTab from './DocProfile/DocProfileTab';
import NetInfo from '@react-native-community/netinfo';
import NoInternet from '../../components/NoInternet';
import {Fab} from 'native-base';
import {v4 as uuidv4} from 'uuid';

const DocProfile = ({navigation, route}) => {
  const ids = route.params.ids;
  const [id, setId] = useState(Number(ids));
  const store = useStore();
  const row = useSelector(state => state.docRow.rowId);
  const user = useSelector(state => state.userId.regId);
  const [items, setItems] = useState([]);
  const [articleItems, setArticleItems] = useState([]);
  const dispatch = useDispatch();
  const doc = useSelector(state => state.info.data);
  const isLoading = useSelector(state => state.info.loading);
  const [selected, setSelected] = useState(1);

  const [isLoaded, setIsLoaded] = useState(false);

  const [showValue, setShowValue] = useState();

  const [commentItems, setCommentItems] = useState([]);
  const [isConnected, setIsConnected] = useState(true);
  const refRBSheet = useRef();
  const abort = new AbortController();
  console.log('DocId', ids);
  console.log('typeof', typeof ids);
  console.log('DocData', doc);

  useEffect(() => {
    const backAction = () => {};
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, []);
  const [apiUrl, setApiUrl] = useState();
  const [waitRoom, setWaitRoom] = useState(false);
  const videoCall = async () => {
    setIsLoaded(false);
    try {
      const response = await fetch(`${backendHost}/video/create/room/${id}`);
      const result = await response.json();
      setApiUrl(result);
      setIsLoaded(true);
      // navigation.navigate('videoCall', {id: `${id}`, url: result});

      console.log('res', result);
    } catch (error) {
      console.error('Error in startCall:', error);
    }
  };
  useEffect(() => {
    NetInfo.addEventListener(state => {
      setIsConnected(state.isConnected);
    });
  }, [isConnected]);

  const check = () => {
    if (user == 0) {
      dispatch(screenName('LOGIN'));
    } else {
      refRBSheet.current.open();
    }
  };

  const [exist, setExist] = useState(false);
  const [url, setUrl] = useState(
    `http://all-cures.com:8080/cures_articleimages/doctors/${id}.png`,
  );

  const checkIfImage = imageUrl => {
    fetch(imageUrl, {method: 'HEAD', mode: 'no-cors'})
      .then(res => {
        if (res.ok) {
          setExist(true);
        } else {
          setExist(false);
        }
      })
      .catch(err => err);
  };

  const getRating = () => {
    axios
      .get(`${backendHost}/rating/target/${id}/targettype/1/avg`, {
        signal: abort.signal,
      })
      .then(res => {
        setShowValue(res.data);
      })
      .catch(err => {
        err;
        throw err;
      });
  };
  function comments() {
    // For all available blogs "/blogs"
    fetch(`${backendHost}/rating/target/${id}/targettype/1`)
      .then(res => res.json())
      .then(json => {
        setCommentItems(json);
      })
      .catch(err => {
        err;
        throw err;
      });
  }
  useEffect(() => {
    comments();
  }, [id]);
  const getDoc = () => {
    return function (dispatch) {
      dispatch(fetchRequest());

      const docData = new Promise((resolve, reject) => {
        setIsLoaded(false);
        axios
          .get(
            `${backendHost}/DoctorsActionController?DocID=${id}&cmd=getProfile`,
            {
              signal: abort.signal,
            },
          )

          .then(res => res.data)
          .then(json => {
            resolve(dispatch(fetchSuccess(json)));
          })
          .catch(err => {
            err;

            dispatch(fetchFailure(err));
          });
      });
      docData.then(() => {
        setIsLoaded(true);
      });
    };
  };

  const [availability, setAvailability] = useState();

  const allpost = () => {
    fetch(`${backendHost}/article/authallkv/reg_type/1/reg_doc_pat_id/${id}`, {
      signal: abort.signal,
    })
      .then(res => res.json())
      .then(
        json => {
          var temp = [];
          json.forEach(i => {
            if (i.pubstatus_id === 3) {
              temp.push(i);
            }
          });

          setArticleItems(temp);
        },
        [id],
      )
      .catch(err => {
        err;
      });
  };
  function IsJsonValid(str) {
    try {
      JSON.parse(str);
    } catch (e) {
      return [];
    }
    return JSON.parse(str).blocks;
  }
  function Chat() {
    return (
      <Svg
        xmlns="http://www.w3.org/2000/svg"
        width={scale(40)}
        height={verticalScale(40)}
        fill="none"
        viewBox="0 0 43 43">
        <Path
          fill="#e5e5e5"
          d="M37.288 34.616A20.548 20.548 0 10.938 21.5a20.414 20.414 0 004.774 13.116l-.029.025c.103.123.22.23.326.351.132.151.275.294.411.44.412.447.835.876 1.278 1.278.135.124.275.238.411.356.47.405.954.79 1.454 1.148.065.044.124.102.188.147v-.017a20.417 20.417 0 0023.5 0v.017c.065-.045.122-.102.189-.147.499-.36.983-.743 1.454-1.148.136-.118.276-.234.41-.356.444-.404.867-.83 1.279-1.277.136-.147.277-.29.41-.441.105-.122.224-.228.327-.352l-.032-.024zM21.5 9.75a6.61 6.61 0 110 13.22 6.61 6.61 0 010-13.22zM9.76 34.616a7.338 7.338 0 017.334-7.241h8.812a7.338 7.338 0 017.334 7.241 17.537 17.537 0 01-23.48 0z"></Path>
      </Svg>
    );
  }
  function User() {
    return (
      <Svg
        xmlns="http://www.w3.org/2000/svg"
        width={scale(120)}
        height={verticalScale(120)}
        fill="none"
        viewBox="0 0 43 43">
        <Path
          fill="#e5e5e5"
          d="M37.288 34.616A20.548 20.548 0 10.938 21.5a20.414 20.414 0 004.774 13.116l-.029.025c.103.123.22.23.326.351.132.151.275.294.411.44.412.447.835.876 1.278 1.278.135.124.275.238.411.356.47.405.954.79 1.454 1.148.065.044.124.102.188.147v-.017a20.417 20.417 0 0023.5 0v.017c.065-.045.122-.102.189-.147.499-.36.983-.743 1.454-1.148.136-.118.276-.234.41-.356.444-.404.867-.83 1.279-1.277.136-.147.277-.29.41-.441.105-.122.224-.228.327-.352l-.032-.024zM21.5 9.75a6.61 6.61 0 110 13.22 6.61 6.61 0 010-13.22zM9.76 34.616a7.338 7.338 0 017.334-7.241h8.812a7.338 7.338 0 017.334 7.241 17.537 17.537 0 01-23.48 0z"></Path>
      </Svg>
    );
  }

  const createChat = () => {
    axios
      .post(`${backendHost}/chat/start/${user}/${doc.docID}`)
      .then(res => {
        if (res.data[0].Chat_id != null) {
          navigation.navigate('chat', {
            id: doc.docID,
            messages: [],
            chatId: res.data[0].Chat_id,
            first_name: doc.firstName,
            last_name: doc.lastName,
          });
        } else {
          Alert.alert('Something went wrong,please try again');
        }
      })

      .catch(err => Alert.alert(err));
  };

  const initiateChat = () => {
    if (user != 0) {
      axios
        .get(`${backendHost}/chat/${user}/${doc.docID}`)
        .then(res => {
          if (res.status === 200) {
            if (res.data[0].Chat_id === null) {
              createChat();
            } else {
              const transformedMessages = res.data.map(message => {
                return {
                  _id: Math.random().toString(36).substring(2, 9),
                  text: message.Message,
                  createdAt: new Date(message.Time),
                  user: {
                    _id: message.From_id,
                    name: message.From,
                  },
                };
              });

              navigation.navigate('chat', {
                messages:
                  res.data[0].Message != ''
                    ? transformedMessages.reverse()
                    : [],
                id: doc.docID,
                chatId: res.data[0].Chat_id,
                first_name: doc.firstName,
                last_name: doc.lastName,
              });
            }
          } else {
            Alert.alert('Please Try again', 'something went wrong');
          }
        })
        .catch(err => err);
    } else {
      dispatch(screenName('LOGIN'));
    }
  };
  useEffect(() => {
    // Initially, mark the component as not loaded.
    setIsLoaded(false);

    const fetchData = async () => {
      try {
        const response = await fetch(
          `${backendHost}/video/get/${id}/availability`,
        );
        const data = await response.json();
        console.log('availability', data);

        // Update state with the fetched data and mark as loaded.
        setAvailability(data);
        setIsLoaded(true);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);
  useEffect(() => {
    // Logic that runs on every render (similar to componentDidMount and componentDidUpdate)
    getRating();
    checkIfImage(url);

    // Logic that depends on `id` and `isConnected`
    if (id && isConnected) {
      store.dispatch(getDoc());
    } else if (id) {
      // Assuming `allpost` should be called when there's an `id`, regardless of `isConnected`
      allpost();
    }

    // Cleanup function that combines both cleanup logics
    return () => {
      abort.abort(); // Cancel the fetch request when the component unmounts
    };
  }, [id, isConnected, url]);
  if (!isConnected) {
    return (
      <NoInternet isConnected={isConnected} setIsConnected={setIsConnected} />
    );
  }

  return (
    <>
      {!isLoaded ? (
        <View style={styles.loading}>
          <HStack space={2} justifyContent="center">
            <LottieView
              source={require('../../assets/animation/load.json')}
              autoPlay
              loop
              style={{width: 50, height: 50, justifyContent: 'center'}}
            />
          </HStack>
        </View>
      ) : null}
      <SafeAreaView style={{flex: 1}}>
        <View style={{height: 165, width: '100%'}}>
          <View
            style={{
              backgroundColor: '#00415e',
              height: '100%',
              width: '100%',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <View style={styles.row}>
              {doc.imgLoc ? (
                <View
                  style={{
                    width: 130,
                    height: 130,
                    backgroundColor: '#fff',
                    borderRadius: 200,
                    marginLeft: 20,
                    justifyContent: 'center',
                    paddingHorizontal: 5,
                    alignItems: 'center',
                  }}>
                  <ImageBackground
                    source={{
                      uri: `${imageHost}${doc.imgLoc}`,
                    }}
                    style={{
                      width: 130,
                      height: 130,
                      overflow: 'hidden',
                      borderRadius: 100,
                    }}
                  />
                </View>
              ) : (
                <User />
              )}

              <View style={{width: wp('50%')}}>
                <VStack space={1} py="1" px="0">
                  <Text
                    style={{
                      color: '#fff',

                      fontFamily: 'Raleway-Bold',
                      fontSize: scale(15),
                    }}>
                    Dr.{doc.firstName} {doc.lastName}
                  </Text>
                  <HStack space={1}>
                    <Icon name="ribbon" size={18} color="#fff" />

                    <Text
                      style={{
                        color: '#fff',

                        fontFamily: 'Raleway-Regular',
                        fontSize: scale(10),
                        width: scale(155),
                      }}>
                      {doc.primarySpl}
                    </Text>
                  </HStack>
                  <HStack space={1}>
                    <Icon name="business" size={18} color="#fff" />
                    <Text
                      style={{
                        color: '#fff',

                        fontFamily: 'Raleway-Regular',
                        fontSize: scale(10),
                        width: scale(155),
                        position: 'relative',
                        bottom: 0,
                      }}>
                      {doc.hospitalAffiliated}
                    </Text>
                  </HStack>
                  <HStack space={1}>
                    <Icon name="globe" size={18} color="#fff" />
                    <Text
                      style={{
                        color: '#fff',

                        fontFamily: 'Raleway-Regular',
                        fontSize: scale(10),
                        width: scale(180),
                        position: 'relative',
                      }}>
                      {doc.state}
                    </Text>
                  </HStack>
                  <View
                    style={{
                      width: wp('25%'),
                    }}>
                    <StarRating
                      disabled={false}
                      starSize={18}
                      maxStars={5}
                      rating={showValue}
                      emptyStarColor={'#fff'}
                      fullStarColor={'orange'}
                    />
                  </View>
                </VStack>
              </View>
            </View>
          </View>
        </View>

        <Box
          bg="#00415e"
          width={wp('100%')}
          alignSelf="center"
          style={{position: 'relative', bottom: 0}}>
          <Center flex={1}></Center>
          <HStack bg="#fff" alignItems="center" shadow={5}>
            <Center mr="10" flex={1}>
              <Ratings rowno={doc.docID} article_id={null} />
              <Text
                style={{
                  fontFamily: 'Raleway-Regular',
                  color: '#00415e',
                  fontSize: wp('3%'),
                }}>
                Rate this Doctor
              </Text>
            </Center>
            <Center>
              {availability == 1 ? (
                <TouchableOpacity
                  style={{alignItems: 'center', justifyContent: 'center'}}
                  onPress={videoCall}>
                  <Icon name="videocam" color={'#00415e'} size={28} />
                  <Text
                    style={{
                      fontFamily: 'Raleway-Regular',
                      color: '#00415e',
                      fontSize: wp('3%'),
                    }}>
                    Video call
                  </Text>
                </TouchableOpacity>
              ) : null}
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
                    fontFamily: 'Raleway-Regular',
                    color: '#00415e',
                    fontSize: wp('3%'),
                  }}>
                  Comment
                </Text>
              </Center>
            </Pressable>
          </HStack>
        </Box>

        <DocProfileTab />

        {doc.subscription === 1 ? (
          row === 0 ? (
            <TouchableOpacity
              activeOpacity={0.9}
              style={styles.chat}
              onPress={initiateChat}>
              <View>
                <ImageBackground
                  resizeMode="contain"
                  source={require('../../assets/img/chat.png')}
                  style={{
                    width: 100,
                    height: 100,
                    overflow: 'hidden',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Text
                    style={{
                      color: '#00415e',
                      fontSize: 10,
                      textDecorationLine: 'underline',
                      marginBottom: 7,
                      fontFamily: 'Raleway-Bold',
                    }}>
                    Chat With Doctor
                  </Text>
                </ImageBackground>
              </View>
            </TouchableOpacity>
          ) : null
        ) : null}
      </SafeAreaView>

      {/* Rating and comment */}

      {/* tabs */}

      {/** comments sheet */}

      <RBSheet
        ref={refRBSheet}
        closeOnPressMask={true}
        height={522}
        customStyles={{
          wrapper: {
            backgroundColor: 'transparent',
          },
        }}>
        <Stack space={3}>
          <View style={styles.cheader}>
            <Text style={styles.ctext}>Comments</Text>
          </View>

          <ScrollView style={{height: '70%'}}>
            {commentItems.length !== 0 ? (
              commentItems.map(i => (
                <View
                  key={Math.random().toString(36)}
                  style={{marginBottom: 10}}>
                  <View key={Math.random().toString(36)} style={styles.cbody}>
                    <Box
                      key={Math.random().toString(36)}
                      bg="gray.200"
                      rounded={'xl'}
                      p="2"
                      w={wp('50%')}>
                      <Text style={styles.cbodyHead}>
                        {i.first_name} {i.last_name}
                      </Text>
                      <Text style={styles.cbodyText}>{i.comments}</Text>
                    </Box>
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
                <Icon
                  name="chatbubbles"
                  style={{opacity: 0.3, color: 'grey'}}
                  size={150}
                />
                <Text style={{color: 'grey'}}>No comments yet</Text>
                <Text style={{color: 'grey'}}>Be the first to comment.</Text>
              </View>
            )}
          </ScrollView>
          <Divider bg={'Darkgray'} />
          <View style={styles.cComment}>
            <Comment article_id={null} doc_id={doc.docID} />
          </View>
        </Stack>
      </RBSheet>
    </>
  );
};

export default DocProfile;

const width = Dimensions.get('screen').width;

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
  flex: {
    flex: 1,
    alignItems: 'center',
    zIndex: 0,
  },
  header: {
    flexDirection: 'row',

    marginTop: Platform.OS === 'ios' ? 0 : -7,

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
  loading: {
    justifyContent: 'center',
    backgroundColor: '#e5e5e5',
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    zIndex: 999,
    alignItems: 'center',
  },
  cheader: {
    padding: 15,
    borderBottomWidth: 0.3,
    borderColor: 'gray',
  },
  ctext: {
    color: '#000',
    fontSize: 18,
  },
  cComment: {
    padding: 6,
  },
  cbody: {
    paddingLeft: 25,
    marginTop: 8,
  },
  cbodyHead: {
    fontWeight: 'bold',
    color: 'black',
  },
  cbodyText: {
    color: 'black',
  },
  dbodyHead: {
    color: '#00415e',
    fontFamily: 'Raleway-Bold',
    fontSize: 12,
  },
  dbodyText: {
    color: '#00415e',
    fontFamily: 'Raleway-Medium',
    fontSize: wp('3.5%'),
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: '100%',
    height: '100%',
    alignItems: 'center',
    marginLeft: 10,
  },
  chat: {
    position: 'absolute',
    bottom: 15,
    right: 40,
    zIndex: 20,
    backgroundColor: '#fff',
    borderRadius: 50,
    width: 52,
    alignItems: 'center',
    justifyContent: 'center',
    height: 52,
  },
});
