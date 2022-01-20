import React, {useState, useEffect} from 'react';
import {Dimensions, ImageBackground} from 'react-native';
import {
  View,
  ScrollView,
  Text,
  Button,
  FlatList,
  StyleSheet,
  StatusBar,
  BackHandler,
  Alert,
  TouchableOpacity,
  TouchableHighlight,
  Image,
} from 'react-native';
import ArticleHeader from '../search/ArticleHeader';
import {useRef} from 'react';
import {useIsFocused, useTheme} from '@react-navigation/native';
import axios from 'axios';
import Autocomplete from './Autocomplete';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Card, Checkbox, Modal, Paragraph, Portal, Provider} from 'react-native-paper';

import Icon from 'react-native-vector-icons/FontAwesome';
import PhoneInput from 'react-native-phone-number-input';
import {
  HStack,
  Stack,
  Center,
  Heading,
  NativeBaseProvider,
  Container,
} from 'native-base';
import {backendHost} from '../../components/apiConfig';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import CenterWell from '../Disease/CenterWell'
import Heart from"../../assets/img/heart.png";
import Carousel from 'react-native-snap-carousel';


const ArticlePreview = () => {
    const [items, setItems] = useState([])
    const [isLoaded, setLoaded] = useState(true)

    
    function diseasePosts(type){                     // For specific blogs like "/blogs/diabetes"
        // if(type){
          fetch(`${backendHost}/isearch/${type}`)
          .then((res) => res.json())
          .then((json) => {
            setLoaded(true)
            setItems(json)
          })
          .catch(err => null)
      }

    function allPosts() {                        // For all available blogs "/blogs"
        fetch(`${backendHost}/article/allkv?limit=10`)
          .then((res) => res.json())
          .then((json) => {
            var temp = []
    
                json.forEach(i => {
                    if(i.pubstatus_id === 3 && i.type.includes(2)){
                        temp.push(i)
                    }
                });
                setItems(temp)
            
            
          
      
          })
          .catch(err => null)
    }

    

    function IsJsonValid(str) {
        try {
            JSON.parse(str);
        } catch (e) {
            return [];
        }
        return JSON.parse(str).blocks;
    }

    useEffect(() => {
        allPosts()
    }, [])
function renderItem(){
    const {authors_name, source, color} = items;
    return (
      <View style={{marginRight: 13}}>
        <Card
          style={{
            width: wp('90%'),
            height: hp('25%'),
            backgroundColor: '#00415e',
            borderRadius: 20,
          }}
          >
          <Image
            style={{
              alignContent:'center',
              width: wp('24%'),
              height: hp('15%'),
              position: 'relative',
              top: 42,
              left: 11,
            }}
            source={source}
          />
          <Text
            style={{
              color: '#fff',
              fontWeight: '500',
              position: 'relative',
              bottom: 10,
              left: 9,
            }}>
            {authors_name}
          </Text>
        </Card>
      </View>
    );
}
  
        return(
        <>
        <View>
            <View>
            <View >

               
            </View>
               {/* <View className="comman-heading">
                  <View className="h4 float-left mr-4">Recent Articles</View> */}
                {/* <span><Link className="btn btn-article-search color-white" to="/cures">All Articles</Link></span> */}

               {/* </View> */}
            </View>
            <View>
            <View >
                {
                    items.length !== 0?
                    items.filter((i, idx) => idx < 9).map((i) => {
                    var content = []
                    var imgLocation = i.content_location
                    var imageLoc = '';
                    if(i.content){
                        content = IsJsonValid(decodeURIComponent(i.content))
                    }
                    if(imgLocation && imgLocation.includes('cures_articleimages')){
                        imageLoc = `https://all-cures.com:444/`+imgLocation.replace('json', 'png').split('/webapps/')[1]
                    } else {
                        imageLoc = 'https://all-cures.com:444/cures_articleimages//299/default.png'
                    }
                    return(
                    <View>
                    <View>
                    <FlatList data={items}
                  inverted
                  horizontal
                    renderItem={renderItem}
                    sliderWidth={wp('100%')}
                    itemWidth={wp('100%')}
                    
                    />
    
                        <View>

                    
                            <View>
                              
                                {/* <Paragraph>
                                    {
                                        content?
                                            content.map((j, idx) => idx<1 && (
                                                <CenterWell
                                                    content = {j.data.content}
                                                    type = {j.type}
                                                    text = {j.data.text.substr(0, 100) + '....'}
                                                    title = {j.data.title}
                                                    message = {j.data.message}
                                                    source = {j.data.source}
                                                    embed = {j.data.embed}
                                                    caption = {j.data.caption}
                                                    alignment = {j.data.alignment}
                                                    imageUrl = {j.data.file? j.data.file.url: null}
                                                    url = {j.data.url}
                                                />
                                            ))
                                            : null
                                    }
                                </Paragraph> */}
                            </View>
                        </View>
                    </View>
                </View>
                )}
                
                // : null
                
                ): 
                <Text>We do not have any cures for this condition yet but our editorial team is working on it. In the meantime, if you have a cure, Please Click Here to add the cure to our site.</Text>
            }
            </View>
            </View>
            </View>
        </>
    )

}

export default ArticlePreview