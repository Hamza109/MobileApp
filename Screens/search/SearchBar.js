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
  FlatList
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
const SearchBar = ({placeholder}) => {

  const [name, setName] = useState('');

  const [items, setItems] = useState([]);

  

  const [searching, setSearching] = useState(false);

  const navigation = useNavigation();

  const docresult = (text) => {
    if (text)
      return navigation.push('docResult', {
        names: `${text}`,
      });
    else {

      navigation.navigate('SearchBar', {
        names: `${text}`,
      });
      Alert.alert('type something');
    }
  };

  const [search, setSearch] = useState('');
  const [filteredDataSource, setFilteredDataSource] = useState([]);
  const [masterDataSource, setMasterDataSource] = useState([]);

  useEffect(() => {
    axios
      .get(`${backendHost}/IntegratedActionController`)
      .then(res => res.data)
      .then(doctordata => {

        setItems(doctordata.map.Doctorname.myArrayList);
      })

      .catch(res => res);
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
          <Card style={styles.header}>
            <HStack mt="5" ml="10" p='1' space={1} alignItems="center">
              <Icon
                name="arrow-back-outline"
                style={{marginTop: 4, marginLeft: 11}}
                color={'#00415e'}
                size={35}
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
                  onClear={text => searchFilterFunction('')}
                  onSubmitEditing={(() => setName(name)& docresult(name))}
                  value={name}
                  width="62%"
                  height="95%"
                  color="#00415e"
                  borderRadius="15"
                  _focus={{borderColor: 'rgba(0, 65, 94, 0.2)'}}
                  backgroundColor="rgba(0, 65, 94, 0.2)"
                  borderColor="lightgrey"
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
                        onPress={(() => setName(name)& docresult(name))}
                        size={20}
                      />
                    </View>
                  }
                />
              </View>
            </HStack>
          </Card>
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

    alignItems: 'center',
  },
  flex: {
    flex: 1,
  },
  header: {
    padding: 0,
    marginTop: Platform.OS === 'ios' ? -15 : 0,
    marginLeft: 0,
    borderColor: '#fff',
    borderWidth: 0.1,
    alignItems: 'center',
    width: wp('100%'),
    height: 85,
 
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
