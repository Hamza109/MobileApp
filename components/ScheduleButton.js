import {Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Color,FontFamily} from '../config/GlobalStyles';
const ScheduleButton = () => {
  return (
    <View style={styles.container}>
      <Pressable style={styles.button}>
        <Text style = {styles.buttonText}>Schedule Consultation</Text>
      </Pressable>
      <Pressable style={styles.button}>
        <Text style = {styles.buttonText}>Linkdin</Text>
      </Pressable>
    </View>
  );
};

export default ScheduleButton;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  button: {
    backgroundColor: Color.appDefaultColor,
    padding:12,
    borderRadius:10
   
  },
  buttonText:{
    fontSize:14,
    lineHeight:24,
    color:'#fff',
    fontFamily:FontFamily.poppinsRegular
  }
});
