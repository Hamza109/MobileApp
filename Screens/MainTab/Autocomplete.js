import React, {useEffect, useState, useRef} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableHighlight,
  Alert,
  FlatList,
} from 'react-native';
import analytics from '@react-native-firebase/analytics';
import {
  HStack,
  Stack,
  Center,
  Heading,
  NativeBaseProvider,
  Container,
  Input,
  Box,
} from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import {backendHost} from '../../components/apiConfig';
import {Searchbar, ToggleButton} from 'react-native-paper';
import axios from 'axios';
import {Dimensions} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/core';
import {Card} from 'react-native-paper';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
const Autocomplete = () => {
  const [dataSource, setDataSource] = useState([]);

  const [colors] = useState(['#84DCC6', '#FEC8C8', '#F7E4CF', '#E8DEF3']);
  const [text, setText] = useState('');
  const isearch = texts => {
    setText(texts);
    Promise.all([
      axios
        .get(`${backendHost}/isearch/combo/${text}`)

        .then(res => res.data),
    ])
      .then(diseaseData => {
        setDataSource(diseaseData);
      })

      .catch(res => {
        console.error(res);
      });
  };

  const [isLoaded, setisLoaded] = useState(false);

  const [filtered, setFiltered] = useState(dataSource);

  const [searching, setSearching] = useState(false);
const [uniqueId,setUniqueId]=useState()
const [regId,setRegId]=useState()
  const navigation = useNavigation();
  const getId = () => {
    try {
      AsyncStorage.getItem('author').then(value1 => {
        if (value1 != null) {
          setRegId(Number(value1));
        }
      }).catch(err=>err);;
    } catch (error) {
      error
    }
  };
  const getDeviceInfo = () => {
    try {
      AsyncStorage.getItem('device').then(value2 => {
        if (value2 != null) {
          setUniqueId(value2);
        }
      }).catch(err=>err);;
    } catch (error) {error}
  };

  useEffect(()=>{
    getDeviceInfo()
    getId()
  })

  const info=()=>{
    axios.post(`${backendHost}/data/create`,{
      'device_id': uniqueId,
      'user_id':regId?regId:0,
      'event_type':'search',
      'event_value':text
    })
  }

  const result = (texts) => {

  
    info();
    
    if (texts) {
  
      analytics().setUserProperty('search_term', text);
      analytics().logEvent('search', {search_term: text});
      analytics().logSearch({search_term: text});

      navigation.navigate('Result', {
        texts: `${texts}`,
      });
      setText(null);
    } else {
      navigation.navigate('Home', {
              texts: `${texts}`,
      });
      Alert.alert('type something');
    }
  };

  const onSearch = texts => {
    setText(null);
    if (texts) {
      isearch(texts);

      setSearching(true);
    } else {
    }
  };

  const getItem = ([item]) => {
    return (
      <Container>
        <View style={{marginTop: 9, marginLeft: -38}}>
          <FlatList
            data={item}
            renderItem={({item}) => (
              <TouchableOpacity
                onPress={() =>setText(item) & result(item)}>
                <View style={styles.itemView}>
                  <Text style={styles.itemText}>{item}</Text>
                </View>
              </TouchableOpacity>
            )}
          />
        </View>
      </Container>
    );
  };

  return (
    <View style={styles.containers}>
      <View>
        <Input
          placeholder="search cures"
          placeholderTextColor="#00415e"
          bg="#fff"
          onChangeText={onSearch}
          onSubmitEditing={(() => setText(text)& result(text))}
          value={text}
          width="62%"
          height="88%"
          fontFamily="Raleway-Regular"
          color="#00415e"
          borderRadius="15"
          _focus={{borderColor: 'rgba(0, 65, 94, 0.2)'}}
          backgroundColor="rgba(0, 65, 94, 0.2)"
          py="3"
          px="1"
          fontSize="18"
          autoFocus
          InputRightElement={
            <View style={{position: 'relative', right: 20}}>
              <Icon
                m="2"
                ml="3"
                color="#00415e"
                name="search"
                onPress={(() => setText(text)&result(text))}
                size={20}
              />
            </View>
          }
        />
        {/* <Searchbar
          style={styles.textInput}
          color="#E5E5E5"
          placeholder="search cures"
          placeholderTextColor="#E5E5E5"
          value={text}
          returnKeyType="go"
          onSubmitEditing={(() => setText(text), result)}
          onChangeText={onSearch}
          onIconPress={(() => setText(text), result)}
          iconColor='#E5E5E5'

          autoFocus
        /> */}
      </View>

      {searching && (
        <View style={{flex: 1}}>
          <Box style={{height: height}}>
            {dataSource.length ? (
              getItem(dataSource)
            ) : (
              <View style={{marginTop: 9, marginLeft: -36}}>
                <View>
                  <Text></Text>
                </View>
              </View>
            )}
          </Box>
        </View>
      )}
    </View>
  );
};
export default Autocomplete;
const width = Dimensions.get('screen').width;
const height = Dimensions.get('window').height;
const styles = StyleSheet.create({
  containers: {
    zIndex: 999,
  },
  text: {
    color: '#fff',
    textAlign: 'center',
  },
  b1: {
    backgroundColor: '#00415e',
    padding: 40,
  },

  textInput: {
    backgroundColor: 'grey',
    width: wp('87%'),
    height: 50,
    borderRadius: 5,
    fontSize: 20,
    fontWeight: 'bold',
    paddingHorizontal: 10,
    borderRadius: 15,

    marginTop: 0,
  },
  body: {
    marginTop: 20,
  },

  itemView: {
    borderBottomWidth: 0.8,
    borderBottomColor: '#00415e',

    backgroundColor: '#fff',
    height: 80,
    width: wp('100%'),
    justifyContent: 'center',

    padding: 10,
    zIndex: 999,
  },
  itemText: {
    color: '#00415e',
    paddingHorizontal: 10,
    fontSize: wp('4%'),
    marginLeft: -5,

    zIndex: 999,
  },
  noResultView: {
    borderBottomWidth: 0.5,

    backgroundColor: '#fff',
    height: 65,

    justifyContent: 'center',

    padding: 10,
    zIndex: 999,
  },
  noResultText: {
    color: 'black',
    paddingHorizontal: 10,
    fontSize: 17,
    zIndex: 999,
  },
});
