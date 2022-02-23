import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {useRef} from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
  Image,
  ImageBackground,
  Animated,
} from 'react-native';
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
import {backendHost} from '../../components/apiConfig';
import RBSheet from 'react-native-raw-bottom-sheet';
import ImagePicker from 'react-native-image-crop-picker';
import RNPickerSelect from 'react-native-picker-select';
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
import {TouchableOpacity} from 'react-native';
import axios from 'axios';

const ProfileScreen = ({sheetRef, onFileSelected}) => {
  const Navigation = useNavigation();
  const [first, setFirst] = useState();
  const [last, setLast] = useState();
  const [primarySpl, setPrimary] = useState();
  const [secondarySpl, setSecondary] = useState();
  const [otherSpl, setOther] = useState();
  const [education, setEducation] = useState();
  const [awards, setAwards] = useState();
  const [num, setNum] = useState();
  const [hospital, setHospital] = useState();
  const [acceptInsurance, setInsurance] = useState();
  const [gender, setGender] = useState();
  const [about, setAbout] = useState();
  const [diseaseList, setDiseaseList] = useState([]);
  const [stateList, setStateList] = useState([]);
  const [cityList, setCityList] = useState([]);

  const [countryList, setCountryList] = useState([]);
  const [hospitalList, setHospitalList] = useState([]);
  const[states,setStates]=useState();
  const[city,setCity]=useState();
  const[countries,setCountries]=useState();
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [email, setEmail] = useState('');
  const [regType, setRegType] = useState();
  const [website, setWebsite] = useState('');
  const [isLoaded, setIsLoaded] = useState(false);
  const [nameLoad, setnamLoad] = useState(false);
  const [items, setItems] = useState([]);
  const navigation = useNavigation();
  const [regId, setRegId] = useState([]);
  const [image, setImage] = useState(
    `http://all-cures.com:8280/cures_articleimages/doctors/${items.rowno}.png`,
  );
  const [imageUser, setImageUser] = useState(``);
  const [rowno, setRowno] = useState();
  const [afterSubmitLoad, setafterSubmitLoad] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
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
          Navigation.dispatch(StackActions.popToTop()), remove();
        },
      },
    ]);
    return true;
  };
  const [img,setImg]=useState()
  const getId = () => {
    try {
      AsyncStorage.getItem('author').then(value1 => {
        if (value1 != null) {
          fetch(
            `${backendHost}/DoctorsActionController?docid=${value1}&cmd=getProfilebydocid`,
          )
            .then(res => res.json())
            .then(json => {
              if (json == null) {
                setIsLoaded(true);
                setnamLoad(true);
                setModalVisible(true);
              } else {
                console.log(json);
            
                setIsLoaded(true);
                setItems(json);
                setFirst(json.docname_first);
                setLast(json.docname_last);
                setPrimary(json.primary_spl_code)
                setHospital(json.hospital_affliated_code)
                setAbout(json.about)
                setGender(json.gender)
                setEducation(json.edu_training)
                setWebsite(json.website_url)
                setNum(json.telephone_nos)
                setStates(json.state_code)
                setCountries(json.countries_code)
                setCity(json.city_code)
                setInsurance(json.insurance_accept)
                setImg(`http://all-cures.com:8280/cures_articleimages/doctors/${json.rowno}.png?d=${parseInt(Math.random()*1000)}`)
              
              }
            });
        } else {
          navigation.navigate('SignIn');
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
  const getRow = () => {
    try {
      AsyncStorage.getItem('rowno').then(value2 => {
        console.log('row:', value2);
        if (value2 != null) {
          setRowno(Number(value2));
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
        'row'
      ]);
    } catch (error) {
      console.log(error);
    }
  };
  const formSubmit = e => {
    setafterSubmitLoad(true);
  
    axios
      .post(`${backendHost}/doctors/updateprofile?d=${parseInt(Math.random()*1000)}`, {
        "docid": items.docid,
        "rowno": rowno,
        "docname_first" : firstName,
        "docname_last" : lastName,
        "primary_spl" : primarySpl,
        "sub_spls": secondarySpl,
        "other_spls": otherSpl,
        "edu_training": education,
        "telephone_nos": num,
        "hospital_affliated": hospital,
        "insurance_accept": acceptInsurance,
        "gender": gender,
        "about": about,
        "awards": awards,
        "city":city,
        "state":states,
        "country_code":countries,
        "website_url":website
      })
      .then(res => {
console.log("gender:->",gender)
        if (res.data === 1) {
          Alert.alert('Updated your profile successfully.');
        } else {
          Alert.alert('Some error occured. Try again later');
        }
      
      })
      .catch(res => {
        setafterSubmitLoad(false);
        Alert(`Some error occured. Try again later ${res}`);
      });
  };
  const fetchTables = () => {
    Promise.all([
      fetch(`${backendHost}/article/all/table/specialties`).then(res =>
        res.json(),
      ),
      fetch(`${backendHost}/article/all/table/hospital`).then(res =>
        res.json(),
      ),
      fetch(`${backendHost}/article/all/table/states`).then(res =>
        res.json(),
      ),
      fetch(`${backendHost}/article/all/table/city`).then(res =>
        res.json(),
      ),
      fetch(`${backendHost}/article/all/table/countries`).then(res =>
        res.json(),
      ),
      // fetch('/article/all/table/countries').then(res => res.json()),
    ])
      .then(([diseaseData, hospitalData,stateData,cityData,countryData]) => {
        setDiseaseList(diseaseData);
        setHospitalList(hospitalData);
        setStateList(stateData);
        setCityList(cityData);
setCountryList(countryData)   ;     
      })
      .catch(err => {
        return;
      });
  };
  const isFocus = useIsFocused();
  useEffect(() => {
  
      getFirstName();
  
    
  },[]);
  useEffect(() => {
    if(isFocus)
    {
    getId();

    }
  }, [regId]);
  useEffect(() => {
    if(isFocus)
    {
    getRow();
    console.log('row', rowno);
    }
  }, [rowno]);
  useEffect(() => {
    if (isFocus) {
      getType();
    }
  }, [regType]);
  useEffect(() => {
    
      getLastName();
    
  }, []);
  useEffect(() => {
    if (isFocus) {
      getEmail();
    }
  }, [email]);
  useEffect(() => {
    fetchTables();
  }, []);
  const choosePhotoFromLibrary = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 300,
      cropping: true,
      compressImageQuality: 0.7,
    }).then(image => {
      const a =image.path.split('/')
      const b = a[a.length-1]
      console.log(image);
      regType == 1
        ? (setImage(image),setSelectedFile(b), bs.current.snapTo(1))
        : setImageUser(image.path);
      bs.current.snapTo(1);
    });
  };
  const changeHandler = (event) => {
    if(photo.name.size > 1048576){
      Alert.alert('Image should be less than 1MB!')
      return
    }
 
    handleImageSubmission(event)
	}
  const [selectedFile,setSelectedFile]=useState('')
  const [isFilePicked,setIsFilePicked]=useState(false)
  const[imageUploadLoading,setImageUploadLoading]=useState(false)
  var a = `file:///storage/emulated/0/Android/data/com.allcures/files/Pictures/e30c312e-403a-4096-a0eb-555c14403190.jpg`
    
  var b= a.split('/')
  var c= b[b.length-1]
  var photo ={
    uri: image.path,
    name: selectedFile,
    type: "image/jpeg"
  }
 const handleImageSubmission = (e) => {
    // e.preventDefault()
    setImageUploadLoading(true)
  console.log("file:->",selectedFile)

    const formData = new FormData();
    formData.append('File', photo);
    fetch(`${backendHost}/dashboard/imageupload/doctor/${rowno}`,
      {
 
        method: 'POST',  
        body: formData,
       
      }
    )
    .then((response) => { response.json(),console.log(response)})
    .then((result) => {
      setTimeout(() => {
        setIsFilePicked(true)
        setImageUploadLoading(true)
   
      }, 3000);
      
      Alert.alert('Image uploaded successfully.')
    })
    .catch((error) => {
        return
    });
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
        {regType == 1 ? (
          <View>
            <Stack mt="5" space={5}>
              <View>
                <HStack>
                  <Card
                    style={{
                      width: wp('30%'),
                      height: hp('15%'),
                      backgroundColor: 'grey',
                      borderRadius: 200,
                      position: 'relative',
                      left: 20,
                      justifyContent: 'center',
                      paddingHorizontal: 5,
                      alignItems: 'center',
                    }}>
                    <ImageBackground
                      source={{uri:  img,}}
                      style={{
                        width: wp('30%'),
                        height: hp('15%'),
                        borderRadius: 200,
                        overflow: 'hidden',
                      }}></ImageBackground>
                  </Card>

                  <View style={{position: 'relative', left: 30}}>
                    <VStack space={1}>
                      <HStack>
                        <Text
                          style={{
                            color: '#00415e',

                            fontFamily: 'Raleway-Bold',
                            fontSize: 18,
                          }}>
                          Dr. {items.docname_first} {items.docname_last}
                        </Text>
                        {nameLoad ? (
                          <Text
                            style={{
                              color: '#00415e',

                              fontFamily: 'Raleway-Bold',
                              fontSize: 18,
                            }}>
                            {firstName} {lastName}
                          </Text>
                        ) : null}
                        <Icon
                          name="create-outline"
                          size={25}
                          color="#00415e"
                          style={{position: 'absolute', right: 10}}
                          onPress={() => setModalVisible(!modalVisible)}
                        />
                      </HStack>
                      <HStack space={1}>
                        <Icon name="ribbon" size={20} color="grey" />

                        <Text
                          style={{
                            color: '#00415e',

                            fontFamily: 'Raleway-Regular',
                            fontSize: 12,
                            width: wp('55%'),
                          }}>
                          {items.primary_spl}
                        </Text>
                      </HStack>
                      <HStack space={1}>
                        <Icon name="business" size={20} color="grey" />
                        <Text
                          style={{
                            color: '#00415e',

                            fontFamily: 'Raleway-Regular',
                            fontSize: 12,
                            position: 'relative',
                            bottom: 0,
                          }}>
                          {items.hospital_affliated}
                        </Text>
                      </HStack>
                      <Text
                        style={{
                          color: '#00415e',

                          fontFamily: 'Raleway-Regular',
                          fontSize: 12,
                          position: 'relative',
                          bottom: 0,
                          right: 4,
                        }}>
                     
                        {items.state} {items.country_code}
                      </Text>
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
                  <Text
                    style={{
                      color: '#00415e',
                      fontFamily: 'Raleway-Bold',
                      fontSize: 12,
                    }}>
                    About
                  </Text>
                  <Text
                    style={{
                      fontFamily: 'Raleway-Medium',
                      fontSize: 12,
                      color: '#00415e',
                    }}>
                    {items.about}
                  </Text>
                  <Text
                    style={{
                      color: '#00415e',
                      fontFamily: 'Raleway-Bold',
                      fontSize: 12,
                    }}>
                    Education
                  </Text>
                  <Text
                    style={{
                      fontFamily: 'Raleway-Medium',
                      fontSize: 12,
                      color: '#00415e',
                    }}>
                    {items.edu_training}
                  </Text>
                  <Text
                    style={{
                      color: '#00415e',
                      fontFamily: 'Raleway-Bold',
                      fontSize: 12,
                    }}>
                    Specialities
                  </Text>

                  <Text
                    style={{
                      color: '#00415e',
                      fontFamily: 'Raleway-Medium',
                      fontSize: 12,
                    }}>
                    {items.primary_spl}
                  </Text>
                </VStack>
              </View>
            </Stack>

            <Modal
              isOpen={modalVisible}
              onClose={() => setModalVisible(false)}
              avoidKeyboard
              justifyContent="center"
              bottom="0"
              size="full">
              <Modal.Content>
                <Modal.CloseButton />
                <Modal.Header style={{backgroundColor: 'aliceblue'}}>
                  Edit Profile
                </Modal.Header>
                <Modal.Body>
                  <ScrollView>
                    <Card
                      style={{
                        width: wp('30%'),
                        height: hp('15%'),
                        backgroundColor: 'grey',
                        borderRadius: 200,
                        position: 'relative',
                        left: 20,
                        justifyContent: 'center',
                        paddingHorizontal: 5,
                        alignItems: 'center',
                      }}>
                      <TouchableOpacity onPress={choosePhotoFromLibrary}>
                        <ImageBackground
                          source={{uri: img,}}
                          style={{
                            width: wp('30%'),
                            height: hp('15%'),
                            borderRadius: 200,
                            overflow: 'hidden',
                          }}>
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

                    {nameLoad ? (
                      <View>
                        <FormControl mb="5">
                          <FormControl.Label>First Name</FormControl.Label>
                          <Input
                            value={firstName}
                            onChangeText={text => setFirstName(text)}
                          />
                        </FormControl>
                        <FormControl mb="5">
                          <FormControl.Label>Last Name</FormControl.Label>
                          <Input
                            value={lastName}
                            onChangeText={text => setLastName(text)}
                          />
                        </FormControl>

                        <VStack space={2}>
                          <Radio.Group
                            defaultValue={gender}
                            value={gender}
                            onChange={val=>setGender(val)}
                            name="myRadioGroup"
              >
                            <HStack space={1}>
                              <Radio value={1} my={0} >
                                Female
                              </Radio>
                              <Radio value={2} mx={1}>
                                Male
                              </Radio>
                              <Radio value={3} mx={1}>
                                Other
                              </Radio>
                            </HStack>
                          </Radio.Group>
                          <HStack space={2}>
                            <VStack space={1}>
                             
                              <FormControl w="3/4" maxW="300" isRequired >
        <FormControl.Label>City</FormControl.Label>
                              <Select
                                width={wp('46%')}
                                onValueChange={value => setCity(value)}
                                selectedValue={city}
                                
                                isRequired
                                
                             
                                placeholder="Select city">
                                {cityList.map(i => (
                                  <Select.Item
                                    value={i[0]}
                                    label={i[1]}></Select.Item>
                                ))}
                              </Select>
                              <FormControl.ErrorMessage >
          Please make a selection!
        </FormControl.ErrorMessage>
        </FormControl>
                            </VStack>
                            <VStack space={1}>
                             
                            <FormControl w="3/4" maxW="300" isRequired >
        <FormControl.Label>State</FormControl.Label>

                              <Select
                                width={wp('46%')}
                                onValueChange={value => setStates(value)}
                                selectedValue={states}
                                placeholder="Select State">
                                {stateList.map(i => (
                                  <Select.Item
                                    value={i[0]}
                                    label={i[1]}></Select.Item>
                                ))}
                              </Select>
                              <FormControl.ErrorMessage >
          Please make a selection!
        </FormControl.ErrorMessage>
        </FormControl>
                            </VStack>
                          </HStack>
                          <FormControl w="3/4" maxW="300" isRequired >
        <FormControl.Label>Country</FormControl.Label>
                          <Select
                            onValueChange={value => setCountries(value)}
                            selectedValue={countries}
                            placeholder="Select country">
                            {countryList.map(i => (
                              <Select.Item
                                value={i[0]}
                                label={i[1]}></Select.Item>
                            ))}
                          </Select>
                          <FormControl.ErrorMessage >
          Please make a selection!
        </FormControl.ErrorMessage>
        </FormControl>
                          <HStack space={2}>
                            <VStack space={1}>
                              <Text style={styles.text}>
                                Primary speciality
                              </Text>
                              <Select
                                width={wp('46%')}
                                onValueChange={value => setPrimary(value)}
                                selectedValue={primarySpl}
                             
                                placeholder="Select primary speciality">
                                {diseaseList.map(i => (
                                  <Select.Item
                                    value={i[0]}
                                    label={i[1]}></Select.Item>
                                ))}
                              </Select>
                            </VStack>
                            <VStack space={1}>
                              <Text style={styles.text}>
                                Secondary speciality
                              </Text>
                              <Select
                                width={wp('46%')}
                                onValueChange={value => setSecondary(value)}
                                selectedValue={secondarySpl}
                                placeholder="Select secondary speciality">
                                {diseaseList.map(i => (
                                  <Select.Item
                                    value={i[0]}
                                    label={i[1]}></Select.Item>
                                ))}
                              </Select>
                            </VStack>
                          </HStack>
                          <Text style={styles.text}>Additional speciality</Text>
                          <Select
                            onValueChange={value => setOther(value)}
                            selectedValue={otherSpl}
                            placeholder="Select additional speciality">
                            {diseaseList.map(i => (
                              <Select.Item
                                value={i[0]}
                                label={i[1]}></Select.Item>
                            ))}
                          </Select>
                          <FormControl mb="5">
                            <FormControl.Label>Education</FormControl.Label>
                            <Input
                              value={education}
                              onChangeText={education =>
                                setEducation(education)
                              }
                            />
                          </FormControl>

                          <FormControl mb="5">
                            <FormControl.Label>Mobile Number</FormControl.Label>
                            <Input
                              value={num}
                              onChangeText={num => setNum(num)}
                              keyboardType="numeric"
                            />
                          </FormControl>
                          <FormControl mb="5">
                            <FormControl.Label>
                              Doctor website url
                            </FormControl.Label>
                            <Input
                              value={website}
                              onChangeText={text => setWebsite(text)}
                              keyboardType="numeric"
                            />
                          </FormControl>
                          <FormControl  isRequired >
        <FormControl.Label>hospital_affliated</FormControl.Label>
                          <Select
                            onValueChange={value => setHospital(value)}
                            selectedValue={hospital}
                            placeholder="select hospital affiliated">
                            {hospitalList.map(i => (
                              <Select.Item
                                value={i[0]}
                                label={i[1]}></Select.Item>
                            ))}
                          </Select>
                          <FormControl.ErrorMessage >
          Please make a selection!
        </FormControl.ErrorMessage>
        </FormControl>
                          <Text style={styles.text}>Do you accept insurance?</Text>
                          <Radio.Group
                            defaultValue={acceptInsurance}
                            value={acceptInsurance}
                            onChange={val=>setInsurance(val)}
                            name="myRadioGroup"
                            accessibilityLabel="Pick your favorite number">
                            <HStack space={1}>
                              <Radio value={1} my={0}>
                                Yes
                              </Radio>
                              <Radio value={0} my={0}>
                                No
                              </Radio>
                            </HStack>
                          </Radio.Group>
                          <Text style={styles.text}>
                            Tell Us About Yourself
                          </Text>
                          <TextArea
                            h={20}
                            placeholder="Text Area Placeholder"
                            w="100%"
                           onChangeText={(text)=>setAbout(text)}
                          />
                          <Text style={{fontSize: 10, color: 'black'}}>
                            We never share your details without your consent.
                          </Text>
                        </VStack>
                      </View>
                    ) : (
                      <View>
                       
                        <FormControl mb="5">
                          <FormControl.Label>First Name</FormControl.Label>
                          <Input
                            value={first}
                            onChangeText={text => setFirst(text)}
                          />
                        </FormControl>
                        <FormControl mb="5">
                          <FormControl.Label>Last Name</FormControl.Label>
                          <Input
                            value={items.docname_last}
                            onChangeText={text => setLast(text)}
                          />
                        </FormControl>
                        <VStack space={2}>
                        <Radio.Group
                            defaultValue={gender}
                            value={gender}
                            onChange={val=>setGender(val)}
                            name="myRadioGroup"
              >
                            <HStack space={1}>
                              <Radio value={1} my={0} >
                                Female
                              </Radio>
                              <Radio value={2} mx={1}>
                                Male
                              </Radio>
                              <Radio value={3} mx={1}>
                                Other
                              </Radio>
                            </HStack>
                          </Radio.Group>
                          <HStack space={2}>
                            <VStack space={1}>
                               
                            <FormControl w="3/4" maxW="300" isRequired >
        <FormControl.Label>City</FormControl.Label>
                              <Select
                                width={wp('46%')}
                                onValueChange={value => setCity(value)}
                                selectedValue={city}
                                
                                isRequired
                                
                             
                                placeholder="Select city">
                                {cityList.map(i => (
                                  <Select.Item
                                    value={i[0]}
                                    label={i[1]}></Select.Item>
                                ))}
                              </Select>
                              <FormControl.ErrorMessage >
          Please make a selection!
        </FormControl.ErrorMessage>
        </FormControl>
                            </VStack>
                            <VStack space={1}>
                             
                            <FormControl w="3/4" maxW="300" isRequired >
        <FormControl.Label>State</FormControl.Label>

                              <Select
                                width={wp('46%')}
                                onValueChange={value => setStates(value)}
                                selectedValue={states}
                                placeholder="Select State">
                                {stateList.map(i => (
                                  <Select.Item
                                    value={i[0]}
                                    label={i[1]}></Select.Item>
                                ))}
                              </Select>
                              <FormControl.ErrorMessage >
          Please make a selection!
        </FormControl.ErrorMessage>
        </FormControl>
                            </VStack>
                          </HStack>
                          <FormControl  isRequired >
        <FormControl.Label>Country</FormControl.Label>
                          <Select
                            onValueChange={value => setCountries(value)}
                            selectedValue={countries}
                            placeholder="Select country">
                            {countryList.map(i => (
                              <Select.Item
                                value={i[0]}
                                label={i[1]}></Select.Item>
                            ))}
                          </Select>
                          <FormControl.ErrorMessage >
          Please make a selection!
        </FormControl.ErrorMessage>
        </FormControl>
                          <HStack space={2}>
                            <VStack space={1}>
                              <Text style={styles.text}>
                                Primary speciality
                              </Text>
                              <Select
                                width={wp('46%')}
                                onValueChange={value => setPrimary(value)}
                                selectedValue={primarySpl}
                             
                                placeholder="select primary speciality">
                                {diseaseList.map(i => (
                                  <Select.Item
                                    value={i[0]}
                                    label={i[1]}></Select.Item>
                                ))}
                              </Select>
                            </VStack>
                            <VStack space={1}>
                              <Text style={styles.text}>
                                Secondary speciality
                              </Text>
                              <Select
                                width={wp('46%')}
                                onValueChange={value => setSecondary(value)}
                                selectedValue={secondarySpl}
                                placeholder="select secondary speciality">
                                {diseaseList.map(i => (
                                  <Select.Item
                                    value={i[0]}
                                    label={i[1]}></Select.Item>
                                ))}
                              </Select>
                            </VStack>
                          </HStack>
                          <Text style={styles.text}>Additional speciality</Text>
                          <Select
                            onValueChange={value => setOther(value)}
                            selectedValue={otherSpl}
                            placeholder="select Additional speciality">
                            {diseaseList.map(i => (
                              <Select.Item
                                value={i[0]}
                                label={i[1]}></Select.Item>
                            ))}
                          </Select>
                          <FormControl mb="5">
                            <FormControl.Label>Education</FormControl.Label>
                            <Input
                              value={education}
                              onChangeText={education =>
                                setEducation(education)
                              }
                            />
                          </FormControl>

                          <FormControl mb="5">
                            <FormControl.Label>Mobile Number</FormControl.Label>
                            <Input
                              value={num}
                              onChangeText={num => setNum(num)}
                              keyboardType="numeric"
                            />
                          </FormControl>
                          <FormControl mb="5">
                            <FormControl.Label>
                              Doctor website url
                            </FormControl.Label>
                            <Input
                              value={website}
                              onChangeText={text => setWebsite(text)}
                              keyboardType="numeric"
                            />
                          </FormControl>
                          <FormControl  isRequired >
        <FormControl.Label>hospital_affliated</FormControl.Label>
                          <Select
                            onValueChange={value => setHospital(value)}
                            selectedValue={hospital}
                         
                            placeholder="select hospital affiliated">
                            {hospitalList.map(i => (
                              <Select.Item
                                value={i[0]}
                                label={i[1]}></Select.Item>
                            ))}
                          </Select>
                          <FormControl.ErrorMessage >
          Please make a selection!
        </FormControl.ErrorMessage>
        </FormControl>
                          <Text style={styles.text}>Do you accept insurance?</Text>
                          <Radio.Group
                            defaultValue={acceptInsurance}
                            value={acceptInsurance}
                            onChange={val=>setInsurance(val)}
                            name="myRadioGroup"
                            accessibilityLabel="Pick your favorite number">
                            <HStack space={1}>
                              <Radio value={1} my={0}>
                                Yes
                              </Radio>
                              <Radio value={0} my={0}>
                                No
                              </Radio>
                            </HStack>
                          </Radio.Group>
                          <Text style={styles.text}>
                            Tell Us About Yourself
                          </Text>
                          <TextArea
                            h={20}
                            placeholder="Text Area Placeholder"
                            w="100%"
                            defaultValue={about ? about : ''}
                            onChangeText={(text)=>setAbout(text)}
                          />
                          <Text style={{fontSize: 10, color: 'black'}}>
                            We never share your details without your consent.
                          </Text>
                        </VStack>
                      </View>
                    )}
                  </ScrollView>
                </Modal.Body>
                <Modal.Footer>
                  <TouchableOpacity style={styles.btn} onPress={()=>{formSubmit()
                  changeHandler()}}>
                    <Text style={{color: 'white', fontWeight: 'bold'}}>
                      Submit
                    </Text>
                  </TouchableOpacity>
                </Modal.Footer>
              </Modal.Content>
            </Modal>
          </View>
        ) : (
          <View>
            <View>
              <VStack space={2} ml="5" mt="5">
                <HStack>
                  <Card
                    style={{
                      width: wp('30%'),
                      height: hp('15%'),
                      backgroundColor: 'grey',
                      borderRadius: 200,
                      position: 'relative',
                      justifyContent: 'center',
                      paddingHorizontal: 5,
                      alignItems: 'center',
                    }}>
                    <TouchableOpacity onPress={choosePhotoFromLibrary}>
                      <ImageBackground
                        source={{uri: imageUser}}
                        style={{
                          width: wp('30%'),
                          height: hp('15%'),
                          borderRadius: 200,
                          overflow: 'hidden',
                        }}>
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

                  <View style={{marginLeft: 12}}>
                    <View>
                      <HStack space={1}>
                        <Text style={styles.margin}>{firstName}</Text>
                        <Text style={styles.margin}>{lastName}</Text>
                        <Icon
                          name="create-outline"
                          size={25}
                          color="#00415e"
                          style={{position: 'absolute', right: 0}}
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
        )}

        <View
          style={{
            position: 'absolute',
            bottom: 0,
            width: wp('100%'),
            padding: 10,
          }}>
          <TouchableOpacity
            style={{padding: 7, borderColor: '#00415e', margin: 5}}
            onPress={() => logout()}>
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
    );
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
  text: {
    color: 'black',
    fontFamily: 'Raleway-medium',
  },
  btn: {
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#343a40',
    justifyContent: 'center',
    alignItems: 'center',
    width: wp('30%'),
    height: hp('4.5%'),
    backgroundColor: '#343a40',
    color: 'white',
    fontFamily: 'Raleway-Bold',
  },
});
