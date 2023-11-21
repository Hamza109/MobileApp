import React, {useDebugValue, useEffect, useState, memo} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  Pressable,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Alert,
  Platform,
} from 'react-native';
import {FontFamily, Color} from '../../config/GlobalStyles';

import MyLoader from '../../components/ContentLoader';

import NetInfo from '@react-native-community/netinfo';
import NotificationIcon from '../../assets/img/Notification.svg';
import {width, height} from '../../config/GlobalStyles';
import {FlatList} from 'react-native-gesture-handler';
import ArticlesCard from '../../components/ArticlesCard';
import {backendHost, headers} from '../../components/apiConfig';
import {FlashList} from '@shopify/flash-list';
import {useDispatch} from 'react-redux';
const Feed = () => {
  const [isConnected, setIsConnected] = useState(true);
  const [diseaseId, setDiseaseId] = useState(null);
  const [item, setItem] = useState();
  const [Loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();
  const abortController = new AbortController();
  const signal = abortController.signal;

  const DATA = [
    {dc_id: 1, category: 'Arthritis'},
    {dc_id: 12, category: 'Blood Disorders'},
    {dc_id: 14, category: 'Bones and Joints'},
    {dc_id: 16, category: 'Brain and Nervous'},
    {dc_id: 25, category: 'Cancer'},
    {dc_id: 43, category: 'Cardiovascular'},
    {dc_id: 56, category: 'Digestive Disorders'},
    {dc_id: 73, category: 'Endocrine and metabolic Diseases'},
    {dc_id: 88, category: 'Eye Health'},
    {dc_id: 93, category: 'Foot Problems'},
    {dc_id: 95, category: 'Infection'},
    {dc_id: 97, category: 'Infectious Diseases'},
    {dc_id: 108, category: 'Injuries'},
    {dc_id: 110, category: 'Lung and Respiratory Health'},
    {dc_id: 117, category: 'Mental Health'},
    {dc_id: 131, category: 'Pain Management'},
    {dc_id: 138, category: 'Sensitive topics'},
    {dc_id: 145, category: 'Sexual Health'},
    {dc_id: 155, category: 'Skin Problems'},
    {dc_id: 163, category: 'Sleep Disorders'},
    {dc_id: 168, category: 'Urinary Disorders'},
    {dc_id: 176, category: 'Healthy Lifestyle'},
  ];
  useEffect(() => {
    NetInfo.addEventListener(state => {
      setIsConnected(state.isConnected);
    });
  }, [isConnected]);

  async function getFeaturedArticle() {
    try {
      const response = await fetch(`${backendHost}/article/allkvfeatured?limit=1`, {
        method: 'GET',
        headers: headers,
        signal: signal,
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const json = await response.json();
console.log('json',json)
      // Using map directly to create the array

      setItem(json);
      setLoaded(true);

    } catch (err) {
      console.error(err);
      // Handle errors, e.g., show an error message to the user
    }
  }

  async function getArticleByDisease() {
    try {
      const response = await fetch(
        `${backendHost}/isearch/diseases/${diseaseId}`,
        {headers: headers, signal: signal},
      );

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const json = await response.json();

      // Using map directly to create the array

      setItem(json);
      setLoaded(true);

      console.log(json);
    } catch (error) {
      if (error.name === 'AbortError') {
        console.log('Request aborted');
      } else {
        throw new Error(error);
      }
      // Handle errors, e.g., show an error message to the user
    }
  }

  useEffect(() => {
    setLoaded(false);

    if (diseaseId == null) {
      getFeaturedArticle();
    } else {
      getArticleByDisease();
    }

    return () => {
      abortController.abort();
    };
  }, [diseaseId]);
  const selectFeatured = () => {
    setDiseaseId(null);
  };

  const selectItem = item => {
    setDiseaseId(item.dc_id);
  };
  const renderItem = ({item}) => {
    let imageLoc = '';
    const imgLocation = item.content_location;
    if (imgLocation && imgLocation.includes('cures_articleimages')) {
      imageLoc =
        `https://all-cures.com:444/` +
        imgLocation.replace('json', 'png').split('/webapps/')[1];
    } else {
      imageLoc =
        'https://all-cures.com:444/cures_articleimages//299/default.png';
    }

    return (
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => console.log('Pressed')}>
        <ArticlesCard
          title={item.title}
          window_title={item.authors_name}
          create_date={item.create_date}
          image_location={imageLoc}
          dc_name={item.dc_name}
        />
      </TouchableOpacity>
    );
  };

  return (
    // feed container
    <SafeAreaView style={styles.feedContainer}>
      {/* header component */}

      <View style={styles.feedHeader}>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 36,
            marginLeft: 5,
          }}>
          <Text style={styles.read}>Read</Text>
          <NotificationIcon width={16} height={18} style={{marginTop: 5}} />
        </View>

        {/*   List of categories    */}

        <ScrollView
          horizontal
          style={{padding: 5, flex: 1, marginTop: 20}}
          showsHorizontalScrollIndicator={false}>
          <View style={{paddingRight: 11}}>
            <TouchableOpacity
              style={
                Platform.OS === 'ios'
                  ? diseaseId === null
                    ? styles.activeLabel
                    : styles.inactiveLabel
                  : null
              }
              onPress={selectFeatured}>
              <Text
                style={[
                  styles.featured,
                  diseaseId === null
                    ? styles.activeLabel
                    : styles.inactiveLabel,
                ]}>
                Featured
              </Text>
            </TouchableOpacity>
          </View>

          {DATA.map((item, index) => {
            return (
              <View key={item.dc_id} style={{paddingHorizontal: 11}}>
                <TouchableOpacity
                  style={
                    Platform.OS === 'ios'
                      ? item.dc_id === diseaseId
                        ? styles.activeLabel
                        : styles.inactiveLabel
                      : null
                  }
                  onPress={() => {
                    selectItem(item);
                  }}>
                  <Text
                    style={[
                      styles.category,
                      item.dc_id === diseaseId
                        ? styles.activeLabel
                        : styles.inactiveLabel,
                    ]}>
                    {item.category}
                  </Text>
                </TouchableOpacity>
              </View>
            );
          })}
        </ScrollView>
      </View>
      {Loaded ? (
        <FlashList
          estimatedItemSize={100}
          keyExtractor={item => item.article_id.toString()}
          data={item}
          renderItem={renderItem}
        />
      ) : (
        <MyLoader />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  feedContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  feedHeader: {
    height: height * 0.17,
    width: width,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
  },
  read: {
    color: Color.colorDarkslategray,
    fontWeight: '700',
    fontSize: 25,
  },
  category: {
    fontFamily: FontFamily.poppinsRegular,
    fontWeight: '700',
    fontSize: 10,
    width: 'auto',
  },

  featured: {
    fontFamily: FontFamily.poppinsBold,
    color: Color.colorSilver,
    fontSize: 10,
  },

  activeLabel: {
    color: Color.colorDarkslategray,
    borderBottomWidth: 2,
    borderColor: '#5E4DB0',
  },

  inactiveLabel: {
    color: Color.colorSilver,
  },
});

export default memo(Feed);


