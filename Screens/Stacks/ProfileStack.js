import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { PROFILE } from '../../routes'
import Profile from '../Profile/Profile'


const ProfileStack = () => {
    const Stack=createNativeStackNavigator()
  return (
    <Stack.Navigator
    screenOptions={{
      headerShown:false
    }}
    >
    <Stack.Screen name={PROFILE} component={Profile} />
  </Stack.Navigator>
  )
}

export default ProfileStack