import React from 'react';
import { View, Text,Image } from 'react-native';
import { Avatar, Bubble, SystemMessage, Message, MessageText } from 'react-native-gifted-chat';



export const renderBubble = (props) => (
  <Bubble
    {...props}

    wrapperStyle={{
        right: {
          backgroundColor: '#588092',
        
        }
      }}
 
    // renderTime={() => <Text>Time</Text>}
    // renderTicks={() => <Text>Ticks</Text>}
   
  />
);



export const renderMessage = (props) => (
  <Message
    {...props}
    containerStyle={{
        backgroundColor:'#00415e'
    }}
    // renderDay={() => <Text>Date</Text>}
   
  />
);

export const renderMessageText = (props) => (
  <MessageText
    {...props}
  

  />
);

