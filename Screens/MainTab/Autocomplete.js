import React, { useEffect, useState,useRef} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableHighlight,
  Alert,
  
} from 'react-native';
import { backendHost } from '../../components/apiConfig';
import { Searchbar, ToggleButton } from 'react-native-paper';
import axios from 'axios';

import { FlatList } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/core';
import { Card } from 'react-native-paper';
const  Autocomplete=()=> {


  const [dataSource,setDataSource] = useState([])

  const [colors] = useState(['#84DCC6', '#FEC8C8', '#F7E4CF', "#E8DEF3",])
 const [text,setText]=useState()
  const isearch=(texts)=>{
  setText(texts)
  Promise.all([
  axios.get(`${backendHost}/isearch/combo/${text}`)

    .then(res => res.data),
  ]).then((diseaseData) => {
    console.log(diseaseData)
    setDataSource(diseaseData);

    // axios.get(`http://192.168.29.160:8080/cures/isearch/combo/${param.type}`)
    // .then((res) => res.json())
    // .then((json) => {
    //   console.log(json);
  
    //     setisLoaded(true)
    //     setItem(json)

    // }); 

  })
  // .then(() => {
  //   speciality.map((i) => {
  //     spec1.push(i[3])
  //   })
  // })
  .catch(res => {
     console.error(res)
  })

}




  const [isLoaded,setisLoaded]=useState(false)
  
  const [filtered, setFiltered] = useState(dataSource)

  const [searching, setSearching] = useState(false)

 

  const navigation = useNavigation();
 
   const result=()=>{
  

 if(text)
  return(  
 
navigation.navigate("Result",{
  texts:`${text}`
})
  )
   
   else{
    navigation.navigate("Home",{
      texts:`${text}`
    })
     Alert.alert('type something')
   }

   }



  const onSearch = (texts) => {

    setText(null)
    if (texts) {
      
      console.log('if'+texts)
      isearch(texts)
     
      setSearching(true)
    
       
  
     
  
     
    }
    else {
      
      console.log('else')
      
     
  
    }
   
  }
  
  const getItem = (([item]) =>{
  

    return (
    
       

        <FlatList data={item} renderItem={({item}) =><Card><ScrollView><TouchableOpacity  onPress= {()=>setText(item) & setSearching(false)} ><View style={styles.itemView}><Text style={styles.itemText}>{item}</Text></View></TouchableOpacity></ScrollView></Card>} />
// {/*              
//             <Text style={styles.itemText}>{item}</Text>
//             */}
          
         
           
        
       

        
    )
}
  )
  
  return (
    <View style={styles.container}>
    <View>
      
 <Searchbar
   style={styles.textInput}
   placeholder="Search for articles"
   placeholderTextColor='grey'
   value={text}
 
   returnKeyType='go'
      onSubmitEditing={()=>setText(text),result}
  
    
      onChangeText={onSearch}
      onIconPress={()=>setText(text),result}
       />
       </View>


  
      

      
     {searching &&
     
      <TouchableOpacity
      
      style={styles.containers}>
      
      <View >
        
          {  
          
            dataSource.length ?
              
               getItem(dataSource)

                  :
                
                  <View
                      style={styles.noResultView}>
                      <Text style={styles.noResultText}>No search items matched</Text>
                      
                  </View>
          }
           

      </View>
  </TouchableOpacity>
}

    </View>
  )
}
export default  Autocomplete

const styles = StyleSheet.create({
  container: {
    
        alignItems: 'center',
    marginTop: '7%',
    flex: 1

  },
  containers: {
  
  
    zIndex: 999,



},
text:{
  color:'#fff',
    textAlign:'center',
  
},
b1:{
  backgroundColor:'#00415e',
  padding: 40,
},
subcontainer2: {

  position:'relative',
  top: 170,
  left: 90,
  backgroundColor: '#fff',

},
  textInput: {
    
    backgroundColor: 'lightgrey',
    width: 350,
    height: 50,
    fontSize: 20,
    fontWeight: 'bold',
    paddingHorizontal: 10,
    marginTop:0
  },

itemView: {
 
 
 
    
    backgroundColor: 'aliceblue',
    height: 40,
    width: 350,
  justifyContent:'center',
  alignItems:'center',
  padding: 10,
    zIndex: 999
    

},
itemText: {
    color: 'black',
    paddingHorizontal: 10,
    fontSize: 17,
    zIndex: 999
},
noResultView: {
    
  backgroundColor: 'aliceblue',
  height: 40,
  width: 350,
justifyContent:'center',
alignItems:'center',
padding: 15,
  zIndex: 999
},
noResultText: {
  color: 'black',
  paddingHorizontal: 10,
  fontSize: 17,
  zIndex: 999
},
});