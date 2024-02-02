import {
  SafeAreaView,
  StyleSheet,
  StatusBar,
  View,
  TextInput,
  LogBox,
  Text,
  Image,
  TouchableWithoutFeedback,
  ScrollView,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import Daily, {
  DailyEvent,
  DailyCall,
  DailyEventObject,
  DailyEventObjectAppMessage,
} from '@daily-co/react-native-daily-js';
import CallPanel from './callPanel/callPanel';
import Button from './Button/Button';
import StartButton from './StartButton/StartButton';
import {logDailyEvent, robotID} from './utils';
import api from './api';
import Tray from './Tray/Tray';
import CallObjectContext from './CallObjectContext';
import theme from './theme';
import CopyLinkButton from './CopyLinkButton/CopyLinkButton';
import {useOrientation, Orientation} from './useOrientation';
import packageJson from '../../package.json';
import {backendHost} from '../../components/apiConfig';
LogBox.ignoreLogs(['Require cycle: node_modules']);
// After upgrading to RN 0.66, app has started to show a warning about the constructor
// of NativeEventEmitter been called with a non-null argument without the required removeListeners.
// See https://github.com/ocetnik/react-native-background-timer/issues/366
// Silencing the warning while It is not fixed by react-native-background-timer
LogBox.ignoreLogs(['new NativeEventEmitter']);
const AppState = {
  Idle: 'Idle',
  Creating: 'Creating',
  Joining: 'Joining',
  Joined: 'Joined',
  Leaving: 'Leaving',
  Error: 'Error',
};
const VideoCall = ({route}) => {
  const [appState, setAppState] = useState(AppState.Idle);
  const [roomUrl, setRoomUrl] = useState(undefined);
  const [roomCreateError, setRoomCreateError] = useState(false);
  const [callObject, setCallObject] = useState(null);
  const [roomUrlFieldValue, setRoomUrlFieldValue] = useState(undefined);
  const orientation = useOrientation();
  const [apiUrl, setApiUrl] = useState();
  const id = route.params.id;
  const videoUrl = route.params.url;
  // Make sure to replace with the correct import path

  console.log('videourl',videoUrl)

  useEffect(() => {
    if (!callObject || !roomUrl) {
      return;
    }
    callObject.join({url: roomUrl}).catch(_ => {
      // Handle join errors here
    });
    setAppState(AppState.Joining);
  }, [callObject, roomUrl]);

  useEffect(() => {
    if (!roomUrl) {
      return;
    }
    const newCallObject = Daily.createCallObject();
    setCallObject(newCallObject);
  }, [roomUrl]);

  useEffect(() => {
    if (!callObject) {
      return;
    }

    const events = ['joined-meeting', 'left-meeting', 'error'];

    function handleNewMeetingState(event) {
      logDailyEvent(event);
      switch (callObject?.meetingState()) {
        case 'joined-meeting':
          setAppState(AppState.Joined);
          break;
        case 'left-meeting':
          callObject?.destroy().then(() => {
            setRoomUrl(undefined);
            setCallObject(null);
            setAppState(AppState.Idle);
          });
          break;
        case 'error':
          setAppState(AppState.Error);
          break;
        default:
          break;
      }
    }

    handleNewMeetingState();

    for (const event of events) {
      callObject.on(event, handleNewMeetingState);
    }

    return function cleanup() {
      for (const event of events) {
        callObject.off(event, handleNewMeetingState);
      }
    };
  }, [callObject]);

  const startCall = async () => {
    setRoomUrl(videoUrl);
    console.log('Video Call Pressed');
  };
  useEffect(() => {
    if (!callObject) {
      return;
    }

    function handleAppMessage(event) {
      if (event) {
        logDailyEvent(event);
        console.log(`received app message from ${event.fromId}: `, event.data);
      }
    }

    callObject.on('app-message', handleAppMessage);

    return function cleanup() {
      callObject.off('app-message', handleAppMessage);
    };
  }, [callObject]);


  // useEffect(() => {
  //   if (!roomUrl) {
  //     return;
  //   }
  //   api
  //     .createRoom()
  //     .then(room => {
  //       setRoomUrlFieldValue(room.url);
  //       setAppState(AppState.Idle);
  //     })
  //     .catch(() => {
  //       setRoomCreateError(true);
  //       setRoomUrlFieldValue(undefined);
  //       setAppState(AppState.Idle);
  //     });
  // }, [roomUrl]);

  const createRoom = () => {
    setRoomCreateError(false);
    setAppState(AppState.Creating);
    api
      .createRoom()
      .then(room => {
        setRoomUrlFieldValue(room.url);
        setAppState(AppState.Idle);
      })
      .catch(() => {
        setRoomCreateError(true);
        setRoomUrlFieldValue(undefined);
        setAppState(AppState.Idle);
      });
  };

  // const startCall = () => {
  //   setRoomUrl(roomUrlFieldValue);
  // };

  const leaveCall = useCallback(() => {
    if (!callObject) {
      return;
    }
    if (appState === AppState.Error) {
      callObject.destroy().then(() => {
        setRoomUrl(undefined);
        setRoomUrlFieldValue(undefined);
        setCallObject(null);
        setAppState(AppState.Idle);
      });
    } else {
      setAppState(AppState.Leaving);
      callObject.leave();
    }
  }, [callObject, appState]);

  const showCallPanel = [
    AppState.Joining,
    AppState.Joined,
    AppState.Error,
  ].includes(appState);
  const enableCallButtons = [AppState.Joined, AppState.Error].includes(
    appState,
  );
  const isAppStateIdle = appState === AppState.Idle;
  const startButtonDisabled = !isAppStateIdle || !roomUrlFieldValue;

  return (
    <CallObjectContext.Provider value={callObject}>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={styles.safeArea}>
        <View
          style={styles.container}
          {...robotID(
            `robots-deps-${JSON.stringify(packageJson.dependencies)}`,
          )}>
          {showCallPanel ? (
            <View
              style={[
                styles.callContainerBase,
                orientation === Orientation.Landscape
                  ? styles.callContainerLandscape
                  : null,
              ]}>
              <CallPanel roomUrl={roomUrl || ''} />
              <Tray
                onClickLeaveCall={leaveCall}
                disabled={!enableCallButtons}
              />
            </View>
          ) : (
            <ScrollView
              contentContainerStyle={
                orientation === Orientation.Portrait
                  ? styles.homeContainerPortrait
                  : styles.homeContainerLandscape
              }
              alwaysBounceVertical={false}>
              <View style={styles.buttonContainer}>
                <View
                  style={[
                    styles.demoInputContainer,
                    !!roomUrlFieldValue && styles.shortContainer,
                  ]}>
                  <TextInput
                    style={styles.roomUrlField}
                    placeholder="Room URL"
                    placeholderTextColor={theme.colors.greyDark}
                    autoCapitalize="none"
                    autoCorrect={false}
                    keyboardType="url"
                    {...robotID('robots-room-url')}
                    editable={false}
                    value={videoUrl}
                    onChangeText={text => {
                      setRoomUrlFieldValue(text);
                      setRoomCreateError(false);
                    }}
                  />
                  {!!roomUrlFieldValue && (
                    <TouchableWithoutFeedback
                      onPress={() => setRoomUrlFieldValue(undefined)}>
                      <Image
                        style={styles.closeIcon}
                        source={require('../../assets/img/close.png')}
                      />
                    </TouchableWithoutFeedback>
                  )}
                </View>

                <StartButton
                  onPress={startCall}
                  disabled={startButtonDisabled}
                  starting={appState === AppState.Joining}
                />
             
              </View>
            </ScrollView>
          )}
        </View>
      </SafeAreaView>
    </CallObjectContext.Provider>
  );
};
export default VideoCall;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: theme.colors.greyLightest,
  },
  container: {
    flex: 1,
    width: '100%',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  callContainerBase: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  callContainerLandscape: {
    flexDirection: 'row',
  },
  textRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  bodyText: {
    fontSize: theme.fontSize.base,
    marginBottom: 8,
    fontFamily: theme.fontFamily.body,
  },
  startContainer: {
    flexDirection: 'column',
  },
  homeContainerPortrait: {
    paddingHorizontal: 24,
  },
  homeContainerLandscape: {
    paddingHorizontal: '20%',
  },
  buttonContainer: {
    justifyContent: 'center',
    marginTop: 40,
  },
  logo: {
    alignSelf: 'flex-start',
    marginVertical: 40,
  },
  roomUrlField: {
    borderRadius: 8,
    marginVertical: 8,
    padding: 12,
    backgroundColor: theme.colors.white,
    fontFamily: theme.fontFamily.body,
    color: theme.colors.greyDark,
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: theme.fontSize.base,
    borderWidth: 1,
    borderColor: theme.colors.grey,
    width: '100%',
  },
  errorText: {
    fontSize: theme.fontSize.base,
    color: theme.colors.red,
    marginLeft: 8,
  },
  demoInputContainer: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
  },
  shortContainer: {
    width: '90%',
  },
  closeIcon: {
    height: 16,
    width: 16,
    marginLeft: 16,
  },
});
