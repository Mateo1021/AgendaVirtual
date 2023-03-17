import React, { useEffect, useState } from 'react'
import { Button, Platform, ScrollView, StyleSheet, Text, View } from 'react-native'
import { useMaterias } from '../../../Hooks/HorarioHooks/useMaterias';
import { colors, stylesApp } from '../../../Themes/AppThemes'
import RNPickerSelect from 'react-native-picker-select';
import { generalArray } from '../../../Context/ContexGeneralVar/generalArray';
import RNDateTimePicker from '@react-native-community/datetimepicker';
import { useCalificaciones } from '../../../Hooks/calificacionesHooks/useCalificaciones';
// @ts-ignore
import DataTable, { COL_TYPES } from 'react-native-datatable-component';
import { async } from '@firebase/util';


export const HistorialNotasScreen = () => {
  const { materias } = useMaterias();
  const { tiposNotasArray } = generalArray()
  const { searchCalificacione } = useCalificaciones()

  const [selectMate, setselectMate] = useState('')
  const [selectTp, setselectTp] = useState(0)
  const [date, setDate] = useState(new Date());
  const [dataTable, setdataTable] = useState([])



  let materiasListArray: any = []
  for (let i in materias) {
    // @ts-ignore
    materiasListArray.push({ label: materias[i]._data.nombre, value: materias[i]._data.codMateria })
  }
  const slectMateria = (matSelect: any) => {
    setselectMate(matSelect)
  }

  const slectTipe = (tipeSelect: any) => {
    setselectTp(tipeSelect)
  }

  const getDatosbyMat = async (mat: string, tp: number) => {
    const data = await searchCalificacione(mat, tp)
    setdataTable(data);
    return data
  }

  function TableComponent() {
    return (
      <DataTable
        data={dataTable} // list of objects
        colNames={['nombre', 'fecha', 'valor']} //List of Strings
        colSettings={[
          { name: 'nombre', type: COL_TYPES.STRING, width: '40%' },
          { name: 'fecha', type: COL_TYPES.STRING, width: '40%' },
          { name: 'valor', type: COL_TYPES.STRING, width: '20%' }
        ]}//List of Objects
        noOfPages={2} //number
        backgroundColor={'#ffff'} //Table Background Color
        headerLabelStyle={{ color: 'grey', fontSize: 12 }} //Text Style Works
      />)
  }

  const searchMats = () => {
    getDatosbyMat(selectMate, selectTp)
  }

  return (
    <ScrollView>

      <View>
        <View style={{padding:20}}>
          <Text style={stylesApp.titles}>Historias</Text>
          <RNPickerSelect
            placeholder={{ label: "Selecciona una opcion", value: 0 }}
            onValueChange={(select) => slectMateria(select)}
            items={materiasListArray}
            style={pickerSelectStyles}
          />
          <RNPickerSelect
            placeholder={{ label: "Selecciona una opcion", value: 0 }}
            onValueChange={(select) => slectTipe(select)}
            items={tiposNotasArray}
            style={pickerSelectStyles}
          />

          <Button
            color={colors.primary}
            title='Buscar '
            onPress={() => searchMats()}
          ></Button>
        </View>
        <View style={styles.container}>
          <TableComponent></TableComponent>
        </View>


      </View>
    </ScrollView>
  )
}
const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
    color: 'black',
    paddingRight: 30,
    marginVertical: 10
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: 'purple',
    borderRadius: 8,
    color: 'black',
    paddingRight: 30,
    backgroundColor: '#EAEAEA',
    marginVertical: 10

  },
});

const styles = StyleSheet.create({
  container: { flex: 1, padding: 5, paddingTop: 10, backgroundColor: '#fff' },
  head: { height: 40, backgroundColor: '#f1f8ff' },
  wrapper: { flexDirection: 'row' },
  title: { flex: 1, backgroundColor: '#f6f8fa' },
  row: { height: 28 },
  text: { textAlign: 'center', justifyContent: 'center', },
  tableHeader: {
    backgroundColor: '#DCDCDC',
  },
});