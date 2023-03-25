import React, { useLayoutEffect, useState } from 'react'
import { View, Text, StyleSheet } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { stylesApp } from '../../../Themes/AppThemes';
import { ScrollView } from 'react-native-gesture-handler';

//@ts-ignore
export const infoCursoScreen = ({ route }) => {
  const [infoCurso, setinfoCurso] = useState({})
  useLayoutEffect(() => {
    var unsubscribe2 = firestore().collection("Cursos").doc(route.params.idCurso)
      .onSnapshot((querySnapshot) => {
        var res: any = [];
        //@ts-ignore
        setinfoCurso(querySnapshot.data())
      });

    return unsubscribe2;
  }, [])
  return (
    <ScrollView>
      <View style={styles.contTitel}>
        {/* @ts-ignore */}
        <Text style={stylesApp.titles}>{infoCurso.nombreCurso}</Text>
      </View>

      <View style={styles.contInfo}>
        <View style={styles.contDes}>
          <Text style={styles.txtDes} >Descripcion</Text>
          {/* @ts-ignore */}
          <Text style={styles.txtDesCom}>{infoCurso.largeDescription}</Text>
        </View>
        <View style={styles.contDes}>
          <Text style={styles.txtDes}>Temas relacionados</Text>
          {/* @ts-ignore */}
          <Text style={styles.txtDesCom}>{infoCurso.temas}</Text>
        </View>
        <View style={styles.contDes}>
          <Text style={styles.txtDes}>Nombre docente</Text>
          {/* @ts-ignore */}
          <Text style={styles.txtDesCom}>{infoCurso.nombreDocente} {infoCurso.apellidosDocente}</Text>

        </View>
        <View style={styles.contDes}>
          <Text style={styles.txtDes}>Estudiantes inscritos</Text>
          {/* @ts-ignore */}
          <Text style={styles.txtDesCom}>{infoCurso.cantEstudiantes}</Text>
        </View>
      </View>

    </ScrollView>
  )
}
const styles = StyleSheet.create({
  contTitel: {
    alignItems: 'center'
  },
  contInfo: {
    padding: 25
  },
  contDes: {
    borderBottomWidth: 1,
    marginBottom:20,
    borderColor:'#D6D6D6'
  },
  txtDes: {
    color: 'black',
    fontWeight: 'bold',
  },
  txtDesCom: {
    color: 'black',
    textAlign: 'justify'
  }
});
