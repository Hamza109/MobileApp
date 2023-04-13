import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { useRef } from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
  Image,
  ImageBackground,
  RefreshControl,
  BackHandler,
  Animated,
} from 'react-native';
import { useToast, Divider } from 'native-base';
import { useNavigation } from '@react-navigation/core';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StackActions } from '@react-navigation/routers';
import Icon from 'react-native-vector-icons/Ionicons';
import { Alert } from 'react-native';
import Svg, { Path, Circle } from 'react-native-svg';
import { useState, useEffect } from 'react';
import { useIsFocused } from '@react-navigation/native';
import { Dimensions } from 'react-native';
import { Card } from 'react-native-paper';
import { backendHost } from '../../components/apiConfig';

import ImagePicker from 'react-native-image-crop-picker';

import {
  HStack,
  Stack,
  Center,
  Spinner,
  Heading,
  NativeBaseProvider,
  Container,
  VStack,
  Modal,
  ScrollView,
  FormControl,
  Input,
  Radio,
  Select,
  TextArea,
} from 'native-base';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { TouchableOpacity } from 'react-native';
import axios from 'axios';
import LottieView from 'lottie-react-native';
import { useSelector, useDispatch,useStore } from 'react-redux';
import { fetchFailureProfile, fetchRequestProfile, fetchSuccess, fetchSuccessProfile, screenName,reg } from '../Redux/Action';
import UserProfile from './UserProfile/UserProfile';
import AntDesign from 'react-native-vector-icons/AntDesign';
import NetInfo from '@react-native-community/netinfo';
import NoInternet from '../../components/NoInternet';

const ProfileScreen = ({ sheetRef, onFileSelected }) => {

  const toast = useToast();
  const user = useSelector((state) => state.userId.regId);
  const row=useSelector((state)=>state.docRow.rowId)
  const type= useSelector((state)=>state.userType.typeId)
const store=useStore()
const dispatch=useDispatch()
const userProfile=useSelector((state)=>state.profileInfo.data)
const doc=useSelector((state)=>state.info.data)

  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [email, setEmail] = useState('');
  const [website, setWebsite] = useState('');
  const [isLoaded, setIsLoaded] = useState(false);
  const navigation = useNavigation();
  const [image, setImage] = useState(
    `http://all-cures.com:8280/cures_articleimages/doctors/${userProfile.rowno}.png`,
  );
  const [img,setImg]=useState()
  const [rowno, setRowno] = useState();
  const [mobile, setMobile] = useState();
  const [modalVisible, setModalVisible] = useState(false);
  const [exist,setExist]=useState(false)
  const [isConnected, setIsConnected] = useState(true);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      setIsConnected(state.isConnected);
      console.log('state',state.isConnected)
     
    });
    return () => {
      unsubscribe();
    };
  }, [isConnected])

  

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



  const getProfile = userId => {

    const data=new Promise((resolve,reject)=>{
      if(isConnected)
      {
        setIsLoaded(false)
      axios
      .get(`${backendHost}/profile/${userId}`)
      .then(res => {
     
       resolve (setFirstName(res.data.first_name))
       resolve( setLastName(res.data.last_name));
       resolve( setEmail(res.data.email_address));
        resolve(setMobile(res.data.mobile_number));
    
      })
      .catch(err => {
        return;
      });
    }

    })
    data.then(()=>{
      setIsLoaded(true)
    })
    
  };

  const wait = timeout => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  };
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = () => {
 

    setRefreshing(true);

    wait(2000).then(() => setRefreshing(false)).catch(err => err);;
  };




  const getUser=()=>{
     
return function(dispatch){
const userData= new Promise ((resolve,reject)=>{

if(isConnected)
{

  dispatch(fetchRequestProfile())
    if(row!=0){


     
        axios.get(
          `${backendHost}/DoctorsActionController?rowno=${Number(
            row
          )}&cmd=getProfile`,
        )
          .then(res => res.data)
          .then(json => {
            if (json == null) {
              setIsLoaded(true)
              Alert.alert('No details found','Please add your information',[
                {
                  text:'OK',
                  onPress:()=>{
                    navigation.navigate('editprofile')
                  }
                }
              ])
  
             
            } else {
             
           resolve(dispatch(fetchSuccessProfile(json)))
           console.log(json.rowno)
           setImg(`http://all-cures.com:8280/cures_articleimages/doctors/${json.rowno}.png?d=${parseInt(Math.random()*1000)}`)
          
       
  
             
            }
          }).catch(err => {err
   
            dispatch(fetchFailureProfile(err))
     
       
          })
  

     
      
    }


    else{
getProfile(user)
    }
  }
  

})
userData.then(()=>{
  setIsLoaded(true)
})

      
  }
}

  const getId = () => {

    if (user != 0) {

    store.dispatch(getUser())
}

    else {
      dispatch(screenName('LOGIN'));
    }

  };
    useEffect(() => {

      getId();
      checkIfImage(img);
     
  }, [isConnected]);




  function User() {
    return (
      <Svg
        xmlns="http://www.w3.org/2000/svg"
        width={90}
        height={90}
        fill="none"
        viewBox="0 0 43 43">
        <Path
          fill="#00415e"
          d="M37.288 34.616A20.548 20.548 0 10.938 21.5a20.414 20.414 0 004.774 13.116l-.029.025c.103.123.22.23.326.351.132.151.275.294.411.44.412.447.835.876 1.278 1.278.135.124.275.238.411.356.47.405.954.79 1.454 1.148.065.044.124.102.188.147v-.017a20.417 20.417 0 0023.5 0v.017c.065-.045.122-.102.189-.147.499-.36.983-.743 1.454-1.148.136-.118.276-.234.41-.356.444-.404.867-.83 1.279-1.277.136-.147.277-.29.41-.441.105-.122.224-.228.327-.352l-.032-.024zM21.5 9.75a6.61 6.61 0 110 13.22 6.61 6.61 0 010-13.22zM9.76 34.616a7.338 7.338 0 017.334-7.241h8.812a7.338 7.338 0 017.334 7.241 17.537 17.537 0 01-23.48 0z"></Path>
      </Svg>
    );
  }
  const goto = () => {
    toast.show({
      title: 'Profile Updated',
      description: 'profile updated successfully.',
      status: 'success',
      placement: 'bottom',
      duration: 2000,
      style: { borderRadius: 20, width: wp('70%'), marginBottom: 20 },
    });

    return true;
  };

  




