import React, { useContext, useEffect, useLayoutEffect, useState } from 'react'
import { View, Text, TextInput, SafeAreaView, ScrollView, RefreshControl, TouchableOpacity } from 'react-native';
import { stylesApp, colors } from '../../../../Themes/AppThemes';
import firestore from '@react-native-firebase/firestore';
import { AuthContext } from '../../../../Context/ContextUser/AuthContext';
import { useCreateMateria } from '../../../../Hooks/HorarioHooks/useCreateMateria';
import { useNavigation } from '@react-navigation/core';

const wait = (timeout : any) => {
  return new Promise(resolve => setTimeout(resolve, timeout));
}
export const addMateriasScreen = () => {
  const navigation = useNavigation();
  const [refreshing, setRefreshing] = React.useState(false);
  const onRefresh = React.useCallback(() => {
      setRefreshing(true);
      wait(2000).then(() => setRefreshing(false));
    }, []);

    const [materiData, setMateriData] = useState({
      nombre: '',
    })
    const [input, setinput] = useState('')


    const {createMateria} = useCreateMateria();


    
  

    return (
      <SafeAreaView>
      <ScrollView
      refreshControl={
          <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          />}>
          <View>
              <Text style={stylesApp.titles}>
                   Agregar Materias
              </Text>
              
              <TextInput 
              placeholder='Nombre' 
              style={stylesApp.generalText}
              onChangeText={(value) => setMateriData({ ...materiData,nombre:value})}
              ></TextInput>


              <TouchableOpacity
                style={{
                  alignItems:'center',
                  flex:1,
                  marginBottom:10,
                  marginTop:20
                }}
                onPress={() =>{
                  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                  // @ts-ignore
                  navigation.navigate('editarHorarioScreen')
                  createMateria(materiData.nombre)
                }}
              >
                <Text style={{ backgroundColor:colors.primary,
                  flex:1,
                  width: 200,
                  color:'white'
                }}>guardar</Text>
              </TouchableOpacity>

          </View>
      </ScrollView>
      </SafeAreaView>
    )
}
