import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Platform,
  StyleSheet,
  StatusBar,
  Alert,
  ImageBackground,
  ToastAndroid,
  BackHandler,
  SafeAreaView,
  Pressable
} from 'react-native';
import {
  HStack,
  Input,
  Stack,
  VStack,
  Modal,
  Select
} from 'native-base';
import axios from 'axios';

import * as Animatable from 'react-native-animatable';
import { useToast } from 'native-base';
import LottieView from 'lottie-react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { backendHost } from '../../components/apiConfig';
import AsyncStorage from '@react-native-async-storage/async-storage';
import analytics from '@react-native-firebase/analytics';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { reg, type, row, getEmail, getPass } from '../Redux/Action';
import { useStore,useSelector } from 'react-redux';
import { screenName } from '../Redux/Action';
import crashlytics from '@react-native-firebase/crashlytics';
import { set } from 'react-native-reanimated';



const Delete = ({ props, route }) => {
    const email=useSelector((state)=>state.mail.mailId)
    const pass =useSelector((state)=>state.pass.passId)
  const [status, setStatus] = useState('');
  const navigation = useNavigation()
  const [buttonClick, setClicked] = useState('');
  const [loginSuccess, setLoginSuccess] = useState(true);
  const[passwordSecured,setPasswordSecured]=useState(false)
  const routeName = useStore()
  const [visible,setVisible]=useState(false)
 const[reason,setReason]=useState(null)
  const user = useSelector((state)=>state.userId.regId)
  const [data, setData] = useState({
    email: '',
    password: '',
    check_textInputChange: false,
    secureTextEntry: true,
  });
  const [authid, setauthid] = useState([]);
  const verify = () => {
    navigation.navigate('Verify');
  };
  const dispatch = useDispatch();


  const toast = useToast();
  const updateSecureTextEntry = () => {
    setData({
      ...data,
      secureTextEntry: !data.secureTextEntry,
    });
  };

//   const showModal=()=>setVisible(true)
//   const hideModal=()=>setVisible(false)
  useEffect(() => {

  })


  const loading = () => {
    return (
      <View style={{ alignItems: 'center' }}>
        <HStack space={2} justifyContent="center">
          <LottieView
            source={require('../../assets/animation/pulse.json')}
            autoPlay
            loop
            style={{ width: 50, height: 50 }}
          />
    
       
        </HStack>
      </View>
    );
  };

  const onConfirm=()=>{
 
    if(data.password === pass && data.email === email ){
      setVisible(!visible)
    }
    else{
     Alert.alert('email or password invalid')
    }
  }

  const deleted=()=>{
    if(reason!=null){

     
axios.post(`${backendHost}/data/deactivate/${user}/${reason}`).then((res)=>{
if(res.data==1){
  Alert.alert('Account Deactivated Successfully','your acoount will be delted permanently after 30 days,login under 30 days to activate your account', [
           
    {
      text: 'OK',
      onPress: () => {
     dispatch(screenName('SPLASH')),dispatch(reg(0))
      }
    },
  ]
  )
}
else{
  Alert.alert('Some error occured,try again later')
}

})

     
        
        }

    else{
        Alert.alert('Please select a reason!')
    }
  
   
 
  }


  return (
    <SafeAreaView style={styles.container}>


      <ImageBackground
        source={require('../../assets/img/backheart.png')}
        resizeMode="stretch"
        style={styles.image}>



        <View style={styles.body}>


          <View style={styles.header}>
            <Text style={styles.headerText}>Account Deletion</Text>
            <Text style={{color:'#fff',textAlign:'center',fontSize:10,marginTop:2}} >Please confirm your account details.</Text>
          </View>

          <View style={{marginBottom:15}}>
          <Input 
            placeholder='enter email' 
            height={12}
            color={'#fff'}
            _focus={{ borderWidth: 2, borderColor: '#fff', color: '#fff', placeholderTextColor: '#fff' }} 
            autoCapitalize="none"
                  value={data.email}
                  returnKeyType="done"
                  onChangeText={e => setData({...data, email: e})}
            />
          </View>

          <View style={{marginBottom:15}}>
            <Input 
            placeholder='enter password' 
            height={12}
             color={'#fff'}
            _focus={{ borderWidth: 2, borderColor: '#fff', color: '#fff', placeholderTextColor: '#fff' }}
            secureTextEntry={passwordSecured}
            autoCapitalize="none"
            returnKeyType="go"
            value={data.password}
            onSubmitEditing={onConfirm}
            onChangeText={e => setData({...data, password: e})}
            InputRightElement={<View><TouchableOpacity onPress={()=>setPasswordSecured(!passwordSecured)}><Feather name={passwordSecured?'eye-off':'eye'} color="grey" size={20} style={{marginRight:10}} /></TouchableOpacity></View>}
             />
          </View>

          <TouchableOpacity style={styles.signIn} onPress={onConfirm}>
                <Text
                  style={[
                    styles.textSign,
                    {
                      fontFamily: 'Raleway-Bold',
                      color: '#00415e',
                    },
                  ]}>
                Confirm
                </Text>
              </TouchableOpacity>

           
                {buttonClick ? loading() : null}
              

        </View>
     
              </ImageBackground>
              <Modal
          isOpen={visible}
          onClose={()=>setVisible(false)}
          avoidKeyboard
          justifyContent="center"
          size='xl'
          >
          <Modal.Content>
            <Modal.CloseButton />
            <Modal.Header>Reason for account deletion</Modal.Header>
            <Modal.Body padding={4} marginBottom={2}>
                <Text style={{color:'#00415e'}} >Please select a reason.</Text>
                <Select marginTop='2' _item={{color:'#00415e',}}  marginBottom={'2'} selectedValue={reason} minWidth="200" accessibilityLabel="Choose Service" placeholder="Choose Service" _selectedItem={{
        bg: "aliceblue", 
        color:'#00415e'
    
      }} mt={1} onValueChange={itemValue => setReason(itemValue)}>
          <Select.Item  label="Content is not great" value={1} />
          <Select.Item label="I got cured" value={2} />
          <Select.Item label="Not enjoying All Cures" value={3} />
          <Select.Item label="Do not use All Cures" value={4} />

        </Select>
<TouchableOpacity style={styles.submit} onPress={deleted}>
    <Text style={styles.textSign}>Submit</Text>

</TouchableOpacity>

            </Modal.Body>
            
          </Modal.Content>
        </Modal>
    </SafeAreaView>
  );
};

