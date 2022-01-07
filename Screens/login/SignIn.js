import React,{useState} from 'react';
import { 
    View, 
    Text, 
    TouchableOpacity, 
    TextInput,
    Platform,
    StyleSheet ,
    StatusBar,
    Alert
} from 'react-native';
import axios from 'axios';
import Home from '../MainTab/Home';
import * as Animatable from 'react-native-animatable';

import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import { useTheme } from 'react-native-paper';

import { backendHost } from '../../components/apiConfig';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BootstrapStyleSheet from 'react-native-bootstrap-styles';
const SignInScreen = ({navigation}) =>
{

    const [status, setStatus] = useState("");
    const [buttonClick, setClicked] = useState("");
    const [data, setData] = useState({
        email: "anilraina@etheriumtech.com",
        password:"Pass123456",
        check_textInputChange: false,
        secureTextEntry:true
    }
    )
     const [authid,setauthid]=useState([])
    const verify=()=>
    {
        navigation.navigate('Verify')
    }
  

    const bootstrapStyleSheet = new BootstrapStyleSheet();
    const { s, c } = bootstrapStyleSheet;

    const { colors } = useTheme();

   


    const updateSecureTextEntry = () => {
        setData({
            ...data,
            secureTextEntry: !data.secureTextEntry
        });
    }

 const loginForm = () => {
   
        
        setClicked(1);
        axios.post(`${backendHost}/login?cmd=login&email=${data.email}&psw=${data.password}&rempwd=on`)
         
        .then(res =>{ 
            console.log(res.data.registration_id)
            console.log(res.data.registration_type)
             setStatus(res.status)
             setId(res.data.registration_id)
            setType(res.data.registration_type)
             
           
         })
         
      
        .catch(err => err)
           
        
    }
    const setId = async (id) =>{
       
             try{
                 console.log(JSON.stringify(id))
                 await AsyncStorage.setItem('author',JSON.stringify(id))
              
                
             }
             catch(error){
                 console.log(error)
             }
    }
    const setType= async (type) =>{
       
        try{
         
            await AsyncStorage.setItem('rateType',JSON.stringify(type))
      
           
        }
        catch(error){
            console.log(error)
        }
}

    function AfterLogin() {
        
    
        if(status === 200)
        {
     
            console.log(status)

            navigation.navigate('MainTab',{screen:'Home',params:{
                    userId: authid 
                }
            },
            )
   
        }
         if(status === 401){
          return(
            Alert.alert('Invalid Password or Email!')
          )
        } 
        // else if(status === 401){
        //   return(
        //     <div className="alert alert-secondary">Incorrect email or password!</div> 
        //   )
        // } 
      } 
   
     
    return (
 
      <View style={styles.container}>
          <StatusBar backgroundColor='#00415e' barStyle="light-content"/>
        <View style={styles.header}>
            <Text style={styles.text_header}>Welcome!</Text>
        </View>
        <Animatable.View 
            animation="fadeInUpBig"
            style={[styles.footer, {
                backgroundColor: colors.background
            }]}
        >
            <Text style={[styles.text_footer, {
                color: colors.text
            }]}>Username</Text>
            <View style={styles.action}>
                <FontAwesome 
                    name="user-o"
                    color={colors.text}
                    size={20}
                />
                <TextInput 
                    placeholder="Email"
                    placeholderTextColor="#666666"
                    style={[styles.textInput, {
                        color: colors.text
                    }]}
                    autoCapitalize="none"
                    value={data.email}
                    returnKeyType='done'
                    onChangeText={
                        e => setData({...data,email:e})
                      } 
                
                />
                {data.check_textInputChange ? 
                <Animatable.View
                    animation="bounceIn"
                >
                    <Feather 
                        name="check-circle"
                        color="green"
                        size={20}
                    />
                </Animatable.View>
                : null}
            </View>
          

            <Text style={[styles.text_footer, {
                color: colors.text,
                marginTop: 35
            }]}>Password</Text>
            <View style={styles.action}>
                <Feather 
                    name="lock"
                    color={colors.text}
                    size={20}
                />
                <TextInput 
                
                    placeholder="Your Password"
                    placeholderTextColor="#666666"
                    secureTextEntry={data.secureTextEntry ? true : false}
                    style={[styles.textInput, {
                        color: colors.text
                    }]}
                    autoCapitalize="none"
                    returnKeyType='go'
                    value={data.password}
              onSubmitEditing={loginForm}
                    onChangeText={
                        e => setData({...data,password:e})
                      } 
                />
                <TouchableOpacity
                    onPress={updateSecureTextEntry}
                >
                    {data.secureTextEntry ? 
                    <Feather 
                        name="eye-off"
                        color="grey"
                        size={20}
                    />
                    :
                    <Feather 
                        name="eye"
                        color="grey"
                        size={20}
                    />
                    }
                </TouchableOpacity>
            </View>
            
            {/* { data.isValidLength ? null : 
            <Animatable.View animation="fadeInLeft" duration={500}>
            <Text style={styles.errorMsg}>Password must be 8 characters long.</Text>
            </Animatable.View>
            } */}
            

            <TouchableOpacity>
                <Text style={{color: '#00415e', marginTop:15}} onPress={verify}  >Forgot password?</Text>
            </TouchableOpacity>
            <View style={styles.button}>
            {
      buttonClick === 1?
        AfterLogin()
        : null
    }
                <TouchableOpacity
                    style={styles.signIn}
                    onPress={loginForm}

                >
            
             
                
                    <Text style={[styles.textSign, {
                        color:'#fff',
                    
                    }]}>Sign In</Text>
         
                </TouchableOpacity>


                <TouchableOpacity
                    onPress={() => navigation.navigate('SignUpScreen')}
                    style={[styles.signUp,{
                        borderColor: '#00415e',
                        borderWidth: 1,
                        marginTop: 15
                    }]}
                >
                    <Text style={[styles.textSign, {
                        color: '#00415e'
                    }]}>Sign Up</Text>
                </TouchableOpacity>
            </View>
        </Animatable.View>
      </View>
   
    );
};

export default SignInScreen;

const styles = StyleSheet.create({
    container: {
      flex: 1, 
      backgroundColor: '#00415e'
    },
    header: {
        flex: 1,
        justifyContent: 'flex-end',
        paddingHorizontal: 20,
        paddingBottom: 50
    },
    footer: {
        flex: 3,
        backgroundColor: '#fff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: 20,
        paddingVertical: 30
    },
    text_header: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 30
    },
    text_footer: {
        color: '#05375a',
        fontSize: 18
    },
    action: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
        paddingBottom: 5
    },
    actionError: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#FF0000',
        paddingBottom: 5
    },
    textInput: {
        flex: 1,
        marginTop: Platform.OS === 'ios' ? 0 : -12,
        paddingLeft: 10,
        color: '#05375a',
    },
    errorMsg: {
        color: '#FF0000',
        fontSize: 14,
    },
    button: {
        alignItems: 'center',
        marginTop: 50
    },
    signUp:{
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,

    },
    signIn: {
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        backgroundColor: '#00415e'
    },
    textSign: {
        fontSize: 18,
        fontWeight: 'bold'
    }
  });
