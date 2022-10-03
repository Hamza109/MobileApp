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
;
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
import { SplashStack } from './Screens/RootStackScreen';
import { Provider } from 'react-redux';
import { Store }  from './Screens/Redux/Store';
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

        setTimeout(() => {
          navigationRef.current?.navigate('Disease', {ids: `${id}`});
        }, 4000);
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
      getUrl();
    };
  });

  const routeNameRef = React.useRef();
  const navigationRef = React.useRef();

  return (
    <Provider store={Store}>
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
      
          <SplashStack />
        </NavigationContainer>
        </SafeAreaProvider>
      </PaperProvider>
    </NativeBaseProvider>

    </SSRProvider>
    </Provider>
  );
};



export default App;
