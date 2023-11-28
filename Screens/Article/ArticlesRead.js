import {View, Text, Pressable,SafeAreaView} from 'react-native';
import React, {useEffect, useState} from 'react';
import NetInfo from '@react-native-community/netinfo';
import {backendHost} from '../../components/apiConfig';
import {ARTICLES_BY_MEDICINE} from '../../routes';

const ArticlesRead = ({route, navigation}) => {
  const [isConnected, setIsConnected] = useState(true);
  const [data, setData] = useState([]);
  const [isVisible, setIsVisible] = useState(false);
  const [items, setItems] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [id, setId] = useState(route.params.articleId);
  const [response, setResponse] = useState([]);
  const [medicineType, setMedicineType] = useState();
  const [medicineName, SetMedicineName] = useState();
  useEffect(() => {
    NetInfo.addEventListener(state => {
      setIsConnected(state.isConnected);
    });
  }, [isConnected]);
  useEffect(() => {
    const getArticle = async () => {
      try {
        if (isConnected) {
          setIsLoaded(false);

          const response = await fetch(`${backendHost}/article/${id}`);
          const json = await response.json();
          console.log(json.medicine_type);
          

          setData(json);
          

          const contentBlocks = JSON.parse(
            decodeURIComponent(json.content),
          ).blocks;
          setItems(contentBlocks);
          console.log(content)

          const articleTitle = json.title;
          const formattedTitle = articleTitle.replace(/ /g, '-');
         
        }
      } catch (err) {
        console.error(err);
        // Handle the error as needed
      } finally {
        setIsLoaded(true);
      }
    };

    // Call the function immediately
    getArticle();

    // Cleanup function (will be called when the component unmounts or when isConnected changes)
    return () => {
      // You may or may not want to call getArticle again when cleaning up
      // Decide based on your requirements
    };
  }, [isConnected, id]); // Dependencies for the useEffect
  return (
    <SafeAreaView>
      <Text>ArticlesRead</Text>
      <Text>hey{id} </Text>

      <Pressable
        style={{width: 200, height: 200, backgroundColor: '#f08'}}
        onPress={() =>
          navigation.navigate(ARTICLES_BY_MEDICINE, {
            medicineData: {
              name: data.medicine_type_name,
              type: data.medicine_type,
            },
          })
        }>
        <Text>{data.medicine_type_name}</Text>
        <Text></Text>
      </Pressable>
    </SafeAreaView>
  );
};

export default ArticlesRead;
