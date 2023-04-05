import React, { useContext, useEffect, useLayoutEffect, useState } from 'react'
import { Alert, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import { RefreshControl, ScrollView, TouchableOpacity } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';

import { SwipeListView } from 'react-native-swipe-list-view';
import { ProyectoCard } from '../../../Components/proyectComponets/ProyectoCard';
import Icon from 'react-native-vector-icons/Ionicons';
import { colors } from '../../../Themes/AppColors';
import firestore from '@react-native-firebase/firestore';
import { stylesApp } from '../../../Themes/AppThemes';
import { AuthContext } from '../../../Context/ContextUser/AuthContext';
import { ProyectosScreen } from './ProyectosScreen';
//funciones tipo flecha

interface Props extends StackScreenProps<any, any> { };
export const lookProyectoScreen = ({ navigation, route }: Props) => {
  const [cursos, setcursos] = useState([])

  useLayoutEffect(() => {
    var unsubscribe2 = firestore().collection("Cursos")
      .onSnapshot((querySnapshot) => {
        var res: any = [];
        querySnapshot.forEach((doc) => {
          res.push(doc);
        });
        setcursos(res)
      });

    return unsubscribe2;
  }, [])


  const { authState } = useContext(AuthContext);

  const createTwoButtonAlert = (tittle: any, id: any, cant:any) =>
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
        { text: "OK", onPress: () => addCoursEstudent(id,cant) }
      ]
    );

  function addCoursEstudent(id: any,cant:any) {
    firestore()
      .collection('Usuarios').doc(authState.uid)
      .update({
        idCurso: id
      })



      let newCant = Number(cant)
      console.log(newCant++);
      
      firestore()
      .collection('Cursos').doc(id)
      .update({
        cantEstudiantes: newCant++
      })


    // @ts-ignore
    navigation.pop()
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    navigation.navigate('ProyectosScreen')

  }


  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.titelCenter}>
          <Text style={stylesApp.titles}>CURSOS</Text>
        </View>
        <SwipeListView
          style={styles.styleComp}
          data={cursos}
          renderItem={(data, rowMap) => (
            <ProyectoCard pro={data.item}></ProyectoCard>
          )}
          renderHiddenItem={(data, rowMap) => (
            <View style={styles.backOptions} >
              <TouchableOpacity
                onPress={() => navigation.navigate('infoCursoScreen', {
                  // @ts-ignore
                  idCurso: data.item._data.codCurso
                })}
              >
                <Icon name={'information-circle-outline'} size={30} color='#fff' />
              </TouchableOpacity>

              <TouchableOpacity
                // @ts-ignore
                onPress={() => createTwoButtonAlert(data.item._data.nombreCurso, data.item._data.codCurso,data.item._data.cantEstudiantes)}
              >
                <Icon name={'duplicate-outline'} size={30} color='#fff' />
              </TouchableOpacity>
            </View>
          )}
          leftOpenValue={75}
          rightOpenValue={-75}
        />

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  containerGen: {
    alignItems: 'center'
  },
  txtMateria: {
    fontSize: 20,
    color: 'black'
  },

  backOptions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    backgroundColor: colors.primary,
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 40
  },
  optLeft: {

  },
  titelCenter: {
    alignItems: 'center'
  },
  styleComp: {
    flex: 1
  }
});
