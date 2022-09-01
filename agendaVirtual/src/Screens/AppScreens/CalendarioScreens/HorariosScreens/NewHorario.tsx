import React, { useContext, useEffect, useLayoutEffect, useState } from 'react'
import { View, Text, TextInput, SafeAreaView, ScrollView, RefreshControl, LogBox, Button } from 'react-native';
import { stylesApp } from '../../../../Themes/AppThemes';
import firestore from '@react-native-firebase/firestore';
import { AuthContext } from '../../../../Context/ContextUser/AuthContext';
import { colors } from '../../../../Themes/AppColors';
import { StackScreenProps } from '@react-navigation/stack';

const wait = (timeout : any) => {
  return new Promise(resolve => setTimeout(resolve, timeout));
}

interface Props extends StackScreenProps<any, any> {};

export const NewHorario = ({ navigation }: Props) => {

  const { authState } = useContext(AuthContext);

  let calId:any =[] ;

async function searchCals (){
  
  try{
    const collection = await firestore().collection('Horarios').get();
    collection.forEach(doc => calId.push(doc.id));

    console.log(calId);
    
  }catch(e){
  console.log('error: '+e);
  }
}

function createCal(){
  let idArrayCall : number =  calId[calId.length - 1].split('_')[1];
  let idArrayCallNumber = ++idArrayCall;
  firestore()
  .collection('Horarios').doc('h_'+idArrayCallNumber)
  .set({
    codHorario:'h_'+idArrayCallNumber,
    codEstud:authState.uid,
    nombreHorario:'Test'
  })

  firestore()
  .collection('Usuarios').doc(authState.uid)
  .update({
    idHorario:'h_'+idArrayCallNumber
  })


}

  const [refreshing, setRefreshing] = React.useState(false);
  const onRefresh = React.useCallback(() => {
      setRefreshing(true);
      wait(2000).then(() => setRefreshing(false));
    }, []);




  useLayoutEffect(() => {
    searchCals();
    setTimeout(() => {
      createCal()
    }, 1000);
    
  },[])

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
      <View style={{
        flex:1,
        alignItems:'center',
        justifyContent:'center'
        
      }}>
          <Text style={{
            ...stylesApp.generalText,
            marginBottom:20,
          }}>Primero debe reguistrar las materias</Text>
          <Button 
            color={colors.primary}
            title='Agregar Materias'
            onPress={()=>navigation.navigate('addMateriasScreen')}
          ></Button>
      </View>
    </ScrollView>
    </SafeAreaView>
  )
}
