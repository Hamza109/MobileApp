import {Alert, Pressable, StyleSheet, Text, TextInput, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Picker} from '@react-native-picker/picker';
import { Select } from "native-base";
import {Color, FontFamily} from '../../config/GlobalStyles';
import { backendHost } from '../../components/apiConfig';
import { RESULTS } from '../../routes';
const FilterDoc = ({navigation}) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [data,setData]=useState([])
  const dropdownOptions = ['Select City', 'Option 2', 'Option 3', 'Option 4'];
  const [isPickerVisible, setIsPickerVisible] = useState(false);
  const togglePicker = () => {
    setIsPickerVisible(!isPickerVisible);
  };

const handleFilter=()=>{

  if(selectedOption !==  null)
{
  navigation.push(RESULTS,{
    city:selectedOption
  })
}
else{
  Alert.alert('Select city or Search Name')
}

}


useEffect(()=>{
  const fetchCity=async ()=>{
    try {
  const response=await fetch(`${backendHost}/article/all/table/city`)
  const  city = await response.json()

  setData(city)
    }
    catch(error){
      console.error('Error fetching data:', error);
    }
  }
fetchCity()
},[])


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
        <Select
                            
                                  width={'100%'}
                                  
                                  onValueChange={value => setSelectedOption(value)}
                                
                                  selectedValue={selectedOption}
                                  isRequired
                                  placeholder="Select city">
                                  {data.map(i => (
                                    <Select.Item
                                    key={Math.random().toString(36)}
                                      value={i[1]}
                                    
                                      label={i[1]}></Select.Item>
                                  ))}
                                </Select>
        </View>
    

        <Text style={styles.bigText}>By Name</Text>
        <Text style={styles.text}>Search</Text>

        <TextInput style={styles.textInput}>Practitoner Name</TextInput>

        <Pressable style={styles.buttonView} onPress={handleFilter}>
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
