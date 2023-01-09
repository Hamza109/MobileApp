import React, {useState, useEffect,useRef} from 'react';
import {
  View,
  ScrollView,
  Text,

  StyleSheet,
BackHandler,
  TouchableOpacity,
  ImageBackground,
  Image,
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
import RBSheet from "react-native-raw-bottom-sheet";

import LottieView from 'lottie-react-native';
import axios from 'axios';
import {Card, Checkbox, Portal, Provider} from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import {Dimensions} from 'react-native';
import {backendHost} from '../../components/apiConfig';

import Ratings from '../../components/StarRating';
import StarRating from 'react-native-star-rating';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

import AllPost from '../search/AllPost';
import Comment from '../Disease/comment';
import { useSelector,useDispatch,useStore } from 'react-redux';
import { scale, verticalScale } from '../../components/Scale';
import { fetchRequest,fetchFailure,fetchSuccess } from '../Redux/Action';
import DocInfo from './DocProfile/DocInfo';
import DocCures from './DocProfile/DocCures';
import DocProfileTab from './DocProfile/DocProfileTab';
const Tab = createMaterialTopTabNavigator();

const DocProfile = ({navigation, route}) => {
  const ids = route.params.ids;
  const [id, setId] = useState(ids);
  const store=useStore();
  const user=useSelector((state)=>state.userId.regId) ;
  const [items, setItems] = useState([]);
  const [articleItems, setArticleItems] = useState([]);
const dispatch=useDispatch()
  const doc=useSelector((state)=>state.info.data)
  const isLoading=useSelector((state)=>state.info.loading)
  const [selected, setSelected] = useState(1);

  const [isLoaded, setIsLoaded] = useState(false);

  const [showValue, setShowValue] = useState();

  const [commentItems, setCommentItems] = useState([]);
  const refRBSheet = useRef();

  useEffect(()=>{
    const backAction =()=>{
  
  
    }
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    ); 
  
    return () => backHandler.remove();
   },[])
  


  const check = () => {
    if (user== 0) {
      navigation.navigate('SignIn')
    } else {
     refRBSheet.current.open()
    }
  };

  const [exist,setExist]=useState(false)
const [url,setUrl]=useState(`http://all-cures.com:8080/cures_articleimages/doctors/${id}.png`)

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
      .get(`${backendHost}/rating/target/${id}/targettype/1/avg`)
      .then(res => {
      
        setShowValue(res.data);
      })
      .catch(err => {
  err
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
      err
        throw err;
      });
  }
  useEffect(()=>{
    comments();

  },[id])
  const getDoc = () => {
      return function(dispatch){
        dispatch(fetchRequest())
    axios.get(`${backendHost}/DoctorsActionController?rowno=${id}&cmd=getProfile`)
 
      .then(res => res.data)
      .then(json=>
        {
     
          dispatch(fetchSuccess(json))
          setIsLoaded(true)
      
        })
      .catch(err => {err
   
          dispatch(fetchFailure(err))
   
     
        })
      }
  };

  const Tab = createMaterialTopTabNavigator();
  const allpost = () => {
         
    fetch(`${backendHost}/article/authallkv/reg_type/1/reg_doc_pat_id/${id}`)
      .then(res => res.json())
      .then(json => {

        var temp = [];
        json.forEach(i => {
          if (i.pubstatus_id === 3) {
            temp.push(i);
          }
        });
     
        setArticleItems(temp);
     
     
      },[id])
      .catch(err => {
    err
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
      </Svg>)
  }


useEffect(()=>{
 
  getRating();
  checkIfImage(url);


})
useEffect(()=>{
  store.dispatch(getDoc())
},[id])
  useEffect(() => {

    allpost();

  }, [id]);
  
  return (
    <>
    
       {
          !isLoaded?(
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
  ):null
        }
      <View>
        
      <View style={{height:165,width:'100%'}}>
          <View style={{backgroundColor:'#00415e',height:'100%',width:'100%',alignItems:'center',justifyContent:'center'}}>
            <View style={styles.row}>
              
                {exist?
              <View

                style={{
                  width: 130,
                  height: 130,
                  backgroundColor: '#fff',
                  borderRadius: 200,
                 marginLeft:20,
                  justifyContent: 'center',
                  paddingHorizontal: 5,
                  alignItems: 'center',
                  
                }}>
                <ImageBackground
                
              
                  source={{
                    uri: url
                  }}
                  style={{
                    width: 130,
                    height: 130,
                    overflow:'hidden',
                  borderRadius:100
                    
                  }}
                />
              </View>: <User/> }
             
              <View style={{width:wp('50%') }}>
                <VStack space={1} py='1' px='0'>

                  <Text
                    style={{
                      color: '#fff',

                      fontFamily: 'Raleway-Bold',
                      fontSize: scale(15),
                    }}>
                    Dr. {doc.docname_first} {doc.docname_last}
                  </Text>
                  <HStack space={1}>
                    <Icon name="ribbon" size={18} color='#fff' />

                    <Text
                      style={{
                        color: '#fff',

                        fontFamily: 'Raleway-Regular',
                        fontSize: scale(10),
                        width: scale(155),
                      }}>
                      {doc.primary_spl}
                    </Text>
                  </HStack>
                  <HStack space={1}>
                    <Icon name="business" size={18} color='#fff'/>
                    <Text
                      style={{
                        color: '#fff',

                        fontFamily: 'Raleway-Regular',
                        fontSize: scale(10),
                        width: scale(155),
                        position: 'relative',
                        bottom: 0,
                      }}>
                      {doc.hospital_affliated}
                    </Text>
                  </HStack>
                  <HStack space={1}>
                  <Icon name="globe" size={18} color='#fff'/>
                  <Text
                    style={{
                      color: '#fff',

                      fontFamily: 'Raleway-Regular',
                      fontSize: scale(10),
                        width: scale(180),
                      position: 'relative',
                     
                    }}>
                  
                    {doc.state} {doc.country_code}
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
      </View>

{/* Rating and comment */}

      <Box bg="#00415e" width={wp('100%')} alignSelf="center" style={{position:'relative',bottom:0}}>
            <Center flex={1}></Center>
            <HStack
              bg="#fff"
              alignItems="center"
        
            
              
              shadow={5}>
              <Center mr='10' flex={1}>
                <Ratings rowno={doc.rowno} article_id={null} />
                <Text
                  style={{
                    fontFamily: 'Raleway',
                    color: '#00415e',
                    fontSize: wp('3%'),
                  }}>
                  Rate this Doctor
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
             
            </HStack>
          </Box>

          {/* tabs */}
          
          <DocProfileTab/>


{/** comments sheet */}

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


<ScrollView style={{height:350}}>
                {commentItems.length !== 0 ? (
                  commentItems.map(i => (
                    <View style={{marginBottom: 10}}>
                      <View
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
                    style={{
                      flex: 1,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Icon
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
<Comment  article_id={null}  doc_id={doc.rowno}/>
</View>

    </Stack>
      </RBSheet>




      
    </>
  )};

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
      cbodyHead:{
        fontWeight:'bold',
        color:'black'
      },
      dbodyHead:{
        color: '#00415e',
        fontFamily: 'Raleway-Bold',
        fontSize: 12,
 
      }
      ,
      dbodyText:{
        color: '#00415e',
                  fontFamily: 'Raleway-Medium',
                  fontSize: wp('3.5%'),
      },
      row:{
        flexDirection:'row',
        justifyContent:'space-evenly',
        width:'100%',
        height:'100%',
        alignItems:'center',
        marginLeft:10,
      }
});
