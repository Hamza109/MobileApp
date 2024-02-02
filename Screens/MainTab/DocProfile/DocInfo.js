import React, {useEffect} from 'react';
import {View, ScrollView, Text, StyleSheet} from 'react-native';
import {VStack} from 'native-base';
import axios from 'axios';
import {backendHost} from '../../../components/apiConfig';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useSelector, useStore, useDispatch} from 'react-redux';
import {fetchRequest, fetchSuccess, fetchFailure} from '../../Redux/Action';
const DocInfo = () => {
  const doc = useSelector(state => state.info.data);
  const dispatch = useDispatch();
  const store = useStore();

  return (
    <View style={styles.container}>
      <ScrollView
        scrollEnabled={true}
        style={{width: wp('100%'), height: hp('100%')}}>
        {
          <VStack ml="2" space={1}>
            <View style={{display: doc.about == '' ? 'none' : 'flex'}}>
              <Text style={styles.dbodyHead}>About</Text>
              <Text style={styles.dbodyText}>{doc.about}</Text>
            </View>

            <View style={{display: doc.eduTraining ==  null ? 'none' : 'flex'}}>
              <Text style={styles.dbodyHead}>Education</Text>
              <Text style={styles.dbodyText}>{doc.eduTraining}</Text>
            </View>

            <View style={{display: doc.primarySpecialization == 0 ? 'none' : 'flex'}}>
              <Text style={styles.dbodyHead}>Specialities</Text>

              <Text style={styles.dbodyText}>{doc.primary_spl}</Text>
            </View>
          </VStack>
        }
      </ScrollView>
    </View>
  );
};

export default DocInfo;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
    paddingVertical: 5,
  },

  dbodyHead: {
    color: '#00415e',
    fontFamily: 'Raleway-Bold',
    fontSize: 12,
  },
  dbodyText: {
    color: '#00415e',
    fontFamily: 'Raleway-Medium',
    fontSize: wp('3.5%'),
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: '100%',
    height: '100%',
    alignItems: 'center',
    marginLeft: 10,
  },
});
