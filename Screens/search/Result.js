import React,{useState,useEffect} from 'react';
import { View, Text, Button, StyleSheet, StatusBar,BackHandler,Alert,TouchableOpacity} from 'react-native';
import { useTheme,Link } from '@react-navigation/native';
import AllPost from './AllPost';
import { Card } from 'react-native-paper';
import BootstrapStyleSheet from 'react-native-bootstrap-styles';
import Autocomplete from '../MainTab/Autocomplete';
import { backendHost } from '../../components/apiConfig';
import { ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import SearchArt from './SearchArticle';
import ArticleHeader from './ArticleHeader';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
// import StarRating from 'react-native-star-rating';


const Result = ({navigation,route}) => {

 
 
  const bootstrapStyleSheet = new BootstrapStyleSheet();
const { s, c } = bootstrapStyleSheet;
  
  const texts = route.params.texts



  const { colors } = useTheme();

  const theme = useTheme();

  const [value, setValue] = useState()
// const [params] = useState(props)
 const [items,setItems]=useState([])
 const [isLoaded,setIsLoaded]=useState(false)
 

const [text,setText]=useState(texts)


 const receivedData=()=>{


fetch(`${backendHost}/article/allkv`)

    .then((res) => res.json())
    .then((json) => {
  setIsLoaded(true)
  setItems(json)
console.log(json)
    })
  }
  

  const isearch=()=>{
 
   
    fetch(`${backendHost}/isearch/${text}`)
  
      .then((res) => res.json())
    .then((json) => {
     
      setItems(json)
      console.log(json)
    })
  
  
  }

  const heading=()=>
{ 

 
  // return(
  // <Text style={styles.h1}>All Blogs</Text>
  // )
  // }
  // else{
return(
  <Text style={styles.h1}>Blog related to "{text}"</Text>
)
  
}
 

useEffect(()=> {
 console.log(text.length)
  if(text.length!=0){
    console.log('Disease Post executed')
    isearch()
   
  } else {
    console.log('All Post executed')
    receivedData()
    
  }
  
}, [])
  

  
    return (
   
      <View style={styles.container}>
  <ArticleHeader/>
 <View>
{   
heading()
}
 </View>

  <ScrollView>
  {items.map((i) => (
                
                  i.pubstatus_id === 3 ?
                  <Card style={styles.card}> 
                        <AllPost
                             
                            id = {i.article_id}
                            title = {i.title}
                            f_title = {i.friendly_name}
                            w_title = {i.window_title}
                            allPostsContent={() => receivedData()}
                        />
                        <View style={{position:'relative',bottom:40,left:4}}>
                        {/* <StarRating
        disabled={false}
      
        emptyStar={'ios-star'}
        fullStar={'ios-star'}
    
        iconSet={'Ionicons'}
        starSize={23}
        maxStars={1}
         rating={1}
       fullStarColor={'orange'}
      
      
      /> */}
      </View>
                        </Card>
                        : null
                    ))}
                    </ScrollView>
              
  
    
        
       

      </View>
     
    );
};


export default Result;

const styles = StyleSheet.create({
  // container: {
  //   backgroundColor: '#fff' ,
  //  width:'100%',
  //  height:'100%',
  //   alignItems: 'center', 
  //   justifyContent: 'center',
   
  // },
 

  card:{padding: 5,margin:10,height:hp('20%'),width:wp('95%'),backgroundColor:'aliceblue'},
 
 
 

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
}

});
