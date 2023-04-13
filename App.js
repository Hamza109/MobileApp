/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState, useEffect} from 'react';
import analytics from '@react-native-firebase/analytics';
import {NativeBaseProvider, Box} from 'native-base';
import {NavigationContainer} from '@react-navigation/native';
import DeviceInfo from 'react-native-device-info';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import messaging from '@react-native-firebase/messaging';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Linking,
  Alert,
  AppState,
} from 'react-native';
import RootStack from './Screens/RootStackScreen';
import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import {GestureHandlerRootView} from 'react-native-gesture-handler'
import AsyncStorage from '@react-native-async-storage/async-storage';
import {SSRProvider} from '@react-aria/ssr';
import {DefaultTheme, Provider as PaperProvider} from 'react-native-paper';
import DrawerMenu from './Screens/MainTab/DrawerMenu';
import { SplashStack,Navigator } from './Screens/RootStackScreen';
import { Provider } from 'react-redux';
import reduxStore  from './Screens/Redux/Store';
import { PersistGate } from 'redux-persist/integration/react';
import { useStore,useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

import { screenName,artId } from './Screens/Redux/Action';

const App = () => {
  // const linking = {
  //   prefixes: ['https://test.saadibrah.im', 'saadibrahim://'],
  // };
  const [url, setUrl] = useState(null);
  const [processing, setProcessing] = useState(true);

  const setMail = async mail => {
    try {
      await AsyncStorage.setItem('mail1', mail);
    } catch (error) {
      error;
    }
  };

  

  const setDeviceInfo = async dev => {
    try {
      await AsyncStorage.setItem('device', dev);
    } catch (error) {
      error;
    }
  };

  const articeId=async id=>{
    try {
      await AsyncStorage.setItem('artId',id)
    }catch(error){
      throw error
    }
  
  
  }

  const getFCMToken=async ()=>{
    try{
      const token= await messaging().getToken();
      console.log(token)
    }
    catch(e){
      console.log(e)
    }
  }

  useEffect(()=>{
 
    getFCMToken();
  },[]);




  useEffect(() => {




    Text.defaultProps = Text.defaultProps || {};
    Text.defaultProps.allowFontScaling = false;

    let deviceId = DeviceInfo.getUniqueId();
    console.log('device:', deviceId);
    setDeviceInfo(deviceId);
    // Get the deep link used to open the app
    const getUrl = async () => {
      const initialUrl = await Linking.getInitialURL();

      if (initialUrl === null) {
        return;
      }

      if (initialUrl.includes('/cure')) {
        const url = initialUrl.split('/').pop();
        const id = url.split('-')[0];
        articeId(id)
      
      }
      if (initialUrl.includes('/ResetPass')) {
        const url = initialUrl.split('em=')[1];

        setMail(url);
        setTimeout(() => {
          navigationRef.current?.navigate('Forgetpass');
        }, 4000);
      }
    };

    getUrl();

    return () => {
      getUrl()
    };
    
  });

  const routeNameRef = React.useRef();
  const navigationRef = React.useRef();
  const {Store,persistor}=reduxStore();
  return (
    <Provider store={Store}>
<PersistGate loading={null} persistor={persistor}>
<SSRProvider>

    <NativeBaseProvider>
      <PaperProvider>
        <SafeAreaProvider>
        <NavigationContainer
          // linking={linking}
          ref={navigationRef}
          onReady={() => {
            routeNameRef.current = navigationRef.current.getCurrentRoute().name;
          }}
          onStateChange={async () => {
            const previousRouteName = routeNameRef.current;
            const currentRouteName =
              navigationRef.current.getCurrentRoute().name;

            if (previousRouteName !== currentRouteName) {
              await analytics().logScreenView({
                screen_name: currentRouteName,
                screen_class: currentRouteName,
              });
            }
            routeNameRef.current = currentRouteName;
          }}>
     
         <Navigator/>
        </NavigationContainer>
        </SafeAreaProvider>
      </PaperProvider>
    </NativeBaseProvider>

    </SSRProvider>
    </PersistGate>
    </Provider>
  );
};



export default App;