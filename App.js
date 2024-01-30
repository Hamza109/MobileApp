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
  Platform,
  LogBox
} from 'react-native';

import {GestureHandlerRootView} from 'react-native-gesture-handler'
import AsyncStorage from '@react-native-async-storage/async-storage';
import {SSRProvider} from '@react-aria/ssr';
import {DefaultTheme, Provider as PaperProvider} from 'react-native-paper';

import { SplashStack,Navigator } from './Screens/RootStackScreen';
import { Provider } from 'react-redux';
import reduxStore  from './Screens/Redux/Store';
import { PersistGate } from 'redux-persist/integration/react';
import messaging from '@react-native-firebase/messaging';
import axios from 'axios';
import { backendHost } from './components/apiConfig';
import PushNotification from 'react-native-push-notification';
import PushNotificationIOS from "@react-native-community/push-notification-ios";

LogBox.ignoreLogs(['new NativeEventEmitter']);

const App = () => {


  const checkApplicationPermission= async ()=>{
  
    if(Platform.OS=='android'){
     
      try{
        console.log('hi i am working')
        await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.POST_NOTIFICATION
        )
      }catch(err){console.log(err)}
    } 
  
  }


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

  const tiPValue=async tip=>{
    try {
      await AsyncStorage.setItem('modal',JSON.stringify(tip))
    }catch(error){
      throw error
    }
  
  }

  const tipArticle=async tip=>{
    try {
      await AsyncStorage.setItem('tip_article',JSON.stringify(tip))
    }catch(error){
      throw error
    }
  
  }



  useEffect(() => {
    setTimeout(()=>SplashScreen.hide(),2000)






    const requestUserPermission = async () => {
      const authStatus = await messaging().requestPermission();
      const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;
  
      if (enabled) {
        // User has authorized or provisionally authorized the app to receive notifications.
        getToken(); // Retrieve the FCM token for the device.
      }
    };
  
    const getToken = async () => {
      const token = await messaging().getToken();
      fetch(`${backendHost}/notification/token/"${token}"`,{
        method:'POST'
      })
      .then((res)=>{
           
      })
      console.log('FCM',token)
      // Send the token to your server for further processing if needed.
    };
    checkApplicationPermission();
    requestUserPermission();
  
    // return messaging().onTokenRefresh(getToken); // Handle token refresh events.
  }, []);

  

  useEffect(() => {




    const handleInitialNotification = async () => {
      const initialNotification = await messaging().getInitialNotification();
   
      if (initialNotification) {
        const {notification}=initialNotification
    
        const {action,id}=initialNotification.data
        if(action === 'tip')
        {
          tiPValue(true)
      
        }

         if(action === 'article')
         {
          articeId({id:id,title:notification.body})

         }





      // navigationRef.current?.navigate('ProfileTab',{screen:'chat'})
       
        // Handle the notification as needed
      }
    };

    handleInitialNotification();
  }, []);
  

  useEffect(() => {



    messaging().registerDeviceForRemoteMessages();

    messaging().onNotificationOpenedApp((remoteMessage) => {
      // Handle the notification when the app is already open
   
      
      // Perform any desired action based on the notification data
    });

    messaging().setBackgroundMessageHandler(async remoteMessage => {
    console.log('background',remoteMessage)
    });

    messaging().onMessage(async (remoteMessage) => {
      console.log('onMessage',remoteMessage)
  
      // Process the received notification message.
      // You can show an in-app notification or handle the data payload as per your requirements.
    });
  
    
  }, []);

  


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
      onRegister: function (deviceToken) {
        console.log(deviceToken)
      
    
      },
        
      // (required) Called when a remote is received or opened, or local notification is opened
      onNotification: function (notification) {


     
        
      //  tiPValue(true)
        // process the notification
        PushNotification.localNotification({
          channelId: "channel_id_ALL_CURES",
          title: notification.title,
          message: notification.message
          
        });
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
      requestPermissions:true
   
    });
  }

  useEffect(()=>{
    configPush();
  })

  



  useEffect(() => {


   
    



    const handleDeepLink = async (url) => {
      // Process the deep link URL and perform the desired action

      if (url.includes('/ResetPass')) {
   
        const newUrl = url.split('em=')[1];
    

        setMail(newUrl);
     
    
        setTimeout(() => {
          navigationRef.current?.navigate('Forgetpass');
        }, 2000);
      }
    
    };
    
    const initializeDeepLinking = () => {
      // Add an event listener to handle incoming deep links
      Linking.addEventListener('url', handleOpenURL);
    };
    
   const cleanUpDeepLinking = () => {
      // Remove the event listener when the component is unmounted or the app is backgrounded
      Linking.removeEventListener('url', handleOpenURL);
    };
    
    const handleOpenURL = (event) => {
      // Handle the deep link when it is received
      const url = event.url;

      handleDeepLink(url);
    }

    initializeDeepLinking();
    


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


      if(initialUrl.includes('/view'))
      {
  
        tipArticle(true)
      }
      else{

      }

      if (initialUrl.includes('/cure')) {
        const url = await initialUrl.split('/').pop();
    
        const id = await url.split('-')[0];
        const regex = await /\/cure\/\d+-(.*)$/;
const match = await regex.exec(initialUrl);
const string = await match ? match[1].replace(/-/g, ' ') : null;
const title=await string.replace('?whatsapp', '')

        articeId({id:id,title:title})
      
      }



      if (initialUrl.includes('/ResetPass')) {
        const url = initialUrl.split('em=')[1];

        setMail(url);
        setTimeout(() => {
       navigationRef.current?.navigate('Forgetpass');
        }, 2000);
      }
    };

    getUrl();

    return () => {
      getUrl()
      cleanUpDeepLinking()
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
        >
     
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