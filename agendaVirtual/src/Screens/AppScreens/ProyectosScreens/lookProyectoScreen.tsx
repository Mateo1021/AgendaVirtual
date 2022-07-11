import React, { useEffect } from 'react'
import { Text, View } from 'react-native'
import firestore from '@react-native-firebase/firestore';
import { FlatList, StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
   flex: 1,
   paddingTop: 22
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
});

export const lookProyectoScreen = () => {

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

     console.log(dataCours);
     
    }catch(e){
    console.log('error: '+e);
    }
    }

    useEffect(() => {
      searchCours();
    }, []);
    return (
      <View style={styles.container}>

      </View>
    );
}
