import React, { useEffect, useState } from 'react'
import { NavigationContainer } from '@react-navigation/native';
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
    TextInput,
    Animated,
    ScrollView,
    TouchableOpacity,
    Alert
} from 'react-native';
import { useToast, Divider, Radio,FormControl,Select,TextArea } from 'native-base';
import Svg, { Path, Circle } from 'react-native-svg';
import { useNavigation } from '@react-navigation/core';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StackActions } from '@react-navigation/routers';
import Icon from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import LottieView from 'lottie-react-native';
import { useSelector, useDispatch } from 'react-redux';
import { screenName } from '../Redux/Action';
import { backendHost } from '../../../components/apiConfig';
import ImagePicker from 'react-native-image-crop-picker';
import InputBox from '../../../components/InputBox';
;

const EditProfile = ({route}) => {

const userProfile=useSelector((state)=>state.profileInfo.data)
const row=useSelector((state)=>state.docRow.rowId)
const type= useSelector((state)=>state.userType.typeId)
const navigation=useNavigation()
    const [gender, setGender] = useState();

  const [about, setAbout] = useState();

  const [diseaseList, setDiseaseList] = useState([]);
  const [stateList, setStateList] = useState([]);
  const [cityList, setCityList] = useState([]);
  const [countryList, setCountryList] = useState([]);
  const [hospitalList, setHospitalList] = useState([]);

  const [states, setStates] = useState();
  const [city, setCity] = useState();
  const [countries, setCountries] = useState();
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [email, setEmail] = useState();
  const [country,setCountry]=useState()
  const [website, setWebsite] = useState();
  const [primary, setPrimary] = useState();
  const [secondary, setSecondary] = useState();
  const [other, setOther] = useState();
  const [education, setEducation] = useState();
  const [awards, setAwards] = useState();
  const [num, setNum] = useState();
  const [hospital, setHospital] = useState();
  const [acceptInsurance, setInsurance] = useState();
  const [imageUser, setImageUser] = useState(``);
  const preData= route.params.data

  const [image, setImage] = useState(
    `http://all-cures.com:8280/cures_articleimages/doctors/${userProfile.rowno}.png`,
  );
  

  const fetchTables = () => {
    Promise.all([
      fetch(`${backendHost}/article/all/table/specialties`).then(res =>
        res.json(),
      ).catch(err => err),
      fetch(`${backendHost}/article/all/table/hospital`).then(res =>
        res.json(),
      ).catch(err => err),
      fetch(`${backendHost}/article/all/table/states`).then(res => res.json()).catch(err => err),
      fetch(`${backendHost}/article/all/table/city`).then(res => res.json()).catch(err => err),
      fetch(`${backendHost}/article/all/table/countries`).then(res =>
        res.json(),
      ).catch(err => err),
    ])
      .then(([diseaseData, hospitalData, stateData, cityData, countryData]) => {
        setDiseaseList(diseaseData);
        setHospitalList(hospitalData);
        setStateList(stateData);
        setCityList(cityData);
        setCountryList(countryData);
      })
      .catch(err => {
        err
      });
  };

  useEffect(() => {
    fetchTables();

  }, []);

    const formSubmit = e => {


        axios
          .post(
            `${backendHost}/doctors/updateprofile?d=${parseInt(
              Math.random() * 1000,
            )}`,
            {
              docid: userProfile.docid,
              rowno: row,
              docname_first: firstName,
              docname_last: lastName,
              primary_spl: primary,
              sub_spls: secondary,
              other_spls: other,
              edu_training: education,
              telephone_nos: num,
              hospital_affliated: hospital,
              insurance_accept: acceptInsurance,
              gender: gender,
              about: about,
              awards: awards,
              city: city,
              state: states,
              country_code: countries,
              website_url: website,
            },
          )
          .then(res => {
            if (res.data === 1) {
           Alert.alert('Profile Updated','Profile updated successfully',[
         {
            text:'OK',
            onPress:()=>{
                navigation.push('profile')

            }
         }
              
           ])
            } else {
              Alert.alert('Some error occured. Try again later');
            }
          })
          .catch(res => {
    
            Alert(`Some error occured. Try again later ${res}`);
          });
      };
      const changeHandler = event => {
        console.log('ok')
        if (photo.name.size > 1048576) {
          Alert.alert('Image should be less than 1MB!');
          return;
        }
    
        handleImageSubmission();
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
      console.log('hellook')
        const formData = new FormData();
        formData.append('File', photo);
        axios.post(`${backendHost}/dashboard/imageupload/doctor/${userProfile.rowno}`, {
         
          body: formData,
        })
          .then(response => {
            console.log('r',response.data)
            response.data;
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
    const choosePhotoFromLibrary = () => {
       
        ImagePicker.openPicker({
          width: 300,
          height: 300,
          cropping: true,
          compressImageQuality: 0.7,
        }).then(image => {
            console.log(image)
            console.log(image.path)
          const a = image.path.split('/');
          const b = a[a.length - 1];
        //   console.log(b)
          type == 1
            ? (setImage(image.path), setSelectedFile(b), bs.current.snapTo(1),handleImageSubmission())
            : setImageUser(image.path);
          bs.current.snapTo(1);
        }).catch(err => err);;
      };
    return (
        <View style={styles.container}>
            <View style={styles.header} >
                <View
                    style={{
                        width: 100,
                        height: 100,
                        backgroundColor: 'grey',
                        borderRadius: 200,

                    }}>
                    <TouchableOpacity onPress={choosePhotoFromLibrary} >
                        <ImageBackground
                               source={{uri:image}}
                            style={{
                                width: 100,
                                height: 100,
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

                                    }}
                                />
                            </View>
                        </ImageBackground>
                    </TouchableOpacity>
                </View>

            </View>
            <Divider />

            <ScrollView style={styles.body}>

                <View style={styles.box}>

                    <InputBox
                        placeholder={'enter first name'}
                        label={'First Name'}
                        keyboard='default'
                        defaultValue={preData.first}
                        value={firstName}
                        onChangeText={text => setFirstName(text)}
                        size={'3xl'} />
                </View>

                <View style={styles.box}>
                    <InputBox
                        placeholder={'enter last name'}
                        label={'Last Name'}
                        defaultValue={preData.last}
                        keyboard='default'
                        value={lastName}
                        onChangeText={text => setLastName(text)}
                        size={'3xl'} />
                </View>

                <View style={styles.box}>
                    <FormControl>
                        <FormControl.Label _text={{color:'#00415e'}} ml='1' >Gender</FormControl.Label>
                    </FormControl>
                    <Radio.Group
                        style={styles.radio}
                        defaultValue={preData.gender_code}

                        value={gender}
                        onChange={val => setGender(val)}
                        name="myRadioGroup">

                        <Radio value={1} my={0}>
                            Female
                        </Radio>
                        <Radio value={2} mx={1}>
                            Male
                        </Radio>
                        <Radio value={3} mx={1}>
                            Other
                        </Radio>

                    </Radio.Group>

                </View>
                <View style={styles.box}>
                <FormControl maxW="100%"  isRequired>
                                <FormControl.Label ml='1' _text={{color:'#00415e'}}>City</FormControl.Label>
                                <Select
                                rounded='3xl'
                                  width={'100%'}
                                  defaultValue={preData.city_code}
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
                                <FormControl.ErrorMessage>
                                  Please make a selection!
                                </FormControl.ErrorMessage>
                              </FormControl>
                </View>

                <View style={styles.box}>
                <FormControl maxW="100%"  isRequired>
                                <FormControl.Label ml='1' _text={{color:'#00415e'}}>State</FormControl.Label>
                                <Select
                                rounded='3xl'
                                  width={'100%'}
                                  onValueChange={value => setStates(value)}
                                  selectedValue={states}
                                  defaultValue={preData.state_code}
                                  isRequired
                                  placeholder="Select state">
                                  {stateList.map(i => (
                                    <Select.Item
                                      value={i[0]}
                                      label={i[1]}></Select.Item>
                                  ))}
                                </Select>
                                <FormControl.ErrorMessage>
                                  Please make a selection!
                                </FormControl.ErrorMessage>
                              </FormControl>
                </View>
                <View style={styles.box}>
                <FormControl maxW="100%"  isRequired>
                                <FormControl.Label ml='1' _text={{color:'#00415e'}}>Country</FormControl.Label>
                                <Select
                                rounded='3xl'
                                  width={'100%'}
                                  onValueChange={value => setCountry(value)}
                                  defaultValue={preData.country_code}
                                  selectedValue={country}
                                  isRequired
                                  placeholder="Select country">
                                  {countryList.map(i => (
                                    <Select.Item
                                      value={i[0]}
                                      label={i[1]}></Select.Item>
                                  ))}
                                </Select>
                                <FormControl.ErrorMessage>
                                  Please make a selection!
                                </FormControl.ErrorMessage>
                              </FormControl>
                </View>
                <View style={styles.box}>
                <FormControl maxW="100%"  >
                                <FormControl.Label ml='1' _text={{color:'#00415e'}}>Primary Speciality</FormControl.Label>
                                <Select
                                rounded='3xl'

                                  width={'100%'}
                                  onValueChange={value => setPrimary(value)}
                                  defaultValue={preData.primary_spl_code}
                                  selectedValue={primary}
                                  isRequired
                                  placeholder="Select primary speciality">
                                  {diseaseList.map((i) => (
                                    <Select.Item
                                      value={i[0]}
                                      label={i[1]}></Select.Item>
                                  ))}
                                </Select>
                                <FormControl.ErrorMessage>
                                  Please make a selection!
                                </FormControl.ErrorMessage>
                              </FormControl>
                </View>
                <View style={styles.box}>
                <FormControl maxW="100%"  >
                                <FormControl.Label ml='1' _text={{color:'#00415e'}}>Secondary Speciality</FormControl.Label>
                                <Select
                                rounded='3xl'
                                  width={'100%'}
                                  onValueChange={value => setSecondary(value)}
                                  defaultValue={preData.secondary_spl_code}
                                  selectedValue={secondary}
                                  isRequired
                                  placeholder="Select secondary speciality">
                                  {diseaseList.map(i => (
                                    <Select.Item
                                      value={i[0]}
                                      label={i[1]}></Select.Item>
                                  ))}
                                </Select>
                                <FormControl.ErrorMessage>
                                  Please make a selection!
                                </FormControl.ErrorMessage>
                              </FormControl>
                </View>
                <View style={styles.box}>
                <FormControl maxW="100%" >
                                <FormControl.Label ml='1' _text={{color:'#00415e'}}>Additional Speciality</FormControl.Label>
                                <Select
                                rounded='3xl'
                                  width={'100%'}
                                  onValueChange={value => setOther(value)}
                                  defaultValue={preData.other_spls_code}
                                  selectedValue={other}
                                  isRequired
                                  placeholder="Select additional speciality">
                                  {diseaseList.map(i => (
                                    <Select.Item
                                    
                                      value={i[0]}
                                      label={i[1]}></Select.Item>
                                  ))}
                                </Select>
                                <FormControl.ErrorMessage>
                                  Please make a selection!
                                </FormControl.ErrorMessage>
                              </FormControl>
                </View>
                   
                <View style={styles.box}>

<InputBox
    placeholder={'enter education'}
    label={'Education'}
    defaultValue={preData.edu_training}
    value={education}
    onChangeText={education =>
      setEducation(education)
    }
    keyboard='default'
    size={'3xl'} />
    
</View>
<View style={styles.box}>

                    <InputBox
                        placeholder={'enter mobile number'}
                        label={'Mobile Number'}
                        defaultValue={preData.telephone_nos}
                        keyboard='numeric'
                        value={num}
                        onChangeText={num => setNum(num)}
                        size={'3xl'} />
                </View>

                <View style={styles.box}>

                    <InputBox
                        placeholder={'enter website url'}
                        label={'Doctor website url'}
                        defaultValue={preData.website_url}
                         value={website}
                              onChangeText={text => setWebsite(text)}
                        keyboard='default'
                        size={'3xl'} />
                </View>
                <View style={styles.box}>
                <FormControl maxW="100%"  isRequired>
                                <FormControl.Label ml='1' _text={{color:'#00415e'}}>Hospital affiliated</FormControl.Label>
                                <Select
                                rounded='3xl'
                                  width={'100%'}
                                  defaultValue={preData.hospital_affiliated}
                                  onValueChange={value => setHospital(value)}
                                  selectedValue={hospital}
                                  isRequired
                                  placeholder="Select hospital affiliated">
                                  {hospitalList.map(i => (
                                    <Select.Item
                                      value={i[0]}
                                      label={i[1]}></Select.Item>
                                  ))}
                                </Select>
                                <FormControl.ErrorMessage>
                                  Please make a selection!
                                </FormControl.ErrorMessage>
                              </FormControl>
                  
                </View>

                <View style={styles.box}>
                    <FormControl>
                        <FormControl.Label _text={{color:'#00415e'}} ml='1' >Do you accept insurance?</FormControl.Label>
                    </FormControl>
                    <Radio.Group
                        style={styles.radio}
            
                        defaultValue={preData.insurance_accept}
                        value={acceptInsurance}
                        onChange={val => setInsurance(val)}
                        name="myRadioGroup">

                        <Radio value={true} my={0}>
                           Yes
                        </Radio>
                        <Radio value={false} mx={1}>
                           No
                        </Radio>
                       

                    </Radio.Group>

                </View>

                <View style={styles.box}>
                <FormControl>
                        <FormControl.Label _text={{color:'#00415e'}} ml='1' >Tell us about yourself</FormControl.Label>
                    </FormControl>
                <TextArea
                            h={20}
                            defaultValue={preData.about}
                            placeholder="Text Area Placeholder"
                            w="100%"
                            _focus={{borderColor:'#00415e'}}
                            onChangeText={text => setAbout(text)}
                          />
                          </View>
                          <View style={styles.box}>
                 <Text style={{ fontSize: 10, color: 'black' }}>
                            We never share your details without your consent.
                          </Text>
</View>
<View style={styles.submit}>


                          <TouchableOpacity
                    style={styles.btn}
                    onPress={() => {
                      formSubmit();
                      changeHandler();

                    }}>
                    <Text style={{ color: 'white', fontFamily: 'Raleway-Bold',textAlign:'center',fontSize:16}}>
                      Submit
                    </Text>
                  </TouchableOpacity>
                  </View>

            </ScrollView>



        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    header: {
        padding: 20,
        alignItems: 'center',
        justifyContent: 'center'
    },

    body: {
        width: '100%',
        paddingHorizontal:13,
        paddingVertical:10
    },
    label: {
        marginLeft: 5,
        fontFamily: 'Raleway-Bold',
        color: '#00415e'
    },
    radio: {
        flexDirection: 'row',

    },
    box: {
        marginBottom: 5
    },
    btn: {
        borderWidth: 1,
        borderRadius: 20,
        borderColor: '#00415e',
        justifyContent: 'center',
        width: 150,
        height: 40,
        backgroundColor: '#00415e',
        color: 'white',
        fontFamily: 'Raleway-Bold',
        marginBottom:20,
      },
      submit:{
        alignItems:'center',
        padding:5
      }

});
export default EditProfile