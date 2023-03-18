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
// @ts-ignore
export const ForoDocenteScreen = ({ route }) => {


  const [modalVisible, setModalVisible] = useState(false);
  const [messages, setMessages] = useState([]);
  const [respuestas, setrespuestas] = useState([])


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
                codForo: doc.data().codForo,
                cod_registro: doc.data().cod_registro,
                file: doc.data().file
              }
            );
          }
        });
        setMessages(msj)
      });

    return unsubscribe;

  }, []);

useLayoutEffect(() => {
  var unsubscribe = firestore().collection("respuestas").orderBy('createdAt', 'desc')
  .onSnapshot((querySnapshot) => {
    var res: any = [];
    querySnapshot.forEach((doc) => {
      // @ts-ignore
      if (doc._data.codProyecto == route.params.idForo) {
        // @ts-ignore
        res.push(
          {
            bodyMsj: doc.data().bodyMsj,
            createdAt: doc.data().createdAt.toDate(),
            codRegistro: doc.data().codRegistro,
            idUser: doc.data().idUser,
          }
        );
      }
    });
    setrespuestas(res)
  });

return unsubscribe;

}, [])
  function ScrollViewForo() {
    return (
      <ScrollView>
        {
          messages.map((item, index) => (
            <View style={styles.item}>
              <Card>
                {/*@ts-ignore */}
                <CardContent textStyle={stylesApp.textCardBody} text={item.body} />
                <CardAction
                  textStyle={stylesApp.textCardFooter}
                  separator={true}
                  inColumn={false}>

                  <CardButton
                    textStyle={stylesApp.textCardFooterButtom}
                    onPress={() => { setModalVisible(true) }}
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
  function RenderInfoRegistro() {

    return (
      <View style={styles.centeredView}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
            setModalVisible(!modalVisible);
          }}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
            {/* @ts-ignore */}
              <Text style={styles.modalText}>asd</Text>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => setModalVisible(!modalVisible)}>
                <Text style={styles.textStyle}>Hide Modal</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
      </View>
    )
  }

  return (
    <View>
      <Text>Probadno foro</Text>
      <ScrollViewForo></ScrollViewForo>
      <RenderInfoRegistro></RenderInfoRegistro>
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
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
})