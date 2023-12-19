import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  TouchableOpacity,
  Button,
  SafeAreaView,
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
const Doctor = ({navigation}) => {
  //
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [featuredDoctors, setFeaturedDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${backendHost}/SearchActionController?cmd=getResults&FeaturedDoctors`,
        );
        const data = await response.json();

        setFeaturedDoctors(data.map.DoctorDetails.myArrayList);

      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
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
        </View>
        <Pressable style ={{alignItems:'center'}} onPress={()=>navigation.navigate(FILTER_DOC)}>
          <FilterList width={26} height={26} style={{marginTop: 5}} />
        </Pressable>

        <FlashList
          estimatedItemSize={100}
          data={featuredDoctors}
          renderItem={renderItem}
        />

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
    height: 80,
    width: width,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
  },
  read: {
    color: Color.colorDarkslategray,
    fontWeight: '700',
    fontSize: 25,
  },
});

export default Doctor;
