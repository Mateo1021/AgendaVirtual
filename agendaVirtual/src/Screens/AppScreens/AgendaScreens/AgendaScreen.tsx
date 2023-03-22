import React, { useContext, useEffect, useLayoutEffect, useState } from 'react'
import { Text, View, TouchableOpacity, SafeAreaView, ScrollView, RefreshControl, ActivityIndicator, Button, StyleSheet } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack'
import { stylesApp } from '../../../Themes/AppThemes';
import firestore from '@react-native-firebase/firestore';
import { AuthContext } from '../../../Context/ContextUser/AuthContext';
import { useAgenda } from '../../../Hooks/useAgenda';
import { colors } from '../../../Themes/AppColors';
import Carousel from 'react-native-snap-carousel';
import { NoteCard } from '../../../Components/noteCard';
//refres config  
const wait = (timeout: any) => {
  return new Promise(resolve => setTimeout(resolve, timeout));
}
//......
interface Props extends StackScreenProps<any, any> { };



export const AgendaScreen = ({ navigation, route }: Props) => {

  const { authState } = useContext(AuthContext);
  //refres config  

  const [notasGet, setnotasGet] = useState([])

  const [refreshing, setRefreshing] = React.useState(false);
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => {
      setRefreshing(false)

    });
  }, []);
  //......



  useLayoutEffect(() => {

    var unsubscribe = firestore().collection("Notas_agenda").where('codUser', '==', authState.uid)
      .onSnapshot((querySnapshot) => {
        let notasArray = []
        // @ts-ignore
        for (let i in querySnapshot._docs) {
          // @ts-ignore
          notasArray.push(querySnapshot._docs[i])
        }
        // @ts-ignore
        setnotasGet(notasArray);

      });

    return unsubscribe;

  }, [])




  return (

    <SafeAreaView>
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
          />}>
        <View style={styles.item}>
          {
            notasGet.map((item, index) => (
              <View style={styles.styleCard}>
                <NoteCard note={item}></NoteCard>
              </View>
            ))

          }


          <View style={styles.btnAddNote}>
            <Button
              color={colors.primary}
              title='Agregar nota'
              onPress={() => navigation.navigate('newNoteScreen')}
            ></Button>
          </View>


        </View>
      </ScrollView>
    </SafeAreaView>
  )
}


const styles = StyleSheet.create({
  item: {
    paddingVertical: 20,
    paddingHorizontal: 20
  },
  btnAddNote: {
    paddingTop: 30
  },
  styleCard: {
    paddingVertical: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 22,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.00,

    elevation: 24,
  }
})