import React, { useEffect, useState } from 'react'
import { View,Text,StyleSheet,FlatList,TouchableOpacity ,Image} from 'react-native'
import { backendHost } from '../../components/apiConfig'
import LottieView from 'lottie-react-native';
import { Card } from 'react-native-paper';
import { scale,verticalScale } from '../../components/Scale';
import { HStack } from 'native-base';
import { useNavigation } from '@react-navigation/native';
const Category = () => {
const navigation=useNavigation()
const  [data,setData]=useState()
const [isLoaded, setIsLoaded] = useState(false);

  
const disease=()=>{
    fetch(`${backendHost}/data/categories`)
    .then(res=>res.json())
    .then(json=>{
        setData(json)
        setIsLoaded(true)
    })
    
      
 
    .catch(err=>console.log(err))
    
}

const renderCategory=({item})=>{
    
    return(

<TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => {
                    navigation.navigate('Result', {id:item.dc_id});
                  }}>
                  <Card
                    resizeMode="stretch"
                    style={{
                      width: 105,
                      height: 140,
                      backgroundColor: '#00415e',
                      borderRadius: 20,
                      marginRight: 12,
                      overflow: 'hidden',
                    }}>
                    <Image
                      style={{
                        alignContent: 'center',
                        width: 90,
                        height:100,
                        position: 'absolute',
                        bottom: 0,
                        left: 5,
                        overflow: 'hidden',
                      }}
                      resizeMode="stretch"
                      resizeMethod="resize"
                      source={require(`../../assets/img/1.png`)}
                    />
                    <Text
                      style={{
                        color: '#fff',
                        fontWeight: 'bold',
                        position: 'absolute',
                        top: 6,
                        left: 6,
                        fontFamily: 'Raleway',
                        fontSize: scale(12),
                      }}>
                     {item.category}
                    </Text>
                  </Card>
                </TouchableOpacity>


    )
}

useEffect(()=>{
    disease();
},[])
if (!isLoaded) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <HStack space={2} justifyContent="center">
        <LottieView source={require('../../assets/animation/load.json')} autoPlay loop style={{width:50,height:50}} />
        </HStack>
      </View>
    );
  } else {

  return (

<FlatList 
horizontal
keyExtractor={(item)=>item.id}
data={data}
renderItem={renderCategory}
/>


  )
}
}

export default Category