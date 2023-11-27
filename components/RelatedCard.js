import {StyleSheet, Text, View, Image} from 'react-native';
import React from 'react';
import {width, height, Border} from '../config/GlobalStyles';
import moment from 'moment/moment';
import Dot from '../assets/img/dot.svg';
import {FontFamily} from '../config/GlobalStyles';
import { Color } from '../config/GlobalStyles';

const RelatedCard = ({author,image,published_date,title}) => {
    const createdAt = moment(`${published_date}`, 'YYYYMMDD').fromNow();
  return (
    <View style={styles.cardContainer}>
        
        <Image source={{uri:image}} style={styles.image} />
        
        <View style={styles.relatedData}>
        <Text style={styles.author} >{author}</Text>
        <Text style={styles.title} numberOfLines={2}>
          {title}
        </Text>
        <Text style={styles.time}>
            10 min ago    <Dot height={5} width={5} />    {createdAt}{' '}
          </Text>
        </View>
 
    </View>
  )
}

const styles=StyleSheet.create({
    cardContainer:{
      backgroundColor: '#fff',
      borderRadius: 6,
 

  
          // Shadow properties for iOS
        shadowColor: "rgba(123, 123, 123, 1)",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 1,
        shadowRadius: 24,
        elevation: 5,
        flex: 1,
        width: "100%",
        overflow:'hidden',
    marginTop:20,
    marginBottom:10
     
    },
    image:{
       
    width:'100%',
    height:167,
        borderRadius:Border.br_10xs
  
    },
    relatedData:{
        paddingHorizontal:10,
        paddingVertical:20,
        width:'100%'
    },time: {
        fontSize: 8,
        fontFamily: FontFamily.poppinsRegular,
        lineHeight: 12,
        color:Color.colorDarkgray,
        fontWeight:'700',
        marginTop:10
      },
      title: {
        fontSize: 15,
        fontFamily: FontFamily.poppinsBold,
        lineHeight: 22.5,
        color:Color.colorDarkslategray,
        fontWeight:'700',
        marginTop:10
        
      },
    author: {
        fontSize: 9,
        fontFamily: FontFamily.poppinsRegular,
        color:Color.colorDarkslategray,
        fontWeight:'400'
    }
   
})

export default RelatedCard