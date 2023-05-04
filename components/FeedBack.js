import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
TextInput,
  Platform,
  StyleSheet,
  ScrollView,
  StatusBar,
KeyboardAvoidingView,
  Alert,
} from 'react-native';
import axios from 'axios';
import { Button } from 'native-base';


import LottieView from 'lottie-react-native';
import {backendHost} from './apiConfig';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { TextBox } from './Input';
import {Spinner, useToast} from 'native-base';
const FeedBack = () => {
  const [firstName,setFirstName]= useState('')
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [number, setNumber] = useState('');
  const [feedBack,setFeedBack]=useState('')

  const toast = useToast();

  const [title, setTitle] = useState('');
  const [article, setArticle] = useState('');





  const [loading, setLoading] = useState(false);
  const submitFeedbackForm = e => {
    if (feedBack != '') {
      setLoading(true);
      axios.defaults.withCredentials = true;
      axios
        .post(`${backendHost}/admin/create/feedback  `, {
          firstname: firstName,
          lastname: lastName,
          email: email,
          phonenumber: number,
          feedback: feedBack,
        })
        .then(res => {
          if (res.data === 1) {
            setLoading(false);
            setFirstName('')
            setLastName('')
            setEmail('')
            setNumber('')
            setFeedBack('')
            toast.show({
              title: 'Feedback submitted successfully!',
              description: 'Thankyou for your feedback.',
              status: 'success',
              placement: 'bottom',
              style: {borderRadius: 20, width: wp('80%'), marginBottom: 20},
            }).catch(err=>err);;
          } else {
            setLoading(false);
            toast.show({
              title: 'Some error occured',
              description: 'Try again',
              status: 'warning',
              placement: 'bottom',
              style: {borderRadius: 20, width: wp('80%'), marginBottom: 20},
            });
          }
        })
        .catch(err => {
          err;
          throw err;
        });
    } else {
      setLoading(false);
      Alert.alert('Enter feedback');
    }
  };

  // const titleValue = () => {
  //   return (
  //     <View style={styles.action}>
  //       <TextInput
  //         placeholder="Enter first name"
  //         placeholderTextColor="#00415e"
  //         style={[styles.textInputTitle, {color: '#00415e', padding: 10}]}
  //         autoCapitalize="none"
  //         value={title}
  //         returnKeyType="done"
  //         onChangeText={e => setTitle(e)}
  //       />

  //       {data.check_textInputChange ? (
  //         <View animation="bounceIn">
  //           <Feather name="check-circle" color="green" size={20} />
  //         </View>
  //       ) : null}
  //     </View>
  //   );
  // };
  // const remarks = () => {
  //   return (
  //     <View style={styles.action}>
  //       <TextInput
  //         placeholder="Enter email"
  //         placeholderTextColor="#00415e"
  //         secureTextEntry={data.secureTextEntry ? true : false}
  //         style={[
  //           styles.textInput,
  //           {
  //             color: '#00415e',
  //             padding: 10,
  //           },
  //         ]}
  //         autoCapitalize="none"
  //         returnKeyType="go"
  //         value={email}
  //         onChangeText={e => setEmail(e)}
  //       />
  //     </View>
  //   );
  // };

  // const articles = () => {
  //   return (
  //     <View style={styles.article}>
  //       <TextInput
  //         placeholder="Enter your feedback"
  //         placeholderTextColor="#00415e"
  //         secureTextEntry={data.secureTextEntry ? true : false}
  //         style={[
  //           styles.textInputArticle,
  //           {
  //             color: '#00415e',
  //             height: 120,
  //             fontSize: 15,
  //           },
  //         ]}
  //         autoCapitalize="none"
  //         returnKeyType="go"
  //         value={article}
  //         onChangeText={e => setArticle(e)}
  //         multiline={true}
  //       />
  //     </View>
  //   );
  // };

  return (
    <View style={styles.container}>
         {loading ? (
          <View style={styles.loading}>
            <LottieView
              source={require('../assets/animation/load.json')}
              autoPlay
              loop
              style={{width: 50, height: 50}}
            />
          </View>
        ) : null}
            <KeyboardAvoidingView behavior="padding" style={{flex: 1}}>
      <ScrollView style={{flex:1,paddingHorizontal:10}}>

        <TextBox 
        label={'Enter first name'}
        placeholder={' enter first name'}
         value={firstName}
         returnKeyType={'done'}
         keyboardType={'default'}
         onChangeText={(text)=>setFirstName(text)}
         multiline={false}
        
        />
           <TextBox 
                 label={'Enter last name'}
           placeholder={' enter last name'}
         value={lastName}
         returnKeyType={'done'}
         keyboardType={'default'}
         onChangeText={(text)=>setLastName(text)}
         multiline={false}
        
        />
           <TextBox
                 label={'Enter email'} 
           placeholder={' enter email'}
         value={email}
         returnKeyType={'done'}
         keyboardType={'email-address'}
         onChangeText={(text)=>setEmail(text)}
         multiline={false}
        
        />

<TextBox
      label={'Enter number'}
placeholder={' enter number'}
         value={number}
         returnKeyType={'done'}
         keyboardType={'numeric'}
         onChangeText={(text)=>setNumber(text)}
         multiline={false}
        
        />

         <View style={{marginVertical:15}}>
            <Text style={{marginLeft:8,color:'#00415e',fontFamily:'Raleway-Regular'}}>Enter feedback (required)</Text>
        <TextInput
           
           placeholder={' enter feedback'}
           placeholderTextColor="#00415e"
                    value={feedBack}
                    returnKeyType={'go'}
                    keyboardType={'default'}
                    onChangeText={(text)=>setFeedBack(text)}
                    multiline={true}
        style={[styles.textInputTitle,{height:120,textAlignVertical:'top'}]}
        
        
        />
        </View>
 

        <View style={{paddingHorizontal:60,marginTop:15}}>
            <Button
       
            borderRadius={25}
          width='100%'
          backgroundColor={'#00415e'}
        fontFamily={'bold'}
              onPress={e => submitFeedbackForm(e)}>
              
           <Text style={{color:'#fff',fontFamily:'Raleway-Bold',fontSize:16}}>Submit</Text>
            </Button>
          </View>
      
     
 
        
      </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

export default FeedBack;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',

  },
  body: {
    borderWidth: 1,
    backgroundColor: '#fff',
    Color: 'lightgrey',
    borderColor: 'lightgrey',
    marginTop: Platform.OS === 'ios' ? 0 : -35,
    width: 380,
  },
  textBody: {
    padding: 5,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  box: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: 'lightgrey',
  },
  card: {
    borderWidth: 1,
    Color: 'lightgrey',
    borderColor: 'lightgrey',
    position: 'relative',
    left: 10,
    width: 358,
  },
  textCard: {
    padding: 10,
    fontSize: 18,
    fontWeight: 'bold',
  },
  header: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
    paddingBottom: 50,
  },

  text_footer: {
    fontWeight: 'bold',
    color: '#05375a',
    fontSize: 18,
    padding: 0,
  },
  action: {
    flexDirection: 'row',
    margin: 7,

    paddingBottom: 5,
  },
  article: {
    flexDirection: 'row',
    flex:1,
    margin: 6,
    padding: 0,
  },
  actionError: {
    flexDirection: 'row',
    marginTop: 0,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#FF0000',
    paddingBottom: 5,
  },
  textInput: {
    borderRadius: 15,
    flex: 1,

    marginTop: Platform.OS === 'ios' ? 0 : -10,
    fontFamily: 'Raleway-Regular',
    borderWidth: 1,
    borderColor: 'lightgrey',
    color: 'grey',
    fontSize: 16,
    marginBottom: 10,
    marginVertical: 0,

    backgroundColor: 'rgba(0, 65, 94, 0.2)',
  },
  textInputTitle: {
    borderRadius: 15,
    color: 'grey',
    fontSize: 15,
alignItems:'center',
paddingLeft:15,
    fontFamily: 'Raleway-Regular',
    width:'100%',
    color:'#00415e',
    backgroundColor: 'rgba(0, 65, 94, 0.2)',
  },
  textInputArticle: {
    flex: 1,
    borderRadius: 15,
    color: 'grey',
    fontSize: 20,
    textAlignVertical: 'top',
    paddingHorizontal: 10,
    fontFamily: 'Raleway-Regular',
    backgroundColor: 'rgba(0, 65, 94, 0.2)',
  },
  errorMsg: {
    color: '#FF0000',
    fontSize: 14,
  },
  button: {
    alignItems: 'center',
    marginTop: 50,
  },

  text: {
    color: 'grey',
    fontWeight: 'bold',
    fontSize: 18,
    position: 'relative',
    left: 15,
    marginBottom: 8,
  },
  textBtn: {
    color: '#00415e',
    textAlign: 'center',
    fontSize: 20,
  },

  btn: {
    borderWidth: 1,
    borderRadius: 20,
    borderColor: 'rgba(0, 65, 94, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    width: wp('50%'),
    height: 40,
    
    backgroundColor: 'rgba(0, 65, 90, 0.2)',
    color: 'white',

    marginTop: 5,
    marginBottom: 5,
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
});