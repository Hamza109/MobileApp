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
} from 'react-native';
import { HStack, Stack, Center, Heading, NativeBaseProvider, Container ,Input,Box} from "native-base"
import Icon from 'react-native-vector-icons/FontAwesome';
import {backendHost} from '../../components/apiConfig';
import {Searchbar, ToggleButton} from 'react-native-paper';
import axios from 'axios';
import { Dimensions } from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/core';
import {Card} from 'react-native-paper';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
const Autocomplete = () => {
  const [dataSource, setDataSource] = useState([]);

  const [colors] = useState(['#84DCC6', '#FEC8C8', '#F7E4CF', '#E8DEF3']);
  const [text, setText] = useState();
  const isearch = texts => {
    setText(texts);
    Promise.all([
      axios
        .get(`${backendHost}/isearch/combo/${text}`)

        .then(res => res.data),
    ])
      .then(diseaseData => {
       
        setDataSource(diseaseData);

        // axios.get(`http://192.168.29.160:8080/cures/isearch/combo/${param.type}`)
        // .then((res) => res.json())
        // .then((json) => {
        //   console.log(json);

        //     setisLoaded(true)
        //     setItem(json)

        // });
      })
      // .then(() => {
      //   speciality.map((i) => {
      //     spec1.push(i[3])
      //   })
      // })
      .catch(res => {
        console.error(res);
      });
  };

  const [isLoaded, setisLoaded] = useState(false);

  const [filtered, setFiltered] = useState(dataSource);

  const [searching, setSearching] = useState(false);

  const navigation = useNavigation();

  const result = () => {
    
    if (text){
      navigation.navigate('Result', {
        texts: `${text}`,
      });
      setText(null)
    }
    else {
      navigation.navigate('Home', {
        texts: `${text}`,
      });
      Alert.alert('type something');
    }
  };

  const onSearch = texts => {
    setText(null);
    if (texts) {
      console.log('if' + texts);
      isearch(texts);

      setSearching(true);
    } else {
      console.log('else');
    }
  };

  const getItem = ([item]) => {
    return (
      <Container>
       <View style={{marginTop:9,marginLeft:-36}}>
      <FlatList
        data={item}
        indicatorStyle={'#00415e'}
        renderItem={({item}) => (
        
           
              <TouchableOpacity
                onPress={() => setText(item) & setSearching(false)}>
                <View style={styles.itemView}>
                  <Text  style={styles.itemText}>{item}</Text>
                </View>
              </TouchableOpacity>
          
       
        )}
      />
 </View>
      </Container>
      // {/*
      //             <Text style={styles.itemText}>{item}</Text>
      //             */}
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
        onSubmitEditing={(() => setText(text), result)}
        value={text}
        width="62%"
        height="95%"
        fontFamily="Raleway-Regular"
        color="rgba(0, 65, 94, 0.2)"
        borderRadius="15"
        _focus={{borderColor:'rgba(0, 65, 94, 0.2)'}}
        backgroundColor="rgba(0, 65, 94, 0.2)"
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
          onPress={(() => setText(text), result)}
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
      <View style={{flex:1}}>
          <Box style={{height:height}}>
    
            {dataSource.length ? (
              getItem(dataSource)
            ) : (
              <View style={{marginTop:9,marginLeft:-36}}>
              <View style={styles.noResultView}>
                <Text style={styles.noResultText}>No search items matched</Text>
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
const width=Dimensions.get('screen').width
const height=Dimensions.get('window').height
const styles = StyleSheet.create({
  // container: {
  //   alignItems: 'center',

  //   flex: 1,
  // },
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
    borderRadius:15,
    
    marginTop: 0,
  },
body:{
marginTop:20,


},
// card:{
//   marginTop:20,
//   backgroundColor:'#fff',
// height:600,
// width:width,
// position:'relative',
// right:
// },
  itemView: {
    borderBottomWidth:.8,
    borderBottomColor:'#00415e',

    backgroundColor: '#fff',
    height:hp('10%'),
  width:wp('100%'),
    justifyContent: 'center',

    padding: 10,
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
