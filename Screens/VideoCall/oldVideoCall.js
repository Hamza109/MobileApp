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
  
  const AppState = {
    Idle: 'Idle',
    Creating: 'Creating',
    Joining: 'Joining',
    Joined: 'Joined',
    Leaving: 'Leaving',
    Error: 'Error',
  };
  const VideoCall = () => {
    const [appState, setAppState] = useState(AppState.Idle);
    const [roomUrl, setRoomUrl] = useState(undefined);
    const [roomCreateError, setRoomCreateError] = useState(false);
    const [callObject, setCallObject] = useState(null);
    const [roomUrlFieldValue, setRoomUrlFieldValue] = useState(undefined);
    const orientation = useOrientation(); // Make sure to replace with the correct import path
  
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
  
    useEffect(() => {
      if (!roomUrl) {
        return;
      }
      api.createRoom()
        .then(room => {
          setRoomUrlFieldValue(room.url);
          setAppState(AppState.Idle);
        })
        .catch(() => {
          setRoomCreateError(true);
          setRoomUrlFieldValue(undefined);
          setAppState(AppState.Idle);
        });
    }, [roomUrl]);
  
    const createRoom = () => {
      setRoomCreateError(false);
      setAppState(AppState.Creating);
      api.createRoom()
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
  
    const startCall = () => {
      setRoomUrl(roomUrlFieldValue);
    };
  
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
                <Image
                  style={styles.logo}
                  source={require('../../assets/img/logo.png')}
                />
                <View style={styles.buttonContainer}>
                  <Text style={styles.bodyText}>
                    To get started, enter an existing room URL or create a
                    temporary demo room
                  </Text>
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
                      editable={isAppStateIdle}
                      value={roomUrlFieldValue}
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
                  {roomCreateError && (
                    <View style={styles.textRow}>
                      <Image source={require('../../assets/img/error.png')} />
                      <Text style={styles.errorText}>
                        Oops! A room couldn't be created.
                      </Text>
                    </View>
                  )}
                  {roomUrlFieldValue ? (
                    <CopyLinkButton roomUrl={roomUrlFieldValue} />
                  ) : (
                    <Button
                      type="secondary"
                      robotId="robots-create-room"
                      onPress={createRoom}
                      label={
                        appState === AppState.Creating
                          ? 'Creating room...'
                          : 'Create demo room'
                      }
                    />
                  )}
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
    },
    callContainerBase: {
      position: 'absolute',
      width: '100%',
      height: '100%',
    },
  });
  