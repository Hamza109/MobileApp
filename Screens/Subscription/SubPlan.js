import React, {useState, useEffect} from 'react';
import {Dimensions, ImageBackground} from 'react-native';
import {
  View,
  ScrollView,
  Text,
  Button,
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
import {useIsFocused, useTheme} from '@react-navigation/native';
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

const SubPlan = props => {
  const [regId, setRegId] = useState();
  const [subId, setSubId] = useState();
  const [subId1, setSubId1] = useState();
  const [subId2, setSubId2] = useState();
  const [subId3, setSubId3] = useState();
  const [loading, setLoading] = useState(false);
  const [priceId1, setPriceId1] = useState();
  const [priceId2, setPriceId2] = useState();
  const [priceId3, setPriceId3] = useState();
  const [subDetails1, setSubDetails1] = useState();
  const [subDetails2, setSubDetails2] = useState();
  const [subDetails3, setSubDetails3] = useState();
  const [details1, setDetails1] = useState();
  const [details2, setDetails2] = useState();
  const [details3, setDetails3] = useState();
  const [items, setItems] = useState([]);
  const [status, setStatus] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  function sub() {
    axios
      .get(`${backendHost}/subscription/get`)

      .then(res => {
        console.log(res.data);
        setItems(res.data);
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
          // navigation.navigate('Cures',{screen:'My Cures'})
        } else {
          null;
        }
      });
    } catch (error) {}
  }

  function postsub() {
    setLoading(true);
    axios
      .post(`${backendHost}/subscription/create/${regId}/${subId}/${status}`)
      .then(res => {
        if (res.data === 1) {
          setLoading(false);
          console.log('done');
        } else {
          setLoading(false);
          console.log('error');
        }
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
      ? (setActiveIndex(index), setSubId(subId1))
      : index === 1
      ? (setActiveIndex(index), setSubId(subId2))
      : index === 2
      ? (setActiveIndex(index), setSubId(subId3))
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
      <View>
        <HStack space={2} justifyContent="center">
          <LottieView
            source={require('../../assets/animation/load.json')}
            autoPlay
            loop
            style={{width: 50, height: 50}}
          />
        </HStack>
      </View>
    );
  } else {
    return (
      <View style={styles.container}>
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
              <TouchableOpacity style={styles.signIn} onPress={() => postsub()}>
                <HStack space={1}>
                  <Text
                    style={[
                      styles.textSign,
                      {
                        fontFamily: 'Raleway-Bold',
                        color: '#fff',
                      },
                    ]}>
                    Buy Now
                  </Text>
                  {loading ? (
                    <View>
                      <Spinner
                        accessibilityLabel="Loading posts"
                        color="#00415e"
                        size="lg"
                      />
                    </View>
                  ) : null}
                </HStack>
              </TouchableOpacity>
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
  signIn: {
    width: '50%',
    height: hp('6%'),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
    backgroundColor: '#00415e',
    marginBottom: 10,
  },
  textSign: {
    fontSize: 20,
    textAlign: 'center',
  },
  textCard: {},
});
