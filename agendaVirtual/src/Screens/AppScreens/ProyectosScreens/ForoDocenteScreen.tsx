import React, { useLayoutEffect, useState } from 'react'
import firestore from '@react-native-firebase/firestore';
import { Button, Dimensions, ScrollView, StyleSheet, Text, View } from 'react-native';
import { CreateRegForo } from '../../../testing/CreateRegForo';
import { colors, stylesApp } from '../../../Themes/AppThemes';
import Carousel from 'react-native-snap-carousel';
import { TaskCard } from '../../../Components/TaskCard';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { Card, CardTitle, CardContent, CardAction, CardButton, CardImage } from 'react-native-material-cards';
import { Alert, Modal, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ResponseForo } from './ResponseForo';
// @ts-ignore
export const ForoDocenteScreen = ({ route }) => {
  const navigation = useNavigation();

  const [messages, setMessages] = useState([]);



  useLayoutEffect(() => {
    var unsubscribe = firestore().collection("registrosForo").orderBy('createdAt', 'desc')
      .onSnapshot((querySnapshot) => {
        var msj: any = [];
        querySnapshot.forEach((doc) => {
          // @ts-ignore
          if (doc._data.codProyecto == route.params.idForo) {
            // @ts-ignore
            msj.push(
              {
                body: doc.data().body,
                createdAt: doc.data().createdAt.toDate(),
                codProyecto: doc.data().codProyecto,
                file: doc.data().file,
                titulo: doc.data().titulo,
                idRegistro: doc.data().idRegistro,
              }
            );
          }
        });
        setMessages(msj)
      });

    return unsubscribe;

  }, []);



  function ScrollViewForo() {
    
    return (
      <ScrollView>
        {
          messages.map((item, index) => (
            
            <View style={styles.item} key={index}>
              <Card>
                {/*@ts-ignore */}
                <CardContent textStyle={stylesApp.textCardBody} text={item.body} />
                <CardAction
                  textStyle={stylesApp.textCardFooter}
                  separator={true}
                  inColumn={false}>

                  <CardButton
                    textStyle={stylesApp.textCardFooterButtom}
                    //@ts-ignore
                    onPress={() => navigation.navigate('ResponseForo', {
                      //@ts-ignore
                      idForo:item.idRegistro,
                    })}
                    // @ts-ignore
                    title={'Agregar un comentario'}
                    color='black'
                  />
                </CardAction>
              </Card>
            </View>
          ))
        }
      </ScrollView>
    )
  }
  

  return (
    <View>
      <ScrollViewForo></ScrollViewForo>
    </View>
  )
}


const styles = StyleSheet.create({
  item: {
    marginTop: 30
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'black',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
})