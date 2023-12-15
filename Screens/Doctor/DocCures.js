import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {backendHost} from '../../components/apiConfig';
import {FlashList} from '@shopify/flash-list';
import ArticleCard from '../../components/ArticleCard';
import {ARTICLES_READ} from '../../routes';

const DocCures = ({route, navigation}) => {
  const abortController = new AbortController();
  const [articleItems, setArticleItems] = useState([]);
  const id = route.params.docId;
  const firstName = route.params.firstName;
  const secondName = route.params.secondName;
  let title = `Dr ${firstName} ${secondName}`;
  useEffect(() => {
    navigation.setOptions({
      title: title,
    });
  });

  const allpost = async () => {
    try {
      const response = await fetch(
        `${backendHost}/article/authallkv/reg_type/1/reg_doc_pat_id/${id}`,
        {
          signal: abortController.signal,
        },
      );

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const json = await response.json();
      console.log('All post of Doc', json);

      const filteredItems = json.filter(item => item.pubstatus_id === 3);

      setArticleItems(filteredItems);
    } catch (err) {
      if (err.name === 'AbortError') {
        // Fetch request was aborted
        return;
      }
      console.error('Error fetching data:', err);
    }
  };

  useEffect(() => {
    allpost();
    return () => {
      // Cleanup code here
      abortController.abort(); // Cancel the fetch request when the component unmounts
    };
  }, [id]);
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
        onPress={() =>
          navigation.navigate(ARTICLES_READ, {
            articleId: item.article_id,
            title: item.title,
            image: imageLoc,
          })
        }>
        <ArticleCard
          title={item.title}
          window_title={title}
          create_date={item.create_date}
          image_location={imageLoc}
          dc_name={item.med_type_name}
        />
      </TouchableOpacity>
    );
  };
  return (
    <SafeAreaView style={{flex: 1}}>
      <FlashList
        estimatedItemSize={100}
        keyExtractor={item => item.article_id.toString()}
        data={articleItems}
        renderItem={renderItem}
      />
    </SafeAreaView>
  );
};

export default DocCures;

const styles = StyleSheet.create({});
