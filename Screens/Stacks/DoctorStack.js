import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  ARTICLES_READ,
  DOCTOR,
  DOCTOR_MAIN_SCREEN,
  DOC_CURES,
  FILTER_DOC
} from '../../routes';
import Doctor from '../Doctor/Doctor';
import DoctorMainScreen from '../Doctor/DoctorMainScreen';
import {FontFamily} from '../../config/GlobalStyles';
import ArticlesRead from '../Article/ArticlesRead';
import DocCures from '../Doctor/DocCures';
import FilterDoc from '../Doctor/FilterDoc';
const DoctorStack = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name={DOCTOR} component={Doctor} />
      <Stack.Screen name={ARTICLES_READ} component={ArticlesRead} />

      <Stack.Screen
        name={DOCTOR_MAIN_SCREEN}
        component={DoctorMainScreen}
        options={{
          title: 'Practitioners',
          headerShown: true,
          headerTitleAlign: 'center',
          headerTitleStyle: {
            fontFamily: FontFamily.poppinsBold,
            fontSize: 25,
          },
        }}
      />
      <Stack.Screen
        name={DOC_CURES}
        component={DocCures}
        options={{
          headerShown: true,
          headerTitleAlign: 'center',
          headerTitleStyle: {
            fontFamily: FontFamily.poppinsBold,
            fontSize: 22,
            
          },
        }}
      />
      <Stack.Screen
        name={FILTER_DOC}
        component={FilterDoc}
        options={{
          title:"Filter Practitioners",
          headerShown: true,
          headerTitleAlign: 'center',
          headerTitleStyle: {
            fontFamily: FontFamily.poppinsBold,
            fontSize: 22,
            
          },
        }}
      />
    </Stack.Navigator>
  );
};

export default DoctorStack;
