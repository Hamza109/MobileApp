import React from 'react';
import {FlatList, Text} from 'react-native';
import {View} from 'react-native';
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
import RenderHTML from 'react-native-render-html';
import { color } from 'native-base/lib/typescript/theme/styled-system';
const SubCenterWell = ({
  content,
  type,
  text,
  title,
  message,
  caption,
  alignment,
  imageUrl,
  item,
}) => {


  return (
    <View>
      {
        {
          header: (
            <View>
              <Text
                adjustsFontSizeToFit
                style={{fontSize: 17, fontWeight: 'bold', color: '#00415e'}}>
                {title}
              </Text>
            </View>
          ),
          paragraph: (
            <View style={{color:'#00415e'}}>
           <Text>{text}</Text>
             
            </View>
          ),

          image: (
            <View>
              <Image
              resizeMode='stretch'
                source={{uri: imageUrl}}
                style={{width: wp('90%'), height: 150}}
              />
              <Text>{caption}</Text>
            </View>
          ),
          delimiter: <Text style={{textAlign: 'center'}}>* * *</Text>,

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
                  {' '}
                  ⚠{' '}
                </Text>
                <Text style={{fontWeight: 'bold'}}>{title}:</Text>

                <Text>{message}</Text>
              </View>
            </View>
          ),
        }[type]
      }
    </View>
  );
};

export default SubCenterWell;
