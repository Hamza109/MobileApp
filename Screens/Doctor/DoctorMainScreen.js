import {
  View,
  Text,
  Alert,
  Pressable,
  ImageBackground,
  Image,
  ScrollView,
  StyleSheet,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {backendHost} from '../../components/apiConfig';
import axios from 'axios';
import {docData} from '../../Redux/Slice/DoctorDetailSlice';
import {useDispatch, useSelector} from 'react-redux';
import {FontFamily, Color,width} from '../../config/GlobalStyles';
import ContentLoader from '../../components/ContentLoader';
import ScheduleButton from '../../components/ScheduleButton';
const DoctorMainScreen = ({route}) => {
  const doc = useSelector(state => state.docData.doc);
  const dispatch = useDispatch();
  const id = route.params.ids;
  const [isLoaded, setIsLoaded] = useState(true);
  const [item, setItem] = useState();
  const [exist, setExist] = useState(false);
  const [url, setUrl] = useState(
    `http://all-cures.com:8080/cures_articleimages/doctors/${id}.png`,
  );

  const checkIfImage = async imageUrl => {
    try {
      const res = await fetch(imageUrl, {method: 'HEAD', mode: 'no-cors'});

      if (res.ok) {
        setExist(true);
      } else {
        setExist(false);
      }
    } catch (error) {
      console.error(error);
      // Handle the error if needed
    }
  };
  useEffect(() => {
    console.log('running');
    getDoc();
    checkIfImage(url);
  }, []);

  async function getDoc() {
    try {
      setIsLoaded(false);

      const response = await fetch(
        `${backendHost}/DoctorsActionController?rowno=${id}&cmd=getProfile`,
      );

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const json = await response.json();

      setItem(json);
      console.log(json);
    } catch (error) {
      if (error.name === 'AbortError') {
        console.log('Request aborted');
      } else {
        console.error('An error occurred:', error);
        // Handle errors, e.g., show an error message to the user
      }
    } finally {
      setIsLoaded(true);
    }
  }
  return (
    <>
      {isLoaded ? (
        <ScrollView style={{backgroundColor: '#fff', paddingHorizontal: 26}}>
          <View style={{backgroundColor: '#fff'}}>
            <Image
              source={{
                uri: url,
              }}
              style={{
                width: 372,
                height: 372,
                overflow: 'hidden',
                borderRadius: 5,
                padding: 10,
                marginVertical: 10,

                alignSelf: 'center',
              }}
            />
          </View>
          <View style={{justifyContent: 'space-between'}}>
            <View style={[styles.positions,{flexDirection:"column"}]}>
              <Text style={styles.mainTextTitle}>Name</Text>
              <Text style={styles.mainText}>
                {' '}
                Dr.{item?.docname_first} {item?.docname_last}
              </Text>
            </View>
            <View
              style={styles.positions}>
              <View>
                <Text style={styles.mainTextTitle}>Specialization</Text>
                <Text style={styles.mainText}>{item?.primary_spl}</Text> 
              </View>
              
              <View>
                <Text style={styles.mainTextTitle}>Positions</Text>
                <Text style={styles.mainText}>Add </Text> 
              </View>
            </View>
            <View style={styles.positions}>
              <View>
                <Text style={styles.mainTextTitle}>Organisation</Text>
                <Text style={styles.mainText}>{item?.hospital_affliated}</Text>
              </View>
              <View>
                <Text style={styles.mainTextTitle}>Location</Text>
                <Text style={styles.mainText}>{item?.country_code}</Text>
              </View>
            </View>
            <View style={[styles.positions, {flexDirection: 'column'}]}>
              <Text style={styles.mainTextTitle}>Bio</Text>

              <Text style={[styles.mainText,{maxWidth:width}]}>{item?.about}</Text>
            </View>
          </View>
          <ScheduleButton/>
        </ScrollView>
      ) : (
        <ContentLoader />
      )}
    </>
  );
};

export default DoctorMainScreen;
const styles = StyleSheet.create({
  positions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  mainTextTitle: {
    fontSize: 10,
    fontFamily: FontFamily.poppinsRegular,
    color: Color.colorDarkgray,
    alignSelf:'flex-start'
  },
  mainText: {
    fontSize: 15,
    fontFamily: FontFamily.poppinsRegular,
    color: Color.colorDarkslategray,
    marginTop:5,
    maxWidth:width/2
  },
});
