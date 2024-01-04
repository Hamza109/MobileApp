import {StyleSheet, Text, View, TouchableOpacity, Share} from 'react-native';
import React from 'react';
import {FontFamily, Color} from '../../config/GlobalStyles';
import Back from '../../assets/img/BACK.svg';
import ShareButt from '../../assets/img/share.svg';
import Heart from '../../assets/img/heart.svg';
import {useNavigation, CommonActions} from '@react-navigation/native';
import {Platform} from 'react-native';
import Line from '../../assets/img/Line.svg';
const CustomHeader = ({title, id}) => {
  const navigation = useNavigation();

  const handleBack = () => {
    navigation.dispatch(CommonActions.goBack());
  };

  const onShare = async () => {
    try {
      const result = await Share.share({
        message: `https://all-cures.com/cure/${id}-${title}`,
      });

      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };
  return (
    <>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={handleBack}
          style={{padding: 5, alignItems: 'center', justifyContent: 'center'}}>
          <Back />
        </TouchableOpacity>

        <View
          style={{
            flexDirection: 'row',
            width: 50,
            justifyContent: 'space-evenly',
            alignItems: 'center',
          }}>
          <TouchableOpacity style={{}}>
            <Heart width={'11.74'} height={'15'} />
          </TouchableOpacity>
          <TouchableOpacity>
            <Line width={'11.74'} height={'15'} />
          </TouchableOpacity>
          <TouchableOpacity onPress={onShare} style={{}}>
            <ShareButt width={'11.74'} height={'15'} />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.divider}></View>
    </>
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
    justifyContent: 'space-between',
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
