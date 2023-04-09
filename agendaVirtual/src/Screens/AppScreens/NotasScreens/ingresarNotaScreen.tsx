import React, { useState } from 'react'
import { Button, Platform, StyleSheet, Text, TouchableOpacity, View, SafeAreaView, ScrollView, Alert } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import RNPickerSelect from 'react-native-picker-select';
import { useMaterias } from '../../../Hooks/HorarioHooks/useMaterias';
import { colors, stylesApp } from '../../../Themes/AppThemes';
import RNDateTimePicker from '@react-native-community/datetimepicker';
import { generalArray } from '../../../Context/ContexGeneralVar/generalArray';
import { useCalificaciones } from '../../../Hooks/calificacionesHooks/useCalificaciones';
export const ingresarNotaScreen = () => {

  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [dateShow, setdateShow] = useState('dd/mm/yy');
  const [selectMate, setselectMate] = useState('')
  const [tipoSelect, settipoSelect] = useState('')
  let materiasListArray: any = []
  const [nombreCalif, setnombreCalif] = useState('')
  const [valorCalif, setvalorCalif] = useState('')
  const [porcentajeCalif, setporcentajeCalif] = useState('')


  const { materias } = useMaterias();
  const { tiposNotasArray } = generalArray();
  const { AddCalif } = useCalificaciones();

  for (let i in materias) {
    // @ts-ignore
    materiasListArray.push({ label: materias[i]._data.nombre, value: materias[i]._data.codMateria })
  }
  const slectMateria = (matSelect: any) => {
    setselectMate(matSelect)
  }
  const selectTipo = (tipoSelect: any) => {
    settipoSelect(tipoSelect)
  }
  const onChange = (event: any, selectedDate: any) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
    let mesText: number = selectedDate.getMonth() < 9 ? '0' + (selectedDate.getMonth() + 1) : (selectedDate.getMonth() + 1);
    let diaText: number = selectedDate.getDate() < 9 ? '0' + selectedDate.getDate() : selectedDate.getDate()
    setdateShow(diaText + '/' + mesText + '/' + selectedDate.getFullYear())
  };
  const showMode = (currentMode: any) => {
    setShow(true);
    setMode(currentMode);
  };
  const showDatepicker = () => {
    showMode('date');
  };
  const createNewCalif = () => {
    if(selectMate==''||dateShow=='dd/mm/yy'||nombreCalif==''||porcentajeCalif==''||tipoSelect==''||valorCalif==''){
      Alert.alert('Calificaciones', 'Ingresa todos los campos');
    }else{
      let dataSend = {
        codMateria: selectMate,
        fechaNota: date,
        nombre: nombreCalif,
        porcentaje: porcentajeCalif,
        tipoCalificacion: tipoSelect,
        valor: valorCalif
      }
      AddCalif(dataSend)
      setdateShow('dd/mm/yy')
      setselectMate('')
      settipoSelect('')
      setnombreCalif('')
      setvalorCalif('')
      setporcentajeCalif('')
  
      Alert.alert('Notas', 'Su calificacion fue agregada con exito', [
  
        {text: 'OK'}
      ]);
    }
  }


  const validNumber1 = (val: any) => {
    const regexMayus = /[a-zA-Z]/g;
    if (val.search(regexMayus) !== -1) {
      setvalorCalif('')
    } else {
      if (Number(val) > 5) {
        setvalorCalif('')
      } else {
        setvalorCalif(val)
      }
    }
  }
  const validNumber2 = (val: any) => {
    const regexMayus = /[a-zA-Z]/g;
    if (val.search(regexMayus) !== -1) {
      setporcentajeCalif('')
    } else {
      if (Number(val) > 100) {
        setporcentajeCalif('')
      } else {
        setporcentajeCalif(val)
      }
    }
  }

  return (
    <ScrollView>
      <SafeAreaView >
        <View>
          <View style={styles.container}>
            <Text style={stylesApp.titles}>AGREGAR NOTAS</Text>
            <RNPickerSelect
              placeholder={{ label: "Selecciona una opcion", value: 0 }}
              onValueChange={(select) => slectMateria(select)}
              items={materiasListArray}
              style={pickerSelectStyles}
            />
            <RNPickerSelect
              placeholder={{ label: "Selecciona una opcion", value: 0 }}
              onValueChange={(select) => selectTipo(select)}
              items={tiposNotasArray}
              style={pickerSelectStyles}
            />

            <TextInput placeholderTextColor = "#949494" style={styles.txtInput} placeholder='Nombre nota' value={nombreCalif} onChangeText={setnombreCalif} />
            <View style={styles.containerNota}>
              <TextInput placeholderTextColor = "#949494" style={styles.notaInput} keyboardType='numeric' placeholder='Nota' value={valorCalif} onChangeText={(e)=>validNumber1(e)} />
              <TextInput placeholderTextColor = "#949494" style={styles.porcenInput} keyboardType='numeric' placeholder='Porcentaje (%)' value={porcentajeCalif} onChangeText={(e)=>validNumber2(e)} />
            </View>

            <View>
              <Button onPress={showDatepicker} color={colors.primary} title={dateShow} />
            </View>

            {show && (
              <RNDateTimePicker
                testID="dateTimePicker"
                timeZoneOffsetInMinutes={0}
                value={date}
                // @ts-ignore
                mode={mode}
                is24Hour={true}
                display="default"
                onChange={onChange}
              />
            )}

            <TouchableOpacity
              onPress={() => createNewCalif()}
              style={styles.buttton}>
              <Text style={styles.text}>Agregar Nota</Text>
            </TouchableOpacity>

          </View>
        </View>
      </SafeAreaView>
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
  container: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 20,
    marginVertical: 20
  },
  containerNota: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    paddingBottom: 20
  },
  buttton: {
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.blanco,
    backgroundColor: colors.primary,
    height: 35,
    width: 300,
    marginTop: 20
  },
  text: {
    color: 'white',
    alignItems: 'center',
    paddingTop: 5
  },
  txtInput: {
    borderBottomWidth: 1,
    borderColor: '#EAEAEA',
    width: 350,
    color:'black'
  },
  notaInput: {
    borderBottomWidth: 1,
    borderColor: '#EAEAEA',
    width: 175,
    color:'black'
  },
  porcenInput: {
    borderBottomWidth: 1,
    borderColor: '#EAEAEA',
    width: 175,
    color:'black'
  }
});