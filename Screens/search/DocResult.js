import React,{useState,useEffect} from 'react';
import { View, Text, StyleSheet, StatusBar,BackHandler,Alert,TouchableOpacity,ImageBackground} from 'react-native';
import { useTheme,Link } from '@react-navigation/native';
import axios from 'axios';

import { Card, Searchbar } from 'react-native-paper';
import BootstrapStyleSheet from 'react-native-bootstrap-styles';
import { ScrollView } from 'react-native';
// import StarRating from 'react-native-star-rating';
import { backendHost } from '../../components/apiConfig';
import ProfileTab from './ProfileTab';
import SearchBar from './SearchBar';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {
  Container,
  Modal,
  Button,
  Input,
  VStack,
  FormControl,
  Center,
  Spinner,
  Heading,
  Stack,
  HStack,
  Box,
  NativeBaseProvider,
} from 'native-base';

const DocResult = ({navigation,route}) => {

 
 
  const bootstrapStyleSheet = new BootstrapStyleSheet();
const { s, c } = bootstrapStyleSheet;
  
  const names = route.params.names



  const { colors } = useTheme();

  const theme = useTheme();

  const [value, setValue] = useState()
// const [params] = useState(props)
 const [items,setItems]=useState([])
 const [isLoaded,setIsLoaded]=useState(false)
 

const [text,setText]=useState(names)


  

  const isearch=()=>{
 
   
    fetch(`${backendHost}/SearchActionController?cmd=getResults&city=&doctors=${text}&Latitude=32.7266&Longitude=74.8570`)
      .then(res => res.json())
      .then(json => {
        setIsLoaded(true)
    setItems(json.map.DoctorDetails.myArrayList) 

  })
  }

  

 

useEffect(()=> {

    isearch()
   
console.log(items)
  
}, [])
  
if(!isLoaded)
  {
    return(
      <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
    <HStack space={2} justifyContent="center">
        <Spinner accessibilityLabel="Loading posts" color="#00415e" size="lg" />
        <Heading color="#00415e" fontSize="lg">
          Loading
        </Heading>
      </HStack>
      </View>
    );
    
  }

  else{
    return (
   
      <View style={styles.container}>
  <SearchBar/>


  <ScrollView style={{marginTop:10}}>
  {items.map((i) => (
                
            
                  <Card style={{padding: 5,margin:5,height:hp('17%'),width:wp('96%'),backgroundColor:'lightgrey',padding:9}}> 
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
                  <View>
                        <ProfileTab
                               rowno = {i.map.rowno}
                               firstName= {i.map.docname_first}
                               lastName= {i.map.docname_last}
                               primary_spl = {i.map.primary_spl}
                               hospital_affliated = {i.map.hospital_affliated}
                               state = {i.map.state}
                               country_code = {i.map.country_code}
                        />
                        </View>
                        <View style={{position:'relative',bottom:0,left:4}}>
                       
      </View>
                        </Card>
                      
                    ))}
                    </ScrollView>
              
  
    
        <StatusBar barStyle= { theme.dark ? "light-content" : "dark-content" }/>
       

      </View>
     
    )}
};


export default DocResult;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff' ,
   width:'100%',
   height:'100%',
    alignItems: 'center', 
    justifyContent: 'center',
   
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
  bottom: 30,
  left: 150,
  backgroundColor: '#fff',

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
}

});
