import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Platform,
  StyleSheet,
  StatusBar,
  Alert,
} from 'react-native';
import axios from 'axios';
import Collapsible from 'react-native-collapsible';
import {Card} from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import Feather from 'react-native-vector-icons/Feather';

import AsyncStorage from '@react-native-async-storage/async-storage';

import {backendHost} from '../../components/apiConfig';
const CreateScreen = () => {
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
  const [regId, setRegId] = useState();
  const [regType, setRegType] = useState();
  const getId = () => {
    try {
      AsyncStorage.getItem('author').then(value1 => {
        console.log(value1);
        if (value1 != null) {
          setRegId(value1);
        }
      });
    } catch (error) {
      console.log(error);
    }
  };
  const getType = () => {
    try {
      AsyncStorage.getItem('rateType')
      .then(value2 => {
        console.log(value2);
        if (value2 != null) {
          setRegType(value2);
        }
      });
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getId();
    getType();
  }, []);
  const submitArticleForm = async e => {
    e.preventDefault();
    console.log(
      'submit article formmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm',
    );
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
     "articleContent":encodeURIComponent({"time":1631083559825,"blocks":[{"id":"ZvfhlKCqsp","type":"paragraph","data":{"text":article}}],"version":"2.21.0"}),
     
    
    })
      .then(res => {
          if (res.data === 1) {
            Alert.alert('Article Created Successfully!');
          } else {
            Alert.alert('Some error occured!');
          }
 
      })
      .catch(err => {
        console.log(err);

      });
  };

  const titleValue = () => {
    return (
      <View style={styles.action}>
        <TextInput
          placeholder="Title"
          placeholderTextColor="#666666"
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
          placeholder="Remarks"
          placeholderTextColor="#666666"
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
          placeholderTextColor="#666666"
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
    <View style={styles.container}>

        <View style={styles.body}>
        <Card style={{marginBottom:5}}>
              <Text style={styles.textBody} >
                Cure
              </Text>
            </Card>
            <Collapsible
            collapsed={isCollapsed}
            style={{backgroundColor: '#fff'}}>
      <View>
        <View style={styles.card}>
          <TouchableOpacity>
            <Card>
              <Text style={styles.textCard} onPress={toggleDetails}>
                Cure Details
              </Text>
            </Card>
          </TouchableOpacity>
          <Collapsible
            collapsed={isCollapsedDetails}
            style={{backgroundColor: '#fff'}}>
            <View>
              <View style={{marginTop: 5}}>
                <Text style={styles.text}>Title</Text>
              </View>

              {showTitle ? titleValue() : null}
              <View style={{marginTop: 5}}>
                <Text style={styles.text}>Remarks</Text>
              </View>
              {showRemarks ? remarks() : null}
            </View>
          </Collapsible>
        </View>

        <View style={styles.card}>
          <TouchableOpacity>
            <Card>
              <Text style={styles.textCard} onPress={toggleCure}>
                Write Cure Here
              </Text>
            </Card>
          </TouchableOpacity>
          <Collapsible
            collapsed={isCollapsedCure}
            title="Cure Details"
            style={styles.box}>
            <View>{showArticle ? articles() : null}</View>
          </Collapsible>
        </View>
      
      </View>
      <TouchableOpacity style={styles.btn} onPress={e => submitArticleForm(e)}>
        <Text style={styles.textBtn}>Submit</Text>
      </TouchableOpacity>
      
      
      </Collapsible>
    </View>
   
    </View>
  );
};

export default CreateScreen;

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
    borderRadius: 25,
    flex: 1,

    marginTop: Platform.OS === 'ios' ? 0 : -10,

    borderWidth: 1,
    borderColor: 'lightgrey',
    color: 'grey',
    fontSize: 20,
    marginBottom: 10,
    marginVertical: 0,

    backgroundColor: '#fff',
  },
  textInputTitle: {
    borderRadius: 25,
    flex: 1,

    marginTop: Platform.OS === 'ios' ? 0 : -10,

    borderWidth: 1,
    borderColor: 'lightgrey',
    color: 'grey',
    fontSize: 20,
    marginBottom: -10,
    marginVertical: 0,

    backgroundColor: '#fff',
  },
  textInputArticle: {
    flex: 1,

    color: 'grey',
    fontSize: 20,
    paddingBottom: 150,
    marginVertical: 20,

    backgroundColor: '#fff',
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
    color: '#fff',
    textAlign: 'center',
  },

  btn: {
    justifyContent: 'center',
    borderWidth: 0,
    borderColor: '#343a40',
    backgroundColor: '#343a40',
    marginTop:5,
    marginBottom:5,
    width: 100,
    height: 40,
    position:'relative',
    left:10
  
  },
});
