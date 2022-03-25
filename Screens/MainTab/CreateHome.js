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
  Alert,
} from 'react-native';
import axios from 'axios';
import Collapsible from 'react-native-collapsible';
import {Card} from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import Feather from 'react-native-vector-icons/Feather';
import { useIsFocused } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {backendHost} from '../../components/apiConfig';

import { VStack,Stack,Container,HStack,Checkbox } from 'native-base';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
const CreateScreenHome = () => {
  const navigation=useNavigation()
  const [comment, setComment] = useState('');

  const [data, setData] = useState([]);
  const [showTitle, setShowTitle] = useState(true);
  const [showRemarks, setShowRemarks] = useState(true);
  const [showArticle, setShowArticle] = useState(true);
  const [title, setTitle] = useState('');
  const [article, setArticle] = useState('');
  const [articleDisplay, setArticleDisplay] = useState('');
  const [content, setContent] = useState();
  const [contentType, setContentType] = useState('');
  const [type, setType] = useState([]);
  const [disclaimer, setDisclaimer] = useState(1);
  const [copyright, setCopyright] = useState(11);
  const [regId, setRegId] = useState([]);
  const [regType, setRegType] = useState();
  const getId = () => {
    try {
      AsyncStorage.getItem('author').then(value1 => {
   
        if (value1 != null) {
           setRegId(value1)
        }
        else{
          navigation.navigate('SignIn')
        }
      });
    } catch (error) {
    console.log('58',error)
    }
  };
  const getType = () => {
    try {
      AsyncStorage.getItem('rateType')
      .then(value2 => {

        if (value2 != null) {
          setRegType(value2);
        }
      });
    } catch (error) {
  console.log('71:',error)
    }
  };
const isFocus= useIsFocused();
  
  useEffect(() => {
   
    if(isFocus){
      
     
    getType();
    }
 
    getId();
  },[regId]);

//   useEffect(()=> {
//     check()
//   }, [regId])
  const submitArticleForm = async e => {
    e.preventDefault();
   
    axios.defaults.withCredentials = true
    axios.post(`${backendHost}/content?cmd=createArticle`, {
      headers: {
        'Access-Control-Allow-Credentials': true,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
     "title":title,
     "comments":comment,
     "authById":[regId],
     "copyId":copyright,
     "disclaimerId":1,
     "articleStatus":2,
     "articleContent":encodeURIComponent(JSON.stringify({"time":1631083559825,"blocks":[{"id":"ZvfhlKCqsp","type":"paragraph","data":{"text":article}}],"version":"2.21.0"})),
     
    
    })
      .then(res => {
          if (res.data === 1) {
            Alert.alert('Article Created Successfully!');
          } else {
            Alert.alert('Some error occured!');
          }
 
      })
      .catch(err => {
             console.log('118:',err)

      });
  };

  const titleValue = () => {
    return (
      
      <View style={styles.action}>
        <TextInput
          placeholder="Enter Title"
          placeholderTextColor="#00415e"
          style={[
            styles.textInputTitle,
            {
              padding: 10,
            },
          ]}
          autoCapitalize="none"
          value={title}
          returnKeyType="done"
          onChangeText={e => setTitle(e)}
        />

        {data.check_textInputChange ? (
          <View animation="bounceIn">
            <Feather name="check-circle" color="green" size={20} />
          </View>
        ) : null}
      </View>
    );
  };
  const remarks = () => {
    return (
      <View style={styles.action}>
        <TextInput
          placeholder="Leave comments here"
          placeholderTextColor="#00415e"
          secureTextEntry={data.secureTextEntry ? true : false}
          style={[
            styles.textInput,
            {
              padding: 10,
            },
          ]}
          autoCapitalize="none"
          returnKeyType="go"
          value={comment}
          onChangeText={e => setComment(e)}
        />
      </View>
    );
  };

  const articles = () => {
    return (
      <View style={styles.article}>
        <TextInput
        placeholder='Write cure description here'
          placeholderTextColor="#00415e"
          secureTextEntry={data.secureTextEntry ? true : false}
          style={[
            styles.textInputArticle,
            {
              height: 200,
              fontSize: 15,
            },
          ]}
          autoCapitalize="none"
          returnKeyType="go"
          value={article}
          onChangeText={e => setArticle(e)}
          multiline={true}
        />
      </View>
    );
  };
  const [isCollapsedCure, setIsCollapsedCure] = useState(true);
  const [isCollapsedDetails, setIsCollapsedDetails] = useState(true);
  const [isCollapsed,setIsCollapsed]=useState(false)
  const toggleCure = () => {
    return setIsCollapsedCure(!isCollapsedCure);
  };
  const toggleDetails = () => {
    return setIsCollapsedDetails(!isCollapsedDetails);
  };

  return (
    <View style={{flex:1,backgroundColor:'#fff',padding:10}}>
    <ScrollView>
<Stack space={4}>
     <VStack space={2}>
       <Text style={{position:'relative',left:15,fontSize:16,fontFamily:'Raleway-Regular',color:'#00415e'}}>Title</Text>
       {titleValue()}
     </VStack>
     <VStack space={2}>
       <Text style={{position:'relative',left:15,fontSize:16,fontFamily:'Raleway-Regular',color:'#00415e'}}>Remarks</Text>
       {remarks()}
     </VStack>
     <VStack space={2}>
       <Text style={{position:'relative',left:15,fontSize:16,fontFamily:'Raleway-Regular',color:'#00415e'}}>Write cure here</Text>
       {articles()}
     </VStack>
     <VStack space={2}>
       
     <Checkbox shadow={2} value="test" accessibilityLabel="This is a dummy checkbox" defaultIsChecked>
     I certify that i am at least 13years old and I have read and
      </Checkbox>
      <Checkbox shadow={2} value="test" accessibilityLabel="This is a dummy checkbox" defaultIsChecked>
      Accept Terms & Conditions
      </Checkbox>
      <Checkbox shadow={2} value="test" accessibilityLabel="This is a dummy checkbox" defaultIsChecked isReadOnly >
        Privacy Policy
      </Checkbox>
     </VStack>
     <View style={{flex:1,justifyContent:'center',alignItems:'center'}}> 
     <TouchableOpacity style={styles.btn} onPress={e => submitArticleForm(e)}>
        <Text style={styles.textBtn}>Submit</Text>
      </TouchableOpacity>
      </View>
      

     </Stack>

       
    </ScrollView>
    </View>
  );
};

export default CreateScreenHome;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 40,
    margin: 0,
    backgroundColor: '#8cd4eb',
  
    alignItems:'center'
  },
  body:{

    borderWidth: 1,
    backgroundColor:'#fff',
    Color: 'lightgrey',
    borderColor: 'lightgrey',
    marginTop: Platform.OS === 'ios' ? 0 : -35,
    width: 380,
   

  },
  textBody:{
      
      padding:5,
      fontSize:18,
      fontWeight:'bold',
textAlign:'center',


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
    position:'relative',
    left:10,
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
    margin: 7,
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
    fontFamily:'Raleway-Regular',
    borderWidth: 1,
    borderColor: 'lightgrey',
    color: 'grey',
    fontSize: 16,
    marginBottom: 10,
    marginVertical: 0,

    backgroundColor:'rgba(0, 65, 94, 0.2)',
  },
  textInputTitle: {
    borderRadius: 15,
    flex: 1,

    marginTop: Platform.OS === 'ios' ? 0 : -10,
fontFamily:'Raleway-Regular',
    borderWidth: 1,
    borderColor: 'lightgrey',
    color: 'grey',
    backgroundColor:'rgba(0, 65, 94, 0.2)',
    fontSize: 16,
      marginBottom: -10,
    marginVertical: 0,

  },
  textInputArticle: {
    flex: 1,
    borderRadius: 15,
    color: 'grey',
    fontSize: 20,
    textAlignVertical:'top',
    paddingHorizontal:10,
    fontFamily:'Raleway-Regular',
    backgroundColor:'rgba(0, 65, 94, 0.2)',
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
    fontSize:20
  },

  btn: {
    justifyContent: 'center',
    alignItems:'center',
    borderWidth: 0,
    borderRadius:15,
    borderColor: 'rgba(0, 65, 94, 0.2)',
    backgroundColor: 'rgba(0, 65, 94, 0.2)',
    marginTop:5,
    marginBottom:5,
    width: wp('60%'),
    height: hp('6%'),
  
  
  },
});
