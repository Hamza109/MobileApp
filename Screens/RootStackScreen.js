import React from "react";
import { createStackNavigator } from '@react-navigation/stack';
import MainTabScreen from "./MainTab/MainTab";
import SignInScreen from "./login/SignIn";
import SplashScreen from "./MainTab/SplashScreen";
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from "@react-navigation/native";
import CreateScreen from "./MainTab/Create";
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
        <Stack.Screen name="SignIn" component={SignInScreen} options={{ headerStyle:{backgroundColor:'#00415e'},headerTitleStyle:{color:'#fff'}, headerTitle:'',
          headerLeft: ()=> <Icon name="close-outline" size={40}  style={{marginLeft:20,color:'#fff'} } backgroundColor="#fff" onPress={()=>navigation.navigate('HomeTab',{Screen:'Home'})}></Icon> }}/>

     

      
    </Stack.Navigator>
  );
}
export default RootStack;