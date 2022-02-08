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
} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { HStack, Stack, Center, Heading, NativeBaseProvider, Container,Input } from "native-base"
import {Searchbar, ToggleButton} from 'react-native-paper';
import axios from 'axios';
import {max, set} from 'react-native-reanimated';
import {FlatList} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/core';
import { backendHost } from '../../components/apiConfig';
import {Card} from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';
const SearchBarCity = ref => {
  //   const [dataSource,setDataSource] = useState([])

  //   const [colors] = useState(['#84DCC6', '#FEC8C8', '#F7E4CF', "#E8DEF3",])
  const [name, setName] = useState('');
  //  const[text,setText]=useState()
  //  const[loaded,setLoaded]=useState()
  const [items, setItems] = useState([]);

  //   const isearch=(texts)=>{
  //   setName(texts)
  // axios.get(`${backendHost}/IntegratedActionController`)
  // .then(res => res.data)
  //  .then((doctordata)=>{
  //      console.log(doctordata.map.Doctorname.myArrayList)
  //      setItems(doctordata.map.Doctorname.myArrayList)
  //  })

  // .catch(res =>  console.log(res))
  // }

  const [searching, setSearching] = useState(false);

  const navigation = useNavigation();

  const docresult = () => {
    if (name)
      return navigation.push('docResultCity', {
        names: `${name}`,
      });
    else {
      console.log(name);
      navigation.navigate('SearchBar', {
        names: `${name}`,
      });
      Alert.alert('type something');
    }
  };

  const [search, setSearch] = useState('');
  const [filteredDataSource, setFilteredDataSource] = useState([]);
  const [masterDataSource, setMasterDataSource] = useState([]);

  useEffect(() => {
cityAll();
  }, []);
  const cityAll=()=>{
    axios
    .get(`${backendHost}/city/all`)
    .then(res => res.data)
    .then(citydata => {
  console.log(citydata)
    var temp = []
    citydata.forEach(i => {
      temp.push(i.Cityname, i.Pincode)
    });
console.log(temp)
            setItems(temp)
        ;
 
    })

    .catch(res => console.log(res));
  }

  const searchFilterFunction = text => {
    setName(null);
    // Check if searched text is not blank
    if (text) {
      setSearching(true);
      // Inserted text is not blank
      // Filter the masterDataSource
      // Update FilteredDataSource
      const newData = items.filter(function (item) {
        const itemData = item ? item.toUpperCase() : ''.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilteredDataSource(newData);
      setName(text);
    } else {
      // Inserted text is blank
      // Update FilteredDataSource with masterDataSource
      setFilteredDataSource(items);
      setName(text);
    }
  };

  const ItemView = ({item}) => {
    return (
      // Flat List Item
      <TouchableOpacity onPress={() => setName(item) & setSearching(false)}>
        <View>
          <Card style={styles.itemView}>
            <Text style={styles.itemText}>{item}</Text>
          </Card>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View>
      <View styles={styles.flex}>
          <Card style={styles.header}>
          <HStack mt="5" ml="10" space={1}alignItems="center">
        <Icon name="arrow-back-outline" style={{marginTop:4,marginLeft:11}}color={'#00415e'} size={35} onPress={()=>{navigation.navigate('MainTab')}}/>
      <View>
   
          <Input
        placeholder="Search by city or pincode"
        placeholderTextColor="#00415e"
       fontFamily="Raleway-Regular"
        bg="#fff"
        onChangeText={text => searchFilterFunction(text)}
        onClear={text => searchFilterFunction('')}
        onSubmitEditing={(() => setName(name), docresult)}
        value={name}
        width="62%"
        height="95%"
        color="#00415e"
        borderRadius="15"
        _focus={{borderColor:'rgba(0, 65, 94, 0.2)'}}
        backgroundColor="rgba(0, 65, 94, 0.2)"
        borderColor="lightgrey"
        py="3"
        px="1"
        fontSize="18"
        autoFocus
      
 
        InputRightElement={
    <View style={{position:'relative',right:20}}>
          <Icon
          m="2"
          ml="3"
          color="#00415e"
            name="search"
          onPress={(() => setName(name), docresult)}
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
      <View></View>
    </View>
  );
};
export default SearchBarCity;
const height = Dimensions.get('window').height;

const styles = StyleSheet.create({

  container: {
    backgroundColor: '#fff',
  
    alignItems: 'center',

  },
flex:{
flex:1
},
header:{
  padding: 0,
  marginTop: Platform.OS === 'ios' ? 0 : -7,
  marginLeft:0,
  borderColor: '#fff',
  borderWidth: 0.1,
  alignItems: 'center',
  width: wp('100%'),
  height: 85,
  elevation: 5,

},




  itemView: {
    borderBottomWidth:.8,
    borderBottomColor:'#00415e',

    backgroundColor: '#fff',
    height:hp('7%'),
  width:wp('100%'),
    justifyContent: 'center',

    padding: 15,
    zIndex: 999,
  },
  itemText: {
    color: '#00415e',
    paddingHorizontal: 10,
    fontSize: 17,
    marginLeft:-5,
    marginRight:3,
    zIndex: 999,
  },
  noResultView: {
    borderBottomWidth:.5,
  
  
      backgroundColor: '#fff',
      height:65,
    
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
