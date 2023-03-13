import React from 'react';
import { Image ,View,Text} from 'react-native';
import { InputToolbar, Actions, Composer, Send } from 'react-native-gifted-chat';
import Icon from 'react-native-vector-icons/Ionicons'

export const renderInputToolbar = (props) => (
  <InputToolbar
    {...props}

    containerStyle={{
      backgroundColor: '#fff',
      paddingTop: 6,
     paddingHorizontal:5

    
  
    
    }}

    primaryStyle={{ alignItems: 'center' }}
  >
    <Composer
    {...props}
    />
    </InputToolbar>
);






export const renderSend = (props) => (
  <Send
    {...props}

    containerStyle={{
      width: 44,
      height: 44,
      alignItems: 'center',
      justifyContent: 'center',
      marginHorizontal: 4,
    }}
  >

 <Icon name='send' onPress={props.sendMessages} size={23} color={'#00415e'}  />

  </Send>
);