import React,{useState,useEffect} from 'react';
import { View, Text, FlatList, StyleSheet, StatusBar,BackHandler,Alert,TouchableOpacity} from 'react-native';

import { Card } from 'react-native-paper';
import CenterWell from './CenterWell';

import Autocomplete from '../MainTab/Autocomplete';
import { Portal } from 'react-native-paper';
import { backendHost } from '../../components/apiConfig';
import Comment from './comment';
import BootstrapStyleSheet from 'react-native-bootstrap-styles';
import { ScrollView } from 'react-native';
import { KeyboardAvoidingView } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Icon from 'react-native-vector-icons/Ionicons';
import ArticleHeader from '../search/ArticleHeader';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import Rating from '../../components/StarRating';
import {
  Container,
  Modal,
  Button,
  Input,
  VStack,
  FormControl,
  Center,
  NativeBaseProvider,
} from "native-base"
// import Rating from './StarRating';
const Disease = ({navigation,route}) => {

  const bootstrapStyleSheet = new BootstrapStyleSheet();
  const { s, c } = bootstrapStyleSheet;
    
 
  const [commentItems, setCommentItems] = useState([])
  
  const ids = route.params.ids




  const [value, setValue] = useState()
// const [params] = useState(props)
 const [items,setItems]=useState([])
 const [isLoaded,setIsLoaded]=useState(false)
  
const[articleContent,setArticleContent]=useState([])
const [id,setId]=useState(ids)
const [visible, setVisible] = React.useState(false);

const showModal = () => setVisible(true);
const hideModal = () => setVisible(false);
const containerStyle = {backgroundColor: 'white', padding: 20, height: hp('100%')};






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
const [modalVisible, setModalVisible] = useState(false)
     
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
     
         <Modal
        isOpen={modalVisible}
        onClose={() => setModalVisible(false)}
        avoidKeyboard
        justifyContent="flex-end"
        bottom="100"
        size="full"
      >
        <Modal.Content>
          <Modal.CloseButton />
          <Modal.Header>comments</Modal.Header>
          <Modal.Body>
      
            <ScrollView>
          {
          
          commentItems?
          commentItems.map((i) => (
                <View style={{marginBottom:10}}>
                    <View style={{padding:10,marginVertical:0,marginBottom:0,Width:wp('80%'),height:hp('10%'),borderBottomWidth:.2}}>
                      <Text>{i.comments}</Text>
                      </View>
                      </View>
               
              ))
          : null
        }
          </ScrollView>
       
          </Modal.Body>
          <Modal.Footer>
          <Comment   article_id={id}/>
          </Modal.Footer>
        </Modal.Content>
      </Modal>



        {/* <Portal>
                <Modal
                  visible={visible}
                  onDismiss={hideModal}
                  contentContainerStyle={containerStyle}>

<View style={styles.centeredView}>
<View style={{position:'relative',top:670,alignItems:'center',zIndex:99}}> 
        <Comment   article_id={id}/>
        </View> 
           <View style={styles.modalView}>
        
           
        <ScrollView >
          <Card style={{height:hp('900%'),backgroundColor:'#fff',width:wp('100%'),flex:1,padding:10}}>
        {
          
          commentItems?
          commentItems.map((i) => (
                <View style={{marginBottom:20}}>
                    <Card style={{backgroundColor:'lightgrey',padding:15,marginVertical:0,marginBottom:0,maxWidth:wp('80%'),height:50}}>
                      <Text>{i.comments}</Text>
                      </Card>
                      </View>
               
              ))
          : null
        }
        </Card>
           </ScrollView>
       
      
        </View>
        </View>
               
                </Modal>
              </Portal> */}
              <Card style={{width:wp('100%'),height:hp('5%'),position:'relative',bottom:88,borderWidth:1,borderColor:'grey',backgroundColor:'#00415e'}}>
                <View style={{flex:1}}>
                  <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
                   <View style={{marginLeft:30}}>
                    <Rating article_id={id}/>
                    </View>
                    <View style={{marginRight:50,marginTop:5}}>
              <TouchableOpacity activeOpacity={0.5} style={styles.btn}>
               <Icon name='chatbox' style={{color:'lightgrey'}} size={25} onPress={()=>{setModalVisible(!modalVisible)}}/>
              </TouchableOpacity>
              </View>
              </View>
              </View>
              </Card>
       

 
    
        
       

      </View>
     
    );
};


export default Disease;

const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor: 'lightgrey' ,
   
    alignItems: 'center', 
  
   
  },
  card:{
    padding:10,margin:0,height:hp('60%'),width:wp('100%'),position:'relative',bottom:90,borderRadius:0
  },
 
  search: {
   
position:'relative',
bottom:282,
    backgroundColor: '#fff' ,

  },

  b1:{
   backgroundColor:'#00415e',
   padding: 40,
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


  marginTop: 25
},
modalView: {
  alignItems: "center",
  
  
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
