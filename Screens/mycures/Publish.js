import React from 'react';
import {View, Text, Button, StyleSheet, Image} from 'react-native';
import {useState} from 'react';
import {useEffect} from 'react';
import AllPost from '../search/AllPost';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BootstrapStyleSheet from 'react-native-bootstrap-styles';
import {Card} from 'react-native-paper';
import {get} from 'js-cookie';
import {ScrollView} from 'react-native';
import {TouchableOpacity} from 'react-native';
import LottieView from 'lottie-react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { scale,verticalScale } from '../../components/Scale';
import Icon from 'react-native-vector-icons/Ionicons';
import {
  HStack,
} from 'native-base';
import CenterWell from '../Disease/CenterWell';
import {useIsFocused} from '@react-navigation/native';
import {backendHost} from '../../components/apiConfig';
import {useNavigation} from '@react-navigation/native';
import AllStat from '../search/AllStat';
import { useSelector } from 'react-redux';
const bootstrapStyleSheet = new BootstrapStyleSheet();
const {s, c} = bootstrapStyleSheet;

const Published = () => {
  const navigation = useNavigation();
  const user=useSelector((state)=>state.userId.regId) ;
  const [items, setItems] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);


  const [status, setStatus] = useState();

  const getId = () => {
    if(user==0)
            navigation.navigate('SignIn');
 
  };

  const receivedData = () => {
    fetch(`${backendHost}/favourite/userid/${user}/favouritearticle`)
      .then(res => res.json())
      .then(json => {
        setIsLoaded(true);
        setStatus(json.status);

        setItems(json);
      }).catch(err=>err);
  };
  const isFocus = useIsFocused();
  
  useEffect(() => {
    receivedData();
  }, []);
  useEffect(() => {
    if (isFocus) {
      getId();

    }
  });
  function IsJsonValid(str) {
    try {
      JSON.parse(str);
    } catch (e) {
      return [];
    }
    return JSON.parse(str).blocks;
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
  } else {
    return (
      <View style={styles.container}>
        <View style={{flex: 1, marginTop: 5}}>
          {items.length !== 0 ? (
            items.map(i => {
              var content = [];
              var imgLocation = i.content_location;
              var imageLoc = '';
              if (i.content) {
                content = IsJsonValid(decodeURIComponent(i.content));
              }
              if (imgLocation && imgLocation.includes('cures_articleimages')) {
                imageLoc = 'http://all-cures.com:8080/';
              } else {
                imageLoc =
                  'https://all-cures.com:444/cures_articleimages//299/default.png';
              }

              var title = i.title;
              var regex = new RegExp(' ', 'g');

              //replace via regex
              title = title.replace(regex, '-');

              return i.status === 1 ? (
                <ScrollView style={{flex: 1, marginTop: 5}}>
                  <View style={{height:scale(170),width:'100%', paddingHorizontal:10,paddingVertical:5}} key={Math.random().toString(36)} >
                              <Card
  key={Math.random().toString(36)}
                                style={{
                                  width: '100%',
                                  height: '100%',
                                  overflow:'hidden',
                                  backgroundColor: '#f0f8ff',
                                  borderWidth:1,
                                  elevation:2,
                                  borderColor:'#e6f7ff',
                                 marginBottom:5,
                                  borderRadius:15,
                                 
                             
                                }}>
                                  
                                <HStack space={1}  key={Math.random().toString(36)}>
                                  <TouchableOpacity activeOpacity={0.8}  key={Math.random().toString(36)} onPress={()=>{{ navigation.push(`Disease`, {ids:`${i.article_id}`})}}}>
                                  <Image
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
                         
                </ScrollView>
              ) : (
                null
              );
            })
          ) : (
       <View style={{justifyContent:'center',alignItems:'center',height:'100%',width:'100%'}} >
              <Icon
                      name="medical-outline"
                      size={50}
                      color={'#00415e'}
                      style={{opacity: 0.5}}
                    />
                    <Text style={{textAlign: 'center', fontSize: 18,color:'#00415e',fontFamily:'Raleway-Medium'}}>
                      No cures yet
                    </Text>
              </View>
     
          )}
        </View>
      </View>
    );
  }
};

export default Published;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop: 1,
  },

  publish: {
    borderWidth: 2,
    width: wp('15%'),
    borderColor: 'green',
    backgroundColor: 'green',
    padding: 2,
    position: 'absolute',
    right: 20,
  },
  opacity: {
    opacity: 1,
  },
  loading: {

    justifyContent: 'center',
    backgroundColor: '#f0f0f0',
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    zIndex: 999,

  },
});