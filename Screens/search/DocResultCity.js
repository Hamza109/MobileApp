import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  SafeAreaView,
  BackHandler,
  Alert,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import {useTheme, Link} from '@react-navigation/native';
import LottieView from 'lottie-react-native';
import axios from 'axios';

import {Card, Searchbar} from 'react-native-paper';
import BootstrapStyleSheet from 'react-native-bootstrap-styles';
import {ScrollView} from 'react-native';
// import StarRating from 'react-native-star-rating';
import {backendHost} from '../../components/apiConfig';
import ProfileTab from './ProfileTab';
import SearchBar from './SearchBar';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {
  Container,
  Modal,
  Button,
  Input,
  VStack,
  FormControl,
  Center,
  Stack,
  HStack,
  Spinner,
  Heading,
  Box,
  NativeBaseProvider,
} from 'native-base';
import ArticleHeader from './ArticleHeader';
import {scale, verticalScale} from '../../components/Scale';
import NetInfo from '@react-native-community/netinfo';
import NoInternet from '../../components/NoInternet';

const DocResultCity = ({navigation, route}) => {
  const bootstrapStyleSheet = new BootstrapStyleSheet();
  const {s, c} = bootstrapStyleSheet;

  const names = route.params.names;

  const {colors} = useTheme();

  const theme = useTheme();

  const [value, setValue] = useState();

  const [items, setItems] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  const [text, setText] = useState(names);
  const [isConnected, setIsConnected] = useState(true);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      setIsConnected(state.isConnected);
    });
    return () => {
      unsubscribe();
    };
  }, [isConnected]);

  const isearch = () => {
    const searchData = new Promise((resolve, reject) => {
      if (isConnected) {
        setIsLoaded(false);
        fetch(
          `${backendHost}/SearchActionController?cmd=getResults&city=${text}=&doctors=&Latitude=32.7266&Longitude=74.8570`,
        )
          .then(res => res.json())
          .then(json => {
            resolve(setItems(json.map.DoctorDetails.myArrayList));
          })
          .catch(err => err);
      }
    });
    searchData.then(() => {
      setIsLoaded(true);
    });
  };

  useEffect(() => {
    isearch();
  }, [isConnected]);

  if (!isConnected) {
    return (
      <NoInternet isConnected={isConnected} setIsConnected={setIsConnected} />
    );
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
  }
  return (
    <SafeAreaView style={styles.container}>
      <ArticleHeader placeholder="Search by city" doc={0} city={1} />
      <ScrollView>
        {items.map(i => (
          <Card
            style={{
              padding: 5,
              margin: 5,
              height: verticalScale(150),
              width: scale(350),
              backgroundColor: '#f0f8ff',
              borderColor: '#e6f7ff',
              borderWidth: 1,
              padding: 9,
            }}>
            <View>
              <ProfileTab
                rowno={i.map.docID}
                firstName={i.map.firstName}
                lastName={i.map.lastName}
                primary_spl={i.map.primarySpl}
                hospital_affliated={i.map.hospitalAffiliated}
                state={i.map.state}
              />
            </View>
            <View style={{position: 'relative', bottom: 0, left: 4}}></View>
          </Card>
        ))}
      </ScrollView>

      <StatusBar barStyle={theme.dark ? 'light-content' : 'dark-content'} />
    </SafeAreaView>
  );
};

export default DocResultCity;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  search: {
    position: 'relative',
    bottom: 282,
    backgroundColor: '#fff',
  },
  subcontainer1: {
    position: 'relative',
    bottom: 300,
    backgroundColor: '#fff',
    right: 90,
  },

  b1: {
    backgroundColor: '#00415e',
    padding: 40,
  },
  subcontainer3: {
    position: 'relative',
    bottom: 30,
    left: 150,
    backgroundColor: '#fff',
  },
  text: {
    backgroundColor: '#00415e',
    color: '#fff',
    textAlign: 'center',
  },

  h1: {
    position: 'relative',
    bottom: 450,
    right: 0,
    fontWeight: 'bold',
    padding: 0,
    margin: 0,
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
