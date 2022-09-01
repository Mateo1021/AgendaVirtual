import React, { useContext, useEffect, useLayoutEffect, useState } from 'react'
import { Text, View, TouchableOpacity, SafeAreaView, ScrollView, RefreshControl } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack'
import { stylesApp } from '../../../Themes/AppThemes';
import firestore from '@react-native-firebase/firestore';
import { AuthContext } from '../../../Context/ContextUser/AuthContext';
//refres config  
const wait = (timeout : any) => {
  return new Promise(resolve => setTimeout(resolve, timeout));
}
//......
interface Props extends StackScreenProps<any, any> {};



let codUser:string ='' ;



export const AgendaScreen = ({ navigation }: Props) => {
//refres config  
const [refreshing, setRefreshing] = React.useState(false);
const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => {
      refreshData()
      setRefreshing(false)
    });
  }, []);
//......

const { authState } = useContext(AuthContext);
function refreshData(){

  let notas:any = [];
    test ();

console.log(authState.uid);

function test (){
  firestore()
  .collection('Notas_agenda')
  .where('codUser', '==', authState.uid)
  .get()
  .then(querySnapshot => {
        querySnapshot.forEach(documentSnapshot => {
             // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
          notas.push(documentSnapshot._data.Titulo)
           // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
          setstateNotas({stateNotas,notas:notas})   
    });
    console.log(stateNotas.notas);
  });
}
}

const [stateNotas, setstateNotas] = useState({
  notas : {}
})

useEffect(() => {
}, [])



useLayoutEffect(() => {
  refreshData();
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
        <Text style={stylesApp.generalText}>{JSON.stringify(stateNotas.notas,null,4)}</Text>
            <View style={{
              flex: 0,
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'space-around'
            }}>
              <TouchableOpacity
                style={{
                  width: '100%',
                  alignItems: 'center',
                  paddingTop: 150
                }}
                onPress={() => navigation.navigate('newNoteScreen')}
              >
                <Text style={stylesApp.titles}>Nueva Nota.</Text>
              </TouchableOpacity>

            </View>
          </View>
        </ScrollView>
        </SafeAreaView>
  )
}
