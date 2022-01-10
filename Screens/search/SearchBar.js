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

import {Searchbar, ToggleButton} from 'react-native-paper';
import axios from 'axios';
import {max, set} from 'react-native-reanimated';
import {FlatList} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/core';
import { backendHost } from '../../components/apiConfig';
import {Card} from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';
const SearchBar = ref => {
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
      return navigation.navigate('DocSearchName', {
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
    axios
      .get(`${backendHost}/IntegratedActionController`)
      .then(res => res.data)
      .then(doctordata => {
        console.log(doctordata.map.Doctorname.myArrayList);
        setItems(doctordata.map.Doctorname.myArrayList);
      })

      .catch(res => console.log(res));
  }, []);

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
          <View style={styles.header}>
        <Icon name="arrow-back-outline" style={{marginTop:4,marginLeft:11}}color={'#00415e'} size={35} onPress={()=>{navigation.navigate('MainTab')}}/>
      <View>
      <Searchbar
          style={styles.textInput}
          placeholder="Search for doctors"
          placeholderTextColor="grey"
          value={name}
          //  returnKeyType='go'
          // onSubmitEditing={()=>setName(name),result}

          onChangeText={text => searchFilterFunction(text)}
          onClear={text => searchFilterFunction('')}
          onIconPress={(() => setName(name), docresult)}
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
      <View></View>
    </View>
  );
};
export default SearchBar;
const height = Dimensions.get('window').height;

const styles = StyleSheet.create({

  container: {
    backgroundColor: '#fff',
    height: '100%',
    width: '100%',
    alignItems: 'center',

  },
flex:{
flex:1
},
header:{
flexDirection:'row',
padding: 0,
marginTop: Platform.OS === 'ios' ? 0 : -7,
borderColor: '#fff',
borderWidth: 0.1,
alignItems: 'center',
width: 400,
height: 85,
elevation: 5,
},

  text: {
    color: '#fff',
    textAlign: 'center',
  },

  textInput: {
    backgroundColor: 'lightgrey',
    width: 330,
    height: 50,
    borderRadius: 5,
    fontSize: 20,
    fontWeight: 'bold',
    paddingHorizontal: 10,
    marginRight: 75,
    padding:0,
    marginTop: 0,
  },

  card:{
    marginTop:20,
    backgroundColor:'#fff',
  height:600,
  width:400,
  position:'relative',
  right:50
  },
    itemView: {
      borderBottomWidth:2,
      marginRight: 12,
      backgroundColor: '#fff',
      height:60,
      width: 400,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 10,
      zIndex: 999,
    },
    itemText: {
      color: 'black',
      paddingHorizontal: 10,
      fontSize: 17,
      zIndex: 999,
    },
    noResultView: {
      backgroundColor: 'aliceblue',
      height: 40,
      width: 350,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 15,
      zIndex: 999,
    },
    noResultText: {
      color: 'black',
      paddingHorizontal: 10,
      fontSize: 17,
      zIndex: 999,
    },
});
