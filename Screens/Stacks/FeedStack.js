import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {FEED, ARTICLES_BY_MEDICINE, ARTICLES_READ} from '../../routes';
import Feed from '../Feed/Feed';
import ArticlesRead from '../Article/ArticlesRead';
import ArticlesByMedicine from '../Article/ArticlesByMedicine';

const FeedStack = () => {
  const Stack = createNativeStackNavigator();

  return (
    <>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name={FEED} component={Feed} />
        <Stack.Screen name={ARTICLES_READ} component={ArticlesRead} />
        <Stack.Screen
          name={ARTICLES_BY_MEDICINE}
          component={ArticlesByMedicine}
        />
      </Stack.Navigator>
    </>
  );
};

export default FeedStack;
