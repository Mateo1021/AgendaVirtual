import React, { useContext, useEffect, useLayoutEffect, useState } from 'react'
import { View, Text, TextInput, SafeAreaView, ScrollView, RefreshControl, TouchableOpacity, Button, StyleSheet, Alert } from 'react-native';
import { stylesApp, colors } from '../../../../Themes/AppThemes';
import firestore from '@react-native-firebase/firestore';
import { AuthContext } from '../../../../Context/ContextUser/AuthContext';
import { useCreateMateria } from '../../../../Hooks/HorarioHooks/useCreateMateria';
import { useNavigation } from '@react-navigation/core';

const wait = (timeout: any) => {
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


  const { createMateria } = useCreateMateria();


const addMateria =()=>{
  if(materiData.nombre == '' ||materiData.nombre.length<=3){
    Alert.alert('Error','Por favor ingresa un nombre')
  }else{
    navigation.goBack()
    createMateria(materiData.nombre)
  }
}


  return (
    <SafeAreaView>
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
          />}>
        <View>
          <View style={styles.containerGen}>
            <Text style={stylesApp.titles}>
              Agregar Materias
            </Text>
          </View>

          <TextInput
            placeholderTextColor="#949494"
            placeholder='Nombre'
            style={styles.imputMat}
            onChangeText={(value) => setMateriData({ ...materiData, nombre: value })}
          ></TextInput>


          <Button
            color={colors.primary}
            title='Agregar materias'
            onPress={() => {
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
              addMateria()
            }}
          ></Button>

        </View>
      </ScrollView>
    </SafeAreaView>
  )
}


const styles = StyleSheet.create({
  containerGen: {
    alignItems: 'center',
    paddingVertical: 15
  },
  imputMat: {
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#EAEAEA',
    marginHorizontal: 20,
    textAlign: 'center',
    color:'black'
  },

});