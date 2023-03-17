import firestore from '@react-native-firebase/firestore';
import { StackScreenProps } from '@react-navigation/stack';
import React, { useContext, useLayoutEffect, useState } from 'react';
import { ActivityIndicator, Button, RefreshControl, SafeAreaView, ScrollView, Text, View } from 'react-native';
import { AuthContext } from '../../../Context/ContextUser/AuthContext';
import { useProyectos } from '../../../Hooks/ProyectosHooks/useProyectos';
import { useRemovePro } from '../../../Hooks/ProyectosHooks/useRemovePro';
import { colors } from '../../../Themes/AppColors';
import { stylesApp } from '../../../Themes/AppThemes';

interface Props extends StackScreenProps<any, any> {};

let dataUserGlobal:any;
let codCoursGlob:any;

const wait = (timeout : any) => {
  return new Promise(resolve => setTimeout(resolve, timeout));
}

export const ProyectosScreen = ({ navigation }: Props) => {
 
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
          <Text style={stylesApp.generalText}>{JSON.stringify(proyectosArrayL,null,1)}</Text>
          <Button 
          color={colors.primary}
          title='go foro'
          onPress={()=>navigation.navigate('ForoScreen')}
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