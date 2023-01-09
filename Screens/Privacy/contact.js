import React, { useEffect } from 'react'
import Link from '@react-navigation/native';
import { Linking } from 'react-native';
import { View,Text,HStack, Divider } from 'native-base'
import { StyleSheet,TouchableOpacity } from 'react-native'
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import IonIcons from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
const Contact = () => {

    const Navigation=useNavigation()

    const dialCall = () => {
 
        let phoneNumber = '';
     
        if (Platform.OS === 'android') {
          phoneNumber = 'tel:+911912959035';
        }
        else {
          phoneNumber = 'telprompt:+911912959035';
        }
     
        Linking.openURL(phoneNumber);
      };

  return (
 <View style={{padding:15,backgroundColor:'white',flex:1}}>
     <View style={styles.header}>
     
<Text  style={styles.headerText}>
  Contact Us
</Text>


    </View>
  
<View style={styles.setting}>
      <Text style={{textAlign:'left',margin:10,color:'#00415e'}}>
     For more information/query and support regarding account deletion contact us.
      </Text>    
</View>

<View style={[styles.setting,{height:70,}]}>

<View style={styles.item}>

       
<TouchableOpacity onPress={()=>Linking.openURL('mailto:info@etheriumtech.com')} >
           <IonIcons name='mail' color='#00415e' size={35} />
           </TouchableOpacity>
<TouchableOpacity onPress={()=>dialCall()} >
           <IonIcons style={{marginLeft:10}} name='call' color='#00415e' size={32} />
           </TouchableOpacity>

           
   
 
        <View>
       
        </View>
        </View>
    
    
    
      
</View>

      
      
        

 </View>
  )
}

export default Contact

const styles=StyleSheet.create({
    setting:{
        backgroundColor:'aliceblue',
        borderRadius:15,
        height:70,
        width:'100%',
        alignItems:'center',
        marginBottom:10
    },
    item:{
        width:120,
   paddingVertical:17,
   flexDirection:'row',
   justifyContent:'space-between'
  
    },
    header:{
        padding:15
          },
          headerText:{
              fontFamily:'Raleway-Bold',
         fontSize:wp('5.5%'),
         color:'#00415e'
            
          }
})