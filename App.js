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
import SplashScreen from 'react-native-splash-screen';

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

import { SplashStack,Navigator } from './Screens/RootStackScreen';
import { Provider } from 'react-redux';
import reduxStore  from './Screens/Redux/Store';
import { PersistGate } from 'redux-persist/integration/react';
import { useStore,useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import messaging from '@react-native-firebase/messaging';
import axios from 'axios';
import { backendHost } from './components/apiConfig';
import PushNotification from 'react-native-push-notification';
import PushNotificationIOS from "@react-native-community/push-notification-ios";


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
      await AsyncStorage.setItem('artId',JSON.stringify(id))
    }catch(error){
      throw error
    }
  
  
  }

  const  getFCMToken=async ()=>{
    try{
      const token = await messaging().getToken();
      console.log('token->',token)
      axios.post(`${backendHost}/notifications/token/${token}`)
      .then((res)=>{
        console.log('notify->',res.status)
      })
    }
    catch(e){
  console.log(e)
    }
  };



  useEffect(()=>{
setTimeout(()=>SplashScreen.hide(),2000)
    
    getFCMToken();
  },[])


 const configPush = () => {
    if (Platform.OS == 'ios') {
      PushNotification.getApplicationIconBadgeNumber((number) => {
        if (number > 0) {
          PushNotification.setApplicationIconBadgeNumber(0);
        }
      });
    }

    PushNotification.createChannel(
      {
        channelId: "channel_id_ALL_CURES", // (required)
        channelName: "channel_ALL_CURES", // (required)
        channelDescription: "A channel to categorise your notifications", // (optional) default: undefined.
        playSound: true, // (optional) default: true
        soundName: "default", // (optional) See `soundName` parameter of `localNotification` function
        // importance: 4, // (optional) default: 4. Int value of the Android notification importance
        vibrate: true, // (optional) default: true. Creates the default vibration patten if true.
      },
      (created) => console.log(`createChannel returned '${created}'`) // (optional) callback returns whether the channel was created, false means it already existed.
    );
    PushNotification.configure({
    
      // (optional) Called when Token is generated (iOS and Android)
      onRegister: function (token) {
        console.log("TOKEN:", token);
      },

      // (required) Called when a remote is received or opened, or local notification is opened
      onNotification: function (notification) {
        console.log("NOTIFICATION:", notification);
        // process the notification
        if (notification.foreground) {
          PushNotification.localNotification({
            channelId: "channel_id_ALL_CURES",
            title: notification.title,
            message: notification.message
          });
        }
        // (required) Called when a remote is received or opened, or local notification is opened
        notification.finish(PushNotificationIOS.FetchResult.NoData);
      },

      // (optional) Called when Registered Action is pressed and invokeApp is false, if true onNotification will be called (Android)
      onAction: function (notification) {
        console.log("ACTION:", notification.action);
        console.log("NOTIFICATION:", notification);

        // process the action
      },

      // (optional) Called when the user fails to register for remote notifications. Typically occurs when APNS is having issues, or the device is a simulator. (iOS)
      onRegistrationError: function (err) {
        console.error(err.message, err);
      },

      // IOS ONLY (optional): default: all - Permissions to register.
      permissions: {
        alert: true,
        badge: true,
        sound: true,
      },

      // Should the initial notification be popped automatically
      // default: true
      popInitialNotification: true,

      /**
       * (optional) default: true
       * - Specified if permissions (ios) and token (android and ios) will requested or not,
       * - if not, you must call PushNotificationsHandler.requestPermissions() later
       * - if you are not using remote notification or do not have Firebase installed, use this:
       *     requestPermissions: Platform.OS === 'ios'
       */
      requestPermissions: true,
    });
  }

  useEffect(()=>{
    configPush();
  })

  



  useEffect(() => {




    Text.defaultProps = Text.defaultProps || {};
    Text.defaultProps.allowFontScaling = false;

    let deviceId = DeviceInfo.getUniqueId();
 
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
        const regex = /\/cure\/\d+-(.*)$/;
const match = regex.exec(initialUrl);
const string = match ? match[1].replace(/-/g, ' ') : null;
const title=string.replace('?whatsapp', '')
        articeId({id:id,title:title})
      
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