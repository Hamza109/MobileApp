import React, {useState, useEffect} from 'react';
import {Dimensions, ImageBackground} from 'react-native';
import {Button} from 'react-native-paper';
import {
  View,
  ScrollView,
  Text,
  FlatList,
  StyleSheet,
  StatusBar,
  BackHandler,
  Alert,
  TouchableOpacity,
  TouchableHighlight,
  Image,
} from 'react-native';
import ArticleHeader from '../search/ArticleHeader';
import {useRef} from 'react';
import {useIsFocused, useNavigation, useTheme} from '@react-navigation/native';
import axios from 'axios';
import Autocomplete from '../MainTab/Autocomplete';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Svg, {Path, Circle} from 'react-native-svg';
import {Card} from 'react-native-paper';
import AllPost from '../search/AllPost';
import Icon from 'react-native-vector-icons/FontAwesome';

import {
  HStack,
  Stack,
  Center,
  Heading,
  NativeBaseProvider,
  Container,
  Box,
  Spinner,
  VStack,
} from 'native-base';
import {backendHost} from '../../components/apiConfig';
import LottieView from 'lottie-react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Carousel from 'react-native-snap-carousel';
import {set} from 'react-native-reanimated';
import RazorpayCheckout from 'react-native-razorpay';
import {responsiveFontSize} from 'react-native-responsive-dimensions';

