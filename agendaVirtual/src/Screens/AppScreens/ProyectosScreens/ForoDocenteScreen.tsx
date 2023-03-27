import React, { useLayoutEffect, useState } from 'react'
import firestore from '@react-native-firebase/firestore';
import { Button, Dimensions, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
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
import { Linking} from 'react-native'
import Hyperlink from 'react-native-hyperlink'

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
                active:doc.data().active,
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
      <View style={styles.container}>
        {
          messages.map((item, index) => (
            <View style={styles.item} key={index}>
              <View style={styles.itemTitel}>
                <Text style={styles.textTitel}>{
               /*@ts-ignore */}
                  {item.titulo}
                </Text>
              </View>
              <View style={styles.itemBody}>
                <Hyperlink onPress={(url, text) => Alert.alert('Deseas ingresar al siguiente link', url, [
                  {
                    text: 'Cancel',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                  },
                  { text: 'OK', onPress: () => Linking.openURL(url) },
                ])}>
                  <Text style={styles.textBody}>{
               /*@ts-ignore */}
                    {item.body}
                  </Text>
                </Hyperlink>
              </View>
              <View style={styles.itemBtn}>
                <TouchableOpacity

                  //@ts-ignore
                  onPress={() => navigation.navigate('ResponseForo', {
                    //@ts-ignore
                    idForo: item.idRegistro,
                    //@ts-ignore
                    isActive:item.active
                  })}
                >
                  <Text style={styles.textBtn}>Agrega una participacion</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))
        }
      </View>

    )
  }

  return (

    <View style={styles.blok}>
      <Text style={stylesApp.titles}>Foro</Text>
      <ScrollView>
        <ScrollViewForo></ScrollViewForo>
        <View style={styles.footerComp}>
        </View>
      </ScrollView>
    </View>

  )
}


const styles = StyleSheet.create({
  item: {
    flex: 1,
    borderBottomWidth: 1,
    borderColor: '#E6E6E6',
    paddingTop: 30

  },
  container: {
    paddingTop: 10,
    borderTopWidth: 1,
    borderColor: '#E6E6E6',
  },
  blok: {
    alignItems: 'center',

  },
  itemTitel: {
    alignItems: 'center',
    paddingBottom: 10
  },
  textTitel: {
    fontWeight: 'bold',
    fontSize: 22,
    color: 'black'
  },
  itemBody: {
    paddingBottom: 20,
  },
  textBody: {
    color: 'black',
    fontSize: 20,
    marginLeft: 10,
  },
  itemBtn: {
    alignItems: 'flex-end'
  },
  textBtn: {
    color: colors.primary,
    fontSize: 15
  },
  footerComp: {
    marginBottom: 80
  }
})