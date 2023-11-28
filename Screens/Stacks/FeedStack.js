import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {FEED, ARTICLES_BY_MEDICINE, ARTICLES_READ} from '../../routes';
import Feed from '../Feed/Feed';
import ArticlesRead from '../Article/ArticlesRead';
import ArticlesByMedicine from '../Article/ArticlesByMedicine';
import Back from '../../assets/img/BACK.svg'
import { TouchableOpacity,View } from 'react-native';

const FeedStack = ({navigation}) => {
  const Stack = createNativeStackNavigator();
const handleBack=()=>{
  console.log('back')
  navigation.goBack()
}
  return (
    <>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name={FEED} component={Feed} />
        <Stack.Screen name={ARTICLES_READ} component={ArticlesRead} options={
          {headerShown:true,title:'',
          headerLeft:(()=>{
           return <TouchableOpacity  style={{padding:10}} onPress={handleBack}><Back /></TouchableOpacity>
        })}} />
        <Stack.Screen
          name={ARTICLES_BY_MEDICINE}
          component={ArticlesByMedicine}
        />
      </Stack.Navigator>
    </>
  );
};

export default FeedStack;
