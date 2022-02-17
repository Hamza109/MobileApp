import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import { useRef } from 'react';
import {View, Text, Button, StyleSheet,Image,ImageBackground,Animated} from 'react-native';
import {useNavigation} from '@react-navigation/core';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {StackActions} from '@react-navigation/routers';
import Icon from 'react-native-vector-icons/Ionicons';
import {Alert} from 'react-native';
import {Avatar} from 'react-native-paper';
import {useState, useEffect} from 'react';
import {useIsFocused} from '@react-navigation/native';
import {Dimensions} from 'react-native';
import {Card} from 'react-native-paper';
import { backendHost } from '../../components/apiConfig';
import RBSheet from "react-native-raw-bottom-sheet";
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
} from 'native-base';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {TouchableOpacity} from 'react-native-gesture-handler';
import BottomSheet from 'reanimated-bottom-sheet';

const ProfileScreen = ({sheetRef, onFileSelected}) => {
  const Navigation = useNavigation();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [regType, setRegType] = useState();
  const[isLoaded,setIsLoaded]=useState(false)
  const[items,setItems]=useState([])
  const navigation=useNavigation()
    const [regId, setRegId] = useState([]);
    const [image,setImage]=useState(`http://all-cures.com:8080/cures_articleimages/doctors/872.png`)
  const logout = () => {
    Alert.alert('Hold on!', 'Are you sure you want Logout?', [
      {
        text: 'Cancel',
        onPress: () => null,
        style: 'cancel',
      },
      {
        text: 'YES',
        onPress: () => {Navigation.dispatch(StackActions.popToTop()),remove()},
      },
    ]);
    return true;
  };
  const getId = () => {
    try {
      AsyncStorage.getItem('author')
      .then(value1 => {
        if (value1 != null) {
          fetch(`${backendHost}/DoctorsActionController?rowno=872&cmd=getProfile`)
        .then((res)=> res.json())
        .then((json)=>{
          console.log(json)
          setIsLoaded(true)
               setItems(json)
          
        })
   
        }
        else{
          navigation.navigate('SignIn')
        }
      });
    } catch (error) {
      console.log('114', error);
    }
  };
  const getFirstName = () => {
    try {
      AsyncStorage.getItem('firstName').then(value1 => {
        console.log('firstName:', value1);
        if (value1 != null) {
          setFirstName(value1);
        }
      });
    } catch (error) {
      console.log(error);
    }
  };
  const getType = () => {
    try {
      AsyncStorage.getItem('rateType').then(value2 => {
        console.log('type:', value2);
        if (value2 != null) {
          setRegType(value2);
        }
      });
    } catch (error) {
      console.log('128', error);
    }
  };
  const getLastName = () => {
    try {
      AsyncStorage.getItem('lastName').then(value1 => {
        console.log('lastName:', value1);
        if (value1 != null) {
          setLastName(value1);
        }
      });
    } catch (error) {
      console.log(error);
    }
  };
  const getEmail = () => {
    try {
      AsyncStorage.getItem('email').then(value1 => {
        console.log('email:', value1);
        if (value1 != null) {
          setEmail(value1);
        }
      });
    } catch (error) {
      console.log(error);
    }
  };
  const remove = async () => {
    try {
      await AsyncStorage.multiRemove([
        'author',
        'rateType',
        'firstName',
        'lastName',
        'email',
      ])
    } catch (error) {
      console.log(error);
    }
  };
  const isFocus = useIsFocused();
  useEffect(() => {
    if (isFocus) {
      getFirstName();
    }
  }, [firstName]);
  useEffect(() => {
 
      getId();
      console.log("reg",regId)
  
  },[]);
  useEffect(() => {
    if (isFocus) {
      getType();
    }
  }, [regType]);
  useEffect(() => {
    if (isFocus) {
      getLastName();
    }
  }, [lastName]);
  useEffect(() => {
    if (isFocus) {
      getEmail();
    }
  }, [email]);
  const choosePhotoFromLibrary = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 300,
      cropping: true,
      compressImageQuality: 0.7
    }).then(image => {
      console.log(image);
      setImage(image.path);
      this.bs.current.snapTo(1);
    });
  }


  const refRBSheet = useRef();

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
      {
regType ==1?
<View>
 <Stack  mt="5" space={5}>
            <View >
              <HStack >
              < Card
                          
                          style={{
                            width: wp('30%'),
                            height: hp('15%'),
                            backgroundColor: '#fff',
                            borderRadius: 200,
                            position:'relative',
                            left:20,
                            justifyContent:'center',
                            paddingHorizontal:5,
                            alignItems:'center'
                          }}>
                         <TouchableOpacity onPress={() => refRBSheet.current.open()}>
      <ImageBackground source={{uri:image}} style={{width:wp('30%'),height:hp('15%'),borderRadius:200,overflow:'hidden'}}
      >
        
         <View
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
         <Icon
                    name="camera"
                    size={35}
                    color="#fff"
                    style={{
                      opacity: 0.7,
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderWidth: 1,
                      borderColor: '#fff',
                      borderRadius: 10,
                    }}
                  />
                  </View>
        </ImageBackground>
  
        </TouchableOpacity>  
        </Card>
        <RBSheet
        ref={refRBSheet}
        closeOnDragDown={true}
        closeOnPressMask={false}
        customStyles={{
          wrapper: {
            backgroundColor: "transparent"
          },
          draggableIcon: {
            backgroundColor: "#000"
          }
        }}
      > 
        <TouchableOpacity style={styles.panelButton} onPress={choosePhotoFromLibrary}>
        <Text style={styles.panelButtonTitle}>Choose From Library</Text>
      </TouchableOpacity>
      </RBSheet>
      
        <View style={{position:'relative',left:30}}>
          <VStack space={1}>
            <HStack>
        <Text  style={{
            color: '#00415e',
  
            fontFamily:'Raleway-Bold',
            fontSize: 18,
           
          
          }}>Dr. {items.docname_first} {items.docname_last}</Text>
           <Icon
                      name="create-outline"
                      size={25}
                      color="#00415e"
                      style={{position: 'absolute', right:10}}
                    />
          </HStack>
          <HStack space={1}>
          <Icon name="ribbon" size={20} color="grey"/>
       
          <Text  style={{
            color: '#00415e',
     
            fontFamily:'Raleway-Regular',
            fontSize: 12,
            width:wp('55%')
         
          }}>{items.primary_spl}</Text>
          </HStack>
          <HStack space={1}>
          <Icon name="business" size={20} color="grey" />
          <Text style={{
            color: '#00415e',
           
            fontFamily:'Raleway-Regular',
            fontSize: 12,
            position: 'relative',
            bottom: 0,
         
          }}>{items.hospital_affliated} </Text>
          </HStack>
            <Text style={{
            color: '#00415e',
           
            fontFamily:'Raleway-Regular',
            fontSize: 12,
            position: 'relative',
            bottom: 0,
             right: 4
          }}> {items.state} {items.country_code}</Text>
           <HStack space={1}>
                    <Icon name="mail" size={20} color="grey" />
                    <Text
                      style={{
                        color: '#00415e',
                        fontFamily: 'Raleway-Regular',
                        fontSize: 12,
                      }}>
                      {email}
                    </Text>
                  </HStack>
          </VStack>
          
          </View>
          </HStack>
          </View>
          <View>
       
          <VStack ml="2" space={1}>
<Text  style={{color:'#00415e',fontFamily:'Raleway-Bold', fontSize:12}} >About</Text>
<Text style={{fontFamily:'Raleway-Medium',fontSize:12,color:'#00415e'}} >{items.about}</Text>
<Text  style={{color:'#00415e',fontFamily:'Raleway-Bold', fontSize:12}} >Education</Text>
<Text style={{fontFamily:'Raleway-Medium',fontSize:12,color:'#00415e'}} >{items.edu_training}</Text>
<Text  style={{color:'#00415e',fontFamily:'Raleway-Bold', fontSize:12}} >Specialities</Text>

<Text  style={{color:'#00415e',fontFamily:'Raleway-Medium', fontSize:12}} >{items.primary_spl}</Text>



</VStack>


   
</View>
          </Stack> 

      
    </View>

  :<View>
  <View>
          <VStack space={2} ml="5" mt="5">
            <HStack>
              <View style={styles.img}>
                <Avatar.Image
                  size={110}
                  source={require('../../assets/img/avatar.png')}
                />
              </View>
  
              <View style={{marginLeft: 12}}>
                <View>
                  <HStack space={1}>
                    <Text style={styles.margin}>{firstName}</Text>
                    <Text style={styles.margin}>{lastName}</Text>
                    <Icon
                      name="create-outline"
                      size={25}
                      color="#00415e"
                      style={{position: 'absolute', right:0}}
                    />
                  </HStack>
                  <HStack space={1}>
                    <Icon name="mail" size={20} color="grey" />
                    <Text
                      style={{
                        color: '#00415e',
                        fontFamily: 'Raleway-Regular',
                        fontSize: 12,
                      }}>
                      {email}
                    </Text>
                  </HStack>
                  <HStack>
                    <Icon name="phone-portrait" size={20} color="grey" />
                  </HStack>
                </View>
              </View>
            </HStack>
          </VStack>
        </View>
  
        
    </View>
  
      }
             
<View style={{position:'absolute',bottom:0,width:wp('100%'),padding:10}} >
          <TouchableOpacity
            style={{padding: 7, borderColor: '#00415e',margin:5}}
            onPress={() =>  logout()}>
            <HStack space={5}>
              <Icon name="log-out" size={25} color="#00415e" />
              <Text
                style={{
                  color: '#00415e',
                  fontFamily: 'Raleway-Medium',
                  fontSize: 16,
                }}>
                Logout
              </Text>
            </HStack>
          </TouchableOpacity>
               </View>
    </View>
  )
              }
};

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
  margin: {
    fontFamily: 'Raleway-Bold',
    fontSize: 18,
    color: '#00415e',
  },
  header: {
    padding: 0,
    marginTop: Platform.OS === 'ios' ? 0 : -7,
    marginLeft: 0,
    borderColor: '#fff',
    borderWidth: 0.1,
    alignItems: 'center',
    width: wp('100%'),
  },
  panelButton: {
    padding: 13,
    borderRadius: 10,
    backgroundColor: '#FF6347',
    alignItems: 'center',
    marginVertical: 7,
  },
  panelButtonTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: 'white',
  },
});
