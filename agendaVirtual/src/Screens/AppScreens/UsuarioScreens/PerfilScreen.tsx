import React, { useContext, useLayoutEffect, useState } from 'react'
import { Image, Text, View, TextInput, StyleSheet, Button, TouchableOpacity } from 'react-native';
import { AuthContext } from '../../../Context/ContextUser/AuthContext'
import { stylesApp } from '../../../Themes/AppThemes'
import firestore from '@react-native-firebase/firestore';
import { ScrollView } from 'react-native-gesture-handler';
import { colors } from '../../../Themes/AppColors';
import { getInfo } from '../../../Hooks/UserHooks/getInfo';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import storage from '@react-native-firebase/storage';

export const PerfilScreen = () => {
  const { authState } = useContext(AuthContext);
  const { editUserinfo ,addImgUser} = getInfo();


  const [dataUser, setdataUser] = useState({
    Apellidos: '',
    Correo: '',
    Edad: '',
    Nombres: '',
    Puntaje: '',
    codUser: '',
    descripcion: '',
    foto: '',
    idCurso: '',
    idHorario: '',
    idMaterias: '',
    idNotas: '',
    uid: ''
  })
  const [response, setResponse] = React.useState<any>(null);



  useLayoutEffect(() => {
    var unsubscribe2 = firestore().collection("Usuarios").doc(authState.uid)
      .onSnapshot((querySnapshot) => {
        // @ts-ignore
        setdataUser(querySnapshot._data);
      });

    return unsubscribe2;

  }, [])

  const [nombreUser, setnombreUser] = useState('')
  const [apellidoUser, setapellidoUser] = useState('')
  const [correUser, setcorreUser] = useState('')
  const [descpripUser, setdescpripUser] = useState('')

  const editUser = () => {

    let dataToEdit = {
      Apellidos: apellidoUser !== '' ? apellidoUser : dataUser.Apellidos,
      Nombres: nombreUser !== '' ? nombreUser : dataUser.Nombres,
      Correo: correUser !== '' ? correUser : dataUser.Correo,
      descripcion: descpripUser !== '' ? descpripUser : dataUser.descripcion,
      idUser: authState.uid
    }
    editUserinfo(dataToEdit)
  }
  addImg()
  console.log(response);
  
  async function addImg() {
    if(response!=='null'){
      const reference = storage().ref('userImgs/' + authState.uid);
      await reference.putFile(response.assets[0].uri);
  
      reference.getDownloadURL()
          .then((url) => {
              console.log(url);
              
              addImgUser(url)
              setResponse(null)
          })
          .catch((error) => {
              console.log(error);
  
          });
    }
}

  return (
    <ScrollView style={styles.container}>
      <View>
        <View style={styles.header}>
          <TouchableOpacity
                onPress={() => {
                  launchImageLibrary({
                      selectionLimit: 0,
                      mediaType: 'photo',
                      includeBase64: false,
                  }, setResponse)
              }}
          >
            <Image
              source={{ uri: `${dataUser.foto}` }}
              style={stylesApp.avatar}
            ></Image>
          </TouchableOpacity>
          <Text>Hola {dataUser.Nombres}</Text>
          <Text> Esta es tu informacion personal </Text>
        </View>

        <View style={styles.bloqueInfo}>
          <View style={styles.nombre}>
            <TextInput style={styles.txtNombre} placeholder={dataUser.Nombres} onChangeText={setnombreUser}></TextInput>
            <TextInput style={styles.txtApellido} placeholder={dataUser.Apellidos} onChangeText={setapellidoUser}></TextInput>
          </View>

          <TextInput style={styles.txtCorreo} placeholder={dataUser.Correo} onChangeText={setcorreUser} editable={false}></TextInput>

          <TextInput style={styles.txtDescrip} placeholder={dataUser.descripcion} onChangeText={setdescpripUser}></TextInput>

          <Text style={styles.txtPuntaje}>Tu puntaje actual es de: {dataUser.Puntaje}</Text>
        </View>


        <Button
          color={colors.primary}
          title='Editar informacion'
          onPress={() => editUser()}
        ></Button>


      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white'
  },
  header: {
    alignContent: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 30
  },
  nombre: {
    flexDirection: 'row'
  },
  bloqueInfo: {
    paddingHorizontal: 40,
    alignItems: 'center',
  },
  txtNombre: {
    borderBottomWidth: 1,
    marginHorizontal: 1,
    borderColor: colors.primary,
    width: 150
  },
  txtApellido: {
    borderBottomWidth: 1,
    marginHorizontal: 1,
    borderColor: colors.primary,
    width: 150
  }
  ,
  txtCorreo: {
    borderBottomWidth: 1,
    borderColor: colors.primary,
    width: 300
  },
  txtDescrip: {
    borderBottomWidth: 1,
    borderColor: colors.primary,
    width: 300,
    marginBottom: 40
  },
  txtPuntaje: {
    marginBottom: 40
  }
})