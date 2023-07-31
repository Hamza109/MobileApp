import React, {useState, useEffect,useRef} from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  StatusBar,
  Alert,
  Pressable,
  TouchableOpacity,
  Image,
  ToastAndroid,
  Share,
  BackHandler,
  SafeAreaView,
  Linking,
  Platform,
} from 'react-native';
import LottieView from 'lottie-react-native';
import {Button, useToast} from 'native-base';
import {Card} from 'react-native-paper';
import AllPost from '../search/AllPost';
import CenterWell1 from './CenterWell1';
import CenterWell from './CenterWell';
import {backendHost} from '../../components/apiConfig';
import Comment from './comment';
import BootstrapStyleSheet from 'react-native-bootstrap-styles';
import {ScrollView, ImageBackground} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import RBSheet from 'react-native-raw-bottom-sheet';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Rating from '../../components/StarRating';
import { useStore,useDispatch } from 'react-redux';
import { fav, screenName } from '../Redux/Action';
import { moderateScale,verticalScale,scale,scalledPixel } from '../../components/Scale';
import {
  Modal,
  VStack,
  FormControl,
  Divider,
  Center,
  Stack,
  HStack,
  Box,
  Select,
} from 'native-base';
import PhoneInput from 'react-native-phone-number-input';
import {useIsFocused} from '@react-navigation/native';
import Svg, {Path, Circle} from 'react-native-svg';
import StarRating from 'react-native-star-rating';
import NetInfo from '@react-native-community/netinfo';
import NoInternet from '../../components/NoInternet';
import { getArticleId } from '../Redux/Action';
const Disease = ({navigation, route}) => {
  const toast = useToast();
  const bootstrapStyleSheet = new BootstrapStyleSheet();
  const {s, c} = bootstrapStyleSheet;
  const [option, setOption] = useState();
  const [commentItems, setCommentItems] = useState([]);
  const [selected, setSelected] = useState(1);
  const ids = route.params.ids;
  const flow =route.params.flow
  const title=route.params.title
  const user =useStore();
  const [value, setValue] = useState();
  const [items, setItems] = useState([]);
  const [id, setId] = useState(ids);
  const [visible, setVisible] = useState(false);
  const [data, setData] = useState([]);
  const [formattedValue, setFormattedValue] = useState('');
  const [disease, setDisease] = useState([]);
  const [condition, setCondition] = useState();
  const refRBSheet = useRef();
  const [url,setUrl]=useState()
  const dispatch=useDispatch();
  const [isVisible, setIsVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [subModalVisible, setSubModalVisible] = useState(false);
  const [imageExists, setImageExists] = useState(false);
  const [showValue, setShowValue] = useState();
  const [isLoaded, setIsLoaded] = useState(false);
  const [response, setResponse] = useState([]);
  const [stats, setStats] = useState();
  const [cure, setCure] = useState();
  const like=useStore()
  const [sItems, setSItems] = useState([]);
  const [result, setResult] = useState();
  const [toggle,setToggle]=useState();
  const [isConnected, setIsConnected] = useState(true);
const abort= new AbortController()

  const check = () => {
    if (user.getState().userId.regId == 0) {
    dispatch(screenName('LOGIN'))
    } else {
      refRBSheet.current.open()
    }
  };


  useEffect(()=>{
    navigation.setOptions({
      title:title
    })
})



 useEffect(()=>{

  

  const backAction =()=>{
    Platform.OS=='ios'?
    flow===1?
    navigation.setOptions({
      gestureEnabled:false
    }):null
    :null
  if (flow===1){

 navigation.push('Main')
    return true;
  }

  }
  const backHandler = BackHandler.addEventListener(
    
    "hardwareBackPress",
    backAction
  );

  return () => backHandler.remove();
 },[])

  useEffect(() => {
    getRating();

  }, [id]);
  
  const comment=()=>{  fetch(`${backendHost}/rating/target/${id}/targettype/2`,{
    signal:abort.signal
  })
    .then(res => res.json())
    .then(json => {
    var temp=[];
    json.forEach(i => {
      if(i.reviewed === 1){
        temp.push(i)
      }
     
    })

    setCommentItems(temp)
    })

    .catch(err => {
      err;
      throw err;
    });
  }
  useEffect(()=>{
    
  comment()
  return () => {
    // Cleanup code here
    abort.abort(); // Cancel the fetch request when the component unmounts
  };
  },[])

  const onShare = () => {
    try {
      const result = Share.share({
        message: `https://all-cures.com/cure/${id}-${title}`,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };

 

  const fetchTables = () => {
    Promise.all([
      fetch(`${backendHost}/article/all/table/disease_condition`,{
        signal:abort.signal
      }).then(res =>
        res.json(),
      ),
    ])
      .then(([diseaseData]) => {
        setDisease(diseaseData);
      })
      .catch(err => err);
  };

  useEffect(() => {
console.log('articleId---->',id)

    fetchTables();
    return () => {
      // Cleanup code here
      abort.abort(); // Cancel the fetch request when the component unmounts
    };
  }, []);
  
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

    var countryCodeLength;
    if (phoneNumber && phoneNumber.length) {
      countryCodeLength = phoneNumber.length % 10;
      var countryCode = phoneNumber.slice(0, countryCodeLength);
      var StringValue = phoneNumber.slice(countryCodeLength).replace(/,/g, '');
      if (value.length === 10) {
        axios
          .post(`${backendHost}/users/subscribe/${StringValue}`, {
            nl_subscription_disease_id: option == 2 ? '1' : '0',
            nl_sub_type: option == 1 ? 1 : 0,
            nl_subscription_cures_id: option == 3 ? '1' : '0',
            country_code: `'${countryCode}'`,
          })
          .then(res => {
            if (res.data.includes('Subscribed')) {
              setLoading(false);

              toast.show({
                title: 'Subscribed',
                description: 'Thankyou for subscribing.',
                status: 'success',
                placement: 'bottom',
                duration: 2000,
                style: {borderRadius: 20, width: wp('80%'), marginBottom: 20},
              });
            } 
            else if( res.data.includes('Already')){
              setLoading(false);
              toast.show({
                title: 'Already Subscribed',
                description: 'Number already subscribed.',
                status: 'info',
                placement: 'bottom',
                duration: 2000,
                style: {borderRadius: 20, width: wp('80%'), marginBottom: 20},
              });
            }
          })
          .catch(err => {
            Alert.alert('Some error occured! Please try again later.');
          });
      } else {
        Alert.alert('Please enter a valid 10-digit number!');
      }
    } else {
      Alert.alert('Please enter your number!');
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
      .catch(err => err);
  };
  const isFocus = useIsFocused();

  useEffect(() => {

   
   
    
    const get = () => {

      const getArticle = new Promise((resolve,reject)=>{
        if(isConnected)
        { 
          setIsLoaded(false)
       
        fetch(`${backendHost}/article/${id}`,{
          signal:abort.signal
        })
        .then(res => res.json())
        .then(json => {
          
         resolve(setData(json));
          setItems(JSON.parse(decodeURIComponent(json.content)).blocks);
         
          var articleTitle = json.title;
          var regex = new RegExp(' ', 'g');
          title = articleTitle.replace(regex, '-');
        })
        .catch(err => {
          err;
          throw err;
        });
      }
      }
      
      )
      getArticle.then(()=>{
        setIsLoaded(true);
      })
   
    };
   
get();

return () => {
  // Cleanup code here
  abort.abort(); // Cancel the fetch request when the component unmounts
};
  }, [isConnected]);

  useEffect(() => {
 

    if (data.reg_doc_pat_id !== null) {
      checkIfImageExits(
        `https://all-cures.com:444/cures_articleimages/doctors/${data.reg_doc_pat_id}.png`,
      );
    }
  }, []);

  useEffect(() => {
    if (isFocus) {
      getResult();
    }
    return () => {
      // Cleanup code here
      abort.abort(); // Cancel the fetch request when the component unmounts
    };
  }, [data]);
  function IsJsonValid(str) {
    try {
      JSON.parse(str);
    } catch (e) {
      e;
    }
    return JSON.parse(str).blocks;
  }

  const getResult = () => {
    fetch(`${backendHost}/isearch/${data.dc_name}`,{
      signal:abort.signal
    })
      .then(res => res.json())
      .then(json => {
        
        setSItems(json);
      })
      .catch(err => {
        err;
        throw err;
      });
  }
  
  const stat = async (userid) => {
    await axios
      .get(`${backendHost}/favourite/userid/${userid}/articleid/${id}/favourite`)
      .then(res => {
        setResponse(res.data);

        if (res.data.length != 0) {
 if(res.data[0].status === 0){
setToggle(false)
 }else{
  setToggle(true)
 }
          dispatch(fav(res.data[0].status))
      
        } else {
          return;
        }
      })
      .catch(err => {
        err;
        throw err;
      });
  };
  const getRating = () => {
    axios
      .get(`${backendHost}/rating/target/${id}/targettype/2/avg`)
      .then(res => {
        setShowValue(res.data);
      })
      .catch(err => {
        err;
        throw err;
      });
  };
  
  const handleSubmit= (id,title)=>{
    // dispatch(getArticleId({id:id,title:title}))
    
      navigation.push(`Disease`, {ids:`${id}`,title:title})
    
    
        
      }

  const handlePress = () => {
    if (like.getState().favourite.stat == 1) {
     dispatch(fav(0))

      favorite(like.getState().favourite.stat)
    } else {
      dispatch(fav(1))

      favorite(like.getState().favourite.stat)
      
    }
  };

  const goto = () => {
    toast.show({
      title: 'Added to favourites',
      description: 'Check favourites in profile.',
      status: 'info',
      placement: 'bottom',
      duration: 2000,
      style: {borderRadius: 20, width: wp('70%'), marginBottom: 20},
    });

    return true;
  };

  const favorite = async status => {
    if (status != 0) {
      dispatch(fav(1))
      setToggle(true)
      
      await axios
        .post(
          `${backendHost}/favourite/userid/${user.getState().userId.regId}/articleid/${id}/status/${status}/create`,
        )
        .then(res => {
          if (res.data > 0) {
            goto();
          }
        })
        .catch(err => {
          err;
          throw err;
        });
    } else {
      dispatch(fav(0));
      setToggle(false)
      axios
        .post(
          `${backendHost}/favourite/userid/${user.getState().userId.regId}/articleid/${id}/status/${status}/create`,
        )
        .then(res => {
          if (res.data > 0) {
            toast.show({
              title: 'Remove from favourites',
              description: 'successfully removed',
              status: 'info',
              placement: 'bottom',
              duration: 2000,
              style: {borderRadius: 20, width: wp('70%'), marginBottom: 20},
            });
          }
        })
        .catch(err => {
          err;
          throw err;
        });
    }
  };
  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      setIsConnected(state.isConnected);
     
    });
    return () => {
      unsubscribe();
    };
  }, [])
  useEffect(() => {
 
      stat(user.getState().userId.regId);
      return ()=>{
        stat();
      }

   
  }, [user.getState().userId.regId]);

 
  if (!isConnected) {

    return (
      <NoInternet isConnected={isConnected} setIsConnected={setIsConnected} />
    );
  }


  if (!isLoaded) {
  
    return (
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
    );
  } 
    return (
      <View style={styles.container}>
        <View>
          <View style={{flex: 1}}>
            <SafeAreaView style={styles.HeadCard}>
              
              <View
                style={{
                  width: '100%',
                 alignItems:'center',
                  flexDirection:'row',
                  justifyContent:'space-between',
             
                 paddingHorizontal:15
                  
                }}>
  
                <StarRating
                  disabled={true}
                  starSize={20}
                  maxStars={5}
                  rating={showValue}
                  emptyStarColor={'#00415e'}
                  fullStarColor={'orange'}
                  
                />
               
                
                  {user.getState().userId.regId != 0 ? (
                  response.length != 0 ? (
                 !toggle ? (
                      <Icon
                        name={'heart-outline'}
                        size={32}
                        color={'#00415e'}
                        onPress={() => {
                          handlePress();
                        }}
                      />
                    ) : (
                      <Icon
                        name={'heart'}
                        size={32}
                        color={'red'}
                        onPress={() => {
                          handlePress();
                        }}
                      />
                    )
                  ) : (
                    <Icon
                      name={'heart-outline'}
                      size={30}
                      color={'#00415e'}
                      onPress={() => {
                        handlePress();
                      }}
                    />
                  )
                ) : null}
              </View>
            </SafeAreaView>
            <ScrollView
              style={{
                width: wp('100%'),
                height: hp('100%'),
                marginTop: 5,
                marginLeft: 5,
                paddingLeft: 5,
                marginRight: 5,
                paddingRight: 5,
              }}>
              <VStack space={3} ml="1" mb='2'>
                
              <View style={{marginTop:6}}>
                  <Text
                    adjustsFontSizeToFit
                 
                    style={{
                      color: '#00415e',
                    
                      fontFamily: 'Raleway-Bold',
                      fontSize: 17,
                      textAlign: 'auto',
                    }}>
                    {data.title}
                  </Text>
                  <Text
                    style={{
                      color: '#00415e',

                      fontFamily: 'Raleway-Light',
                      fontSize: 16,
                      textAlign: 'left',
                    }}>
                    {data.authors_name} ▪️ {data.published_date}
                  </Text>
                  </View>  
                

                {items.map((i, key) => (
                  <View   key={Math.random().toString(36)}>
                    <CenterWell1
                       key={Math.random().toString(36)}
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

              <TouchableOpacity
                     key={Math.random().toString(36)}
        style={styles.button}
        onPress={() => setIsVisible(!isVisible)}
      >
      
        <Icon       key={Math.random().toString(36)} color='#00415e' name={isVisible ? 'ios-remove-circle-outline' : 'ios-add-circle-outline'} size={22}  />
        <Text       key={Math.random().toString(36)} style={styles.buttonText}>Sources</Text>
      </TouchableOpacity>
              {isVisible && (
                <View       key={Math.random().toString(36)} style={{width:'100%',justifyContent:'center'}}>
        <Text       key={Math.random().toString(36)} style={styles.text}>{data.window_title}</Text>
        </View>
      )}
              </VStack>


   

              <View       key={Math.random().toString(36)} style={{marginTop: 5}}>
                <VStack       key={Math.random().toString(36)} space={2}>
                  {data.reg_type == 1 ? (
                    <View
                    style={styles.author}>
       
                        <Card
                              key={Math.random().toString(36)}
                          style={{
                            width: 80,
                            height: 80,
                            borderRadius: 200,
                            backgroundColor: '#fff',
                            overflow: 'hidden',
                            marginLeft:-25
                          }}>
                          <ImageBackground
                                key={Math.random().toString(36)}
                            source={{
                              uri: `https://all-cures.com:444/cures_articleimages/doctors/${data.reg_doc_pat_id}.png`,
                            }}
                            style={{
                              width: 80,
                              height: 80,
                              borderRadius: 200,
                       
                            }}
                          />
                        </Card>
                        <View       key={Math.random().toString(36)} style={styles.detailAuthor}>
                          <Text
                            style={{
                              color: '#00415e',
                              fontFamily: 'Raleway-Medium',
                              fontSize: 15,
                              marginBottom:0
                            }}>
                            AUTHOR
                          </Text>
                        
                            <Text
                                  key={Math.random().toString(36)}
                              style={{
                                color: '#00415e',
                                fontFamily: 'Raleway-Light',
                                fontSize: 18,
                                marginBottom:5
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
                                    key={Math.random().toString(36)}
                                style={{
                
                                  backgroundColor: '#00415e',
                                  borderRadius: 5,
                                  justifyContent:'center',
                                  height: 25,
                                  width:80,
                                 
                                
                                }}>
                                <Text
                                      key={Math.random().toString(36)}
                                numberOfLines={2}
                                  style={{
                                    color: '#fff',
                                    fontFamily: 'Raleway-Light',
                                    alignSelf:'center',
                                    fontSize:12,
                                    textDecorationLine: 'underline',
                                  }}>
                                  View Profile
                                </Text>
                              </View>
                            </TouchableOpacity>
                        
                        </View>
               
                    </View>
                  ) : data.reg_type == 2 || data.reg_type == 3 ? (
                    <VStack>
                      <View       key={Math.random().toString(36)} style={styles.author}>
                  
                       <View       key={Math.random().toString(36)} style={{marginLeft:-25}}>
                          <User />
                          </View>
                          <View       key={Math.random().toString(36)} style={styles.detailAuthor}>
                            <Text
                                  key={Math.random().toString(36)}
                              adjustsFontSizeToFit
                              style={{
                                color: '#00415e',
                              fontFamily: 'Raleway-Medium',
                              fontSize: 16,
                              marginBottom:0
                              }}>
                              AUTHOR
                            </Text>
                            <Text
                                  key={Math.random().toString(36)}
                              style={{
                                color: '#00415e',
                                fontSize: 20,
                                fontFamily: 'Raleway-Light',
                              }}>
                              {data.authors_name}
                            </Text>
                          </View>
                      
                      </View>
                      
                    </VStack>
                  ) : null}
                    <Card
                                style={{
                                  width: '100%',
                                  overflow:'hidden',
                                  backgroundColor: '#f0f8ff',
                                  borderWidth:1,
                                  elevation:0,
                                  borderColor:'#e6f7ff',
                                 alignItems:'center',
                                 flexDirection:'row',
                                 justifyContent:'center',
                                 padding:8,
                                  borderRadius:15,
                                }}
                              >
                               
                              

                              
                                <Text style={[styles.disclaimer,{fontFamily:'Raleway-Bold'}]}>
                                  Disclaimer :                        
                                </Text>
                                <Text style={styles.disclaimer}>Content available on All Cures website is not intended to 
                                  be a substitute for professional medical advice, diagnosis, or treatment. 
                                  It is strongly recommended to consult your physician or other qualified medical practitioner with 
                                  any questions you may have regarding a medical condition. The website should not be used as 
                                  a source for treatment of any medical condition.
                                  </Text> 


                            
                               
                           

                              </Card>

                  <View style={{backgroundColor: '#00415e', padding: 10,borderRadius:5}}>
                    <Text
                      style={{fontFamily: 'Raleway-Medium', color: '#fff'}}>
                      Recommended Articles
                    </Text>
                  </View>

                  {sItems.length !== 0 ? (
                    sItems
                      .filter((i, idx) => idx < 9)
                      .map(
                        (i,j) => {
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
                            imageLoc = 'http://all-cures.com:8080/';
                          } else {
                            imageLoc =
                              'https://all-cures.com:444/cures_articleimages//299/default.png';
                          }

                          var title = i.title;
                          var regex = new RegExp(' ', 'g');

                          title = title.replace(regex, '-');
                          return (
                            <View     key={Math.random().toString(36)}>
                            <View style={{marginRight: 0,height:scale(170),width:wp('100%')}} key={Math.random().toString(36)} >
                              <Card
  key={Math.random().toString(36)}
                                style={{
                                  width: scale(wp('97%')),
                                  height: '100%',
                                  overflow:'hidden',
                                  backgroundColor: '#f0f8ff',
                                  borderWidth:1,
                                  elevation:2,
                                  borderColor:'#e6f7ff',
                                 marginBottom:5,
                                  borderRadius:15,
                             
                                }}>
                                  
                                <HStack space={1}  key={Math.random().toString(36)}>
                                  <TouchableOpacity activeOpacity={0.8}  key={Math.random().toString(36)} onPress={()=>handleSubmit(i.article_id,i.title)}>
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
                                  <View       key={Math.random().toString(36)} style={{flex:1 ,flexDirection:'column',justifyContent:'space-evenly'}}>
                                 <View       key={Math.random().toString(36)} style={{width:'90%'}}>
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

                        // : null
                      )
                  ) : (
                    <Image
                    key={Math.random().toString(36)}
                      Source={require('../../assets/img/heart.png')}
                      style={{width: wp('10%'), height: hp('10%')}}
                    />
                  )}
                </VStack>
              </View>
            </ScrollView>
          </View>

          <Box width={wp('100%')}  alignSelf="center">
            <Center flex={1}></Center>
            <HStack
              bg="#fff"
              alignItems="center"
              width={wp('100%')}
              height={hp('8.9%')}
              shadow={6}>
              <Center flex={2}>
                <Rating article_id={id} rowno={null} />
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
                  <Icon
                    mb="1"
                    name="share-social"
                    color="#00415e"
                    size={30}
                    onPress={onShare}
                  />
                  <Text
                    style={{
                      fontFamily: 'Raleway',
                      color: '#00415e',
                      fontSize: wp('3%'),
                    }}>
                    Share
                  </Text>
                </Center>
              </Pressable>
            </HStack>
          </Box>
        </View>
        <RBSheet
        ref={refRBSheet}

        closeOnPressMask={true}
        
        height={522}
        customStyles={{
        
          wrapper: {
            backgroundColor: "transparent",
         
  
          },
      
        }}
      >
    <Stack space={3}>
<View style={styles.cheader}>
  <Text style={styles.ctext}>
    Comments
  </Text>
</View>


<ScrollView style={{height:'70%'}}  >
                {commentItems.length !== 0 ? (
                  commentItems.map(i => (
                    <View style={{marginBottom: 10}}     key={Math.random().toString(36)} >
                      <View
                            key={Math.random().toString(36)}
                        style={styles.cbody}>
                          <Box bg='gray.200' rounded={'xl'} p='2'w={wp('50%')} >
                          <Text style={styles.cbodyHead}>{i.first_name} {i.last_name}</Text>
                        <Text style={styles.cbodyText}>{i.comments}</Text>
                        </Box>
                      </View>
                    </View>
                  ))
                ) : (
                  <View
                  key={Math.random().toString(36)}
                    style={{
                      flex: 1,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Icon
                          key={Math.random().toString(36)}
                      name="chatbubbles"
                      style={{opacity: 0.3,color:'grey'}}
                      size={150}
                    />
                    <Text style={{color: 'grey'}}>No comments yet</Text>
                    <Text style={{color: 'grey'}}>
                      Be the first to comment.
                    </Text>
                  </View>
                )}
              </ScrollView>
<Divider  bg={'Darkgray'} />
<View style={styles.cComment}>
<Comment  article_id={id}  doc_id={null}/>
</View>

    </Stack>
      </RBSheet>
       
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
                  <Text style={{color: '#1e7ca8', color: 'grey'}}>
                    {' '}
                    All Cures
                  </Text>{' '}
                  Daily Newsletter
                </Text>
                <Text style={{marginTop: 20, fontSize: 20}}>
                  Get{' '}
                  <Text style={{color: '#1e7ca8', color: 'grey'}}>
                    doctor-approved
                  </Text>{' '}
                  health tips, news, and more
                </Text>
                <VStack space={1} mt="2" mb="2">
                  <FormControl w="3/4" maxW="300" isRequired>
                    <FormControl.Label>
                      Subscribe your Disease/Cure Type
                    </FormControl.Label>
                    <Select
                      width={wp('90%')}
                      onValueChange={value => setOption(value)}
                      selectedValue={option}
                      isRequired
                      placeholder="Select Option">
                      <Select.Item label="All" value="1" />
                      <Select.Item label="Disease" value="2" />
                      <Select.Item label="Cures" value="3" />
                    </Select>
                    <FormControl.ErrorMessage>
                      Please make a selection!
                    </FormControl.ErrorMessage>
                  </FormControl>
                </VStack>

                <VStack space={1} mb="2">
                  {option == 2 ? (
                    <FormControl w="3/4" maxW="300" isRequired>
                      <FormControl.Label>Disease</FormControl.Label>
                      <Select
                        width={wp('90%')}
                        onValueChange={value => setCondition(value)}
                        selectedValue={condition}
                        isRequired
                        placeholder="Select Disease">
                        {disease.map(i => (
                          <Select.Item value={i[0]} label={i[1]}></Select.Item>
                        ))}
                      </Select>
                      <FormControl.ErrorMessage>
                        Please make a selection!
                      </FormControl.ErrorMessage>
                    </FormControl>
                  ) : option == 3 ? (
                    <FormControl w="3/4" maxW="300" isRequired>
                      <FormControl.Label>Cures</FormControl.Label>
                      <Select
                        width={wp('90%')}
                        onValueChange={value => setCure(value)}
                        selectedValue={cure}
                        isRequired
                        placeholder="Select Cure">
                        {disease.map(i => (
                          <Select.Item value={i[0]} label={i[1]}></Select.Item>
                        ))}
                      </Select>
                      <FormControl.ErrorMessage>
                        Please make a selection!
                      </FormControl.ErrorMessage>
                    </FormControl>
                  ) : null}
                </VStack>

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


export default Disease;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',

    alignItems: 'center',
  },
  headerMain:{
    
    marginTop:Platform.OS=='android'?0:-13,
   flexDirection:'row',
   justifyContent:'space-evenly' ,
   paddingHorizontal:20,
   
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
    
    backgroundColor: '#fff',
    width: wp('100%'),
     justifyContent:'space-between',
    fontSize: 20,
    alignItems:'center'
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

    color: '#00415e',
    textAlign: 'left',
    fontFamily:'Raleway-Regular',
    marginLeft:10
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
  loading: {
    justifyContent: 'center',
    backgroundColor: '#F5FCFF88',
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    zIndex: 999,
    alignItems: 'center',
  },
  cheader:{
    padding:15,
    borderBottomWidth:.3,
    borderColor:'gray'
      }
      ,
      ctext:{
        color:'#000',
        fontSize:18,
      

      },
      cComment:{
        padding:6
      },
      cbody:{
      paddingLeft:25,
      marginTop:8
      },
      author:{
        width: '100%',
        height: 92,
        overflow:'hidden',
        backgroundColor: '#f0f8ff',
        borderWidth:1,
        elevation:0,
        borderColor:'#e6f7ff',
       borderRadius:15,
        flexDirection:'row',
        justifyContent:'space-evenly',
       alignItems:'center',
       paddingHorizontal:25

      },
      detailAuthor:{
       justifyContent:'center',
       
      },
      button: {
        flexDirection: 'row',
        alignItems: 'center',
      },
      buttonText:{
       color:'#00415e',
       alignSelf:'center',
       textDecorationLine:'underline',
       fontSize:15
  
      },
      cbodyHead:{
        fontWeight:'bold',
        color:'black',
        alignSelf:'center'
        
      },
    disclaimer:{color:'#00415e',
    fontFamily:'Raleway-Medium',
    fontSize:14}
});


