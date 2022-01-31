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
import Autocomplete from './Autocomplete';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  Card,
  Checkbox,
  Modal,
  Paragraph,
  Portal,
  Provider,
} from 'react-native-paper';
import AllPost from '../search/AllPost';
import Icon from 'react-native-vector-icons/FontAwesome';
import PhoneInput from 'react-native-phone-number-input';
import {
  HStack,
  Stack,
  Center,
  Heading,
  NativeBaseProvider,
  Container,
  Box,
} from 'native-base';
import {backendHost} from '../../components/apiConfig';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import CenterWell from '../Disease/CenterWell';
import DoctorsCard from './DoctorsCard';

const DocPreview = () => {
  const [items, setItems] = useState([]);
  const [isLoaded, setLoaded] = useState(false);

  function diseasePosts(type) {
    // For specific blogs like "/blogs/diabetes"
    // if(type){
    fetch(`${backendHost}/isearch/${type}`)
      .then(res => res.json())
      .then(json => {
        setLoaded(true);
        setItems(json);
      })
      .catch(err => null);
  }

  function allPosts() {
    // For all available blogs "/blogs"
    fetch(`${backendHost}/article/allkv?limit=50`)
      .then(res => res.json())
      .then(json => {
        var temp = [];

        json.forEach(i => {
          if (i.pubstatus_id === 3 && i.type.includes(2)) {
            temp.push(i);
          }
        });
        setItems(temp);

        setLoaded(true);
      })
      .catch(err => null);
  }

  function IsJsonValid(str) {
    try {
      JSON.parse(str);
    } catch (e) {
      return [];
    }
    return JSON.parse(str).blocks;
  }

  useEffect((lat,lon,city) => {
    fetch(`${backendHost}/SearchActionController?cmd=getResults&city=jammu&doctors=manoj&Latitude=${lat}&Longitude=${lon}`)
    .then(res => res.json())
    .then(json => {
        setItems(json.map.DoctorDetails.myArrayList)          
    })
    .catch(err => null )
  }, []);
  function renderItemArt({item, index}) {
    const {friendly_name, source, content} = item;

    return (
      <View>
        <View style={{marginRight: 13,width:wp('100%'),height:hp('20%')}}>
          {/* {items
            .filter((i, idx) => idx < 9)
            .map(
              i => {
                <View><Text>kjasnkjnaks</Text></View>
              },

              // : null
            )} */}
 <View>
                          <Paragraph>
                            <Card
                              style={{
                                width: wp('90%'),
                                height: hp('25%'),
                                backgroundColor: '#00415e',
                                borderRadius: 20,
                              }}>
                            
                            </Card>
                          </Paragraph>
                        </View>
        </View>
      </View>
    );
  }
  function renderItem() {
    const {authors_name, source, color} = items;
    return (
      <View style={{marginRight: 13}}>
        <Card
          style={{
            width: wp('90%'),
            height: hp('25%'),
            backgroundColor: '#00415e',
            borderRadius: 20,
          }}>
          <Image
            style={{
              alignContent: 'center',
              width: wp('24%'),
              height: hp('15%'),
              position: 'relative',
              top: 42,
              left: 11,
            }}
            source={source}
          />
          <Text
            style={{
              color: '#fff',
              fontWeight: '500',
              position: 'relative',
              bottom: 10,
              left: 9,
            }}>
            {authors_name}
          </Text>
        </Card>
      </View>
    );
  }

  return (
    <>
      <View style={{flex:1}}>
        <View style={{flexDirection:'row'}}>
          <ScrollView
             style={{width: wp('100%')}}
             horizontal 
             showsHorizontalScrollIndicator={false}>

     {items.map((i) => (




          <DoctorsCard 
            rowno = {i.map.rowno}
            firstName= {i.map.docname_first}
            lastName= {i.map.docname_last}
            primary_spl = {i.map.primary_spl}
            hospital_affliated = {i.map.hospital_affliated}
            state = {i.map.state}
            country_code = {i.map.country_code}
          />
            
         ))}
                            
                           
          
            
                          
          </ScrollView>
      
        </View>
        <View>
          <View></View>
        </View>
      </View>
    </>
  );
};

export default DocPreview;
