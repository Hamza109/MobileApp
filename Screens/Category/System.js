import React, { useEffect, useState } from 'react'
import { View,Text,StyleSheet,FlatList,TouchableOpacity ,ImageBackground,ScrollView} from 'react-native'
import { backendHost } from '../../components/apiConfig'

import { useNavigation } from '@react-navigation/native';
import { FlashList } from '@shopify/flash-list';



const System = () => {

    const navigation=useNavigation()
const  [data,setData]=useState()
const [isLoaded, setIsLoaded] = useState(false);

const medicine=async ()=>{
  try{


    const response = await fetch(`${backendHost}/data/medicines`)
const responseData=response.json()
        setData(responseData)
   

    
  }
  catch(error){

  }
 
    
    
}

function renderItemTrend({item, index}) {
    const {med_id, med_type,} = item;
    return (
   
     
        <View style={{marginRight:11}}>
        <Text
          
          numberOfLines={2}
          style={{
            color: '#00415e',
     
      
            fontSize: 10,
       
          }}>
          {med_type}
        </Text>
        </View>

    );
  }

  useEffect(()=>{
    medicine();
},[])



  return (
    <ScrollView
    horizontal
    style={{padding: 5, flex: 1, marginTop: 20}}
    showsHorizontalScrollIndicator={false}>
    <View style={{paddingRight: 11}}>
      <TouchableOpacity
        style={
          Platform.OS === 'ios'
            ? diseaseId === null
              ? styles.activeLabel
              : styles.inactiveLabel
            : null
        }
        onPress={selectFeatured}>
        <Text
          style={[
            styles.featured,
            diseaseId === null
              ? styles.activeLabel
              : styles.inactiveLabel,
          ]}>
          Featured
        </Text>
      </TouchableOpacity>
    </View>

    {data.map((item, index) => {
      return (
        <View key={item.dc_id} style={{paddingHorizontal: 11}}>
          <TouchableOpacity
            style={
              Platform.OS === 'ios'
                ? item.dc_id === diseaseId
                  ? styles.activeLabel
                  : styles.inactiveLabel
                : null
            }
            onPress={() => {
              selectItem(item);
            }}>
            <Text
              style={[
                styles.category,
                item.dc_id === diseaseId
                  ? styles.activeLabel
                  : styles.inactiveLabel,
              ]}>
              {item.med_type}
            </Text>
          </TouchableOpacity>
        </View>
      );
    })}
  </ScrollView>
  )

}

export default System