export default Delete;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#00415e',
  },
  body: {
    justifyContent: 'center',
    width: '100%',
    height: '100%'
  },
  skip: {
    color: '#fff',
    position: 'absolute',
    top: 20,
    right: 20,
    fontSize: 18,
    fontFamily: 'Raleway-Bold',
  },
  header: {
    width: '100%',
    marginBottom:10
  },

  headerText: {
    fontSize: 25,
    fontFamily: 'Raleway-Bold',
    color: '#fff',
    alignSelf: 'center'

  },

  text_header: {
    fontFamily: 'Raleway-Bold',
    color: '#fff',

    fontSize: 30,

    textAlign: 'center',
  },
  text_footer: {
    color: '#05375a',
    fontSize: 18,
  },
  action: {
    flexDirection: 'row',

    borderWidth: 1,
    borderRadius: 15,
    borderColor: '#f2f2f2',
    paddingBottom: 5,
  },
  actionError: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#FF0000',
    paddingBottom: 5,
  },
  textInput: {
    height: 48,
    flex: 1,
    padding: 6,
    paddingHorizontal: 15,
    color: '#05375a',
    fontFamily: 'Raleway',
  },
  errorMsg: {
    color: '#FF0000',
    fontSize: 14,
  },
  button: {
    alignItems: 'center',
    marginTop: 50,
  },

  signIn: {
    width: '100%',
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
    backgroundColor: '#fff',
  },
  textSign: {
    fontSize: 18,
    textAlign: 'center',
    fontFamily:'Raleway-Medium',
    color:'#fff',
  },
  image: {
    width: '100%',
    height: '100%',
    padding: 15,
  },
  submit:{
    backgroundColor:'#00415e',
    alignItems:'center',
    padding:5,
    borderRadius:25,
    marginBottom:0
  }
});