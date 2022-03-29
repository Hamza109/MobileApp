import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
  StatusBar,
  BackHandler,
  Alert,
  TouchableOpacity,
  Image,
} from 'react-native';
import {useTheme, Link} from '@react-navigation/native';
import AllPost from './AllPost';
import {Card} from 'react-native-paper';
import BootstrapStyleSheet from 'react-native-bootstrap-styles';
import Autocomplete from '../MainTab/Autocomplete';
import {backendHost} from '../../components/apiConfig';
import {ScrollView} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import SearchArt from './SearchArticle';
import ArticleHeader from './ArticleHeader';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import StarRating from 'react-native-star-rating';
import {
  HStack,
  Stack,
  Center,
  Heading,
  NativeBaseProvider,
  Container,
  Box,
  Spinner,
  VStack,
} from 'native-base';
import LottieView from 'lottie-react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import CenterWell from '../Disease/CenterWell';

const Result = ({navigation, route}) => {
  const bootstrapStyleSheet = new BootstrapStyleSheet();
  const {s, c} = bootstrapStyleSheet;

  const texts = route.params.texts;
  const types = route.params.types;
  const {colors} = useTheme();

  const theme = useTheme();

  const [value, setValue] = useState();
  // const [params] = useState(props)
  const [items, setItems] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  const [text, setText] = useState(texts);
  const [medtype, setMedType] = useState(types);
  function IsJsonValid(str) {
    try {
      JSON.parse(str);
    } catch (e) {
      return [];
    }
    return JSON.parse(str).blocks;
  }
  const [initial, setInitial] = useState(9);
  const [showMore, setShowMore] = useState(true);

  const receivedData = () => {
    fetch(`${backendHost}/article/allkv`)
      .then(res => res.json())
      .then(json => {
        setIsLoaded(true);
        setItems(json);
        
      });
  };

  const isearch = () => {
    setLoading(true)
    fetch(`${backendHost}/isearch/${text}`)
      .then(res => res.json())
      .then(json => {
        setInitial(initial+6)
  
    
        setIsLoaded(true);
        setItems(json);
        setLoading(false)
      });
  };
  const itype = () => {
    setLoading(true)
    fetch(`${backendHost}/isearch/medicinetype/${medtype}`)
      .then(res => res.json())
      .then(json => {
    setInitial(initial+6)
        setIsLoaded(true);
        setItems(json);
        setLoading(false)
      });
  };

  const [loading,setLoading]=useState(false)
  const footer = () => {
    return(
    <View>
      <View style={{alignItems: 'center'}}>
        {
          items.length>=initial?
        <TouchableOpacity onPress={()=>setLoading(true)&api()}>
          <HStack>

          <Text>Load More</Text>

          {loading ? (
      <View>
     
     <Spinner
            accessibilityLabel="Loading posts"
            color="#00415e"
            size="sm"
          />
     
      
      </View>
          ) : null}
          </HStack>
        </TouchableOpacity>:null
  }
      </View>
    </View>)
  };
const api =()=>{
  if (text) {
    console.log('hello', text);
    isearch();
  } else if (medtype) {
    setText(null);
    console.log(medtype);
    itype();
  } else {
    console.log('hi', text);
    receivedData();
  }
}
const load = () => {
  return (
    <View style={{alignItems: 'center'}}>
      <HStack space={2} justifyContent="center">
        <LottieView
          source={require('../../assets/animation/pulse.json')}
          autoPlay
          loop
          style={{width: 50, height: 50}}
        />
        {/* <Spinner
          accessibilityLabel="Loading posts"
          color="#fff"
          size="lg"
        /> */}
      </HStack>
    </View>
  );
};

  useEffect(() => {
   api();
  }, []);

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
      <>
        <View style={{flex: 1}}>
          <ArticleHeader />
          <View style={{margin: 6, flex: 1}}>
            <ScrollView style={{width: wp('100%'), height: hp('100%')}}>
              {items.length !== 0 ? (
                items
                  .filter((i, idx) => idx < initial)
                  .map(
                    (i, key) => {
                      var content = [];
                      var imgLocation = i.content_location;
                      var imageLoc = '';
                      if (i.content) {
                        content = IsJsonValid(decodeURIComponent(i.content));
                      }
                      if (
                        imgLocation &&
                        imgLocation.includes('cures_articleimages')
                      ) {
                        imageLoc = 'http://all-cures.com:8080/';
                      } else {
                        imageLoc =
                          'https://all-cures.com:444/cures_articleimages//299/default.png';
                      }

                      var title = i.title;
                      var regex = new RegExp(' ', 'g');

                      //replace via regex
                      title = title.replace(regex, '-');
                      return (
                        <View>
                          <View
                            style={{
                              marginRight: 10,
                              height: 170,
                              width: wp('100%'),
                            }}>
                            <Card
                              style={{
                                width: wp('97%'),
                                height: 168,
                                backgroundColor: '#fff',
                                borderWidth: 2,
                                borderColor: 'aliceblue',
                                justifyContent: 'center',
                                paddingHorizontal: 5,
                                borderRadius: 15,
                                alignItems: 'center',
                              }}>
                              <HStack space={1}>
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
                                      position: 'relative',
                                      right: 3,
                                      width: wp('44%'),
                                      height: 166,
                                      marginTop: 0,
                                      borderBottomLeftRadius: 15,
                                      borderTopLeftRadius: 15,
                                    }}
                                  />
                                </TouchableOpacity>
                                <View style={{width: wp('50%')}}>
                                  <VStack py="2" space={10}>
                                    <AllPost
                                      key={key}
                                      id={i.article_id}
                                      title={i.title}
                                      f_title={i.friendly_name}
                                      w_title={i.window_title}
                                      allPostsContent={() => receivedData()}
                                    />
                                    <View style={{width: wp('50%')}}>
                                      <Text
                                        style={{position: 'absolute', top: 0}}>
                                        {content
                                          ? content.map(
                                              (j, idx) =>
                                                idx < 1 && (
                                                  <CenterWell
                                                    key={j}
                                                    content={j.data.content}
                                                    type={j.type}
                                                    text={
                                                      j.data.text.substr(
                                                        0,
                                                        150,
                                                      ) + '....'
                                                    }
                                                    title={j.data.title}
                                                    message={j.data.message}
                                                    source={j.data.source}
                                                    embed={j.data.embed}
                                                    caption={j.data.caption}
                                                    alignment={j.data.alignment}
                                                    imageUrl={
                                                      j.data.file
                                                        ? j.data.file.url
                                                        : null
                                                    }
                                                    url={j.data.url}
                                                  />
                                                ),
                                            )
                                          : null}
                                      </Text>
                                    </View>
                                  </VStack>
                                  <Text
                                    adjustsFontSizeToFit
                                    numberOfLines={1}
                                    style={{
                                      color: '#00415e',
                                      position: 'absolute',
                                      bottom: 0,
                                      fontFamily: 'Raleway-Medium',
                                      fontSize: wp('2.5%'),
                                    }}>
                                    {i.authors_name}▪️{i.published_date}
                                  </Text>
                                </View>
                              </HStack>
                            </Card>
                          </View>
                        </View>
                      );
                    },

                    // : null
                  )
              ) : (
                <View style={{alignItems: 'center', justifyContent: 'center'}}>
                  <Icon
                    name="medical-outline"
                    size={50}
                    style={{opacity: 0.5, color: '#00415e'}}
                  />
                  <Text
                    style={{
                      textAlign: 'center',
                      fontSize: 18,
                      color: '#00415e',
                      fontFamily: 'Raleway-Medium',
                    }}>
                    No Cure Found
                  </Text>
                </View>
              )}
              {
                footer()
              }
            </ScrollView>
          </View>
        </View>
      </>
    );
  }
};

export default Result;

const styles = StyleSheet.create({
  // container: {
  //   backgroundColor: '#fff' ,
  //  width:'100%',
  //  height:'100%',
  //   alignItems: 'center',
  //   justifyContent: 'center',

  // },

  card: {
    padding: 5,
    margin: 10,
    height: hp('20%'),
    width: wp('95%'),
    backgroundColor: 'aliceblue',
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
});
