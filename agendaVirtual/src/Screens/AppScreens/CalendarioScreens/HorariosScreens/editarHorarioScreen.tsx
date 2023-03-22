import React, { useLayoutEffect, useState } from 'react'
import { Text, View, Button, FlatList, StyleSheet } from 'react-native'
import { colors } from '../../../../Themes/AppColors';
import { StackScreenProps } from '@react-navigation/stack';
import { useMaterias } from '../../../../Hooks/HorarioHooks/useMaterias';
import { ListaMaterias } from '../../../../Components/MateriasComponets/ListaMaterias';
import { stylesApp } from '../../../../Themes/AppThemes';
import firestore from '@react-native-firebase/firestore';
import { ScrollView } from 'react-native-gesture-handler';


interface Props extends StackScreenProps<any, any> { };
export const editarHorarioScreen = ({ navigation, route }: Props) => {


  const [materiasList, setmateriasList] = useState([])

  useLayoutEffect(() => {
    // @ts-ignore
    var unsubscribe2 = firestore().collection("Materia").where("codHorario", "==", route.params.idHorario)
      .onSnapshot((querySnapshot) => {
        var res: any = [];
        querySnapshot.forEach((doc) => {
          res.push(doc);
        });
        setmateriasList(res)
      });
    return unsubscribe2;
  }, [])

  return (
    <ScrollView>
      <View>
        <View style={styles.containerGen}>
          <Text style={stylesApp.titles}>Lista Materias</Text>
        </View>
        <FlatList
          data={materiasList}
          renderItem={({ item }: any) => <ListaMaterias materias={item}></ListaMaterias>}
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          keyExtractor={(item) => item.id.toString()}
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
    alignItems: 'center',
    paddingTop: 15
  },
  txtMateria: {
    fontSize: 20,
    color: 'black'
  },
  btnFuntions:{
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'center',
    paddingTop:15
  },
  btn:{
    paddingHorizontal:10
  }
});
