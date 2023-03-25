import React, { useContext } from 'react';
import { Text, View, Alert, StyleSheet } from 'react-native'
import firestore from '@react-native-firebase/firestore';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { Card, CardTitle, CardContent, CardAction, CardButton, CardImage } from 'react-native-material-cards';
import { AuthContext } from '../../Context/ContextUser/AuthContext';
import { stylesApp } from '../../Themes/AppThemes';
import { StackScreenProps } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/core';
import { HomeScreen } from './../../Screens/AppScreens/HomeScreen';

interface Props extends StackScreenProps<any, any> { };

export const ProyectoCard = ({ pro }: any) => {
  const navigation = useNavigation()

  const { authState } = useContext(AuthContext);

  const createTwoButtonAlert = (tittle: any, id: any) =>
    Alert.alert(
      "Desea Agregar Este Proyecto. " + tittle,
      "Unicamente te podras reguistrar a 1 curso por periodo academico.",
      [
        {
          text: "Cancel",
          onPress: () => console.log('cancel')

          ,
          style: "cancel"
        },
        { text: "OK", onPress: () => addCoursEstudent(id) }
      ]
    );

  function addCoursEstudent(id: any) {
    firestore()
      .collection('Usuarios').doc(authState.uid)
      .update({
        idCurso: id
      })
    // @ts-ignore
    navigation.pop()
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    navigation.navigate('HomeScreen')

  }


  return (
    <View style={styles.generalContainer}>
      <View style={styles.contTitel}>
        <Text style={styles.txtTitel}>{pro._data.nombreCurso}</Text>
      </View>
      <View style={styles.contBody}>
        <Text style={styles.txtBody}>{pro._data.shortDescrip}</Text>
      </View>
    </View>


  )
}
const styles = StyleSheet.create({
  generalContainer: {
    backgroundColor: 'white',
    borderBottomWidth:1,
    borderColor:'#D6D6D6'
  },
  contTitel: {
    alignItems: 'center',
    marginVertical: 20
  },
  txtTitel: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 18
  },
  contBody: {
marginHorizontal:20
  },
  txtBody: {
    color: 'black',
    fontSize: 15,
    paddingBottom:20
  }
});