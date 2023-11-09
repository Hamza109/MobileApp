import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { SEARCH } from '../../routes'
import Search from '../Find/Search'

const SearchStack = () => {
    const Stack=createNativeStackNavigator()
  return (
    <Stack.Navigator
    screenOptions={{
      headerShown:false
    }}
    >
    <Stack.Screen name={SEARCH} component={Search} />
   </Stack.Navigator>
  )
}

export default SearchStack