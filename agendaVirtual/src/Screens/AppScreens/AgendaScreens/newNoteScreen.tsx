import { StackScreenProps } from '@react-navigation/stack';
import React, { useContext, useEffect, useState } from 'react'
import { Button, RefreshControl, SafeAreaView, ScrollView, Text, TextInput, View } from 'react-native'
import { colors, stylesApp } from '../../../Themes/AppThemes'
import firestore from '@react-native-firebase/firestore';
import { AuthContext } from '../../../Context/ContextUser/AuthContext';


//refres config  
const wait = (timeout : any) => {
  return new Promise(resolve => setTimeout(resolve, timeout));
}
//......
interface Props extends StackScreenProps<any, any> {}; 

let notaId:any =[] ;
let codUser:string ='' ;
async function searchNotes (){
  
  try{
    const collection = await firestore().collection('Notas_agenda').get();
    collection.forEach(doc => notaId.push(doc.id));

    console.log(notaId);
    
  }catch(e){
  console.log('error: '+e);
  }
}


function getInfoUser(uid:string){

  firestore()
  .collection('Usuarios')
  .where('uid', '==', uid)
  .get()
  .then(querySnapshot => {
        querySnapshot.forEach(documentSnapshot => {
          codUser=documentSnapshot.id;
    });
  });
}

function createNoteDb(titulo:string,body:string){
  let idArrayUser : number =  notaId[notaId.length - 1].split('_')[1];
  let idArrayUserNumber = ++idArrayUser;
  firestore()
  .collection('Notas_agenda').doc('not_'+idArrayUserNumber)
  .set({
    Titulo: titulo,
    body: body,
    codNota:'not_'+idArrayUserNumber,
    codUser:codUser
  })
}

export const newNoteScreen = ( { navigation }: Props ) => {
//refres config  
const [refreshing, setRefreshing] = React.useState(false);
const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);
//......
const { authState } = useContext(AuthContext);

useEffect(() => {
  getInfoUser(authState.uid);
  searchNotes();
}, []);

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
                  title='Buscar Curso'
                  onPress={()=>{
                    createNoteDb(stateNote.titulo, stateNote.body)
                    navigation.navigate('AgendaScreen')
                  }}
                ></Button>

            </View>
        </ScrollView>
      </SafeAreaView>
  )
}
