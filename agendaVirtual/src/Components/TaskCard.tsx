import React from 'react';
import { StyleSheet, Text, View } from 'react-native'
import { stylesApp, colors } from '../Themes/AppThemes';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { Card, CardTitle, CardContent, CardAction, CardButton, CardImage } from 'react-native-material-cards';
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native-gesture-handler';



export const TaskCard = ({ tarea }: any) => {

  const navigation = useNavigation();
  let secondsToDate = (tarea._data.fechaEntrega.seconds) * 1000;
  let date = new Date(secondsToDate);
  let mounthAdd = date.getMonth().toString().length > 1 ? (date.getMonth() + 1) : '0' + (date.getMonth() + 1)
  /*   console.log(mounthAdd); */

  let datePrint = date.getDate() + "/" + mounthAdd + "/" + date.getFullYear();

  return (
    <TouchableOpacity
      onPress={() => {
        // @ts-ignore
        navigation.navigate('EditTareaScreen',
          {
            codTarea: tarea
          }
        )
      }}
    >
      <View style={styles.containerShadow}>
        <View style={styles.container}>
          <View style={styles.contTitel}>
            <Text style={styles.txtTitel}>{tarea._data.titulo}</Text>
          </View>
          <View style={styles.contBody}>
            <Text style={styles.txtBody}>{tarea._data.body}</Text>
          </View>
          <View style={styles.contFecha}>
            <Text style={styles.txtFecha}>{datePrint}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>



  )
}
const styles = StyleSheet.create({
  containerShadow: {
    borderWidth: 1,
    borderColor: '#D7D7D7',
    borderRadius:20,

  },
  container: {
    borderRadius: 30
  },
  contTitel: {
    alignItems: 'center',
    marginBottom: 10,
    marginTop: 15,
    borderBottomWidth: 1,
    borderColor: '#DFDFDF',
  },
  txtTitel: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 20,
    textAlign: 'center',
    marginHorizontal: 20
  },
  contBody: {
    marginHorizontal: 20,
    marginBottom: 10
  },
  txtBody: {
    color: 'black',
    fontSize: 18
  },
  contFecha: {
    marginHorizontal: 20,
    marginVertical: 10,
    justifyContent: 'flex-end',
    alignItems: 'flex-end'
  },
  txtFecha: {
    fontSize: 18,
    color: colors.primary
  }
});
