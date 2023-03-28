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
import Icon from 'react-native-vector-icons/Ionicons';

import dayjs from 'dayjs';
import 'dayjs/locale/es'
import { colors } from '../../../Themes/AppColors';

// @ts-ignore
export const ForoScreen = ({ route }) => {



  function sumarFechasConHoras(fechaHora: any, horasASumar: any) {
    // Convertir la fecha con hora a objeto Date
    let fechaHoraObj = new Date(fechaHora);

    // Sumar las horas
    fechaHoraObj.setHours(fechaHoraObj.getHours() + horasASumar);

    // Devolver la nueva fecha con hora
    return fechaHoraObj;
  }



  const [messages, setMessages] = useState([]);
  const navigation = useNavigation();
  const { authState } = useContext(AuthContext);


  useLayoutEffect(() => {
    var unsubscribe = firestore().collection("chats").orderBy('createdAt', 'desc')
      .onSnapshot((querySnapshot) => {
        var msj: any = [];
        querySnapshot.forEach((doc) => {
          // @ts-ignore
          if (doc._data.cours == route.params.idForo) {
            msj.push(
              {
                _id: doc.data()._id,
                createdAt: sumarFechasConHoras(doc.data().createdAt.toDate(), -5),
                text: doc.data().text,
                cours: doc.data().cours,
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
        _id: _id,
        createdAt: createdAt,
        text: text,
        cours: route.params.idForo,
        user: user
      })
  }, []);



  const renderSend = (sendProps: any) => {
    const { text, messageIdGenerator, user, onSend } = sendProps

    if (text.trim().length > 0) {
      return (
        <TouchableOpacity
          style={{ padding: 10 }}
          onPress={() => onSend({ text: text.trim(), user: user, _id: messageIdGenerator() }, true)}
        >
          <Icon name={'rocket'} size={25} color={colors.primary} />
        </TouchableOpacity>
      );
    }
    return null;
  }

  return (
    // <>
    //   {messages.map(message => (
    //     <Text key={message._id}>{message.text}</Text>
    //   ))}
    // </>
    <GiftedChat
      //@ts-ignore
      textInputStyle={{ color: 'black' }}
      renderSend={renderSend}
      locale="es"
      renderUsernameOnMessage={true}
      messages={messages}
      showAvatarForEveryMessage={false}
      showUserAvatar={false}
      onSend={messages => onSend(messages)}
      messagesContainerStyle={{
        backgroundColor: '#fff'
      }}

      placeholder='Mensaje'
      user={{
        _id: authState.uid,
        avatar: authState.photoURL,
        name: authState.displayName
      }}
    />
  );
}