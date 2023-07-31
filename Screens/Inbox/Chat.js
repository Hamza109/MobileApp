import React, { useState, useEffect } from 'react';
import { View,Text,Alert,KeyboardAvoidingView } from 'react-native';
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
import { StackActions } from '@react-navigation/native';
import { InputToolbar, Actions, Composer, Send,Message } from 'react-native-gifted-chat';
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Foundation from 'react-native-vector-icons/Foundation';
import { StatusBar } from 'native-base';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

const CHAT_SERVER_URL = 'wss://uat.all-cures.com:8000';

const Chat = ({ route }) => {
  const navigation = useNavigation()
  const chatData = route.params.messages;
  const Id = route.params.id;
  const FIRST_NAME = route.params.first_name
  const LAST_NAME=route.params.last_name
  const chatid=route.params.chatId
  const [text, setText] = useState('');
  const [messages, setMessages] = useState([]);
  const [socket, setSocket] = useState(null);
  const user=useSelector((state)=>state.userId.regId)
  const doc=useSelector((state)=>state.info.data)

  const [exist,setExist]=useState(false)
  const [url,setUrl]=useState(`http://all-cures.com:8080/cures_articleimages/doctors/${doc.rowno}.png`)
  const [selectedMessageId, setSelectedMessageId] = useState(null);

  
  useEffect(()=>{
    navigation.setOptions({
      title:`Dr. ${FIRST_NAME} ${LAST_NAME}`
    })
})


  useEffect(() => {
    setMessages(chatData.reverse());

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

      newSocket.send(`{"Room_No":"${chatid}"}`);
    }
    newSocket.onmessage = (event) => {
     
      const fromId=event.data.split(':')[0]
      const message=event.data.split(':').pop()
   

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
    const fromId = user
    const toId = Id;
    const chat_id = chatid;
    const payload = `${fromId}:${toId}:${chat_id}:${message.text}`;
   
    socket.send(payload);
  };

  const renderSend = (props) => (


     
    <Send {...props}>
      <View>
      <Icon name="send" size={24} color={'#00415e'} style={{marginBottom:10}} />
      </View>
    </Send>

  
  );
  
  function User() {
    return (
      <Svg
        xmlns="http://www.w3.org/2000/svg"
        width={40}
        height={40}
        fill="none"
        viewBox="0 0 43 43">
        <Path
          fill="#e5e5e5"
          d="M37.288 34.616A20.548 20.548 0 10.938 21.5a20.414 20.414 0 004.774 13.116l-.029.025c.103.123.22.23.326.351.132.151.275.294.411.44.412.447.835.876 1.278 1.278.135.124.275.238.411.356.47.405.954.79 1.454 1.148.065.044.124.102.188.147v-.017a20.417 20.417 0 0023.5 0v.017c.065-.045.122-.102.189-.147.499-.36.983-.743 1.454-1.148.136-.118.276-.234.41-.356.444-.404.867-.83 1.279-1.277.136-.147.277-.29.41-.441.105-.122.224-.228.327-.352l-.032-.024zM21.5 9.75a6.61 6.61 0 110 13.22 6.61 6.61 0 010-13.22zM9.76 34.616a7.338 7.338 0 017.334-7.241h8.812a7.338 7.338 0 017.334 7.241 17.537 17.537 0 01-23.48 0z"></Path>
      </Svg>)
  }




 const renderMessage = (props) => (
  <Message
    {...props}

  />
);

  return (
    <>
      <StatusBar backgroundColor={'#00415e'} barStyle={'light-content'} />
      <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={-210} style={{ flex: 1 }}>
      <GiftedChat
      wrapInSafeArea={false}
  messagesContainerStyle={{backgroundColor:'#fff'}}
        messages={messages}
        text={text}
        selectedMessageId={selectedMessageId}
        onInputTextChanged={(message) => setText(message)}
        onSend={sendMessage}
        user={{_id: `${user}`,
        name:user }}
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
        renderCustomView={null}
      // renderMessageImage
  
      parsePatterns={(linkStyle) => [
        {
          pattern: /#(\w+)/,
          style: linkStyle,
          onPress: (tag) => console.log(`Pressed on hashtag: ${tag}`),
        },
      ]}
    />
    </KeyboardAvoidingView>
    </>
  );
};

export default Chat;