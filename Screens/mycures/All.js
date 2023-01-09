import React from 'react';
import {View, Text, Button, StyleSheet, Image} from 'react-native';
import {useState} from 'react';
import {useEffect} from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';
import BootstrapStyleSheet from 'react-native-bootstrap-styles';
import {Card} from 'react-native-paper';
import {ScrollView} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {
  HStack,
  Stack,
  Center,
  Heading,
  NativeBaseProvider,
  Container,
  Spinner,
  VStack,
  Box,
} from 'native-base';
import CenterWell from '../Disease/CenterWell';
import {useIsFocused} from '@react-navigation/native';
import {backendHost} from '../../components/apiConfig';
import {useNavigation} from '@react-navigation/native';
import LottieView from 'lottie-react-native';
import AllStat from '../search/AllStat';
import { useSelector,useDispatch } from 'react-redux';
import { screenName } from '../Redux/Action';
const All = () => {
  const navigation = useNavigation();
  const user=useSelector((state)=>state.userId.regId) ;
  const [items, setItems] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
const dispatch=useDispatch()
  const [regType, setRegType] = useState();
  const [pubStatus, setPubStatus] = useState();
  const getId = () => {
    if(user===0)
      {
            navigation.replace('SignIn');
      }
    }

  const getType = () => {
    try {
      AsyncStorage.getItem('rateType').then(value2 => {
        if (value2 != null) {
          setRegType(value2);
        }
      }).catch(err=>err);
    } catch (error) {error}
  };
  const receivedData = () => {
    fetch(`${backendHost}/article/allkv`)
      .then(res => res.json())
      .then(json => {
        setPubStatus(json.pubstatus_id);
        setIsLoaded(true);
        setItems(json);
      }).catch(err=>err);;
  };
  const isFocus = useIsFocused();

  useEffect(() => {
    if (isFocus) {
      getId();
    }
  }, []);
  useEffect(() => {
    if (navigation.isFocused()) {
      getType();

      receivedData();
    }
  }, [items]);
  function IsJsonValid(str) {
    try {
      JSON.parse(str);
    } catch (e) {
      return [];
    }
    return JSON.parse(str).blocks;
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
        <ScrollView style={{flex: 1, marginTop: 5}}>

          {
            items.length!==0?
          items.map(i => {
            var content = [];
            var imgLocation = i.content_location;
            var imageLoc = '';
            if (i.content) {
              content = IsJsonValid(decodeURIComponent(i.content));
            }
            if (imgLocation && imgLocation.includes('cures_articleimages')) {
              imageLoc = 'http://all-cures.com:8080/';
            } else {
              imageLoc =
                'https://all-cures.com:444/cures_articleimages//299/default.png';
            }

            var title = i.title;
            var regex = new RegExp(' ', 'g');

            title = title.replace(regex, '-');

            return i.pubstatus_id === 3 && i.edited_by == user ? (
              <View>
                <View style={{alignItems: 'center'}}>
                  <Card
                    style={{
                      width: wp('97%'),
                      height: 83,
                      backgroundColor: '#f0f8ff',
                      borderRadius: 15,
                      marginBottom: 5,
                      justifyContent: 'center',
                      borderColor:'#e6f7ff',
                      paddingHorizontal: 6,
                      alignItems: 'center',
                    }}>
                    <HStack space={1}>
                      <Image
                        source={{
                          uri:
                            imageLoc +
                            imgLocation
                              .replace('json', 'png')
                              .split('/webapps/')[1],
                        }}
                        style={{
                          position: 'relative',
                          right: 5,
                          width: wp('45%'),
                          height: 83,
                          marginTop: 0,
                          borderRadius: 15,
                        }}
                      />
                      <View>
                        <Card style={[styles.publish, styles.opacity]}>
                          <Text
                            style={{
                              textAlign: 'center',
                              color: 'white',
                              fontSize: wp('2.5%'),
                            }}>
                            Published
                          </Text>
                        </Card>
                        <View
                          style={{
                            width: wp('50%'),
                            position: 'relative',
                            right: 5,
                          }}>
                          <VStack py="2" space={10}>
                            <AllStat
                              id={i.article_id}
                              title={i.title}
                              f_title={i.friendly_name}
                              w_title={i.window_title}
                              allPostsContent={() => receivedData()}
                            />
                          </VStack>
                        </View>

                        <Text
                          style={{
                            color: '#00415e',
                            fontFamily: 'Raleway-Medium',
                            fontSize: wp('2.5%'),
                            position: 'absolute',
                            bottom: 0,
                          }}>
                          {i.authors_name}▪️{i.published_date}
                        </Text>
                      </View>
                    </HStack>
                  </Card>
                </View>
              </View>
            ) : i.pubstatus_id === 2 && i.edited_by == user? (
              <View>
                <View style={{alignItems: 'center'}}>
                  <Card
                    style={{
                      width: wp('97%'),
                      height: 83,
                      backgroundColor: '#f0f8ff',
                      borderRadius: 15,
                      marginBottom: 5,
                      justifyContent: 'center',
                      borderColor:'#e6f7ff',
                      paddingHorizontal: 5,
                      alignItems: 'center',
                    }}>
                    <HStack space={1}>
                      <Image
                        source={{
                          uri:
                            imageLoc +
                            imgLocation
                              .replace('json', 'png')
                              .split('/webapps/')[1],
                        }}
                        style={{
                          position: 'relative',
                          right: 5,
                          width: wp('45%'),
                          height: 83,
                          marginTop: 0,
                          borderRadius: 15,
                        }}
                      />
                      <View>
                        <Card style={[styles.review, styles.opacity]}>
                          <Text
                            style={{
                              textAlign: 'center',
                              color: 'white',
                              fontSize: wp('2.5%'),
                            }}>
                            Review
                          </Text>
                        </Card>
                        <View
                          style={{
                            width: wp('50%'),
                            position: 'relative',
                            right: 5,
                          }}>
                          <VStack py="2" space={10}>
                            <AllStat
                              id={i.article_id}
                              title={i.title}
                              f_title={i.friendly_name}
                              w_title={i.window_title}
                              allPostsContent={() => receivedData()}
                            />
                          </VStack>
                        </View>

                        <Text
                          style={{
                            color: '#00415e',

                            fontFamily: 'Raleway-Medium',
                            fontSize: wp('2.5%'),
                            position: 'absolute',
                            bottom: 0,
                          }}>
                          {i.authors_name}▪️{i.create_date}
                        </Text>
                      </View>
                    </HStack>
                  </Card>
                </View>
              </View>
            ) : i.pubstatus_id === 1 && i.edited_by == user? (
              <View>
                <View style={{alignItems: 'center'}}>
                  <Card
                    style={{
                      width: wp('97%'),
                      height: 83,
                      backgroundColor: '#f0f8ff',
                      borderRadius: 15,
                      marginBottom: 5,
                      justifyContent: 'center',
                      borderColor:'#e6f7ff',

                      paddingHorizontal: 5,
                      alignItems: 'center',
                    }}>
                    <HStack space={1}>
                      <Image
                        source={{
                          uri:
                            imageLoc +
                            imgLocation
                              .replace('json', 'png')
                              .split('/webapps/')[1],
                        }}
                        style={{
                          position: 'relative',
                          right: 5,
                          width: wp('45%'),
                          height: 83,
                          marginTop: 0,
                          borderRadius: 15,
                        }}
                      />
                      <View>
                        <Card style={[styles.work, styles.opacity]}>
                          <Text
                            style={{
                              textAlign: 'center',
                              color: 'white',
                              fontSize: wp('2.5%'),
                            }}>
                            Overview
                          </Text>
                        </Card>
                        <View
                          style={{
                            width: wp('50%'),
                            position: 'relative',
                            right: 5,
                          }}>
                          <VStack py="2" space={10}>
                            <AllStat
                              id={i.article_id}
                              title={i.title}
                              f_title={i.friendly_name}
                              w_title={i.window_title}
                              allPostsContent={() => receivedData()}
                            />
                          </VStack>
                        </View>

                        <Text
                          style={{
                            color: '#00415e',

                            fontFamily: 'Raleway-Medium',
                            fontSize: wp('2.5%'),
                            position: 'absolute',
                            bottom: 0,
                          }}>
                          {i.authors_name}▪️{i.published_date}
                        </Text>
                      </View>
                    </HStack>
                  </Card>
                </View>
              </View>
            ) :   null;
          }):  null}
        </ScrollView>
      </View>
    );
  }
};

export default All;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    marginTop: 1,
  },
  work: {
    borderWidth: 2,
    borderColor: '#00415e',
    backgroundColor: '#00415e',
    padding: 2,
    width: wp('15%'),
    position: 'absolute',
    right: 20,
  },
  review: {
    borderWidth: 2,
    borderColor: 'red',
    width: wp('15%'),
    backgroundColor: 'red',
    padding: 2,
    position: 'absolute',
    right: 20,
  },
  publish: {
    borderWidth: 2,
    width: wp('15%'),
    borderColor: 'green',
    backgroundColor: 'green',
    padding: 2,
    position: 'absolute',
    right: 20,
  },
  opacity: {
    opacity: 1,
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