import React from 'react';
import {FlatList} from 'react-native';
import {View} from 'react-native';
import { Text } from 'native-base';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {Image} from 'react-native';
import {
  Table,
  TableWrapper,
  Row,
  Rows,
  Col,
  Cols,
  Cell,
} from 'react-native-table-component';
import { useResponsiveFontSize } from 'react-native-responsive-dimensions';
import { RFPercentage } from 'react-native-responsive-fontsize';
import {Paragraph} from 'react-native-paper';
import {scale} from 'react-native-size-matters';
import RenderHTML from 'react-native-render-html';
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
  if (typeof text == 'string') {
    textContent = text.replace(/&nbsp;/g, ' ');
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
          
            <View style={{width:wp('50%'),height:hp('15%')}}>

          <RenderHTML source={tex} contentWidth={wp('40%')}    tagsStyles = {{
       span:  {fontSize: 16}, 
       b:     {fontSize: 16, color: '#00415e'},
       p:{color:'#00415e'},
          body:{color:'grey',fontSize:wp('3.5%')}
    }} />
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
