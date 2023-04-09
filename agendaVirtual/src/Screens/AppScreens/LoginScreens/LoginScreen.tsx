import { StackScreenProps } from '@react-navigation/stack';
import React, { useContext, useState } from 'react'
import { Alert, Image, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { stylesApp, colors } from '../../../Themes/AppThemes';

import { getAuth, onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth'

import { initializeApp } from 'firebase/app'

import { AuthContext } from '../../../Context/ContextUser/AuthContext';

import { LogBox } from 'react-native';

import auth from '@react-native-firebase/auth';
import { firebase } from '@react-native-firebase/firestore';
import firestore from '@react-native-firebase/firestore';

LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
LogBox.ignoreAllLogs();//Ignore all log notifications


interface Props extends StackScreenProps<any, any> { };


export const LoginScreen = ({ navigation }: Props) => {

  const { signIn, setDataUser } = useContext(AuthContext)


  let flagLogin = 0;
  let uidLeg = '';
  let docUserLog: string = '';
  let nameUser: string = '';
  let urlImage: string = ''
  let userGlobal: any = []
  const [state, setState] = useState({
    email: '',
    password: ''
  })

  const logIn = () => {
    if (state.email === '' || state.password === '') {
      Alert.alert('Campos vacios')
    } else {

      auth().signInWithEmailAndPassword(state.email, state.password)
        .then(() => {
          console.log('User account created & signed in!');
          signIn();
          const user = firebase.auth().currentUser;
          userGlobal = user;

          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          uidLeg = user.uid;
          let emailLower = state.email.toLowerCase()

          firestore()
            .collection('Usuarios')
            // Filter results
            .where('Correo', '==', emailLower)
            .get()
            .then(querySnapshot => {
              querySnapshot.forEach(documentSnapshot => {

                docUserLog = documentSnapshot.id;

                // @ts-ignore
                nameUser = documentSnapshot._data.Nombres;
                // @ts-ignore
                urlImage = documentSnapshot._data.foto

                setDataUser(userGlobal.email, nameUser, userGlobal.phoneNumber, urlImage, userGlobal.providerData, docUserLog);
              });


              navigation.navigate('MenuLateralNavigator')

              setTimeout(addUidUser, 1000);

            });




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
          if (error.code === 'auth/user-not-found') {
            console.log('That email address is invalid!');
            Alert.alert('Usuario o contraseña incorrectos')
          }
          
        });


    }

    function addUidUser() {
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

  function resetPass() {
    if (state.email !== '') {
      firebase.auth().sendPasswordResetEmail(state.email)
        .then(() => {
          // Password reset email sent!
          // ..
          Alert.alert('Correo enviado con exito por favor realiza el proceso mediante el link que se envio a tu correo')
        })
        .catch((error) => {
          var errorCode = error.code;
          var errorMessage = error.message;
          Alert.alert('Correo incorrecto')
          // .
        });

    } else {
      Alert.alert('Primero ingresa el correo de la cuenta que deseas recuperar')
    }
  }
  return (


    <ScrollView >
      <View style={{
        flex: 1,
        alignItems: 'center',
        marginVertical: 50
      }}>
        <Image
          style={{ width: 150, height: 150 }}
          source={{ uri: "https://firebasestorage.googleapis.com/v0/b/agenda-virtual-fearc.appspot.com/o/testImgs%2FlogoSimp.png?alt=media&token=aae216df-f380-48a8-b3d3-4907c2f8f4c0" }}
        />
      </View>
      <View style={{
        flex: 1,
        marginTop: 10
      }}>

        <TextInput
          placeholderTextColor="#949494"
          placeholder='Correo'
          style={{
            ...stylesApp.generalText,
            marginHorizontal: 20,
            borderWidth: 1,
            borderColor: '#999999',
            borderRadius: 15,
          }}
          onChangeText={(value) => setState({ ...state, email: value })}
          keyboardType={'email-address'}
        ></TextInput>
      </View>

      <View style={{
        marginHorizontal: 20,
        borderWidth: 1,
        marginTop: 20,
        borderColor: '#999999',
        borderRadius: 15,

      }}>

        <TextInput
          placeholderTextColor="#949494"
          secureTextEntry={true}
          textContentType='password'
          placeholder='Contraseña'
          style={stylesApp.generalText}
          onChangeText={(value) => setState({ ...state, password: value })}
        ></TextInput>
      </View>

      <View style={{ alignItems: 'center' }}>



        <TouchableOpacity
          style={{
            alignItems: 'center',
            borderWidth: 1,
            borderColor: colors.blanco,
            backgroundColor: colors.primary,
            borderRadius: 8,
            height: 45,
            width: 350,
            marginTop: 50,
            justifyContent: 'center'
          }}
          onPress={() => logIn()}
        >
          <Text style={{
            color: 'white',
            alignItems: 'center',
          }}>Ingresar</Text>
        </TouchableOpacity>
      </View>

      <View style={{ marginTop: 70 }}>

        <TouchableOpacity
          style={{
            alignItems: 'center',
            marginBottom: 10,
            marginTop: 20
          }}
          onPress={() => navigation.navigate('CreateUserScreen')}
        >
          <Text style={{
            color: colors.primary,
            fontWeight: 'bold'
          }}>Registrarse</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            alignItems: 'center',
            marginBottom: 10,
            borderTopWidth: 3,
            borderColor: colors.primary,
            marginHorizontal: 120,
            paddingTop: 10
          }}
          onPress={() => resetPass()}
        >
          <Text style={{
            color: colors.primary,
            fontWeight: 'bold'
          }}>Recordar Contraseña</Text>
        </TouchableOpacity>
      </View>

    </ScrollView>

  )
}
