import { StackScreenProps } from '@react-navigation/stack';
import React, { useContext, useEffect, useState } from 'react'
import { Alert, Button, RefreshControl, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'
import { colors, stylesApp } from '../../../Themes/AppThemes'
import firestore from '@react-native-firebase/firestore';
import { AuthContext } from '../../../Context/ContextUser/AuthContext';
import { useAgenda } from '../../../Hooks/useAgenda';
import { useAddNote } from '../../../Hooks/useAddNote';


//refres config  
const wait = (timeout: any) => {
  return new Promise(resolve => setTimeout(resolve, timeout));
}
//......
interface Props extends StackScreenProps<any, any> { };

export const newNoteScreen = ({ navigation, route }: Props) => {
  //refres config  
  const [refreshing, setRefreshing] = React.useState(false);
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);
  //......

  const { AddNote } = useAddNote();

  const [stateNote, setStateNote] = useState({
    titulo: '',
    body: ''
  })
  const addNoteFun = (titel: string, body: string) => {
    if (titel == '' || body == '') {
      Alert.alert('Notas', 'Completa todos los campos')
    } else {
      AddNote(titel, body)
      navigation.navigate('AgendaScreen')
    }
  }


  return (
    <SafeAreaView>
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
          />}>
        <View style={styles.block}>
          <View style={styles.item}>
            <Text style={stylesApp.titles}>
              AGREGAR NOTA
            </Text>
          </View>

          <Text style={styles.titulos}>
            Titulo / Nombre
          </Text>
          <TextInput
            placeholderTextColor="#949494"
            style={styles.titelInput}
            onChangeText={(value) => setStateNote({ ...stateNote, titulo: value })}
            placeholder='Apuntes Fisica'
          ></TextInput>
          <Text style={styles.titulos}>
            Contenido
          </Text>
          <TextInput
            placeholderTextColor="#949494"
            style={styles.bodyInput}
            multiline={true}
            numberOfLines={9}
            onChangeText={(value) => setStateNote({ ...stateNote, body: value })}
            placeholder='El movimiento rectilíneo uniforme (m.r.u.), es aquel con velocidad constante y cuya trayectoria es una línea recta...'
          ></TextInput>

          <Button
            color={colors.primary}
            title='Agregar nota'
            onPress={() => {
              addNoteFun(stateNote.titulo, stateNote.body)

            }}
          ></Button>

        </View>
      </ScrollView>
    </SafeAreaView>
  )
}


const styles = StyleSheet.create({
  item: {
    alignItems: 'center'
  },
  titulos: {
    fontWeight: 'bold',
    paddingTop: 15
  },
  titelInput: {
    borderBottomWidth: 1,
    borderColor: '#DEDEDE',
    fontSize: 20,
    color: 'black'
  },
  bodyInput: {
    borderWidth: 1,
    borderColor: '#DEDEDE',
    marginVertical: 20,
    fontSize: 18,
    color: 'black'
  },
  block: {
    paddingHorizontal: 25,
    paddingVertical: 10
  },
  btnfuntion: {
    flexDirection: 'row',
    justifyContent: 'center'
  },
  btnSingel: {
    paddingHorizontal: 10
  }
})