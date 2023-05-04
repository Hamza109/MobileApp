import React, {useState, useEffect} from 'react';
import { View,Text,TextInput,StyleSheet } from 'react-native';

export const TextBox = ({label,placeholder,keyboardType,value,returnType,onChangeText,multiline})=>{
    return (
        <View style={{marginVertical:15}}>
            <Text style={{marginLeft:8,color:'#00415e',fontFamily:'Raleway-Regular'}}>{label}</Text>
        <TextInput
        placeholder={placeholder}
        placeholderTextColor="#00415e"
        autoCapitalize="none"
        value={value}
        returnKeyType={returnType}
        keyboardType={keyboardType}
        onChangeText={onChangeText}
        multiline={multiline}
        style={styles.textInputTitle}
        
        
        />
        </View>
    )
}



const styles =StyleSheet.create({

    textInputTitle: {
        borderRadius: 15,
        color: 'grey',
        fontSize: 15,
  alignItems:'center',
  paddingLeft:15,
        fontFamily: 'Raleway-Regular',
        width:'100%',
        color:'#00415e',
        backgroundColor: 'rgba(0, 65, 94, 0.2)',
        height:52
      },
})