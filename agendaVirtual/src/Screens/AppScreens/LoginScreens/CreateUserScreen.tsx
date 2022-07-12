import React, { useState } from 'react'
import { View,Text, TextInput, Button, Alert } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { stylesApp } from '../../../Themes/AppThemes';
import auth from '@react-native-firebase/auth';
import {getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, getMultiFactorResolver } from 'firebase/auth'
import {initializeApp} from 'firebase/app'
import { StackScreenProps } from '@react-navigation/stack';
import firestore from '@react-native-firebase/firestore';


interface Props extends StackScreenProps<any, any> {};



export const CreateUserScreen = ( { navigation }: Props) => {


  const [state, setState] = useState({
    email:'',
    password:''
  })

  const createNewUser =  () =>{
    if(state.email === '' || state.password === ''){
      Alert.alert('Campos vacios')
    }else{
      auth().createUserWithEmailAndPassword(state.email,state.password)
      .then(() => {
        Alert.alert('Usuario creado con Exito')
        navigation.navigate('LoginScreen')

        firestore()
        .collection('Usuarios').doc('')
        .set({
          Aprellidos: '',
          Correo: state.email,
          Edad: '',
          Nombres: '',
          Puntaje: '',
          codUser: '',
          foto: '',
          idCalificaciones: '',
          idCurso: '',
          idHorario: '',
          idMaterias: '',
          idNotas: '',
        })
        .then(() => {
          console.log('User added!');
        });




      })
      .catch(error => {
        Alert.alert(error)
    
        console.error(error);
      });
      
    /*  createUserWithEmailAndPassword(auth,state.email,state.password)
     .then((userCredential)=>{
       console.log('Acount Create')
       const user = userCredential.user
       console.log(user)
       Alert.alert('Usuario creado con Exito')
       navigation.navigate('LoginScreen')
     })
     .catch(error  =>{
      console.log(error)
      Alert.alert(error.message)
     }) */
    }
  }
  
  return (
    <ScrollView style={stylesApp.containerLogin}>

      <View style={stylesApp.inputGrup}>
        <TextInput 
          placeholder='Email user' 
          style={stylesApp.generalText}
          onChangeText={(value) => setState({ ...state,email:value})}
        ></TextInput>
      </View>
      <View style={stylesApp.inputGrup}>
        <TextInput 
          placeholder='Password' 
          style={stylesApp.generalText}
          onChangeText={(value) => setState({ ...state,password:value})}
        ></TextInput>
      </View>
      <View style={stylesApp.inputGrup}>
        <Button 
          title='save User '
          onPress={()=>createNewUser()}
        ></Button>
      </View>
    </ScrollView>
  )
}
