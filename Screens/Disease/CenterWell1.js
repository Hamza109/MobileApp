import React from 'react';
import { FlatList,Text } from 'react-native';
import { View} from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from 'react-native-responsive-screen';
import { Image } from 'react-native';
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';
import { color } from 'react-native-reanimated';
import { Paragraph } from 'react-native-paper';
const CenterWell1 = ({content, type, text, title, message, source, embed, caption, alignment, imageUrl, item}) =>{
    var textContent;
    if(typeof(text) == "string"){
        textContent = text.replace(/&nbsp;/g, ' ');;
    }
    return(
        <View>
            {
                {
                    'header':                           
                                    <View>
                                        <Text style={{fontSize: 16,fontWeight:'bold' ,color:'#00415e'}}>{title}</Text>
                                    </View>                        
                            ,
                    'paragraph': <View>    
                          
                                 <Text style={{color:"#00415e",fontFamily:'Raleway-Regular',fontSize:17,textAlign:'justify'}}>{textContent}</Text>  
                                              
                                </View>,
                
                    
               
                    'image': <View>
                                       <Image source={{uri:imageUrl}} style={{width: 350,height: 120}} />      
                                        <Text>
                                            {caption}
                                        </Text>
                            </View>,
                             'delimiter': <Text style={{textAlign: 'center'}}>* * *</Text>,

                'quote': <View style={{textAlign: {alignment}}}>
                            
                                 <Text style={{fontStyle: 'italic', fontSize: '1.2rem'}}>"{text}"</Text>
                             <View style={{textAlign:'center'}}>
                                 <Text style={{fontStyle:'italic'}}>- {caption}</Text>    
                             </View>
                             </View>,

'warning': <View>
<View  style={{marginBottom:220,borderWidth: 1, borderRadius: 3, backgroundColor: '#f5f09f',width:320}}>

<Text style={{fontWeight: 'bold' ,color:'red',fontSize:20}}> ⚠ </Text><Text style={{fontWeight: 'bold'}}>{title}:</Text>

<Text>{message}</Text>
</View>
</View>,

                          
                }[type]
            }
        </View>
    )
} 

export default CenterWell1; 