useEffect(()=>{
  const backAction=()=>{
    navigation.push('profile')
  }
  const backHandler=BackHandler.addEventListener(
    "hardwareBackPress",
    backAction
  );
  return () => backHandler.remove();
})


  const choosePhotoFromLibrary = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 300,
      cropping: true,
      compressImageQuality: 0.7,
    }).then(image => {
      const a = image.path.split('/');
      const b = a[a.length - 1];

      type == 1
        ? (console.log(b), setSelectedFile(b), bs.current.snapTo(1))
        : setImageUser(image.path);
      bs.current.snapTo(1);
    }).catch(err => err);;
  };

  const remove = async () => {
    dispatch(reg(0))
  }
  const logout = () => {
    Alert.alert('Hold on!', 'Are you sure you want Logout?', [
      {
        text: 'Cancel',
        onPress: () => null,
        style: 'cancel',
      },
      {
        text: 'YES',
        onPress: () => {
       dispatch(screenName('SPLASH')), remove()
        },
      },
    ]);
    return true;
  };
  const changeHandler = event => {
    if (photo.name.size > 1048576) {
      Alert.alert('Image should be less than 1MB!');
      return;
    }

    handleImageSubmission(event);
  };
  const [selectedFile, setSelectedFile] = useState('');
  const [isFilePicked, setIsFilePicked] = useState(false);
  const [imageUploadLoading, setImageUploadLoading] = useState(false);
  var a = `file:///storage/emulated/0/Android/data/com.allcures/files/Pictures/e30c312e-403a-4096-a0eb-555c14403190.jpg`;

  var b = a.split('/');
  var c = b[b.length - 1];
  var photo = {
    uri: image.path,
    name: selectedFile,
    type: 'image/jpeg',
  };
  const handleImageSubmission = e => {
    // e.preventDefault()
    setImageUploadLoading(true);

    const formData = new FormData();
    formData.append('File', photo);
    fetch(`${backendHost}/dashboard/imageupload/doctor/${rowno}`, {
      method: 'POST',
      body: formData,
    })
      .then(response => {
        response.json();
      })
      .then(result => {
        setTimeout(() => {
          setIsFilePicked(true);
          setImageUploadLoading(true);
        }, 3000);
      })
      .catch(error => {
        return;
      });
  };
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
            style={{ width: 50, height: 50, justifyContent: 'center' }}
          />
        </HStack>
      </View>
    );
  } 
    return (
      <View style={styles.container}>
        {type == 1 ? (
          <View style={{height:145,width:'100%'}}>


        
          <View style={{backgroundColor:'#fff',height:'100%',width:'100%'}}>
          <TouchableOpacity
                          style={{ position: 'absolute', right: 5 }}>
                          <Icon
                            name="create"
                            size={25}
                            color="#00415e"
                            onPress={() => navigation.navigate('editprofile',
                            {data:{first:userProfile.docname_first,
                              last:userProfile.docname_last,
                              gender_code:userProfile.gender,
                              city_code:userProfile.city_code,
                              state_code:userProfile.state_code,
                              country_code:userProfile.countries_code,
                              primary_spl:userProfile.primary_spl_code,
                              secondary_spl:userProfile.secondary_spl_code,
                              other_code:userProfile.other_spls_code,
                              edu_training:userProfile.edu_training,
                              telephone_nos:userProfile.telephone_nos,website_url:userProfile.website_url,hospital_affliated:userProfile.hospital_affliated_code,insurance_accept:userProfile.insurance_accept,about:userProfile.about,img:img}})}
                          />
          </TouchableOpacity>
            <View  style={styles.row}>
           
              
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
                    uri: img
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
                      color: '#00415e',

                      fontFamily: 'Raleway-Bold',
                      fontSize: 15,
                    }}>
                    Dr. {userProfile.docname_first} {userProfile.docname_last}
                  </Text>
                  <HStack space={1}>
                    <Icon name="ribbon" size={18} color='#00415e' />

                    <Text
                      style={{
                        color: '#00415e',

                        fontFamily: 'Raleway-Regular',
                        fontSize:10,
                        width: 155,
                      }}>
                      {userProfile.primary_spl}
                    </Text>
                  </HStack>
                  <HStack space={1}>
                    <Icon name="business" size={18} color='#00415e'/>
                    <Text
                      style={{
                        color: '#00415e',

                        fontFamily: 'Raleway-Regular',
                        fontSize: 10,
                        width: 155,
                        position: 'relative',
                        bottom: 0,
                      }}>
                      {userProfile.hospital_affliated}
                    </Text>
                  </HStack>
                  <HStack space={1}>
                  <Icon name="globe" size={18} color='#00415e'/>
                  <Text
                    style={{
                      color: '#00415e',

                      fontFamily: 'Raleway-Regular',
                      fontSize: 10,
                        width: 180,
                      position: 'relative',
                     
                    }}>
                  
                    {userProfile.state} {userProfile.country_code}
                  </Text>
                  </HStack>
               
              
                </VStack>
              
              </View>
         
            </View>
            <Divider/>
          </View>
             
          
          
          </View>
        ) : (

         <UserProfile first={firstName} last={lastName} number={mobile} mail={email}  />

        )}
        <View style={{padding:8}}>
        {  row!=0?
<View style={[styles.info,{height:160,padding:5}]}>
  <ScrollView>

            <VStack ml="2" mt='1' p='1' space={1}>
            <View style={{display:userProfile.about==''?'none':'flex'}}>
              <Text
                style={styles.dbodyHead}>
                About
              </Text>
              <Text
                style={styles.dbodyText}>
                {userProfile.about}
              </Text>
              </View>
              <Text
                  style={styles.dbodyHead}>
                Education
              </Text>
              <Text
                style={styles.dbodyText}>
                {userProfile.edu_training?userProfile.edu_training: '-- not available --'}
              </Text>
              <Text
                  style={styles.dbodyHead}>
                Specialities
              </Text>

             

              <Text
                 style={[styles.dbodyText,{display:userProfile.primary_spl?'flex':'none'}]}>
                {userProfile.primary_spl}
              </Text>

              </VStack>

</ScrollView>
              </View>
              :null}
              </View>
              
   
            
              <View style={styles.infoContainer}>
      <View style={styles.info}>

        <View>
          <TouchableOpacity activeOpacity={.7} onPress={()=>navigation.navigate('cures')} >
        <View style={styles.infoDetails}>
        
          <View style={styles.icon}>
        <Icon
                      name="medical-outline"
                      size={22}
                      color='aliceblue'
                    />
                    </View>

          <Text
            style={styles.infoText}>
            My Cures
          </Text>
          <View style={{position:'absolute',right:20}}>
          <AntDesign name='right' size={15} color={'#00415e'} />
          </View>
        </View>
        </TouchableOpacity>
        <Divider/>
        <TouchableOpacity activeOpacity={.7} onPress={()=>navigation.navigate('favourite')} >
        <View style={styles.infoDetails}>

        <View style={styles.icon}>
        <Icon
                      name="heart"
                      size={22}
                      color='aliceblue'
                    />
                    </View>

                    <Text
            style={styles.infoText}>
            Favourites
          </Text>
          <View style={{position:'absolute',right:20}}>
          <AntDesign name='right' size={15} color={'#00415e'} />
          </View>

        </View>
        </TouchableOpacity>
        <Divider/>
     

        <TouchableOpacity activeOpacity={.7} onPress={()=>navigation.navigate('inbox')} >
        <View style={styles.infoDetails}>

