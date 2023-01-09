import React, { useEffect } from 'react'
import { View,Text,HStack, Divider } from 'native-base'
import { StyleSheet,TouchableOpacity } from 'react-native'
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import IonIcons from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
const Legal = () => {

    const Navigation=useNavigation()

  return (
 <View style={{padding:15,backgroundColor:'white',flex:1}}>
<View style={styles.setting}>
<TouchableOpacity onPress={() => Navigation.navigate('privacy')}>
  <View style={styles.item}>

            <HStack ml='3' space={4}>
             
              <Text
                style={{
                  color: '#00415e',
                  fontFamily: 'Raleway-Medium',
                
              
                }}>
            Privacy Policy
              </Text>
            </HStack>
   
          <View>
            <Icon name='angle-right' size={22} color="#00415e"/>
          </View>
          </View>
          </TouchableOpacity>
          <Divider/>
          <TouchableOpacity onPress={() => Navigation.navigate('terms')}>
          <View style={styles.item}>
            <View >

            <HStack ml='3' space={4}>
              
              <Text
                style={{
                  color: '#00415e',
                  fontFamily: 'Raleway-Medium',
           
                }}>
             Terms and Conditions
              </Text>
            </HStack>
      
          </View>
          
          <View>
            <Icon name='angle-right' size={22} color="#00415e"/>
          </View>
          </View>
          </TouchableOpacity>
        
          
</View>
 </View>
  )
}

export default Legal

const styles=StyleSheet.create({
    setting:{
        backgroundColor:'aliceblue',
        borderRadius:15,
        height:'16%',
        width:'100%'
    },
    item:{
   paddingVertical:17,
   marginRight:20,
   flexDirection:'row',
   justifyContent:'space-between'
    },
    row:{
   
      
    }
})