import { StatusBar } from 'native-base'
import React,{useState,useEffect} from 'react'
import { View,Text,StyleSheet } from 'react-native'

const Inbox = () => {
  return (
    <View>
 <StatusBar backgroundColor="#00415e" barStyle="light-content" />
        <Text>Inbox</Text>
    </View>
  )
}

export default Inbox