import React from "react";
import { createStackNavigator } from '@react-navigation/stack';
import MainTabScreen from "./MainTab/MainTab";
import SignInScreen from "./login/SignIn";
import SplashScreen from "./MainTab/SplashScreen";
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from "@react-navigation/native";
import CreateScreen from "./MainTab/Create";
import SearchArt from "./search/SearchArticle";
import Result from "./search/Result";
import SearchDoc from "./search/SearchDoctor";
import SearchBar from "./search/SearchBar";
import CreateScreenHome from "./MainTab/CreateHome";
const Stack = createStackNavigator();

const RootStack=()=> {
  const navigation=useNavigation();
  return (
    <Stack.Navigator  
    initialRouteName="SplashScreen"
    screenOptions={{
      
      headerStyle: {
      backgroundColor: '#fff',
      },
      headerTintColor: '#00415e',
      headerTitleStyle: {
      fontWeight: 'bold'
      }
      
  }}>

<Stack.Screen name="SplashScreen" component={SplashScreen} options={{headerShown: false}} />
        <Stack.Screen name="MainTab" component={MainTabScreen} options={{headerShown: false}} />
        <Stack.Screen name="CreateScreen" component={CreateScreen} options={{headerTitle:'Create Article'}} />
        <Stack.Screen name="CreateScreenHome" component={CreateScreenHome} options={{headerTitle:'Create Article'}} />
        <Stack.Screen name="Result" component={Result} options={{headerShown:null,headerLeft:null}} />
        <Stack.Screen name="searchArt" component={SearchArt} options={{headerShown:false}} />
        <Stack.Screen name="searchDoc" component={SearchDoc} options={{headerShown:false}} />
        <Stack.Screen name="SearchBar" component={SearchBar} options={{headerShown:false}} />
        <Stack.Screen name="SignIn" component={SignInScreen} options={{ headerStyle:{backgroundColor:'#00415e'},headerTitleStyle:{color:'#fff'}, headerTitle:'',
          headerLeft: ()=> <Icon name="close-outline" size={40}  style={{marginLeft:20,color:'#fff'} } backgroundColor="#fff" onPress={()=>navigation.navigate('HomeTab',{Screen:'Home'})}></Icon> }}/>

     

      
    </Stack.Navigator>
  );
}
export default RootStack;