import React,{useState,useEffect} from 'react';
import { View, Text, Button, StyleSheet, StatusBar,BackHandler,Alert,TouchableOpacity} from 'react-native';
import { useTheme,Link } from '@react-navigation/native';
import axios from 'axios';

import { Card, Searchbar } from 'react-native-paper';
import BootstrapStyleSheet from 'react-native-bootstrap-styles';
import { ScrollView } from 'react-native';
// import StarRating from 'react-native-star-rating';
import { backendHost } from '../../components/apiConfig';
import ProfileTab from './ProfileTab';
import SearchBar from './SearchBar';

const SearchDoc = ({navigation,route}) => {

 
 
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
    setItems(json.map.DoctorDetails.myArrayList) 

  })
  }

  

 

useEffect(()=> {

    isearch()
   
console.log(items)
  
}, [])
  

  
    return (
   
      <View style={styles.container}>
  <SearchBar/>


  <ScrollView style={{marginTop:60}}>
  {items.map((i) => (
                
            
                  <Card style={{padding: 5,margin:5,height:200,width:350,backgroundColor:'aliceblue'}}> 
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
                             rowno= {i.map.rowno}
                            name = {i.map.name}
                            pSpl = {i.map.primary_spl}
                            hospital = {i.map.hospital_affliated}
                            state = {i.map.state}
                            country = {i.map.country_code}
                      
                        />
                        </View>
                        <View style={{position:'relative',bottom:0,left:4}}>
                       
      </View>
                        </Card>
                      
                    ))}
                    </ScrollView>
              
  
    
        <StatusBar barStyle= { theme.dark ? "light-content" : "dark-content" }/>
       

      </View>
     
    );
};


export default SearchDoc;

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
