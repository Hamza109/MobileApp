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
  Button,
  Dimensions,
  FlatList,
  Platform
} from 'react-native';
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
  Input,
} from 'native-base';
import {Searchbar, ToggleButton} from 'react-native-paper';
import axios from 'axios';

import {useNavigation} from '@react-navigation/core';
import {backendHost} from '../../components/apiConfig';
import {Card} from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';
import { scale, verticalScale } from '../../components/Scale';
const SearchBar = ({placeholder,doc,city}) => {

  const [name, setName] = useState('');

  const [items, setItems] = useState([]);

  

  const [searching, setSearching] = useState(false);

  const navigation = useNavigation();

  const docresult = (text) => {
    if (text && doc === 1)
    (
   
     navigation.push('docResult', {
        names: `${text}`,
      }),
      setName(null),
      setSearching(false)
    
    
    )
    else if(text && city===1){
      return navigation.push('docResultCity', {
        names: `${text}`,
      }),
      setName(null),
      setSearching(false)
   }
    else{
      Alert.alert('type something');
    }
  };

  const [search, setSearch] = useState('');
  const [filteredDataSource, setFilteredDataSource] = useState([]);
  const [masterDataSource, setMasterDataSource] = useState([]);

  useEffect(() => {
  
    if(doc===1)
    {
    axios
      .get(`${backendHost}/IntegratedActionController`)
      .then(res => res.data)
      .then(doctordata => {

        setItems(doctordata.map.Doctorname.myArrayList);
      })

      .catch(res => res);
    }
   else if(city===1)
    {
      axios
      .get(`${backendHost}/city/all`)
      .then(res => res.data)
      .then(citydata => {
  
      var temp = []
      citydata.forEach(i => {
        temp.push(i.Cityname, i.Pincode)
      });
  
              setItems(temp)
          ;
   
      })
  
      .catch(res => res);
    }
  }, []);

  const searchFilterFunction = text => {
    setName(null);
    
    if (text) {
      setSearching(true);
      
      
      
      const newData = items.filter(function (item) {
        const itemData = item ? item.toUpperCase() : ''.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilteredDataSource(newData);
      setName(text);
    } else {
      
      setSearching(false)
      setFilteredDataSource(items);
      setName(text);
    }
  };

  const ItemView = ({item}) => {
    return (
      
      <TouchableOpacity onPress={() => setName(item) & docresult(item)}>
    
          <View style={styles.itemView}>
            <Text style={styles.itemText}>{item}</Text>
          </View>
        
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <View styles={styles.flex}>
          <View style={styles.header}>
           
              <Icon
                name="arrow-back-outline"
                style={{marginTop: 4, marginLeft: Platform.OS==='android'?11:13}}
                color={'#00415e'}
                size={Platform.OS ==='android'?35:37}
                onPress={() => {
                  navigation.navigate('DocTab');
                }}
              />
              <View>
                <Input
                  placeholder={placeholder}
                  placeholderTextColor="#00415e"
                  fontFamily="Raleway-Regular"
                  bg="#fff"
                  onChangeText={text => searchFilterFunction(text)}
                  onClear={() => searchFilterFunction('')}
                  onSubmitEditing={(() => setName(name)& docresult(name))}
                  value={name}
                  width={scale(wp('80%'))}
          height={verticalScale('52')}
                  color="#00415e"
                  borderRadius="15"
                  _focus={{borderColor: 'rgba(0, 65, 94, 0.2)'}}
                  backgroundColor="rgba(0, 65, 94, 0.2)"
                  borderColor="lightgrey"
                  py="3"
                  px="1"
                  fontSize="18"
               
                  InputRightElement={
                    searching?(
                    <View style={{position: 'relative', right: 20}}>
                      <Icon
                        m="2"
                        ml="3"
                        color="#00415e"
                        name="close"
                        onPress={(() => searchFilterFunction(''))}
                        size={20}
                      />
                    </View>):  ( <View style={{position: 'relative', right: 20}}>
                      <Icon
                        m="2"
                        ml="3"
                        color="#00415e"
                        name="search"
                        onPress={(() => setName(name)& docresult(name))}
                        size={20}
                      />
                    </View>)
                  }
                  
                />
              </View>
     
          </View>
        </View>
      </View>
      {searching && (
        <FlatList
          data={filteredDataSource}
          keyExtractor={(item, index) => index.toString()}
          renderItem={ItemView}
        />
      )}
   
    </SafeAreaView>
  );
};
export default SearchBar;
const height = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',

  },

  header: {
    paddingTop:Platform.OS === 'ios' ? 0 : 0,
    borderColor: '#fff',
    borderWidth: 0.1,
    justifyContent:'flex-start',
    
    alignItems:'center',
    flexDirection:'row',
    width: scale(400),
    height: verticalScale(80),
    elevation: 1,
    backgroundColor:'#fff'
  },

  itemView: {
    borderBottomWidth: 0.8,
    borderBottomColor: '#00415e',

    backgroundColor: '#fff',
    height: verticalScale(80),
    width: scale(500),
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
