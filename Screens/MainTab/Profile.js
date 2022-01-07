import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/core';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StackActions } from '@react-navigation/routers';
import { Alert } from 'react-native';
const ProfileScreen = () => {
  const Navigation =useNavigation()
  const logout = () => {

    Alert.alert("Hold on!", "Are you sure you want Logout?", [
      {
        text: "Cancel",
        onPress: () => null,
        style: "cancel"
      },
      { text: "YES", onPress: () => Navigation.dispatch(StackActions.popToTop()) }
    ]);
    return true;
  
  
  };
 const remove=async ()=>{
try{
await AsyncStorage.multiRemove(['author','rateType'])
  .then(()=>{
  logout()
  })
   
}
catch(error){
  console.log(error)
}

 }
    return (
      <View style={styles.container}>
        <Text>Profile Screen</Text>
        
        <Button
          title="Logout"
          onPress={() => remove()&logout() }
        />
      
      </View>
    );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center'
  },
});
