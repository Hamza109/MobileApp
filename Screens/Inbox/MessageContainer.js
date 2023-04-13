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
 
 
   
  />
);







