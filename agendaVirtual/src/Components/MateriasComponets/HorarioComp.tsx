import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react'
import { Text, View, StyleSheet, Button, SafeAreaView, ScrollView, RefreshControl } from 'react-native';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import WeeklyCalendar from 'react-native-weekly-calendar';
import { useMaterias } from '../../Hooks/HorarioHooks/useMaterias';
import { colors, stylesApp } from '../../Themes/AppThemes';
import { useLayoutEffect } from 'react';
//refres config  
const wait = (timeout: any) => {
  return new Promise(resolve => setTimeout(resolve, timeout));
}
//......

function restarHoras(hora1: any, hora2: any) {
  // Convertir las horas a milisegundos
  let hora1ms = hora1.getTime();
  let hora2ms = hora2.getTime();

  // Calcular la diferencia en milisegundos
  let diferenciaMs = hora2ms - hora1ms;

  // Convertir la diferencia de milisegundos a horas
  let horas = new Date(diferenciaMs)

  // Devolver el resultado
  return horas;
}

function sumarDias(fecha: any, dias: any) {
  fecha.setDate(fecha.getDate() + dias);
  return fecha;
}



export const HorarioComp = () => {

  const navigation = useNavigation();
  const { materias } = useMaterias()

  let data: any = []
  let materiasArry: any = []
  var date = new Date();
  var numberOfMlSeconds = date.getTime();
  var addMlSeconds = 60 * 300000;
  var newDateObj = new Date(numberOfMlSeconds - addMlSeconds);
  let dayInicial:any;
  let diasSemana: any = [];
  let dayMilisegundos = 1440000;
  const diasSem = [
    'Lunes',
    'Martes',
    'Miercoles',
    'Jueves',
    'Viernes',
    'Sabado',
    'Domingo'
  ];
  let sampleEventsComp: any = []


  function requestData() {
    for (let x in materias) {
      let infoMateria = {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        nombre: materias[x]._data.nombre,
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        repet: materias[x]._data.repet
      }
      materiasArry.push(infoMateria)
    }

    if (newDateObj.getUTCDay() > 1) {
      dayInicial = sumarDias(newDateObj, -(newDateObj.getUTCDay() - 1));
    } else if(newDateObj.getUTCDay() == 0){
      dayInicial = sumarDias(newDateObj, +1);
    }else {
      dayInicial = newDateObj;
    }
    for (let i = 0; i < 7; i++) {
      var dateNumber = dayInicial.getTime();
      var dateSumDay = 60 * dayMilisegundos * i;
      var newDateSum = new Date(dateNumber + dateSumDay);
      let arrayDateSemana = {
        date: newDateSum,
        dia: diasSem[i]
      }
      diasSemana.push(arrayDateSemana)
    }
    for (let mate in materiasArry) {
      for (let dia in materiasArry[mate].repet) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        let diaSemana = diasSemana.find(x => x.dia == materiasArry[mate].repet[dia].dia);
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        let mes = (diaSemana?.date.getMonth() + 1).toString().length > 1 ? (diaSemana?.date.getMonth() + 1).toString() : '0' + (diaSemana?.date.getMonth() + 1).toString();
        let year = diaSemana?.date.getUTCFullYear();
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        let diaS = diaSemana?.date.getDate().toString().length > 1 ? diaSemana?.date.getDate() : '0' + diaSemana?.date.getDate();
        let hora = materiasArry[mate].repet[dia].horaI
        let horaFin = materiasArry[mate].repet[dia].horaF;

        let hi = new Date(year + '-' + mes + '-' + diaS + 'T' + hora + ':00');
        let hf = new Date(year + '-' + mes + '-' + diaS + 'T' + horaFin + ':00');
        let horaRest = restarHoras(hi, hf);

        let horaRestH = horaRest.getHours().toString().length > 1 ? horaRest.getHours() : '0' + horaRest.getHours()
        let horaRestM = horaRest.getMinutes().toString().length > 1 ? horaRest.getMinutes() : '0' + horaRest.getMinutes()
        let dataMateria = {
          note: materiasArry[mate].nombre,
          start: year + '-' + mes + '-' + diaS + ' ' + hora + ':00',
          duration: horaRestH + ':' + horaRestM + ':00'
        }
        sampleEventsComp.push(dataMateria)
      }
    }
console.log(sampleEventsComp);

    return sampleEventsComp;
  }


data = requestData()
  React.useEffect(() => {
    const focusHandler = navigation.addListener('focus', () => {

    });
    return focusHandler;
  }, [navigation]);



  const Comp = () => {
    return (
      <View style={styles.container}>
        <WeeklyCalendar 
        events={data} 
        style={{ height: 597, backgroundColor: 'white', color: 'blue', width: 400 }} 
        titleStyle={{}} 
        locale='es' 
        themeColor={colors.primary} 
        selected={dayInicial}/>
      </View>
    )
    data =[]

  }
  


  return (
    <View style={styles.container}>
      <Comp></Comp>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'withe',
    alignItems: 'center',
    justifyContent: 'center',
    fontStyle: {
      color: 'black'
    }
  },
});