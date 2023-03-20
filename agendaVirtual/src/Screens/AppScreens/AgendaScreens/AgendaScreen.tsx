import React, { useContext, useEffect, useLayoutEffect, useState } from 'react'
import { Text, View, TouchableOpacity, SafeAreaView, ScrollView, RefreshControl, ActivityIndicator, Button } from 'react-native';
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
        <View>
          {
            notasGet.map((item, index) => (

              <NoteCard note={item}></NoteCard>
            ))

          }




          <Button
            color={colors.primary}
            title='Agregar nota'
            onPress={() => navigation.navigate('newNoteScreen')}
          ></Button>


        </View>
      </ScrollView>
    </SafeAreaView>
  )
}
