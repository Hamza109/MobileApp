import {Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Color,FontFamily} from '../config/GlobalStyles';
const ScheduleButton = () => {
  return (

      <Pressable style={styles.button}>
        <Text style = {styles.buttonText}>SCHEDULE CONSULTATION</Text>
      </Pressable>
    
 
  );
};

export default ScheduleButton;

const styles = StyleSheet.create({

  button: {
    backgroundColor: Color.appDefaultColor,
    padding:12,
    borderRadius:10
   
  },
  buttonText:{
    fontSize:14,
    lineHeight:24,
    color:'#fff',
    fontFamily:FontFamily.poppinsRegular,
    alignSelf:'center'
  }
});
