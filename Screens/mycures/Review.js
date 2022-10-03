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
import {TouchableHighlight} from 'react-native';
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
  Spinner,
  VStack
} from 'native-base';
import CenterWell from '../Disease/CenterWell';
import {useIsFocused} from '@react-navigation/native';
import {backendHost} from '../../components/apiConfig';
import {useNavigation} from '@react-navigation/native';
import AllStat from '../search/AllStat';
const bootstrapStyleSheet = new BootstrapStyleSheet();
const {s, c} = bootstrapStyleSheet;

const Review = () => {
  const navigation = useNavigation();

  const [items, setItems] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  const [regType, setRegType] = useState();
  const [pubStatus, setPubStatus] = useState();
  const getId = () => {
    try {
      Promise.all(
        AsyncStorage.getItem('author').then(value1 => {
          if (value1 != null) {
            setuserId(value1);
          } else {
            navigation.navigate('SignIn');
          }
        }),
      );
    } catch (error) {error}
  };
  const getType = () => {
    try {
      AsyncStorage.getItem('rateType')
      .then(value2 => {
        if (value2 != null) {
          setRegType(value2);
        }
      }).catch(err=>err);;
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
      getType();

      receivedData();
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

  useEffect(() => {
    if (isFocus) {
      // check()
    }
  }, [userId]);

  if (!isLoaded) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <HStack space={2} justifyContent="center">
          <Spinner
            accessibilityLabel="Loading posts"
            color="#00415e"
            size="lg"
          />
          <Heading color="#00415e" fontSize="lg">
            Loading
          </Heading>
        </HStack>
      </View>
    );
  } else {
    return (
      <View style={styles.container}>
        <ScrollView style={{flex: 1, marginTop: 5}}>
          {items.map(i => {
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

            return i.pubstatus_id === 2 && i.edited_by == userId ? (
              <View>
              <View>
                <Card
                  style={{
                    width: wp('97%'),
                       height: 83,
                    backgroundColor: 'lightgrey',
                    borderRadius: 15,
                    marginBottom: 5,
                    justifyContent: 'center',

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
                        position:'relative',
                        right:5,
                        width: wp('45%'),
                        height: 83,
                        marginTop: 0,
                        borderRadius:15
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
                        <View style={{width:wp('50%'),position:'relative',right:5}}>
                    <VStack py='2' space={10}>

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
            ) : null;
          })}
          
        </ScrollView>
      </View>
    );
  }
};

export default Review;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    marginTop: 1,
  },

  review: {
    borderWidth: 2,
    borderColor: 'red',
    width: wp('15%'),
    backgroundColor: 'red',
    padding: 2,
    position: 'absolute',
    right:20,
  },

  opacity: {
    opacity: 1,
  },
});
