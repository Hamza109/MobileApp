import React, { useEffect } from 'react'
import Link from '@react-navigation/native';
import { Linking } from 'react-native';
import { View,Text,HStack, Divider } from 'native-base'
import { StyleSheet,TouchableOpacity } from 'react-native'
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import IonIcons from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
const About = () => {

    const Navigation=useNavigation()

  return (
 <View style={{padding:15,backgroundColor:'white',flex:1}}>
     <View style={styles.header}>
     
<Text  style={styles.headerText}>
  About Us
</Text>


    </View>
<View style={styles.setting}>
      <Text style={{color:'#00415e'}}>
      All Cures is a product developed, managed and owned by Etherium Technologies. Our mission is to make it simple and convenient for users to get information on Cures from anywhere in the world. Our belief is that your wellness is your well-being. We are passionate about giving our users the unique experience that is both fulfilling and wholesome.
      </Text>    
</View>

<View style={[styles.setting,{height:'11%',padding:0}]}>

  <View style={styles.item}>

            <HStack ml='3' space={10}>
<TouchableOpacity onPress={()=>Linking.openURL('https://www.facebook.com/All-Cures-100610265834385')} >
             <IonIcons name='ios-logo-facebook' color='#00415e' size={35} />
             </TouchableOpacity>
<TouchableOpacity onPress={()=>Linking.openURL('https://www.instagram.com/allcuresinfo/')} >
             <IonIcons name='ios-logo-instagram' color='#00415e' size={35} />
             </TouchableOpacity>
<TouchableOpacity onPress={()=>Linking.openURL('https://twitter.com/allcuresinfo')}>
             <IonIcons name='ios-logo-twitter' color='#00415e' size={35} />
             </TouchableOpacity>
             <TouchableOpacity onPress={()=>Linking.openURL('https://www.linkedin.com/company/etherium-technologies/')} >
             <IonIcons name='ios-logo-linkedin' color='#00415e' size={35} />
             </TouchableOpacity>
             
            </HStack>
   
          <View>
         
          </View>
          </View>
      
      
      
        
</View>




 </View>
  )
}

export default About

const styles=StyleSheet.create({
    setting:{
        backgroundColor:'aliceblue',
        borderRadius:15,
        width:'100%',
        padding:10,
        marginBottom:10
    },
    item:{
   paddingVertical:17,
   flexDirection:'row',
   justifyContent:'space-evenly'
    },
    header:{
        padding:10
          },
          headerText:{
              fontFamily:'Raleway-Bold',
         fontSize:25,
         marginTop:5,
         padding:5,
         color:'#00415e'
            
          },
          infoDetails:{
           
            alignSelf:'flex-start',
        
          padding:10,
          position:'absolute',
          bottom:0,
            borderBottomColor:'grey'
          
            
            
          },
          delete:{
            backgroundColor:'aliceblue',
            borderRadius:15,
            width:'100%',
            padding:10,
            position:'absolute',
            marginBottom:10,
            bottom:0,
            left:8
  
     
        },
          infoText: {
            color: '#00415e',
            fontFamily: 'Raleway-Regular',
            fontSize: 10,
            marginBottom:3,
            marginLeft:5
          },
    
          deleteButton:{
            flexDirection:'row',
            backgroundColor:'#00415e',
            alignItems:'center',
            padding:5,
            borderRadius:25,
            justifyContent:'center'

          }
})