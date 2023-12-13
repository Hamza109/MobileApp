import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {FEED, ARTICLES_BY_MEDICINE, ARTICLES_READ} from '../../routes';
import Feed from '../Feed/Feed';
import ArticlesRead from '../Article/ArticlesRead';
import ArticlesByMedicine from '../Article/ArticlesByMedicine';
import Back from '../../assets/img/BACK.svg';
import {TouchableOpacity, View} from 'react-native';
import {FontFamily, Color} from '../../config/GlobalStyles';
const FeedStack = ({navigation}) => {
  const Stack = createNativeStackNavigator();
  const handleBack = () => {
    console.log('back');
    navigation.goBack();
  };
  return (
    <>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          gestureEnabled:true,
        }}>
        <Stack.Screen name={FEED} component={Feed} />
        <Stack.Screen
          name={ARTICLES_READ}
          component={ArticlesRead}
          options={{
            headerShown: false,
            title: '',
            gestureEnabled:true
            
          }}
        />
        <Stack.Screen
          name={ARTICLES_BY_MEDICINE}
          component={ArticlesByMedicine}
          options={{
            headerShown: true,

            headerTitleAlign: 'center',
            headerTitleStyle: {
              fontFamily: FontFamily.poppinsBold, // Replace with your custom font
              fontSize: 18, // Adjust the font size as needed
            },
            headerLeft: () => {
              return (
                <TouchableOpacity style={{padding: 10}} onPress={handleBack}>
                  <Back />
                </TouchableOpacity>
              );
            },
          }}
        />
      </Stack.Navigator>
    </>
  );
};

export default FeedStack;
