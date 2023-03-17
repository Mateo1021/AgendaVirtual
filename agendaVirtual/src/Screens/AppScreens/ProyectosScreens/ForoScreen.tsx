import React, {
  useState,
  useEffect,
  useLayoutEffect,
  useCallback
} from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';
import {
  collection,
  addDoc,
  orderBy,
  query,
  onSnapshot
} from 'firebase/firestore';
import { signOut } from 'firebase/auth';
import { useNavigation } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';
import { database } from '../../../DataBase/requestFirebase';
import { AuthContext } from '../../../Context/ContextUser/AuthContext';
import { useContext } from 'react';
import firestore from '@react-native-firebase/firestore';

  // @ts-ignore
export const ForoScreen = ({route}) => {
  

  const [messages, setMessages] = useState([]);
  const navigation = useNavigation();
  const { authState } = useContext(AuthContext);
console.log(authState);


  useLayoutEffect(() => {


  
      var unsubscribe = firestore().collection("chats").orderBy('createdAt', 'desc')
      .onSnapshot((querySnapshot) => {
        var msj:any = [];
        querySnapshot.forEach((doc) => {
            // @ts-ignore
          if(doc._data.cours == route.params.idForo){
            msj.push(
              {
                _id: doc.data()._id,
                createdAt:doc.data().createdAt.toDate(),
                text: doc.data().text,
                cours:doc.data().cours,
                user: doc.data().user
              }
            );
          }
        });
        setMessages(msj)
    });


  return unsubscribe;
    }, []);

  const onSend = useCallback((messages = []) => {
      setMessages(previousMessages =>
        GiftedChat.append(previousMessages, messages)
      );
      // setMessages([...messages, ...messages]);
      const { _id, createdAt, text, user } = messages[0];    


      firestore()
      .collection('chats').doc()
      .set({
        _id:_id,
        createdAt:createdAt,
        text:text,
        cours:route.params.idForo,
        user:user
      })
    }, []);

    return (
      // <>
      //   {messages.map(message => (
      //     <Text key={message._id}>{message.text}</Text>
      //   ))}
      // </>
      <GiftedChat
        messages={messages}
        showAvatarForEveryMessage={false}
        showUserAvatar={false}
        onSend={messages => onSend(messages)}
        messagesContainerStyle={{
          backgroundColor: '#fff'
        }}

        user={{
          _id: authState.uid,
          avatar: 'https://i.pravatar.cc/300'
        }}
      />
    );
}