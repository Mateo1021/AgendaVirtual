import React, { useEffect } from 'react'
import { SafeAreaView, Text, View } from 'react-native'
import firestore from '@react-native-firebase/firestore';
import { FlatList, StyleSheet} from 'react-native';
import {ListRenderItem} from 'react-native';

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




  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
const Item = ({ title }) => (
  <View style={styles.item}>
    <Text style={styles.title}>{title}</Text>
  </View>
);


export const lookProyectoScreen = () => {

  useEffect(() => {
    searchCours();
  }, []);

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const renderItem = ({ item }) => (
    <Item title={item.title} />
  );
  

    return (
      <SafeAreaView style={styles.container}>
      <FlatList
        data={DATA}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
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
