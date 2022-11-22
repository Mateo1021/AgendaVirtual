import React, {useState} from 'react';
import {View, Button, Platform, Text} from 'react-native';
import DateTimePicker, { DateTimePickerAndroid } from '@react-native-community/datetimepicker';

import { colors, stylesApp } from '../../Themes/AppThemes';
import { useAddHorario } from '../../Hooks/HorarioHooks/useAddHorario';
import { useNavigation } from '@react-navigation/core';



export const PickerHora = (materia:any,dia:any) => {

  const navigation = useNavigation();

  const {createHora} = useAddHorario()

  const [timeiDB, settimeiDB] = useState('');
    const [dateString, setDate] = useState('00:00');


    const onChange = (event:any, selectedDate:any) => {
      const currentDate = selectedDate;
      console.log('date print --->  '+currentDate);
      let hora = String(currentDate).split(' ')[4].split(':')[0];
      let minut = String(currentDate).split(' ')[4].split(':')[1];
      let fullHora = hora+':'+minut
      console.log('date print --->  '+fullHora);
      console.log('date print useState --->  '+dateString);
      settimeiDB(fullHora)
      setDate(btnHora(fullHora)); 
    };
  
    function btnHora (fullHora:any){
      let horaform12 = ((Number(fullHora.split(':')[0]) + 11) % 12 + 1)
      let dayTime = fullHora.split(':')[0] >11? 'PM':'AM'
      console.log(horaform12+':'+fullHora.split(':')[1]+' '+dayTime)   
      return (horaform12+':'+fullHora.split(':')[1]+' '+dayTime);   
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
  const setDateF = (event:any,date:any) => {
    const currentDate = date;
    console.log(currentDate);
    
    console.log('date print ff --->  '+currentDate);
    let hora = String(currentDate).split(' ')[4].split(':')[0];
    let minut = String(currentDate).split(' ')[4].split(':')[1];
    let fullHora = hora+':'+minut
    console.log('date print F --->  '+fullHora);
    settimefDB(fullHora)
    setTimeF(btnHora(fullHora)); 
    console.log('s');
    
  };
  const showModeF = () => {
    DateTimePickerAndroid.open({
      value: new Date(),
      onChange:setDateF,
      mode: 'time',
      is24Hour: false,
    });
  };


    return (
      <View>
        <Button onPress={showMode} title={dateString} />
        <Button onPress={showModeF} title={dateStringF} />
        <Button 
            color={colors.primary}
            title='Agregar Materias'
            onPress={()=>{
              createHora(materia.materia,timeiDB,timefDB,materia.dia)
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
              navigation.navigate('editarHorarioScreen')
            }}
      ></Button>
      </View>
    );
}
