import React from 'react';
import {StyleSheet, View} from 'react-native';
import Button from '../Button/Button';

const StartButton = ({onPress, starting}) => {
  return (
    <View style={styles.container}>
      <Button
        onPress={onPress}
        label={starting ? 'Joining...' : 'Join call'}
        robotId={'robots-start-call'}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 16,
  },
});

export default StartButton;
