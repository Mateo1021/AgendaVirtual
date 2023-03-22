import { StackScreenProps } from '@react-navigation/stack';
import React, { useContext, useEffect, useState } from 'react'
import { Button, RefreshControl, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'
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
              Agregar nueva nota
            </Text>
          </View>

          <Text style={styles.titulos}>
            Titulo / Nombre
          </Text>
          <TextInput
            style={styles.titelInput}
            onChangeText={(value) => setStateNote({ ...stateNote, titulo: value })}
          ></TextInput>
          <Text style={styles.titulos}>
            Contenido
          </Text>
          <TextInput
            style={styles.bodyInput}
            multiline={true}
            numberOfLines={9}
            onChangeText={(value) => setStateNote({ ...stateNote, body: value })}
          ></TextInput>

          <Button
            color={colors.primary}
            title='Agregar nota'
            onPress={() => {
              AddNote(stateNote.titulo, stateNote.body)
              navigation.navigate('AgendaScreen')
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
    fontSize: 20
  },
  bodyInput: {
    borderWidth: 1,
    borderColor: '#DEDEDE',
    marginVertical: 20,
    fontSize: 18
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