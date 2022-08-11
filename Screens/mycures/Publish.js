import React from 'react';
import {View, Text, Button, StyleSheet, Image} from 'react-native';
import {useState} from 'react';
import {useEffect} from 'react';
import AllPost from '../search/AllPost';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BootstrapStyleSheet from 'react-native-bootstrap-styles';
import {Card} from 'react-native-paper';
import {get} from 'js-cookie';
import {ScrollView} from 'react-native';
import {TouchableOpacity} from 'react-native';
import LottieView from 'lottie-react-native';
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
  Box,
  VStack,
  Spinner,
} from 'native-base';
import CenterWell from '../Disease/CenterWell';
import {useIsFocused} from '@react-navigation/native';
import {backendHost} from '../../components/apiConfig';
import {useNavigation} from '@react-navigation/native';
import AllStat from '../search/AllStat';
const bootstrapStyleSheet = new BootstrapStyleSheet();
const {s, c} = bootstrapStyleSheet;

const Published = () => {
  const navigation = useNavigation();

  const [items, setItems] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [regId, setRegId] = useState([]);
  const [regType, setRegType] = useState();
  const [status, setStatus] = useState();

  const getId = () => {
    try {
      Promise.all(
        AsyncStorage.getItem('author').then(value1 => {
          if (value1 != null) {
            setRegId(value1);
          } else {
            navigation.navigate('SignIn');
          }
        }),
      );
    } catch (error) {}
  };
  const getType = () => {
    try {
      AsyncStorage.getItem('rateType').then(value2 => {
        if (value2 != null) {
          setRegType(value2);
        }
      });
    } catch (error) {}
  };
  const receivedData = () => {
    fetch(`${backendHost}/favourite/userid/${regId}/favouritearticle`)
      .then(res => res.json())
      .then(json => {
        setIsLoaded(true);
        setStatus(json.status);

        setItems(json);
      });
  };
  const isFocus = useIsFocused();
  const check = () => {
    if (regId.length === 0) {
      // navigation.navigate('Cures',{screen:'My Cures'})
      navigation.navigate('SignIn');
    } else {
      navigation.navigate('CreateScreenHome');
    }
  };
  useEffect(() => {
    receivedData();
  }, [regId]);
  useEffect(() => {
    if (isFocus) {
      getId();
      getType();
    }
  });
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
          {items.length !== 0 ? (
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

              //replace via regex
              title = title.replace(regex, '-');

              return i.status === 1 ? (
                <View>
                  <View>
                    <Card
                      style={{
                        width: wp('97%'),
                        height: hp('10.7%'),
                        backgroundColor: '#fff',
                        borderRadius: 15,
                        borderColor: 'aliceblue',
                        borderWidth: 2,
                        marginBottom: 5,
                      }}>
                      <HStack space={3}>
                        <TouchableOpacity
                          activeOpacity={0.8}
                          onPress={() => {
                            {
                              navigation.push(`Disease`, {
                                ids: `${i.article_id}`,
                              });
                            }
                          }}>
                          <Image
                            source={{
                              uri:
                                imageLoc +
                                imgLocation
                                  .replace('json', 'png')
                                  .split('/webapps/')[1],
                            }}
                            style={{
                              overflow: 'hidden',
                              width: wp('42%'),
                              height: hp('10.5%'),
                              marginTop: 0,
                              borderTopLeftRadius: 15,
                              borderBottomLeftRadius: 15,
                            }}
                          />
                        </TouchableOpacity>
                        <View>
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
              ) : (
                null
              );
            })
          ) : (
       
              <Text style={{color: '#00415e'}}>No Cures Yet</Text>
     
          )}
        </ScrollView>
      </View>
    );
  }
};

export default Published;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    marginTop: 1,
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
    backgroundColor: '#f0f0f0',
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    zIndex: 999,

  },
});
