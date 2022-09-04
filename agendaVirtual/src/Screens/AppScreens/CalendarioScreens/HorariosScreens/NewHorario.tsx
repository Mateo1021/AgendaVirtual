import React, { useContext, useEffect, useLayoutEffect, useState } from 'react'
import { View, Text, TextInput, SafeAreaView, ScrollView, RefreshControl, LogBox, Button } from 'react-native';
import { stylesApp } from '../../../../Themes/AppThemes';
import firestore from '@react-native-firebase/firestore';
import { AuthContext } from '../../../../Context/ContextUser/AuthContext';
import { colors } from '../../../../Themes/AppColors';
import { StackScreenProps } from '@react-navigation/stack';
import { useCreateHorario } from '../../../../Hooks/HorarioHooks/useCreateHorario';

const wait = (timeout : any) => {
  return new Promise(resolve => setTimeout(resolve, timeout));
}

interface Props extends StackScreenProps<any, any> {};

export const NewHorario = ({ navigation }: Props) => {

  const {createHora} = useCreateHorario();


  const [refreshing, setRefreshing] = React.useState(false);
  const onRefresh = React.useCallback(() => {
      setRefreshing(true);
      wait(2000).then(() => setRefreshing(false));
    }, []);

    useEffect(() => {
      createHora()
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
