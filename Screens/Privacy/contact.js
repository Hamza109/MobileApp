import React, { useEffect } from 'react'
import Link from '@react-navigation/native';
import { Linking } from 'react-native';
import { View,Text,HStack, Divider } from 'native-base'
import { StyleSheet,TouchableOpacity } from 'react-native'
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import IonIcons from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import { useSelector,useDispatch } from 'react-redux';
import { screenName } from '../Redux/Action';

const Contact = () => {
  const dispatch=useDispatch()
    const navigation=useNavigation()
  const user=useSelector((state)=>state.userId.regId)
  const onDelete=()=>{
    if(user!=0){
navigation.navigate('delete')
    }
    else{
      dispatch(screenName('LOGIN'))
    }
  }
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

<View style={styles.delete}>

<Text style={styles.infoText} >As a customer of AllCures, you have the ability to delete your profile. If your objective is for AllCures to not contact you, you have the ability of Unsubscribing to our NewsLetter by Editing your subscription. If you would like to Delete your profile, you can do that by Clicking Here. If you would like AllCures to remove all your information from our databases, please send us an email at <Text style={{textDecorationLine:'underline',color:'blue'}} onPress={()=>Linking.openURL('mailto:info@etheriumtech.com')}>info@etheriumtech.com</Text> with the Subject of 'Delete My Profile'. In the subject of the body, also indicate your email address.</Text>
  
  <TouchableOpacity onPress={onDelete} style={styles.deleteButton} activeOpacity={.9} >
  <MaterialCommunityIcons name="delete" size={16} color="#fff" />

  <Text
    style={{color:'#fff',fontSize:8}}>
    Account Deleteion
  </Text>
  </TouchableOpacity>
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
            left:12
  
     
        },
          infoText: {
            color: '#00415e',
            fontFamily: 'Raleway-Regular',
            fontSize: 8,
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