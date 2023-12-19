import {Pressable, StyleSheet, Text, TextInput, View} from 'react-native';
import React, {useState} from 'react';
import {Picker} from '@react-native-picker/picker';
import {Color, FontFamily} from '../../config/GlobalStyles';
const FilterDoc = () => {
  const [selectedOption, setSelectedOption] = useState('Option 1');
  const dropdownOptions = ['Select City', 'Option 2', 'Option 3', 'Option 4'];
  const [isPickerVisible, setIsPickerVisible] = useState(false);
  const togglePicker = () => {
    setIsPickerVisible(!isPickerVisible);
  };

  return (
    <View style={styles.containers}>
      <View
        style={{
          marginHorizontal: 26,
          flex: 1 / 1.6,
          justifyContent: 'space-evenly',
        }}>
        <Text style={styles.text}>Search</Text>
        <View style={styles.pickerView}>
          <Picker
            selectedValue={selectedOption}
            onValueChange={(itemValue, itemIndex) => {
              setSelectedOption(itemValue);
              togglePicker(); // Close the picker after selecting an option
            }}
            style={styles.picker}>
            {dropdownOptions.map((option, index) => (
              <Picker.Item key={index} label={option} value={option} />
            ))}
          </Picker>
        </View>
    

        <Text style={styles.bigText}>By Name</Text>
        <Text style={styles.text}>Search</Text>

        <TextInput style={styles.textInput}>Practitoner Name</TextInput>

        <Pressable style={styles.buttonView}>
          <Text style={styles.buttonText}>FILTER</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default FilterDoc;

const styles = StyleSheet.create({
  containers: {
    flex: 1,
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 13,
    fontFamily: FontFamily.poppinsRegular,
    fontWeight: '500',
    color: Color.colorDarkslategray,
    lineHeight: 19.5,
  },
  pickerView: {
    borderWidth: 1,
    borderRadius: 5,
    borderColor: Color.colorGrayNormal,
  },
  picker: {
    padding: 8,
    color: Color.colorGrayLight,
  },
  bigText: {
    fontSize: 18,
    lineHeight: 27,
    fontWeight: '500',
    fontFamily: FontFamily.poppinsRegular,

    color: Color.colorDarkslategray,
  },
  textInput: {
    borderBottomWidth: 1,
    borderColor: Color.colorGrayLight,
    color: Color.colorGrayLight,
  },
  buttonView: {
    justifyContent: 'center',
    alignSelf: 'center',
    backgroundColor: Color.appDefaultColor,
    padding: 5,
    borderRadius: 8,
    height: 38,
    width: 92,
  },
  buttonText: {
    padding: 5,
    textAlign: 'center',
    color: '#fff',
    fontSize: 14,
    letterSpacing: 0.4,
    fontWeight: '500',
    fontFamily: FontFamily.poppinsRegular,
  },
});
