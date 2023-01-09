import React, { useEffect } from 'react'
import { View,Text,HStack, Divider } from 'native-base'
import { StyleSheet,TouchableOpacity } from 'react-native'
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import IonIcons from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { useNavigation } from '@react-navigation/native';

const Settings = () => {

const Navigation=useNavigation()



  return (
 <View style={{padding:15,backgroundColor:'white'}}>
<View style={styles.setting}>
<TouchableOpacity onPress={() => Navigation.navigate('legal')}>
  <View style={styles.item}>

            <HStack ml='3' space={4}>
              <IonIcons name="md-document-text" size={20} color="#00415e" />
              <Text
                style={{
                  color: '#00415e',
                  fontFamily: 'Raleway-Medium',
       
              
                }}>
              Legal Information
              </Text>
            </HStack>
   
          <View>
            <Icon name='angle-right' size={22} color="#00415e"/>
          </View>
          </View>
          </TouchableOpacity>
          <Divider/>
          <TouchableOpacity onPress={() => Navigation.navigate('about')}>
          <View style={styles.item}>
            <View >

            <HStack ml='3' space={4}>
              <IonIcons name="ios-person-circle" size={26} color="#00415e" />
              <Text
                style={{
                  color: '#00415e',
                  fontFamily: 'Raleway-Medium',
           
                }}>
              About Us
              </Text>
            </HStack>
      
          </View>
          <View>
            <Icon name='angle-right' size={22} color="#00415e"/>
          </View>
          
          </View>
         
          </TouchableOpacity>
          <TouchableOpacity onPress={() => Navigation.navigate('contact')}>
          <View style={styles.item}>
            <View >

            <HStack ml='3' space={4}>
              <MaterialIcons name="contact-page" size={26} color="#00415e" />
              <Text
                style={{
                  color: '#00415e',
                  fontFamily: 'Raleway-Medium',
           
                }}>
              Contact Us
              </Text>
            </HStack>
      
          </View>
          <View>
            <Icon name='angle-right' size={22} color="#00415e"/>
          </View>
          
          </View>
          </TouchableOpacity>
          
        

      
           <Divider/>
</View>
 </View>
  )
}

export default Settings

const styles=StyleSheet.create({
    setting:{
        backgroundColor:'aliceblue',
        borderRadius:15,
        height:'100%',
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