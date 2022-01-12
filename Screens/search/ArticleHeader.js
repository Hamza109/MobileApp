import React, {useState, useEffect} from 'react';
import {
  View,
  ScrollView,
  Text,
  Button,
  StyleSheet,
  StatusBar,
  BackHandler,
  Alert,
  TouchableOpacity,
  TouchableHighlight,
  Image,
} from 'react-native';
import {Card, Checkbox, Modal, Portal, Provider} from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { Dimensions } from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

const ArticleHeader =()=>{
    const navigation=useNavigation();
return(
<View style={styles.container}>
  
  <View styles={styles.flex}>
    <Card style={styles.header}>
<View style={{flexDirection:'row'}}>
<Icon name="arrow-back-outline" style={{marginTop:7,marginLeft:7}}color={'#00415e'} size={35} onPress={()=>{navigation.navigate('MainTab')}}/>
<TouchableOpacity activeOpacity={0.8} onPress={()=>{navigation.navigate('searchArt')}}>
 <Card style={styles.card}>
   <View style={styles.inCard}>
     <Icon name="search-sharp" size={20} style={styles.icon}></Icon>
     <Text style={{fontSize: 18, marginRight: 130, color: 'grey'}}>
       Search for articles
     </Text>
   </View>
 </Card>
</TouchableOpacity>
</View>
</Card>



    </View>
 
</View>
)
}
 export default ArticleHeader;

const width=Dimensions.get('screen').width

const styles = StyleSheet.create({
    // container: {
    //     backgroundColor: '#fff',
    //     height: '100%',
    //     width: '100%',
    //   },
card: {
    flexDirection: 'row',
    backgroundColor: 'lightgrey',
    width: wp('85%'),
    height: 50,
    fontSize: 20,
    fontWeight: 'bold',
    borderRadius:5,
    marginTop: 0,
    marginLeft:0,
    borderWidth: 1,
    shadowRadius: 35,
    shadowOffset: 50,
    elevation: 10,
    shadowColor: 'grey',
  },
  inCard: {
    padding: 12,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  flex:{
    flex:1,
   
},
header:{
flexDirection:'row',
padding: 0,
marginTop: Platform.OS === 'ios' ? 0 : -7,
marginLeft:0,
borderColor: '#fff',
borderWidth: 0.1,
alignItems: 'center',
width: wp('100%'),
height: 85,
elevation: 3,
}
})