import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {DOCTOR, DOCTOR_MAIN_SCREEN} from '../../routes';
import Doctor from '../Doctor/Doctor';
import DoctorMainScreen from '../Doctor/DoctorMainScreen';
import { FontFamily } from '../../config/GlobalStyles';
const DoctorStack = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name={DOCTOR} component={Doctor} />
      <Stack.Screen
        name={DOCTOR_MAIN_SCREEN}
        component={DoctorMainScreen}
        options={{
          title:'Practitioners',
          headerShown: true,
          headerTitleAlign: 'center',
          headerTitleStyle:{
            fontFamily:FontFamily.poppinsBold,
            fontSize:25,
          
            
          }
        }}
      />
    </Stack.Navigator>
  );
};

export default DoctorStack;
