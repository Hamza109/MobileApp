import React from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import theme from '../theme';
import { useOrientation,Orientation } from '../useOrientation';
import { robotID } from '../utils';
import {ScreenShareIcon} from '../Icons';

export const Props = {
  disabled: undefined,
  onPress: () => {},
  muted: undefined,
  robotId: undefined,
  text: '',
  type: 'mic', // or 'camera', 'leave', 'screenShare'
};
export default function TrayButton({
  disabled = false,
  onPress,
  muted = false,
  robotId = 'robots-leave-button',
  text,
  type,
}) {
  const orientation = useOrientation();
  const isLeaveButton = type === 'leave';
  const isScreenShareButton = type === 'screenShare';
  const iconStyle = [
    styles.iconBase,
    orientation === Orientation.Portrait
      ? styles.iconPortrait
      : styles.iconLandscape,
    disabled && styles.disabled,
    isLeaveButton && styles.iconLeave,
  ];

  if (!isLeaveButton) {
    robotId = `robots-btn-${type.slice(0, 3)}-${muted ? 'mute' : 'unmute'}`;
  }

  const getSource = () => {
    switch (type) {
      case 'camera':
        return muted
          ? require('../../../assets/img/cameraon.png')
          : require('../../../assets/img/camera.png');
      case 'mic':
        return muted
          ? require('../../../assets/img/micon.png')
          : require('../../../assets/img/mic.png');
      case 'leave':
        return require('../../../assets/img/leaveCall.png');
      default:
        return null; // Handle other cases or return a default value as needed
    }
  };

  const getButtonIcon = () => {
    if (isScreenShareButton) {
      return (
        <ScreenShareIcon style={iconStyle} fill={muted ? 'red' : 'black'} />
      );
    }
    const source = getSource(); // TODO: convert in the future everything to SVG
    const imageIcon = <Image style={iconStyle} source={source} />;
    return imageIcon;
  };

  return (
    <TouchableWithoutFeedback onPress={onPress} disabled={disabled}>
      <View style={styles.controlContainer}>
        {getButtonIcon()}
        <Text
          style={[
            styles.controlText,
            (muted || isLeaveButton) && styles.offText,
          ]}>
          {text}
        </Text>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  iconBase: {
    height: 32,
    width: 32,
    backgroundColor: theme.colors.greyLight,
  },
  iconPortrait: {
    marginHorizontal: 16,
  },
  iconLandscape: {
    marginTop: 16,
  },
  iconLeave: {
    height: 28,
    width: 36,
  },
  disabled: {
    opacity: 0.6,
  },
  controlContainer: {
    alignItems: 'center',
  },
  controlText: {
    fontWeight: '500',
    paddingTop: 4,
    color: theme.colors.blueDark,
  },
  offText: {
    color: theme.colors.red,
  },
});
