import firestore from '@react-native-firebase/firestore';
import { StackScreenProps } from '@react-navigation/stack';
import React, { useContext, useLayoutEffect, useState } from 'react';
import { ActivityIndicator, Button, Image, RefreshControl, SafeAreaView, ScrollView, Text, View } from 'react-native';
import { AuthContext } from '../../../Context/ContextUser/AuthContext';
import { useProyectos } from '../../../Hooks/ProyectosHooks/useProyectos';
import { useRemovePro } from '../../../Hooks/ProyectosHooks/useRemovePro';
import { colors } from '../../../Themes/AppColors';
import { stylesApp } from '../../../Themes/AppThemes';
import Timeline from 'react-native-timeline-flatlist'


interface Props extends StackScreenProps<any, any> {};

let dataUserGlobal:any;
let codCoursGlob:any;

const wait = (timeout : any) => {
  return new Promise(resolve => setTimeout(resolve, timeout));
}

export const ProyectosScreen = ({ navigation }: Props) => {


let data = [
  {time: '09:00', title: 'Event 1', description: 'Event 1 Description'},
  {time: '10:45', title: 'Event 2', description: 'Event 2 Description'},
  {time: '12:00', title: 'Event 3', description: 'Event 3 Description'},
  {time: '14:00', title: 'Event 4', description: 'Event 4 Description'},
  {time: '16:30', title: 'Event 5', description: 'Event 5 Description'}
]


 
  const {idCursoDB,getidProyects,proyectosArray,isLoading}=useProyectos();
  const {removePro}= useRemovePro();
  
  const [refreshing, setRefreshing] = React.useState(false);
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
    getidProyects();
  }, []);


  React.useEffect(() => {
    const focusHandler = navigation.addListener('focus', () => {
      getidProyects();
      
    });
    return focusHandler;
  }, [navigation]);
 

  function removerCurso(){
    removePro();
    navigation.navigate('HomeScreen')
  }
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  let idCours = proyectosArray.codCurso;
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  let nombreCours = proyectosArray.nombreCurso;
  let proyectosArrayL = proyectosArray;



if(idCours == undefined || idCours == '0'){
  idCours = '0';
}

if(isLoading){
  return (
    <View style={{flex: 1, justifyContent:'center', alignContent: 'center' }}>
      <ActivityIndicator color={colors.primary} size={100}></ActivityIndicator>
    </View>
  )
}else{

  if(idCours == '0'){  
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
          <Text style={stylesApp.titles}> {nombreCours}</Text>
          <Image
            style={{ width: 370, height: 150 }}
            source={{ uri: `https://firebasestorage.googleapis.com/v0/b/agenda-virtual-fearc.appspot.com/o/userImgs%2Fus_1?alt=media&token=91346137-c42e-44fb-b139-13ad66ba541c`}}
          />
          <Timeline
          data={data}
        />

          <Button 
          color={colors.primary}
          title='go foro'
          onPress={()=>navigation.navigate('ForoScreen',{
            idForo: idCours,
          })}
        ></Button>
        <Button 
          color={colors.primary}
          title='salir'
          onPress={()=> removerCurso()}
        ></Button>
      </View>

      </ScrollView>
    </SafeAreaView>
)
  }
}
  

}