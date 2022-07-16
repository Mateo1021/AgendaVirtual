import { StackScreenProps } from '@react-navigation/stack';
import React, { useContext, useState } from 'react'
import { Alert, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { stylesApp, colors } from '../../../Themes/AppThemes';

import {getAuth, onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth'

import {initializeApp} from 'firebase/app'

import { AuthContext } from '../../../Context/ContextUser/AuthContext';

import { LogBox } from 'react-native';

import auth from '@react-native-firebase/auth';
import { firebase } from '@react-native-firebase/firestore';
import firestore from '@react-native-firebase/firestore';

LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
LogBox.ignoreAllLogs();//Ignore all log notifications


interface Props extends StackScreenProps<any, any> {};


export const LoginScreen = ({ navigation }: Props) => {

  const {signIn,setDataUser} = useContext(AuthContext)


  let uidLeg = '';
  let docUserLog:string = '';
  const [state, setState] = useState({
    email:'',
    password:''
  })

  const logIn =  () =>{
    if(state.email === '' || state.password === ''){
      Alert.alert('Campos vacios')
    }else{

  auth().signInWithEmailAndPassword(state.email,state.password)
  .then(() => {
    console.log('User account created & signed in!');
    signIn();
    const user = firebase.auth().currentUser;
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    setDataUser(user.email,user.displayName,user.phoneNumber,user.photoURL,user.providerData,user.uid);
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    uidLeg = user.uid;
    
    

    navigation.navigate('MenuLateralNavigator')
  })
  .catch(error => {
    if (error.code === 'auth/email-already-in-use') {
      console.log('That email address is already in use!');
      Alert.alert('Usuario o contraseña incorrectos')
    }

    if (error.code === 'auth/invalid-email') {
      console.log('That email address is invalid!');
      Alert.alert('Usuario o contraseña incorrectos')
    }
    if (error.code === 'auth/wrong-password') {
      console.log('That email address is invalid!');
      Alert.alert('Usuario o contraseña incorrectos')
    }

    console.error(error);
  });

  firestore()
  .collection('Usuarios')
  // Filter results
  .where('Correo', '==', state.email)
  .get()
  .then(querySnapshot => {
        querySnapshot.forEach(documentSnapshot => {
          docUserLog=documentSnapshot.id;
    });

    setTimeout(addUidUser, 1000);
    
  });

    }

  function addUidUser(){
    firestore()
    .collection('Usuarios').doc(docUserLog)
    .update({
      uid: uidLeg
    })
  }

/* 
    setDataUser('mateo123','87123812jhas','234234','sdfsdfdsf',[],'asdasd12321');
    signIn();
    navigation.navigate('MenuLateralNavigator') */
  }
  
  return (


    <ScrollView>
      <View style={{...stylesApp.inputGrup,
      flex: 3
      }}>
        <TextInput 
          placeholder='Correo' 
          style={stylesApp.generalText}
          onChangeText={(value) => setState({ ...state,email:value})}
        ></TextInput>
      </View>
      <View style={{...stylesApp.inputGrup,
      flex: 3
      }}>
        
        <TextInput 
          secureTextEntry={true}
          textContentType='password'
          placeholder='Contraseña' 
          style={stylesApp.generalText}
          onChangeText={(value) => setState({ ...state,password:value})}
        ></TextInput>
      </View>

    <View style={{alignItems:'center'}}>
        <TouchableOpacity
          style={{
            alignItems:'center',
            flex:1,
            marginBottom:10,
            marginTop:20
          }}
          onPress={() => navigation.navigate('CreateUserScreen')}
        >
          <Text style={{
            textDecorationLine: 'underline',
            color:'blue'
          }}>Registrarse</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            alignItems:'center',
            flex:1,
            marginBottom:10,
          }}
          onPress={() => navigation.navigate('CreateUserScreen')}
        >
          <Text style={{
            textDecorationLine: 'underline',
            color:'blue'
          }}>Recordar Contraseña</Text>
        </TouchableOpacity>


        <TouchableOpacity
          style={{
            alignItems:'center',
            borderWidth:1,
            borderColor:colors.blanco,
            backgroundColor: colors.primary,
            height:35,
            width:300,
            marginTop:50
          }}
          onPress={() => logIn()}
        >
          <Text style={{
            color:'white',
            alignItems:'center',
            paddingTop:5
          }}>Ingresar</Text>
        </TouchableOpacity>
    </View>
    
    </ScrollView>
    
  )
}
