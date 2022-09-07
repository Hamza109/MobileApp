import React, {useState, useEffect,useRef} from 'react';
import {
  View,
  ScrollView,
  Text,

  StyleSheet,

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
import RBSheet from "react-native-raw-bottom-sheet";
import AsyncStorage from '@react-native-async-storage/async-storage';
import LottieView from 'lottie-react-native';
import axios from 'axios';
import {Card, Checkbox, Portal, Provider} from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import {Dimensions} from 'react-native';
import ProfileTab from '../search/ProfileTab';
import DoctorsCard from './DoctorsCard';
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

const Tab = createMaterialTopTabNavigator();

const DocProfile = ({navigation, route}) => {
  const ids = route.params.ids;
  const [id, setId] = useState(ids);
  const [items, setItems] = useState([]);
  const [articleItems, setArticleItems] = useState([]);
  const [formattedValue, setFormattedValue] = useState('');
  const [selected, setSelected] = useState(1);
  const [modalVisible, setModalVisible] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [loading, setLoading] = useState(false);
  const [regType, setRegType] = useState();
  const [showValue, setShowValue] = useState();
  const [regId, setRegId] = useState([]);
  const [commentItems, setCommentItems] = useState([]);
  const refRBSheet = useRef();
  const check = () => {
    if (regId.length == 0) {
      navigation.navigate('SignIn',{screen:'Main'});
    } else {

    refRBSheet.current.open()
    }
  };

  useEffect(() => {
    getId();
    
  },[regId]);

  const getId = () => {
    try {
      AsyncStorage.getItem('author').then(value1 => {
        if (value1 != null) {
          setRegId(Number(value1));
        }
      });
    } catch (error) {
      error
    }
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
      
    fetch(`${backendHost}/DoctorsActionController?rowno=${id}&cmd=getProfile`)
      .then(res => res.json())
      .then(json => {
    

    
        setItems(json);
       

      },[id])
      .catch(err => {err
        throw err
        })
  };
  const Tab = createMaterialTopTabNavigator();
  const allpost = () => {
         
    fetch(`${backendHost}/article/authallkv/reg_type/1/reg_doc_pat_id/${id}`)
      .then(res => res.json())
      .then(json => {
        setIsLoaded(true)
        var temp = [];
        json.forEach(i => {
          if (i.pubstatus_id === 3) {
            temp.push(i);
          }
        });
     
        setArticleItems(temp);
        getDoc()
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
// useEffect(()=>{
//   getDoc();
// },[id])

useEffect(()=>{
  getRating();
})
  useEffect(() => {

    allpost();

  }, [id]);
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
else{
  return (
    <>
      <View style={{flex: 1, backgroundColor: '#fff'}}>
        <Stack space={5}>
          <View style={{backgroundColor:'#00415e',height:155,alignItems:'center'}}>
            <HStack space={3} p='1'>
              <VStack py='2'>
              <Card

                style={{
                  width: wp('30%'),
                  height: hp('14.2%'),
                  backgroundColor: '#fff',
                  borderRadius: 200,
                
                  justifyContent: 'center',
                  paddingHorizontal: 5,
                  alignItems: 'center',
                }}>
                <ImageBackground
                  source={{
                    uri: `http://all-cures.com:8080/cures_articleimages/doctors/${items.rowno}.png`,
                  }}
                  style={{
                    width: wp('30%'),
                    height: hp('14.2%'),
                    borderRadius: 200,
                    overflow: 'hidden',
                  }}
                />
              </Card>
              </VStack>
              <View style={{width:wp('50%') }}>
                <VStack space={1} py='2'>

                  <Text
                    style={{
                      color: '#fff',

                      fontFamily: 'Raleway-Bold',
                      fontSize: wp('3.5%'),
                    }}>
                    Dr. {items.docname_first} {items.docname_last}
                  </Text>
                  <HStack space={1}>
                    <Icon name="ribbon" size={18} color='#fff' />

                    <Text
                      style={{
                        color: '#fff',

                        fontFamily: 'Raleway-Regular',
                        fontSize: wp('2.5%'),
                        width: wp('55%'),
                      }}>
                      {items.primary_spl}
                    </Text>
                  </HStack>
                  <HStack space={1}>
                    <Icon name="business" size={18} color='#fff'/>
                    <Text
                      style={{
                        color: '#fff',

                        fontFamily: 'Raleway-Regular',
                        fontSize: wp('2.5%'),
                        position: 'relative',
                        bottom: 0,
                      }}>
                      {items.hospital_affliated}
                    </Text>
                  </HStack>
                  <HStack space={1}>
                  <Icon name="globe" size={18} color='#fff'/>
                  <Text
                    style={{
                      color: '#fff',

                      fontFamily: 'Raleway-Regular',
                      fontSize: wp('2.5%'),
                      position: 'relative',
                     
                    }}>
                  
                    {items.state} {items.country_code}
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
            </HStack>
          </View>
          <View>
          <Box bg="#00415e" width={wp('100%')} alignSelf="center" style={{position:'relative',bottom:20}}>
            <Center flex={1}></Center>
            <HStack
              bg="#fff"
              alignItems="center"
        
              width={wp('100%')}
              height={hp('8.9%')}
              shadow={6}>
              <Center mr='10' flex={2}>
                <Ratings rowno={items.rowno} article_id={null} />
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
            <ScrollView scrollEnabled={true}  style={{width: wp('100%'), height: hp('100%')}}>
            <VStack ml="2" space={1}>
              <Text
                style={styles.dbodyHead}>
                About
              </Text>
              <Text
                style={styles.dbodyText}>
                {items.about}
              </Text>
              <Text
                  style={styles.dbodyHead}>
                Education
              </Text>
              <Text
                style={styles.dbodyText}>
                {items.edu_training}
              </Text>
              <Text
                  style={styles.dbodyHead}>
                Specialities
              </Text>

              <Text
                 style={styles.dbodyText}>
                {items.primary_spl}
              </Text>
              <Text
                   style={styles.dbodyHead}>
                Cures
              </Text>
            </VStack>
            <View style={{margin: 6,height:430}}>
            <View style={{height:140,padding:3}}>
              <ScrollView nestedScrollEnabled={true}
                style={{width: wp('100%'), height: hp('100%')}}
                >
              
                {articleItems.length !== 0 ? (
                  articleItems
                    .filter((i, idx) => idx < 9)
                    .map((i,j) => {
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

                      //replace via regex
                      title = title.replace(regex, '-');
                      return (
                        <View  key={Math.random().toString(36)}>
                          <View  key={Math.random().toString(36)}>
                            <Card
                              style={{
                                width: wp('95%'),
                                height: hp('10.7%'),
                                backgroundColor: '#fff',
                                borderRadius: 15,
                                borderColor:'aliceblue',
                                borderWidth:2,
                                marginBottom: 5,
                              }}>
                              <HStack space={1}  key={Math.random().toString(36)}>
                              <TouchableOpacity  key={Math.random().toString(36)} activeOpacity={0.8} onPress={()=>{{ navigation.push(`Disease`, {ids:`${i.article_id}`})}}}>
                                <Image
                                 key={Math.random().toString(36)}
                                  source={{
                                    uri:
                                      imageLoc +
                                      imgLocation
                                        .replace('json', 'png')
                                        .split('/webapps/')[1],
                                  }}
                                  style={{
                                    overflow:'hidden',
                                    width: wp('42%'),
                                    height: hp('10.5%'),
                                    marginTop: 0,
                                   borderTopLeftRadius:15,
                                   borderBottomLeftRadius:15
                                  }}
                                />
                                </TouchableOpacity>
                                <View  key={Math.random().toString(36)} style={{width:wp('50%')}}>
                                  <AllPost
                                   key={Math.random().toString(36)}
                                    id={i.article_id}
                                    title={i.title}
                                    f_title={i.friendly_name}
                                    w_title={i.window_title}
                                    allPostsContent={() => receivedData()}
                                  />
                                  <View style={{flex: 1}}  key={Math.random().toString(36)}>
                                    <Text
                                     key={Math.random().toString(36)}
                                      style={{
                                        color: '#00415e',
                                        position: 'absolute',
                                        bottom: 15,
                                        fontFamily: 'Raleway-Bold',
                                        fontSize: 10,
                                      }}>
                                      {i.authors_name}{' '}
                                    </Text>
                                    <Text
                                     key={Math.random().toString(36)}
                                      style={{
                                        color: '#00415e',

                                        fontFamily: 'Raleway-Bold',
                                        fontSize: 10,
                                        position: 'absolute',
                                        bottom: 3,
                                      }}>
                                      {i.published_date}
                                    </Text>
                                  </View>
                                </View>
                              </HStack>
                            </Card>
                          </View>
                        </View>
                      );
                    })
                ) : (
                  <View style={{alignItems: 'center'}}>
                    <Icon
                      name="medical-outline"
                      size={50}
                      style={{opacity: 0.5}}
                    />
                    <Text style={{textAlign: 'center', fontSize: 18}}>
                      No cures yet
                    </Text>
                  </View>
                )}
                
              </ScrollView>
              </View>
            </View>
            
            </ScrollView>
          </View>
     
     

        </Stack>
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
<Comment  article_id={null}  doc_id={items.rowno}/>
</View>

    </Stack>
      </RBSheet>
       
      </View>
    </>
  )};
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
    padding: 0,
    marginTop: Platform.OS === 'ios' ? 0 : -7,
    marginLeft: 0,
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
      }
});
