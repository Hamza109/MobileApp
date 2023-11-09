import React from 'react';
import {FlatList} from 'react-native';
import {View} from 'react-native';
import { Text } from 'native-base';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {Image} from 'react-native';



import { moderateScale,verticalScale,scale,scalledPixel } from '../../components/Scale';

const CenterWell = ({
  content,
  type,
  text,
  title,
  message,
  source,
  embed,
  caption,
  alignment,
  imageUrl,
  item,
}) => {
  var textContent;
  var texts;
  if (typeof text == 'string') {
    textContent = text.replace(/&nbsp;/g, ' ');
    texts=textContent.replace("\n", "").trim();
  }
  const tex ={
    html: text
  }
  return (
    <View>
      {
        {
          header: (
            <View>
              <Text
                adjustsFontSizeToFit
                style={{
                  fontSize: 10,
                  fontWeight: 'bold',
                  textAlign: 'justify',
                }}>
                {title}
              </Text>
            </View>
          ),
          paragraph: (
          
            <View style={{width:wp('50%'),height:hp('12%')}}>
<Text numberOfLines={4} style={{fontSize:scale(12)}}>{texts}</Text>
            </View>
          ),

          image: (
            <View>
              <Image
                source={{uri: imageUrl}}
                style={{width: 350, height: 120}}
              />
              <Text adjustsFontSizeToFit>{caption}</Text>
            </View>
          ),
          delimiter: (
            <Text adjustsFontSizeToFit style={{textAlign: 'center'}}>
              * * *
            </Text>
          ),

          quote: (
            <View style={{textAlign: {alignment}}}>
              <Text style={{fontStyle: 'italic', fontSize: 1.2}}>"{text}"</Text>
              <View style={{textAlign: 'center'}}>
                <Text style={{fontStyle: 'italic'}}>- {caption}</Text>
              </View>
            </View>
          ),

          warning: (
            <View>
              <View
                style={{
                  marginBottom: 220,
                  borderWidth: 1,
                  borderRadius: 3,
                  backgroundColor: '#f5f09f',
                  width: 320,
                }}>
                <Text style={{fontWeight: 'bold', color: 'red', fontSize: 20}}>
                  ⚠
                </Text>
                <Text style={{fontWeight: 'bold'}}>{title}:</Text>

                <Text adjustsFontSizeToFit>{message}</Text>
              </View>
            </View>
          ),
        }[type]
      }
    </View>
  );
};

export default CenterWell;