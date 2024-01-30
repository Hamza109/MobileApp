import React from 'react';
import {StyleSheet, View, Text, Image} from 'react-native';

/**
 * @typedef {Object} Props
 * @property {string} header - The header text.
 * @property {string|null} [detail] - Optional detail text, can be null.
 * @property {boolean} isError - Indicates if it's an error.
 */

export default function CallMessage(props) {
  return (
    <View style={[styles.container, props.isError && styles.errorContainer]}>
      <View style={styles.textRow}>
        {props.isError && (
          <Image source={require('../../../assets/img/error.png')} />
        )}
        <Text
          style={[
            styles.text,
            styles.headerText,
            props.isError ? styles.errorText : {},
          ]}>
          {props.header}
        </Text>
      </View>
      {props.detail && <Text style={styles.text}>{props.detail}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  errorContainer: {},
  text: {
    textAlign: 'center',
  },
  headerText: {
    fontWeight: 'bold',
  },
  textRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  errorText: {
    marginLeft: 8,
  },
});
