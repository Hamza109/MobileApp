import {View, Text, Pressable,StyleSheet, SafeAreaView,Image, ScrollView, TouchableOpacity,Animated} from 'react-native';
import React, {useEffect, useState,useRef} from 'react';
import NetInfo from '@react-native-community/netinfo';
import {backendHost} from '../../components/apiConfig';
import {ARTICLES_BY_MEDICINE, ARTICLES_READ} from '../../routes';
import { Border, Color, FontFamily } from '../../config/GlobalStyles';
import moment from 'moment';
import Dot from '../../assets/img/dot.svg';
import Right from '../../assets/img/RIGHT.svg';
import { width,height } from '../../config/GlobalStyles';
import CenterWell1 from '../Disease/CenterWell1';
import { color } from 'react-native-reanimated';
import { FlashList } from '@shopify/flash-list';
import RelatedCard from '../../components/RelatedCard';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { useIsFocused } from '@react-navigation/native';
const ratio=width/378 
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
  const [relatedItem,setRelatedItem] =useState([])
  const abortController = new AbortController();
  const signal = abortController.signal;
  const scrollY = useRef(new Animated.Value(0)).current;
  const tabBarHeight = useBottomTabBarHeight();
  const isFocused = useIsFocused();
  const scrollViewRef = useRef(null)
  const translateY = scrollY.interpolate({
    inputRange: [0, tabBarHeight],
    outputRange: [0, tabBarHeight],
    extrapolate: 'clamp',
  });
  const handleScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { y: scrollY } } }],
    { useNativeDriver: false }
  );
  useEffect(() => {
  
    if (scrollViewRef.current) {
      // Attach event listeners to the ScrollView
      scrollViewRef.current.getNode().scrollResponderHandleScroll = handleScroll;

      // Clean up listeners when the component unmounts
      return () => {
        delete scrollViewRef.current.getNode().scrollResponderHandleScroll;
      };
    }
  }, [scrollY, isFocused]);


                                                                                                          
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

          const response = await fetch(`${backendHost}/article/${id}`,{
            signal:signal
          });
          const json = await response.json();
      
          
           

    const relatedArticlesResponse = await fetch(`${backendHost}/isearch/${json.dc_name}`,{
               signal:signal
              })
      const relatedArticlesJson= await relatedArticlesResponse.json()
      console.log('relatedItems',relatedArticlesJson[0].authors_name)

      setData(json)
      setRelatedItem(relatedArticlesJson)
             
              
          const contentBlocks = JSON.parse(
            decodeURIComponent(json.content),
          ).blocks;
        
          setItems(contentBlocks);

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
      abortController.abort();
    };
  }, [isConnected, id]); // Dependencies for the useEffect
  return (
    <SafeAreaView style={styles.readContainer}>

      <ScrollView
       onScroll={handleScroll}
       scrollEventThrottle={16}
      showsVerticalScrollIndicator={false}>
        <View  style={{paddingBottom:20,paddingHorizontal:3}}>
        <Text style={styles.title}>
        {data.title}
      </Text>
      
      <Text style={styles.time}>
      {moment(`${data.create_date}`, 'YYYYMMDD').fromNow()}    <Dot height={5} width={5} />    {data.authors_name}
      </Text>

      {/* <View style={{backgroundColor:'#363636',width:'100%',height:378*ratio,marginTop:11,alignItems:'center',justifyContent:'center'}}>
        <Image source={{uri:coverImage}} style={styles.coverImage} />
      </View> */}

      

      {items.map((i, key) => (
                  <View  style={{marginTop:11}}  key={Math.random().toString(36)}>
                    <CenterWell1
                       key={Math.random().toString(36)}
                      pageTitle={i.title}
                      content={i.data.content}
                      type={i.type}
                      text={i.data.text}
                      title={i.data.title}
                      message={i.data.message}
                      source={i.data.source}
                      embed={i.data.embed}
                      caption={i.data.caption}
                      alignment={i.data.alignment}
                      imageUrl={i.data.file ? i.data.file.url : null}
                    />
                  </View>
                ))}
</View>

          <View style={{marginBottom:20,paddingHorizontal:3}}>
            <Text style={[styles.h2_text,{color:'#000'}]}>Approach</Text>
            <View style={styles.approachCard}>
              <Image source={require('../../assets/img/ayurvedic.jpg')} style={styles.approachImage}  />

              <View style={styles.approachData}>
                <Text style={{fontFamily:FontFamily.poppinsRegular,fontSize:8,color:Color.colorDarkslategray}} >School Of Medicine</Text>
                <Text style={{fontFamily:FontFamily.poppinsBold,fontSize:15,color:Color.colorDarkslategray}}>{data.medicine_type_name}</Text>
                <TouchableOpacity onPress={()=>{navigation.navigate(ARTICLES_BY_MEDICINE,{medicineData:{name:data.medicine_type_name,type:data.medicine_type}})}}>
                <Text style={{color:'#5E4DB0',fontFamily:FontFamily.poppinsBold,fontSize:13,fontWeight:'600'}}>View More <Right width={5} height={8} /></Text>
                </TouchableOpacity>
              </View>

            </View>
          </View>


        <View style={{paddingVertical:20,paddingHorizontal:3}}>
          <Text style={[styles.h2_text,{color:Color.colorDarkslategray}]} >Related</Text>
 

        {
        relatedItem.filter ((item,index)=>index<7).map((related,key)=>{
          let imageLoc = '';
          const imgLocation = related.content_location;
          if (imgLocation && imgLocation.includes('cures_articleimages')) {
            imageLoc =
              `https://all-cures.com:444/` +
              imgLocation.replace('json', 'png').split('/webapps/')[1];
          } else {
            imageLoc =
              'https://all-cures.com:444/cures_articleimages//299/default.png';
          }
           return (
           <TouchableOpacity onPress={()=>{navigation.push(ARTICLES_READ,{articleId:related.article_id})}} activeOpacity={0.7} key={`${key}-${related.articleId}`} >
           <RelatedCard
    
           author={related.authors_name} 
           title={related.title}
           image={imageLoc}
           published_date={related.published_date}
           />
           </TouchableOpacity>
           )
        })
        }
         </View>
         


      </ScrollView>

      
     
    

    </SafeAreaView>
  );
};
const styles=StyleSheet.create({

  readContainer:{
    flex:1,
    backgroundColor:'#fff',
    paddingHorizontal:23,
    paddingVertical:20
  
    
  }
,
title:{
  color:Color.colorDarkslategray,
    fontFamily:FontFamily.poppinsRegular,
    fontWeight:'700',
    fontSize:23,
},
coverImage:{
  width:'100%',
  height:378*ratio,
  borderRadius:Border.br_10xs
  
 
},
time: {
  fontSize: 8,
  fontFamily: FontFamily.poppinsRegular,
  lineHeight: 12,
  color:Color.colorDarkgray,
  fontWeight:'700',
  marginTop:10
},
h2_text:{
  fontFamily:FontFamily.poppinsBold,
  fontSize:18
},
approachCard:{
flexDirection:'row',
width:'100%',
marginTop:20
},
approachData:{
justifyContent:'space-between',
marginLeft:10
},
approachImage:{
width:105,
height:105
},


})


export default ArticlesRead;

