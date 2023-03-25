import React, { useLayoutEffect, useState } from 'react'
import { Text, View, Button, FlatList, StyleSheet } from 'react-native'
import { colors } from '../../../../Themes/AppColors';
import { StackScreenProps } from '@react-navigation/stack';
import { useMaterias } from '../../../../Hooks/HorarioHooks/useMaterias';
import { ListaMaterias } from '../../../../Components/MateriasComponets/ListaMaterias';
import { stylesApp } from '../../../../Themes/AppThemes';
import firestore from '@react-native-firebase/firestore';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { SwipeListView } from 'react-native-swipe-list-view';
import Icon from 'react-native-vector-icons/Ionicons';

interface Props extends StackScreenProps<any, any> { };
export const editarHorarioScreen = ({ navigation, route }: Props) => {
  // @ts-ignore
  const idHorarioGet = route.params.idHorario

  const [materiasList, setmateriasList] = useState([])

  useLayoutEffect(() => {

    var unsubscribe2 = firestore().collection("Materia").where("codHorario", "==", idHorarioGet)
      .onSnapshot((querySnapshot) => {
        var res: any = [];
        querySnapshot.forEach((doc) => {
          res.push(doc);
        });
        setmateriasList(res)
      });
    return unsubscribe2;
  }, [])

  const dellMateria = (idMateria: string) => {
    firestore().collection("Materia").doc(idMateria).delete()
  }

  return (
    <ScrollView>
      <View>
        <View style={styles.containerGen}>
          <Text style={stylesApp.titles}>LISTA MATERIAS</Text>
        </View>

        <SwipeListView
          data={materiasList}
          renderItem={(data, rowMap) => (
            <ListaMaterias materias={data.item}></ListaMaterias>
          )}
          renderHiddenItem={(data, rowMap) => (
            <View style={styles.backOptions} >
              <TouchableOpacity
                onPress={() => navigation.navigate('editMateriaScreen', {
                  // @ts-ignore
                  idMateria: data.item._data.codMateria
                })}
              >
                <Icon name={'pencil-outline'} size={30} color='#fff' />
              </TouchableOpacity>
              <TouchableOpacity
                // @ts-ignore
                onPress={() => dellMateria(data.item._data.codMateria)}
              >
                <Icon name={'ios-trash-bin-outline'} size={30} color='#fff' />
              </TouchableOpacity>
            </View>
          )}
          leftOpenValue={75}
          rightOpenValue={-75}
        />


        <View style={styles.btnFuntions}>
          <View style={styles.btn}>
            <Button
              color={colors.primary}
              title='Agregar Materias'
              onPress={() => navigation.navigate('addMateriasScreen')}
            ></Button>
          </View>
          <View style={styles.btn}>
            <Button
              color={colors.secundary}
              title='Configurarr'
              onPress={() => navigation.navigate('viewHorarioScreen')}
            ></Button>
          </View>
        </View>
      </View>
    </ScrollView>
  )
}
const styles = StyleSheet.create({
  containerGen: {
    alignItems: 'center'
  },
  txtMateria: {
    fontSize: 20,
    color: 'black'
  },
  btnFuntions: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 15,
    marginBottom: 30
  },
  btn: {
    paddingHorizontal: 10
  },
  backOptions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.primary,
    flex: 1,
    paddingHorizontal: 20
  },
  optLeft: {

  }
});
