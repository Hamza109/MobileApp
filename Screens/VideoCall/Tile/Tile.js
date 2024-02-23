import React, {useMemo} from 'react';
import {Text, View, StyleSheet, TouchableHighlight, Image} from 'react-native';
import {DailyMediaView} from '@daily-co/react-native-daily-js';
import { useOrientation,Orientation } from '../useOrientation';
import {robotID} from '../utils';
// TileType values as constants
export const TileType = {
  Thumbnail: 'Thumbnail',
  Half: 'Half',
  Full: 'Full',
};
/**
 * @typedef {Object} Props
 * @property {DailyTrackState|null} videoTrackState - State of the video track.
 * @property {DailyTrackState|null} audioTrackState - State of the audio track.
 * @property {boolean} mirror - Whether to mirror the video.
 * @property {TileType} type - The type of tile.
 * @property {boolean} disableAudioIndicators - Whether to disable audio indicators.
 * @property {Function} [onPress] - Optional function to call on press.
 * @property {string} [robotId] - Optional robot ID for automated testing.
 */

function getTrackUnavailableMessage(kind, trackState) {
  if (!trackState) return;
  switch (trackState.state) {
    case 'blocked':
      if (trackState.blocked?.byPermissions) {
        return `${kind} permission denied`;
      } else if (trackState.blocked?.byDeviceMissing) {
        return `${kind} device missing`;
      }
      return `${kind} blocked`;
    case 'off':
      if (trackState.off?.byUser) {
        return `${kind} muted`;
      } else if (trackState.off?.byBandwidth) {
        return `${kind} muted to save bandwidth`;
      }
      return `${kind} off`;
    case 'sendable':
      return `${kind} not subscribed`;
    case 'loading':
      return `${kind} loading...`;
    case 'interrupted':
      return `${kind} interrupted`;
    case 'playable':
      return;
  }
}

export default function Tile(props) {
  const orientation = useOrientation();
  const videoTrack = useMemo(() => {
    return props.videoTrackState && props.videoTrackState.state === 'playable'
      ? props.videoTrackState.track
      : null;
  }, [props.videoTrackState]);

  const audioTrack = useMemo(() => {
    return props.audioTrackState && props.audioTrackState.state === 'playable'
      ? props.audioTrackState.track
      : null;
  }, [props.audioTrackState]);

  const videoUnavailableMessage = useMemo(() => {
    return getTrackUnavailableMessage('video', props.videoTrackState);
  }, [props.videoTrackState]);

  const audioUnavailableMessage = useMemo(() => {
    return getTrackUnavailableMessage('audio', props.audioTrackState);
  }, [props.audioTrackState]);
  const mediaComponent = useMemo(() => {
    return (
      <DailyMediaView
        videoTrack={videoTrack}
        audioTrack={audioTrack}
        mirror={props.mirror}
        // Assumption: thumbnails should appear layered on top of other tiles
        zOrder={props.type === TileType.Thumbnail ? 1 : 0}
        style={styles.media}
        objectFit="cover"
      />
    );
  }, [videoTrack, audioTrack, props.mirror, props.type]);
  const touchableMediaComponent = useMemo(() => {
    return (
      <TouchableHighlight
        onPress={props.onPress}
        disabled={!props.onPress}
        style={styles.media}>
        {mediaComponent}
      </TouchableHighlight>
    );
  }, [props.onPress, mediaComponent]);
  const muteOverlayComponent = useMemo(() => {
    // Show mute overlay when at least one track is muted by the sender
    const videoMuted = !!props.videoTrackState?.off?.byUser;
    const audioMuted = !!props.audioTrackState?.off?.byUser;
    return videoMuted || (audioMuted && !props.disableAudioIndicators) ? (
      <View style={styles.iconContainer}>
        {videoMuted && (
          <Image
            style={styles.icon}
            source={require('../../../assets/img/camera-off.png')}
          />
        )}
        {audioMuted && (
          <Image
            style={styles.icon}
            source={require('../../../assets/img/mic-off.png')}
          />
        )}
      </View>
    ) : null;
  }, [
    props.videoTrackState,
    props.audioTrackState,
    props.disableAudioIndicators,
  ]);
  const messageOverlayComponent = useMemo(() => {
    // Show message overlay when video track is unavailable, and when the mute
    // overlay is *not* shown (to avoid clash/clutter). Audio may be unavailable
    // too.
    const muteOverlayShown =
      !!props.videoTrackState?.off?.byUser ||
      (!!props.audioTrackState?.off?.byUser && !props.disableAudioIndicators);
    if (videoUnavailableMessage && !muteOverlayShown) {
      return (
        <>
          <Text style={styles.overlayMessage}>{videoUnavailableMessage}</Text>
          {audioUnavailableMessage && !props.disableAudioIndicators && (
            <Text style={styles.overlayMessage}>{audioUnavailableMessage}</Text>
          )}
        </>
      );
    }
  }, [
    videoUnavailableMessage,
    audioUnavailableMessage,
    props.videoTrackState,
    props.audioTrackState,
    props.disableAudioIndicators,
  ]);
  const cornerMessageComponent = useMemo(() => {
    // Show corner message when only audio is unavailable, and when the mute
    // overlay is *not* shown (to avoid clash/clutter).
    const muteOverlayShown =
      !!props.videoTrackState?.off?.byUser ||
      (!!props.audioTrackState?.off?.byUser && !props.disableAudioIndicators);
    return (
      audioUnavailableMessage &&
      !props.disableAudioIndicators &&
      !videoUnavailableMessage &&
      !muteOverlayShown && (
        <Text style={styles.cornerMessage}>{audioUnavailableMessage}</Text>
      )
    );
  }, [
    videoUnavailableMessage,
    audioUnavailableMessage,
    props.videoTrackState,
    props.audioTrackState,
    props.disableAudioIndicators,
  ]);
  let typeSpecificStyle = null;
  switch (props.type) {
    case TileType.Half:
      typeSpecificStyle =
        orientation === Orientation.Portrait
          ? styles.containerHalfPortrait
          : styles.containerHalfLandscape;
      break;
    case TileType.Full:
      typeSpecificStyle =
        orientation === Orientation.Portrait
          ? styles.containerFullPortrait
          : styles.containerFullLandscape;
      break;
  }

  return (
    // The JSX part remains the same as in your original TypeScript code.
    <View
      style={[
        styles.container,
        styles.containerLoadingOrNotShowingVideo,
        typeSpecificStyle,
      ]}
      {...robotID(props.robotId)}>
      {touchableMediaComponent}
      {messageOverlayComponent}
      {cornerMessageComponent}
      {muteOverlayComponent}
    </View>
  );
}

// StyleSheet definition remains the same as in your TypeScript code.
const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'center',
    overflow: 'hidden',
    aspectRatio: 1,
  },
  containerHalfPortrait: {
    width: '50%',
  },
  containerHalfLandscape: {
    height: '50%',
  },
  containerFullPortrait: {
    width: '100%',
  },
  containerFullLandscape: {
    height: '100%',
  },
  media: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  overlayMessage: {
    justifyContent: 'flex-end',
    alignItems: 'stretch',
  },
  cornerMessage: {
    position: 'absolute',
    bottom: 0,
    left: 0,

    padding: 12,
  },
  iconContainer: {
    flexDirection: 'row',
  },
  icon: {
    marginHorizontal: 4,
    marginBottom: 16,
  },
});
