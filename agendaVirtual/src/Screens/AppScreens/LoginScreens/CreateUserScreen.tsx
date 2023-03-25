import React, { useEffect, useState } from 'react'
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { stylesApp } from '../../../Themes/AppThemes';
import auth from '@react-native-firebase/auth';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, getMultiFactorResolver } from 'firebase/auth'
import { initializeApp } from 'firebase/app'
import { StackScreenProps } from '@react-navigation/stack';
import firestore from '@react-native-firebase/firestore';
import { colors } from '../../../Themes/AppColors';


interface Props extends StackScreenProps<any, any> { };

let userId: any = [];
async function searchUsers() {
  try {
    const collection = await firestore().collection('Usuarios').get();
    collection.forEach(doc => userId.push(doc.id));
  } catch (e) {
    console.log('error: ' + e);
  }
}

export const CreateUserScreen = ({ navigation }: Props) => {

  useEffect(() => {
    searchUsers();
  }, []);


  const [email, setemail] = useState('')
  const [passw, setpassw] = useState('')
  const [apellidos, setapellidos] = useState('')
  const [edad, setedad] = useState('')
  const [descrip, setdescrip] = useState('')
  const [tel, settel] = useState('')
  const [nameU, setnameU] = useState('')
  const [confirm, setconfirm] = useState('')
const [textConfirm, settextConfirm] = useState('')
  const createNewUser = () => {
    if (email === '' || passw === '') {
      Alert.alert('Campos vacios')
    } else {
      auth().createUserWithEmailAndPassword(email, passw)
        .then(() => {
          let idArrayUser: number = userId[userId.length - 1].split('_')[1];
          let idArrayUserNumber = ++idArrayUser;

          Alert.alert('Usuario creado con Exito');
          navigation.navigate('LoginScreen');
          firestore()
            .collection('Usuarios').doc('us_' + (idArrayUserNumber))
            .set({
              Apellidos:apellidos,
              Correo: email,
              Edad: edad,
              Nombres: nameU,
              Puntaje: '0',
              codUser: 'us_' + (idArrayUserNumber),
              descripcion:descrip,
              foto: '',
              idCurso: '0',
              idHorario: '',
              idUser:'us_' + (idArrayUserNumber),
              tel:tel,
              insignias:[],
              uid: ''
            })
            .then(() => {
              console.log('User added!');
            });




        })
        .catch(error => {
          Alert.alert(error)

          console.error(error);
        });


    }
  }

  const validData = () => {
    if (nameU == '' || email == '' || passw == '' || apellidos == '' || edad == '' || descrip == '' || tel == '' || confirm == '') {
      Alert.alert('Por favor llena todos los campos')
    } else {
      if (passw == confirm) {
console.log('ok');
createNewUser()
      }else{
        Alert.alert('Las Contraseñas no coinsiden')
      }
    }
    /*     email
        passw
        apellidos
        edad
        descrip
        tel
        nameU 
        confirm */
  }


  return (
    <ScrollView >

      <View style={styles.contTitel}>
        <Text style={stylesApp.titles}>FORMULARIO DE REGISTRO</Text>
      </View>


      <View style={styles.formS}>


        <View style={styles.contFullName} >
          <View style={styles.contName}>
            <Text>Nombre</Text>
            <TextInput style={styles.inptTextFull} onChangeText={setnameU}></TextInput>
          </View>
          <View style={styles.contName}>
            <Text>Apellido</Text>
            <TextInput style={styles.inptTextFull} onChangeText={setapellidos}></TextInput>
          </View>
        </View>

        <View style={styles.contFullName}>
          <View style={styles.contName}>
            <Text>Edad</Text>
            <TextInput style={styles.inptTextFull} onChangeText={setedad} keyboardType={'numeric'}></TextInput>
          </View>
          <View style={styles.contName}>
            <Text>Telefono</Text>
            <TextInput style={styles.inptTextFull} onChangeText={settel} keyboardType={'phone-pad'} ></TextInput>
          </View>
        </View>



        <View style={styles.descCont}>
          <Text>Descripcion</Text>
          <TextInput style={styles.inptTextFull} onChangeText={setdescrip}></TextInput>
        </View>




        <View>
          <View style={styles.descCont}>
            <Text>Correo</Text>
            <TextInput style={styles.inptTextFull} onChangeText={setemail} keyboardType={'email-address'}></TextInput>
          </View>
          <View style={styles.descCont}>
            <Text>Contraseña</Text>
            <TextInput style={styles.inptTextFull} onChangeText={setpassw}  secureTextEntry={true} ></TextInput>
          </View>
          <View style={styles.descCont}>
            <Text>Confirmar contraseña</Text>
            <TextInput style={styles.inptTextFull} onChangeText={setconfirm} secureTextEntry={true}></TextInput>
          </View>
          <Text>{textConfirm}</Text>
        </View>
      </View>



      <Button
        color={colors.primary}
        title='Registrarme !! '
        onPress={() => { validData() }}
      ></Button>

    </ScrollView>
  )
}
const styles = StyleSheet.create({
  contTitel: {
    alignItems: 'center'
  },
  formS: {
    padding: 20,
    alignItems: 'center'
  },
  contFullName: {
    flexDirection: 'row',
  },
  contName: {
    width: 150,
    marginHorizontal: 10
  },
  inptTextFull: {
    borderBottomWidth: 1,
    marginBottom: 10
  },
  descCont: {
    width: 300,
    marginHorizontal: 10
  }
});