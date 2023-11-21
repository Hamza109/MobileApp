import {StyleSheet, Text, View, SafeAreaView,TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import {width, height, Color, FontFamily} from '../../config/GlobalStyles';
import NotificationIcon from '../../assets/img/Notification.svg';
import {headers, backendHost} from '../../components/apiConfig';
import MyLoader from '../../components/ContentLoader';
import {FlashList} from '@shopify/flash-list';
import ArticlesCard from '../../components/ArticlesCard';
import { FlatList } from 'native-base';
const ArticlesByMedicine = ({route}) => {
  const [loading, setLoading] = useState(false);
  const [initial, setInitial] = useState(9);
  const [item, setItems] = useState([]);
  const [Loaded, setLoaded] = useState(false);
  const medicineData = route.params.medicineData;

  useEffect(() => {
    itype();
  },[]);
  const itype = async () => {
    try {
      setLoading(true);

      const response = await fetch(
        `${backendHost}/isearch/medicinetype/${medicineData.type}`,
        {
          headers: headers,
        },
      );

      const json = await response.json();
   

      setInitial(prevInitial => prevInitial + 6);
      setItems(json);
      setLoaded(true)
    } catch (error) {
      console.error(error);
      // Handle the error as needed
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => console.log(medicineData));
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
        onPress={() => navigation.navigate(ARTICLES_READ,{articleId:`${item.article_id}`})}>
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
          <Text style={styles.read}>{medicineData.name}</Text>
          <NotificationIcon width={16} height={18} style={{marginTop: 5}} />
        </View>

        {/*   List of categories    */}
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
    height: 97,
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

export default ArticlesByMedicine;
