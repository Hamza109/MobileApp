import React, {useState} from 'react';
import {View, TextInput, StyleSheet, Text, size} from 'react-native';
import {Input, FormControl} from 'native-base';
const InputBox = ({
  label,
  placeholder,
  size,
  keyboard,
  value,
  onChangeText,
  defaultValue,
  color,
  border,
}) => {
  const [text, setText] = useState();
  return (
    <View style={styles.container}>
      <FormControl mb="2">
        <FormControl.Label _text={{color: '#00415e'}} ml="1">
          {label}
        </FormControl.Label>
        <Input
          rounded={size}
          defaultValue={defaultValue}
          placeholder={placeholder}
          _focus={{borderColor: '#fff', borderWidth: border}}
          keyboardType={keyboard}
          value={value}
          onChangeText={onChangeText}
        />
      </FormControl>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    height: 40,
    width: '100%',
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 20,
    padding: 10,
    margin: 10,
  },
});

export default InputBox;
