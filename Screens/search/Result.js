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
  SafeAreaView,
  Image,
} from 'react-native';

import AllPost from './AllPost';
import {Card} from 'react-native-paper';
import BootstrapStyleSheet from 'react-native-bootstrap-styles';
import {backendHost, imageHost} from '../../components/apiConfig';
import {ScrollView} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {
  moderateScale,
  verticalScale,
  scale,
  scalledPixel,
} from '../../components/Scale';
import ArticleHeader from './ArticleHeader';
import NetInfo from '@react-native-community/netinfo';
import {HStack, Spinner, VStack} from 'native-base';
import LottieView from 'lottie-react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import CenterWell from '../Disease/CenterWell';
import NoInternet from '../../components/NoInternet';
import {useDispatch} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {getArticleId} from '../Redux/Action';

const Result = ({route}) => {
  const bootstrapStyleSheet = new BootstrapStyleSheet();

  const texts = route.params.texts;
  const types = route.params.types;
  const id = route.params.id;
  // const [params] = useState(props)
  const [items, setItems] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isConnected, setIsConnected] = useState(true);
  const navigation = useNavigation();
  const [text, setText] = useState(texts);
  const [medtype, setMedType] = useState(types);
  const dispatch = useDispatch();

  const handlePress = (id, title) => {
    // dispatch(getArticleId({id:id,title:title}))

    navigation.push(`Disease`, {ids: `${id}`, title: title});
  };

  function IsJsonValid(str) {
    try {
      JSON.parse(str);
    } catch (e) {
      return e;
    }
    return JSON.parse(str).blocks;
  }
  const [initial, setInitial] = useState(9);
  const [showMore, setShowMore] = useState(true);

  useEffect(() => {
    NetInfo.addEventListener(state => {
      setIsConnected(state.isConnected);
    });
  }, [isConnected]);

  const receivedData = () => {
    const receive = new Promise((resolve, reject) => {
      if (isConnected) {
        setIsLoaded(false);
        fetch(`${backendHost}/article/allkv`)
          .then(res => res.json())
          .then(json => {
            resolve(setItems(json)), console.log(json);
          })

          .catch(err => err);
      }
    });
    receive.then(() => {
      setIsLoaded(true);
    });
  };

  const isearch = () => {
    const searchData = new Promise((resolve, reject) => {
      if (isConnected) {
        setLoading(true);
        setIsLoaded(false);

        fetch(`${backendHost}/isearch/${text}`)
          .then(res => res.json())
          .then(json => {
            setInitial(initial + 6);
            resolve(setItems(json));
            console.log(json);
            setLoading(false);
          })
          .catch(err => err);
      }
    });
    searchData.then(() => {
      setIsLoaded(true);
    });
  };
  const itype = () => {
    const headers = new Headers({
      Authorization: 'Bearer local@7KpRq3XvF9',
    });
    setLoading(true);
    fetch(`${backendHost}/isearch/medicinetype/${medtype}`, {
      headers: headers,
    })
      .then(res => res.json())
      .then(json => {
        setInitial(initial + 6);
        setIsLoaded(true);
        setItems(json);
        console.log(json);
        setLoading(false);
      })
      .catch(err => err);
  };
  const idisease = () => {
    const headers = new Headers({
      Authorization: 'Bearer local@7KpRq3XvF9',
    });
    const disease = new Promise((resolve, reject) => {
      if (isConnected) {
        setLoading(true);
        setIsLoaded(false);
        fetch(`${backendHost}/isearch/diseases/${id}`, {
          headers: headers,
        })
          .then(res => res.json())
          .then(json => {
            setInitial(initial + 6);
            console.log(json);

            resolve(setItems(json));
            setLoading(false);
          })
          .catch(err => err);
      }
    });
    disease.then(() => {
      setIsLoaded(true);
    });
  };

  const [loading, setLoading] = useState(false);

  const footer = () => {
    return (
      <View>
        <View style={{alignItems: 'center'}}>
          {items.length >= initial ? (
            <TouchableOpacity onPress={() => setLoading(true) & api()}>
              <HStack>
                <Text
                  style={{
                    fontFamily: 'Raleway-Medium',
                    color: '#00415e',
                    display: loading ? 'none' : 'flex',
                  }}>
                  Load More
                </Text>

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
              <Icon
                name="caret-down"
                style={{
                  color: '#00415e',
                  position: 'relative',
                  left: 25,
                  bottom: 5,
                  display: loading ? 'none' : 'flex',
                }}
                size={20}
              />
            </TouchableOpacity>
          ) : null}
        </View>
      </View>
    );
  };
  const api = () => {
    if (text) {
      isearch();
    } else if (medtype) {
      setText(null);

      itype();
    } else if (id) {
      idisease();
    } else {
      receivedData();
    }
  };
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
    let isMounted = true;
    if (isMounted) {
      api();
    }
    return () => {
      isMounted = false;
    };
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
    <>
      <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
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
                      <View key={Math.random().toString(36)}>
                        <View
                          style={{
                            height: scale(170),
                            width: wp('100%'),
                            paddingHorizontal: 10,
                            paddingVertical: 5,
                          }}
                          key={Math.random().toString(36)}>
                          <Card
                            style={{
                              width: '100%',
                              height: '100%',
                              overflow: 'hidden',
                              backgroundColor: '#f0f8ff',
                              borderWidth: 1,
                              elevation: 2,
                              marginLeft: -5,
                              borderColor: '#e6f7ff',
                              marginBottom: 5,
                              borderRadius: 15,
                            }}>
                            <HStack space={1} key={Math.random().toString(36)}>
                              <TouchableOpacity
                                activeOpacity={0.8}
                                key={Math.random().toString(36)}
                                onPress={() =>
                                  handlePress(i.article_id, i.title)
                                }>
                                <Image
                                  resizeMode="stretch"
                                  key={Math.random().toString(36)}
                                  source={{
                                    uri: imageLoc +
                                    imgLocation
                                      .replace('json', 'png')
                                      .split('/webapps/')[1],
                                  }}
                                  style={{
                                    position: 'relative',
                                    right: 3,
                                    width: scale(160),
                                    height: '100%',
                                    marginTop: 0,
                                    borderBottomLeftRadius: 5,
                                    borderTopLeftRadius: 5,
                                  }}
                                />
                              </TouchableOpacity>
                              <View
                                key={Math.random().toString(36)}
                                style={{
                                  flex: 1,
                                  flexDirection: 'column',
                                  justifyContent: 'space-evenly',
                                }}>
                                <View
                                  key={Math.random().toString(36)}
                                  style={{width: '90%'}}>
                                  <AllPost
                                    key={Math.random().toString(36)}
                                    id={i.article_id}
                                    title={i.title}
                                    f_title={i.friendly_name}
                                    w_title={i.window_title}
                                    allPostsContent={() => receivedData()}
                                  />
                                </View>
                                <Text key={Math.random().toString(36)}>
                                  {content
                                    ? content.map(
                                        (j, idx) =>
                                          idx < 1 && (
                                            <CenterWell
                                              key={Math.random().toString(36)}
                                              content={j.data.content}
                                              type={j.type}
                                              text={
                                                j.data.text.substr(0, 150) +
                                                '....'
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
                                <Text
                                  key={Math.random().toString(36)}
                                  adjustsFontSizeToFit
                                  numberOfLines={1}
                                  style={{
                                    color: '#00415e',

                                    fontFamily: 'Raleway-Medium',
                                    fontSize: scale(9),
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
            {footer()}
          </ScrollView>
        </View>
      </SafeAreaView>
    </>
  );
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
