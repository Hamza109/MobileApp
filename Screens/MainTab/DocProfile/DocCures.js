import React, {useEffect, useState} from 'react';
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import {VStack, HStack} from 'native-base';
import axios from 'axios';
import {backendHost} from '../../../components/apiConfig';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useSelector, useStore, useDispatch} from 'react-redux';
import {fetchRequest, fetchSuccess, fetchFailure} from '../../Redux/Action';
import Icon from 'react-native-vector-icons/Ionicons';
import {Card} from 'react-native-paper';
import AllPost from '../../search/AllPost';
import CenterWell from '../../Disease/CenterWell';
import {useNavigation} from '@react-navigation/native';
import {moderateScale, scale, verticalScale} from '../../../components/Scale';


const DocCures = () => {
  const [articleItems, setArticleItems] = useState([]);
  const doc = useSelector(state => state.info.data);
  const dispatch = useDispatch();
  const store = useStore();
  const navigation = useNavigation();
  const abortController = new AbortController();
  const handlePress = (id, title) => {
    // dispatch(getArticleId({id:id,title:title}))
    navigation.push(`Disease`, {ids: `${id}`, title: title});
  };

  function IsJsonValid(str) {
    try {
      JSON.parse(str);
    } catch (e) {
      return [];
    }
    return JSON.parse(str).blocks;
  }

  const allpost = () => {
    fetch(
      `${backendHost}/article/authallkv/reg_type/1/reg_doc_pat_id/${doc.docID}`,
      {
        signal: abortController.signal,
      },
    )
      .then(res => res.json())
      .then(json => {
        var temp = [];
        json.forEach(i => {
          if (i.pubstatus_id === 3) {
            temp.push(i);
          }
        });

        setArticleItems(temp);
      })
      .catch(err => {
        if (err.name === 'AbortError') {
          // Fetch request was aborted
          return;
        }
      });
  };

  useEffect(() => {
    allpost();

    return () => {
      // Cleanup code here
      abortController.abort(); // Cancel the fetch request when the component unmounts
    };
  }, [doc.rowno]);

  return (
    <View style={styles.container}>
      <ScrollView style={{flex: 1}}>
        {articleItems.length !== 0 ? (
          articleItems
            .filter((i, idx) => idx < 9)
            .map((i, j) => {
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
                      key={Math.random().toString(36)}
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
                          onPress={() => handlePress(i.article_id, i.title)}>
                          <Image
                            resizeMode="stretch"
                            key={Math.random().toString(36)}
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
                          <Text>
                            {content
                              ? content.map(
                                  (j, idx) =>
                                    idx < 1 && (
                                      <CenterWell
                                        key={Math.random().toString(36)}
                                        content={j.data.content}
                                        type={j.type}
                                        text={
                                          j.data.text.substr(0, 150) + '....'
                                        }
                                        title={j.data.title}
                                        message={j.data.message}
                                        source={j.data.source}
                                        embed={j.data.embed}
                                        caption={j.data.caption}
                                        alignment={j.data.alignment}
                                        imageUrl={
                                          j.data.file ? j.data.file.url : null
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
                            Dr. {doc.firstName} {doc.lastName}▪️
                            {i.published_date}
                          </Text>
                        </View>
                      </HStack>
                    </Card>
                  </View>
                </View>
              );
            })
        ) : (
          <View key={Math.random().toString(36)} style={{alignItems: 'center'}}>
            <Icon name="medical-outline" size={50} style={{opacity: 0.5}} />
            <Text style={{textAlign: 'center', fontSize: 18}}>
              No cures yet
            </Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default DocCures;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 5,
  },
});
