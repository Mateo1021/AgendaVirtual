import React, { useContext, useEffect, useLayoutEffect, useState } from 'react'
import { View, Text, TextInput, SafeAreaView, ScrollView, RefreshControl } from 'react-native';
import { stylesApp } from '../../../../Themes/AppThemes';
import firestore from '@react-native-firebase/firestore';
import { AuthContext } from '../../../../Context/ContextUser/AuthContext';

const wait = (timeout : any) => {
  return new Promise(resolve => setTimeout(resolve, timeout));
}


export const addMateriasScreen = () => {
  const [refreshing, setRefreshing] = React.useState(false);
  const onRefresh = React.useCallback(() => {
      setRefreshing(true);
      wait(2000).then(() => setRefreshing(false));
    }, []);

  const [matState, matSetState] = useState([])
    const { authState } = useContext(AuthContext);
let coMateria:any = [];
let materiasArray:any = [];
let idHorario='';
    async function loadMaterias(){
      try{
        const collection = await firestore().collection('Materia').get();
        collection.forEach(doc => coMateria.push(doc.id));

        const collectionDataUser = await firestore()
        .collection('Usuarios')
        .where('codUser', '==', authState.uid)
        .get().then(querySnapshot => {
          querySnapshot.forEach(documentSnapshot => {
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
              idHorario = documentSnapshot._data.idHorario
      });
    }); 

        const collectionData = await firestore()
        .collection('Materia')
        .where('codHorario', '==', idHorario)
        .get().then(querySnapshot => {
          querySnapshot.forEach(documentSnapshot => {
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
              let materia = documentSnapshot._data
              materiasArray.push(materia)

      });
    }); 

      for(let i in materiasArray){
        console.log('Array Fin ->  '+materiasArray[i].nombre);
      } 
      
      }catch(e){
      console.log('error: '+e);
      }
  }

  useLayoutEffect(() => {
    loadMaterias();
  }, [])
  
  
  
  useEffect(() => {
  
  }, [])
  
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
                   Agregar Materias
              </Text>
          </View>
      </ScrollView>
      </SafeAreaView>
    )
}
