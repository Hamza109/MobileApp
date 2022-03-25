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
import {
  HStack,
  Stack,
  Center,
  Heading,
  NativeBaseProvider,
  Container,
} from 'native-base';
import {Card, Checkbox, Modal, Portal, Provider} from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import { Dimensions } from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

const ArticleHeader =()=>{
    const navigation=useNavigation();
return(
<View style={styles.container}>
  
  <View styles={styles.flex}>
    <Card style={styles.header}>
<HStack space={2}>
<Icon name="arrow-left" style={{marginTop:7,marginLeft:7}}color={'#00415e'} size={35} onPress={()=>{navigation.navigate('MainTab')}}/>
<TouchableOpacity
            activeOpacity={0.8}
            onPress={() => {
              navigation.navigate('searchArt');
            }}>
            <View style={styles.card}>
              <HStack ml="2" space={110} alignItems="center">
                <Text
                  style={{
                    fontSize: wp('4.5%'),
                    color: '#00415e',
                    fontFamily: 'Raleway-Regular',
                  }}>
                  Search Cures
                </Text>
                <Icon name="search" size={20} style={styles.icon}></Icon>
              </HStack>
            </View>
          </TouchableOpacity>
</HStack>
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

  backgroundColor: 'rgba(0, 65, 94, 0.2)',
  width: wp('85%'),
  height: 50,
  fontSize: 20,

  borderRadius: 15,
  position: 'relative',


  padding: 10,
  },
  inCard: {
  
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
backgroundColor:'#fff'

},
icon: {
  padding: 3,
  position: 'absolute',
  right: 10,
  color: '#00415e',
},

})