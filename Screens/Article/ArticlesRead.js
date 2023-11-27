import {View, Text, Pressable,StyleSheet, SafeAreaView,Image, ScrollView} from 'react-native';
import React, {useEffect, useState} from 'react';
import NetInfo from '@react-native-community/netinfo';
import {backendHost} from '../../components/apiConfig';
import {ARTICLES_BY_MEDICINE} from '../../routes';
import { Border, Color, FontFamily } from '../../config/GlobalStyles';
import moment from 'moment';
import Dot from '../../assets/img/dot.svg';
import Right from '../../assets/img/RIGHT.svg';
import { width,height } from '../../config/GlobalStyles';
import CenterWell1 from '../Disease/CenterWell1';
import { color } from 'react-native-reanimated';
import { FlashList } from '@shopify/flash-list';
import RelatedCard from '../../components/RelatedCard';
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
  const [coverImage,setCoverImage]=useState(route.params.image)
  const abortController = new AbortController();
  const signal = abortController.signal;
                                                                                                          
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
      showsVerticalScrollIndicator={false}>
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


          <View style={{paddingVertical:20}}>
            <Text style={[styles.h2_text,{color:'#000'}]}>Approach</Text>
            <View style={styles.approachCard}>
              <Image source={require('../../assets/img/ayurvedic.jpg')} style={styles.approachImage}  />

              <View style={styles.approachData}>
                <Text style={{fontFamily:FontFamily.poppinsRegular,fontSize:8,color:Color.colorDarkslategray}} >School Of Medicine</Text>
                <Text style={{fontFamily:FontFamily.poppinsBold,fontSize:15,color:Color.colorDarkslategray}}>{data.medicine_type_name}</Text>
                <Text style={{color:'#5E4DB0',fontFamily:FontFamily.poppinsBold,fontSize:13,fontWeight:'600'}}>View More <Right width={5} height={8} /></Text>
              </View>

            </View>
          </View>


        <View style={{paddingVertical:20}}>
          <Text style={[styles.h2_text,{color:Color.colorDarkslategray}]} >Related</Text>
        </View>

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
           return <RelatedCard
           author={related.authors_name} 
           title={related.title}
           image={imageLoc}
           published_date={related.published_date}
           />
        
        })
        }
         


      </ScrollView>

      
     
    

    </SafeAreaView>
  );
};
const styles=StyleSheet.create({

  readContainer:{
    flex:1,
    backgroundColor:'#fff',
    paddingHorizontal:26,
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

