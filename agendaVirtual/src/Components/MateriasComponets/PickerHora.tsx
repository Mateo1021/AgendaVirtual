import React, { useState } from 'react';
import { View, Button, Platform, Text, StyleSheet } from 'react-native';
import DateTimePicker, { DateTimePickerAndroid } from '@react-native-community/datetimepicker';

import { colors, stylesApp } from '../../Themes/AppThemes';
import { useAddHorario } from '../../Hooks/HorarioHooks/useAddHorario';
import { useNavigation } from '@react-navigation/core';



export const PickerHora = (materia: any, dia: any) => {

  const navigation = useNavigation();

  const { createHora } = useAddHorario()

  const [timeiDB, settimeiDB] = useState('');
  const [dateString, setDate] = useState('00:00');


  const onChange = (event: any, selectedDate: any) => {
    const currentDate = selectedDate;
    let hora = String(currentDate).split(' ')[4].split(':')[0];
    let minut = String(currentDate).split(' ')[4].split(':')[1];
    let fullHora = hora + ':' + minut
    settimeiDB(fullHora)
    setDate(btnHora(fullHora));
  };

  function btnHora(fullHora: any) {
    let horaform12 = ((Number(fullHora.split(':')[0]) + 11) % 12 + 1)
    let dayTime = fullHora.split(':')[0] > 11 ? 'PM' : 'AM'
    return (horaform12 + ':' + fullHora.split(':')[1] + ' ' + dayTime);
  }

  const showMode = () => {
    DateTimePickerAndroid.open({
      value: new Date(),
      onChange,
      mode: 'time',
      is24Hour: false,
    });
  };
  //////////////////////////////////////////////////////////////////////////////////////////////
  const [timefDB, settimefDB] = useState('');
  const [dateStringF, setTimeF] = useState('00:00');
  const setDateF = (event: any, date: any) => {
    const currentDate = date;
    let hora = String(currentDate).split(' ')[4].split(':')[0];
    let minut = String(currentDate).split(' ')[4].split(':')[1];
    let fullHora = hora + ':' + minut
    settimefDB(fullHora)
    setTimeF(btnHora(fullHora));
  };
  const showModeF = () => {
    DateTimePickerAndroid.open({
      value: new Date(),
      onChange: setDateF,
      mode: 'time',
      is24Hour: false,
      
    });
  };


  return (
    <View >
      <View style={styles.container}>
        <Text style={{color:'black'}}>Agrega la hora de inicio</Text>
      </View>
      <Button color={colors.primary} onPress={showMode} title={dateString} />
      <View style={styles.container}>
        <Text style={{color:'black'}}>Agrega la hora de fin</Text>
      </View>
      <Button color={colors.secundary} onPress={showModeF} title={dateStringF} />
      <View style={styles.btnAdd}>
        <Button
          color={colors.primary}
          title='Agregar Materias'
          onPress={() => {

            createHora(materia.materia, timeiDB, timefDB, materia.dia)
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            navigation.goBack()
          }}
        ></Button>
      </View>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop:20
  },
  generalContainer: {
    padding: 10
  },
  btnAdd:{
    paddingTop:50,
    marginBottom:30
  }
});