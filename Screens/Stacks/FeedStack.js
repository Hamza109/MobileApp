import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { FEED } from '../../routes'
import Feed from '../Feed/Feed'
const FeedStack = () => {

    const Stack=createNativeStackNavigator()

  return (
  <>
  <Stack.Navigator
  screenOptions={{
    headerShown:false
  }}
  >
    <Stack.Screen name={FEED} component={Feed}  />
  </Stack.Navigator>
  </>
  )
}

export default FeedStack