<View style={styles.icon}>
<Icon
              name="chatbubble"
              size={21}
              color='aliceblue'
            />
            </View>

            <Text
    style={styles.infoText}>
   Inbox
  </Text>
  <View style={{position:'absolute',right:20}}>
          <AntDesign name='right' size={15} color={'#00415e'} />
          </View>

</View>
</TouchableOpacity>
       
        </View>

      

      </View>

      </View>


      <View>


</View>


              <View style={styles.logout}>
    <View
          style={styles.infoLog}>
          <TouchableOpacity onPress={() => logout()}>
            <HStack ml='3' space={4}>
              <Icon name="log-in-outline" size={28} color="#00415e" />
              <Text
                style={{
                  color: '#00415e',
                  fontFamily: 'Raleway-Medium',
                  marginTop:Platform.OS==='ios'?3:0,
                  fontSize:17,
                }}>
                Logout
              </Text>
            </HStack>
          </TouchableOpacity>
        </View>
        </View>

              
      </View>
      
    );
  }


export default ProfileScreen;

const width = Dimensions.get('screen').width;
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
  },

  flex: {
    flex: 1,
  },
  profileHeader: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 20,
  },

  profileName: {
    color: '#00415e',
    fontFamily: 'Raleway-Bold',
    fontSize: 25,
    marginTop: 7
  },
headerTitle:{
marginLeft:12,
padding:10
},

headerText:{
  color:'#00415e',
  fontFamily:'Raleway-Medium',
 fontSize:25
}
,

  infoContainer:{
paddingHorizontal:7
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
  row:{
    flexDirection:'row',
    justifyContent:'space-evenly',
    width:'100%',
    height:'100%',
    alignItems:'center',
    marginLeft:10,
  },
  logout:{
    position:'absolute',
    bottom:0,
    width:'100%',


  },
  infoLog:{
    backgroundColor:'aliceblue',
    padding:10
  },
  infoContainer:{
    paddingHorizontal:10
   },
 info:{
   backgroundColor:'#f0f8ff',
   borderRadius:15,
   justifyContent:'space-between'
 },
 infoDetails:{
   flexDirection:'row',
   alignItems:'center',
   height:80,
 padding:15,
 
   borderBottomColor:'grey'
 
   
   
 },
   infoText: {
     color: '#00415e',
     fontFamily: 'Raleway-Medium',
     fontSize: 14,
     marginBottom:5,
     marginLeft:15,
   },
 icon:{
   backgroundColor:'#00415e',
   width:35,
   height:35,
   justifyContent:'center',
   borderRadius:50,
   alignItems:'center'
 },
});


 