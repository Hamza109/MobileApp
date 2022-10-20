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
import {useTheme} from '@react-navigation/native';
import AllPost from './AllPost';
import {Card} from 'react-native-paper';
import BootstrapStyleSheet from 'react-native-bootstrap-styles';
import {backendHost} from '../../components/apiConfig';
import {ScrollView} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { moderateScale,verticalScale,scale,scalledPixel } from '../../components/Scale';
import ArticleHeader from './ArticleHeader';

// import StarRating from 'react-native-star-rating';
import {
  HStack,
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

  const texts = route.params.texts;
  const types = route.params.types;
  // const [params] = useState(props)
  const [items, setItems] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  const [text, setText] = useState(texts);
  const [medtype, setMedType] = useState(types);
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

  const receivedData = () => {
    fetch(`${backendHost}/article/allkv`)
      .then(res => res.json())
      .then(json => {
        setIsLoaded(true);
        setItems(json);
        
      }).catch(err=>err);;
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
      }).catch(err=>err);;
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
      }).catch(err=>err);;
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

          <Text style={{fontFamily:'Raleway-Medium',color:'#00415e',display:loading?'none':'flex'}}>Load More</Text>
       

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
          <Icon name='caret-down'style={{color:'#00415e',position:'relative',left:25,bottom:5,display:loading?'none':'flex'}} size={20} />
        </TouchableOpacity>:null
  }
      </View>
    </View>)
  };
const api =()=>{
  if (text) {
 
    isearch();
  } else if (medtype) {
    setText(null);

    itype();
  } else {

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
    let isMounted=true;
    if(isMounted)
    {
   api();
    }
    return () => { isMounted = false };
  }, []);

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
  } else {
    return (
      <>
        <SafeAreaView style={{flex: 1,backgroundColor:'white'}}>
          <ArticleHeader />
          <View style={{margin: 6 , flex: 1}}>
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
                        <View     key={Math.random().toString(36)}>
                          <View style={{marginRight: 0,height:scale(170),width:wp('100%'),padding:2}} key={Math.random().toString(36)} >
                            <Card
key={Math.random().toString(36)}
                              style={{
                                width: moderateScale(350),
                                height: '100%',
                                overflow:'hidden',
                                backgroundColor: '#f7f7f7',
                                borderWidth:1,
                                elevation:2,
                                borderColor:'#e0e0e0',
                               marginBottom:5,
                                borderRadius:15,
                           
                              }}>
                                
                              <HStack space={1}  key={Math.random().toString(36)}>
                                <TouchableOpacity activeOpacity={0.8}  key={Math.random().toString(36)} onPress={()=>{{ navigation.push(`Disease`, {ids:`${i.article_id}`,flow:0})}}}>
                                <Image
                                resizeMode='stretch'
                              key={Math.random().toString(36)}
                                  source={{
                                    uri:
                                      imageLoc +
                                      imgLocation
                                        .replace('json', 'png')
                                        .split('/webapps/')[1],
                                  }}
                                  style={{
                                    position:'relative',
                                    right:3,
                                    width: scale(160),
                                    height: '100%',
                                    marginTop: 0,
                                    borderBottomLeftRadius:5,
                                    borderTopLeftRadius:5
                                  }}
                                />
                                </TouchableOpacity>
                                <View style={{flex:1 ,flexDirection:'column',justifyContent:'space-evenly'}}>
                               <View style={{width:'90%'}}>
                               <AllPost
                                      id={i.article_id}
                                      title={i.title}
                                      f_title={i.friendly_name}
                                      w_title={i.window_title}
                                      allPostsContent={() => receivedData()}
                                    />
                               </View>
                               <Text>
                                        {content
                                          ? content.map(
                                              (j, idx) =>
                                                idx < 1 && (
                                                  <CenterWell
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
              {
                footer()
              }
            </ScrollView>
          </View>
        </SafeAreaView>
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
