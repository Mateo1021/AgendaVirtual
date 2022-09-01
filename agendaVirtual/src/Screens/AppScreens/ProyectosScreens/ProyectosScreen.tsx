import firestore from '@react-native-firebase/firestore';
import { StackScreenProps } from '@react-navigation/stack';
import React, { useContext, useLayoutEffect, useState } from 'react';
import { Button, RefreshControl, SafeAreaView, ScrollView, Text, View } from 'react-native';
import { AuthContext } from '../../../Context/ContextUser/AuthContext';
import { colors } from '../../../Themes/AppColors';
import { stylesApp } from '../../../Themes/AppThemes';

interface Props extends StackScreenProps<any, any> {};

let dataUserGlobal:any;
let codCoursGlob:any;

const wait = (timeout : any) => {
  return new Promise(resolve => setTimeout(resolve, timeout));
}

export const ProyectosScreen = ({ navigation }: Props) => {
  const [refreshing, setRefreshing] = React.useState(false);
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);


  const {authState} = useContext(AuthContext)
  const [state, setState] = useState({
    stateCours:''
  })

  const [stateInfo, setStateInfo] = useState({
    infoCours: {nombreCurso:''}
  })
  useLayoutEffect(() => {

      let uid= authState.uid;
      firestore()
      .collection('Usuarios')
      .where('codUser', '==', uid)
      .get()
      .then(querySnapshot => {
            querySnapshot.forEach(documentSnapshot => {
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
               carga = setState({state,stateCours:documentSnapshot._data.idCurso}) 
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
               codCoursGlob = documentSnapshot._data.idCurso;
                
        });
        setTimeout(() => {
          loadDataCours();
        }, 1000);
      });
      
      function loadDataCours(){
        firestore()
        .collection('Cursos')
        .where('codCurso', '==', codCoursGlob)
        .get()
        .then(querySnapshot => {
              querySnapshot.forEach(documentSnapshot => {
                 // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                carga2 = setStateInfo({stateInfo,infoCours:documentSnapshot._data}) 
                console.log(stateInfo);
          });
        });
      }
              
  }, [])

  if(state.stateCours == '0'){  
    return(

    <View style={{
      flex:1,
      alignItems:'center',
      justifyContent:'center'
      
    }}>
        <Text style={{
          ...stylesApp.generalText,
          marginBottom:20,
        }}>Aun no tiene ningun curso reguistrado</Text>
        <Button 
          color={colors.primary}
          title='Buscar Curso'
          onPress={()=>navigation.navigate('lookProyectoScreen')}
        ></Button>
    </View>

  )}else{
    return (

      <SafeAreaView>
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
            />
          }
        >
      <View style={stylesApp.globalMargin}>
          <Text style={stylesApp.titles}> {stateInfo.infoCours.nombreCurso}</Text>
          <Text style={stylesApp.generalText}>{JSON.stringify(stateInfo.infoCours,null,1)}</Text>
          <Button 
          color={colors.primary}
          title='go foro'
          onPress={()=>navigation.navigate('ForoScreen')}
        ></Button>
      </View>

      </ScrollView>
    </SafeAreaView>




)
  }


}