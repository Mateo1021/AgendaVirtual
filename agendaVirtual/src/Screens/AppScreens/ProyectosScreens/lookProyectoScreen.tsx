import React, { useContext, useEffect, useState } from 'react'
import { Alert, SafeAreaView, Text, View } from 'react-native'
import firestore from '@react-native-firebase/firestore';
import { FlatList, StyleSheet} from 'react-native';
import {ListRenderItem} from 'react-native';
import { RefreshControl, ScrollView , TouchableOpacity } from 'react-native';
import { AuthContext } from '../../../Context/ContextUser/AuthContext';

const wait = (timeout : any) => {
  return new Promise(resolve => setTimeout(resolve, timeout));
}


let DATA: any = [];

let dataCours: any = [];
async function searchCours (){
  
  try{
  const users = await firestore().collection('Cursos').get();
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  for(let i in users._docs){
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
    dataCours.push(users._docs[i]._data);
   }
  }catch(e){
  console.log('error: '+e);
  }

  var arr: any = [];
  var obj: any = {};
  for(let j = 0 ; j < dataCours.length; j++){
    let Materia = {
      "id": dataCours[j].codCurso,
      "title": dataCours[j].nombreCurso
     }
    arr.push(Materia);
  }
  
  var hash: any = {};
  arr = arr.filter(function(current: any) {
  var exists = !hash[current.id];
  hash[current.id] = true;
  return exists; 
});
DATA = arr;

}
let dataUserGlobal:any;
function saveDataUser(data:any){
dataUserGlobal= data;
}


function addCoursEstudent(id:any){

  let uid= dataUserGlobal.uid;
  let docUserEdit:any;
  firestore()
  .collection('Usuarios')
  // Filter results
  .where('uid', '==', uid)
  .get()
  .then(querySnapshot => {
        querySnapshot.forEach(documentSnapshot => {
          docUserEdit=documentSnapshot.id;
    });
    setTimeout(setCours, 1000);
  });
 
  function setCours(){
    firestore()
    .collection('Usuarios').doc(docUserEdit)
    .update({
      idCurso: id
    })
  }
}
//


  const createTwoButtonAlert = (tittle:any, id : any) =>
  Alert.alert(
    "Desea Agregar Este Proyecto. "+tittle,
    "Unicamente te podras reguistrar a 1 curso por periodo academico.",
    [
      {
        text: "Cancel",
        onPress: () => 
        console.log("Cancel Pressed")
        ,
        style: "cancel"
      },
      { text: "OK", onPress: () => addCoursEstudent(id)}
    ]
  );
  

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
const Item = ({ title, id }) => (
  <TouchableOpacity onPress={()=>createTwoButtonAlert(title,id)} >
    <Text style={styles.title}>{title}</Text>
  </TouchableOpacity>
);


export const lookProyectoScreen = () => {

const { authState } = useContext(AuthContext);
useEffect(() => {
  saveDataUser(authState);
  searchCours();
}, [])


  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore

  
  const renderItem = ({ item}) => (
    <Item title={item.title}  id={item.id}/>
  );
  
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
            />
          }
        >
        <FlatList
          data={DATA}
          renderItem={renderItem}
          keyExtractor={item => item.id}
        />

      </ScrollView>
    </SafeAreaView>
    );
}
const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
});