const SubPlan = ({route}) => {
  const navigation = useNavigation();
  const ids = route.params.ids;
  const [titleId, setTitleId] = useState(ids);
  const [regId, setRegId] = useState([]);
  const [subId, setSubId] = useState(4);
  const [subId1, setSubId1] = useState();
  const [subId2, setSubId2] = useState();
  const [subId3, setSubId3] = useState();
  const [loading, setLoading] = useState(false);
  const [priceId, setPriceId] = useState(49);
  const [priceId1, setPriceId1] = useState();
  const [priceId2, setPriceId2] = useState();
  const [priceId3, setPriceId3] = useState();
  const [subDetails1, setSubDetails1] = useState();
  const [subDetails2, setSubDetails2] = useState();
  const [subDetails3, setSubDetails3] = useState();
  const [details1, setDetails1] = useState();
  const [details2, setDetails2] = useState();
  const [details3, setDetails3] = useState();
  const [items, setItems] = useState();
  const [status, setStatus] = useState(0);

  const [isLoaded, setIsLoaded] = useState(false);
  function sub() {
    axios
      .get(`${backendHost}/subscription/get`)

      .then(res => {
        console.log(res.data);

        setSubId1(res.data[0].subscription_id);
        setSubId2(res.data[1].subscription_id);
        setSubId3(res.data[2].subscription_id);
        setPriceId1(res.data[0].price_id);
        setPriceId2(res.data[1].price_id);
        setPriceId3(res.data[2].price_id);
        setDetails1(res.data[0].detailing);
        setDetails2(res.data[1].detailing);
        setDetails3(res.data[2].detailing);
        setSubDetails1(res.data[0].subscription_details);
        setSubDetails2(res.data[1].subscription_details);
        setSubDetails3(res.data[2].subscription_details);
        setIsLoaded(true);
      });

    try {
      AsyncStorage.getItem('author').then(value1 => {
        if (value1 != null) {
          console.log('helloi', value1);
          setRegId(value1);
        } else {
          setRegId(0);
        }
      });
    } catch (error) {}
  }
  function postAmount() {
    setLoading(true);
    try {
      AsyncStorage.getItem('author').then(value1 => {
        if (value1 != null) {
          setRegId(value1);
          axios
          .post(`${backendHost}/subscription/create_order`, {
            amount: `${priceId}`,
          })
          .then(res => {
            if (res.data) {
              console.log('orderID', JSON.parse(res.data).id);
    
              postData(
                JSON.parse(res.data).amount,
                JSON.parse(res.data).id,
                JSON.parse(res.data).status,
              );
              postsub(
                JSON.parse(res.data).amount,
                JSON.parse(res.data).currency,
                JSON.parse(res.data).id,
              );
    
              setLoading(false);
            }
          })
          .catch(err => {
            setLoading(false);
            Alert.alert('Something went wrong', 'Please try again.');
          });
        } else {
          setRegId(0);
          navigation.navigate('SignIn');
        }
      });
    } catch (error) {}
   
  }
  function postUpdate(paymentId, orderID) {
    axios
      .put(`${backendHost}/subscription/updatepayment/"${orderID}"`, {
        payment_id: paymentId,
        status: 1,
        razorpay_status: 'paid',
      })
      .then(res => {
        if (res.data === 1) {
          Alert.alert('Subscription', 'Payment Successful.', [
            {
              text: 'Ok',
              onPress: () => {
                navigation.push(`Disease`, {ids: `${titleId}`});
              },
            },
          ]);
        }
      })
      .catch(err => {
        setLoading(false);
        Alert.alert('Something went wrong', 'Please try again.');
      });
  }

  function postData(amount, orderId, statusId) {
    axios
      .post(
        `${backendHost}/subscription/order/userid/${regId}/subsid/${subId}`,
        {
          amount: amount.toString(),
          order_id: orderId.toString(),
          razorpay_status: statusId.toString(),
        },
      )
      .then(res => {
        console.log('order', res.data);
      })
      .catch(err => {
        setLoading(false);
        Alert.alert('Something went wrong', 'Please try again.');
      });
  }

  function postsub(amount, currency, orderId) {
    var options = {
      description: 'Credits towards consultation',
      image: 'https://i.imgur.com/3g7nmJC.png',
      currency: currency,
      key: 'rzp_test_GgDGBdRu7fT3hC',
      amount: amount,
      name: 'Acme Corp',
      order_id: orderId,
      prefill: {
        email: 'gaurav.kumar@example.com',
        contact: '9191919191',
        name: 'Gaurav Kumar',
      },
      theme: {color: '#53a20e'},
    };
    RazorpayCheckout.open(options)
      .then(data => {
        // handle success

        postUpdate(
          `${data.razorpay_payment_id}`,
          `${data.razorpay_order_id.toString()}`,
        );
      })
      .catch(error => {
        // handle failure
        alert(`Error: ${error.code} | ${error.description}`);
      });
  }
  useEffect(() => {
    sub();
  }, []);

  const DATA1 = [
    {
      name: 'Sub1',
      id: subId1,
      plan: 'Basic',
      price: priceId1,
      info: subDetails1,
      other: details1,
    },

    {
      name: 'Sub2',
      id: subId2,
      plan: 'Standard',
      price: priceId2,
      info: subDetails2,
      other: details2,
    },
    {
      name: 'Sub3',
      id: subId3,
      plan: 'Ultimate',
      price: priceId3,
      info: subDetails3,
      other: details3,
    },
  ];
  const [activeIndex, setActiveIndex] = useState(1);

  function postIndex(index) {
    index === 0
      ? (setActiveIndex(index), setSubId(subId1), setPriceId(priceId1))
      : index === 1
      ? (setActiveIndex(index), setSubId(subId2), setPriceId(priceId2))
      : index === 2
      ? (setActiveIndex(index), setSubId(subId3), setPriceId(priceId3))
      : null;
  }

  function renderItemTrend({item, index}) {
    const {name, color, id, plan, price, info, other} = item;
    return (
      <View
        style={{
          marginRight: 8,
          paddingTop: 5,
          paddingBottom: 10,
          paddingLeft: 2,
        }}>
        <TouchableOpacity activeOpacity={0.9} onPress={() => console.log(id)}>
          <Card
            style={{
              width: wp('28%'),
              height: 180,
              borderRadius: 20,
              padding: 12,
              justifyContent: 'center',
              alignItems: 'center',
              elevation: 10,
              backgroundColor: activeIndex === index ? '#00415e' : '#fff',
            }}
            key={index}>
            <VStack space={5}>
              <View style={{alignItems: 'center'}}>
                <VStack space={4}>
                  <Text
                    style={{
                      color: activeIndex === index ? '#fff' : '#00415e',
                      fontFamily: 'Raleway-Regular',
                    }}>
                    {plan}
                  </Text>

                  <View>
                    <Text
                      style={{
                        color: activeIndex === index ? '#fff' : '#00415e',
                        fontFamily: 'Raleway-Regular',
                        marginLeft: 7,
                      }}>
                      {price}
                    </Text>
                  </View>
                </VStack>
              </View>
              <Text
                style={{
                  color: activeIndex === index ? '#fff' : '#00415e',
                  fontFamily: 'Raleway-Regular',
                }}>
                {info}
              </Text>
              <Text
                style={{
                  color: activeIndex === index ? '#fff' : '#00415e',
                  fontFamily: 'Raleway-Regular',
                }}>
                {other}
              </Text>
            </VStack>
          </Card>
        </TouchableOpacity>
      </View>
    );
  }
  if (!isLoaded) {
    return (
      <View style={styles.loading}>
        <HStack space={2} justifyContent="center">
          <LottieView
            source={require('../../assets/animation/load.json')}
            autoPlay
            loop
            style={{width: 50, height: 50, justifyContent: 'center'}}
          />
        </HStack>
      </View>
    );
  } else {
    return (
      <View style={styles.container}>
        {loading ? (
          <View style={styles.loading}>
            <LottieView
              source={require('../../assets/animation/load.json')}
              autoPlay
              loop
              style={{width: 50, height: 50}}
            />
          </View>
        ) : null}
        <Stack space={4} mt="20" ml="2">
          <Text style={styles.HeadText}>
            Subscribe and get access to unlimited articles
          </Text>
          <Text style={styles.BodyText}>
            Sorry! You have accessed all the free articles. Want to read more
            please subscribe.
          </Text>

          <VStack space={2} mt="4">
            {/* <View>
            <FlatList
            horizontal
              showsHorizontalScrollIndicator={false}
              data={DATA1}
              renderItem={renderItemTrend}
            />

          </View> */}
            <View>
              <Carousel
                data={DATA1}
                renderItem={renderItemTrend}
                sliderWidth={350}
                firstItem={1}
                inactiveSlideOpacity={0.8}
                itemWidth={120}
                onSnapToItem={ind => postIndex(ind)}
              />
            </View>

            <View style={{alignItems: 'center'}}>
              <Button
                mode="contained"
                style={styles.btn}
                labelStyle={{width: wp('40%')}}
                onPress={() => postAmount()}>
                Buy Now
              </Button>
            </View>
          </VStack>
        </Stack>
      </View>
    );
  }
};

export default SubPlan;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
    alignItems: 'center',
  },
  HeadText: {
    fontFamily: 'Raleway-Medium',
    color: '#00415e',
    fontSize: 25,
  },
  BodyText: {
    fontFamily: 'Raleway-Regular',
    color: '#00415e',
    fontSize: 18,
  },
  btn: {
    borderWidth: 1,
    borderRadius: 20,
    borderColor: '#00415e',
    justifyContent: 'center',
    alignItems: 'center',
    width: wp('40%'),
    height: 40,
    backgroundColor: '#00415e',
    color: 'white',

    marginTop: 10,
  },
  textSign: {
    fontSize: 20,
    textAlign: 'center',
  },
  loading: {
    justifyContent: 'center',
    backgroundColor: '#F5FCFF88',
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    zIndex: 999,
    alignItems: 'center',
  },
});
