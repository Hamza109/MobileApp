import React,{useState,useEffect} from 'react';
import { View, Text, FlatList, Button, StyleSheet, StatusBar,BackHandler,Alert,TouchableOpacity} from 'react-native';
import { useTheme,Link } from '@react-navigation/native';
import { Card } from 'react-native-paper';
import CenterWell from './CenterWell';

import Autocomplete from '../MainTab/Autocomplete';
import { Modal,Portal } from 'react-native-paper';
import { backendHost } from '../../components/apiConfig';
import Comment from './comment';
import BootstrapStyleSheet from 'react-native-bootstrap-styles';
import { ScrollView } from 'react-native';
import { KeyboardAvoidingView } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Icon from 'react-native-vector-icons/Ionicons';
import ArticleHeader from '../search/ArticleHeader';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
// import Rating from './StarRating';
const Disease = ({navigation,route}) => {

  const bootstrapStyleSheet = new BootstrapStyleSheet();
  const { s, c } = bootstrapStyleSheet;
    
 
  const [commentItems, setCommentItems] = useState([])
  
  const ids = route.params.ids



  const { colors } = useTheme();

  const theme = useTheme();

  const [value, setValue] = useState()
// const [params] = useState(props)
 const [items,setItems]=useState([])
 const [isLoaded,setIsLoaded]=useState(false)
  
const[articleContent,setArticleContent]=useState([])
const [id,setId]=useState(ids)
const [modalVisible, setModalVisible] = useState(false);






useEffect(()=> {
 comments()
  fetch(`${backendHost}/article/${id}`)
    // .then(res => JSON.parse(res))
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
       setItems(JSON.parse(decodeURIComponent(json.content)).blocks);
       let a = JSON.parse(decodeURIComponent(json.content))
       console.log(a.blocks[0].data);
        // a.blocks.forEach(i => {
        //   setArticleContent([...articleContent ,i.data.text])
        //   console.log(i.data.caption)
        // });
  });
  
}, [])

function  comments() {                        // For all available blogs "/blogs"
  fetch(`${backendHost}/rating/target/${id}/targettype/2`)
    .then((res) => res.json())
    .then((json) => {
      console.log(json);
      setCommentItems(json)
    });
}

     
  // useEffect(() => {
  //   console.log('AR: ', items[0].data.file.url)
  // }, [items])
const b= 'http://all-cures.com/cures/uitest/99.png'
  
    return (
   
      <View style={styles.container}>

 <ArticleHeader/>
  
 {/* <Image style={{width: 50,height: 50}} source={{uri:b}}/> */}
 <View style={{marginTop:100}}>
 <Card style={styles.card}>
  <ScrollView>
     {
       items.map((i) => (
  <View style={{marginLeft:25,marginRight:25}}>
    
        <CenterWell
        pageTitle = {items.title}
        content = {i.data.content}
        type = {i.type}
        text = {i.data.text}
        title = {i.data.title}
        message = {i.data.message}
        source = {i.data.source}
        embed = {i.data.embed}
        caption = {i.data.caption}
        alignment = {i.data.alignment}
        imageUrl = {i.data.file? i.data.file.url: null}

         
        
        />
    
  </View>
       ))
     }
     </ScrollView>
         </Card>
         </View>
     
         <Modal  animationType="slide"
        transparent={true}
        visible={modalVisible}
        hasBackdrop='true'
  avoidKeyboard='true'
        backdropColor='black'
        backdropOpacity='0.3'
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
           <View style={styles.centeredView}>
           <View style={styles.modalView}>
        
             
        <Comment   article_id={id}/>
        <ScrollView style={{position:'relative',bottom:100}}>
        {
          
          commentItems?
          commentItems.map((i) => (
                
                    <Card style={{backgroundColor:'lightgrey',padding:5,marginVertical:8,marginBottom:5,width:300,height:50}}>
                      <Text>{i.comments}</Text>
                      </Card>
               
              ))
          : null
        }
           </ScrollView>
       
      
        </View>
        </View>
        </Modal>
     
     {/* <Card style={{padding:10,margin:0,height:50,width:390,position:'relative',top:30}}>  
        <TouchableOpacity
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}
            >
             
              <FontAwesome name='comment' size={25} color='lightgrey'/>
            
            </TouchableOpacity>
            <View style={{padding:5,margin:0,height:40,width:140,position:'relative',bottom:55,right:0}}>  
            <Rating article_id={id} />
            </View>
            </Card> */}

       

 
    
        
       

      </View>
     
    );
};


export default Disease;

const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor: '#b9daf1' ,
   
    alignItems: 'center', 
  
   
  },
  card:{
    padding:10,margin:25,height:400,width:wp('98%'),position:'relative',bottom:90,borderRadius:20
  },
 
  search: {
   
position:'relative',
bottom:282,
    backgroundColor: '#fff' ,

  },
  subcontainer1: {

    position:'relative',
    bottom: 300,
    backgroundColor: '#fff',
    right:90
  },
 
  b1:{
   backgroundColor:'#00415e',
   padding: 40,
 },
 subcontainer3: {

  position:'relative',
  bottom: 100,
  left: 90,


},
  text:{
    backgroundColor:'#00415e',
    color:'#fff',
      textAlign:'center',
    
  },
  h1:{
    position: 'relative',
    bottom: 450,
    right: 0,
    fontWeight:'bold',
    padding: 0,
    margin:0

},
t2:{
  position: 'relative',
  bottom: 410,

  padding : 10,
  margin: 0,
  zIndex:9999


},
centeredView: {
  flex: 1,
  justifyContent: "flex-end",
  alignItems: "center",
  marginTop: 22
},
modalView: {
  margin: 30,
position:'relative',
top:50,
  backgroundColor: "white",
  borderRadius: 0,
  padding: 35,
  height:750,
  width:400,
  alignItems: "center",
  shadowColor: "#000",
  shadowOffset: {
    width: 0,
    height: 2
  },
  shadowOpacity: 0.25,
  shadowRadius: 4,
  elevation: 5,
  justifyContent:'flex-end'
  
},

button: {
  height:50,
  borderRadius: 4,
  padding: 10,
  elevation: 2,
  width:70,
  justifyContent:'center',
  alignItems:'center',
  position:'relative',
  bottom:10,
  left:310
},
buttonOpen: {
  backgroundColor: "#F194FF",
},
buttonClose: {
  backgroundColor: "grey",
  
},
textStyle: {
  color: "white",
  fontWeight: "bold",
  textAlign: "center"
},
modalText: {
  marginBottom: 15,
  textAlign: "center"
}


});
