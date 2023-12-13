import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import {FontFamily, Color} from '../../config/GlobalStyles';
import Back from '../../assets/img/BACK.svg';
import {useNavigation, CommonActions} from '@react-navigation/native';
import {Platform} from 'react-native';
const CustomHeader = ({title}) => {
  const navigation = useNavigation();

  const handleBack = () => {
    navigation.dispatch(CommonActions.goBack());
  };
  return (
    <View>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack} style={{padding: 5}}>
          <Back />
        </TouchableOpacity>

        <View style={styles.text}>
          <Text style={styles.headerText}></Text>
        </View>
      </View>
      <View style={styles.divider}></View>
    </View>
  );
};

export default CustomHeader;

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#fff',
    width: '100%',
    height: 38,
    paddingHorizontal: 17,
    marginVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    padding: 5,

    flex: 1,
  },
  headerText: {
    textAlign: Platform.OS === 'ios' ? 'center' : 'left',
    fontSize: 18,
    fontFamily: FontFamily.poppinsBold,
    color: Color.colorDarkslategray,
    marginLeft: 10,
  },
  divider: {
    borderWidth: 0.2,
    borderColor: Color.colorGainsboro,
  },
});
