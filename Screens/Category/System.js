import React, { useEffect, useState } from 'react'
import { View,Text,StyleSheet,FlatList,TouchableOpacity ,ImageBackground} from 'react-native'
import { backendHost } from '../../components/apiConfig'
import LottieView from 'lottie-react-native';
import { Card } from 'react-native-paper';
import { scale,verticalScale } from '../../components/Scale';
import { HStack } from 'native-base';
import { useNavigation } from '@react-navigation/native';



const System = () => {

    const navigation=useNavigation()
const  [data,setData]=useState()
const [isLoaded, setIsLoaded] = useState(false);

const medicine=()=>{
    fetch(`${backendHost}/data/medicines`)
    .then(res=>res.json())
    .then(json=>{
   
        setData(json)
        setIsLoaded(true)
    })
    
      
 
    .catch(err=>console.log(err))
    
}

function renderItemTrend({item, index}) {
    const {med_id, med_type,} = item;
    return (
      <View style={{marginRight:12,height:165}}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => {
            navigation.navigate('Result', {types: `${med_id}`});
          }}>
          <Card
            style={{
              width: 105,
              height: 125,
              backgroundColor: '#00415e',
              overflow:'hidden',
              borderRadius: 20,
              alignItems: 'center',
            }}
            key={index}>
            <ImageBackground
            
              style={{
                width: 105,
                height: 125,
                borderRadius: 20,
                overflow: 'hidden',
              }}
              source={require('../../assets/img/unani.jpg')}
            />
          </Card>
        </TouchableOpacity>
        <View style={{width:'90%',alignItems:'center',justifyContent:'center'}}>
        <Text
          
          numberOfLines={2}
          style={{
            color: '#00415e',
            marginTop: 5,
            fontFamily: 'Raleway-Medium',
            fontSize: 10,
            textAlign: 'center',
          }}>
          {med_type}
        </Text>
        </View>
      </View>
    );
  }

  useEffect(()=>{
    medicine();
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
              keyExtractor={(item)=>item.name}
              showsHorizontalScrollIndicator={false}
              data={data}
              renderItem={renderItemTrend}
            />
  )
}
}

export default System