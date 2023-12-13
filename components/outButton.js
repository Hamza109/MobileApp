import {Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Color,FontFamily} from '../config/GlobalStyles';
import { color } from 'react-native-reanimated';
const OutButton = () => {
  return (

      <Pressable style={styles.button}>
        <Text style = {styles.buttonText}>LINKEDIN</Text>
      </Pressable>
    
 
  );
};

export default OutButton;

const styles = StyleSheet.create({

  button: {
    backgroundColor: '#fff',
    padding:12,
    borderRadius:10,
    borderWidth:1,
    borderColor:Color.appDefaultColor
   
  },
  buttonText:{
    fontSize:14,
    lineHeight:24,
    color:Color.appDefaultColor,
    fontFamily:FontFamily.poppinsRegular,
    alignSelf:'center'
  }
});
