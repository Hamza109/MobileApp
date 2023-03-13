import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';
import { Image } from 'react-native';
import initialMessages from './messages';
import { Svg, Path } from 'react-native-svg';
import {
  renderInputToolbar,
  renderActions,
  renderComposer,
  renderSend,
} from './InputToolbar';
import {
  renderBubble,
  renderSystemMessage,
  renderMessage,
  renderMessageText,
  renderCustomView,
} from './MessageContainer';
import { InputToolbar, Actions, Composer, Send } from 'react-native-gifted-chat';
import Icon from 'react-native-vector-icons/Ionicons';
import Foundation from 'react-native-vector-icons/Foundation';
import { StatusBar } from 'native-base';

const CHAT_SERVER_URL = 'ws://all-cures.com:8000';

const Chat = ({ route }) => {
  const chatData = route.params.messages;
  const [text, setText] = useState('');
  const [messages, setMessages] = useState([]);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    setMessages(chatData.reverse());
    console.log(messages)
    if (!socket || socket.readyState === WebSocket.CLOSED) {
        setupSocket();
      }
      return () => {
        if (socket && socket.readyState === WebSocket.OPEN) {
          socket.close();
        }
      };
  }, [socket]);
  
  const setupSocket = () => {
    const newSocket = new WebSocket(CHAT_SERVER_URL);
    newSocket.onopen = (event) => {
      console.log('Connected to the Chat Server');
      newSocket.send('User');
    }
    newSocket.onmessage = (event) => {
      console.log(`Message ${Math.random()*1000}: ${event.data}`);
      const fromId=event.data.split(':')[0]
      const message=event.data.split(':').pop()
      console.log('from:',fromId);

      const transformedMessages = 
       {
          _id: Math.random().toString(36).substring(2,9),
          text: message,
          createdAt: new Date(),
          user: {
            _id: fromId,   
          },

          
        }
        setMessages((prevMessages) => GiftedChat.append(prevMessages, transformedMessages));
        

    };
    newSocket.onclose = function (event) {
      if (event.wasClean) {
        console.log(`[close] Connection closed cleanly, code=${event.code} reason=${event.reason}`);
      } else {
        console.log('[close] Connection died');
      }
    };
    setSocket(newSocket);
  };


  const sendMessage = (newMessages = []) => {
    setMessages((prevMessages) => GiftedChat.append(prevMessages, newMessages));
    const message = newMessages[0];
    const fromId = '18';
    const toId = '3';
    const chat_id = 1;
    const payload = `${fromId}:${toId}:${chat_id}:${message.text}`;
    console.log(payload);
    socket.send(payload);
  };

  const renderSend = (props) => (


    <View style={{ flexDirection: 'row', alignItems: 'center', }}>
      <Foundation name="paperclip" size={24} color="#00415e"  style={{ marginRight: 5 ,marginLeft:5}} />
    <Send {...props}>
      <View>
      <Icon name="send" size={24} color={'#00415e'} style={{marginBottom:10}} />
      </View>
    </Send>
  </View>
  
  );

  return (
    <>
      <StatusBar backgroundColor={'#00415e'} barStyle={'light-content'} />
      <GiftedChat
        messages={messages}
        text={text}
        onInputTextChanged={(message) => setText(message)}
        onSend={sendMessage}
        user={{ _id: 18 }}
        alignTop
        alwaysShowSend
        scrollToBottom
        bottomOffset={26}
        renderInputToolbar={renderInputToolbar}


      
      renderSend={renderSend}
  renderAvatar={null}
      renderBubble={renderBubble}
      renderSystemMessage={null}
      renderMessage={renderMessage}
      renderMessageText={renderMessageText}
   
      // renderMessageImage
  
      isCustomViewBottom
      messagesContainerStyle={{ backgroundColor: '#fff' }}
      parsePatterns={(linkStyle) => [
        {
          pattern: /#(\w+)/,
          style: linkStyle,
          onPress: (tag) => console.log(`Pressed on hashtag: ${tag}`),
        },
      ]}
    />
    </>
  );
};

export default Chat;