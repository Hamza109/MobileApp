import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  TouchableOpacity,
  Button,
  SafeAreaView,
  ScrollView
} from 'react-native';
import {width, height, FontFamily, Color} from '../../config/GlobalStyles';
import NotificationIcon from '../../assets/img/Notification.svg';
import Daily from '@daily-co/react-native-daily-js';
import RazorpayCheckout from 'react-native-razorpay';
import DateTimePicker from '@react-native-community/datetimepicker';
import {FlashList} from '@shopify/flash-list';
import DoctorsCard from '../../components/DoctorsCard';
import {backendHost} from '../../components/apiConfig';
import FilterList from '../../assets/img/filter_list.svg';
import { FILTER_DOC } from '../../routes';
import {DOCTOR_MAIN_SCREEN} from '../../routes';
import System from '../Category/System';
import ContentLoader from '../../components/ContentLoader';
const Doctor = ({navigation}) => {
  //
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [featuredDoctors, setFeaturedDoctors] = useState([]);
  const [Loaded, setLoaded] = useState(false);
  const [error, setError] = useState(null);
  const [speciality,setSpeciality]=useState([])
  const [medicineId, setMedicineId] = useState(null);

  const selectItem = item => {
    setMedicineId(item.med_type);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const promises = [ fetch(
          `${backendHost}/SearchActionController?cmd=getResults&FeaturedDoctors`,
        ),
        fetch(`${backendHost}/data/medicines`)
      
      ]
      const [response1, response2] = await Promise.all(promises);

      const data1 = await response1.json();
      const data2 = await response2.json();

        setFeaturedDoctors(data1.map.DoctorDetails.myArrayList);
        setSpeciality(data2)

      } catch (error) {
        setError(error);
      } finally {
        setLoaded(true);
      }
    };

    fetchData();
  }, []);
  // const onChange = (event, selectedDate) => {
  //   const currentDate = selectedDate;
  //   setShow(false);
  //   setDate(currentDate);
  // };

  // const showMode = currentMode => {
  //   setShow(true);
  //   setMode(currentMode);
  // };

  // const showDatepicker = () => {
  //   showMode('date');
  // };

  // const showTimepicker = () => {
  //   showMode('time');
  // };

  // const handlePayment = () => {
  //   var options = {
  //     description: 'Credits towards consultation',
  //     image: 'https://i.imgur.com/3g7nmJC.png',
  //     currency: 'INR',
  //     key: RAZOR_PAY_KEY_ID, // Your api key
  //     amount: '5000',
  //     name: 'foo',
  //     prefill: {
  //       email: 'void@razorpay.com',
  //       contact: '9191919191',
  //       name: 'Razorpay Software',
  //     },
  //     theme: {color: Color.appDefaultColor},
  //   };
  //   RazorpayCheckout.open(options)
  //     .then(data => {
  //       // handle success
  //       alert(`Success: ${data.razorpay_payment_id}`);
  //     })
  //     .catch(error => {
  //       // handle failure
  //       alert(`Error: ${error.code} | ${error.description}`);
  //     });
  // };
  const renderItem = ({item}) => {
    let imageLoc = '';
    const imgLocation = item.content_location;
    if (imgLocation && imgLocation.includes('cures_articleimages')) {
      imageLoc =
        `https://all-cures.com:444/` +
        imgLocation.replace('json', 'png').split('/webapps/')[1];
    } else {
      imageLoc =
        'https://all-cures.com:444/cures_articleimages//299/default.png';
    }

    return (
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() =>
          navigation.navigate(DOCTOR_MAIN_SCREEN, {
            ids: item.map.rowno,
            firstName: item.map.docname_first,
            secondName: item.map.docname_last,
          })
        }>
        <DoctorsCard
          training={item.map.edu_training}
          firstName={item.map.docname_first}
          secondName={item.map.docname_last}
          rowno={item.map.rowno}
          primarySpl={item.map.primary_spl}
        />
      </TouchableOpacity>
    );
  };

  return (
    <>
      <SafeAreaView style={styles.feedContainer}>
        <View style={styles.feedHeader}>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: 36,
              marginLeft: 5,
            }}>
            <Text style={styles.read}>Practitioners</Text>
            <NotificationIcon width={16} height={18} style={{marginTop: 5}} />
          </View>
          <View style={{flexDirection:'row'}}>
        {
            <ScrollView
            horizontal
            style={{padding: 5, flex: 1, marginTop: 20}}
            showsHorizontalScrollIndicator={false}>
            <View style={{paddingRight: 11}}>
              <TouchableOpacity
                style={
                  Platform.OS === 'ios'
                    ? medicineId === null
                      ? styles.activeLabel
                      : styles.inactiveLabel
                    : null
                }
                onPress={()=>{}}>
                <Text
                  style={[
                    styles.featured,
                    medicineId === null
                      ? styles.activeLabel
                      : styles.inactiveLabel,
                  ]}
                  >
                  Featured
                </Text>
              </TouchableOpacity>
            </View>
  
            {speciality.map((item, index) => {
              return (
                <View key={item.dc_id} style={{paddingHorizontal: 11}}>
                  <TouchableOpacity
                    style={
                      Platform.OS === 'ios'
                        ? item.med_type === medicineId
                          ? styles.activeLabel
                          : styles.inactiveLabel
                        : null
                    }
                    onPress={() => {
                      selectItem(item);
                    }}>
                    <Text
                      style={[
                        styles.category,
                        item.med_type === medicineId
                          ? styles.activeLabel
                          : styles.inactiveLabel,
                      ]}
                      >
                      {item.med_type}
                    </Text>
                  </TouchableOpacity>
                </View>
              );
            })}
          </ScrollView>
        }
        <View style={{borderLeftWidth:1}}>
        <Pressable style={{justifyContent:'center',marginLeft:10,alignItems:'center'}} onPress={()=>navigation.navigate(FILTER_DOC)}>
          <FilterList width={24} height={24} style={{marginTop: 5}} />
        </Pressable>
        </View>
        </View>

        </View>
       
        {Loaded ? (
        <FlashList
        estimatedItemSize={100}
        data={featuredDoctors}
        renderItem={renderItem}
      />
      ) : (
        <ContentLoader/>
      )}

      

        {/* <Text style={{color: '#000', fontSize: 40}}>Doc</Text>
        <TouchableOpacity
          style={{
            width: 120,
            height: 50,
            backgroundColor: 'aliceblue',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 5,
            padding: 10,
            marginTop: 30,
          }}>
          <Text>Start Video call</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handlePayment}>
          <Text> Submit PAyment</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={showDatepicker}
          style={{
            width: 120,
            height: 50,
            backgroundColor: 'aliceblue',
            borderRadius: 5,
            padding: 4,
            margin: 15,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text> Pick Date</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={showTimepicker}
          style={{
            width: 120,
            height: 50,
            backgroundColor: 'aliceblue',
            borderRadius: 5,
            padding: 4,
            margin: 15,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text> Select Time</Text>
        </TouchableOpacity>
        <Text>selected: {date.toLocaleString()}</Text>
        {show && (
          <DateTimePicker
            testID="dateTimePicker"
            value={date}
            mode={mode}
            is24Hour={true}
            onChange={onChange}
          />
        )}  */}
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  feedContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  feedHeader: {
    height: 132,
    width: width,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
  },
  read: {
    color: Color.colorDarkslategray,
    fontWeight: '700',
    fontSize: 25,
  },

  read: {
    color: Color.colorDarkslategray,
    fontWeight: '700',
    fontSize: 25,
  },
  category: {
    fontFamily: FontFamily.poppinsRegular,
    fontWeight: '700',
    fontSize: 10,
    width: 'auto',
  },

  featured: {
    fontFamily: FontFamily.poppinsBold,
    color: Color.colorSilver,
    fontSize: 10,
  },

  activeLabel: {
    color: Color.colorDarkslategray,
    borderBottomWidth: 2,
    borderColor: '#5E4DB0',
  },

  inactiveLabel: {
    color: Color.colorSilver,
  },
});

export default Doctor;
