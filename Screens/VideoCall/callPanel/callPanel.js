import React, {
  useEffect,
  useReducer,
  useMemo,
  useCallback,
  useState,
} from 'react';

import {View, StyleSheet, ScrollView, Text} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import {logDailyEvent} from '../utils';
import {
  DailyEvent,
  DailyEventObjectAvailableDevicesUpdated,
  MediaDeviceInfo,
} from '@daily-co/react-native-daily-js';

import {
  callReducer,
  initialCallState,
  PARTICIPANTS_CHANGE,
  CAM_OR_MIC_ERROR,
  FATAL_ERROR,
  isScreenShare,
  isLocal,
  containsScreenShare,
  participantCount,
  getMessage,
} from './callState';
import Tile, {TileType} from '../Tile/Tile';
import CallMessage from '../CallMessage/CallMessage';
import {useCallObject} from '../useCallObject';
import {TRAY_HEIGHT as TRAY_THICKNESS} from '../Tray/Tray';
import CopyLinkButton from '../CopyLinkButton/CopyLinkButton';
import {useOrientation, Orientation} from '../useOrientation';
import {useMeetingState} from '../useMeetingState';


const THUMBNAIL_EDGE_LENGTH = 100;

const CallPanel = props => {
  const callObject = useCallObject();
  const meetingState = useMeetingState();

  const [callState, dispatch] = useReducer(callReducer, initialCallState);
  const [usingFrontCamera, setUsingFrontCamera] = useState(true); // default
  const orientation = useOrientation();

  const [cameraDevicesOpen, setCameraDevicesOpen] = useState(false);
  const [cameraDeviceValue, setCameraDeviceValue] = useState(null);
  const [cameraDeviceItems, setCameraDevicesItems] = useState([]);
  const [audioDevicesOpen, setAudioDevicesOpen] = useState(false);
  const [audioDeviceValue, setAudioDeviceValue] = useState(null);
  const [audioDevicesItems, setAudioDevicesItems] = useState([]);

  const refreshSelectedDevice = useCallback(async () => {
    const devicesInUse = await callObject?.getInputDevices();
    if (devicesInUse?.camera && devicesInUse.camera.deviceId) {
      setCameraDeviceValue(devicesInUse.camera.deviceId);
    }
    if (devicesInUse?.speaker && devicesInUse.speaker.deviceId) {
      setAudioDeviceValue(devicesInUse.speaker.deviceId);
    }
  }, [callObject]);

  const updateAvailableDevices = useCallback(
    devices => {
      const inputDevices = devices
        ?.filter(device => device.kind === 'videoinput')
        .map(device => {
          return {
            value: device.deviceId,
            label: device.label,
            originalValue: device,
          };
        });
      setCameraDevicesItems(inputDevices || []);
      const outputDevices = devices
        ?.filter(device => device.kind === 'audiooutput')
        .map(device => {
          return {
            value: device.deviceId,
            label: device.label,
            originalValue: device,
          };
        });
      setAudioDevicesItems(outputDevices || []);
      refreshSelectedDevice();
    },
    [refreshSelectedDevice],
  );

  useEffect(() => {
    if (!callObject || meetingState !== 'joined-meeting') {
      return;
    }
    const loadDevicesInfo = async () => {
      const devicesAvailable = await callObject?.enumerateDevices();
      updateAvailableDevices(devicesAvailable?.devices);
    };
    loadDevicesInfo();
  }, [callObject, meetingState, updateAvailableDevices]);

  useEffect(() => {
    if (!callObject) {
      return;
    }

    const events = [
      'participant-joined',
      'participant-updated',
      'participant-left',
    ];

    const handleNewParticipantsState = event => {
      event && logDailyEvent(event);
      dispatch({
        type: PARTICIPANTS_CHANGE,
        participants: callObject.participants(),
      });
    };

    handleNewParticipantsState();

    for (const event of events) {
      callObject.on(event, handleNewParticipantsState);
    }

    return function cleanup() {
      for (const event of events) {
        callObject.off(event, handleNewParticipantsState);
      }
    };
  }, [callObject]);

  useEffect(() => {
    if (!callObject) {
      return;
    }

    function handleCameraErrorEvent(event) {
      logDailyEvent(event);
      dispatch({
        type: CAM_OR_MIC_ERROR,
        message:
          (event && event.errorMsg && event.errorMsg.errorMsg) || 'Unknown',
      });
    }

    callObject.on('camera-error', handleCameraErrorEvent);

    return function cleanup() {
      callObject.off('camera-error', handleCameraErrorEvent);
    };
  }, [callObject]);

  useEffect(() => {
    if (!callObject) {
      return;
    }

    function handleErrorEvent(event) {
      logDailyEvent(event);
      dispatch({
        type: FATAL_ERROR,
        message: (event && event.errorMsg) || 'Unknown',
      });
    }

    callObject.on('error', handleErrorEvent);

    return function cleanup() {
      callObject.off('error', handleErrorEvent);
    };
  }, [callObject]);

  useEffect(() => {
    if (!callObject) {
      return;
    }
    const handleDevicesUpdated = event => {
      updateAvailableDevices(event?.availableDevices);
    };
    callObject.on('available-devices-updated', handleDevicesUpdated);
    return function cleanup() {
      callObject.off('available-devices-updated', handleDevicesUpdated);
    };
  }, [callObject, updateAvailableDevices]);

  const flipCamera = useCallback(async () => {
    if (!callObject) {
      return;
    }
    const {device} = await callObject.cycleCamera();
    if (device) {
      setUsingFrontCamera(device.facingMode === 'user');
    }
  }, [callObject]);

  const sendHello = useCallback(
    participantId => {
      callObject && callObject.sendAppMessage({hello: 'world'}, participantId);
    },
    [callObject],
  );

  const [largeTiles, thumbnailTiles] = useMemo(() => {
    let larges = [];
    let thumbnails = [];
    Object.entries(callState.callItems).forEach(([id, callItem]) => {
      let tileType;
      if (isScreenShare(id)) {
        tileType = TileType.Full;
      } else if (isLocal(id) || containsScreenShare(callState.callItems)) {
        console.log('TyleType.Thmb not wqorking');
        tileType = TileType.Thumbnail;
      } else if (participantCount(callState.callItems) <= 3) {
        tileType = TileType.Full;
      } else {
        tileType = TileType.Half;
      }
      const tile = (
        <Tile
          key={id}
          videoTrackState={callItem.videoTrackState}
          audioTrackState={callItem.audioTrackState}
          mirror={usingFrontCamera && isLocal(id)}
          type={tileType}
          robotId={isLocal(id) ? 'robots-tile-local' : `robots-tile-${id}`}
          disableAudioIndicators={isScreenShare(id)}
          onPress={
            isLocal(id)
              ? flipCamera
              : () => {
                  sendHello(id);
                }
          }
        />
      );
      if (tileType === TileType.Thumbnail) {
        thumbnails.push(tile);
      } else {
        larges.push(tile);
      }
    });
    return [larges, thumbnails];
  }, [callState.callItems, flipCamera, sendHello, usingFrontCamera]);

  const message = getMessage(callState, props.roomUrl);
  const showCopyLinkButton = message && !message.isError;

  useEffect(() => {
    if (!audioDeviceValue) {
      return;
    }
    callObject?.setAudioDevice(audioDeviceValue).then(({deviceId}) => {
      console.log('Selected audio device => ', deviceId);
    });
  }, [callObject, audioDeviceValue]);

  useEffect(() => {
    if (!cameraDeviceValue) {
      return;
    }
    callObject?.setCamera(cameraDeviceValue);
  }, [callObject, cameraDeviceValue]);

  return (
    <>
      <View
        style={[
          styles.mainContainer,
          message ? styles.messageContainer : styles.largeTilesContainerOuter,
        ]}>
        {message ? (
          <>
            <CallMessage
              header={message.header}
              detail={message.detail}
              isError={message.isError}
            />
            {showCopyLinkButton && <CopyLinkButton roomUrl={props.roomUrl} />}
          </>
        ) : (
          <ScrollView
            alwaysBounceVertical={false}
            alwaysBounceHorizontal={false}
            horizontal={orientation === Orientation.Landscape}>
            <View
              style={[
                styles.largeTilesContainerInnerBase,
                orientation === Orientation.Portrait
                  ? styles.largeTilesContainerInnerPortrait
                  : styles.largeTilesContainerInnerLandscape,
              ]}>
              {largeTiles}
            </View>
          </ScrollView>
        )}
      </View>
      <View
        style={[
          styles.thumbnailContainerOuterBase,
          orientation === Orientation.Portrait
            ? styles.thumbnailContainerOuterPortrait
            : styles.thumbnailContainerOuterLandscape,
        ]}>
        <ScrollView
          horizontal={orientation === Orientation.Portrait}
          alwaysBounceHorizontal={false}
          alwaysBounceVertical={false}>
          <View
            style={
              orientation === Orientation.Portrait
                ? styles.thumbnailContainerInnerPortrait
                : styles.thumbnailContainerInnerLandscape
            }>
            {thumbnailTiles}
          </View>
        </ScrollView>
      </View>
      <View style={styles.devicesContainer}>
        <View style={styles.devicesContainerInnerElement}>
          <Text>Cameras</Text>
          <DropDownPicker
            open={cameraDevicesOpen}
            value={cameraDeviceValue}
            items={cameraDeviceItems}
            setOpen={setCameraDevicesOpen}
            setValue={setCameraDeviceValue}
            setItems={setCameraDevicesItems}
          />
        </View>
        <View style={styles.devicesContainerInnerElement}>
          <Text>Speakers</Text>
          <DropDownPicker
            open={audioDevicesOpen}
            value={audioDeviceValue}
            items={audioDevicesItems}
            setOpen={setAudioDevicesOpen}
            setValue={setAudioDeviceValue}
            setItems={setAudioDevicesItems}
          />
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    padding: 12,
  },
  thumbnailContainerOuterBase: {
    position: 'absolute',
    top: 0,
    left: 0,
  },
  thumbnailContainerOuterPortrait: {
    width: '100%',
    height: THUMBNAIL_EDGE_LENGTH,
    paddingTop: 12,
  },
  thumbnailContainerOuterLandscape: {
    height: '100%',
    width: THUMBNAIL_EDGE_LENGTH,
    paddingLeft: 12,
  },
  thumbnailContainerInnerPortrait: {
    marginLeft: 12,
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  thumbnailContainerInnerLandscape: {
    marginTop: 12,
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },
  messageContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 12,
  },
  largeTilesContainerOuter: {
    justifyContent: 'center',
  },
  largeTilesContainerInnerBase: {
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  largeTilesContainerInnerPortrait: {
    flexDirection: 'row',
    marginTop: THUMBNAIL_EDGE_LENGTH,
    marginBottom: TRAY_THICKNESS,
  },
  largeTilesContainerInnerLandscape: {
    flexDirection: 'column',
    marginLeft: THUMBNAIL_EDGE_LENGTH,
    marginRight: TRAY_THICKNESS,
  },
  devicesContainer: {
    position: 'absolute',
    flexDirection: 'row',
    bottom: 100,
  },
  devicesContainerInnerElement: {
    flex: 1,
    paddingHorizontal: 10,
  },
});

export default CallPanel;
