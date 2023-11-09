import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { DOCTOR } from '../../routes'
import Doctor from '../Doctor/Doctor'

const DoctorStack = () => {

    const Stack=createNativeStackNavigator()
  return (
    <Stack.Navigator
    screenOptions={{
      headerShown:false
    }}
    >

<Stack.Screen name={DOCTOR} component={Doctor} />

</Stack.Navigator>
  )
}

export default DoctorStack