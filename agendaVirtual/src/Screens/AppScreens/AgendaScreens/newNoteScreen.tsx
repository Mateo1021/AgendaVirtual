import { StackScreenProps } from '@react-navigation/stack';
import React, { useContext, useEffect, useState } from 'react'
import { Button, RefreshControl, SafeAreaView, ScrollView, Text, TextInput, View } from 'react-native'
import { colors, stylesApp } from '../../../Themes/AppThemes'
import firestore from '@react-native-firebase/firestore';
import { AuthContext } from '../../../Context/ContextUser/AuthContext';
import { useAgenda } from '../../../Hooks/useAgenda';
import { useAddNote } from '../../../Hooks/useAddNote';


//refres config  
const wait = (timeout : any) => {
  return new Promise(resolve => setTimeout(resolve, timeout));
}
//......
interface Props extends StackScreenProps<any, any> {}; 

export const newNoteScreen = ( { navigation, route }: Props ) => {
//refres config  
const [refreshing, setRefreshing] = React.useState(false);
const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);
//......

const {AddNote} = useAddNote();

const [stateNote, setStateNote] = useState({
  titulo: '',
  body:''
})

  return (
      <SafeAreaView>
        <ScrollView
        refreshControl={
            <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            />}>
            <View>
                <Text style={stylesApp.titles}>
                    Agregar nueva nota
                </Text>

                <Text style={stylesApp.generalText}>
                    Titulo / Nombre
                </Text>
                <TextInput
                style={stylesApp.generalText}
                onChangeText={(value) => setStateNote({ ...stateNote,titulo:value})}
                ></TextInput>
                <Text style={stylesApp.generalText}>
                    Contenido
                </Text>             
                <TextInput 
                style={stylesApp.generalText}
                onChangeText={(value) => setStateNote({ ...stateNote,body:value})}
                ></TextInput>

                <Button 
                  color={colors.primary}
                  title='Agregar nota'
                  onPress={()=>{
                    AddNote(stateNote.titulo, stateNote.body)
                    navigation.navigate('AgendaScreen')
                  }}
                ></Button>

            </View>
        </ScrollView>
      </SafeAreaView>
  )
}
